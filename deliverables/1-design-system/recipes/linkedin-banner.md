# Recipe · LinkedIn banner (single image post)

Format: **1200×627** (≈ 1.91:1). Export PNG at exactly this size.

> **How banners are made:** with the banner engine (`recipes/banner-builder.md`). The same spec renders Meta and LinkedIn; the engine **rearranges** it for landscape rather than cropping the Meta art. This file records the **landscape grid**.

Read first: `banner-builder.md` §0 and §5, `meta-banner.md` (the same banners in portrait).

---

## 1. The grid

| | 1200×627 |
|---|---|
| Outer margin (M) | 56 |
| Clear space beside the hero shape | ≥ 1.5·M = 84 on both sides; the shape **may bleed off the top and bottom** only |
| Wordmark | 96px wide; inside the shape, top-centre, or top-left at the margin in split layouts |
| Logomark | 0.55 × 96 ≈ 53px tall; never with the wordmark |
| Text sections | **2 max** |
| Headline base | sans 92 · serif 100 · number 170; the same fixed steps as Meta |
| Headline minimum | **72px** (QA fails below). Max **2 lines**, in every layout |
| Supporting line | ≥ 20px |
| Feed preview | Shown at ~360px wide on phones (≈ 0.3×): a 72px headline reads like ~22px, so never go smaller |

## 2. How each layout rearranges for landscape

| Layout | On LinkedIn |
|---|---|
| `centered` | Text inside the shape; the shape grows wide (e.g. a lantern gets a wider structural aspect, never a stretch) |
| `split` / `stacked` | **Split**: text left in a 56% column (so a headline holds two lines at full size), device right 44% |
| `editorial` | One left column anchored low |
| Per-banner overrides | `markOnLinkedIn` (logo place differs from Meta), `landScale` (shape height on LinkedIn), `titleSize` / `lineSize` / `textShift` with a `landscape` key |

## 3. The final LinkedIn set (`deliverables/3-linkedin-banners/`)

| # | Banner | Notes for landscape |
|---|---|---|
| 1 | Sarvam Prism | Whole star (tips touch the edges); logomark inside the star above the title; title pinned at 79px and nudged up 28px |
| 2 | Every task leaves a trail | Split: claim left, the emblem right |
| 3 | Indus Cowork early access | Split: partner lockup + title left, gloss cluster right |

## Don't
- Centre a long three-line headline on landscape: switch to `split`, widen the opening, or shorten the copy.
- Put text in the right half when the device is there.
- Use the Meta PNG cropped to 1.91:1.
