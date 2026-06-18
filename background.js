// Service worker: orchestrates OAuth, SIP provision, offscreen webphone host,
// and autodial-on-call-end logic.

const RC_SERVER = "https://platform.ringcentral.com";
const SCOPES = "ReadAccounts ReadPresence ReadCallLog";
const OFFSCREEN_URL = "offscreen.html";

// Bundled Client ID from .env.production (VITE_RC_CLIENT_ID).
// Falls back to a user-supplied client ID stored in chrome.storage.local
// (advanced override for power users running their own dev app).
const BUNDLED_CLIENT_ID = (import.meta.env && import.meta.env.VITE_RC_CLIENT_ID) || "";

async function getClientId() {
  if (BUNDLED_CLIENT_ID && BUNDLED_CLIENT_ID !== "PASTE_YOUR_CLIENT_ID_HERE") {
    return BUNDLED_CLIENT_ID;
  }
  const { rcClientId } = await chrome.storage.local.get(["rcClientId"]);
  return rcClientId || "";
}

// ---------- Storage helpers ----------
async function get(keys) { return await chrome.storage.local.get(keys); }
async function set(obj) { return await chrome.storage.local.set(obj); }

// ---------- PKCE helpers ----------
function base64url(buf) {
  const b = btoa(String.fromCharCode(...new Uint8Array(buf)));
  return b.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function randomBytes(len) {
  const a = new Uint8Array(len);
  crypto.getRandomValues(a);
  return a;
}
async function sha256(str) {
  const data = new TextEncoder().encode(str);
  return await crypto.subtle.digest("SHA-256", data);
}
async function makePkce() {
  const verifier = base64url(randomBytes(64));
  const challenge = base64url(await sha256(verifier));
  return { verifier, challenge };
}

// ---------- OAuth ----------
function redirectUri() {
  // chrome.identity provides https://<extension-id>.chromiumapp.org/<path>
  return chrome.identity.getRedirectURL("oauth");
}

// Custom error class so the popup can distinguish user-cancellation from
// transient errors that are worth auto-retrying.
class OAuthError extends Error {
  constructor(message, { transient = false, userCanceled = false } = {}) {
    super(message);
    this.name = "OAuthError";
    this.transient = transient;
    this.userCanceled = userCanceled;
  }
}

async function launchAuthOnce(authUrl) {
  // chrome.identity.launchWebAuthFlow can throw or resolve to undefined if the
  // user closes the window, but it can ALSO resolve to undefined the very first
  // time it's invoked after a service-worker spin-up — likely a race between
  // identity API initialization and the auth window. We wrap it so the caller
  // can decide whether to retry.
  let responseUrl;
  try {
    responseUrl = await chrome.identity.launchWebAuthFlow({
      url: authUrl,
      interactive: true,
    });
  } catch (e) {
    const msg = String(e?.message || e);
    if (/canceled|closed/i.test(msg)) {
      throw new OAuthError("Sign-in window was closed before finishing.", { userCanceled: true });
    }
    throw new OAuthError("Browser sign-in flow failed: " + msg, { transient: true });
  }
  if (!responseUrl) {
    throw new OAuthError("Sign-in window closed without finishing.", { transient: true });
  }
  return responseUrl;
}

async function startOAuth(clientId) {
  if (!clientId) throw new OAuthError("Missing Client ID. Enter it in Settings.");
  const { verifier, challenge } = await makePkce();
  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri(),
    code_challenge: challenge,
    code_challenge_method: "S256",
    scope: SCOPES,
  });
  const authUrl = `${RC_SERVER}/restapi/oauth/authorize?${params.toString()}`;

  const responseUrl = await launchAuthOnce(authUrl);

  let u;
  try {
    u = new URL(responseUrl);
  } catch {
    throw new OAuthError("Invalid response from sign-in.", { transient: true });
  }
  const code = u.searchParams.get("code");
  const err = u.searchParams.get("error");
  if (err) {
    // RC-returned errors are not transient — bad config, denied, etc.
    throw new OAuthError("Sign-in error: " + err);
  }
  if (!code) throw new OAuthError("Sign-in did not return a code.", { transient: true });

  try {
    return await exchangeCode(clientId, code, verifier);
  } catch (e) {
    // Network blips during token exchange are worth retrying.
    const msg = String(e?.message || e);
    const transient = /Failed to fetch|NetworkError|timeout|503|504|502/i.test(msg);
    throw new OAuthError("Token exchange failed: " + msg, { transient });
  }
}

