import React, { useState, useEffect, useCallback } from "react";
import { TabContext, Tabs, Tab } from "@ringcentral/spring-ui";
import { useStorage, useActiveTab, useScanner, useRuntimeMessages, bg, formatContactLabel } from "./state.js";
import FoundTab from "./components/FoundTab.jsx";
import QueueTab from "./components/QueueTab.jsx";
import SettingsTab from "./components/SettingsTab.jsx";
import CallBar from "./components/CallBar.jsx";

export default function App() {
  const tab = useActiveTab();
  const { items, status, scan, mergeItems } = useScanner(tab);
  const [queue, setQueue] = useStorage("queue", []);
  const [autodialOnEnd, setAutodial] = useStorage("autodialOnEnd", false);
  const [activeCallItem] = useStorage("activeCallItem", null);
  const [autodialPending] = useStorage("autodialPending", null);
  const [contactNamesEnabled, setContactNamesEnabled] = useStorage("contactNamesEnabled", true);
  const [activeTab, setActiveTab] = useState("found");
  const [now, setNow] = useState(Date.now());

  const [conn, setConn] = useState({ connected: false, redirectUri: "" });
  const refreshConn = useCallback(async () => {
    try {
      const r = await bg({ type: "rcStatus" });
      setConn(r?.status || { connected: false, redirectUri: "" });
    } catch {}
  }, []);
  useEffect(() => { refreshConn(); }, [refreshConn]);
  useEffect(() => {
    if (!autodialPending?.fireAt) return undefined;
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(id);
  }, [autodialPending?.fireAt]);

  const [callBar, setCallBar] = useState({ visible: false, text: "", inCall: false });
  const [pollStatus, setPollStatus] = useState(null);
  const onMsg = useCallback((msg) => {
    if (msg?.type === "rcStatus") {
      refreshConn();
      if (msg.event === "callStarted")
        setCallBar({ visible: true, text: "Dialing " + (msg.payload?.label || msg.payload?.callee || "…"), inCall: false });
      else if (msg.event === "callAccepted")
        setCallBar({ visible: true, text: "In call", inCall: true });
      else if (msg.event === "callEnded")
        setCallBar({ visible: true, text: "Call ended", inCall: false });
      else if (msg.event === "callFailed")
        setCallBar({ visible: true, text: "Call failed: " + (msg.payload?.error || ""), inCall: false });
      else if (msg.event === "autodialPending")
        setCallBar({ visible: true, text: "Next: " + (msg.payload?.label || msg.payload?.e164 || "…"), inCall: false });
      if (msg.event === "callEnded" || msg.event === "callFailed") {
        setTimeout(() => setCallBar({ visible: false, text: "", inCall: false }), 3000);
      }
    }
    if (msg?.type === "rcPollStatus") setPollStatus(msg);
  }, [refreshConn]);
  useRuntimeMessages(onMsg);

  useEffect(() => {
    if (queue.length > 0) setActiveTab((t) => (t === "found" ? "queue" : t));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dial = useCallback(async (itemOrE164) => {
    const item = typeof itemOrE164 === "string" ? { e164: itemOrE164 } : itemOrE164;
    const dialItem = contactNamesEnabled ? item : { ...item, name: "" };
    const label = formatContactLabel(dialItem);
    setCallBar({ visible: true, text: "Opening RingEX for " + label + "…", inCall: false });
    try {
      const r = await bg({ type: "rcDial", e164: dialItem.e164, name: dialItem.name || "", item: dialItem });
      if (r?.ok === false) throw new Error(r.error || "dial failed");
      setCallBar({ visible: true, text: "Dialing " + label, inCall: false });
      setTimeout(() => {
        setCallBar((b) => (b.text.startsWith("Dialing") ? { visible: false, text: "", inCall: false } : b));
      }, 5000);
    } catch (e) {
      setCallBar({ visible: true, text: "Dial error: " + (e?.message || e), inCall: false });
    }
  }, [contactNamesEnabled]);

  const tabs = [
    { id: "found", label: `Found (${items.length})` },
    { id: "queue", label: `Call list (${queue.length})` },
    { id: "settings", label: "Settings" },
  ];

  const autodialCountdown = autodialPending?.fireAt
    ? Math.max(0, Math.ceil((autodialPending.fireAt - now) / 1000))
    : null;
  const autodialLabel = autodialPending
    ? (autodialPending.label || formatContactLabel(autodialPending))
    : "";
  const callBarText = autodialCountdown !== null
    ? `Next auto-dial in ${autodialCountdown}s: ${autodialLabel}`
    : callBar.text;

  return (
    <div className="flex flex-col h-full bg-neutral-w0">
      <header
        className="text-neutral-w0"
        style={{ background: "#1A2B47" }}
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="currentColor">
            <path d="M19.23 15.26l-2.54-.29a1.99 1.99 0 0 0-1.64.57l-1.84 1.84a15.045 15.045 0 0 1-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52a2.001 2.001 0 0 0-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07.53 8.54 7.36 15.36 15.89 15.89 1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98z"/>
          </svg>
          <div className="flex-1 min-w-0">
            <div className="typography-subtitleBold leading-tight">RingCentral Quick Dialer</div>
          </div>
          <div className="flex items-center gap-1.5 typography-descriptor">
            <span className={"w-2 h-2 rounded-full " + (conn.connected ? "bg-success-f" : "bg-neutral-b3")}></span>
            <span className="opacity-90">{conn.connected ? "Connected" : "Offline"}</span>
          </div>
        </div>
      </header>

      <div className="bg-neutral-w0 border-b border-neutral-b0-t10">
        <TabContext value={activeTab} onChange={(_e, v) => setActiveTab(v)}>
          <Tabs
            classes={{
              root: "bg-neutral-w0",
              indicator: "bg-primary-f h-[2px]",
            }}
          >
            {tabs.map((t) => (
              <Tab
                key={t.id}
                id={`tab-${t.id}`}
                label={t.label}
                value={t.id}
                classes={{
                  root: "text-neutral-b1 sui-selected:text-primary-f sui-selected:font-semibold uppercase tracking-wide typography-descriptorMiniSemiBold",
                }}
              />
            ))}
          </Tabs>
        </TabContext>
      </div>

      <main className="flex-1 overflow-hidden flex flex-col bg-neutral-w0">
        {activeTab === "found" && (
          <FoundTab
            items={items} status={status} scan={scan} mergeItems={mergeItems}
            queue={queue} setQueue={setQueue}
            tabUrl={tab.url} dial={dial} switchTo={setActiveTab}
            contactNamesEnabled={contactNamesEnabled}
          />
        )}
        {activeTab === "queue" && (
          <QueueTab
            queue={queue} setQueue={setQueue}
            autodialOnEnd={autodialOnEnd}
            setAutodial={async (v) => {
              setAutodial(v);
              await bg({ type: "rcSetAutodialOnEnd", value: v });
            }}
            dial={dial} pollStatus={pollStatus} connected={conn.connected}
            switchTo={setActiveTab}
            contactNamesEnabled={contactNamesEnabled}
            activeCallItem={activeCallItem}
            autodialPending={autodialPending}
            autodialCountdown={autodialCountdown}
          />
        )}
        {activeTab === "settings" && (
          <SettingsTab
            conn={conn}
            onChange={refreshConn}
            contactNamesEnabled={contactNamesEnabled}
            setContactNamesEnabled={setContactNamesEnabled}
          />
        )}
      </main>

      <CallBar
        {...callBar}
        visible={callBar.visible || autodialCountdown !== null}
        text={callBarText}
        onHangup={() => bg({ type: "rcHangup" })}
      />
    </div>
  );
}
