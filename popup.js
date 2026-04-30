// ---------- DOM refs ----------
const numbersEl = document.getElementById("numbers");
const queueEl = document.getElementById("queue");
const statusEl = document.getElementById("status");
const queueStatusEl = document.getElementById("queueStatus");
const foundCountEl = document.getElementById("foundCount");
const queueCountEl = document.getElementById("queueCount");
const connBadgeEl = document.getElementById("connBadge");
const connStatusEl = document.getElementById("connStatus");
const rescanBtn = document.getElementById("rescan");
const pasteToggleBtn = document.getElementById("pasteToggle");
const selectAllBtn = document.getElementById("selectAll");
const addSelectedBtn = document.getElementById("addSelected");
const callNextBtn = document.getElementById("callNext");
const clearQueueBtn = document.getElementById("clearQueue");
const autodialToggleEl = document.getElementById("autodialToggle");
const callBarEl = document.getElementById("callBar");
const callBarTextEl = document.getElementById("callBarText");
const hangupBtn = document.getElementById("hangupBtn");
const clientIdInput = document.getElementById("clientIdInput");
const saveClientIdBtn = document.getElementById("saveClientId");
const connectBtn = document.getElementById("connectBtn");
const disconnectBtn = document.getElementById("disconnectBtn");
const redirectUriEl = document.getElementById("redirectUri");
const micStatusEl = document.getElementById("micStatus");
const grantMicBtn = document.getElementById("grantMicBtn");

// ---------- State ----------
let foundItems = [];
let selectedSet = new Set();
let queue = [];
let currentTabUrl = "";

function hasStorage() { return !!(globalThis.chrome && chrome.storage && chrome.storage.local); }

// ---------- Storage ----------
async function loadState() {
  if (!hasStorage()) return;
  const v = await chrome.storage.local.get(["queue", "rcClientId", "autodialOnEnd"]);
  queue = Array.isArray(v.queue) ? v.queue : [];
  if (v.rcClientId) clientIdInput.value = v.rcClientId;
  autodialToggleEl.checked = !!v.autodialOnEnd;
}
async function saveQueue() {
  if (!hasStorage()) throw new Error("Storage unavailable.");
  await chrome.storage.local.set({ queue });
}

// ---------- Tabs ----------
function switchTab(name) {
  document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
  document.querySelectorAll(".panel").forEach((p) => p.classList.remove("active"));
  const btn = document.querySelector(`.tab[data-tab="${name}"]`);
  const panel = document.getElementById(`panel-${name}`);
  if (btn) btn.classList.add("active");
  if (panel) panel.classList.add("active");
}
document.querySelectorAll(".tab").forEach((btn) => {
  btn.addEventListener("click", () => switchTab(btn.dataset.tab));
});

// ---------- Service worker messaging ----------
async function bg(msg) {
  return await chrome.runtime.sendMessage(msg);
}

// ---------- Dial via web-phone (background SW) ----------
async function dial(e164) {
  setCallBar("Opening RingEX for " + e164 + "...", true);
  try {
    const r = await bg({ type: "rcDial", e164 });
    if (r && r.ok === false) throw new Error(r.error || "dial failed");
    setCallBar("Dialing " + e164 + " — see RingEX desktop app", true);
    // Auto-clear after 5s if no further events
    setTimeout(() => {
      if (callBarTextEl.textContent.startsWith("Dialing")) setCallBar("", false);
    }, 5000);
  } catch (e) {
    const msg = e?.message || String(e);
    setCallBar("Dial error: " + msg, true, false);
    console.error("dial failed:", e);
  }
}

// ---------- Found list ----------
function isQueued(e164) { return queue.some((q) => q.e164 === e164); }

