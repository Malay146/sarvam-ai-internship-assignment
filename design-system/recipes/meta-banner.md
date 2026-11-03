# Recipe · Meta banner (Instagram / Facebook)

Format: **1080×1350** (portrait, 4:5) only. Export PNG at exactly this size. (Square was dropped so every Meta banner shares one grid.)
> **Use the builder:** compositions are now made with the prompt-less builder (`recipes/banner-builder.md`, `/banners/make`). This file keeps the per-format grid rules the builder follows.

Read first: `expressions.md` (pick one), `voice.md` §5–6 (facts, budgets), `logo.md` §1 (placement).

---

## 1. The grid (both formats)

```
┌──────────────────────────────── 1080 ────────────────────────────────┐
│ ← 72 →                                                        ← 72 → │
│        [wordmark 200×32]   ← top 72 (centre or left per expression)  │
│                                                                       │
│        ─ ─ ─ ─ ─ ─  BODY ZONE (hero device + headline)  ─ ─ ─ ─ ─ ─   │
│                                                                       │
│        [optional CTA chip / URL line]   ← bottom 72                   │
└───────────────────────────────────────────────────────────────────────┘
```

| | Square 1080×1080 | Portrait 1080×1350 |
|---|---|---|
| Outer margin | 72 (6.7%) | 72 |
| Wordmark | 200×32, top 72, centre (Campaign/Community) or left 72 (Product) | same |
| Safe zone for text | 936 × 936 | 936 × 1206 |
| Display headline | 96–104px, Season Mix 400, lh 1.06, tracking −0.04em | 96–104px |
| Product/model name headline | Matter 500, 88–96px | same |
| Sub-line | 32px Matter 400, lh 1.35, 28px below the headline | 32px |
| Eyebrow (Product) | DM Mono 22px, 0.13em, uppercase, `--color-accent` | same |
| Max headline lines | 3 | 4 |
| Min text size anywhere | 22px | 22px |
| Corner radius of inner panels | 40 | 40 |

**Instagram crops:** the feed shows 4:5 in full. The profile grid crops to the centre 1:1 (1080×1080 inside 1080×1350) → keep the headline inside the **middle 1080×1080** of a portrait banner. The wordmark may sit outside it.

---

## 2. Layouts (one per expression)

### A · Campaign: "Nested gateways"
1. Background: one campaign gradient with grain (`.sr-gradient-saffron-rose`, `-dusk`, `-olive`, `-indigo-glow`).
2. Hero device: **5 nested Domed-door gateway outlines** rising from the bottom edge (widths 620 / 800 / 980 / 1160 / 1340, the first one filled white 7%), stroke white 55% → 15%, 1.6px.
3. Wordmark: white, top-centre.
4. Headline + sub: centred inside the innermost arch, starting 170px below its crown. White.
5. Nothing else.
Reference component: `CampaignBanner` (`src/components/sarvam/banners.tsx`).

### B · Product: "Claim + product UI"
1. Background: `--color-sf`.
2. Wordmark: black, top-left (72, 72).
3. Eyebrow (product name) at y=196, headline below it, left-aligned, max 820 wide.
4. Hero device: a **tint panel** (`.sr-tint-indigo` / `-orange` / `-green`) from y=500 to the bottom margin, radius 40, holding **one real product mock** (MockPlan / MockResearch / MockReview) scaled ×1.6, centred.
Reference component: `ProductBanner`.

### C · Community: "Soft cloud"
1. Background: `.sr-gradient-lavender-dusk`, `-spring` or `-meadow`.
2. Hero device: a **soft cloud** (`cloudSVG` of the Scalloped medallion, `--color-cloud`) centred, about 1200 wide.
3. Wordmark: black, top-centre. For partners: `sarvam · PARTNER` lockup at the same spot.
4. Headline (Season Mix 400, tracking −0.03em) + sub, centred on the cloud.
Reference component: `CommunityBanner`.

### Square (1080×1080) adaptation, rearranged, not cropped
| Layout | Change from portrait |
|---|---|
| Campaign | Arch widths ×0.85; the headline moves up so its centre sits at y=600; sub ≤ 1 line |
| Product | Headline max 2 lines; the panel starts at y=440; mock scale ×1.35 |
| Community | Cloud ~1000 wide, centred at y=560; the headline stays centred |

---

## 3. Steps (for an AI tool)

1. Pick the **expression** from the content type (`expressions.md` §1).
2. Write copy to budget: headline ≤ 8 words / 40 characters; sub ≤ 70 characters; facts only from `voice.md` §5.
3. Build the composition at real pixel size on the grid above, using tokens and components only.
4. Check: wordmark official file + clear space; text contrast (`tokens.md` §1.6); one hero device; grain on the gradient.
5. Export with `node scripts/export-banners.mjs` (Playwright, exact size, deviceScaleFactor 1).
6. Open the PNG at 100% and at phone size (~375 wide). The headline must read at both.

## Don't
- Put more than one headline or more than one hero device on a banner.
- Put text on the transition band of a gradient.
- Shrink a desktop page section into a banner.
- Use "Sign up", "Try free" or invented numbers.
