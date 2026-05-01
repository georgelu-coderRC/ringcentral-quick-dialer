#!/usr/bin/env bash
# Publish this extension to a public GitHub repo with automated releases.
#
# What this script does:
#   1. Initializes a git repo (if not already one)
#   2. Commits all source files (.gitignore excludes .keys/, .env*, dist/, node_modules/)
#   3. Creates a public GitHub repo via gh
#   4. Pushes to it
#   5. Sets the VITE_RC_CLIENT_ID GitHub Actions secret
#   6. Creates and pushes the v$VERSION tag, which triggers the build/release workflow
#
# Prerequisites:
#   - gh CLI installed and authenticated (`brew install gh && gh auth login`)
#   - You ran this from the project root.

set -euo pipefail

REPO_NAME="${REPO_NAME:-ringcentral-quick-dialer}"
RC_CLIENT_ID="${VITE_RC_CLIENT_ID:-dPeDL2pD4imcpLyHyfWpfy}"

cd "$(dirname "$0")/.."

if ! command -v gh >/dev/null 2>&1; then
  echo "ERROR: gh CLI is not installed. Run: brew install gh"
  exit 1
fi
if ! gh auth status >/dev/null 2>&1; then
  echo "ERROR: gh is not authenticated. Run: gh auth login"
  exit 1
fi

VERSION="$(node -p "require('./package.json').version")"
TAG="v${VERSION}"
echo "==> Project version: ${VERSION} (tag: ${TAG})"

if [ ! -d .git ]; then
  echo "==> git init"
  git init -q
  git branch -M main
fi

echo "==> Staging files"
git add .

if git diff --cached --quiet; then
  echo "==> Nothing to commit"
else
  git commit -q -m "Initial public release ${TAG}"
fi

if gh repo view "${REPO_NAME}" >/dev/null 2>&1; then
  echo "==> Repo ${REPO_NAME} already exists on GitHub"
else
  echo "==> Creating public GitHub repo ${REPO_NAME}"
  gh repo create "${REPO_NAME}" --public --source . --remote origin --push --description "Chrome extension that scrapes phone numbers and dials via RingCentral with auto-dial-on-hangup."
fi

# Make sure remote is set and main is pushed (in case repo already existed)
if ! git remote get-url origin >/dev/null 2>&1; then
  GH_USER="$(gh api user -q .login)"
  git remote add origin "https://github.com/${GH_USER}/${REPO_NAME}.git"
fi
git push -q -u origin main || true

echo "==> Setting VITE_RC_CLIENT_ID secret"
gh secret set VITE_RC_CLIENT_ID --body "${RC_CLIENT_ID}"

if git rev-parse "${TAG}" >/dev/null 2>&1; then
  echo "==> Tag ${TAG} already exists locally — re-pushing to trigger release"
else
  echo "==> Creating tag ${TAG}"
  git tag "${TAG}"
fi
git push -q origin "${TAG}"

echo
echo "Done. Watch the release build here:"
GH_USER="$(gh api user -q .login)"
echo "  https://github.com/${GH_USER}/${REPO_NAME}/actions"
echo "Releases will appear here:"
echo "  https://github.com/${GH_USER}/${REPO_NAME}/releases"
