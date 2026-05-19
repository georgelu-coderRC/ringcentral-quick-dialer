# Setup

RingCentral Quick Dialer is distributed through the **Chrome Web Store**. Chrome handles installation and updates automatically.

## Step 1. Install the extension

1. Open the [RingCentral Quick Dialer listing in the Chrome Web Store](https://chromewebstore.google.com/detail/ringcentral-quick-dialer/ldjckpipdcjhkaefdglkimakkognecck).
2. Click **Add to Chrome**.
3. Confirm the permissions prompt.
4. Pin the extension to your toolbar by clicking the puzzle-piece icon and the pin next to **RingCentral Quick Dialer**.

!!! tip "Updates"
    Chrome updates the extension automatically when a new version is published to the Chrome Web Store.

## Step 2. Connect your RingCentral account

1. Click the **Quick Dialer** icon in your Chrome toolbar to open the side panel.
2. Open the **Settings** tab.
3. Click **Connect to RingCentral**.
4. A RingCentral sign-in window opens — log in with your normal RingCentral credentials and approve access.
5. The window closes automatically. Settings will now show **Connected** with a green indicator.

<figure markdown>
  ![Settings tab showing Connected status and auto-dial interval options](img/settings.png){ width="320" }
  <figcaption>Settings tab. Once connected, you'll see a green "Connected" pill and the auto-dial interval controls.</figcaption>
</figure>

!!! note
    The extension uses RingCentral's official OAuth flow. Your password is never seen by the extension — only RingCentral handles your sign-in, and you can revoke access at any time from your RingCentral account.

## Step 3. Configure auto-dial timing

In **Settings → Auto-dial interval**, choose how long the extension should wait before dialing the next number when a call ends:

| Option   | Behavior                                            |
|----------|-----------------------------------------------------|
| **Off**  | Auto-dial disabled; click numbers manually          |
| **3s** / **5s** / **10s** / **30s** | Preset delays                            |
| **Custom** | Enter any value from 1 to 600 seconds in the input box |

!!! tip "Recommended starting point"
    **5 seconds** — enough time to take notes, short enough to keep momentum.
