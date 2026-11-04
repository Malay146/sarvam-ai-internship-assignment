# Recipe · Indus Cowork landing page

> **Built (v2):** `src/app/page.tsx` + `src/app/cowork.css` + `src/components/sarvam/{cowork-play,mega-nav,brand,cowork}.tsx`.
> **Read §0 before building any page.** It is every lesson from building this one, so the next page needs no correction rounds.

## 0. Page-building playbook (apply to every new page)

### 0.1 Originality: our sections, their facts
1. **Hierarchy first, then originality.** A product page reads as a story: **promise → why it's different → how it works → what it's made of → where it works → control → try it → trust → proof → questions → act.** Proven sections that carry that story (a how-it-works stage, a building-block bento) are fine even when sarvam.ai has similar ones; mix them with our own formats (contrast, integration field, approval desk, day scrubber, teammate builder). v1 copied Sarvam's order wholesale; v2 dropped the proven sections and lost the hierarchy. Both were rejected.
1b. **Header rhythm:** big chapters use the centred header (How it works, Integrations, Try it, Trust); sub-sections inside a chapter use the split header (title left, lead right: building blocks, your yes, while you sleep). Never two identical header styles three times in a row.
2. **Engage, but don't make every section a control panel.** Only a few sections are hands-on (here: the teammate builder, the day scrubber, and the approval desk, which plays itself until the reader steps in). The rest are passive and motion-led (dashboard, drifting integrations, contrast, facts, quote). Interactive sections end in a clear next step ("Talk to us about this teammate").
3. **One idea per section, said as a contrast or a promise** ("An assistant answers. A teammate finishes.", "Nothing ships without your yes").
4. The subject stays the product (Indus Cowork); feel stays Sarvam (tokens, type, gradients, logo rules).

