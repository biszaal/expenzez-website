// Generates the 1200×630 social share image (public/og-preview.png) from a
// brand-styled HTML card rendered with headless Chromium. Re-run any time the
// headline or branding changes:  npm run og
import { readFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const out = resolve(root, "public/og-preview.png");

// Inline the logo so the render never depends on the network.
const logo = readFileSync(resolve(root, "public/logo512.png")).toString("base64");

const W = {
  bg: "#07050C",
  text: "#F4F1FA",
  dim: "rgba(244,241,250,0.66)",
  primary: "#9D5BFF",
  lime: "#C5F25C",
  card: "#161122",
  border: "rgba(255,255,255,0.12)",
};

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  * { margin: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; }
  body {
    background: ${W.bg};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: ${W.text};
    position: relative;
    overflow: hidden;
  }
  .glow-a { position: absolute; top: -260px; left: -140px; width: 900px; height: 700px;
    background: radial-gradient(ellipse, rgba(157,91,255,0.42), transparent 60%); }
  .glow-b { position: absolute; bottom: -300px; right: -160px; width: 760px; height: 700px;
    background: radial-gradient(ellipse, rgba(197,242,92,0.16), transparent 62%); }
  .wrap { position: relative; height: 100%; display: flex; align-items: center;
    justify-content: space-between; padding: 72px 80px; }
  .left { max-width: 700px; }
  .pill { display: inline-flex; align-items: center; gap: 8px; padding: 9px 16px;
    border-radius: 11px; background: rgba(197,242,92,0.10);
    border: 1px solid rgba(197,242,92,0.28); color: ${W.lime};
    font-size: 17px; font-weight: 700; letter-spacing: 0.6px; }
  .pill .dot { width: 9px; height: 9px; border-radius: 50%; background: ${W.lime}; }
  h1 { font-size: 82px; font-weight: 700; letter-spacing: -3px; line-height: 0.98;
    margin: 30px 0 0; }
  h1 .grad { background: linear-gradient(120deg, ${W.primary}, ${W.lime});
    -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
    font-style: italic; }
  p.sub { font-size: 28px; line-height: 1.45; color: ${W.dim}; margin-top: 28px; max-width: 600px; }
  .badges { display: flex; gap: 14px; margin-top: 40px; }
  .badge { display: inline-flex; align-items: center; gap: 9px; padding: 13px 20px;
    border-radius: 13px; font-size: 19px; font-weight: 600; }
  .badge.ios { background: linear-gradient(135deg, ${W.primary}, #6B2EB8); color: #fff; }
  .badge.and { background: ${W.card}; border: 1px solid ${W.border}; color: ${W.text}; }
  .logo { width: 220px; height: 220px; border-radius: 52px; box-shadow: 0 40px 90px rgba(157,91,255,0.45);
    border: 1px solid ${W.border}; }
  .url { position: absolute; bottom: 44px; right: 80px; font-size: 20px; font-weight: 600;
    color: rgba(244,241,250,0.5); letter-spacing: 0.5px; }
</style></head><body>
  <div class="glow-a"></div><div class="glow-b"></div>
  <div class="wrap">
    <div class="left">
      <span class="pill"><span class="dot"></span>NOW ON iOS &amp; ANDROID</span>
      <h1>Money that<br><span class="grad">actually</span> makes sense.</h1>
      <p class="sub">No bank login required. Upload your statement and get instant AI insights.</p>
      <div class="badges">
        <span class="badge ios"> App Store</span>
        <span class="badge and">&#9658; Google Play</span>
      </div>
    </div>
    <img class="logo" src="data:image/png;base64,${logo}" alt="Expenzez" />
  </div>
  <div class="url">expenzez.com</div>
</body></html>`;

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: "networkidle0" });
  mkdirSync(dirname(out), { recursive: true });
  await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1200, height: 630 } });
  console.log(`✓ wrote ${out}`);
} finally {
  await browser.close();
}
