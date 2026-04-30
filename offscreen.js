// Offscreen document: hosts the ringcentral-web-phone instance.
// Receives commands from the service worker and emits call events back.

let webPhone = null;
let activeSession = null;

function send(event, payload) {
  chrome.runtime.sendMessage({ type: "offscreenEvent", event, payload });
}

function attachSessionListeners(session) {
  activeSession = session;
  send("callStarted", { callee: session?.remotePeer || "" });

  // The library v2 emits events via EventEmitter. Common events:
  //   "answered" / "accepted" — call connected
  //   "disposed" — session disposed (final)
  //   "bye" — remote/local BYE
  // We listen broadly so we don't miss anything.
  const onAccepted = () => send("callAccepted", {});
  const onEnded = (reason) => {
    send("callEnded", { reason: String(reason || "") });
    cleanupSession();
  };
  const onFailed = (err) => {
    send("callFailed", { error: String(err?.message || err || "") });
    cleanupSession();
  };

  try {
    session.on?.("answered", onAccepted);
    session.on?.("accepted", onAccepted);
    session.on?.("disposed", onEnded);
    session.on?.("bye", onEnded);
    session.on?.("terminated", onEnded);
    session.on?.("failed", onFailed);
  } catch (e) {
    console.warn("attachSessionListeners failed", e);
  }
}

function cleanupSession() {
  activeSession = null;
}

async function waitForLib(timeoutMs = 3000) {
  const start = Date.now();
  while (typeof globalThis.WebPhone !== "function") {
    if (Date.now() - start > timeoutMs) {
      throw new Error("WebPhone library failed to load (vendor/ringcentral-web-phone.iife.js).");
    }
    await new Promise((r) => setTimeout(r, 50));
  }
}

async function initWebPhone(sipInfo) {
  await waitForLib();
  if (webPhone) {
    try { await webPhone.dispose?.(); } catch {}
    webPhone = null;
  }
  webPhone = new globalThis.WebPhone({ sipInfo, autoAnswer: false });
  webPhone.on?.("inboundCall", (session) => {
    // Auto-answer disabled; we just observe inbound calls but don't answer them.
    send("inboundCall", { from: session?.remotePeer || "" });
  });
  await webPhone.start?.();
  send("ready", {});
}

async function dial(e164) {
  if (!webPhone) throw new Error("WebPhone not initialized.");
  // Library v2 outbound call API
  const session = await webPhone.call(e164);
  attachSessionListeners(session);
}

async function hangup() {
  if (activeSession) {
    try { await activeSession.hangup?.(); } catch (e) { console.warn(e); }
    try { await activeSession.dispose?.(); } catch {}
    activeSession = null;
  }
}

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg?.target !== "offscreen") return;
  (async () => {
    try {
      if (msg.type === "init") {
        await initWebPhone(msg.sipInfo);
        sendResponse({ ok: true });
      } else if (msg.type === "dial") {
        await dial(msg.e164);
        sendResponse({ ok: true });
      } else if (msg.type === "hangup") {
        await hangup();
        sendResponse({ ok: true });
      }
    } catch (e) {
      console.error("[offscreen]", msg?.type, e);
      send("callFailed", { error: String(e?.message || e) });
      sendResponse({ ok: false, error: String(e?.message || e) });
    }
  })();
  return true;
});

send("loaded", {});