function renderFound() {
  numbersEl.innerHTML = "";
  foundCountEl.textContent = String(foundItems.length);

  if (!foundItems.length) {
    if (!statusEl.textContent || statusEl.textContent === "Scanning page...") {
      statusEl.textContent = "No phone numbers found on this page.";
      statusEl.classList.add("empty");
    }
    addSelectedBtn.disabled = true;
    selectAllBtn.disabled = true;
    return;
  }
  statusEl.textContent = "Select numbers to add to your call queue.";
  statusEl.classList.remove("empty");
  selectAllBtn.disabled = false;

  for (const item of foundItems) {
    const queued = isQueued(item.e164);
    const li = document.createElement("li");
    if (queued) li.classList.add("queued");

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = selectedSet.has(item.e164);
    cb.disabled = queued;
    cb.addEventListener("change", () => {
      if (cb.checked) selectedSet.add(item.e164);
      else selectedSet.delete(item.e164);
      updateAddBtn();
    });

    const info = document.createElement("div");
    info.className = "num-info";
    const d = document.createElement("div"); d.className = "num-display"; d.textContent = item.display;
    const e = document.createElement("div"); e.className = "num-e164";
    e.textContent = item.e164 + (queued ? " · in queue" : "");
    info.appendChild(d); info.appendChild(e);
    if (item.contexts && item.contexts.length) {
      const c = document.createElement("div"); c.className = "num-context";
      c.title = item.contexts.join("\n---\n"); c.textContent = item.contexts[0];
      info.appendChild(c);
    }

    const actions = document.createElement("div"); actions.className = "num-actions";
    const callBtn = document.createElement("button");
    callBtn.className = "primary"; callBtn.textContent = "Call";
    callBtn.addEventListener("click", () => dial(item.e164));
    actions.appendChild(callBtn);

    li.appendChild(cb); li.appendChild(info); li.appendChild(actions);
    numbersEl.appendChild(li);
  }
  updateAddBtn();
}

function updateAddBtn() {
  const selected = [...selectedSet].filter((e) => !isQueued(e)).length;
  const available = foundItems.filter((i) => !isQueued(i.e164)).length;
  addSelectedBtn.disabled = available === 0;
  if (selected > 0) addSelectedBtn.textContent = `Add to queue (${selected})`;
  else if (available > 0) addSelectedBtn.textContent = `Add all (${available})`;
  else addSelectedBtn.textContent = "Add to queue";
}

selectAllBtn.addEventListener("click", () => {
  const allSelected = foundItems
    .filter((i) => !isQueued(i.e164))
    .every((i) => selectedSet.has(i.e164));
  for (const i of foundItems) {
    if (isQueued(i.e164)) continue;
    if (allSelected) selectedSet.delete(i.e164);
    else selectedSet.add(i.e164);
  }
  renderFound();
});

function getHostname(u) { try { return new URL(u || "").hostname; } catch { return ""; } }

addSelectedBtn.addEventListener("click", async () => {
  let toAdd = foundItems.filter((i) => selectedSet.has(i.e164) && !isQueued(i.e164));
  if (!toAdd.length) toAdd = foundItems.filter((i) => !isQueued(i.e164));
  if (!toAdd.length) {
    statusEl.textContent = foundItems.length
      ? "All found numbers are already in the queue."
      : "No numbers to add. Paste or rescan first.";
    statusEl.classList.add("empty");
    return;
  }
  const source = getHostname(currentTabUrl);
  const now = Date.now();
  for (const i of toAdd) queue.push({ e164: i.e164, display: i.display, source, addedAt: now });
  selectedSet.clear();
  try { await saveQueue(); } catch (e) {
    statusEl.textContent = "Failed to save queue: " + (e?.message || e);
    statusEl.classList.add("empty"); return;
  }
  renderFound(); renderQueue(); switchTab("queue");
  queueStatusEl.textContent = `Added ${toAdd.length} number(s). Queue now has ${queue.length}.`;
  queueStatusEl.classList.remove("empty");
});

