---
name: web-search-and-retrieval
description: A skill providing better web search and URL retrieval than plain WebFetch
---

# Web search and retrieval

## Overview

Prefer this skill over WebFetch or other web tools. Provides two commands:
- **`search`** — Web search, results as markdown
- **`capture_url`** — Render a URL in headless Chrome; produces a PNG screenshot
  and a markdown dump of the live DOM

## Running

The `run.sh` script resolves its own directory and can be invoked from anywhere.

```bash
/path/to/web-search-and-retrieval/run.sh search "query here"
/path/to/web-search-and-retrieval/run.sh capture_url "https://example.com"
```

## `search`

Web search. Returns markdown-formatted results with titles, URLs, and snippets.

```bash
/path/to/web-search-and-retrieval/run.sh search "golang concurrency patterns"
```

## `capture_url`

Open a URL in a headless Chrome browser (with stealth measures to bypass
bot detection), then produce two artefacts:

1. **PNG screenshot** — a viewport screenshot at the requested scroll offset
2. **Markdown dump** — the live DOM (post-JS execution, AJAX, etc.) converted
   to markdown via [turndown](https://github.com/mixmark-io/turndown)

```bash
# Basic capture at top of page
/path/to/web-search-and-retrieval/run.sh capture_url "https://example.com"

# Scrolled 500px down, custom output directory
/path/to/web-search-and-retrieval/run.sh capture_url "https://example.com" --output-dir /tmp/screenshots --scroll-offset 500

# Custom viewport
/path/to/web-search-and-retrieval/run.sh capture_url "https://example.com" --viewport-width 1920 --viewport-height 1080
```

### Arguments

| Argument | Description | Default |
|---|---|---|
| `url` | The URL to capture (required, positional) | — |
| `--output-dir <dir>` | Directory for output files | `/tmp/webtool-screenshots` |
| `--scroll-offset <px>` | Vertical scroll position in pixels | `0` |
| `--viewport-width <px>` | Browser viewport width in pixels | `1280` |
| `--viewport-height <px>` | Browser viewport height in pixels | `720` |

### Output

Each invocation creates a timestamped subfolder under the output directory.
All absolute paths to the produced files are listed on stdout, one per line.

For **HTML pages**, the subfolder contains:
- `capture-<domain>-y<offset>.png` — viewport screenshot
- `capture-<domain>-y<offset>.md` — live DOM as markdown

For **downloadable content** (PDFs, Office docs, etc.), the file is saved
with its proper extension. The agent can use its `pdf-reader` skill (or
similar) to inspect it.

**Always read the screenshot.** It shows exactly how the page renders — layout,
images, tables, and any content loaded by JavaScript. The markdown dump is a
useful supplement for extracting structured text, but the screenshot is the
visual record of what the user would actually see. Use the `read` tool on
the output paths.

### Examples

```bash
# Capture a page
$ ./run.sh capture_url "https://www.msi.com/Motherboard/X870E-GAMING-PLUS-WIFI/Specification"
/tmp/webtool-screenshots/2026-08-08T12-30-00-000Z/capture-www_msi_com-y0.png
/tmp/webtool-screenshots/2026-08-08T12-30-00-000Z/capture-www_msi_com-y0.md

# Read both outputs
read("/tmp/webtool-screenshots/2026-08-08T12-30-00-000Z/capture-www_msi_com-y0.png")
read("/tmp/webtool-screenshots/2026-08-08T12-30-00-000Z/capture-www_msi_com-y0.md")

# Capture a PDF (downloaded, not screenshotted)
$ ./run.sh capture_url "https://example.com/datasheet.pdf"
/tmp/webtool-screenshots/2026-08-08T12-31-00-000Z/capture-datasheet.pdf

# Use pdf-reader skill on the downloaded file
pdf-reader.read("/tmp/webtool-screenshots/2026-08-08T12-31-00-000Z/capture-datasheet.pdf")
```

## Environment

- `DEBUG=1` — Enable verbose debug logging to stderr