async function exchangeCode(clientId, code, verifier) {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri(),
    client_id: clientId,
    code_verifier: verifier,
  });
  const r = await fetch(`${RC_SERVER}/restapi/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!r.ok) {
    const t = await r.text();
    throw new Error(`Token exchange failed (${r.status}): ${t}`);
  }
  const t = await r.json();
  await saveTokens(t);
  return t;
}

async function refreshTokens() {
  const { rcTokens } = await get(["rcTokens"]);
  const clientId = await getClientId();
  if (!rcTokens?.refresh_token || !clientId) throw new Error("No refresh token.");
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: rcTokens.refresh_token,
    client_id: clientId,
  });
  const r = await fetch(`${RC_SERVER}/restapi/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!r.ok) {
    const t = await r.text();
    throw new Error(`Refresh failed (${r.status}): ${t}`);
  }
  const t = await r.json();
  await saveTokens(t);
  return t;
}

async function saveTokens(t) {
  const expires_at = Date.now() + (t.expires_in - 60) * 1000;
  const merged = {
    access_token: t.access_token,
    refresh_token: t.refresh_token,
    expires_at,
    token_type: t.token_type || "Bearer",
  };
  await set({ rcTokens: merged });
  // Schedule refresh
  await chrome.alarms.create("rc-refresh", { when: expires_at - 30000 });
}

async function logout() {
  const { rcTokens } = await get(["rcTokens"]);
  const clientId = await getClientId();
  if (rcTokens?.access_token) {
    try {
      const body = new URLSearchParams({
        token: rcTokens.access_token,
        client_id: clientId || "",
      });
      await fetch(`${RC_SERVER}/restapi/oauth/revoke`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
    } catch (e) { console.warn("revoke failed", e); }
  }
  await chrome.storage.local.remove(["rcTokens", "rcSipInfo", "rcWebPhoneReady"]);
  await chrome.alarms.clear("rc-refresh");
  await closeOffscreen();
  await broadcastStatus();
}

async function ensureValidToken() {
  const { rcTokens } = await get(["rcTokens"]);
  if (!rcTokens?.access_token) throw new Error("Not connected.");
  if (Date.now() > rcTokens.expires_at) await refreshTokens();
  const fresh = (await get(["rcTokens"])).rcTokens;
  return fresh.access_token;
}

async function authedFetch(path, options = {}) {
  const token = await ensureValidToken();
  const r = await fetch(RC_SERVER + path, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: "Bearer " + token,
    },
  });
  if (r.status === 401) {
    await refreshTokens();
    return authedFetch(path, options);
  }
  return r;
}

// ---------- SIP provision ----------
async function fetchSipProvision() {
  const r = await authedFetch("/restapi/v1.0/client-info/sip-provision", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sipInfo: [{ transport: "WSS" }] }),
  });
  if (!r.ok) {
    const t = await r.text();
    throw new Error(`sip-provision failed (${r.status}): ${t}`);
  }
  const data = await r.json();
  const sipInfo = data.sipInfo?.[0];
  if (!sipInfo) throw new Error("No sipInfo returned.");
  await set({ rcSipInfo: sipInfo });
  return sipInfo;
}

