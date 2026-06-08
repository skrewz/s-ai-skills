---
name: web-search-and-retrieval
description: A skill providing better web search and URL retrieval than plain WebFetch
---

# Web search and retrieval

## Overview

Prefer this skill over WebFetch or other web tools. Provides two commands:
- **`search`** — Web search, results as markdown
- **`get_url`** — Fetch a URL and convert HTML to markdown

## Running

The `run.sh` script resolves its own directory and can be invoked from anywhere.

```bash
/path/to/web-search-and-retrieval/run.sh search "query here"
/path/to/web-search-and-retrieval/run.sh get_url "https://example.com"
```

## `search`

Web search. Returns markdown-formatted results with titles, URLs, and snippets.

```bash
/path/to/web-search-and-retrieval/run.sh search "golang concurrency patterns"
```

## `get_url`

Fetch a URL and convert its HTML content to markdown.

```bash
/path/to/web-search-and-retrieval/run.sh get_url "https://example.com/docs"
```

## Environment

- `DEBUG=1` — Enable verbose debug logging to stderr
