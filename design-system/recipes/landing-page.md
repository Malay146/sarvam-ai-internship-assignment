# Recipe · Indus Cowork landing page

One complete, responsive product page, hero → footer, built only from `src/components/sarvam` and tokens. Expression: **Product**, with one **Campaign** moment (the closing CTA) and one **Community** moment (the testimonial / proof band).
Exports: **375 / 768 / 1440**. It must also hold at every width in between (QA at 10 widths).

---

## 1. Section order

| # | Section | Component(s) | Expression | Copy source |
|---|---|---|---|---|
| 1 | Nav (overlay) | `Nav overlay` with action "Talk to Us" | — | voice.md §3 |
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
