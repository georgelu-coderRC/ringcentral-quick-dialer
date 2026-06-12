(() => {
  // NANP phone regex: matches optional +1 / 1, then (xxx) or xxx, separators ., -, space, then xxx-xxxx
  const PHONE_REGEX =
    /(?:\+?1[\s.\-]?)?\(?([2-9]\d{2})\)?[\s.\-]?([2-9]\d{2})[\s.\-]?(\d{4})(?!\d)/g;
  const PHONE_CHECK_REGEX =
    /(?:\+?1[\s.\-]?)?\(?([2-9]\d{2})\)?[\s.\-]?([2-9]\d{2})[\s.\-]?(\d{4})(?!\d)/;

  const results = new Map(); // key: e164, value: {display, contexts:Set}
  const isSheets = /docs\.google\.com\/spreadsheets/.test(location.href);

  function normalize(area, prefix, line) {
    return `+1${area}${prefix}${line}`;
  }

  function snippet(text, idx, len) {
    const start = Math.max(0, idx - 40);
    const end = Math.min(text.length, idx + len + 40);
    return text.slice(start, end).replace(/\s+/g, " ").trim();
  }

  function normalizeContactName(value) {
    return String(value || "")
      .replace(/\b(?:phone|mobile|cell|work|home|direct|number|tel)\b\s*:?\s*/gi, " ")
      .replace(/[<>(){}\[\]"“”'`]+/g, " ")
      .replace(/[\t,;|]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/^[\s:.-]+|[\s:.-]+$/g, "")
      .slice(0, 80);
  }

  function extractName(str, matchIndex, matchText, contextLabel) {
    const before = str.slice(Math.max(0, matchIndex - 80), matchIndex);
    const after = str.slice(matchIndex + matchText.length, matchIndex + matchText.length + 80);
    const candidates = [before, after, contextLabel || ""];
    for (const candidate of candidates) {
      const name = normalizeContactName(candidate);
      const hasPhone = PHONE_CHECK_REGEX.test(name);
      if (/[A-Za-z]/.test(name) && !hasPhone) return name;
    }
    return "";
  }

  function scanString(str, contextLabel) {
    if (!str) return;
    PHONE_REGEX.lastIndex = 0;
    let m;
    while ((m = PHONE_REGEX.exec(str)) !== null) {
      const e164 = normalize(m[1], m[2], m[3]);
      const display = m[0].trim();
      const name = extractName(str, m.index, m[0], contextLabel);
      if (!results.has(e164)) results.set(e164, { display, name, contexts: new Set() });
      if (!results.get(e164).name && name) results.get(e164).name = name;
      results.get(e164).contexts.add(contextLabel || snippet(str, m.index, m[0].length));
    }
  }

  // 1) Walk text nodes (including inside open shadow DOMs)
  function walkTextNodes(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        const tag = parent.tagName;
        if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT") {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    let node;
    while ((node = walker.nextNode())) {
      scanString(node.nodeValue, snippet(node.nodeValue, 0, 0));
    }
  }
  walkTextNodes(document.body);

  // Recurse into open shadow roots
  function walkShadowRoots(root) {
    const all = root.querySelectorAll("*");
    for (const el of all) {
      if (el.shadowRoot) {
        walkTextNodes(el.shadowRoot);
        walkShadowRoots(el.shadowRoot);
      }
    }
  }
  try { walkShadowRoots(document); } catch {}

  // 2) tel: links
  document.querySelectorAll('a[href^="tel:"]').forEach((a) => {
    const raw = decodeURIComponent(a.getAttribute("href") || "").replace(/^tel:/i, "");
    scanString(raw, (a.textContent || raw).trim().slice(0, 80));
  });

  // 3) Form values
  document.querySelectorAll("input, textarea").forEach((el) => {
    if (el.value) scanString(el.value, "form field");
  });

  // 4) Useful attributes (Sheets/canvas apps often expose data via aria-label)
  const ATTRS = ["aria-label", "title", "alt", "data-tooltip", "placeholder"];
  document.querySelectorAll("*").forEach((el) => {
    for (const a of ATTRS) {
      const v = el.getAttribute && el.getAttribute(a);
      if (v) scanString(v, `${a}: ${v.slice(0, 80)}`);
    }
  });

  // 5) Current selection (critical for Google Sheets — canvas-rendered cells
  //    only become DOM-readable when selected/copied)
  try {
    const sel = window.getSelection && window.getSelection().toString();
    if (sel) scanString(sel, "selection");
  } catch {}

  const items = Array.from(results.entries()).map(([e164, v]) => ({
    e164,
    display: v.display,
    name: v.name || "",
    contexts: Array.from(v.contexts).slice(0, 3),
  }));

  return { items, hint: isSheets
    ? "Google Sheets uses a canvas - Use the Paste names/numbers feature above"
    : null };
})();
