// Builder speed: time from clicking a situation preset to the next painted frame (median of 6 switches).
import { chromium } from "playwright";
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 1100 } });
await p.goto("http://localhost:3000/banners/make", { waitUntil: "networkidle" }); await p.waitForTimeout(1200);
const names = ["milestone", "funding", "event", "story", "launch", "announcement"];
const times = [];
for (const n of names) {
  const t = await p.evaluate(async (n) => {
    const btn = [...document.querySelectorAll(".mk-seg button")].find((x) => x.textContent.trim().toLowerCase() === n);
    const t0 = performance.now(); btn.click();
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    return performance.now() - t0;
  }, n);
  times.push(t); await p.waitForTimeout(400);
}
times.sort((a, b) => a - b);
console.log("preset switch → painted frame, ms:", times.map((t) => Math.round(t)).join(" "), "| median", Math.round(times[3]));
await b.close();