// ---------- Offscreen document ----------
async function hasOffscreen() {
  // Chrome 116+: chrome.offscreen.hasDocument()
  if (chrome.offscreen?.hasDocument) return await chrome.offscreen.hasDocument();
  // Older fallback
  const contexts = await chrome.runtime.getContexts({
    contextTypes: ["OFFSCREEN_DOCUMENT"],
  }).catch(() => []);
  return contexts && contexts.length > 0;
}

async function ensureOffscreen() {
  if (await hasOffscreen()) return;
  await chrome.offscreen.createDocument({
    url: OFFSCREEN_URL,
    reasons: ["WEB_RTC", "AUDIO_PLAYBACK", "USER_MEDIA"],
    justification: "Hosts the RingCentral WebRTC softphone session.",
  });
}

async function closeOffscreen() {
  if (await hasOffscreen()) {
    try { await chrome.offscreen.closeDocument(); } catch {}
  }
}

async function sendToOffscreen(msg) {
  await ensureOffscreen();
  return await chrome.runtime.sendMessage({ ...msg, target: "offscreen" });
}

// ---------- Connect / Disconnect ----------
async function connect() {
  const clientId = await getClientId();
  // Auto-retry once on transient errors (Chrome identity race, network blip on
  // token exchange, etc.) — these tend to succeed immediately on retry.
  let lastErr;
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      await startOAuth(clientId);
      await broadcastStatus();
      return;
    } catch (e) {
      lastErr = e;
      // Don't retry if user canceled or it's a config error (non-transient).
      if (!(e instanceof OAuthError) || e.userCanceled || !e.transient) break;
      // Brief backoff before the second attempt.
      await new Promise((r) => setTimeout(r, 600));
    }
  }
  // Add a friendlier hint for the most common cases.
  if (lastErr instanceof OAuthError && lastErr.transient) {
    throw new Error(
      lastErr.message + " — please try again. If this keeps happening, check your network or try reloading the extension."
    );
  }
  throw lastErr;
}

async function initWebPhone() {
  const { rcSipInfo, rcTokens } = await get(["rcSipInfo", "rcTokens"]);
  if (!rcTokens?.access_token) {
    throw new Error("Not connected. Open Settings → Connect to RingCentral first.");
  }
  if (!rcSipInfo) {
    // We have tokens but no SIP info yet — fetch it
    await fetchSipProvision();
  }
  const sip = (await get(["rcSipInfo"])).rcSipInfo;
  await ensureOffscreen();
  let lastErr;
  for (let i = 0; i < 6; i++) {
    await new Promise((r) => setTimeout(r, 300));
    try {
      const resp = await chrome.runtime.sendMessage({
        target: "offscreen",
        type: "init",
        sipInfo: sip,
      });
      if (resp && resp.ok) {
        await set({ rcWebPhoneReady: true });
        return;
      }
      if (resp && resp.ok === false) lastErr = new Error(resp.error || "init returned not-ok");
    } catch (e) {
      lastErr = e;
    }
  }
  await set({ rcWebPhoneReady: false });
  throw lastErr || new Error("Web phone init timed out (offscreen unreachable).");
}

// ---------- Dial / Hangup (RingEX desktop app via rcapp://) ----------
let autodialTimer = null;

function callLabel(item) {
  const name = String(item?.name || "").trim();
  return name ? `${name} (${item.e164})` : item?.e164;
}

async function clearPendingAutodial() {
  if (autodialTimer) {
    clearTimeout(autodialTimer);
    autodialTimer = null;
  }
  await set({ autodialPending: null });
}

async function completeActiveCall() {
  const { activeCallItem, queue } = await get(["activeCallItem", "queue"]);
  if (!activeCallItem?.e164) {
    return null;
  }
  const nextQueue = Array.isArray(queue)
    ? queue.filter((item) => item?.e164 !== activeCallItem.e164)
    : [];
  await set({ activeCallItem: null, autodialPending: null, queue: nextQueue });
  return activeCallItem;
}

