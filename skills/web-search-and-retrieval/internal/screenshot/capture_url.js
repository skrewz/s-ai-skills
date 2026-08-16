#!/usr/bin/env node
// Copyright 2026 Anders Breindahl. All rights reserved.
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file.
//
// Playwright-based headless page capture with stealth measures.
// Renders a URL in Chrome and produces both a PNG screenshot and a
// markdown dump of the live DOM (post-JS execution).
//
// Usage:
//   node capture_url.js <url> [options]
//
// Options:
//   --output-dir <dir>       Directory for output files (default: /tmp/webtool-screenshots)
//   --scroll-offset <px>     Vertical scroll offset in pixels (default: 0)
//   --viewport-width <px>    Browser viewport width in pixels (default: 1280)
//   --viewport-height <px>   Browser viewport height in pixels (default: 720)
//   --help, -h               Show this help message
//
// Output:
//   Prints the path to the saved PNG on stdout (first line).
//   Prints the path to the saved .md file on stdout (second line).
//   Logs debug information to stderr when DEBUG is set.

const { chromium } = require("playwright");
const fs = require("fs");
const os = require("os");
const path = require("path");
const TurndownService = require("turndown");

const DEFAULT_OUTPUT_DIR = "/tmp/webtool-screenshots";
const DEFAULT_SCROLL_OFFSET = 0;
const DEFAULT_VIEWPORT_WIDTH = 1280;
const DEFAULT_VIEWPORT_HEIGHT = 720;
const DEFAULT_TIMEOUT = 30000; // 30 seconds

const debug =
  process.env.DEBUG !== undefined
    ? (...args) => console.error("[capture_url]", ...args)
    : () => {};

// ---------------------------------------------------------------------------
// Argument parsing — URL is positional, everything else is --flag <value>
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const opts = {
    url: null,
    outputDir: DEFAULT_OUTPUT_DIR,
    scrollOffset: DEFAULT_SCROLL_OFFSET,
    viewportWidth: DEFAULT_VIEWPORT_WIDTH,
    viewportHeight: DEFAULT_VIEWPORT_HEIGHT,
  };

  let i = 0;
  while (i < argv.length) {
    const arg = argv[i];

    if (arg === "--help" || arg === "-h") {
      printUsage();
      process.exit(0);
    }

    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      i++; // advance to value
      if (i >= argv.length) {
        console.error(`Error: --${key} requires a value`);
        process.exit(1);
      }
      const value = argv[i];

      switch (key) {
        case "output-dir":
          opts.outputDir = value;
          break;
        case "scroll-offset":
          opts.scrollOffset = parseInt(value, 10);
          if (isNaN(opts.scrollOffset)) {
            console.error(`Error: --scroll-offset must be an integer, got "${value}"`);
            process.exit(1);
          }
          break;
        case "viewport-width":
          opts.viewportWidth = parseInt(value, 10);
          if (isNaN(opts.viewportWidth)) {
            console.error(`Error: --viewport-width must be an integer, got "${value}"`);
            process.exit(1);
          }
          break;
        case "viewport-height":
          opts.viewportHeight = parseInt(value, 10);
          if (isNaN(opts.viewportHeight)) {
            console.error(`Error: --viewport-height must be an integer, got "${value}"`);
            process.exit(1);
          }
          break;
        default:
          console.error(`Error: unknown option --${key}`);
          process.exit(1);
      }
    } else {
      // Positional argument — must be the URL
      if (opts.url === null) {
        opts.url = arg;
      } else {
        console.error(`Error: unexpected argument "${arg}"`);
        process.exit(1);
      }
    }
    i++;
  }

  return opts;
}

function printUsage() {
  console.error(
    `Usage: node capture_url.js <url> [options]\n` +
      `\n` +
      `Options:\n` +
      `  --output-dir <dir>       Directory for output files (default: ${DEFAULT_OUTPUT_DIR})\n` +
      `  --scroll-offset <px>     Vertical scroll offset in pixels (default: ${DEFAULT_SCROLL_OFFSET})\n` +
      `  --viewport-width <px>    Browser viewport width in pixels (default: ${DEFAULT_VIEWPORT_WIDTH})\n` +
      `  --viewport-height <px>   Browser viewport height in pixels (default: ${DEFAULT_VIEWPORT_HEIGHT})\n` +
      `  --help, -h               Show this help message\n` +
      `\n` +
      `Environment:\n` +
      `  DEBUG                    Enable verbose debug logging to stderr`
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function sanitiseDomain(urlStr) {
  try {
    const { hostname } = new URL(urlStr);
    return hostname.replace(/[.\-]/g, "_");
  } catch {
    let hash = 0;
    for (let i = 0; i < urlStr.length; i++) {
      hash = (hash * 31 + urlStr.charCodeAt(i)) | 0;
    }
    return `url_${Math.abs(hash).toString(16)}`;
  }
}

function buildFilename(urlStr, scrollOffset) {
  const domain = sanitiseDomain(urlStr);
  return `capture-${domain}-y${scrollOffset}.png`;
}

function buildMarkdownPath(pngPath) {
  return pngPath.replace(/\.png$/, ".md");
}

function htmlToMarkdown(html) {
  const turndown = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
    emDelimiter: "*",
  });

  // Remove elements that are noise, not content
  turndown.remove(["script", "style", "noscript", "link", "meta"]);

  return turndown.turndown(html).trim();
}

