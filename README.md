# RingCentral Quick Dialer

A Chrome extension that finds phone numbers on any web page and dials them through your RingCentral account, with automatic dialing of the next number when each call ends.

## Features

- Auto-detect numbers on any HTML-based page (CRMs, dashboards, web apps)
- Paste a column from Google Sheets, Excel, or CSV — numbers are normalized to E.164
- Drag-and-drop call list with "Up next" pill
- Auto-dial the next number after a configurable delay (off / 3s / 5s / 10s / 30s / custom)
- Live call status indicator (Ready / Ringing / On a call / Wrapping up)
- Calls launch in a background tab so your workflow keeps focus
- Clean RingCentral-styled side panel

## Install

> **Requires Chrome with Developer mode.**

1. Go to the [Releases page](../../releases/latest) and download the latest `RingCentral-Quick-Dialer-vX.Y.Z.zip`.
2. Unzip it somewhere permanent (e.g. `~/Documents/`).
3. Open `chrome://extensions` in Chrome.
4. Toggle **Developer mode** on (top-right).
5. Click **Load unpacked** and select the unzipped folder.
6. Pin the extension to your toolbar from the puzzle-piece menu.
7. Click the icon, open **Settings**, and click **Connect to RingCentral**.

> **Important:** Always select the top-level unzipped folder (it contains `manifest.json`). Don't select a parent folder — Chrome will throw service-worker errors.

## Usage

See the [User Guide PDF](docs/RingCentral-Quick-Dialer-User-Guide.pdf) for full setup and usage instructions, or the quick summary below.

- **Found tab** — phone numbers detected on the current page. Check ones to add, or click `Call` to dial immediately.
- **Call list tab** — your queue. Drag to reorder, click `Call next` to dial the top item.
- **Settings tab** — connect/disconnect RingCentral, set the auto-dial interval.

For Google Sheets (which renders on a canvas), use **Paste numbers** in the Found tab.

## Building from source

```bash
git clone https://github.com/<your-username>/ringcentral-dialer-extension.git
cd ringcentral-dialer-extension
npm install
echo "VITE_RC_CLIENT_ID=your_ringcentral_client_id" > .env.production
npm run build
```

The built extension is in `dist/`. Load that folder in Chrome via **Load unpacked**.

## Releases

Releases are automated. Pushing a tag like `v2.0.1`:
1. Triggers `.github/workflows/release.yml`
2. Builds the extension with the `VITE_RC_CLIENT_ID` repository secret
3. Zips `dist/`
4. Creates a GitHub Release with the zip attached

```bash
# bump version in package.json + manifest.json, then:
git tag v2.0.1
git push origin v2.0.1
```

## Privacy

- The extension scrapes pages locally — page content is never transmitted anywhere.
- OAuth tokens are stored in Chrome's encrypted extension storage.
- All call requests go directly to RingCentral's official APIs; no third-party servers are involved.

## License

MIT