async function dialNumber(e164, opts = {}) {
  const { contactNamesEnabled = true } = await get(["contactNamesEnabled"]);
  const contactName = contactNamesEnabled === false ? "" : String(opts.name || "").trim();
  const activeCallItem = {
    ...(opts.item || {}),
    e164,
    name: contactName,
    activeAt: Date.now(),
  };
  const label = callLabel(activeCallItem);
  await clearPendingAutodial();
  await set({
    rcLastDialed: { e164, name: contactName, at: Date.now() },
    activeCallItem,
  });
  // Use an extension-origin bridge page so Chrome's "Always allow" checkbox
  // persists for all future dials regardless of the active tab's origin.
  const bridgeUrl = chrome.runtime.getURL("dial.html?n=" + encodeURIComponent(e164));
  // Default to background so the dial bridge never steals focus from the user's
  // current tab. Callers can pass { background: false } to opt into a focused tab.
  const background = opts.background !== false;
  console.log("[bg] dialing", label, "via bridge", bridgeUrl, background ? "(background)" : "(focused)");
  let tab;
  try {
    tab = await chrome.tabs.create({ url: bridgeUrl, active: !background });
  } catch (e) {
    console.error("[bg] tabs.create failed", e);
    throw new Error("Could not open dial bridge. " + (e?.message || e));
  }
  // dial.js calls window.close() itself; this is a fallback in case it can't.
  setTimeout(() => { try { chrome.tabs.remove(tab.id); } catch {} }, 7000);
  // Try to start polling — only works if user is OAuth-connected.
  // If not connected, dial still happens; autodial-on-end just won't trigger.
  try {
    const { rcTokens } = await get(["rcTokens"]);
    if (rcTokens?.access_token) await startCallPolling();
  } catch (e) { console.warn("[bg] startCallPolling skipped:", e); }
  try {
    await chrome.runtime.sendMessage({
      type: "rcStatus",
      event: "callStarted",
      payload: { callee: e164, name: contactName, label },
    });
  } catch {}
}

async function hangupCall() {
  // Cannot hang up the desktop app's call from here; this is a no-op for now.
  // Could be expanded to use RC Call Control API: POST /telephony/sessions/{id}/parties/{id}/disconnect
  console.warn("hangupCall: not implemented for rcapp:// dialing.");
}

// ---------- Presence-based call-end polling (SW-sleep resilient) ----------
const POLL_HEARTBEAT = "rc-poll-heartbeat";
const POLL_INTERVAL_MS = 3000;

let pollTimer = null;

async function getPollState() {
  const { rcPollState } = await get(["rcPollState"]);
  return rcPollState || { active: false, prevStatus: "NoCall", inCallSeen: false, startedAt: 0, lastPollAt: 0, lastResult: "" };
}
async function setPollState(patch) {
  const cur = await getPollState();
  await set({ rcPollState: { ...cur, ...patch } });
}

async function startCallPolling() {
  const cur = await getPollState();
  if (cur.active) {
    console.log("[bg] startCallPolling: already active");
    return;
  }
  await set({ rcPollState: {
    active: true, prevStatus: "NoCall", inCallSeen: false,
    startedAt: Date.now(), lastPollAt: 0, lastResult: "",
  }});
  console.log("[bg] startCallPolling");
  try { await chrome.alarms.create(POLL_HEARTBEAT, { periodInMinutes: 0.5 }); } catch {}
  schedulePoll(0);
  await broadcastPollStatus();
}

async function stopCallPolling() {
  await setPollState({ active: false });
  if (pollTimer) { clearTimeout(pollTimer); pollTimer = null; }
  try { await chrome.alarms.clear(POLL_HEARTBEAT); } catch {}
  console.log("[bg] stopCallPolling");
  await broadcastPollStatus();
}

function schedulePoll(delay = POLL_INTERVAL_MS) {
  if (pollTimer) clearTimeout(pollTimer);
  pollTimer = setTimeout(() => { pollTimer = null; pollOnce().catch(console.warn); }, delay);
}

