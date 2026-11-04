// Exports full-page PNGs of the landing pages at 375 / 768 / 1440 → exports/page/<page>-<width>.png
// Reduced motion is on, so every section shows its finished state (the system's rule: reduced motion = the end state).
// The page is scrolled top to bottom first, so every in-view reveal has run.
// Usage: node scripts/export-page.mjs [baseUrl] [page...]   pages: cowork (/), bulbul, document-ai
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const base = process.argv[2]?.startsWith("http") ? process.argv[2].replace(/\/$/, "") : "http://localhost:3000";
const PAGES = { cowork: "/", bulbul: "/bulbul", "document-ai": "/document-ai" };
const only = process.argv.slice(2).filter((a) => !a.startsWith("http"));
const pages = Object.entries(PAGES).filter(([k]) => !only.length || only.includes(k));
const WIDTHS = [375, 768, 1440];

mkdirSync("exports/page", { recursive: true });
const browser = await chromium.launch();
for (const [name, path] of pages) for (const width of WIDTHS) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: width === 1440 ? 1 : 2, reducedMotion: "reduce" });
  const p = await ctx.newPage();
  await p.goto(base + path, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  // never let dev tooling into a shipped image
  await p.addStyleTag({ content: "nextjs-portal{display:none!important}" });
  const H = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < H; y += 600) { await p.evaluate((y) => scrollTo({ top: y, behavior: "instant" }), y); await p.waitForTimeout(80); }
  await p.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  await p.waitForTimeout(1200);
  const out = `exports/page/${name}-${width}.png`;
  await p.screenshot({ path: out, fullPage: true });
  console.log(`${out}  ${width}×${await p.evaluate(() => document.body.scrollHeight)}`);
  await ctx.close();
}
await browser.close();
