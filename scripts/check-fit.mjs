// Fit QA for the Sarvam design system (deliverables/1-design-system/layout.md §7.4, §7.6, §8.2).
// "Everything fits": no sideways scroll, no clipped or truncated text, no text running past its box,
// no short label broken onto two lines. Complements check-layout.mjs (sibling parity).
//
// Usage: node scripts/check-fit.mjs [url] [widths] [sections]
//   url       default http://localhost:3000/
//   widths    comma list, default 320,375,414,600,768,900,1024,1280,1440
//   sections  comma list of section ids / aria-labelledby ids to limit the run (default: all <main> sections + footer)
//
// Errors (exit 1): SIDEWAYS (a scroll container wider than its box), CLIP (text cut off by overflow: hidden),
//   OVERFLOW (text running past its own box), PAST-VIEWPORT (text past the screen edge).
// Warnings: WRAP (a short label, ≤ 48 chars, on 2+ lines). Headings, paragraphs, FAQ questions and
//   description slots may wrap by design (layout.md §7.6 "Allowed to wrap"), so they are not reported.
// Ignored: decoration (lattices, glows, patterns, marquees) and anything inside [data-fit-ignore].
// Interactive states (tabs, roles, toggles) still need a click-through; see layout.md §8.2.
import { chromium } from "playwright";

const url = process.argv[2] ?? "http://localhost:3000/";
const WIDTHS = (process.argv[3] ?? "320,375,414,600,768,900,1024,1280,1440").split(",").map(Number);
const ONLY = process.argv[4] ? process.argv[4].split(",") : null;
const browser = await chromium.launch();
let errors = 0, warnings = 0;

for (const w of WIDTHS) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  // walk the page so reveal-on-scroll content is in its final state
  const H = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < H; y += 600) { await page.evaluate((y) => scrollTo({ top: y, behavior: "instant" }), y); await page.waitForTimeout(100); }
  await page.waitForTimeout(700);

  const report = await page.evaluate((ONLY) => {
    const out = [];
    const vw = document.documentElement.clientWidth;
    if (document.documentElement.scrollWidth > vw) out.push(["E", "page", `PAGE SIDEWAYS ${document.documentElement.scrollWidth}>${vw}`]);
    const DECOR = ".sr-cta__lattice, .sr-lattice, [class*='glow'], [class*='pattern'], .cw-marquee, [data-fit-ignore], svg";
    const HIDDEN = ".cw-stage__panel[aria-hidden='true'], [inert], [hidden]";
    const MAY_WRAP = "h1, h2, h3, p, dd, blockquote, pre, .pv-faq__q, [data-line='desc'], [data-may-wrap]";   // code blocks wrap long lines by rule (layout.md §7.4)
    const name = (e) => (e.className && typeof e.className === "string" ? "." + e.className.trim().split(/\s+/).join(".") : e.tagName.toLowerCase());
    const textRects = (root) => {
      const rects = []; const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      for (let n = tw.nextNode(); n; n = tw.nextNode()) {
        if (!n.textContent.trim() || n.parentElement.closest(DECOR) || n.parentElement.closest(HIDDEN)) continue;
        const pcs = getComputedStyle(n.parentElement); if (pcs.display === "none" || pcs.visibility === "hidden") continue;
        if (n.parentElement.getBoundingClientRect().width <= 2 || pcs.clipPath.includes("inset(50%")) continue;   // visually-hidden text
        const rg = document.createRange(); rg.selectNodeContents(n);
        for (const r of rg.getClientRects()) if (r.width > 0) rects.push([r, n.textContent.trim()]);
      }
      return rects;
    };
    const sections = [...document.querySelectorAll("main > section, footer")];
    sections.forEach((s, i) => {
      const id = s.id || s.getAttribute("aria-labelledby") || `${s.tagName.toLowerCase()}${i}`;
      if (ONLY && !ONLY.includes(id)) return;
      s.querySelectorAll("*").forEach((e) => {
        if (e.closest(DECOR) || e.closest(HIDDEN)) return;
        const cs = getComputedStyle(e); if (cs.display === "none" || cs.visibility === "hidden") return;
        const rc = e.getBoundingClientRect(); if (rc.width <= 2) return;   // visually-hidden text
        if ((cs.overflowX === "auto" || cs.overflowX === "scroll") && e.scrollWidth > e.clientWidth + 1) out.push(["E", id, `SIDEWAYS ${name(e)} ${e.scrollWidth}>${e.clientWidth}`]);
        const clips = cs.overflowX !== "visible", nowrap = cs.whiteSpace.startsWith("nowrap") || cs.whiteSpace === "pre";
        if ((clips || nowrap) && e.scrollWidth > e.clientWidth + 1) {
          const right = rc.right - parseFloat(cs.borderRightWidth) + 1;
          const hit = textRects(e).find(([r]) => r.right > right);
          if (hit) out.push(["E", id, `${clips ? "CLIP" : "OVERFLOW"} ${name(e)} "${hit[1].slice(0, 40)}"`]);
        }
      });
      for (const [r, t] of textRects(s)) if (r.right > vw + 1) { out.push(["E", id, `PAST-VIEWPORT "${t.slice(0, 40)}"`]); break; }
      s.querySelectorAll("b, strong, span, small, button, a, li, label, time, code, em, dt").forEach((e) => {
        if (e.closest(DECOR) || e.closest(HIDDEN) || e.closest(MAY_WRAP)) return;
        if ([...e.children].some((c) => getComputedStyle(c).display !== "inline")) return;
        const t = e.textContent.trim(); if (!t || t.length > 48 || e.getBoundingClientRect().width <= 2) return;
        const rg = document.createRange(); rg.selectNodeContents(e);
        const tops = new Set([...rg.getClientRects()].filter((x) => x.width > 0 && x.height > 4).map((x) => Math.round(x.top + x.height / 2)));
        if (tops.size > 1) out.push(["W", id, `WRAP ${tops.size} lines: "${t}"`]);
      });
    });
    return out;
  }, ONLY);

  const uniq = [...new Map(report.map((r) => [r.join("|"), r])).values()];
  const e = uniq.filter((r) => r[0] === "E"), wn = uniq.filter((r) => r[0] === "W");
  errors += e.length; warnings += wn.length;
  console.log(`${String(w).padEnd(5)} ${e.length ? "FAIL" : "PASS"}${wn.length ? ` (${wn.length} warning${wn.length > 1 ? "s" : ""})` : ""}`);
  for (const [lvl, id, msg] of uniq) console.log(`  ${lvl === "E" ? "✗" : "!"} ${id} · ${msg}`);
  await page.close();
}
await browser.close();
console.log(errors ? `\n${errors} fit error(s), ${warnings} warning(s)` : `\nAll widths fit${warnings ? ` (${warnings} warning(s))` : ""}`);
process.exit(errors ? 1 : 0);
