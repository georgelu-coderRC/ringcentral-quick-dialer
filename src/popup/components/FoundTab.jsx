import React, { useState, useMemo, useCallback } from "react";
import { Button, Alert, EmptyState, Checkbox } from "@ringcentral/spring-ui";
import { parseNumbers, getHostname, formatPhone } from "../state.js";

export default function FoundTab({ items, status, scan, mergeItems, queue, setQueue, tabUrl, dial, switchTo }) {
  const [selected, setSelected] = useState(() => new Set());
  const [pasteOpen, setPasteOpen] = useState(false);
  const [pasteText, setPasteText] = useState("");
  const [pasteMsg, setPasteMsg] = useState("");

  const queuedSet = useMemo(() => new Set(queue.map((q) => q.e164)), [queue]);
  const isQueued = (e164) => queuedSet.has(e164);

  const toggle = (e164) =>
    setSelected((s) => {
      const n = new Set(s);
      n.has(e164) ? n.delete(e164) : n.add(e164);
      return n;
    });

  const selectAll = () => {
    const available = items.filter((i) => !isQueued(i.e164));
    const allOn = available.every((i) => selected.has(i.e164));
    setSelected(allOn ? new Set() : new Set(available.map((i) => i.e164)));
  };

  const addSelected = () => {
    let toAdd = items.filter((i) => selected.has(i.e164) && !isQueued(i.e164));
    if (!toAdd.length) toAdd = items.filter((i) => !isQueued(i.e164));
    if (!toAdd.length) return;
    const source = getHostname(tabUrl);
    const now = Date.now();
    const newQueue = [
      ...queue,
      ...toAdd.map((i) => ({ e164: i.e164, display: i.display, name: i.name || "", source, addedAt: now })),
    ];
    setQueue(newQueue);
    setSelected(new Set());
  };

  const ingestText = useCallback((text) => {
    if (!text) return;
    const parsed = parseNumbers(text, "from pasted text");
    if (!parsed.length) {
      setPasteMsg("No phone numbers found in pasted text.");
      return;
    }
    const map = new Map(items.map((i) => [i.e164, i]));
    let added = 0;
    for (const p of parsed) {
      const existing = map.get(p.e164);
      if (!existing) {
        map.set(p.e164, p);
        added++;
      } else if (!existing.name && p.name) {
        map.set(p.e164, { ...existing, name: p.name });
      }
    }
    const queuedNameUpdates = parsed.filter((p) => p.name && queue.some((q) => q.e164 === p.e164 && !q.name));
    if (queuedNameUpdates.length) {
      const namesByNumber = new Map(queuedNameUpdates.map((p) => [p.e164, p.name]));
      setQueue(queue.map((q) => (
        !q.name && namesByNumber.has(q.e164) ? { ...q, name: namesByNumber.get(q.e164) } : q
      )));
    }
    mergeItems(Array.from(map.values()));
    setSelected((s) => {
      const n = new Set(s);
      for (const p of parsed) if (!isQueued(p.e164)) n.add(p.e164);
      return n;
    });
    setPasteMsg(`Found ${parsed.length} number(s)${added !== parsed.length ? ` (${added} new)` : ""}.`);
    setPasteText("");
    setTimeout(() => { setPasteOpen(false); setPasteMsg(""); }, 1200);
  }, [items, mergeItems, queue, setQueue, queuedSet]);

  const onPaste = useCallback((e) => {
    const text = e.clipboardData?.getData("text") || "";
    if (text) {
      e.preventDefault();
      ingestText(text);
    }
  }, [ingestText]);

  const onTextChange = useCallback((e) => {
    const v = e.target.value;
    setPasteText(v);
    if (/\d{3}.*\d{4}/.test(v)) ingestText(v);
  }, [ingestText]);

  const availableCount = items.filter((i) => !isQueued(i.e164)).length;
  const selCount = [...selected].filter((e) => !isQueued(e)).length;
  const addLabel =
    selCount > 0 ? `Add to call list (${selCount})` :
    availableCount > 0 ? `Add all (${availableCount})` : "Add to call list";

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 flex gap-2 flex-wrap bg-neutral-w0 border-b border-neutral-b0-t10">
        <Button size="small" variant="outlined" onClick={scan}>Rescan</Button>
        <Button size="small" variant="outlined" onClick={() => setPasteOpen((p) => !p)}>
          {pasteOpen ? "Hide paste" : "Paste names/numbers"}
        </Button>
        <Button size="small" variant="outlined" onClick={selectAll} disabled={!availableCount}>
          {availableCount && items.filter(i => !isQueued(i.e164)).every(i => selected.has(i.e164)) ? "Unselect all" : "Select all"}
        </Button>
        <Button size="small" color="primary" variant="contained"
          onClick={addSelected} disabled={!availableCount}>
          {addLabel}
        </Button>
      </div>

      {pasteOpen && (
        <div className="px-4 py-3 flex flex-col gap-2 bg-neutral-w0 border-b border-neutral-b0-t10">
          <textarea
            placeholder="Paste names and numbers, for example: Jane Doe, (555) 123-4567"
            value={pasteText}
            onChange={onTextChange}
            onPaste={onPaste}
            rows={3}
            autoFocus
            className="w-full typography-mainText rounded-md border border-neutral-b0-t20 px-3 py-2 font-mono outline-none focus:border-primary-f transition-colors bg-neutral-w0"
          />
          {pasteMsg && <div className="typography-descriptor text-success-f font-medium">{pasteMsg}</div>}
          <div className="typography-descriptor text-neutral-b1">
            Tip: copy name and phone columns from Google Sheets, then paste here.
          </div>
        </div>
      )}

      {status.text && (
        <div className="px-4 py-2">
          <Alert severity={status.kind === "error" ? "error" : status.kind === "warning" ? "warning" : "info"}>
            {status.text}
          </Alert>
        </div>
      )}

      {items.length === 0 ? (
        <div className="flex-1 flex items-center justify-center px-4 pb-4">
          <EmptyState
            title="No numbers yet"
            description="Rescan the page or paste names and phone numbers."
          />
        </div>
      ) : (
        <ul className="flex-1 overflow-y-auto m-0 p-0 list-none">
          {items.map((item) => {
            const queued = isQueued(item.e164);
            const checked = selected.has(item.e164);
            return (
              <li
                key={item.e164}
                className={
                  "flex items-center gap-2 px-3 py-2 border-b border-neutral-b0-t10 bg-neutral-w0 transition-colors " +
                  (queued ? "opacity-60" : "hover:bg-neutral-b5")
                }
              >
                <Checkbox
                  checked={checked}
                  disabled={queued}
                  onChange={() => toggle(item.e164)}
                />
                <div className="flex-1 min-w-0">
                  {item.name && (
                    <div className="typography-subtitleMiniSemiBold text-neutral-b0 truncate">{item.name}</div>
                  )}
                  <div className="typography-subtitleMiniSemiBold text-neutral-b0 truncate tabular-nums">{formatPhone(item.e164)}</div>
                </div>
                {queued ? (
                  <span className="px-2 py-0.5 rounded bg-neutral-b5 text-neutral-b1 typography-descriptorMiniSemiBold">
                    In list
                  </span>
                ) : (
                  <Button size="small" color="primary" variant="contained" onClick={() => dial(item)}>
                    Call
                  </Button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