### 0.2 Authentic or absent
5. Facts only from `voice.md` §5 (add a new fact there first, with its source). Illustrative UI text inside mocks is fine; claims are not.
6. Real assets only: official brand marks (`brand-marks.ts`: Simple Icons CC0, Nucleo social, or the company's own site → `public/brand/integrations/`), Sarvam's published customer logo and photo (from `assets.sarvam.ai`), real quotes. No lookalike logos, no initials as avatars, no stock faces. AI teammates' avatar = their role icon.
7. A quote about Sarvam (not this product) is headed "What Sarvam's customers say".

### 0.3 Look
8. **Hero light by expression:** the homepage owns the orange Sun; product pages use the indigo glow (eased colour + alpha, ≥ 16 stops, so no ring shows).
9. **Cards:** white card + hairline; colour lives in a soft tone well or a tone-50 → tone-100 surface with grain. Never a full saturated card. One tone per block.
10. **Logos coloured** wherever the mark is the subject (pickers, directories); mono only in a proof strip.
11. **Icons:** Nucleo Core only. Outline by default; glyph (filled) in chips, tab icons, small tone tiles and the mega-menu.
12. **Patterns** (gateway / medallion echoes, ornaments) only where Malay asks. The official line motif appears in the hero only. No divider above every section.
13. **Eyebrows sparingly:** only where they add a label the heading lacks (here: Indus Cowork kicker, "Try it").
14. **Hero kicker** = plain accent text, not a pill.
14b. **Hero** = centred kicker + H1 + lead + buttons, with the **main product dashboard** (`CoworkDashboard`) full-width below. The product is the hero image.
15. **Navbar:** MegaNav with real menu items, filled icons, a frameless featured tile, and **one CTA** (Talk to Us, primary).

### 0.4 Layout
16. **Side-by-side blocks end on the same line** (stretch; check equal `bottom` at ≥ 1024). Sibling cards: equal heights and line counts (`check-layout`).
17. **One header-to-content gap:** `--space-section-head` (40 / 56). Never stack the header margin on a flex gap.
18. **Interactive boxes have a fixed size** (all states share one grid cell or a fixed height), so nothing moves when content changes.
19. Grids use `minmax(0, 1fr)` tracks and `min-width: 0` on children, or wide mocks push the page sideways. The page clips at `overflow-x: clip`.
20. Phone/tablet rearrange, never squeeze: rails become horizontal scrollers with untruncated labels; 3-up cards become horizontal cards at 768–1023.

### 0.5 Motion
21. Transform + opacity only; nothing changes size. Loops run only while visible and stop for good once the reader interacts. Reduced motion = the finished state, no movement.
22. Real controls inside mocks really work (approve, toggle) and are 44px to the finger.
23. In-page links scroll smoothly (off with reduced motion) and land each heading ~88px under the top. QA scripts must scroll with `behavior: "instant"`.

### 0.6 Before calling it done
24. `check-layout` (10 widths), `check-nav`, no overflow and no page errors in **Chromium and WebKit** at 375 / 768 / 1440, interactions clicked in a script, a production `next build`. Then look at it: screenshots at 375 / 768 / 1440.

## 1. Section order (v3, as built)

| # | Story beat | Section | Header | Interaction | Component |
|---|---|---|---|---|---|
| 1 | Promise | Hero: title + live dashboard | — | passive | `CoworkDashboard` |
| 2 | Why it's different | An assistant answers. A teammate finishes. | centred | passive | `.pv-vs` |
| 3 | How it works | It runs the whole task (4 tabs: plans · researches · improves · waits for your yes) | centred + eyebrow | auto-advances; tabs | `Stage` + `HowPanel` |
| 4 | What it's made of | Everything a teammate is made of (5-card bento) | split | passive | `BentoTile` |
| 5 | Where it works | Works where your work already lives (100+) | centred | passive | `IntegrationField` |
| 6 | Control | Nothing ships without your yes | split | plays itself; can step in | `ApprovalDesk` |
| 7 | Control | It works while you sleep | split | auto; tap a time | `DayScrubber` |
| 8 | Try it | Build your first teammate | centred + eyebrow | hands-on → Talk to Us | `TeammateBuilder` |
| 9 | Trust | Sovereign by default | centred | passive | `.cw-sec` |
| 10 | Proof | What Sarvam's customers say | centred | passive | `.cw-quote` |
| 11 | Questions | Questions teams ask first | centred | accordion | `Faq` |
| 12 | Act | Meet your first teammate | — | Talk to Us | `CtaCard` |

## 2. Responsive behaviour

| Section | Phone (<768) | Tablet (768–1023) | Desktop (≥1024) |
|---|---|---|---|
| Hero | centred text, dashboard below (its own phone layout) | same | same, dashboard full container width |
| Integrations | statement above, logo rows below | statement card over the rows | same |
| Assistant vs teammate | stacked | 2 columns | 2 columns |
| Approval desk | queue, then trail | same | queue 7 / trail 5, equal height |
| Day scrubber | 5 stops across, card below | same | same, wider card |
| Builder | controls, then the teammate card | same; apps 3-up | controls 7 / card 5 (card sticky); apps 4-up from 1280 |
| Security | list | 2 × 2 | 4 across |

## 3. Quality gates (all must pass before export)
1. `node scripts/check-layout.mjs http://localhost:3000/`: no overflow, sibling parity, 44px tap targets at 10 widths.
2. `node scripts/check-motion.mjs http://localhost:3000/`: no element changes size while animating; dashboards work.
3. `node scripts/check-nav.mjs http://localhost:3000/`: transparent → solid → transparent.
4. `node scripts/check-perf.mjs http://localhost:3000/`: idle loops cause no layout per second outside mocks.
5. Copy: every claim is in `voice.md` §5; CTA is "Talk to Us".
6. Manual: check on a real phone (Malay).

## 4. Export
`node scripts/export-page.mjs` → full-page PNGs at 375 / 768 / 1440 in `/exports/page/`.
