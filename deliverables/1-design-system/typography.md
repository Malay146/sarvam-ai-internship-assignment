# Typography

How Sarvam sets type, on the web and in banners. Every size, weight, line height and tracking value here is a token in [`tokens.css`](tokens.css). Colours come from [`tokens.md`](tokens.md).

**Source labels:** `[verified]` read from sarvam.ai markup or CSS · `[observed]` seen across official brand imagery · `[addition]` our own rule.

---

## Rules for AI (read first)

1. **Two voices, one job each.** The **display** font (serif) is for headings at every level (hero H1 down to card headings h3/h4) and for primary buttons. The **text** font (sans) is for body, UI, eyebrows, list items and listing-card titles. The **code** font (mono) is only for code, mono eyebrows, step numbers and times.
2. **Use a role, not a size.** Pick a role from §3 (`display-1`, `h2`, `lead`…) and apply all of its tokens together: font, size, weight, line height, tracking. Never set a font size on its own.
3. **Sentence case everywhere.** The only uppercase text is the eyebrow and the mono label.
4. **Light and regular, never bold.** Display headlines use 300–500. Nothing in the system is heavier than 500 (600 only for General Sans at ≤ 14px, if needed for legibility).
5. **No italics.** Sarvam loads upright fonts only (`MatterUprights`, `SeasonMixVFUprights`) `[verified]`. For emphasis, use a colour change (`tx-accent`, large text only) or a weight step (400 → 500).
6. **One display heading per block.** A section has one H2. Each card has at most one display heading (h3 or h4). Never put two display headings directly on top of each other.
7. **Short lines.** Body text ≤ 65ch, leads ≤ 42rem, hero headline ≤ 56rem. Use `text-wrap: balance` on headings and `text-wrap: pretty` on paragraphs.
8. **Numbers use tabular figures** (`font-variant-numeric: tabular-nums`) wherever they line up or count: stats, times, step numbers `[verified]`.

---

## 1. Families

| Role | Sarvam uses `[verified]` | We use (free stand-in) | Token | Source |
|---|---|---|---|---|
| Display: headlines, primary buttons | **Season Mix** (variable 300–900) | **Gambetta** (300–600) | `--font-display` | Fontshare |
| Text: body, UI, eyebrows, titles | **Matter** (variable 100–1000) | **General Sans** (400–600) | `--font-text` | Fontshare |
| Code: code, mono labels | **Matter Mono** (400, 500), **Matter Semi Mono** (400) | **DM Mono** (400, 500) | `--font-code` | Google Fonts |
| Devanagari fallback `[addition]` | (not specified) | Noto Serif / Noto Sans Devanagari | inside the stacks above | Google Fonts |

**Why stand-ins:** Season Mix, Matter and Matter Mono are commercial fonts licensed to Sarvam. We don't own a licence and must not take the font files from sarvam.ai. The stand-ins were chosen by rendering the same sample in Sarvam's real fonts and in 11 free sans and 8 free mono candidates (`process/screens/font-compare-*.png`).

**Switching to the licensed fonts** is a one-place change in `tokens.css`. Swap the three `--font-*` family values, then set the tracking tokens back to Sarvam's own values (listed in the comments in `tokens.css` and in §1.1).

### 1.1 Calibration (measured, not eyeballed)
Each role was rendered in Sarvam's real font (live on sarvam.ai) and in our stand-in at the same size, and the line widths were measured in px. Tracking was then adjusted until the widths matched, so headlines wrap at the same points as Sarvam's.

| Role | Sarvam tracking | Our tracking | Width difference after calibration |
|---|---|---|---|
| display-1 | −0.025em | **−0.045em** | +0.4% |
| display-product | −1px (≈ −0.019em) | **−0.04em** | −0.5% at 52px, +1.6% at 36px |
| h2-lg | −0.025em | **−0.04em** | −0.5% |
| display-2 | −0.025em | **−0.03em** | −0.4% |
| h2 | −0.02em | **−0.03em** | +0.3% |
| h3 (display) | −0.02em | **−0.04em** | +0.3% |
| h4 (display) | −0.01em | **−0.02em** | −0.4% |
| feature-title / title | −0.015em | **−0.025em** | +1.7% / −0.1% |
| lead | 0 | **−0.01em** | 0.0% |
| body | 0 | 0 | +0.8% |
| eyebrow | 2px | **1.6px** | −0.6% |
| eyebrow-mono | 0.16em | **0.13em** | ≈ +0.5% |
| mono label | 0 | **−0.04em** | 0.0% |
| code | 0 | 0 | 0.0% |

