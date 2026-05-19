# Project handoff — RingCentral Quick Dialer

This document gives any AI agent (or human) the context they need to pick up
work on this project. Read this first.

---

## What this project is

A Chrome MV3 browser extension ("RingCentral Quick Dialer") that scrapes
phone numbers from the active web page (or accepts pasted lists), queues them,
and dials each number through RingCentral's web phone with auto-dial-on-hangup
between calls. Distributed via the **Chrome Web Store**.

Branding: this is a **RingCentral Labs** product (experimental, no SLA).

---

## Repo & infrastructure

| | |
|---|---|
| Source repo | https://github.com/georgelu-coderRC/ringcentral-quick-dialer |
| Owner / contributor | `RingCentral Labs <labs@ringcentral.com>` (commits) |
| GitHub user that owns the repo | `georgelu-coderRC` |
| Default branch | `main` |
| Visibility | Public |
| Latest release | https://github.com/georgelu-coderRC/ringcentral-quick-dialer/releases/latest |
| Latest release zip | https://github.com/georgelu-coderRC/ringcentral-quick-dialer/releases/latest/download/RingCentral-Quick-Dialer.zip |
| Landing page (GitHub Pages) | https://georgelu-coderrc.github.io/ringcentral-quick-dialer/ |
| User guide PDF | https://georgelu-coderrc.github.io/ringcentral-quick-dialer/RingCentral-Quick-Dialer-User-Guide.pdf |
| Chrome Web Store listing | https://chromewebstore.google.com/detail/ringcentral-quick-dialer/ldjckpipdcjhkaefdglkimakkognecck |

### Required GitHub Actions secret

`VITE_RC_CLIENT_ID` — the RingCentral OAuth Client ID, baked into the build via
Vite's `import.meta.env`. Currently set to `dPeDL2pD4imcpLyHyfWpfy`.

### Pinned extension ID

The `manifest.json` contains a `"key"` field that pins the extension ID to
`cbdakbkcbonndjgggcbaafkhnjegmnjk` regardless of who builds it. The matching
RSA private key is in `.keys/extension-key.pem` (gitignored, **must not be
lost** — without it, OAuth users would have to re-register).

### OAuth redirect URI

`https://cbdakbkcbonndjgggcbaafkhnjegmnjk.chromiumapp.org/oauth`
(must be configured exactly this way in the RingCentral developer portal).

---

## Tech stack

- **Chrome MV3** extension (manifest v3, side panel, service worker)
- **Vite + crxjs** for build
- **React 18** + **Spring UI** (`@ringcentral/spring-ui` v1.9.2) for popup UI
- **Tailwind** for utility classes (use Spring tokens, not Tailwind defaults)
- **dayjs**, **react-virtuoso** for misc UI

Build commands:
```bash
npm install --legacy-peer-deps
echo "VITE_RC_CLIENT_ID=dPeDL2pD4imcpLyHyfWpfy" > .env.production
npm run build       # outputs dist/
```

> **Important:** end users should install from the Chrome Web Store. Local
> builds are only for development/testing.

---

## Project layout

```
.
├── .env.production                # gitignored; contains VITE_RC_CLIENT_ID
├── .keys/                         # gitignored; RSA keypair for extension ID pinning
├── .github/workflows/release.yml  # auto-build & release on tag push
├── background.js                  # service worker: OAuth, dialing, polling, autodial
├── dial.html / dial.js            # invisible bridge tab that triggers rcapp:// dial
├── icons/icon{16,32,48,128}.png   # Lightning-bolt logo on RC blue→orange gradient
├── manifest.json                  # MV3 manifest with pinned `key`
├── offscreen.{html,js}            # offscreen document for WebRTC (currently unused)
├── public/scraper.js              # injected into pages to find phone numbers
├── scraper.js                     # source mirror of public/scraper.js
├── src/popup/
│   ├── App.jsx                    # tab container, header, in-call bar
│   ├── state.js                   # storage helpers, formatPhone
│   └── components/
│       ├── FoundTab.jsx           # detected numbers + Paste numbers + Add all
│       ├── QueueTab.jsx           # call list, drag-and-drop, Up next pill, autodial toggle
│       ├── SettingsTab.jsx        # Connect/Disconnect, autodial interval, Advanced
│       └── CallBar.jsx            # in-call status bar with hangup button
├── docs/
│   ├── index.html                 # GitHub Pages landing page
│   ├── logo.png                   # 128px icon
│   └── RingCentral-Quick-Dialer-User-Guide.pdf
├── scripts/publish-to-github.sh   # one-shot setup helper
├── popup.html                     # entry HTML for the side panel
├── package.json                   # name: "ringcentral-quick-dialer"
└── vite.config.js
```

