# 3 Meta banners · 1080×1350 (4:5)

Three messages, one per banner. The same three subjects appear in [`../3-linkedin-banners/`](../3-linkedin-banners), rearranged for that format rather than cropped.

![meta-1-sarvam-prism.png](meta-1-sarvam-prism.png)
![meta-2-nothing-ships-without-your-yes.png](meta-2-nothing-ships-without-your-yes.png)
![meta-3-sarvam-edge-qualcomm.png](meta-3-sarvam-edge-qualcomm.png)

## The set

Three Meta banners (1080×1350) and three LinkedIn banners (1200×627). Each subject comes in both formats, rearranged for that format rather than cropped.

| # | Subject | Meta | LinkedIn | Brief id | Device |
|---|---|---|---|---|---|
| 1 | Sarvam Prism launch | `meta-1-sarvam-prism.png` | `linkedin-1-sarvam-prism.png` | `prism` | medallion-glow · Eight-point star, dawn |
| 2 | Nothing ships without your yes (Indus Cowork approvals) | `meta-2-nothing-ships-without-your-yes.png` | `linkedin-2-nothing-ships-without-your-yes.png` | `your-yes` | medallion-glow · Ogee cross, olive, logomark |
| 3 | Sarvam Edge on Snapdragon (partnership with Qualcomm, as published on sarvam.ai/products/edge) | `meta-3-sarvam-edge-qualcomm.png` | `linkedin-3-sarvam-edge-qualcomm.png` | `final-early-access` | gloss cluster, split layout, `sarvam · Qualcomm` lockup (Qualcomm's official logo) |

- **Source:** (in the repo) `banners/briefs.json` (the specs) → `src/components/sarvam/composer.tsx` (the engine).
- **Export:** `node scripts/export-banners.mjs <id>`.
- **QA:** `node scripts/check-banners.mjs set`. All six pass.
- **Known exception:** banner 2 (Meta) sets its headline at 88px, below the engine's 96px minimum, so the text sits comfortably inside the star. Malay chose this over shortening the copy (2026-11-05), so `check-banners set` reports it.
- **Partner lockup:** banner 3 uses Qualcomm's official logo file (`public/brand/partners/qualcomm.svg`). The partnership (Sarvam Edge validated for the Snapdragon Hexagon NPU) is published by Sarvam on sarvam.ai/products/edge.
