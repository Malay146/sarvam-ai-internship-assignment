// Exports every banner in src/components/sarvam/banner-set.tsx to banners/png at its exact size.
// Usage: node scripts/export-banners.mjs [baseUrl] [id...]
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
const base = process.argv[2] ?? "http://localhost:3000";
const ids = process.argv.slice(3).length ? process.argv.slice(3) : ["meta-1-launch", "meta-2-plans", "meta-3-slack", "linkedin-1-launch", "linkedin-2-plans", "linkedin-3-slack"];
mkdirSync("banners/png", { recursive: true });
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1400, height: 1400 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
for (const id of ids) {
  const p = await ctx.newPage();
  await p.goto(`${base}/banners/${id}`, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500);
  const el = await p.$("#banner > *");
  const box = await el.boundingBox();
  await el.screenshot({ path: `banners/png/${id}.png` });
  console.log(`${id}.png  ${Math.round(box.width)}×${Math.round(box.height)}`);
  await p.close();
}
await b.close();
