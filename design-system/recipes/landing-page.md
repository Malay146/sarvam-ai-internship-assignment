# Recipe · Indus Cowork landing page

> **Built:** `src/app/page.tsx` + `src/app/cowork.css` + `src/components/sarvam/{cowork,mega-nav,brand}.tsx`. The table below is the build as shipped (round 2); follow it for any new product page.

## 0. Rules learned on this page (apply to every new page)
1. **Feel close to sarvam.ai's homepage, not to a product subpage:**
   - Sun hero, a proof strip under it, a product stage, centred chapter headers
   - bento / pillars, deployment cards, a customer quote on the horizon gradient, the night CTA
   - the mega menu
2. **Authentic or absent:**
   - only verified facts and real assets: official brand marks (`brand-marks.ts`), Sarvam's published customer logo and photo, real quotes
   - no invented logos, testimonials, numbers or customer names
   - a quote about Sarvam (not this product) is headed "What Sarvam's customers say"
3. **Logos:** mono in the proof marquee; **official colours** in the directory and logo tiles (components.md §3.1b).
4. **Equal heights everywhere:**
   - sibling cards, bento rows, step cards
   - **and side-by-side pairs** (stage rail = panel; skills text = skills card)
5. **Colour by tone, one tone per block:** indigo, orange, green, rose, neutral (haze) surfaces with grain (`cw-surface--*`), and the matching ink for icons (`cw-tone--*`).
6. **Every card that explains a step shows its moment:** a small product mock (StepVisual), not plain text.
7. **Icons:** outline by default; Nucleo glyph (filled) in tab icons, small coloured tiles and the mega-menu item icons.
8. **Cards stay soft:** colour lives in a pale **well** at the top of a white card (tone-100 → tone-50 → white, grain, hairline), never as a full saturated card. One tone per card; 5 building-block cards (3 + 3 / 2 + 2 + 2).
10. **Card colour comes from the card itself**: a soft gradient across the whole card (tone-50 → tone-100, grain, 1px hairline). No inner frames or wells inside cards. Visual areas have one fixed height so every card in a row has the same rhythm.
11. **Mocks inside cards:** one size per row (e.g. 300 × 184 side by side), content from the top with one padding, and they **loop** while visible (useLoop). If a mock has buttons, they really work (answer, then the loop resumes). Real buttons are 44px to the finger (transparent border) even when they look 32px.
12. **Avatars:** real people get their real published photo (Sarvam CDN). AI teammates are shown by their **role icon** (Nucleo glyph in a tone tile), never initials and never stock faces.
13. **Hero kicker:** the product name is a plain accent eyebrow (12px, uppercase, `--color-accent`), not a pill.
14. **Tab rails carry the tone:** an icon tile per tab, and the active tab takes its tone's soft gradient + grain + a progress bar in the tone.
15. **Patterns only where Malay places them.** Don't add decorative patterns (gateway / medallion echoes, ornaments) on your own; `src/components/sarvam/patterns.tsx` provides them (hairlines, one tone, ≤ 30% opacity, never filled) for when a placement is asked for. The official line motif stays in the hero only.
17. **Hero light by expression:** the homepage owns the orange **Sun**. A Product page uses the **indigo glow** disc (indigo core → lilac → peach rim, same shape and fade as HeroGlow), so the page reads as Sarvam but not as a copy of the homepage.
18. **Logos with no Simple Icons / Nucleo entry** come from the company's own website (e.g. canva.com, apify.com, datarobot.com), stored unchanged in `public/brand/integrations/`. Wordmark logos (Canva) stand alone, without the name repeated beside them.
19. **One header-to-content gap:** every section uses exactly `--space-section-head` (40px phone, 56px from 768) between its header and its content. Don't stack the header's own margin on top of a flex gap.
16. **Eyebrows sparingly:** an uppercase eyebrow only where it adds a label the heading lacks (here: How it works, Integrations, Skills). Most chapters are just heading + lead.
9. **In-page links scroll smoothly** (`scroll-behavior: smooth`, off with reduced motion) and land each heading ~88px under the top. Menu items that exist on the page link to their section (`#how`, `#integrations`, `#stories`, `#faq`).


