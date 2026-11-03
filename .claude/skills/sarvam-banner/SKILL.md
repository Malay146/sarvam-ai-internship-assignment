---
name: sarvam-banner
description: Make on-brand Sarvam AI social banners (Meta 1080×1350, LinkedIn 1200×627) from a subject or a reference design. The usual input is just a subject; Claude makes every design decision and writes the spec, and the builder at /banners/make is an optional manual tool. Use when asked to create, change or export a banner, a social post image, or a launch / milestone / funding / event / story graphic.
---

# Make a Sarvam banner

Follow `design-system/recipes/banner-builder.md`; it is the source of truth.

**The usual input is a subject only** (e.g. "Indus Cowork now in Slack"). Make every choice yourself: situation, copy, ground, device, shape, headline style, logo. Then render, QA, review the PNGs and present them. Don't ask Malay to open the builder or pick presets; `/banners/make` is an optional manual tool.

Use the method in `design-system/recipes/banner-builder.md` §5: **find the one idea → name its type → the part follows** (name → lit medallion, number → medallion, capability → emblem + icon, product moment → arch window, India/mission → script mandala, statement → gateway echo, community → gloss, calm launch or claim → spectrum). Read `banners/briefs.json` first so the new banner doesn't repeat the last ones. Our taste (§6): one idea, one object, crafted.

When you choose:
- **Vary within a set.** Each banner in a set gets a different message, ground and shape, and the set uses both headline styles.
- **Logo:** use the wordmark by default. Use the **logomark** (the mandala "pattern logo") where the brand is already obvious and the art is calm: milestones, statements, or a dark or saturated ground. Never use both, and partner lockups always use the wordmark.
- **When QA fails on fit,** make room first (another shape, a bigger opening), then shorten the copy. Never shrink a headline below 96px (Meta) / 72px (LinkedIn), and keep LinkedIn headlines to 2 lines.
- **Fine-tuning after looking** (banner-builder.md §1): `markOnLinkedIn`, `logoTone`, `titleSize`, `lineSize`, `textShift`, `whole`, `landScale`, or a `\n` in the headline. Change only what Malay asks for; keep the rest of the banner as it is.
- **Facts:** only from `voice.md` §5. A new fact from a source Malay gives (e.g. an X post) goes into §5 first, labelled with its source.

In short:

1. **Understand the input.**
   - **A subject** (e.g. "we crossed 1M tasks"): pick the situation (presets: launch, announcement, milestone, funding, event, story, partnership, program, capability, product, spectrum, sunrise, mission). Also name the expression (Campaign / Product / Community, `expressions.md`).
   - **A reference image:** name its device, ground gradient, headline style (serif or sans) and text count, then map each to the builder's options.
2. **Write the copy.** One primary (≤ 6 words, or a number) + at most one secondary (≤ 60 characters). Facts only from `design-system/voice.md` §5; ask if a fact is missing. Never add eyebrows, pills, mono text, CTAs or URLs to the art.
3. **Write the spec** (banner-builder.md §1) as a new entry in `banners/briefs.json`, with `formats` `{ "meta": "portrait", "linkedin": "landscape" }`.
4. **Check:** `node scripts/check-banners.mjs set` must PASS (no overlaps, nothing outside the opening or the safe margin, ≤ 2 text sections).
5. **Export:** `node scripts/export-banners.mjs <id>` → `banners/png/meta-<id>.png`, `banners/png/linkedin-<id>.png`. The dev server must be running on :3000.
6. **Review** the PNGs at full size and at about 375px wide; fix and re-export if needed.
7. **Log** the brief, choices and changes in `process/prompt-log.md`.
8. **Final set:** the submission banners live in `banners/final/` (numbered, with a README). Copy a banner there only when Malay picks it.

If the reference needs an effect the builder lacks, extend `src/components/sarvam/composer.tsx` (a new device, or a shape preset in `src/lib/shapes.ts`) so it stays reusable. Never hand-draw a one-off.
