// Rendering-cost QA: how much work the page does per second while its loops run (Chrome DevTools metrics).
// Headless fps hides GPU jank, so we measure the work that causes it: style recalcs, layouts, and their time.
// Usage: node scripts/check-perf.mjs [url]
import { chromium } from "playwright";
const url = process.argv[2] ?? "http://localhost:3000/components";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const cdp = await p.context().newCDPSession(p);
await cdp.send("Performance.enable");
await p.goto(url, { waitUntil: "networkidle" });
const m = async () => Object.fromEntries((await cdp.send("Performance.getMetrics")).metrics.map((x) => [x.name, x.value]));
for (const sel of ["#features", "#dashboards", "#emblems", "#cta"]) {
  await p.evaluate((s) => document.querySelector(s)?.scrollIntoView({ block: "center" }), sel);
  await p.waitForTimeout(800);
  const a = await m(); await p.waitForTimeout(4000); const z = await m();
  const per = (k) => +((z[k] - a[k]) / 4).toFixed(k.endsWith("Duration") ? 4 : 1);
  console.log(`${sel.padEnd(14)} styleRecalc/s ${String(per("RecalcStyleCount")).padStart(6)} · layout/s ${String(per("LayoutCount")).padStart(5)} · style ms/s ${(per("RecalcStyleDuration") * 1000).toFixed(1).padStart(6)} · layout ms/s ${(per("LayoutDuration") * 1000).toFixed(1).padStart(6)} · script ms/s ${(per("ScriptDuration") * 1000).toFixed(1).padStart(6)}`);
}
await b.close();