async function pollOnce() {
  const state = await getPollState();
  if (!state.active) return;
  const { rcTokens } = await get(["rcTokens"]);
  if (!rcTokens?.access_token) {
    await stopCallPolling();
    return;
  }
  let status = "NoCall";
  let active = [];
  let result = "";
  try {
    const r = await authedFetch(
      "/restapi/v1.0/account/~/extension/~/presence?detailedTelephonyState=true"
    );
    if (r.ok) {
      const data = await r.json();
      status = data?.telephonyStatus || "NoCall";
      active = data?.activeCalls || [];
      result = `status=${status} calls=${active.length}`;
    } else {
      result = `HTTP ${r.status}`;
      const body = await r.text().catch(() => "");
      console.warn("[bg] presence poll", r.status, body);
    }
  } catch (e) {
    result = "error: " + (e?.message || e);
    console.warn("[bg] presence poll error", e);
  }
  const inCallSeen = state.inCallSeen || (status !== "NoCall");
  console.log("[bg] poll:", result, "prev=", state.prevStatus, "seen=", inCallSeen);

  // Detect transition from active call → no call
  if (state.prevStatus !== "NoCall" && status === "NoCall") {
    console.log("[bg] CALL ENDED — triggering autodial");
    const ended = await onCallEnded();
    try { await chrome.runtime.sendMessage({ type: "rcStatus", event: "callEnded", payload: ended || {} }); } catch {}
  }

  await setPollState({
    prevStatus: status, inCallSeen,
    lastPollAt: Date.now(), lastResult: result,
  });

  // When to stop polling:
  // 1) Status NoCall AND we saw a call AND queue is empty / autodial off → done
  // 2) Status NoCall AND never saw a call AND > 90s elapsed → user must not have placed a call
  if (status === "NoCall") {
    const elapsed = Date.now() - state.startedAt;
    if (inCallSeen) {
      const { autodialOnEnd, queue } = await get(["autodialOnEnd", "queue"]);
      if (!autodialOnEnd || !queue?.length) {
        await stopCallPolling();
        return;
      }
    } else if (elapsed > 90000) {
      console.log("[bg] never saw a call after 90s, stopping poll");
      await stopCallPolling();
      return;
    }
  }
  await broadcastPollStatus();
  schedulePoll();
}

async function broadcastPollStatus() {
  const s = await getPollState();
  try {
    await chrome.runtime.sendMessage({
      type: "rcPollStatus",
      pollActive: s.active,
      lastPollAt: s.lastPollAt,
      lastPollResult: s.lastResult,
      telephonyStatus: s.prevStatus,
      inCallSeen: s.inCallSeen,
    });
  } catch {}
}

// Resume polling on any SW wake-up if state says it's active
async function resumePollIfNeeded() {
  const s = await getPollState();
  if (s.active && !pollTimer) {
    console.log("[bg] resuming poll loop after SW wake");
    schedulePoll(0);
  }
}

// ---------- Auto-dial logic ----------
async function onCallEnded() {
  const ended = await completeActiveCall();
  const { autodialOnEnd, queue, autodialDelaySec, contactNamesEnabled = true, autodialPending } =
    await get(["autodialOnEnd", "queue", "autodialDelaySec", "contactNamesEnabled", "autodialPending"]);
  if (!autodialOnEnd) return ended;
  if (!Array.isArray(queue) || queue.length === 0) return ended;
  if (autodialPending?.fireAt && autodialPending.fireAt > Date.now()) return ended;
  const next = queue[0];
  const nextName = contactNamesEnabled === false ? "" : next.name || "";
  // Configurable wait so reps have time to log notes before the next call.
  // Default 5s if unset; clamp to a sane range.
  const seconds = Math.min(600, Math.max(0, Number(autodialDelaySec ?? 5)));
  const delayMs = Math.max(800, seconds * 1000);
  const pending = {
    e164: next.e164,
    name: nextName,
    label: callLabel({ ...next, name: nextName }),
    delayMs,
    seconds,
    fireAt: Date.now() + delayMs,
  };
  await set({ autodialPending: pending });
  try {
    await chrome.runtime.sendMessage({
      type: "rcStatus",
      event: "autodialPending",
      payload: pending,
    });
  } catch {}
  if (autodialTimer) clearTimeout(autodialTimer);
  autodialTimer = setTimeout(() => {
    autodialTimer = null;
    dialNumber(next.e164, { background: true, name: nextName, item: next }).catch(console.error);
  }, delayMs);
  return ended;
}

