# Layout

How Sarvam pages are built at every screen size: breakpoints, containers, grids, alignment, section patterns and the rules for how they **rearrange**, not just shrink. All values are tokens in [`tokens.css`](tokens.css). Type roles come from [`typography.md`](typography.md).

**Source labels:** `[verified]` read from sarvam.ai CSS/markup · `[observed]` seen in sarvam.ai screenshots at 375 / 768 / 1440 (`references/site/`) · `[addition]` our own rule.

---

## Rules for AI (read first)

1. **Design mobile first.** Write the 375px layout first, then add tablet and desktop. Mobile is never "desktop squeezed".
2. **Rearrange, don't shrink.** Each pattern in §6 states what moves, stacks, hides or changes at each tier. Follow that table, never just scale.
3. **Siblings are identical** (§5): equal width, equal height, aligned inner rows, and the **same number of lines** in every title and every description. Write copy to fit.
4. **One alignment per role** (§4): the hero is centred; everything else is left-aligned on mobile.
5. **Use tokens only:** `--container-width`, `--space-*`, `--grid-*`. No raw px for layout.
6. **Nothing scrolls sideways. Ever** (§7.4). Rails, chips, tabs and lists rearrange into grids or rows; they never become swipe rows.
7. **Everything fits** (§7.6): no label breaks onto two lines, no text is clipped, truncated with "…" or runs past its box. Fix it with the fit ladder (rearrange → tighten → drop decoration → short label → fluid size → rewrite), in that order.
8. **Check every width,** not only the three exports (§8): `check-fit` + `check-layout` at 9–10 widths, and click every interactive state.

---

## 1. Breakpoints `[verified]`

sarvam.ai uses Tailwind's default breakpoints, and so do we. Most of Sarvam's layout changes happen at **md (768)**, with refinements at lg and xl.

| Tier | Name | Range | Typical device | Export frame |
|---|---|---|---|---|
| T1 | **phone** | 0–639 | phones (320–430) | **375** |
| T2 | **large phone** | 640–767 | large phones in landscape, small tablets | (in-between check: 640) |
| T3 | **tablet** | 768–1023 | iPad portrait | **768** |
| T4 | **laptop** | 1024–1279 | small laptops, iPad landscape | (in-between check: 1024) |
| T5 | **desktop** | 1280+ | desktop | **1440** |
| (cap) | 2xl | 1536+ | wide screens | content stops growing at `--container-max` |

```css
/* mobile first: base styles = phone */
@media (min-width: 640px)  { /* large phone */ }
@media (min-width: 768px)  { /* tablet */ }
@media (min-width: 1024px) { /* laptop */ }
@media (min-width: 1280px) { /* desktop */ }
```

Tailwind: `sm:` `md:` `lg:` `xl:` `2xl:`, identical values.

---

## 2. Container `[verified]` + `[addition]`

Sarvam uses a percentage-width container rather than fixed gutters (`w-[88%] md:w-10/12 2xl:max-w-width-mx`).

| | Phone | Tablet | Laptop | Desktop 1440 |
|---|---|---|---|---|
| `--container-width` | 88% | 83.333% | 83.333% | 83.333% |
| Content width | 330 at 375 · 282 at 320 | 640 at 768 | 853 at 1024 | **1200** at 1440 |
| Side margin | 22.5 at 375 | 64 | 85 | 120 |
| Max width | | | | `--container-max` 1280 (reached at 1536) `[addition]` |

```css
.container { width: var(--container-width); max-width: var(--container-max); margin-inline: auto; }
```

**Full-bleed exceptions:** the hero background (Sun or haze), the dark sovereign band and the footer background span the full viewport. Their **content** still sits in `.container`.

---

## 3. Grid `[addition]`

Sarvam doesn't publish a column grid. We add one so that every section aligns to the same columns.

| | Phone | Tablet | Laptop+ |
|---|---|---|---|
| Columns (`--grid-columns`) | 4 | 8 | 12 |
| Gutter (`--grid-gutter`) | 16 | 24 | 32 |
| Card gap (`--space-grid`) `[verified]` | 32 | 40 | 48 |

