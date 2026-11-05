# Recipe · Indus Cowork landing page (+ the playbook for every page)

> **Built (v3):** `src/app/page.tsx` + `src/app/cowork.css` + `src/components/sarvam/{cowork-play,cowork-data,cowork,mega-nav,brand,brand-marks,patterns}.tsx`.
> **Read §0 before building any page.** It is every lesson from building this one and the Bulbul and Document AI pages (`recipes/bulbul-page.md`, `recipes/document-ai-page.md`), so the next page needs no correction rounds.

## 0. Page-building playbook (apply to every new page)

### 0.1 Structure
1. **Hierarchy first, then originality.** A product page is a story: **promise → how it works → why it's different → what it's made of → where it works → control → try it → trust → proof → questions → act.** Proven sections that carry that story (a how-it-works stage, a building-block bento) are fine even if sarvam.ai has similar ones; mix them with our own formats (contrast, integrations grid, approval desk, day timeline, teammate builder). v1 copied Sarvam's order wholesale; v2 dropped the proven sections and lost the hierarchy. Both were rejected.
2. **Take facts from the source, not its layouts.** Every claim comes from the product's page; the section formats are ours.
3. **Header rhythm:** big chapters use the centred header (How it works, Integrations, Try it, Trust); sub-sections use the split header (title left, lead right: building blocks, your yes, while you sleep). Never the same header style three times in a row.
4. **Engage, but don't make every section a control panel.** Only a few are hands-on (builder, timeline, approval desk — which plays itself until the reader steps in); the rest are passive and calm. Interactive sections end in a clear next step.
5. **One idea per section**, said as a contrast or a promise ("An assistant answers. A teammate finishes.", "Nothing ships without your yes").

