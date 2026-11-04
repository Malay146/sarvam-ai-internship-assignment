---
name: sarvam-design-system
description: Sarvam AI's brand and design system, written for AI tools and teammates. Use it to produce on-brand Sarvam banners (Meta, LinkedIn), web pages and UI. It covers tokens, typography, responsive layout, components, the three brand expressions, imagery, logo rules, voice and step-by-step recipes.
---

# Sarvam design system

Sarvam AI's existing brand ("AI for all from India"), captured as explicit tokens, rules and recipes. It is built from sarvam.ai (site CSS, /brand, /brand-guidelines, /indus-cowork) and Sarvam's social posts. Every value is labelled **[verified]** (read from Sarvam), **[sampled]** (picked from Sarvam imagery) or **[addition]** (ours, listed under "Considered additions" in each file). Nothing is invented.

## How to use this skill

1. **Identify the task** in the table below and read only the files it lists, in order.
2. **Pick the expression** (Campaign / Product / Community) from `expressions.md` §1. Never mix two in one piece.
3. **Use tokens only.** Every colour, size, space, radius, shadow and duration comes from `tokens.css` (mirrored in `tokens.md`). Never write a raw value that isn't a token.
4. **Use the components** in `src/components/sarvam` for web work; follow their specs in `components.md`.
5. **Copy:** only claims from `voice.md` §5, written to the character budgets in `voice.md` §6.
6. **Check before calling it done:** the quality gates in the recipe (QA scripts and contrast). For web: `check-fit` and `check-layout` at every width, plus a click-through of every interactive state.

| Task | Read |
|---|---|
| Any banner (Meta / LinkedIn), from a subject or a reference | `recipes/banner-builder.md` (+ `/banners/make`, `.claude/skills/sarvam-banner`) → `voice.md` |
| Meta banner grid details | `recipes/meta-banner.md` |
| LinkedIn banner grid details | `recipes/linkedin-banner.md` |
| Landing page / web section | `recipes/landing-page.md` (§0 playbook first) → `layout.md` → `components.md` → `typography.md`; a worked second page: `recipes/bulbul-page.md` |
| New component | `components.md` §0–3 → `layout.md` §5 (siblings) → `tokens.md` |
| Illustration, pattern, gradient art | `imagery.md` → `tokens.md` §2 → `/studio` (`src/lib/shapes.ts`) |
| Any copy | `voice.md` |
| Any logo placement | `logo.md` |

## Files

| File | What it defines |
|---|---|
| `tokens.md` · `tokens.css` | Colour ramps and semantic roles; web gradients (dusk, dawn, indigo glow, sun, haze, tints, night) and campaign gradients (olive, meadow, saffron-rose, lavender-dusk, spring); grain; OKLab blending; spacing; radius; borders; shadows; blur; motion; contrast pairs |
| `typography.md` | Gambetta / General Sans / DM Mono (stand-ins for Season Mix / Matter / Matter Mono) with measured tracking; 18 type roles; a fluid scale 375 → 1024; banner type |
| `layout.md` | Breakpoints, container, 4/8/12 grid, vertical rhythm, alignment, **sibling consistency** (equal sizes and line counts), 14 section patterns with phone/tablet/desktop behaviour, mobile rules, QA matrix |
| `components.md` | Principles (clearer than sarvam.ai), surfaces, icons (Nucleo Core only), every component's anatomy, states and tiers, dashboards, emblems, the motion system |
| `expressions.md` | Campaign / Product / Community: when to use each, surfaces, hero device, type, wordmark, and the shared consistency contract |
| `imagery.md` | Gradient fields, gateways / medallions / flowers, emblems, motifs, dividers, product UI, photography, composition recipes |
| `logo.md` | Wordmark and logomark rules, clear space, minimum sizes, banner placement, misuse, co-branding |
| `voice.md` | Personality, headline patterns, CTAs, banned words, the **Indus Cowork fact sheet**, copy budgets |
| `recipes/banner-builder.md` | The banner engine: hard rules, spec, devices, presets, subject → banner method, our taste, the final set |
| `recipes/meta-banner.md` | Portrait grid (1080×1350), layouts on Meta, the final Meta set |
| `recipes/linkedin-banner.md` | Landscape grid (1200×627), how each layout rearranges, the final LinkedIn set |
| `recipes/landing-page.md` | The page-building playbook (§0) + the Indus Cowork page: section order, per-breakpoint behaviour, quality gates, export |
| `recipes/bulbul-page.md` | The Bulbul V4 Flash page (`/bulbul`): its own theme (structure, garden-sunrise hero light, per-item tones), sections and responsive table |

## Non-negotiables (summary)

- **Wordmark:** official SVG only, black on light / white on dark, small, "r" clear space, never next to the logomark.
- **Type:** display font for headings and primary CTAs; sentence case; weights 300–500; no italics.
- **Colour:** gradients carry grain; one gradient per composition; text only on approved pairs.
- **Layout:** design mobile first; rearrange, don't shrink; siblings identical in size and line count.
- **Fit:** nothing scrolls sideways, ever; no label breaks onto two lines; no text is clipped, truncated with "…" or runs past its box. Fix with the fit ladder in `layout.md` §7.6 (rearrange → tighten → drop decoration → short label → fluid size → rewrite). Components switch on their own width (`layout.md` §7.7).
- **Icons:** Nucleo Core outline, 24 grid, 1.5 stroke, round caps.
- **Motion:** transform and opacity only; loops only in product mocks; nothing changes size; respect reduced motion.
- **Voice:** calm, plain, confident; "Talk to Us" for Indus Cowork; only verified facts.

## Live reference
Run the app and open `/system` (overview), `/system/tokens`, `/system/expressions`, `/components` and `/studio`. Everything there is rendered from these files.
