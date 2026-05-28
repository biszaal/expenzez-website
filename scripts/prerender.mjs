// Build-time prerender: serves the freshly built SPA, visits each route with
// headless Chromium, and writes the fully-rendered HTML back to disk so search
// engines and social crawlers get real content (not an empty <div id="root">).
// React hydrates these snapshots on load (see src/index.tsx). Runs as `postbuild`.
import { createServer } from "node:http";
import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "build");

// Routes worth shipping as static HTML. /download and /account-deletion are
// noindex but still benefit from a real no-JS fallback.
const ROUTES = ["/", "/privacy", "/terms", "/support", "/download", "/account-deletion"];

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

if (!existsSync(join(dist, "index.html"))) {
  console.error("✗ prerender: build/index.html not found — run `vite build` first.");
  process.exit(1);
}

// Minimal static server with SPA history fallback to index.html.
const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://localhost");
    let filePath = join(dist, decodeURIComponent(url.pathname));
    let isFile = existsSync(filePath) && (await stat(filePath)).isFile();
    if (!isFile && extname(url.pathname) === "") {
      filePath = join(dist, "index.html"); // SPA fallback
      isFile = true;
    }
    if (!isFile) {
      res.writeHead(404).end("Not found");
      return;
    }
    const body = await readFile(filePath);
    res.writeHead(200, { "Content-Type": MIME[extname(filePath)] || "application/octet-stream" });
    res.end(body);
  } catch (err) {
    res.writeHead(500).end(String(err));
  }
});

await new Promise((r) => server.listen(0, r));
const port = server.address().port;
const origin = `http://localhost:${port}`;

let browser;
try {
  browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
} catch (err) {
  // Prerendering is a progressive enhancement. If headless Chromium isn't
  // available (e.g. a CI image without it), don't fail the build — the SPA
  // output is already complete and renders client-side.
  console.warn(`⚠ prerender skipped — could not launch headless Chromium: ${err.message}`);
  console.warn("  Shipping the client-rendered SPA build instead.");
  server.close();
  process.exit(0);
}

let failures = 0;
try {
  for (const route of ROUTES) {
    const page = await browser.newPage();
    try {
      await page.goto(`${origin}${route}`, { waitUntil: "networkidle0", timeout: 30000 });
      // Wait until React has rendered into #root.
      await page.waitForFunction(
        () => {
          const el = document.getElementById("root");
          return !!el && el.childElementCount > 0;
        },
        { timeout: 15000 }
      );
      const html = await page.evaluate(() => {
        // Reset scroll-reveal elements to their pre-reveal class so the
        // snapshot matches React's first client render (avoids a hydration
        // mismatch). The <noscript> rule in index.html keeps them visible
        // for non-JS visitors; JS visitors re-reveal them via the observer.
        document
          .querySelectorAll(".reveal.is-visible")
          .forEach((el) => el.classList.remove("is-visible"));
        return "<!doctype html>\n" + document.documentElement.outerHTML;
      });
      const outFile =
        route === "/" ? join(dist, "index.html") : join(dist, route, "index.html");
      await mkdir(dirname(outFile), { recursive: true });
      await writeFile(outFile, html, "utf8");
      console.log(`✓ prerendered ${route} → ${outFile.replace(dist + "/", "")}`);
    } catch (err) {
      failures++;
      console.error(`✗ prerender failed for ${route}: ${err.message}`);
    } finally {
      await page.close();
    }
  }
} finally {
  await browser.close();
  server.close();
}

if (failures) {
  // Don't fail the deploy over individual routes — they still work as SPA.
  console.warn(`⚠ prerender finished with ${failures} route(s) served as SPA.`);
}
console.log("✓ prerender complete.");
