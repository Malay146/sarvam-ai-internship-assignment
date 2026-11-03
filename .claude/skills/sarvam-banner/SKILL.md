---
name: sarvam-banner
description: Make on-brand Sarvam AI social banners (Meta 1080×1350 / 1080×1080, LinkedIn 1200×627) from a subject or a reference design, using the project's prompt-less banner builder. Use when asked to create, change or export a banner, a social post image, or a launch / milestone / funding / event / story graphic.
---

# Make a Sarvam banner

Follow `design-system/recipes/banner-builder.md`; it is the source of truth. In short:

1. **Understand the input.**
   - **A subject** (e.g. "we crossed 1M tasks"): pick the situation (launch, announcement, milestone, funding, event, story).
   - **A reference image:** name its device, ground gradient, headline style (serif or sans) and text count, then map each to the builder's options.
2. **Write the copy.** One primary (≤ 6 words, or a number) + at most one secondary (≤ 60 characters). Facts only from `design-system/voice.md` §5; ask if a fact is missing. Never add eyebrows, pills, mono text, CTAs or URLs to the art.
3. **Write the spec** (background, device, shape, treatment, titleStyle, mark, primary, primaryIsNumber, secondary, secondaryPlace) as a new entry in `banners/briefs.json` with `formats` (`meta`: portrait or square; `linkedin`: landscape).
4. **Check:** `node scripts/check-banners.mjs set` must PASS (no overlaps, nothing outside the opening or the safe margin, ≤ 2 text sections).
5. **Export:** `node scripts/export-banners.mjs <id>` → `banners/png/meta-<id>.png`, `banners/png/linkedin-<id>.png`. The dev server must be running on :3000.
6. **Review** the PNGs at full size and at about 375px wide; fix and re-export if needed.
7. **Log** the brief, choices and changes in `process/prompt-log.md`.

If the reference needs an effect the builder lacks, extend `src/components/sarvam/composer.tsx` (a new device, or a shape preset in `src/lib/shapes.ts`) so it stays reusable. Never hand-draw a one-off.
