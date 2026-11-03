// Hover-cost QA: traces paint + raster work while the pointer moves across cards.
// Usage: node scripts/check-hover.mjs [url] [selector]
import { chromium } from "playwright";
const url = process.argv[2] ?? "http://localhost:3000/system";
const sel = process.argv[3] ?? ".hub-link .sr-card, .hub-wide";
const OLD = `.hub-link .sr-card, .hub-wide { transition: border-color .2s, box-shadow .2s !important; }
.hub-link .sr-card::after, .hub-wide::after { display:none !important; }
.hub-link:hover .sr-card, .hub-wide:hover { box-shadow: 0 4px 24px #0000001f !important; }
.sr-card__art, .hub-wide__art { transform:none !important; will-change:auto !important; }`;
async function run(label, legacy) {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
  await p.goto(url, { waitUntil: "networkidle" });
  if (legacy) await p.addStyleTag({ content: OLD });
  await p.waitForTimeout(800);
  const boxes = await p.$$eval(sel, (els) => els.map((e) => { const r = e.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; }));
  await b.startTracing(p, { categories: ["devtools.timeline", "disabled-by-default-devtools.timeline"] });
  for (let k = 0; k < 4; k++) for (const [x, y] of boxes) { await p.mouse.move(x, y, { steps: 6 }); await p.waitForTimeout(260); await p.mouse.move(5, 5, { steps: 4 }); await p.waitForTimeout(260); }
  const buf = await b.stopTracing();
  const ev = JSON.parse(buf.toString()).traceEvents;
  const sum = (names) => ev.filter((e) => names.includes(e.name) && e.dur).reduce((a, e) => a + e.dur, 0) / 1000;
  console.log(`${label.padEnd(22)} paint ${sum(["Paint", "PaintImage"]).toFixed(1).padStart(7)} ms · raster ${sum(["RasterTask"]).toFixed(1).padStart(7)} ms · style+layout ${sum(["UpdateLayoutTree", "Layout"]).toFixed(1).padStart(6)} ms`);
  await b.close();
}
await run("before (box-shadow)", true);
await run("after (layered)", false);
