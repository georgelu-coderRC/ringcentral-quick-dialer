import React, { useState, useEffect } from "react";
import { Button, TextField, Alert } from "@ringcentral/spring-ui";
import { bg } from "../state.js";

export default function SettingsTab({ conn, onChange }) {
  const [clientId, setClientId] = useState("");
  const [savedMsg, setSavedMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [copied, setCopied] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [delaySec, setDelaySec] = useState(5);
  const [delaySaved, setDelaySaved] = useState(false);

  // If the build was not configured with a bundled client ID,
  // expose the manual client-ID setup for the developer to use.
  const requiresManualSetup = !conn.bundledClientId;

  const copyRedirect = async () => {
    try {
      await navigator.clipboard.writeText(conn.redirectUri || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  useEffect(() => {
    chrome.storage.local.get(["rcClientId", "autodialDelaySec"]).then((v) => {
      setClientId(v.rcClientId || "");
      if (typeof v.autodialDelaySec === "number") setDelaySec(v.autodialDelaySec);
    });
  }, []);

  const saveDelay = async (val) => {
    const n = Math.min(600, Math.max(0, Number(val) || 0));
    setDelaySec(n);
    await chrome.storage.local.set({ autodialDelaySec: n });
    setDelaySaved(true);
    setTimeout(() => setDelaySaved(false), 1200);
  };

  const saveClientId = async () => {
    await bg({ type: "rcSetClientId", clientId: clientId.trim() });
    setSavedMsg("Saved");
    setTimeout(() => setSavedMsg(""), 1500);
  };

  const connect = async () => {
    setBusy(true); setErr("");
    try {
      if (requiresManualSetup) {
        if (!clientId.trim()) throw new Error("Enter a Client ID first (Advanced).");
        await bg({ type: "rcSetClientId", clientId: clientId.trim() });
      }
      const r = await bg({ type: "rcConnect" });
      if (r?.ok === false) throw new Error(r.error || "connect failed");
    } catch (e) {
      setErr(e?.message || String(e));
    } finally {
      setBusy(false);
      onChange();
    }
  };

  const disconnect = async () => {
    await bg({ type: "rcDisconnect" });
    onChange();
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-neutral-w0">
      <section className="flex flex-col gap-3 px-4 py-4 border-b border-neutral-b0-t10">
        <div>
          <h3 className="typography-subtitleBold m-0 text-neutral-b0">RingCentral account</h3>
          <p className="typography-descriptor text-neutral-b1 m-0 mt-1">
            Sign in to enable auto-dial when a call ends.
          </p>
        </div>

        <div className="flex gap-2 items-center mt-1">
          {!conn.connected ? (
            <Button size="medium" color="primary" variant="contained" onClick={connect} disabled={busy} fullWidth>
              {busy ? "Connecting…" : "Connect to RingCentral"}
            </Button>
          ) : (
            <>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success-t20 typography-descriptor text-success-high-contrast font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-success-f"></span>
                Connected
              </div>
              <Button size="small" color="danger" variant="outlined" onClick={disconnect} className="ml-auto">
                Disconnect
              </Button>
            </>
          )}
        </div>

        {err && (
          <Alert severity="error">
            <div className="flex flex-col gap-2">
              <span>{err}</span>
              {!/Missing Client ID|user|Sign-in window was closed before/i.test(err) && (
                <Button size="small" color="primary" variant="outlined" onClick={connect} disabled={busy}>
                  Try again
                </Button>
              )}
            </div>
          </Alert>
        )}

        {(requiresManualSetup || advancedOpen) && (
          <div className="flex flex-col gap-3 mt-2 pt-3 border-t border-neutral-b0-t10">
            <div className="flex items-center justify-between">
              <span className="typography-descriptorMiniSemiBold text-neutral-b1 uppercase tracking-wide">
                Advanced — developer setup
              </span>
              {!requiresManualSetup && (
                <button
                  onClick={() => setAdvancedOpen(false)}
                  className="typography-descriptor text-neutral-b1 hover:text-primary-f"
                >Hide</button>
              )}
            </div>

            {requiresManualSetup && (
              <Alert severity="info">
                This build does not have a bundled Client ID. Register a RingCentral developer app, paste the Client ID below, and add the Redirect URI to your app's allowed list.
              </Alert>
            )}

            <TextField
              label="Client ID (override)"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              size="medium"
              placeholder="abc123…"
              fullWidth
            />
            <div className="flex gap-2 items-center">
              <Button size="small" variant="outlined" onClick={saveClientId}>Save Client ID</Button>
              {savedMsg && (
                <span className="typography-descriptor text-success-f font-medium">✓ {savedMsg}</span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="typography-descriptorMiniSemiBold text-neutral-b1">Redirect URI</label>
              <div className="flex gap-2 items-stretch">
                <input
                  type="text"
                  value={conn.redirectUri || ""}
                  readOnly
                  onFocus={(e) => e.target.select()}
                  onClick={(e) => e.target.select()}
                  className="flex-1 min-w-0 typography-detail font-mono px-3 py-2 rounded-md border border-neutral-b0-t20 bg-neutral-b5 text-neutral-b0 outline-none focus:border-primary-f transition-colors select-all"
                />
                <Button size="medium" variant="outlined" onClick={copyRedirect}>
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {!requiresManualSetup && !advancedOpen && (
          <button
            onClick={() => setAdvancedOpen(true)}
            className="typography-descriptor text-neutral-b1 hover:text-primary-f text-left"
          >
            Advanced — use my own developer app
          </button>
        )}
      </section>

      <section className="flex flex-col gap-3 px-4 py-4 border-b border-neutral-b0-t10">
        <div>
          <h3 className="typography-subtitleBold m-0 text-neutral-b0">Auto-dial interval</h3>
          <p className="typography-descriptor text-neutral-b1 m-0 mt-1">
            Wait this many seconds after a call ends before dialing the next number.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {[0, 3, 5, 10, 30].map((n) => (
            <button
              key={n}
              onClick={() => saveDelay(n)}
              className={
                "px-3 py-1.5 rounded-full typography-detailBold tabular-nums transition-colors " +
                (delaySec === n
                  ? "bg-primary-f text-neutral-w0"
                  : "bg-neutral-b5 text-neutral-b1 hover:bg-neutral-b0-t10")
              }
            >
              {n === 0 ? "Off" : `${n}s`}
            </button>
          ))}
          <div className="flex items-center gap-1.5 ml-1">
            <input
              type="number"
              min="0"
              max="600"
              value={delaySec}
              onChange={(e) => saveDelay(e.target.value)}
              className="w-16 typography-detailBold tabular-nums px-2 py-1.5 rounded-md border border-neutral-b0-t20 bg-neutral-w0 text-neutral-b0 outline-none focus:border-primary-f text-center"
            />
            <span className="typography-descriptor text-neutral-b1">sec</span>
          </div>
          {delaySaved && (
            <span className="typography-descriptor text-success-f font-medium">✓ Saved</span>
          )}
        </div>
      </section>

    </div>
  );
}
