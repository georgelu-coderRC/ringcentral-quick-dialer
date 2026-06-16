import { useEffect, useState, useCallback, useRef } from "react";

const PHONE_REGEX =
  /(?:\+?1[\s.\-]?)?\(?([2-9]\d{2})\)?[\s.\-]?([2-9]\d{2})[\s.\-]?(\d{4})(?!\d)/g;
const PHONE_CHECK_REGEX =
  /(?:\+?1[\s.\-]?)?\(?([2-9]\d{2})\)?[\s.\-]?([2-9]\d{2})[\s.\-]?(\d{4})(?!\d)/;
const CONTACT_NAME_MAX = 80;

export function bg(msg) {
  return chrome.runtime.sendMessage(msg);
}

export function formatPhone(e164) {
  if (!e164) return "";
  const m = String(e164).match(/^\+1(\d{3})(\d{3})(\d{4})$/);
  if (m) return `+1 (${m[1]}) ${m[2]}-${m[3]}`;
  const m10 = String(e164).match(/^\+?(\d{3})(\d{3})(\d{4})$/);
  if (m10) return `(${m10[1]}) ${m10[2]}-${m10[3]}`;
  return String(e164);
}

export function formatContactLabel(itemOrE164, fallbackName = "") {
  const safeFallbackName = typeof fallbackName === "string" ? fallbackName : "";
  const item = typeof itemOrE164 === "string" ? { e164: itemOrE164, name: safeFallbackName } : (itemOrE164 || {});
  const phone = formatPhone(item.e164);
  const name = normalizeContactName(item.name || safeFallbackName || "");
  return name ? `${name} (${phone})` : phone;
}

function normalizeContactName(value) {
  return String(value || "")
    .replace(/\b(?:phone|mobile|cell|work|home|direct|number|tel)\b\s*:?\s*/gi, " ")
    .replace(/[<>(){}\[\]"“”'`]+/g, " ")
    .replace(/[\t,;|]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^[\s:.-]+|[\s:.-]+$/g, "")
    .slice(0, CONTACT_NAME_MAX);
}

function extractNameFromLine(line, matchIndex, matchText) {
  const before = line.slice(0, matchIndex);
  const after = line.slice(matchIndex + matchText.length);
  const candidates = [before, after, `${before} ${after}`];
  for (const candidate of candidates) {
    const name = normalizeContactName(candidate);
    const hasPhone = PHONE_CHECK_REGEX.test(name);
    if (/[A-Za-z]/.test(name) && !hasPhone) {
      return name;
    }
  }
  return "";
}

export function useStorage(key, defaultVal) {
  const [val, setVal] = useState(defaultVal);
  useEffect(() => {
    chrome.storage.local.get([key]).then((r) => {
      if (r[key] !== undefined) setVal(r[key]);
    });
    const listener = (changes, area) => {
      if (area === "local" && changes[key]) setVal(changes[key].newValue);
    };
    chrome.storage.onChanged.addListener(listener);
    return () => chrome.storage.onChanged.removeListener(listener);
  }, [key]);
  const setAndSave = useCallback(
    (v) => {
      const newVal = typeof v === "function" ? v(val) : v;
      setVal(newVal);
      chrome.storage.local.set({ [key]: newVal });
    },
    [key, val]
  );
  return [val, setAndSave];
}

export function useActiveTab() {
  const [tab, setTab] = useState({ id: null, url: "" });
  useEffect(() => {
    const refresh = async () => {
      try {
        const [t] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (t) setTab({ id: t.id, url: t.url || "" });
      } catch {}
    };
    refresh();
    const onActivated = () => refresh();
    const onUpdated = (_id, info, t) => {
      if (info.status === "complete" && t.active) refresh();
    };
    chrome.tabs.onActivated.addListener(onActivated);
    chrome.tabs.onUpdated.addListener(onUpdated);
    return () => {
      chrome.tabs.onActivated.removeListener(onActivated);
      chrome.tabs.onUpdated.removeListener(onUpdated);
    };
  }, []);
  return tab;
}

export function parseNumbers(text, contextLabel = "from pasted text", opts = {}) {
  const includeNames = opts.includeNames !== false;
  const map = new Map();
  for (const line of String(text || "").split(/\r?\n/)) {
    PHONE_REGEX.lastIndex = 0;
    let m;
    while ((m = PHONE_REGEX.exec(line)) !== null) {
      const e164 = `+1${m[1]}${m[2]}${m[3]}`;
      const name = includeNames ? extractNameFromLine(line, m.index, m[0]) : "";
      const existing = map.get(e164);
      if (!existing) {
        map.set(e164, { e164, display: m[0].trim(), name, contexts: [contextLabel] });
      } else if (!existing.name && name) {
        map.set(e164, { ...existing, name });
      }
    }
  }
  return Array.from(map.values());
}

export function getHostname(u) {
  try { return new URL(u || "").hostname; } catch { return ""; }
}

export function useScanner(tab) {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState({ text: "", kind: "info" });
  const debounceRef = useRef(null);

  const scan = useCallback(async () => {
    if (!tab.id) return;
    setStatus({ text: "Scanning page…", kind: "info" });
    if (!/^https?:/.test(tab.url)) {
      setItems([]);
      setStatus({
        text: "Switch to a webpage with phone numbers, or use Paste names/numbers.",
        kind: "info",
      });
      return;
    }
    try {
      const inj = await chrome.scripting.executeScript({
        target: { tabId: tab.id }, files: ["scraper.js"],
      });
      const raw = inj?.[0]?.result;
      const found = raw?.items || (Array.isArray(raw) ? raw : []);
      setItems(found);
      if (raw?.hint) {
        setStatus({ text: raw.hint, kind: found.length ? "info" : "warning" });
      } else if (!found.length) {
        setStatus({ text: "No phone numbers found on this page.", kind: "warning" });
      } else {
        setStatus({ text: "Select contacts to add to your call list.", kind: "info" });
      }
    } catch (e) {
      setItems([]);
      setStatus({
        text: "Can't read this page (" + (e?.message || e) + "). Try reloading the page or use Paste.",
        kind: "error",
      });
    }
  }, [tab.id, tab.url]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(scan, 250);
  }, [tab.id, tab.url, scan]);

  return { items, status, scan, mergeItems: setItems };
}

export function useRuntimeMessages(handler) {
  useEffect(() => {
    const fn = (msg) => handler(msg);
    chrome.runtime.onMessage.addListener(fn);
    return () => chrome.runtime.onMessage.removeListener(fn);
  }, [handler]);
}
