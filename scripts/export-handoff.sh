#!/usr/bin/env bash
# Bundle the repo + Factory CLI session log + secrets template into a single
# zip suitable for handing off to another agent or teammate.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="${HOME}/Desktop/RingCentral-Quick-Dialer-Handoff-$(date +%Y%m%d-%H%M%S).zip"
TMP="$(mktemp -d)"
STAGE="${TMP}/handoff"
mkdir -p "${STAGE}/code" "${STAGE}/sessions"

echo "==> Staging code (excluding node_modules, dist, secrets)"
rsync -a \
  --exclude node_modules \
  --exclude dist \
  --exclude .keys \
  --exclude .env.production \
  --exclude .git \
  "${ROOT}/" "${STAGE}/code/"

echo "==> Copying Factory CLI session logs"
SESS_DIR="${HOME}/.factory/sessions"
if [ -d "${SESS_DIR}" ]; then
  # Copy any session that touched this project's directory
  find "${SESS_DIR}" -name "*.jsonl" -print0 | while IFS= read -r -d '' f; do
    cp "$f" "${STAGE}/sessions/"
  done
  echo "    copied $(ls "${STAGE}/sessions/" | wc -l | tr -d ' ') jsonl session files"
fi

echo "==> Writing secrets template"
cat > "${STAGE}/SECRETS-TEMPLATE.md" <<'TXT'
# Secrets that are NOT in this bundle (recreate manually)

The handoff zip intentionally excludes:

- `.keys/extension-key.pem`  — RSA private key that pins the extension ID
- `.env.production`          — contains VITE_RC_CLIENT_ID

## To re-create

### .env.production
```
VITE_RC_CLIENT_ID=dPeDL2pD4imcpLyHyfWpfy
```

### .keys/extension-key.pem
This is the RSA-2048 private key whose public half is embedded in
`manifest.json` as the `"key"` field. **It pins the extension ID to
`cbdakbkcbonndjgggcbaafkhnjegmnjk`**.

If you have the original key, place it at `.keys/extension-key.pem`.

If you DO NOT have the original key, you can either:

a) Generate a new keypair (this CHANGES the extension ID, which breaks
   all existing OAuth registrations — you'd need to update the redirect URI
   in the RingCentral developer portal):
   ```bash
   mkdir -p .keys
   openssl genrsa -out .keys/extension-key.pem 2048
   openssl rsa -in .keys/extension-key.pem -pubout -outform DER 2>/dev/null \
     | openssl base64 -A > .keys/public-key-base64.txt
   # Paste the contents of public-key-base64.txt into manifest.json as `"key"`.
   ```

b) Skip the `key` field — Chrome will generate a random extension ID per
   install, and the existing OAuth setup will not work for new installs.
TXT

echo "==> Writing README"
cat > "${STAGE}/README.md" <<'TXT'
# RingCentral Quick Dialer — Handoff Bundle

Contents:
- `code/`                    Full project source (no node_modules, no secrets)
- `sessions/`                Factory CLI session jsonl logs (full conversation history)
- `SECRETS-TEMPLATE.md`      What's missing and how to recreate
- `code/HANDOFF.md`          Project context — read this first

## To resume work

1. Read `code/HANDOFF.md`.
2. Recreate `.env.production` and `.keys/` per `SECRETS-TEMPLATE.md`.
3. `cd code && npm install --legacy-peer-deps && npm run build`
4. Load `code/dist/` in Chrome.

## To replay the conversation in another AI agent

Each `sessions/*.jsonl` is a JSON-Lines stream of every message and tool call.
You can either:
- Paste the file directly into a long-context model
- Or have a tool extract just `role`/`content` text fields for a digest
TXT

echo "==> Zipping"
( cd "${TMP}" && zip -rq "${OUT}" handoff )
echo "==> Done: ${OUT}"
ls -lh "${OUT}"

rm -rf "${TMP}"
