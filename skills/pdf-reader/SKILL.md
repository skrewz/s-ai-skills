---
name: pdf-reader
description: Use this skill whenever the user wants to read, extract text or tables from, or understand the content of a PDF file.
---

# PDF Reader

## Working directory

Always work inside `./.opencode/tmp/`, creating it if it doesn't exist. This keeps the working directory clean.

```bash
mkdir -p ./.opencode/tmp
```

## Strategy

When asked to read or extract content from a PDF, follow this order:

1. **Try pdfplumber first** — best for structured text extraction and table detection.
2. **Fall back to pdftoppm** — if text extraction produces garbled output, the PDF is scanned, or you're simply unsure, convert pages to images and read them visually.

**CRITICAL: Always use text extraction as a survey tool.** Read the full text of the PDF first (via pdfplumber or pdftotext) to identify which pages contain the content the user cares about. Then convert *only those specific pages* to images with pdftoppm and read them visually. This gives you the best of both worlds — fast scanning to find relevant pages, then pixel-perfect reading of the pages that matter.

## Extract with pdfplumber

Use `uv run --with pdfplumber` to run without installing anything globally.

### Read all pages

```python
import pdfplumber

with pdfplumber.open("file.pdf") as pdf:
    for page in pdf.pages:
        print(page.extract_text())
```

### Read specific pages

```python
import pdfplumber

with pdfplumber.open("file.pdf") as pdf:
    # Single page (0-indexed)
    print(pdf.pages[3].extract_text())

    # Page range (slice, like Python lists — end is exclusive)
    for page in pdf.pages[2:5]:
        print(page.extract_text())
```

### Extract tables

```python
import pdfplumber

with pdfplumber.open("file.pdf") as pdf:
    for i, page in enumerate(pdf.pages):
        tables = page.extract_tables()
        for table in tables:
            for row in table:
                print(row)
```

## Quick text with pdftotext

Good for fast, no-dependency extraction. The `-layout` flag preserves spacing and column structure.

```bash
# All pages
pdftotext file.pdf -

# Page range (1-indexed, inclusive)
pdftotext -f 3 -l 7 file.pdf -

# Preserve layout (columns, spacing)
pdftotext -layout file.pdf -
```

## Fallback: convert to images with pdftoppm

When pdftotext or pdfplumber produce garbled, empty, or nonsensical output — or when dealing with scanned documents — convert pages to PNG images and read them directly.

```bash
# Single page
pdftoppm -png -r 150 file.pdf page

# Page range (1-indexed, inclusive)
pdftoppm -png -r 150 -f 3 -l 7 file.pdf page

# Output: page-01.png, page-02.png, ...
```

The `-r 150` sets resolution to 150 DPI (good balance of quality and file size). The `-f` and `-l` flags specify the first and last page (1-indexed).

The resulting PNG files can be read directly as images — no OCR needed, since modern models can interpret visual content natively.