// ---------- Status broadcast ----------
async function getStatus() {
  const { rcTokens, rcSipInfo, autodialOnEnd, rcLastDialed } =
    await get(["rcTokens", "rcSipInfo", "autodialOnEnd", "rcLastDialed"]);
  const clientId = await getClientId();
  return {
    connected: !!rcTokens?.access_token,
    expiresAt: rcTokens?.expires_at || 0,
    hasClientId: !!clientId,
    bundledClientId: !!(BUNDLED_CLIENT_ID && BUNDLED_CLIENT_ID !== "PASTE_YOUR_CLIENT_ID_HERE"),
    hasSipInfo: !!rcSipInfo,
    autodialOnEnd: !!autodialOnEnd,
    lastDialed: rcLastDialed || null,
    redirectUri: redirectUri(),
  };
}

async function broadcastStatus(extra = {}) {
  const status = await getStatus();
  try {
    await chrome.runtime.sendMessage({ type: "rcStatus", status, ...extra });
  } catch {}
}

// ---------- Message router ----------
chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg?.target === "offscreen") return; // not for us
  (async () => {
    try {
      if (msg?.type === "rcConnect") {
        await connect();
        sendResponse({ ok: true });
      } else if (msg?.type === "rcDisconnect") {
        await logout();
        sendResponse({ ok: true });
      } else if (msg?.type === "rcStatus") {
        sendResponse({ ok: true, status: await getStatus() });
      } else if (msg?.type === "rcSetClientId") {
        await set({ rcClientId: msg.clientId || "" });
        sendResponse({ ok: true });
      } else if (msg?.type === "rcSetAutodialOnEnd") {
        await set({ autodialOnEnd: !!msg.value });
        if (!msg.value) await clearPendingAutodial();
        sendResponse({ ok: true });
      } else if (msg?.type === "rcDial") {
        await dialNumber(msg.e164, { name: msg.name || "", item: msg.item });
        sendResponse({ ok: true });
      } else if (msg?.type === "rcHangup") {
        await hangupCall();
        sendResponse({ ok: true });
      } else if (msg?.type === "rcEnsureWebPhone") {
        await initWebPhone();
        sendResponse({ ok: true });
      } else if (msg?.type === "offscreenEvent") {
        // From offscreen: callStarted, callAccepted, callEnded, callFailed, ready
        if (msg.event === "callEnded" || msg.event === "callFailed") {
          await onCallEnded();
        }
        await broadcastStatus({ event: msg.event, payload: msg.payload });
        sendResponse({ ok: true });
      }
    } catch (e) {
      console.error("[bg] handler error", msg?.type, e);
      sendResponse({ ok: false, error: String(e?.message || e) });
    }
  })();
  return true;
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === "rc-refresh") {
    try { await refreshTokens(); } catch (e) { console.warn("refresh failed", e); }
  } else if (alarm.name === POLL_HEARTBEAT) {
    await resumePollIfNeeded();
  }
});

chrome.runtime.onStartup.addListener(() => {
  resumePollIfNeeded().catch(console.warn);
});
chrome.runtime.onInstalled.addListener(async () => {
  try { await chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }); } catch {}
  resumePollIfNeeded().catch(console.warn);
});

// Open the side panel when the toolbar icon is clicked.
chrome.action.onClicked.addListener(async (tab) => {
  try { await chrome.sidePanel.open({ windowId: tab.windowId }); }
  catch (e) { console.warn("sidePanel.open failed", e); }
});