**Known difference we accept:** Gambetta has a smaller x-height than Season Mix (−13%, with cap height −6%). Its lowercase therefore looks slightly smaller and more classical at the same size. We keep Sarvam's sizes rather than scaling up, because scaling would break the line widths above. With the licensed font this difference disappears.

**Line heights** are unitless multiples of the font size, so line boxes are identical to Sarvam's at every size.

### 1.2 Loading
- Web (`src/app/layout.tsx`) and banners load the same two stylesheets:
  - `https://api.fontshare.com/v2/css?f[]=gambetta@300,400,500,600&f[]=general-sans@400,500,600&display=swap`
  - `https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Noto+Sans+Devanagari:wght@400;500&family=Noto+Serif+Devanagari:wght@300;400;500&display=swap`
- Devanagari fonts download only when Devanagari characters appear on the page (the stylesheet scopes them by unicode-range).

---

## 2. Weights

| Token | Value | Use |
|---|---|---|
| `--weight-light` | 300 | Display statements on imagery and banners `[observed]` |
| `--weight-regular` | 400 | Hero and product H1 `[verified]`, body, leads, meta, mono |
| `--weight-medium` | 500 | H2, h3, h4 `[verified]`, feature and card titles, eyebrows, buttons |

---

## 3. Web type scale (responsive)

### 3.1 Sarvam's own named scale `[verified]`
sarvam.ai defines these size utilities in its global CSS. Our roles below map onto them.

| Sarvam class | Size | Our role |
|---|---|---|
| `type-display-xl` | 64 | display-1 at desktop |
| `type-display-lg` | 56 | display-1 at tablet |
| `type-display` | 40 | (between product H1 sizes) |
| `type-display-sm` | 32 | display-2 at mobile |
| `type-heading-1` | 36 | h2 at desktop, product H1 at mobile |
| `type-heading-2` | 30 | h2-lg at mobile |
| `type-heading-3` | 24 | h3 at desktop |
| `type-heading-4` | 22 | h4 at desktop |
| `type-heading-5` | 20 | h3 / h4 at mobile |
| `type-body-lg` | 18 | lead at desktop |
| `type-body` | 16 | body |
| `type-supporting` | 14 | small |
| `type-label` | 12 | eyebrow, labels |

### 3.2 Roles

Sizes are fluid between **375px and 1024px**, then fixed. Endpoint sizes are `[verified]` from sarvam.ai (homepage and the Indus Cowork page). The interpolation between them is our `[addition]`; Sarvam itself uses `clamp()` for some headings.

