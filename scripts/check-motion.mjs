// Motion QA (components.md §5): animated components must never change size, and dashboards must work.
// Usage: node scripts/check-motion.mjs [url] [width]
import { chromium } from "playwright";
const url = process.argv[2] ?? "http://localhost:3000/components";
const widths = process.argv[3] ? [+process.argv[3]] : [375, 768, 1440];
const b = await chromium.launch();
let fail = 0;
for (const w of widths) {
  const p = await b.newPage({ viewport: { width: w, height: 1000 } });
  const errors = []; p.on("pageerror", (e) => errors.push(e.message)); p.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await p.goto(url, { waitUntil: "networkidle" });
  // 1 · Size stability while loops run (each target scrolled into view so it animates)
  const targets = [".sr-mock--plan", ".sr-mock--research", ".sr-mock--review", "[data-dashboard=cowork]", "[data-dashboard=schedule]", ".sr-feature-row", ".sr-bento__tile"];
  for (const sel of targets) {
    const el = p.locator(sel).first(); await el.scrollIntoViewIfNeeded();
    const hs = new Set(), ws = new Set();
    for (let i = 0; i < 40; i++) { const bb = await el.boundingBox(); hs.add(Math.round(bb.height)); ws.add(Math.round(bb.width)); await p.waitForTimeout(250); }
    const ok = hs.size === 1 && ws.size === 1; if (!ok) fail++;
    console.log(`${w} ${ok ? "PASS" : "FAIL"} stable size  ${sel}  h:${[...hs].join("/")} w:${[...ws].join("/")}`);
  }
  // 2 · Cowork dashboard works: select → run now → message → approve (KPI updates)
  const db = p.locator("[data-dashboard=cowork]"); await db.scrollIntoViewIfNeeded();
  const count = async () => parseInt((await db.locator(".db-side__count").textContent()) ?? "0", 10);
  const kpiBefore = await count();
  await db.getByRole("option", { name: /Paid Media/ }).click();
  await db.locator(".db-detail__head .db-run").click(); await p.waitForTimeout(3500);
  const pill = await db.locator(".db-detail__who .db-status").textContent();
  await db.locator(".db-input input").fill("Also check the weekend spend"); await db.locator(".db-input input").press("Enter"); await p.waitForTimeout(1500);
  const msgs = await db.locator(".db-msg").count();
  await db.locator(".db-approve button").click(); await p.waitForTimeout(500);
  const kpiAfter = await count();
  const cowOk = /Needs your yes/.test(pill) && msgs === 2 && kpiAfter === kpiBefore - 1;
  if (!cowOk) fail++;
  console.log(`${w} ${cowOk ? "PASS" : "FAIL"} cowork: select→run now→message→approve  [pill="${pill}", msgs=${msgs}, needs-yes ${kpiBefore}→${kpiAfter}]`);
  // 3 · Schedule dashboard works: toggle → run now → log + queue → approve
  const sd = p.locator("[data-dashboard=schedule]"); await sd.scrollIntoViewIfNeeded();
  await sd.getByRole("switch", { name: /Weekly readout/ }).click();
  const on = await sd.getByRole("switch", { name: /Weekly readout/ }).getAttribute("aria-checked");
  await sd.getByRole("button", { name: /Run Spend watch now/ }).click(); await p.waitForTimeout(1600);
  const logHas = await sd.locator(".db-log").textContent();
  await sd.getByRole("button", { name: /Approve: Pause 2 ad sets/ }).click(); await p.waitForTimeout(500);
  const approvedN = await sd.locator(".db-queue li[data-state=approved]").count();
  const schOk = on === "true" && /Wasted budget flagged/.test(logHas) && approvedN === 1;
  if (!schOk) fail++;
  console.log(`${w} ${schOk ? "PASS" : "FAIL"} schedule: toggle→run now→log→approve  [switch=${on}, approved=${approvedN}]`);
  if (errors.length) { fail++; console.log(`${w} FAIL console errors:`, errors.slice(0, 3)); }
  await p.close();
}
await b.close();
process.exit(fail ? 1 : 0);