// ---------- Queue rendering ----------
function renderQueue() {
  queueEl.innerHTML = "";
  queueCountEl.textContent = String(queue.length);
  callNextBtn.disabled = queue.length === 0;
  clearQueueBtn.disabled = queue.length === 0;

  if (!queue.length) {
    queueStatusEl.textContent = "Queue is empty. Add numbers from the Found tab.";
    queueStatusEl.classList.add("empty");
    return;
  }
  queueStatusEl.textContent = `${queue.length} number(s) queued.`;
  queueStatusEl.classList.remove("empty");

  queue.forEach((item, idx) => {
    const li = document.createElement("li");
    if (idx === 0) li.classList.add("next");
    const pos = document.createElement("div");
    pos.style.cssText = "min-width:22px;text-align:center;font-weight:600;color:#0073ae;font-size:12px;";
    pos.textContent = String(idx + 1);
    const info = document.createElement("div"); info.className = "num-info";
    const d = document.createElement("div"); d.className = "num-display"; d.textContent = item.display;
    const e = document.createElement("div"); e.className = "num-e164"; e.textContent = item.e164;
    info.appendChild(d); info.appendChild(e);
    if (item.source) {
      const c = document.createElement("div"); c.className = "num-context"; c.textContent = "from " + item.source;
      info.appendChild(c);
    }
    const actions = document.createElement("div"); actions.className = "num-actions";
    const callBtn = document.createElement("button");
    callBtn.className = "primary"; callBtn.textContent = "Call";
    callBtn.addEventListener("click", () => callAndAdvance(idx));
    const upBtn = document.createElement("button");
    upBtn.className = "secondary"; upBtn.textContent = "↑"; upBtn.disabled = idx === 0;
    upBtn.addEventListener("click", async () => {
      [queue[idx - 1], queue[idx]] = [queue[idx], queue[idx - 1]];
      await saveQueue(); renderQueue();
    });
    const rmBtn = document.createElement("button");
    rmBtn.className = "danger"; rmBtn.textContent = "✕"; rmBtn.title = "Remove";
    rmBtn.addEventListener("click", async () => {
      queue.splice(idx, 1); await saveQueue(); renderQueue(); renderFound();
    });
    actions.appendChild(callBtn); actions.appendChild(upBtn); actions.appendChild(rmBtn);
    li.appendChild(pos); li.appendChild(info); li.appendChild(actions);
    queueEl.appendChild(li);
  });
}

async function callAndAdvance(idx) {
  const item = queue[idx];
  if (!item) return;
  queue.splice(idx, 1);
  await saveQueue();
  await dial(item.e164);
  renderQueue(); renderFound();
}
callNextBtn.addEventListener("click", () => callAndAdvance(0));
clearQueueBtn.addEventListener("click", async () => {
  if (!queue.length) return;
  if (!confirm(`Clear all ${queue.length} queued number(s)?`)) return;
  queue = []; await saveQueue(); renderQueue(); renderFound();
});

autodialToggleEl.addEventListener("change", async () => {
  await bg({ type: "rcSetAutodialOnEnd", value: autodialToggleEl.checked });
  if (autodialToggleEl.checked) {
    const r = await bg({ type: "rcStatus" });
    if (!r?.status?.connected) {
      queueStatusEl.textContent = "Auto-dial requires connecting to RingCentral (Settings tab).";
      queueStatusEl.classList.add("empty");
      switchTab("settings");
    } else {
      queueStatusEl.textContent = "Auto-dial enabled. Polling will start on next call.";
      queueStatusEl.classList.remove("empty");
    }
  }
});

hangupBtn.addEventListener("click", async () => { await bg({ type: "rcHangup" }); });

// ---------- Mic permission ----------
async function requestMic() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach((t) => t.stop());
    await chrome.storage.local.set({ micGranted: true });
    return { ok: true };
  } catch (e) {
    await chrome.storage.local.set({ micGranted: false });
    return { ok: false, error: (e?.name || "Error") + ": " + (e?.message || String(e)) };
  }
}

async function refreshMicState() {
  const { micGranted } = await chrome.storage.local.get(["micGranted"]);
  if (micGranted) {
    micStatusEl.textContent = "Microphone: ✓ Granted";
    micStatusEl.className = "conn-status connected";
    grantMicBtn.hidden = true;
  } else {
    micStatusEl.textContent = "Microphone: Not granted";
    micStatusEl.className = "conn-status disconnected";
    grantMicBtn.hidden = false;
  }
}

grantMicBtn.addEventListener("click", async () => {
  grantMicBtn.disabled = true;
  grantMicBtn.textContent = "Requesting...";
  const r = await requestMic();
  grantMicBtn.disabled = false;
  grantMicBtn.textContent = "Grant microphone access";
  if (!r.ok) {
    micStatusEl.textContent = "Microphone: " + r.error;
    micStatusEl.className = "conn-status error";
  }
  await refreshMicState();
});

// ---------- Settings ----------
saveClientIdBtn.addEventListener("click", async () => {
  await bg({ type: "rcSetClientId", clientId: clientIdInput.value.trim() });
  saveClientIdBtn.textContent = "Saved!";
  setTimeout(() => (saveClientIdBtn.textContent = "Save"), 1500);
});
connectBtn.addEventListener("click", async () => {
  connectBtn.disabled = true;
  connectBtn.textContent = "Connecting...";
  try {
    if (!clientIdInput.value.trim()) throw new Error("Enter a Client ID first.");
    // Mic is not required for rcapp:// dialing; mic UI is optional.
    await bg({ type: "rcSetClientId", clientId: clientIdInput.value.trim() });
    const r = await bg({ type: "rcConnect" });
    if (r && r.ok === false) throw new Error(r.error || "connect failed");
  } catch (e) {
    connStatusEl.textContent = "Error: " + (e?.message || e);
    connStatusEl.className = "conn-status error";
  } finally {
    connectBtn.disabled = false;
    connectBtn.textContent = "Connect to RingCentral";
    refreshConnState();
  }
});
disconnectBtn.addEventListener("click", async () => {
  await bg({ type: "rcDisconnect" });
  refreshConnState();
});

