#!/usr/bin/env bash
# Run the web-search skill. Builds the binary on first run.
# Usage:
#   ./run.sh search <query>
#   ./run.sh get_url <url>
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

if [ ! -x "$SCRIPT_DIR/webtool" ]; then
  go build -C "$SCRIPT_DIR" -buildvcs=false -o webtool ./cmd/webtool
fi

exec "$SCRIPT_DIR/webtool" "$@"
