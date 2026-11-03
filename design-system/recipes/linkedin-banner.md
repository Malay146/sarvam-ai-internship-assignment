# Recipe · LinkedIn banner (single image post)

Format: **1200×627** (≈1.91:1). Export PNG at exactly this size.
> **Use the builder:** compositions are now made with the prompt-less builder (`recipes/banner-builder.md`, `/banners/make`). This file keeps the per-format grid rules the builder follows.

Read first: `expressions.md`, `voice.md` §5–6, `logo.md` §1, and `meta-banner.md` (same layouts, rearranged for landscape).

---

## 1. The grid

| | 1200×627 |
|---|---|
| Outer margin | 56 (≈9% of the short side) |
| Wordmark | 160×26, top 56. Left 56 (split layouts) or centred (symmetric layouts) |
| Columns | 12 columns, gutter 24, inside the margins |
| Split layout | text in cols 1–6 (≤ 520 wide), hero device in cols 7–12 |
| Display headline | 60–72px Season Mix 400, lh 1.06, tracking −0.04em |
| Product/model name | Matter 500, 60–64px |
| Sub-line | 24px Matter 400, lh 1.4, 20px below the headline |
| Eyebrow | DM Mono 16px, 0.13em, uppercase |
| Max headline lines | 2 (3 only in split layouts) |
| Min text size | 16px |
| Inner panel radius | 28 |

**Feed preview:** LinkedIn shows the full image on desktop and at about 360px wide on mobile (≈0.3×). At that scale a 64px headline reads like 19px, so headlines stay ≥ 60px and sub-lines ≥ 24px.

---

## 2. Layouts (landscape versions of the three expressions)

### A · Campaign: "Nested gateways, centred"
- Campaign gradient + grain; 5 nested gateway outlines rising from the bottom, centred (widths 420 → 1100).
- White wordmark top-centre; centred 1–2 line headline inside the innermost arch; optional 1-line sub.

### B · Product: "Split: claim left, product right"
- `sf` background. Wordmark top-left. Eyebrow + headline + sub in cols 1–6, vertically centred.
- Cols 7–12: a tint panel (inset 32 from the right/top/bottom edges, radius 28) holding one product mock at ×1.15.

### C · Community: "Split or cloud"
- **Cloud variant:** soft gradient, a wide soft cloud centred, headline centred on it.
- **Gloss variant:** wordmark top-left, headline left (cols 1–6), and a cluster of 2–4 **gloss** shapes (studio → gloss render) in cols 7–12, overlapping slightly, largest at the back. One shape family per banner.

---

## 3. Steps
1. Same copy as the Meta version of the campaign; the headline may shorten to fit 2 lines.
2. Rebuild on the landscape grid (rearrange, don't crop the Meta art).
3. Check legibility at 360px wide (mobile feed) and 1200px.
4. Export with `scripts/export-banners.mjs`.

## Don't
- Centre a long 3-line headline on a landscape canvas: switch to the split layout.
- Put text in the right half when the hero device is there.
- Let the wordmark exceed 180px wide.