### 0.2 Authentic or absent
6. Facts only from `voice.md` §5 (add a new fact there first, with its source). Illustrative UI text inside mocks is fine; claims are not.
7. **Real assets only:** official brand marks (`brand-marks.ts`: Simple Icons CC0, Nucleo social, or the company's own site → `public/brand/integrations/`), Sarvam's published customer logo and photo (`assets.sarvam.ai`), real quotes. No lookalike logos, no initials, no stock faces. AI teammates' avatar = their role icon.
8. A quote about Sarvam (not this product) is headed "What Sarvam's customers say".

### 0.3 Look
9. **Hero:** centred kicker (plain accent text, not a pill) + H1 + lead + buttons, with the **main product dashboard** full-width below. **Hero light: each page owns one** (tokens.md §2.4c): homepage = orange **Sun**, Indus Cowork = **indigo glow**, Bulbul = **garden sunrise** (green core → marigold → cream), Document AI = **seal ink** (red-rose → blush → paper). A radial from the top edge, colour and alpha eased over ≥ 16 stops so no ring shows. A new page picks a light no other page uses.
9a. **Each product page owns its theme: its structure and presentation.** Shared on every page: nav, hero structure, section headers, FAQ, closing card, footer, tokens and controls. Each page owns **section formats drawn from its subject** (Cowork: approval desk, day timeline, teammate builder; Bulbul: studio, tracklist, chorus, ripple stage, multitrack, playground; Document AI: workspace, read-twice comparison, folders, proofreading desk, specimen sheet, index cards) and **one Sarvam light for the hero** (homepage Sun, Cowork indigo glow, Bulbul Dawn). The theme is **not one colour**: colour stays the system's, with indigo for controls and selection and the full tone set given per item (one tone per row, card, voice, fact or door). Never reuse another page's signature format (bento tiles, integrations panel, deployment tiles) just because it exists. Recipe per page: `recipes/<page>.md`.
10. **Navbar:** MegaNav — real menu items, **filled** Nucleo icons in item tones, a frameless featured tile (kicker + serif title + one line + text link), **one CTA** (Talk to Us, primary). Nav links scroll to on-page sections when they exist.
11. **Cards:** white + hairline by default. Colour lives in a soft tone well or a tone surface with grain; never a full saturated card. One tone per block.
12. **Gradients — only where they add a calm sense of place, and soft. Multi-colour gradients always stack their colours vertically** (top → bottom for a hero horizon, bottom → top for panels and the footer), never side by side (Malay, 2026-11-04):
    - integrations panel: the spectrum stacked **bottom → top** (saffron, peach, lilac, periwinkle) fading out ~75% up;
    - selected timeline card: tone-100 rising to white;
    - builder panel: the job's tone surface.
    No gradient on contrast cards, on CTA buttons, or behind a pattern.
13. **Grain** on every gradient and tone surface (token alpha 0.30; page overlays ~0.5–0.7). Not on plain white cards.
14. **Patterns** (gateway / medallion echoes, ornaments) only where Malay asks — currently **none on this page**. The official line motif appears in the hero only. No divider above sections.
15. **Shadows: barely there.** Selected states use a ring + tint, not a lifted shadow; timelines have no shadow at all.
16. **Logos coloured** wherever the mark is the subject (pickers, grids, cards); mono only in a proof strip. Wordmark logos (Canva) stand alone.
17. **Icons:** Nucleo Core only. Outline by default; **filled (glyph)** in chips, tabs, tone tiles, the mega-menu, list labels, and fact lists. Filled fact icons carry their own bottom-to-top indigo gradient + a soft inner shadow, **with no tile behind them**.
18. **Eyebrows sparingly:** only where they add a label (here: the hero kicker, "How it works", "Try it").
19. **Controls never match their surface:** on a white card, unselected chips/tiles are a soft grey fill, no border; the selected one is white with an indigo ring. Segmented controls use one white pill that **slides** between options. Secondary actions are real pills (icon + label), never a bare text link.

### 0.4 Layout
19b. **Links read forward:** text links and "learn more" style links end in a plain forward arrow (→) that slides 3px right on hover. No diagonal ↗ arrow.
19c. **Don't inherit another component's hover motion.** When a page reuses a class (e.g. the `pv-again` pill), override motion that belongs to the original's meaning (its replay icon spins 60°); a copy icon must stay upright.
19d. **Copy buttons** swap icon + label in place ("Copy" → ✓ "Copied", about 1.8s), one at a time (fast exit, then rise in), at a **fixed width**, with a green success tint, and with a hidden-textarea fallback when the clipboard API is blocked.
20. **Side-by-side blocks end on the same line** (stretch; check equal `bottom` at ≥ 1024). Sibling cards: equal heights and line counts (`check-layout`).
21. **One header-to-content gap:** `--space-section-head` (40 / 56). Never stack the header margin on a flex gap.
22. **Interactive boxes have a fixed size** (all states share one grid cell or a fixed height), so nothing moves when content changes. **Tabbed panes (code tabs) have one fixed height on every tab**: longer content scrolls inside with a soft fade at the foot, and long lines wrap. The card beside them never changes height when the tab changes.
23. Grids use `minmax(0, 1fr)` tracks and `min-width: 0` on children; the page clips at `overflow-x: clip`.
24. Phone/tablet rearrange, never squeeze: **nothing scrolls sideways** (rails become 2 × 2 grids, lists become tile grids, tables re-flow); 3-up cards become horizontal cards at 768–1023.
24b. **Everything fits** (layout.md §7.6): no label on two lines, no "…", no text under a neighbour. Climb the fit ladder in order: rearrange → tighten spacing → drop decoration → short label → fluid size (`cqi`) → rewrite copy. Components switch on their own width (container queries, layout.md §7.7), not the viewport.
24c. **Phone spacing tiers:** card padding 32 → 24 below 1024 → 20 below 480 → 16 below 360. Never 0: content never touches a card edge.
25. **No dead space in live panels:** items change state in place (Waiting → Approved / Sent back); logs start pre-filled and keep a fixed length; timelines show every step at once and fill a rail (never swap one card out for the next).
26a. **Card visuals are real mini UIs, not placeholders:** a header row, 3–5 rows with icon + label + meta, a status pill or footer. No grey bars or bare chips standing in for content. An active row never shares its icon tile's colour: tiles are neutral at rest and turn solid (white icon) when their row is active.
26. **Minimal beats busy:** a static grid of real marks beats drifting rows; text beside a grid is top-aligned with its action pinned to the bottom.
27. Cards inside a panel sit centred and are **never sticky** unless asked. Panels with animated layers use `clip-path: inset(0 round …)` so nothing leaks past rounded corners.
28. Use `<div role="group">` + a title, not `<fieldset>/<legend>` (the legend sits on the border).

### 0.5 Motion
29. Transform + opacity only; nothing changes size. Loops run only while visible and stop for good once the reader interacts. Reduced motion = the finished state.
30. **Swaps never overlap:** two layers of the same thing are never visible at once (`AnimatePresence mode="wait"` with a fast exit). Text that belongs to a choice updates **in the same frame** as the choice (no exit wait).
31. Real controls inside mocks really work and are 44px to the finger.
32. In-page links scroll smoothly (off with reduced motion) and land each heading ~88px under the top. QA scripts scroll with `behavior: "instant"`.
33. FAQs: one answer open at a time; 7–8 questions.
33b. **Closing card title: never more than 2 lines at any width.** Keep the copy (Sarvam's own line is fine); widen the title (≤ 30ch), balance it, and scale it with the viewport on phones (voice.md §6). Check the line count at 320–1920.

### 0.6 Before calling it done
34. `check-layout` (10 widths), `check-fit` (9 widths, must exit 0), `check-nav`, no overflow and no page errors in **Chromium and WebKit** at 375 / 768 / 1440, interactions clicked in a script, a production `next build`. Then look: screenshots at 375 / 768 / 1440.

## 1. Section order (v3, as built)

| # | Story beat | Section | Header | Interaction | Component |
|---|---|---|---|---|---|
| 1 | Promise | Hero: kicker + H1 + buttons, live dashboard below | — | passive | `CoworkDashboard` |
| 2 | How it works | It runs the whole task (4 tabs: plans · researches · improves · waits for your yes) | centred + eyebrow | auto-advances; tabs | `Stage` + `HowPanel` |
| 3 | Why it's different | An assistant answers. A teammate finishes. — two white cards, filled icon each side, hollow marks vs indigo checks, a "vs" badge between | centred | passive | `.pv-vs` |
| 4 | What it's made of | Everything a teammate is made of — 5 cards, each with a real mini UI (roster with live status, skill file with steps + shared avatars, today's schedule, knowledge files being read, research query + real sources), quiet loops | split | passive (looping mini UIs) | `BentoTile` + `bento-visuals.tsx` |
| 5 | Where it works | 100+ (top-left) + static 6 × 4 grid of 24 real coloured marks; "Pick apps for a teammate" pill at the bottom; spectrum rising bottom → top | centred | passive (one fade-in) | `IntegrationField` |
| 6 | Control | Nothing ships without your yes — queue (rows change state in place, "Run it again" pill) + Trail activity log (role icons, rail, times) | split | plays itself; can step in | `ApprovalDesk` |
| 7 | Control | It works while you sleep — five delivery cards under one filling rail; current card tinted, no shadow | split | auto; tap a card | `DayScrubber` |
| 8 | Try it | Build your first teammate — job chips, app tiles (max 5), rhythm with sliding pill → teammate card on the job's tone surface + grain | centred + eyebrow | hands-on → Talk to Us | `TeammateBuilder` |
| 9 | Trust | Sovereign by default — four facts with filled gradient icons + three deployment tiles | centred | passive | `.cw-sec` + `TileCard` |
| 10 | Proof | What Sarvam's customers say — Tata Capital | centred | passive | `.cw-quote` |
| 11 | Questions | Questions teams ask first — 8, one open at a time | centred | accordion | `OneFaq` |
| 12 | Act | Meet your first teammate | — | Talk to Us | `CtaCard` |
| 13 | Footer | Brand + tagline + socials (Nucleo social marks, verified links), 4 link columns, trust badges (filled glyph in its own brand hue on a soft tint: ISO indigo, SOC 2 green, residency orange) + legal links, with © + address below them (one hairline above both rows); then a closing band with the wordmark alone at the full container width, its lower 10% submerged below the bottom edge, in a soft grey → white gradient, bottom to top, both stops at 40% opacity, with a subtle inner white edge and a tight, low-blur outer shadow (slight 3D lift). The whole footer carries a spectrum wash stacked bottom → top (saffron, peach, blush, lilac, periwinkle; OKLab) fading out at 95% height, plus grain | — | links | `SiteFooter` |

## 2. Responsive behaviour

Viewport breakpoints move the big layout; inside each section, components switch on their own width (layout.md §7.7). Nothing scrolls sideways at any width.

| Section | Phone (<768) | Tablet (768–1023) | Desktop (≥1024) |
|---|---|---|---|
| Hero | centred text; CTAs two equal columns from 360, equal full width below; dashboard: 6 icon tiles + detail, short status, table re-flow | same; dashboard list is a 2-column named grid | dashboard sidebar (264) + detail |
| How it works | tabs 2 × 2 (icon + one-word label), panel below: visual first in a thin frame, then text | tabs 2 × 2 (title + note); visual on top, title + body beside the checklist | 1024–1279: tabs 2 × 2 above, panel text 5 / visual 7 · ≥ 1280: side rail 3 / panel 9 |
| Assistant vs teammate | stacked, no "vs" badge; labels one line (sized to the card) | 2 columns + "vs" | same |
| Building blocks | 1 column, tight wells; every mini-UI row one line | 2 + 2 + 1 | 3 + 3 / 2 + 2 + 2 |
| Integrations | padded panel; number, text, pill; 6-up logo grid (4 rows) | same | number left (pill at the foot) / 6 × 4 grid right |
| Approval desk | queue (Approve = round ✓ beside ✕), then trail | same, worded Approve | queue 7 / trail 5, equal height |
| Timeline | stacked cards | same | 1024–1279: one row per event · ≥ 1280: five cards on one rail, aligned rows |
| Builder | controls, then the teammate card; short labels on narrow fields and tiles; CTA "Talk to us"; card rows are flex (label 68px, value fills), never grid: WebKit kept grid rows at their old height when a value rewrapped on resize | same; apps 3-up | controls 7 / panel 5 (card centred, not sticky); apps 4-up from 1280 |
| Security | < 560: icon-beside rows, two balanced lines each · 560–767: facts 2 × 2, icon above (24ch) · deployment tiles as rows (19ch under 372, so all three take three lines) | facts 2 × 2 · deployment tiles 3-up with the tile above the text, titles one line (sized to the card), 19ch so all take three lines | facts 4 across · 1024–1439: deployment tiles 3-up, tile above the text · ≥ 1440: tile beside the text |
| Customer quote | 18px quote, tighter padding, role line one line | centred | centred |
| FAQ | full width | max 720 | max 720, centred |

## 3. Quality gates (all must pass before export)
Check sibling line counts with a resize **sweep, not spot widths**: every 4px from 320 to 1920, resizing **down as well as up**, in **WebKit as well as Chromium**. The Builder overlap and the Private Cloud three-line wrap only showed up that way (2026-11-05).
1. `node scripts/check-layout.mjs http://localhost:3000/`: no overflow, sibling parity, 44px tap targets at 10 widths.
2. `node scripts/check-motion.mjs http://localhost:3000/`: no element changes size while animating; dashboards work.
3. `node scripts/check-nav.mjs http://localhost:3000/`: transparent → solid → transparent.
4. `node scripts/check-perf.mjs http://localhost:3000/`: idle loops cause no layout per second outside mocks.
5. Copy: every claim is in `voice.md` §5; CTA is "Talk to Us".
6. Manual: check on a real phone (Malay).

## 4. Export
`node scripts/export-page.mjs` → full-page PNGs at 375 / 768 / 1440 in `deliverables/4-web-page/` (Indus Cowork) and `deliverables/6-writeup/system-tests/` (Bulbul, Document AI).
