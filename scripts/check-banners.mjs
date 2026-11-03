// Banner QA: every situation (or every saved banner) × every format. Checks, on real rendered geometry:
//  1. text glyphs stay inside the device opening and inside the canvas safe margin
//  2. nothing overlaps: text ↔ text, text ↔ wordmark, wordmark ↔ canvas edge margin
//  3. at most two text sections
// Usage: node scripts/check-banners.mjs [situations|set]
import { chromium } from "playwright";
import { readFileSync } from "node:fs";
const mode = process.argv[2] ?? "situations";
const base = "http://localhost:3000";
const SIT = ["launch", "announcement", "milestone", "funding", "event", "story"];
const FMT = { portrait: [1080, 1350, 72], square: [1080, 1080, 72], landscape: [1200, 627, 56] };
const jobs = [];
if (mode === "set") for (const e of JSON.parse(readFileSync("banners/briefs.json", "utf8"))) for (const f of Object.values(e.formats)) jobs.push([e.id, f, e.spec]);
const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1400, height: 1400 }, reducedMotion: "reduce" });
const p = await ctx.newPage();
let fails = 0;
async function check(label, f, spec) {
  const q = Buffer.from(JSON.stringify(spec)).toString("base64url");
  await p.goto(`${base}/banners/render?f=${f}&id=qa&b=${q}`, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(250);
  const [W, H, M] = FMT[f];
  const r = await p.evaluate(({ W, H, M }) => {
    const root = document.querySelector("#banner > *").getBoundingClientRect();
    const rel = (el) => { const b = el.getBoundingClientRect(); return { x: b.left - root.left, y: b.top - root.top, w: b.width, h: b.height }; };
    // glyph boxes: for SVG text use the <text> bbox, for <p> use a Range
    const glyphs = [...document.querySelectorAll("[data-qa=text]")].map((el) => {
      if (el.tagName.toLowerCase() === "svg") { const bs = [...el.querySelectorAll("text")].map((t) => t.getBoundingClientRect()); const x1 = Math.min(...bs.map((b) => b.left)), y1 = Math.min(...bs.map((b) => b.top)), x2 = Math.max(...bs.map((b) => b.right)), y2 = Math.max(...bs.map((b) => b.bottom)); return { x: x1 - root.left, y: y1 - root.top, w: x2 - x1, h: y2 - y1 }; }
      const rg = document.createRange(); rg.selectNodeContents(el); const b = rg.getBoundingClientRect(); return { x: b.left - root.left, y: b.top - root.top, w: b.width, h: b.height };
    });
    const marks = [...document.querySelectorAll("[data-qa=mark]")].map(rel);
    const open = rel(document.querySelector("[data-qa=open]"));
    return { glyphs, marks, open };
  }, { W, H, M });
  const issues = [];
  const ov = (a, c, pad = 0) => a.x < c.x + c.w + pad && c.x < a.x + a.w + pad && a.y < c.y + c.h + pad && c.y < a.y + a.h + pad;
  const inside = (a, c, tol = 2) => a.x >= c.x - tol && a.y >= c.y - tol && a.x + a.w <= c.x + c.w + tol && a.y + a.h <= c.y + c.h + tol;
  const safe = { x: M, y: M * 0.6, w: W - 2 * M, h: H - M * 1.2 };
  if (r.glyphs.length > 2) issues.push(`${r.glyphs.length} text sections (max 2)`);
  r.glyphs.forEach((g, i) => { if (!inside(g, r.open)) issues.push(`text ${i + 1} spills out of the device opening`); if (!inside(g, safe)) issues.push(`text ${i + 1} outside the safe margin`); });
  for (let i = 0; i < r.glyphs.length; i++) for (let j = i + 1; j < r.glyphs.length; j++) if (ov(r.glyphs[i], r.glyphs[j])) issues.push(`text ${i + 1} overlaps text ${j + 1}`);
  r.marks.forEach((m) => { r.glyphs.forEach((g, i) => { if (ov(m, g, 8)) issues.push(`wordmark touches text ${i + 1}`); }); if (!inside(m, { x: 0, y: 0, w: W, h: H }) || m.y < 24 || m.y + m.h > H - 24) issues.push("wordmark too close to the edge"); });
  fails += issues.length;
  console.log(`${issues.length ? "FAIL" : "PASS"}  ${label.padEnd(14)} ${f.padEnd(10)}${issues.length ? "  " + issues.join("; ") : ""}`);
}
if (mode === "set") for (const [id, f, spec] of jobs) await check(id, f, spec);
else {
  const src = readFileSync("src/components/sarvam/composer.tsx", "utf8");
  const block = src.slice(src.indexOf("export const SITUATIONS"), src.indexOf("};", src.indexOf("export const SITUATIONS")));
  for (const s of SIT) {
    const line = block.split("\n").find((l) => l.trim().startsWith(`${s}:`));
    const obj = Function(`return (${line.slice(line.indexOf("{"), line.lastIndexOf("}") + 1)})`)();
    for (const f of Object.keys(FMT)) await check(s, f, obj);
  }
}
await b.close(); process.exit(fails ? 1 : 0);