```css
.grid { display: grid; grid-template-columns: repeat(var(--grid-columns), minmax(0, 1fr)); column-gap: var(--grid-gutter); }
```

Common spans:

| Content | Phone (of 4) | Tablet (of 8) | Laptop+ (of 12) |
|---|---|---|---|
| Hero text block | 4 | 8 (max 42rem lead) | 8, centred (cols 3–10) |
| Section header | 4 | 6 | 7 (left) + 5 (side content) |
| Split: text / visual | 4 / 4 stacked | 8 / 8 stacked, or 4 / 4 | 5 / 7 or 6 / 6 |
| 3-card row | 4 each (stacked) | 4 + 4, then 8 (see §6) | 4 + 4 + 4 |
| Body paragraph | 4 | 6 | 6 (max 65ch) |

### 3.1 Vertical rhythm `[verified]`

| Token | Phone | Tablet | Laptop+ | Where |
|---|---|---|---|---|
| `--space-hero-top` | 144 | 160 | 160 | top of hero (clears nav) |
| `--space-section` | 96 | 176 | 176 | between sections |
| `--space-section-head` | 40 | 56 | 56 | section header to content |
| `--space-heading-row` | 24 | 48 | 48 | header text to side CTA |
| `--space-grid` | 32 | 40 | 48 | between cards |
| `--space-card` `[addition]` | 24 | 32 | 32 | card padding |

Inside a text block: eyebrow → heading `--space-4`, heading → lead `--space-4`, lead → buttons `--space-8`.

---

## 4. Alignment rules `[addition]`, fixing an inconsistency found on sarvam.ai

On sarvam.ai/indus-cowork at 375px, section headers switch between **centred** ("It runs the whole task", "Runs while you sleep") and **left-aligned** ("Plugs into the stack", "Message an agent") with no clear rule `[observed]`. We fix one rule per role:

| Role | Phone | Tablet | Laptop+ |
|---|---|---|---|
| Hero (eyebrow, H1, lead, buttons) | centred | centred | centred |
| Chapter header above a symmetric grid or cards | **left** | centred | centred |
| Split header (H2 with side text or CTA) | left, stacked | left + right | left + right |
| Card and list content | left | left | left |
| Closing CTA card | centred | centred | centred |
| Numbers in stats | left | left | left, tabular figures |

Why left on phone: centred text over 3+ lines gives a ragged left edge that's hard to read on a narrow screen. Centred is kept for short blocks (≤ 2 lines of lead) and for the hero.

**Never justify text** (`text-align: justify`). It creates uneven gaps between words ("rivers"), especially at narrow widths.

---

## 5. Sibling consistency `[addition]`, our core rule

When two or more blocks sit side by side, or stack as a set (cards, features, steps, stats, testimonials, pricing tiers), they must be **identical in structure and size**. Sarvam's own page doesn't hold this (on mobile, "Teach any skill, or let AI write it" wraps to 2 lines while sibling titles take 1–2; card heights vary) `[observed]`. We hold it everywhere.

### 5.1 The five rules
0. **Side-by-side blocks end on the same line** `[Malay]`. When two blocks sit beside each other (text + visual, rail + panel, skills text + card), both columns have the same height: use `align-items: stretch` and let the shorter side centre its content. Check with a script: equal `bottom` values at 1024+.
1. **Same structure.** If one card has an icon, an eyebrow or a CTA, all of them do. Same order of parts.
2. **Same width.** Use grid tracks `repeat(n, minmax(0, 1fr))`, never `flex-wrap` with content-sized items.
3. **Same height.** Grid items stretch. Cards are `display: flex; flex-direction: column` with the CTA or footer pinned by `margin-top: auto`.
4. **Aligned inner rows.** Icons, eyebrows, titles, descriptions and CTAs start on the same y-position across siblings. Use **subgrid**:
   ```css
   .card-row { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--space-grid); }
   .card { display: grid; grid-row: span 4; grid-template-rows: subgrid; row-gap: var(--space-3); }
   /* rows: icon / eyebrow / title / description; each row's height = the tallest sibling's */
   ```