// ---------------------------------------------------------------------------
// Binary download — for non-HTML content types (PDFs, Office docs, etc.)
// that headless Chrome can't render, download the file and save it.
// The agent can then use its pdf-reader skill or similar to inspect it.
// ---------------------------------------------------------------------------

// MIME types we know are not renderable as HTML pages
const DOWNLOADABLE_MIMES = {
  "application/pdf": "pdf",
  "application/zip": "zip",
  "application/x-zip-compressed": "zip",
  "application/x-rar-compressed": "rar",
  "application/msword": "doc",
  "application/vnd.ms-excel": "xls",
  "application/vnd.ms-powerpoint": "ppt",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "docx",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    "pptx",
  "text/plain": "txt",
};

function extensionForMime(contentType) {
  const mime = (contentType || "").split(";")[0].trim().toLowerCase();
  return DOWNLOADABLE_MIMES[mime] || null;
}

function deriveFilename(url) {
  try {
    const { pathname } = new URL(url);
    const file = path.basename(pathname);
    // If the URL already has a sensible filename, strip its extension
    if (file && file !== "/" && file !== "." && file !== "index") {
      return `capture-${file.replace(/\.[^.]+$/, "")}`;
    }
  } catch {
    // ignore
  }
  // Fallback: use domain
  const domain = sanitiseDomain(url);
  return `capture-${domain}`;
}

async function downloadBinary(page, url, outputDir) {
  debug("navigating to:", url);
  const response = await page.goto(url, {
    waitUntil: "networkidle",
    timeout: DEFAULT_TIMEOUT,
  });

  const contentType = response.headers()["content-type"] || "";
  debug("content-type:", contentType);

  const ext = extensionForMime(contentType);
  if (!ext) {
    return false; // not a known binary type — let HTML capture handle it
  }

  debug("detected downloadable content type:", contentType, "ext:", ext);

  const baseName = deriveFilename(url);
  const outputPath = path.join(outputDir, `${baseName}.${ext}`);

  const buffer = Buffer.from(await response.body());
  fs.writeFileSync(outputPath, buffer);
  debug("saved:", outputPath, "(", buffer.length, "bytes)");

  return true;
}

function createTempUserDataDir() {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "webtool-chrome-"));
  debug("created temp user data dir:", tmpDir);
  return tmpDir;
}

function cleanupUserDataDir(dir) {
  try {
    fs.rmSync(dir, { recursive: true, force: true });
    debug("cleaned up temp user data dir:", dir);
  } catch {
    // Ignore cleanup errors
  }
}