---

## Key behaviors / decisions

### Scraping
- `public/scraper.js` injected via `chrome.scripting.executeScript`
- Detects phone numbers with a regex; tries to surface row/source context
- Google Sheets uses a canvas — scraping is impossible. The Found tab shows
  an amber callout: *"Google Sheets uses a canvas - Use the Paste Numbers
  Feature Above"* and the user pastes a column instead.

### Dialing
- `dialNumber(e164, opts)` opens a hidden bridge tab `dial.html?n=<e164>`
- The bridge does `window.location = "rcapp://r/call?number=..."` and self-closes
- **All dial tabs open in the background** (`active: false`) so the user's
  current tab keeps focus. This was an explicit user request.

### Auto-dial on hangup
- Background polls `/restapi/v1.0/account/~/extension/~/active-calls`
- Detects `CallConnected → NoCall` transition
- Reads `autodialDelaySec` from storage (clamped 1-600s, with 800ms minimum)
- Schedules `dialNumber(next.e164, { background: true })`
- Broadcasts `autodialPending` event so the side panel can show countdown

### OAuth
- PKCE flow via `chrome.identity.launchWebAuthFlow`
- `OAuthError` class distinguishes user-cancellation vs transient errors
- `connect()` auto-retries once on transient failures (Chrome identity races,
  network blips on token exchange) with 600ms backoff
- Settings UI shows a "Try again" button for non-cancellation errors

### Telephony status mapping (friendly text)
```
NoCall                 → "Ready" (green when connected, gray otherwise)
CallConnected          → "On a call…" (green)
Ringing / OnHold       → "Ringing" / "On hold" (amber)
LocalHold / Busy       → "Wrapping up…" / "Busy" (amber)
```

---

## Distribution

1. Tag a version: `git tag v3.0.1 && git push --tags`
2. GitHub Actions builds + publishes a release zip for archival/testing.
3. Publish the approved build to the Chrome Web Store listing.
4. Users install and receive updates through the Chrome Web Store.

### To bump version
Update **both** `package.json` and `manifest.json` (must match), commit, tag,
push tags. The workflow handles the rest.

---

## Things that were considered and rejected

- **Zip-based direct distribution**: replaced by Chrome Web Store distribution.
- **WebRTC web phone in offscreen document**: was scaffolded then abandoned in
  favor of the simpler `rcapp://` deep-link bridge (works on macOS where the RC
  app is installed). Files remain (`offscreen.{html,js}`) but are unused.
- **Avatar circles in the call list**: removed per user feedback.
- **Microphone permission prompt in Settings**: removed; not needed since
  dialing happens via the RC app, not in-page WebRTC.
- **Forced-foreground dial tab**: changed to background-only after user
  feedback that focus-stealing was disruptive.

---

## Known limitations / open items

- **Node 20 deprecation warning** in GitHub Actions (cosmetic until Sep 2026).
  Bump action versions when convenient.
- **No automated tests.** Manual smoke-test flow: load extension, connect,
  scrape a page, paste a list, dial, verify auto-dial fires.
- **Scraper does not handle Salesforce Lightning canvas / Google Sheets** —
  documented in the user guide as a "use Paste Numbers" workflow.
- **`.keys/extension-key.pem` is the single source of truth** for the
  extension ID. Back it up offline. If lost, the `key` field in `manifest.json`
  must be regenerated and the published extension ID will change, breaking
  every existing installation's RingCentral OAuth registration.

---

## Where the conversation history lives

This entire build conversation (every prompt, tool call, and file edit) is
stored locally as a Factory CLI session log:

```
~/.factory/sessions/-Users-george.lu/<session-id>.jsonl
```

Run `ls -t ~/.factory/sessions/-Users-george.lu/*.jsonl | head -1` to find the
latest. The file is JSON-Lines: each line is one event (user message,
assistant message, tool call, tool result). It contains base64-encoded image
attachments inline.

To share the conversation context with another AI agent, you have three
options:

1. **Just give them this `HANDOFF.md`** — the most readable summary.
2. **Give them the session jsonl** — full raw history including every tool call.
3. **Both.**

There's a helper script (`scripts/export-handoff.sh` — see below) that bundles
the repo + a copy of the session log into a single zip you can hand off.

---

## Quick onboarding for the next agent

1. Read this file.
2. Clone: `git clone https://github.com/georgelu-coderRC/ringcentral-quick-dialer.git`
3. Get `.keys/extension-key.pem` and `.env.production` from secure backup.
4. `npm install --legacy-peer-deps && npm run build`
5. For local development only, test the built `dist/` extension in Chrome.
6. Click extension icon → Settings → Connect to RingCentral.
7. Test on a page with phone numbers.
