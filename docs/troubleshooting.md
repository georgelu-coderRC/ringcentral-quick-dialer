# Troubleshooting

## "Authorization page could not be loaded" when connecting

The RingCentral app's redirect URI doesn't match the extension. Contact your administrator — the redirect URI must be configured in the RingCentral developer portal exactly as shown in **Settings → Advanced → Redirect URI**.

## Extension is missing from Chrome

Open the [Chrome Web Store listing](https://chromewebstore.google.com/detail/ringcentral-quick-dialer/ldjckpipdcjhkaefdglkimakkognecck) and confirm the extension is installed. If it is installed but not visible in the toolbar, click the puzzle-piece icon and pin **RingCentral Quick Dialer**.

## "Connected" but dialing does nothing

- Make sure the RingCentral phone is allowed to open in new tabs (check Chrome's pop-up blocker for `app.ringcentral.com`).
- Check the **Status** indicator — if it shows **On a call**, RingCentral thinks you're already on a call. End it from the RingCentral app.

## Numbers aren't being detected on a page

- Some sites (Google Sheets, Salesforce Lightning canvas views, etc.) render content in a way the extension can't read. Use **Paste numbers** instead.
- Click **Rescan** on the Found tab to re-scan after dynamic content loads.

## Auto-dial isn't firing

- Make sure the **Auto-dial** toggle on the call list is on (blue).
- Check **Settings → Auto-dial interval** is not set to **Off**.
- Make sure the call list isn't empty.
- The countdown only starts after RingCentral reports the call as fully ended (about 1–2 seconds after hangup).

## Numbers paste but get rejected

The extension only accepts valid phone numbers. Numbers must be parseable to E.164 — for US/Canada, that means 10 digits (with or without `+1`, dashes, or parentheses). Extensions, internal short codes, and obviously-invalid entries are skipped.

## I want to disconnect my RingCentral account

Open **Settings** and click **Disconnect**. To fully revoke the extension's access, also visit your RingCentral account settings and remove the app from authorized integrations.

## OAuth fails on the first try

Some Chrome `identity` API races can cause the very first connect attempt to fail. The extension auto-retries once. If you still see an error, click **Try again** in the alert.