function findChromeExecutable() {
  const cacheDir = path.join(os.homedir(), ".cache", "ms-playwright");

  if (fs.existsSync(cacheDir)) {
    const entries = fs
      .readdirSync(cacheDir)
      .filter((e) => e.startsWith("chromium-") && !e.includes("headless"))
      .sort();

    for (const entry of entries) {
      const chromePath = path.join(
        cacheDir,
        entry,
        "chrome-linux64",
        "chrome"
      );
      if (fs.existsSync(chromePath)) {
        return chromePath;
      }
    }
  }

  // Fallback: try system chromium
  const systemPaths = [
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/opt/google/chrome/chrome",
  ];
  for (const p of systemPaths) {
    if (fs.existsSync(p)) {
      return p;
    }
  }

  return null;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const opts = parseArgs(process.argv.slice(2));

  if (!opts.url) {
    console.error("Error: URL is required");
    printUsage();
    process.exit(1);
  }

  debug("url:", opts.url);
  debug("output_dir:", opts.outputDir);
  debug("scroll_offset:", opts.scrollOffset);
  debug("viewport:", `${opts.viewportWidth}x${opts.viewportHeight}`);

  // Ensure base output directory exists
  if (!fs.existsSync(opts.outputDir)) {
    fs.mkdirSync(opts.outputDir, { recursive: true });
    debug("created output directory:", opts.outputDir);
  }

  // Create a timestamped subfolder for this invocation
  const ts = new Date().toISOString().replace(/[:.]/g, "-");
  const sessionDir = path.join(opts.outputDir, ts);
  fs.mkdirSync(sessionDir, { recursive: true });
  debug("session dir:", sessionDir);

  const userDataDir = createTempUserDataDir();
  let browser;

  try {
    const chromeExecutable = findChromeExecutable();
    debug("using chrome executable:", chromeExecutable);

    debug("launching chrome...");
    browser = await chromium.launch({
      executablePath: chromeExecutable,
      headless: true,
      timeout: DEFAULT_TIMEOUT,
      args: [
        "--disable-blink-features=AutomationControlled",
        "--disable-features=AutomationControlled",
        "--no-first-run",
        "--no-default-browser-check",
        "--disable-extensions",
        "--disable-component-extensions-with-background-pages",
        "--no-sandbox",
      ],
    });

    const context = await browser.newContext({
      viewport: { width: opts.viewportWidth, height: opts.viewportHeight },
      userAgent:
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
      locale: "en-GB",
      timezoneId: "Europe/London",
      colorScheme: "light",
      permissions: ["geolocation"],
    });

    // Stealth: override automation markers before any page loads
    await context.addInitScript(() => {
      Object.defineProperty(navigator, "webdriver", {
        get: () => undefined,
      });

      window.chrome = {
        runtime: {
          onMessage: {
            addListener: () => {},
            addRules: () => {},
            removeRules: () => {},
            hasRules: () => {},
          },
          connect: () => ({}),
          sendMessage: () => {},
          PlatformNotifications: {},
          RequestUpdateCheckStatus: {},
          MessageSender: {},
          ConnectInfo: {},
          ConnectedEndpoints: {},
          Message: {},
          Runtime: {},
          ComponentInterface: {},
          Rule: {},
          RuleTrigger: {},
        },
      };

      Object.defineProperty(navigator, "plugins", {
        get: () => [
          { name: "Chrome PDF Plugin", filename: "internal-pdf-viewer" },
          { name: "Chrome PDF Viewer", filename: "mhjfbmdgcfjbbpaeojofohoefgiehjai" },
          { name: "Native Client", filename: "internal-nacl-plugin" },
        ],
      });

      Object.defineProperty(navigator, "languages", {
        get: () => ["en-GB", "en"],
      });

      Object.defineProperty(navigator, "platform", {
        get: () => "Linux x86_64",
      });

      Object.defineProperty(navigator, "hardwareConcurrency", {
        get: () => 8,
      });

      Object.defineProperty(navigator, "deviceMemory", {
        get: () => 8,
      });

      const originalMatchMedia = window.matchMedia;
      window.matchMedia = (query) => {
        const result = originalMatchMedia.call(window, query);
        if (query === "print") {
          result.matches = false;
        }
        return result;
      };

      const originalQuery = window.navigator.permissions.query;
      window.navigator.permissions.query = (parameters) =>
        parameters.name === "notifications"
          ? Promise.resolve({ state: Notification.permission })
          : originalQuery(parameters);
    });

    const page = await context.newPage();

    // Check Content-Type — download binary files, otherwise screenshot HTML
    const handled = await downloadBinary(page, opts.url, sessionDir);
    if (handled) {
      // Binary file was downloaded — list and exit
      listFiles(sessionDir);
      return;
    }

    // HTML page: navigate (again, since downloadBinary already did it),
    // scroll, screenshot, and dump markdown
    if (opts.scrollOffset > 0) {
      debug("scrolling to y=", opts.scrollOffset);
      await page.evaluate((y) => window.scrollTo(0, y), opts.scrollOffset);
      await page.waitForTimeout(500);
    }

    const filename = buildFilename(opts.url, opts.scrollOffset);
    const outputPath = path.join(sessionDir, filename);

    debug("taking screenshot...");
    await page.screenshot({ path: outputPath, type: "png" });
    debug("saved:", outputPath);

    const markdownPath = buildMarkdownPath(outputPath);
    debug("extracting live DOM as markdown...");
    const liveHtml = await page.content();
    const markdown = htmlToMarkdown(liveHtml);
    fs.writeFileSync(markdownPath, markdown, "utf-8");
    debug("saved markdown:", markdownPath, "(", markdown.length, "bytes)");

    listFiles(sessionDir);
  } finally {
    if (browser) {
      await browser.close();
    }
    cleanupUserDataDir(userDataDir);
  }
}

// List all absolute paths under the session directory, one per line
function listFiles(dir) {
  const files = fs
    .readdirSync(dir)
    .filter((f) => {
      const stat = fs.statSync(path.join(dir, f));
      return stat.isFile();
    })
    .sort()
    .map((f) => path.resolve(path.join(dir, f)));

  debug("output files:", files);
  for (const f of files) {
    console.log(f);
  }
}

main().catch((err) => {
  console.error(`Error: ${err.message}`);
  process.exit(1);
});
