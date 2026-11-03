// Layout QA for the Sarvam design system (design-system/layout.md §8.2).
// Usage: node scripts/check-layout.mjs [url]   (default http://localhost:3000/)
//
// Mark sibling sets in the page:
//   <div data-siblings>                 ← a set of side-by-side or stacked siblings
//     <article data-sibling>            ← each sibling
//       <h4 data-line="title">…</h4>    ← text slots whose line counts must match
//       <p data-line="desc">…</p>
// Checks at each width: no horizontal overflow, equal sibling heights when they share a row,
// equal line counts per slot, tap targets ≥ 44px on phone widths.
import { chromium } from "playwright";

const url = process.argv[2] ?? "http://localhost:3000/";
const WIDTHS = [320, 375, 414, 600, 768, 900, 1024, 1280, 1440, 1920];
const browser = await chromium.launch();
let failures = 0;

for (const w of WIDTHS) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const r = await page.evaluate((w) => {
    const issues = [];
    if (document.documentElement.scrollWidth > innerWidth) issues.push(`horizontal overflow (${document.documentElement.scrollWidth}px)`);
    const lineCount = (el) => {
      const rg = document.createRange(); rg.selectNodeContents(el);
      return new Set([...rg.getClientRects()].filter((x) => x.width > 0).map((x) => Math.round(x.top))).size;
    };
    document.querySelectorAll("[data-siblings]").forEach((set, i) => {
      const sibs = [...set.querySelectorAll(":scope > [data-sibling]")];
      if (sibs.length < 2) return;
      const name = set.getAttribute("data-siblings") || `set ${i + 1}`;
      const slots = new Set(sibs.flatMap((s) => [...s.querySelectorAll("[data-line]")].map((e) => e.dataset.line)));
      slots.forEach((slot) => {
        const counts = sibs.map((s) => { const e = s.querySelector(`[data-line="${slot}"]`); return e ? lineCount(e) : "missing"; });
        if (new Set(counts).size > 1) issues.push(`${name} · "${slot}" line counts differ: ${counts.join("/")}`);
      });
      const tops = sibs.map((s) => Math.round(s.getBoundingClientRect().top));
      const sameRow = new Set(tops).size === 1;
      const hs = sibs.map((s) => Math.round(s.getBoundingClientRect().height));
      if (sameRow && new Set(hs).size > 1) issues.push(`${name} · heights differ in one row: ${hs.join("/")}`);
    });
    if (w < 768) document.querySelectorAll("a, button, [role=button], summary").forEach((el) => {
      const b = el.getBoundingClientRect();
      if (b.width && b.height && b.height < 44 && getComputedStyle(el).display !== "inline")
        issues.push(`tap target ${Math.round(b.width)}×${Math.round(b.height)}: "${(el.textContent || "").trim().slice(0, 30)}"`);
    });
    return issues;
  }, w);
  failures += r.length;
  console.log(`${String(w).padEnd(5)} ${r.length ? "FAIL" : "PASS"}${r.length ? "\n  - " + r.join("\n  - ") : ""}`);
  await page.close();
}
await browser.close();
process.exit(failures ? 1 : 0);
