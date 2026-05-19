# Setup — RingCentral Quick Dialer

Calls go through the **RingEX (RingCentral) desktop app** via `rcapp://` deep links. The extension uses your RingCentral OAuth login to **detect when each call ends** so it can auto-dial the next number in your queue.

## 1. Install from the Chrome Web Store

1. Open the [RingCentral Quick Dialer listing in the Chrome Web Store](https://chromewebstore.google.com/detail/ringcentral-quick-dialer/ldjckpipdcjhkaefdglkimakkognecck).
2. Click **Add to Chrome**.
3. Confirm the permissions prompt.
4. Pin the extension to your toolbar from the puzzle-piece menu.

Chrome updates the extension automatically when new versions are published.

## 2. Connect

1. Click the **Quick Dialer** icon in the Chrome toolbar.
2. Open the **Settings** tab.
3. Click **Connect to RingCentral**.
4. A RingCentral login window opens — sign in with your normal RingCentral credentials.
5. Status changes to **Connected**.

## 3. Make a call

1. Open any page with phone numbers (or paste from Google Sheets)
2. Switch to **Queue** tab
3. Click **Call next** — your **RingEX desktop app** rings the number.
4. (Optional) toggle **Auto-dial next when call ends** — when the desktop app's call disconnects, the next number in your queue dials automatically.

## How call-end detection works

After each `rcapp://` dial, the extension polls `/restapi/v1.0/account/~/extension/~/active-calls` every ~3 seconds (or 30 seconds in packed/store builds — Chrome's alarm minimum). When the active call you placed disappears from the list, that's the trigger to dial the next queued number.

## Notes

- Calls happen in the **RingEX desktop app** (must be installed and signed in to the same account).
- The OAuth token is used **only for read access** (active-calls polling), never for placing calls.
- Tokens stored locally in `chrome.storage.local`. Click **Disconnect** to revoke and clear them.
- The WebRTC web-phone code is preserved but dormant in this build — can be re-enabled any time.
- Debug logs are available from Chrome's extension details page for RingCentral Quick Dialer.

## Files

```
manifest.json
background.js          - service worker (OAuth, SIP provision, autodial)
offscreen.html         - hidden DOM that hosts the WebRTC softphone
offscreen.js           - web-phone init + event forwarding
vendor/
  ringcentral-web-phone.iife.js   - bundled library (v2.4.1)
popup.html / .css / .js
scraper.js             - page DOM scraper for phone numbers
icons/
SETUP.md (this file)
```