| Role | Font | Weight | 375 | 768 | ≥1024 | Line height | Tracking token | Size token | Where Sarvam uses it |
|---|---|---|---|---|---|---|---|---|---|
| **display-1** | display | 400 | 44 | 56 | 64 | 1.05 | `display` | `--text-display-1` | Homepage hero H1 |
| **display-product** | display | 400 | 36 | 46 | 52 | 1.2 | `display-product` | `--text-display-product` | Product page H1 (Indus Cowork) |
| **display-2** `[addition]` | display | 300 | 32 | 42 | 48 | 1.1 | `statement` | `--text-display-2` | Statements, quotes (from /brand imagery) |
| **h2-lg** | display | 500 | 30 | 30* | 32→44 | 1.1, max 18ch | `display-product` | `--text-h2-lg` | Feature section H2 (Cowork directory) |
| **h2** | display | 500 | 28 | 33 | 36 | 1.2 | `heading` | `--text-h2` | Section headings, site-wide |
| **h3** | display | 500 | 20 | 22 | 24 | 1.2 | `h3` | `--text-h3` | Sub-headings in feature blocks |
| **h4** | display | 500 | 20 | 21 | 22 | 1.25 | `h4` | `--text-h4` | Card headings (Cowork building blocks) |
| **feature-title** | text | 500 | 18 | 20 | 21 | 1.3 | `title` | `--text-feature-title` | Homepage feature rows |
| **item-title** | text | 500 | 16 | 17 | 18 | 1.3 | `title` | `--text-item-title` | Lists, FAQ questions |
| **title** | text | 500 | 18 | 18 | 18 | 1.3 | `title` | `--text-title` | Blog / resource cards |
| **lead** | text | 400 | 16 | 17 | 18 | 1.65 | `lead` | `--text-lead` | Section intros (max 42rem) |
| **body** | text | 400 | 15 | 15.6 | 16 | 1.6 | `body` | `--text-body` | Paragraphs |
| **small** | text | 400 | 14 | 14 | 14 | 1.6 | `body` | `--text-small` | Supporting text, tabs, chips |
| **meta** | text | 400 | 13 | 13 | 13 | 1.55 | `body` | `--text-meta` | Dates, captions, group labels |
| **eyebrow** | text | 500 | 12 | 12 | 12 | 1.5 | `eyebrow`, UPPERCASE | `--text-eyebrow` | Above every H2 |
| **eyebrow-mono** | code | 400 | 12 | 12 | 12 | 1.5 | `eyebrow-mono`, UPPERCASE, tabular | `--text-eyebrow` | Section tags, times, counters |
| **label-mono** | code | 400 | 12 | 12 | 12 | 1.5 | `label`, UPPERCASE | `--text-eyebrow` | Step labels on cards |
| **button** (primary) | display | 500 | 16 | 16 | 16 | 1 | 0 | `--text-button` | Hero and section CTAs |
| **button** (secondary) | text | 500 | 16 | 16 | 16 | 1 | 0 | `--text-button` | Nav CTA, dark solid buttons |
| **nav link** | text | 400 | 15 | 15 | 15 | 1 | 0 | `--text-nav` | Top navigation |
| **code** | code | 400 | 14 | 14 | 14 | 1.6 | 0 | `--text-code` | Code blocks |

\* `h2-lg` uses Sarvam's own `clamp(1.875rem, 3.1vw, 2.75rem)`: 30px until about 970px wide, then it grows to 44px at about 1420px.

**Colour by role** (from `tokens.md` §1.3):
- display and heading roles: `tx`
- feature-title, item-title, title: `tx`
- lead and body: `tx-tertiary` on product pages `[verified, Indus Cowork]`, `tx-secondary` for emphasis or on the homepage
- meta, eyebrow, eyebrow-mono: `tx-tertiary`. An eyebrow can switch to `--color-accent` (indigo) to mark a product section `[verified]`
- On dark surfaces: headings `tx-inverse`, body `tx-inverse-secondary` (white 75%) `[verified]`

### 3.3 CSS recipe

```css
.display-product {
  font-family: var(--font-display);
  font-weight: var(--weight-regular);
  font-size: var(--text-display-product);
  line-height: var(--leading-product);
  letter-spacing: var(--tracking-display-product);
  text-wrap: balance;
  max-width: var(--measure-display);
}
.h2 {
  font-family: var(--font-display);
  font-weight: var(--weight-medium);
  font-size: var(--text-h2);
  line-height: var(--leading-heading);
  letter-spacing: var(--tracking-heading);
  text-wrap: balance;
}
.h4 {
  font-family: var(--font-display);
  font-weight: var(--weight-medium);
  font-size: var(--text-h4);
  line-height: var(--leading-h4);
  letter-spacing: var(--tracking-h4);
}
.lead {
  font-family: var(--font-text);
  font-size: var(--text-lead);
  line-height: var(--leading-lead);
  letter-spacing: var(--tracking-lead);
  color: var(--color-tx-tertiary);
  max-width: var(--measure-lead);
  text-wrap: pretty;
}
.eyebrow {
  font-family: var(--font-text);
  font-weight: var(--weight-medium);
  font-size: var(--text-eyebrow);
  letter-spacing: var(--tracking-eyebrow);
  text-transform: uppercase;
  color: var(--color-tx-tertiary);
}
.eyebrow-mono {
  font-family: var(--font-code);
  font-size: var(--text-eyebrow);
  letter-spacing: var(--tracking-eyebrow-mono);
  text-transform: uppercase;
  font-variant-numeric: tabular-nums;
  color: var(--color-tx-tertiary);
}
```

---

## 4. How type behaves across breakpoints

Type doesn't just shrink. These are the changes at each breakpoint (breakpoint values are defined in `layout.md`):

