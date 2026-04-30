# Setup — RingCentral Quick Dialer v2.1

Calls go through the **RingEX (RingCentral) desktop app** via `rcapp://` deep links. The extension uses your RingCentral OAuth login to **detect when each call ends** so it can auto-dial the next number in your queue. Setup takes ~10 minutes.

## 1. Create a RingCentral developer app

1. Go to https://developers.ringcentral.com/ and sign in (or sign up).
2. Click **Create App** in the dashboard.
3. Configure:
   - **Application Type**: REST API App
   - **Platform Type**: Browser-Based
   - **Auth Type**: Authorization Code with PKCE
   - **Allow it to call APIs from**: Your own RingCentral account is fine for testing
4. **App Permissions / Scopes** — add:
   - `ReadAccounts`
   - `ReadCallLog`
   - `ReadPresence`
   - (Optional, if you ever switch to the WebRTC web-phone mode: `VoipCalling`)
5. Save the app. Copy the **Client ID** that gets displayed.

## 2. Configure the redirect URI

The extension uses Chrome's identity API which generates a redirect URI specific to your installed extension.

1. Load the extension as **Unpacked** in `chrome://extensions` (Developer mode ON → Load unpacked → select this folder).
2. Open the extension popup → **Settings** tab.
3. Expand **Setup instructions** and copy the **redirect URI** shown there. It will look like:
   ```
   https://abcdef1234567890.chromiumapp.org/oauth
   ```
4. Back in the RingCentral developer dashboard, edit your app:
   - **OAuth Redirect URIs** → paste the URI from step 3
   - Save

## 3. Connect

1. In the extension popup → **Settings** tab
2. Paste your **Client ID** into the input field
3. Click **Save**, then **Connect to RingCentral**
4. A RingCentral login window opens — sign in
5. Status changes to **Connected**

## 4. Make a call

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
- Debug: `chrome://extensions` → your extension → **service worker** link to see polling logs.

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
