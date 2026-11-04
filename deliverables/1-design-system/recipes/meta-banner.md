# Recipe · Meta banner (Instagram / Facebook)

Format: **1080×1350** (portrait, 4:5) only. Export PNG at exactly this size. Square (1080×1080) was dropped so every Meta banner shares one grid.

> **How banners are made:** with the banner engine (`recipes/banner-builder.md`). Give the AI a subject; it writes a spec into `banners/briefs.json`, runs QA and exports. This file only records the **portrait grid** the engine follows, so a person or another tool can check the output.

Read first: `banner-builder.md` §0 (hard rules) and §5 (subject → banner), `expressions.md` (pick one), `voice.md` §5–6 (facts, budgets).

---

## 1. The grid

| | 1080×1350 |
|---|---|
| Outer margin (M) | 72 |
| Clear space beside the hero shape | ≥ 1.5·M = 108 on both sides; the shape sits fully inside the frame (≥ 72 top and bottom) |
| Wordmark | 124px wide; inside the shape above the text, or top-centre at y = 72 |
| Logomark (instead of the wordmark) | 0.55 × 124 ≈ 68px tall; never with the wordmark |
| Text sections | **2 max**: one headline (or number) + one supporting line |
| Headline base | sans 124 · serif 132 · number 270; fixed steps 100 / 86 / 74 / 64 / 55 / 48 % |
| Headline minimum | **96px** (QA fails below). Max **3 lines** |
| Supporting line | ≥ 28px, Matter 400 (a number's label is set in the serif) |
| Instagram profile grid | Crops to the centre 1:1 (1080×1080 inside 1350): keep the headline in the middle 1080 |

## 2. Layouts on portrait

| Layout | What happens on Meta |
|---|---|
| `centered` | Text inside the hero shape's measured opening (the default) |
| `split` | Becomes **stacked**: text in the top 44%, the device in the bottom 56% |
| `editorial` | One left column (≥ 108 from the sides) anchored low; wordmark top-left on the column |

## 3. The final Meta set (`deliverables/2-meta-banners/`)

| # | Banner | Expression | Device |
|---|---|---|---|
| 1 | Sarvam Prism | Campaign | `medallion-glow` · Eight-point star · dawn · logomark above the star |
| 2 | Every task leaves a trail | Product | `emblem` · shield · indigo glow · stacked |
| 3 | Sarvam Edge on Snapdragon | Community | `gloss` · stacked · `sarvam · Qualcomm` |

## Don't
- Put more than two text sections, an eyebrow, a pill, mono text, a CTA or a URL on the art (they go in the caption).
- Shrink the headline to make it fit: make room or shorten the copy.
- Crop or stretch a shape; use more than one hero device.