| Pattern | Mobile < 768 | Tablet 768–1023 | Desktop ≥ 1024 | Source |
|---|---|---|---|---|
| Hero headline | centred, 44px, balanced over 2–4 lines | centred, ~56px | centred, 64px, max 56rem wide (2 lines) | `[verified]` text-center, max-w-4xl |
| Hero eyebrow to H1 gap | 20px | 32px | 32px | `[verified]` mt-5 / md:mt-8 |
| Section header | eyebrow → H2 → lead stacked, left-aligned | stacked; side CTA moves to the right, aligned to the bottom of the text block | same as tablet | `[verified]` flex-col → md:flex-row md:items-end |
| Lead | 16px, full container width | 17px, max 42rem | 18px, max 42rem | `[verified]` |
| Card grid text | title 18 / body 15 | same | same: card text doesn't scale, the grid does | `[verified]` |
| Feature title | 18 | 20 | 21 | `[verified]` text-lg / sm:text-xl / md:text-[21px] |
| Line breaks in headlines | no manual `<br>`, let `balance` wrap | | a manual break is allowed at ≥ 1024 only (Sarvam uses `whitespace-pre-line` on H2s) | `[verified]` |
| Long words / Indic text | `overflow-wrap: anywhere` on headings below 400px | | | `[addition]` |

---

## 5. Banner type (fixed px) `[addition]`

Banners are fixed-size images, so they use **fixed px values, not fluid tokens**. The engine (`recipes/banner-builder.md`) applies these; QA enforces the minimums.

| Role | Meta 1080×1350 | LinkedIn 1200×627 |
|---|---|---|
| Headline, sans (Matter 600; names, launches) | base 124 | base 92 |
| Headline, serif (Season Mix 400; statements, stories) | base 132 | base 100 |
| Number (serif, gold or indigo) | base 270 | base 170 |
| Steps | 100 / 86 / 74 / 64 / 55 / 48 % of the base: the largest that fits | same |
| Headline minimum · max lines | **96px · 3 lines** | **72px · 2 lines** |
| Supporting line (Matter 400) | ≥ 28px | ≥ 20px |
| Anything else (eyebrow, mono, CTA, URL) | **none on the art**; it goes in the caption | none |

Rules:
- Two text sections at most. Sentence case. One idea per headline.
- If a headline doesn't fit at the minimum, make room (wider column, bigger opening) or shorten the copy; never shrink it.
- Headlines never sit on a shape's glow band or a gradient's orange core.

---

## 6. Indic scripts `[addition]`

Sarvam is an Indic-language AI company, and its brand imagery shows Devanagari set large in indigo (brand-img-08).
- Devanagari falls back to **Noto Serif Devanagari** (display) or **Noto Sans Devanagari** (text) automatically through the font stacks.
- Add **+0.1 to the line height** for any block containing Devanagari, so the matras (marks above and below the line) don't collide.
- Never fake Indic text with transliteration in a Latin font. If a banner shows an Indian language, set it in its real script.

---

## Do / Don't

| Do | Don't |
|---|---|
| Use the display font for H1, H2 and primary buttons | Use the display font for body copy or labels |
| Write in sentence case: "Intelligence, built around you." | Write Title Case Headlines or ALL-CAPS HEADLINES |
| Use light 300 for big statements on imagery | Use bold, black or condensed weights |
| Apply a whole role (font + size + leading + tracking) | Set a lone `font-size: 52px` |
| Use the fluid tokens on web | Hard-code breakpoint jumps (44 → 64 at exactly 768) |
| Emphasise with colour or one weight step | Use italics, underlines or gradient-filled text |
| Keep one display heading per section | Stack two serif headings in a row |

---

## Considered additions

1. **Stand-in fonts** (Gambetta, General Sans, DM Mono), with tracking calibrated against the originals by measurement (§1.1).
2. **Fluid interpolation** between Sarvam's verified mobile and desktop sizes.
3. **`display-2` statement role** (32 → 48, light), derived from the light display headlines in /brand imagery.
7. **`--color-accent`**: Sarvam's markup references `ct-accent-indigo` but never defines it, so we map it to `sr-indigo-800`.
4. **Banner type scale** (§5).
5. **Devanagari fallbacks and the line-height rule** (§6).
6. **`--measure-body: 65ch`** and `--text-code: 14px`.
