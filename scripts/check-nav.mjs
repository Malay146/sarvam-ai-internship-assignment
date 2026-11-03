// Nav QA: overlay nav is transparent at the top, solid after scrolling > 8px, transparent again below 2px.
// Usage: node scripts/check-nav.mjs [url] [outPrefix]
import { chromium } from "playwright";
const url = process.argv[2] ?? "http://localhost:3000/system";
const out = process.argv[3];
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(url, { waitUntil: "networkidle" }); await p.waitForTimeout(400);
const state = async () => p.evaluate(() => { const n = document.querySelector(".sr-nav"); const s = n.querySelector(".sr-nav__surface"); return { solid: n.dataset.solid, surfaceOpacity: getComputedStyle(s).opacity, position: getComputedStyle(n).position }; });
const steps = [[0, "top"], [5, "5px"], [400, "scrolled"], [5, "back to 5px"], [0, "top again"]];
let fail = 0;
for (const [y, label] of steps) {
  await p.evaluate((v) => window.scrollTo(0, v), y); await p.waitForTimeout(700);
  const s = await state(); console.log(label.padEnd(12), JSON.stringify(s));
  if (out && (label === "top" || label === "scrolled")) await p.screenshot({ path: `${out}-${label}.png`, clip: { x: 0, y: 0, width: 1440, height: 260 } });
  const expect = label === "scrolled" || label === "back to 5px" ? "true" : "false";
  if (s.solid !== expect) { fail++; console.log("  FAIL expected solid =", expect); }
}
await b.close(); process.exit(fail ? 1 : 0);