One complete, responsive product page, hero → footer, built only from `src/components/sarvam` and tokens. Expression: **Product**, with one **Campaign** moment (the closing CTA) and one **Community** moment (the testimonial / proof band).
Exports: **375 / 768 / 1440**. It must also hold at every width in between (QA at 10 widths).

---

## 1. Section order

| # | Section | Component(s) | Expression | Copy source |
|---|---|---|---|---|
| 1 | Nav (overlay) | `MegaNav` (Products / Developers / Resources / Company panels, Log In + Talk to Us) | — | sarvam.ai navbar |
| 2 | Hero | `HeroGlow` + motif + eyebrow "Indus Cowork" + `display-product` H1 + lead + `ButtonRow` (Talk to Us / See how it works) + `CoworkDashboard` as the product shot | Product | H1: "Hire an AI teammate that finishes the work" |
| 3 | How it works | `SectionHeader` chapter + 3 × `FeatureRow` (Plan / Research / Review mocks, tints indigo → orange → green) | Product | voice.md §5 |
| 4 | Building blocks | `SectionHeader` + `CardGrid` (Skills, Teammates, Scheduled tasks…) or `EmblemCard` row | Product | voice.md §5 |
| 5 | Runs while you sleep | `SectionHeader` split + `ScheduleDashboard` | Product | voice.md §5 |
| 6 | Steps | `SectionHeader` + `Steps` (Hand over / It works / You approve) | Product | |
| 7 | Facts | `FactCard` row (100+ apps / Your yes / India) | Product | verified only |
| 8 | Deployment | `TileCard` row (Sarvam Cloud / Private Cloud (VPC) / On-Premises) | Product | brand-findings |
| 9 | Sovereign by default | `TrustBand` | Product | voice.md §5 |
| 10 | FAQ | `Faq` | Product | /indus-cowork FAQ |
| 11 | Closing CTA | `CtaCard` "Meet your first teammate." | Campaign | |
| 12 | Footer | `Footer` | — | |

Vertical rhythm: `--space-section` between sections (96 / 176). Header → content `--space-section-head`.

---

## 2. Responsive behaviour per section (rearrange, not shrink)

| Section | Phone (<768) | Tablet (768–1023) | Desktop (≥1024) |
|---|---|---|---|
| Nav | wordmark · Talk to Us · menu sheet | same | wordmark · 4 links · Talk to Us |
| Hero | centred text; buttons stacked if they don't fit; dashboard below with its teammate list as a swipe row | centred; buttons side by side; dashboard full width | H1 2 lines (max 56rem); dashboard 1200 wide with the sidebar |
| How it works | feature cards stacked, mock on top | stacked, mock full width | 5 / 7 split, mock right |
| Building blocks | 1 column | horizontal cards, 1 column | 3 columns, subgrid |
| Schedule | list rows with status on line 2; approvals below | 4-column list; approvals below | list + approvals side by side |
| Steps | vertical with connector | 3 columns | 3 columns |
| Facts / Deployment | 1 column | 1 column (tiles stack) | 3 columns (tiles from 1280) |
| Trust band | points 1 column | 2 columns | title left, 2×2 points right |
| FAQ | full width | max 720 | max 720, centred |
| CTA | 420 tall, centred | 400 | 460 |
| Footer | 2 link columns | 4 columns | brand + 4 columns |

---

## 3. Quality gates (all must pass before export)
1. `node scripts/check-layout.mjs http://localhost:3000/`: no overflow, sibling parity, 44px tap targets at 10 widths.
2. `node scripts/check-motion.mjs http://localhost:3000/`: no element changes size while animating; dashboards work.
3. `node scripts/check-nav.mjs http://localhost:3000/`: transparent → solid → transparent.
4. `node scripts/check-perf.mjs http://localhost:3000/`: idle loops cause no layout per second outside mocks.
5. Copy: every claim is in `voice.md` §5; CTA is "Talk to Us".
6. Manual: check on a real phone (Malay).

## 4. Export
`node scripts/export-page.mjs` → full-page PNGs at 375 / 768 / 1440 in `/exports/page/`.