5. **Same line count.** All sibling titles wrap to the same number of lines, and all descriptions too, **at every breakpoint**. Achieve it with copy (§5.2), with `min-height` in `lh` units as a safety net:
   ```css
   .card-title { min-height: 2lh; }       /* every title occupies exactly 2 lines */
   .card-desc  { min-height: 3lh; }       /* every description exactly 3 lines */
   ```

### 5.2 Copy budgets (characters per line) `[measured]`
Average character width, measured on our fonts: **General Sans ≈ 0.45em**, **Gambetta ≈ 0.42em** (at our tracking).

`characters per line ≈ text width ÷ (font size × 0.45 or 0.42)`

Real text widths inside a card (container − gaps − card padding), measured on the /system page:

| Layout | Width | Card text width | Body 16px chars/line | h4 22px chars/line |
|---|---|---|---|---|
| 1 column, phone | 320 | 234 | ~32 | ~25 |
| 1 column, phone | 375 | 282 | ~39 | ~30 |
| 1 column, horizontal card, tablet | 768 | 512 | ~71 | ~55 |
| **3 columns** | 1024 | **188** | **~26** | **~20** |
| 3 columns | 1280 | 259 | ~36 | ~28 |
| 3 columns | 1440 | 304 | ~42 | ~33 |

**Writing rules:**
1. **Size for the narrowest side-by-side tier.** For 3-up cards that's 1024: titles ≤ 16 characters stay on 1 line everywhere.
2. **Stay away from line-break boundaries.** For each width, `length ÷ chars-per-line` must not be within ±12% of a whole number. Otherwise one sibling wraps and the next doesn't. Example: 3-up descriptions of **54–58 characters** give 2 / 2 / 1 / 3 / 2 / 2 lines across the tiers, identical for every sibling.
3. **Keep siblings within ±4 characters** of each other.
4. If no length works at every tier, change the layout (fewer columns, horizontal cards), not the padding.

**Tested on /system (2026-11-03):**
- **First attempt:** 3 columns from 768. Card text was only ~122px wide at 768, so titles wrapped to 2 and 3 lines and descriptions to 5 and 6.
- **Fix:** 1 column of horizontal cards at tablet, 3 columns only from 1024.
- **Second attempt:** descriptions of 68–70 characters sat on line-break boundaries, so parity failed at 320, 600, 1024 and 1280.
- **Fix:** rewrote the copy to 54–58 characters and titles to ≤ 15. Result: **all 10 widths pass** (equal heights, equal line counts, no overflow).

### 5.3 Other consistency rules
- Icons: one size per set (`20px` in a `40px` tile), aligned to the first line of text.
- Numbers: `tabular-nums`, so 01 / 02 / 03 and stats are equally wide.
- Bullet and check lists inside siblings: the same number of items.
- Images in sibling cards: the same aspect ratio (`aspect-ratio`) and crop.
- QA: run the parity check (§8.2) before calling any section done.

---

## 6. Section patterns and how they rearrange

The building blocks of a Sarvam product page, in the order sarvam.ai/indus-cowork uses them `[verified/observed]`, with our consistency upgrades. Component internals (button, card anatomy) are in `components.md`.

