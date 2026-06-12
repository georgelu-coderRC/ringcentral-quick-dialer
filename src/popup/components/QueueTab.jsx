import React, { useState } from "react";
import { Button, Switch, Alert, EmptyState } from "@ringcentral/spring-ui";
import { formatPhone, parseNumbers } from "../state.js";

export default function QueueTab({ queue, setQueue, autodialOnEnd, setAutodial, dial, pollStatus, connected, switchTo }) {
  const [dragIdx, setDragIdx] = useState(null);
  const [overIdx, setOverIdx] = useState(null);
  const [manualName, setManualName] = useState("");
  const [manualPhone, setManualPhone] = useState("");
  const [manualError, setManualError] = useState("");

  const callIdx = async (idx) => {
    const item = queue[idx];
    if (!item) return;
    const next = queue.slice();
    next.splice(idx, 1);
    setQueue(next);
    await dial(item);
  };
  const move = (idx, dir) => {
    const next = queue.slice();
    const j = idx + dir;
    if (j < 0 || j >= next.length) return;
    [next[idx], next[j]] = [next[j], next[idx]];
    setQueue(next);
  };
  const remove = (idx) => {
    const next = queue.slice();
    next.splice(idx, 1);
    setQueue(next);
  };
  const clearAll = () => {
    if (!queue.length) return;
    if (!confirm(`Clear all ${queue.length} number(s) from your call list?`)) return;
    setQueue([]);
  };
  const addManual = () => {
    const parsed = parseNumbers(`${manualName}\t${manualPhone}`, "manual entry");
    if (!parsed.length) {
      setManualError("Enter a valid phone number.");
      return;
    }
    const nextContact = { ...parsed[0], name: manualName.trim() || parsed[0].name || "", source: "manual entry", addedAt: Date.now() };
    if (queue.some((q) => q.e164 === nextContact.e164)) {
      setManualError("That number is already in the call list.");
      return;
    }
    setQueue([...queue, nextContact]);
    setManualName("");
    setManualPhone("");
    setManualError("");
  };

  const onDragStart = (e, idx) => {
    setDragIdx(idx);
    e.dataTransfer.effectAllowed = "move";
    try { e.dataTransfer.setData("text/plain", String(idx)); } catch {}
  };
  const onDragOver = (e, idx) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (overIdx !== idx) setOverIdx(idx);
  };
  const onDrop = (e, idx) => {
    e.preventDefault();
    const from = dragIdx;
    setDragIdx(null);
    setOverIdx(null);
    if (from == null || from === idx) return;
    const next = queue.slice();
    const [moved] = next.splice(from, 1);
    next.splice(idx, 0, moved);
    setQueue(next);
  };
  const onDragEnd = () => {
    setDragIdx(null);
    setOverIdx(null);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 flex gap-2 flex-wrap items-center bg-neutral-w0 border-b border-neutral-b0-t10">
        <Button size="small" color="primary" variant="contained"
          onClick={() => callIdx(0)} disabled={!queue.length}>
          Call next
        </Button>
        <Button size="small" variant="outlined" onClick={clearAll} disabled={!queue.length}>
          Clear list
        </Button>
        <label className="flex items-center gap-2 ml-auto cursor-pointer typography-detail text-neutral-b0">
          <Switch
            checked={!!autodialOnEnd}
            onChange={(e) => {
              const checked = e.target.checked;
              setAutodial(checked);
              if (checked && !connected) switchTo("settings");
            }}
          />
          Auto-dial on end
        </label>
      </div>

      <div className="px-4 py-3 grid grid-cols-1 gap-2 bg-neutral-w0 border-b border-neutral-b0-t10">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] gap-2">
          <input
            type="text"
            value={manualName}
            onChange={(e) => { setManualName(e.target.value); setManualError(""); }}
            placeholder="Name"
            className="min-w-0 typography-detail rounded-md border border-neutral-b0-t20 px-3 py-2 outline-none focus:border-primary-f transition-colors bg-neutral-w0"
          />
          <input
            type="tel"
            value={manualPhone}
            onChange={(e) => { setManualPhone(e.target.value); setManualError(""); }}
            onKeyDown={(e) => { if (e.key === "Enter") addManual(); }}
            placeholder="Phone number"
            className="min-w-0 typography-detail rounded-md border border-neutral-b0-t20 px-3 py-2 outline-none focus:border-primary-f transition-colors bg-neutral-w0"
          />
          <Button size="medium" color="primary" variant="outlined" onClick={addManual}>
            Add
          </Button>
        </div>
        {manualError && <div className="typography-descriptor text-danger-f font-medium">{manualError}</div>}
      </div>

      {autodialOnEnd && !connected && (
        <div className="px-4 pt-3">
          <Alert severity="warning">
            Auto-dial requires connecting to RingCentral. Open Settings.
          </Alert>
        </div>
      )}

      {pollStatus?.pollActive && (() => {
        const status = pollStatus.telephonyStatus;
        const onCall = status && status !== "NoCall";
        const friendly = {
          CallConnected: "On a call — auto-dial will trigger when it ends",
          Ringing: "Phone is ringing…",
          OnHold: "Call on hold",
          ParkedCall: "Call parked",
          NoCall: pollStatus.inCallSeen
            ? "Call ended — preparing next number"
            : "Waiting for you to start a call",
        }[status] || `Status: ${status}`;
        const tone = onCall
          ? "bg-success-t20 border-success/20 text-success-high-contrast"
          : "bg-warning-t20 border-warning/20 text-warning-high-contrast";
        const dot = onCall ? "bg-success-f" : "bg-warning-f";
        return (
          <div className={"px-4 py-2 border-b flex items-center gap-2 " + tone}>
            <span className="relative flex w-2 h-2">
              <span className={"animate-ping absolute inline-flex w-full h-full rounded-full opacity-60 " + dot}></span>
              <span className={"relative inline-flex w-2 h-2 rounded-full " + dot}></span>
            </span>
            <span className="typography-descriptor font-medium">{friendly}</span>
          </div>
        );
      })()}

      {queue.length === 0 ? (
        <div className="flex-1 flex items-center justify-center px-4 pb-4">
          <EmptyState
            title="Call list is empty"
            description="Add names and numbers from the Found tab to start a call list."
          />
        </div>
      ) : (
        <ul className="flex-1 overflow-y-auto m-0 p-0 list-none">
          {queue.map((item, idx) => {
            const isDragging = dragIdx === idx;
            const isOver = overIdx === idx && dragIdx !== null && dragIdx !== idx;
            const dropAbove = isOver && dragIdx > idx;
            const dropBelow = isOver && dragIdx < idx;
            return (
              <li
                key={item.e164 + ":" + idx}
                draggable
                onDragStart={(e) => onDragStart(e, idx)}
                onDragOver={(e) => onDragOver(e, idx)}
                onDrop={(e) => onDrop(e, idx)}
                onDragEnd={onDragEnd}
                className={
                  "flex items-center gap-2 px-3 py-2 border-b border-neutral-b0-t10 bg-neutral-w0 hover:bg-neutral-b5 transition-colors relative " +
                  (isDragging ? "opacity-40 " : "") +
                  (dropAbove ? "shadow-[inset_0_2px_0_0_var(--sui-color-primary-f)] " : "") +
                  (dropBelow ? "shadow-[inset_0_-2px_0_0_var(--sui-color-primary-f)] " : "")
                }
              >
                <span
                  aria-label="Drag to reorder"
                  className="cursor-grab active:cursor-grabbing text-neutral-b3 hover:text-neutral-b1 select-none flex-shrink-0 px-1"
                  title="Drag to reorder"
                >
                  <svg viewBox="0 0 16 16" className="w-3 h-4" fill="currentColor">
                    <circle cx="5" cy="3" r="1.3"/>
                    <circle cx="11" cy="3" r="1.3"/>
                    <circle cx="5" cy="8" r="1.3"/>
                    <circle cx="11" cy="8" r="1.3"/>
                    <circle cx="5" cy="13" r="1.3"/>
                    <circle cx="11" cy="13" r="1.3"/>
                  </svg>
                </span>
                <div className="flex-1 min-w-0 leading-tight">
                  {item.name && (
                    <div className="typography-subtitleMiniSemiBold text-neutral-b0 truncate">{item.name}</div>
                  )}
                  <div className="typography-subtitleMiniSemiBold text-neutral-b0 truncate tabular-nums">{formatPhone(item.e164)}</div>
                  {item.source && (
                    <div className="typography-descriptorMini text-neutral-b1 truncate">{item.source}</div>
                  )}
                </div>
                {idx === 0 && (
                  <span className="px-2 py-0.5 rounded bg-success-t20 text-success-high-contrast typography-descriptorMiniSemiBold">
                    Up next
                  </span>
                )}
                <Button size="small" color="primary" variant="contained" onClick={() => callIdx(idx)}>Call</Button>
                <button
                  onClick={() => move(idx, -1)}
                  disabled={idx === 0}
                  aria-label="Move up"
                  className="w-7 h-7 rounded-full flex items-center justify-center text-neutral-b1 hover:bg-neutral-b5 disabled:opacity-30 disabled:cursor-not-allowed"
                >↑</button>
                <button
                  onClick={() => remove(idx)}
                  aria-label="Remove"
                  className="w-7 h-7 rounded-full flex items-center justify-center text-neutral-b1 hover:bg-danger-t10 hover:text-danger-f"
                >✕</button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
