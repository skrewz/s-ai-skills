#!/usr/bin/env bash
# Run the web-search skill. Builds the binary on first run.
# If the skill directory is not writable, builds into /tmp instead.
# Usage:
#   ./run.sh search <query>
#   ./run.sh get_url <url>
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Determine where to build/keep the binary.
# Prefer the skill directory; fall back to /tmp if it's not writable.
if [ -x "$SCRIPT_DIR/webtool" ]; then
  BINARY="$SCRIPT_DIR/webtool"
elif [ -w "$SCRIPT_DIR" ]; then
  go build -C "$SCRIPT_DIR" -buildvcs=false -o webtool ./cmd/webtool
  BINARY="$SCRIPT_DIR/webtool"
else
  # Skill directory is not writable — build into /tmp.
  # Use a name derived from the source path to avoid collisions.
  TMP_BINARY="/tmp/webtool-web-search-and-retrieval-$(echo "$SCRIPT_DIR" | md5sum | cut -d' ' -f1)"
  if [ ! -x "$TMP_BINARY" ]; then
    go build -C "$SCRIPT_DIR" -buildvcs=false -o "$TMP_BINARY" ./cmd/webtool
  fi
  BINARY="$TMP_BINARY"
fi

exec "$BINARY" "$@"