### P1. Navigation
| Phone | Tablet | Laptop+ |
|---|---|---|
| Wordmark left · "Talk to Us" pill + menu icon right `[observed]`. Menu opens a full-screen sheet with the 4 groups as large tappable rows (min 44px). | Same as phone (links don't fit at 768 with the CTA). | Wordmark · Products / Developers / Resources / Company (centre) · "Talk to Us" pill right `[observed]`. |

Sticky at the top with `backdrop-filter: blur(var(--blur-glass))` over an `sf` 80% background. Height 64.

### P2. Product hero
| Phone | Tablet | Laptop+ |
|---|---|---|
| Line motif → eyebrow → H1 (`display-product`, 36, centred, 2–3 lines) → lead (16, centred, ≤ 5 lines) → buttons: **two equal columns side by side from 360px** (15px, padding 16), **stacked at equal full width below 360**. Never two stacked buttons of different widths. Primary first → product mockup. | Same order; H1 ~46; lead max 42rem; buttons side by side at their natural width. | H1 52, max 56rem (2 lines); mockup 1200 wide. |
| **Mockup on phone:** don't shrink the full desktop UI. Show a **simplified view**: the list becomes a row of icon tiles (names move to the detail head and stay as accessible text), one detail panel, real text at ≥ 12px, tables re-flow to "name · value" with the action underneath. **No swipe row** `[changed from Sarvam: it crops to the task panel with swipeable tabs; we keep everything visible]`. | Mockup at full container width; the list is a 2-column named grid above the detail. | Full mockup: sidebar + task view. |

Background: `--gradient-haze` rising behind the lower half of the hero and the mockup (full-bleed).

### P3. Section header
| Phone | Tablet | Laptop+ |
|---|---|---|
| Eyebrow → H2 → lead, stacked, **left-aligned**, max 4 lines of lead. | Chapter header: centred. Split header: H2 left, lead or CTA right, aligned to the bottom (`items-end`) `[verified]`. | Split: `grid-template-columns: 1.2fr 1fr`, gap 64 `[verified CSS]`. Chapter: centred, H2 max 18ch. |

### P4. Feature rows (text + tinted visual)
| Phone | Tablet | Laptop+ |
|---|---|---|
| Each feature is one card. **Visual on top**, then title → body → CTA → checklist `[observed]`. Every row has the same order (no alternating). | Still **stacked** (visual on top, full width) so the product mock keeps ≥ 380px and stays readable; text under it. `[addition, from QA: side-by-side at 768 squeezed the mock to 187px]` | 5 / 7 split, the visual always on the right. Sarvam keeps the visual on the right `[observed]`; we keep it consistent rather than alternating. |

Tints in sequence: indigo → orange → green (`tokens.md` §2.4b). All feature rows share the same height and the same checklist length (3 items) (§5).

### P5. Card grid (2 + 3 "building blocks")
| Phone | Tablet | Laptop+ |
|---|---|---|
| 1 column, 5 cards stacked, all the same height (same line counts). | **2 columns**: 2 + 2 + 1, with the last card spanning both columns in a horizontal layout (icon left, text right), so there's no orphan half-width card. **Never 3 text cards side by side below 1024**: at 768 they'd have only ~122px for text. | Sarvam's feature rail: 6-column grid, first 2 cards span 3, last 3 span 2 `[verified CSS]`. Rows aligned with subgrid. |

### P6. Logo / app directory panel
| Phone | Tablet | Laptop+ |
|---|---|---|
| One white panel, radius 24 `[verified]`. Group label above, **2 apps per row** `[verified CSS <640]`. Padding 24. | Group label above, 4 per row `[verified CSS <1024]`. | Group label in a 144px left column, 4 apps per row, rows separated by 1px `st` `[verified CSS]`. |

### P7. Split content + mockup card (e.g. "Skills")
| Phone | Tablet | Laptop+ |
|---|---|---|
| Text block, then sub-points, then the mockup card (full width). | Same, mockup max 560px, centred. | Text left (5 cols), mockup right (6 cols), vertically centred. |

### P8. Timeline ("Runs while you sleep")
| Phone | Tablet | Laptop+ |
|---|---|---|
| **Vertical list** of cards: dot · mono time · status pill on one line, then the title, then the description `[observed]`. | Same stacked cards (768–1023). **1024–1279: one row per event**: dot · time · title (one line, 15em) · description (fills the rest) · status (104px). | **Horizontal from 1280**: 5 events on one rail with dots (`--ring-dot`) `[observed]`. Titles reserve **two balanced lines** (`min-height: 2lh; text-wrap: balance`) and the status pill sits on the card's bottom edge, so all five cards share every row line (§5). |

### P9. Numbered steps (01 / 02 / 03)
| Phone | Tablet | Laptop+ |
|---|---|---|
| Stacked; 40px number circle on the left, text to its right, connecting line between circles `[observed]`. | 3 columns, number circle on top. | 3 columns, number circle (48px) on top `[verified md:w-12]`, connecting line across. Same title and description line counts. |

### P10. Role / use-case cards ("Give each teammate a job")
| Phone | Tablet | Laptop+ |
|---|---|---|
| One bordered list with dividers `[observed]`, or chips that wrap onto new lines. Never a swipe row (§7.4). | 2 columns. | 5 equal columns, or 3 + 2 with the same rule as P5. |

### P11. Dark trust band ("Sovereign by default")
| Phone | Tablet | Laptop+ |
|---|---|---|
| `sr-indigo-950` panel, radius 24, inside the container. Title, then points separated by `st-dark` dividers `[observed]`. Each point is a **row: icon (40px) beside title + description**, not icon above; descriptions capped at 32ch and balanced so every point takes the same two lines. Deployment tiles below follow the same row shape (56px tile left). | Same, 2 columns of points. | Title left (4 cols), points in a 2×2 grid right (8 cols). Text uses `tx-inverse` / `tx-inverse-secondary`. |

### P12. FAQ
| Phone | Tablet | Laptop+ |
|---|---|---|
| Accordion rows, question `item-title` 15→16, chevron right, min-height 44, answer 13–14 `[verified]`. | Same, max 720px. | Heading left (4 cols), accordion right (8 cols), or centred at max 720px. |

### P13. Closing CTA card
| Phone | Tablet | Laptop+ |
|---|---|---|
| `--gradient-night` card, radius 24, inside the container. Centred display-2 headline (white), symbol, "Talk to Us". Height ≈ 420. | Same, height ≈ 380. | Same, height ≈ 460. Behind it, our **ring lattice**: a half rosette (5 + 7 circles, white 20%) centred on the bottom edge, growing up layer by layer on entry. `[addition: Sarvam enlarges its logomark here, which logo.md forbids us to copy]` |

### P14. Footer
| Phone | Tablet | Laptop+ |
|---|---|---|
| Wordmark + "AI for all from India" → badges → socials → address card → link groups in a **2-column grid** of bordered boxes `[observed]`. | Brand column on top, link groups in 4 columns. | Brand column (left) + 5 link columns `[observed]`. |

---

## 7. Mobile rules `[addition]`, built on Sarvam's mobile strengths

Sarvam's mobile hierarchy, spacing and type sizes are kept exactly (`typography.md` §3).

### 7.1 Touch
- Every tappable element has at least **44 × 44px** (`--tap-min`) `[verified: min-h-[44px] buttons]`.
- At least **8px** between adjacent tap targets.
- The primary CTA ("Talk to Us") is always reachable: in the nav, and repeated at the end of the hero and the closing card.

### 7.2 Reading
- Minimum text size on mobile: **12px** for eyebrows, labels and mockup UI; **15px** for body.
- Lines ≤ 42 characters for body in cards, ≤ 50 in full-width paragraphs.
- When columns stack, the reading order follows the desktop **left-to-right, top-to-bottom** order, except the visual-first feature cards (P4).

### 7.3 Hover has a tap equivalent
- Anything revealed on hover (card shadow, image zoom) is either always visible on touch, or not needed. Use `@media (hover: hover)` for hover-only effects `[verified: Sarvam does this]`.

### 7.4 No sideways scroll `[addition, Malay's rule, replaces swipe rows]`
Nothing on the page scrolls sideways, at any width. A sideways row hides content and asks the reader to discover a gesture.
- **Tab rails** become a 2 × 2 grid (4 tabs) below 1280. Narrow rails (< 560px) show icon + a one-word `tabShort` label; wider rails show title + note.
- **Lists of items** (teammates, roles, chips) become a grid of equal tiles, or wrap onto new lines.
- **Long tables** re-flow (row → "name · value" with the detail underneath), never scroll.
- **Exception:** an auto-moving logo marquee (it moves on its own; nothing to discover). Code blocks wrap long lines instead of scrolling.
- Checked by `check-fit` (SIDEWAYS). Any `overflow-x: auto` with content wider than its box fails.

### 7.5 Viewport
- Use `100dvh`, not `100vh`, for full-height sections (mobile browser bars).
- Respect safe areas: `padding-bottom: env(safe-area-inset-bottom)` on fixed bars.
- No fixed element covers more than 15% of the screen height.

### 7.6 Everything fits: the fit ladder `[addition, Malay's rule]`
**Fits** means: no label on two lines, no text clipped or truncated with "…", no text running past its box or under a neighbour, no element past the screen edge.
When something doesn't fit, try these **in order** and stop at the first that works:

| # | Move | Examples from the landing page |
|---|---|---|
| 1 | **Rearrange** (change the layout, not the size) | tab rail → 2 × 2 grid · 5 timeline columns → one row per event at 1024 · panel text → title + body beside the checklist at 768 · trust point icon above → icon beside · result table → "name · value" + action below |
| 2 | **Tighten spacing** on the tight tier only | card padding 32 → 24 (< 1024) → 20 (< 480) → 16 (< 360); well padding 24 → 12 on phones |
| 3 | **Drop decoration**, never content | step timestamps, favicons, status words beside a spinner, arrow icons, the gate meta line, a status dot when the pill already says it |
| 4 | **Short label variant**, same meaning | `tabShort` ("Plans", "Asks first") · status "Needs you" for "Needs your yes" · "Calendar" for "Google Calendar" (the mark carries the brand) · rhythm "Daily / Weekly / On demand" · CTA "Talk to us" · Approve → round ✓ button with `aria-label` |
| 5 | **Fluid size inside the component**: `clamp(min, calc((100cqi − fixed) / em-width), max)`. Measure the longest string in em first. | card labels: `clamp(15px, calc((100cqi - 48px) / 12.6), 22px)` · role name: `(100cqi - 60px) / 9.6` |
| 6 | **Rewrite the copy** to the budget (§5.2) | "Send 31 emails" · "Merge the pricing fix" · "Indian SaaS outlook 2026" · "Ready for 4 teammates" |

**Never:** `text-overflow: ellipsis` on content, `white-space: nowrap` without the fit having been measured, 2-line labels, sideways scroll, a smaller font than §7.2 allows.

**Allowed to wrap** (they are prose, not labels): section headings, panel headings (`text-wrap: balance`), body paragraphs, FAQ questions, card descriptions. In a sibling set, descriptions still take the **same** number of lines (§5); cap the measure (e.g. 32ch) and balance to get there. A slot that deliberately takes two lines is marked `data-may-wrap`.

**Accessibility when a label shortens or hides:** the full text stays in the DOM (visually hidden or `aria-label`); short variants are `aria-hidden`. Tap targets stay ≥ 44px.

### 7.7 Container thresholds `[addition]`
Components switch on **their own width** (container queries), so they behave the same in a phone column, a tablet half-column or a narrow desktop bento cell. Viewport breakpoints only move the big layout (§1).

| Component | Container | Switch | What changes |
|---|---|---|---|
| Cowork dashboard | `.db` (`db`) | < 520 / < 300 | named 2-col grid → 6 icon tiles → 3 × 2 tiles; short status; Run beside Approve; table re-flow |
| Stage tab rail | `.cw-stage__rail` (`rail`) | < 560 / < 300 | title + note → icon + `tabShort` → tighter tab padding |
| Product mock card | `.sr-mock` (`mock`) | < 340 / < 300 / < 260 | drop times, then favicons / status words / gate meta, then arrow + tighter buttons |
| Approval queue mock | `.cw-sv--queue` (`queue`) | < 300 | worded pill → round check |
| Bento mini UI | `.bv-card` (`bv`) | < 260 / < 230 | tighter gaps and pills → status dot steps out |
| Approval desk | `.pv-desk__queue` (`desk`) | < 440 / < 280 | Approve → round ✓; then 13.5px titles |
| Builder field / card | `.pv-field`, `.pv-mate__card` | < 460 / < 340 | rhythm short labels; hint and CTA lose their tail |
| Builder app tile | `.pv-app` (`app`) | < 160 | "Google X" → "X" |
| Comparison card | `.pv-vs__col` (`vs`) | fluid | label size from `cqi` |
| Bulbul voice list | `.bb-voices__list` (`vlist`) + `.bb-vbtn` (`vbtn`) | < 768 viewport / row < 280 | 4 × 2 avatar tiles; style and language on their own lines |
| Bulbul voice card | `.bb-vcard` (`vcard`) | < 300 | status as a dot; style / language split; foot drops the language code |
| Bulbul playground | `vctl`, `vchip`, `code` | ≥ 520 / < 130 / < 420 | chips 4-up; tighter chips; Copy → icon |
| Bulbul transcript / request / studio | `tx`, `stream`, `side` | < 260 / < 300 / < 280 | drop style word; short heading + 11px values; full-row fields |

⚠️ A container can't style itself from its own query: put padding changes on a parent query or a viewport media query. Never put `container-type` on a subgrid item (§8.1).

---

## 8. In-between widths and QA

### 8.1 Between breakpoints
- **Type is fluid** (`typography.md`), so text never jumps.
- **Containers are percentages**, so margins grow smoothly.
- **Grids switch at breakpoints**, but standalone cards use **container queries**, so a card adapts to its own width rather than the viewport's. ⚠️ Never put `container-type` on a card that is a **subgrid** item: size containment collapses its height (found in QA). Use a viewport media query for those.
  ```css
  .card { container-type: inline-size; }
  @container (min-width: 420px) { .card--horizontal { grid-template-columns: 40px 1fr; } }
  ```
- Hard minimum: the layout must hold at **320px** with no overflow.

### 8.2 Test matrix (run before calling any page done)
Widths: **320 · 375 · 414 · 600 · 768 · 900 · 1024 · 1280 · 1440 · 1920**

For each width, check:
1. No horizontal page scroll (`document.documentElement.scrollWidth === innerWidth`).
2. **Sibling parity:** in every sibling set, each title and description has the same rendered line count, and siblings sharing a row have equal heights. Automated: `node scripts/check-layout.mjs <url>`. Mark sets with `data-siblings`, items with `data-sibling`, and text slots with `data-line="title"` etc.
3. No text under its minimum size (§7.2).
4. Every tap target ≥ 44px (phone widths).
5. Alignment follows §4.
6. **Fit** (§7.4, §7.6): `node scripts/check-fit.mjs <url>` reports SIDEWAYS, CLIP, OVERFLOW and PAST-VIEWPORT as errors and wrapped short labels as warnings. Must exit 0.
7. **Click every state at every width**: each tab, each role or option, approve / send back, open menus. A label that fits in the default state can overflow in another (a longer role name, the "Approved" pill).
8. Screenshot at 375 / 768 / 1440 for the submission.

---

## Do / Don't

| Do | Don't |
|---|---|
| Start from the 375px layout | Design at 1440 and squeeze |
| Change the arrangement per tier (§6) | Just scale everything down |
| Make sibling cards equal in size, rows and line counts | Let one title wrap to 2 lines while the others take 1 |
| Write copy to the character budget | Fix uneven cards with random padding |
| Left-align multi-line text on phones | Centre a 5-line paragraph |
| Crop and simplify product mockups on phone | Show an unreadable miniature of the desktop UI |
| Rearrange a row into a grid or wrap it | Put anything in a sideways scroller |
| Climb the fit ladder (§7.6) in order | Truncate with "…" or let a label break onto two lines |
| Drop decoration before shortening content | Shrink text below §7.2 to make it fit |
| Use container queries for cards | Rely only on viewport breakpoints |

---

## Considered additions

1. **Column grid** (4 / 8 / 12, gutters 16 / 24 / 32). Sarvam uses percentage containers but no published grid.
2. **`--container-max` 1280px.** Sarvam's `max-w-width-mx` value isn't exposed in the CSS we captured.
3. **Alignment rules** (§4), resolving the centred/left mix on Sarvam's mobile page.
4. **Sibling consistency system** (§5): subgrid rows, `lh` min-heights, copy budgets. This is our main flair.
5. **Non-alternating feature rows** and no orphan cards at tablet (P4, P5).
6. **Mobile rules** (§7) and the **test matrix with an automated parity check** (§8).
7. **No sideways scroll and the fit ladder** (§7.4, §7.6), with container thresholds per component (§7.7) and an automated fit check (`check-fit`). Sarvam's own phone pages use swipe rows and truncation; we don't.
