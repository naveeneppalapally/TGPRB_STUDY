#!/usr/bin/env bash
# scripts/sync-repo.sh
# ─────────────────────────────────────────────────────────────────────────────
# Safe catch-up pull for the TGPRB checkout.
#
# The Daily PIB action commits cards to origin/main every morning. This script
# brings the local checkout back in line without ever disturbing your work:
#
#   - never runs on a dirty tree (any local change means skip and log why)
#   - fast-forwards only, so history is never rewritten
#   - skips instead of pulling if you have local commits to push
#   - one run at a time via a lock directory
#   - always appends a one-line result to the log
#
# Scheduled by ~/.config/systemd/user/tgprb-sync.timer (07:45 IST daily, after
# the 07:00 IST scraper run finishes). Also safe to run by hand.
set -u

REPO="${TGPRB_REPO:-$HOME/Documents/TGPRB}"
LOG="${TGPRB_SYNC_LOG:-$HOME/tgprb-sync.log}"
LOCK="$REPO/.git/tgprb-sync.lock"

log() {
  printf '%s  %s\n' "$(date '+%Y-%m-%d %H:%M:%S %Z')" "$1" >>"$LOG"
}

# Only one sync at a time.
if ! mkdir "$LOCK" 2>/dev/null; then
  log "SKIP  another sync is already running"
  exit 0
fi
trap 'rmdir "$LOCK" 2>/dev/null || true' EXIT

if [ ! -d "$REPO/.git" ]; then
  log "ERROR repository not found at $REPO"
  exit 1
fi
cd "$REPO" || { log "ERROR cannot enter $REPO"; exit 1; }

# Never touch a working tree that has changes in it.
if [ -n "$(git status --porcelain)" ]; then
  count=$(git status --porcelain | wc -l | tr -d ' ')
  log "SKIP  $count local change(s) present, nothing pulled"
  exit 0
fi

if ! git fetch --quiet origin main; then
  log "WARN  fetch failed, offline or remote unreachable"
  exit 1
fi

local_head=$(git rev-parse HEAD)
remote_head=$(git rev-parse origin/main)

if [ "$local_head" = "$remote_head" ]; then
  log "OK    already up to date"
  exit 0
fi

ahead=$(git rev-list --count "$remote_head..$local_head")
if [ "$ahead" -gt 0 ]; then
  log "SKIP  local ahead by $ahead commit(s), push before pulling"
  exit 0
fi

behind=$(git rev-list --count "$local_head..$remote_head")
if git merge --ff-only --quiet origin/main; then
  log "OK    fast-forwarded $behind commit(s): $(git log --oneline -1)"
else
  log "WARN  fast-forward refused, no changes made"
  exit 1
fi
