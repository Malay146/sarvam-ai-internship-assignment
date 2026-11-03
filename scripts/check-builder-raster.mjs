// Builder render cost: traces paint + raster work while switching 6 presets.
import { chromium } from "playwright";
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 1100 } });
await p.goto("http://localhost:3000/banners/make", { waitUntil: "networkidle" }); await p.waitForTimeout(1500);
await b.startTracing(p, { categories: ["devtools.timeline", "disabled-by-default-devtools.timeline"] });
for (const n of ["milestone", "funding", "event", "story", "launch", "announcement"]) {
  await p.evaluate((n) => [...document.querySelectorAll(".mk-seg button")].find((x) => x.textContent.trim().toLowerCase() === n).click(), n);
  await p.waitForTimeout(700);
}
const ev = JSON.parse((await b.stopTracing()).toString()).traceEvents;
const sum = (names) => ev.filter((e) => names.includes(e.name) && e.dur).reduce((a, e) => a + e.dur, 0) / 1000;
console.log(`per switch → paint ${(sum(["Paint"]) / 6).toFixed(0)} ms · raster ${(sum(["RasterTask"]) / 6).toFixed(0)} ms · script ${(sum(["FunctionCall", "EvaluateScript"]) / 6).toFixed(0)} ms · layout ${(sum(["Layout", "UpdateLayoutTree"]) / 6).toFixed(0)} ms`);
await b.close();
