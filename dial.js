const params = new URLSearchParams(location.search);
const number = params.get("n") || "";
const protoUrl = number ? "rcapp://r/call?number=" + encodeURIComponent(number) : "";

document.getElementById("msg").textContent = number ? `Dialing ${number}…` : "Dialing…";

const dialLink = document.getElementById("dialLink");
if (protoUrl) dialLink.href = protoUrl;

function triggerDial() {
  if (!protoUrl) return;
  // Anchor-click pattern: more reliable than window.location for custom
  // protocol handlers (counts as a synthetic user gesture in many cases).
  dialLink.click();
}

// Try once on load. If Chrome blocks (no user gesture), the user can click
// the "Dial now" button manually — same code path runs and counts as gesture.
triggerDial();

document.getElementById("closeBtn").addEventListener("click", () => {
  try { window.close(); } catch {}
});

// Auto-close after 6s — long enough for the Chrome prompt to appear,
// the user to click Allow, and the OS to launch RingEX.
setTimeout(() => { try { window.close(); } catch {} }, 6000);