async function refreshConnState() {
  try {
    const r = await bg({ type: "rcStatus" });
    const s = (r && r.status) || {};
    if (redirectUriEl && s.redirectUri) redirectUriEl.value = s.redirectUri;
    if (s.connected) {
      connStatusEl.textContent = "Connected" + (s.hasSipInfo ? " · SIP ready" : "");
      connStatusEl.className = "conn-status connected";
      connBadgeEl.textContent = "ON";
      connBadgeEl.className = "badge connected";
      connectBtn.hidden = true;
      disconnectBtn.hidden = false;
    } else {
      connStatusEl.textContent = "Disconnected";
      connStatusEl.className = "conn-status disconnected";
      connBadgeEl.textContent = "·";
      connBadgeEl.className = "badge disconnected";
      connectBtn.hidden = false;
      disconnectBtn.hidden = true;
    }
    autodialToggleEl.checked = !!s.autodialOnEnd;
  } catch (e) { console.warn(e); }
}

// ---------- Call bar ----------
function setCallBar(text, active, inCall = false) {
  callBarEl.hidden = !active;
  callBarTextEl.textContent = text || "";
  callBarEl.classList.toggle("in-call", !!inCall);
  hangupBtn.hidden = !inCall;
}

// ---------- Paste-to-parse ----------
const PHONE_REGEX_POPUP =
  /(?:\+?1[\s.\-]?)?\(?([2-9]\d{2})\)?[\s.\-]?([2-9]\d{2})[\s.\-]?(\d{4})(?!\d)/g;

function mergeFound(newItems) {
  const map = new Map(foundItems.map((i) => [i.e164, i]));
  for (const item of newItems) {
    if (map.has(item.e164)) {
      const ex = map.get(item.e164);
      const ctxs = new Set([...(ex.contexts || []), ...(item.contexts || [])]);
      ex.contexts = Array.from(ctxs).slice(0, 3);
    } else { map.set(item.e164, item); }
  }
  foundItems = Array.from(map.values());
}
function parseAndMergeText(text, contextLabel) {
  const found = new Map();
  PHONE_REGEX_POPUP.lastIndex = 0;
  let m;
  while ((m = PHONE_REGEX_POPUP.exec(text)) !== null) {
    const e164 = `+1${m[1]}${m[2]}${m[3]}`;
    const display = m[0].trim();
    if (!found.has(e164)) found.set(e164, { e164, display, contexts: [contextLabel] });
  }
  const items = Array.from(found.values());
  if (!items.length) return null;
  const before = foundItems.length;
  mergeFound(items);
  for (const it of items) if (!isQueued(it.e164)) selectedSet.add(it.e164);
  renderFound();
  return { found: items.length, added: foundItems.length - before };
}
function showPasteBox(message) {
  const box = document.getElementById("pasteBox");
  const area = document.getElementById("pasteArea");
  box.hidden = false; area.value = ""; area.focus();
  if (message) { statusEl.textContent = message; statusEl.classList.remove("empty"); }
}
function hidePasteBox() {
  document.getElementById("pasteBox").hidden = true;
  document.getElementById("pasteArea").value = "";
}
pasteToggleBtn.addEventListener("click", () => {
  const box = document.getElementById("pasteBox");
  if (box.hidden) showPasteBox("Press Cmd+V (or Ctrl+V) to paste copied numbers.");
  else hidePasteBox();
});
document.getElementById("pasteArea").addEventListener("paste", (e) => {
  setTimeout(() => {
    const text = e.target.value;
    if (!text) return;
    const result = parseAndMergeText(text, "from pasted text");
    if (!result) {
      statusEl.textContent = "No phone numbers found in pasted text.";
      statusEl.classList.add("empty");
    } else {
      statusEl.textContent = `Added ${result.found} number(s)${
        result.added !== result.found ? ` (${result.added} new)` : ""
      } from pasted text.`;
      statusEl.classList.remove("empty");
      hidePasteBox();
    }
  }, 0);
});

