# RingCentral Quick Dialer

> **A RingCentral Labs product.** RingCentral Labs are experimental apps created by RingCentral's engineers. You can use these apps as-is, or fork the code from GitHub to create an app that solves your business's unique challenges. Please note that Labs apps do not come with an SLA or support outside of that provided via our community and in the forums.

A Chrome extension that finds phone numbers on any web page and dials them through your RingCentral account, with automatic dialing of the next number when each call ends.

## Features

- Auto-detect numbers on any HTML-based page (CRMs, dashboards, web apps)
- Paste names and numbers from Google Sheets, Excel, or CSV — numbers are normalized to E.164
- Drag-and-drop call list with "Up next" pill
- Auto-dial the next number after a configurable delay (off / 3s / 5s / 10s / 30s / custom)
- Live call status indicator (Ready / Ringing / On a call / Wrapping up)
- Calls launch in a background tab so your workflow keeps focus
- Clean RingCentral-styled side panel

## Install

1. Open the [RingCentral Quick Dialer listing in the Chrome Web Store](https://chromewebstore.google.com/detail/ringcentral-quick-dialer/ldjckpipdcjhkaefdglkimakkognecck).
2. Click **Add to Chrome**.
3. Confirm the permissions prompt.
4. Pin the extension to your toolbar from the puzzle-piece menu.
5. Click the icon, open **Settings**, and click **Connect to RingCentral**.

## Usage

See the [User Guide PDF](docs/RingCentral-Quick-Dialer-User-Guide.pdf) for full setup and usage instructions, or the quick summary below.

- **Found tab** — phone numbers and contact names detected on the current page. Check ones to add, or click `Call` to dial immediately.
- **Call list tab** — your queue. Add a name and number manually, drag to reorder, or click `Call next` to dial the top item.
- **Settings tab** — connect/disconnect RingCentral, set the auto-dial interval.

For Google Sheets (which renders on a canvas), use **Paste names/numbers** in the Found tab and copy both name and phone columns when available.

## Building from source

```bash
git clone https://github.com/<your-username>/ringcentral-quick-dialer.git
cd ringcentral-quick-dialer
npm install
echo "VITE_RC_CLIENT_ID=your_ringcentral_client_id" > .env.production
npm run build
```

The built extension is in `dist/`. End users should install the published extension from the Chrome Web Store.

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
