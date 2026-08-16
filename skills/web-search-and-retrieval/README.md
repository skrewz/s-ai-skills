# Web search and retrieval skill

A CLI skill with two commands:
- **`search`** — Web search, results as markdown
- **`capture_url`** — Render a URL in headless Chrome, capture a PNG + live DOM markdown

## Usage

```bash
# Search the web
./run.sh search "golang concurrency patterns"

# Capture a page (screenshot + markdown)
./run.sh capture_url "https://example.com"

# Capture scrolled 500px down
./run.sh capture_url "https://example.com" --scroll-offset 500

# Custom output directory and viewport
./run.sh capture_url "https://example.com" --output-dir /tmp/screenshots --viewport-width 1920 --viewport-height 1080
```

### capture_url arguments

| Argument | Description | Default |
|---|---|---|
| `url` | The URL to capture (required, positional) | — |
| `--output-dir <dir>` | Directory for output files | `/tmp/webtool-screenshots` |
| `--scroll-offset <px>` | Vertical scroll in pixels | `0` |
| `--viewport-width <px>` | Viewport width in pixels | `1280` |
| `--viewport-height <px>` | Viewport height in pixels | `720` |

Each invocation creates a timestamped subfolder. All output file paths
are printed to stdout. For HTML pages, a PNG screenshot and `.md` dump
(post-JS DOM via [turndown](https://github.com/mixmark-io/turndown)) are
produced. For PDFs and other downloadable content, the file is saved
with its proper extension.

## Environment Variables

- `DEBUG` — Enable debug logging (any non-empty value)

## Development

```bash
make build    # Build the binary
make test     # Run all tests
make clean    # Remove built binary
```

## Files

| File | Purpose |
|------|---------|
| `cmd/webtool/main.go` | CLI entrypoint (search only) |
| `internal/search/search.go` | Web search logic |
| `internal/scraper/scraper.go` | HTML fetching (used by search) |
| `internal/screenshot/capture_url.js` | Headless Chrome capture via Playwright |
| `Makefile` | Build targets |
| `go.mod` / `go.sum` | Go module dependencies |