// ---------- Page scan ----------
async function scan() {
  statusEl.textContent = "Scanning page...";
  statusEl.classList.remove("empty");
  numbersEl.innerHTML = ""; foundCountEl.textContent = "0";
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.id) throw new Error("No active tab");
    currentTabUrl = tab.url || "";
    if (!/^https?:/.test(currentTabUrl)) {
      foundItems = [];
      statusEl.textContent = "Switch to a webpage with phone numbers, or use Paste numbers (Cmd+V).";
      statusEl.classList.remove("empty");
      renderFound();
      return;
    }
    let injection;
    try {
      injection = await chrome.scripting.executeScript({
        target: { tabId: tab.id }, files: ["scraper.js"],
      });
    } catch (e) {
      foundItems = [];
      statusEl.textContent =
        "Can't read this page (" + (e?.message || e) + "). Try reloading the page or use Paste numbers.";
      statusEl.classList.add("empty");
      renderFound();
      return;
    }
    const raw = injection && injection[0] && injection[0].result;
    foundItems = (raw && raw.items) || (Array.isArray(raw) ? raw : []);
    selectedSet.clear();
    for (const it of foundItems) if (!isQueued(it.e164)) selectedSet.add(it.e164);
    renderFound();
    if (raw && raw.hint) {
      statusEl.textContent = raw.hint;
      if (foundItems.length) statusEl.classList.remove("empty"); else statusEl.classList.add("empty");
    }
  } catch (e) {
    console.error(e);
    foundItems = [];
    statusEl.textContent = "Error scanning page: " + (e?.message || e);
    statusEl.classList.add("empty"); renderFound();
  }
}
rescanBtn.addEventListener("click", scan);

// Auto-rescan when the user switches tabs or the active tab navigates
let scanDebounce = null;
function debouncedScan() {
  if (scanDebounce) clearTimeout(scanDebounce);
  scanDebounce = setTimeout(() => { scan(); }, 250);
}
chrome.tabs.onActivated.addListener(debouncedScan);
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.active) debouncedScan();
});

// ---------- Storage / runtime listeners ----------
if (hasStorage() && chrome.storage.onChanged) {
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "local") return;
    if (changes.queue) {
      queue = Array.isArray(changes.queue.newValue) ? changes.queue.newValue : [];
      renderQueue(); renderFound();
    }
    if (changes.autodialOnEnd) autodialToggleEl.checked = !!changes.autodialOnEnd.newValue;
  });
}
chrome.runtime.onMessage.addListener((msg) => {
  if (msg?.type === "rcStatus") {
    refreshConnState();
    if (msg.event === "callStarted") setCallBar("Dialing " + (msg.payload?.callee || "..."), true);
    else if (msg.event === "callAccepted") setCallBar("In call", true, true);
    else if (msg.event === "callEnded") setCallBar("Call ended", true, false);
    else if (msg.event === "callFailed") setCallBar("Call failed: " + (msg.payload?.error || ""), true, false);
    if (msg.event === "callEnded" || msg.event === "callFailed") {
      setTimeout(() => setCallBar("", false), 3000);
    }
  }
  if (msg?.type === "rcPollStatus") {
    const el = document.getElementById("pollStatus");
    if (msg.pollActive) {
      el.hidden = false;
      const ago = msg.lastPollAt ? Math.round((Date.now() - msg.lastPollAt) / 1000) : "?";
      el.textContent = `Watching for call end · status=${msg.telephonyStatus} · last poll ${ago}s ago` +
        (msg.lastPollResult ? ` (${msg.lastPollResult})` : "");
    } else {
      el.hidden = true;
    }
  }
});

// ---------- Init ----------
(async () => {
  try {
    await loadState();
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    currentTabUrl = (tab && tab.url) || "";
    if (queue.length > 0) switchTab("queue");
    renderQueue();
    refreshConnState();
    refreshMicState();
    await scan();
    const onSheets = /docs\.google\.com\/spreadsheets/.test(currentTabUrl);
    if (onSheets) {
      showPasteBox(
        "Tip: select your column in Sheets, press Cmd+C, then Cmd+V here to add all numbers at once."
      );
    }
  } catch (e) {
    console.error("init error:", e);
    statusEl.textContent = "Init error: " + (e?.message || e);
    statusEl.classList.add("empty");
  }
})();
