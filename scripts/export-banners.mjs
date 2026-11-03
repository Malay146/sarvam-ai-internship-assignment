// Exports banners/briefs.json → banners/png/<platform>-<id>.png at exact sizes.
// Each brief lists the format per platform (meta: portrait|square, linkedin: landscape).
// Usage: node scripts/export-banners.mjs [baseUrl] [briefId...]
import { chromium } from "playwright";
import { mkdirSync, readFileSync } from "node:fs";
const base = process.argv[2]?.startsWith("http") ? process.argv[2] : "http://localhost:3000";
const only = process.argv.slice(2).filter((a) => !a.startsWith("http"));
const briefs = JSON.parse(readFileSync("banners/briefs.json", "utf8")).filter((b) => !only.length || only.includes(b.id));
mkdirSync("banners/png", { recursive: true });
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1400, height: 1400 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
for (const item of briefs) for (const [platform, format] of Object.entries(item.formats)) {
  const p = await ctx.newPage();
  const q = Buffer.from(JSON.stringify(item.spec)).toString("base64url");
  await p.goto(`${base}/banners/render?f=${format}&id=${item.id}&b=${q}`, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(600);
  // Never let dev tooling (Next.js issue badge, build indicator) into a shipped PNG.
  await p.addStyleTag({ content: "nextjs-portal{display:none!important}" });
  const el = await p.$("#banner > *"); const box = await el.boundingBox();
  const out = `banners/png/${platform}-${item.id}.png`;
  await el.screenshot({ path: out });
  console.log(`${out}  ${Math.round(box.width)}×${Math.round(box.height)}`);
  await p.close();
}
await b.close();
