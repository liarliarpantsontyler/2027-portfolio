#!/usr/bin/env bash
# One-time: publish local `main` to GitHub, set default branch, remove old Cursor branch.
# Requires: git auth to github.com (HTTPS credential helper or SSH) and `gh auth login`.
set -euo pipefail
cd "$(dirname "$0")/.."

CURRENT="$(git branch --show-current)"
if [[ "$CURRENT" != "main" ]]; then
  echo "Expected to be on main (got: $CURRENT). Run: git branch -m main"
  exit 1
fi

echo "→ Pushing main to origin…"
git push -u origin main

echo "→ Setting GitHub default branch to main…"
gh repo edit liarliarpantsontyler/2027-portfolio --default-branch main

if git ls-remote --exit-code origin refs/heads/cursor/rebuild-personal-portfolio &>/dev/null; then
  echo "→ Deleting remote cursor/rebuild-personal-portfolio…"
  git push origin --delete cursor/rebuild-personal-portfolio
fi

echo "Done. In Netlify: Build & deploy → Production branch → main, then trigger deploy."
