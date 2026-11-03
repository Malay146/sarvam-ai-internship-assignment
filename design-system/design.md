# Sarvam design system: single-file edition

Generated from `design-system/` by `scripts/build-design-md.mjs`. Do not edit by hand. Machine-readable tokens: `design-system/tokens.css`.

## Contents
1. SKILL.md
2. expressions.md
3. tokens.md
4. typography.md
5. layout.md
6. components.md
7. imagery.md
8. logo.md
9. voice.md
10. recipes/banner-builder.md
11. recipes/meta-banner.md
12. recipes/linkedin-banner.md
13. recipes/landing-page.md


---

<!-- SKILL.md -->

## Sarvam design system

Sarvam AI's existing brand ("AI for all from India"), captured as explicit tokens, rules and recipes. It is built from sarvam.ai (site CSS, /brand, /brand-guidelines, /indus-cowork) and Sarvam's social posts. Every value is labelled **[verified]** (read from Sarvam), **[sampled]** (picked from Sarvam imagery) or **[addition]** (ours, listed under "Considered additions" in each file). Nothing is invented.

### How to use this skill

1. **Identify the task** in the table below and read only the files it lists, in order.
2. **Pick the expression** (Campaign / Product / Community) from `expressions.md` §1. Never mix two in one piece.
3. **Use tokens only.** Every colour, size, space, radius, shadow and duration comes from `tokens.css` (mirrored in `tokens.md`). Never write a raw value that isn't a token.
4. **Use the components** in `src/components/sarvam` for web work; follow their specs in `components.md`.
5. **Copy:** only claims from `voice.md` §5, written to the character budgets in `voice.md` §6.
6. **Check before calling it done:** the quality gates in the recipe (QA scripts and contrast).

| Task | Read |
|---|---|
| Any banner (Meta / LinkedIn), from a subject or a reference | `recipes/banner-builder.md` (+ `/banners/make`, `.claude/skills/sarvam-banner`) → `voice.md` |
| Meta banner grid details | `recipes/meta-banner.md` |
| LinkedIn banner grid details | `recipes/linkedin-banner.md` |
| Landing page / web section | `recipes/landing-page.md` → `layout.md` → `components.md` → `typography.md` |
| New component | `components.md` §0–3 → `layout.md` §5 (siblings) → `tokens.md` |
| Illustration, pattern, gradient art | `imagery.md` → `tokens.md` §2 → `/studio` (`src/lib/shapes.ts`) |
| Any copy | `voice.md` |
| Any logo placement | `logo.md` |

### Files

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
| `recipes/banner-builder.md` | The prompt-less builder: spec, devices, treatments, two-text rule, situations, how-to |
| `recipes/meta-banner.md` | Grid, three layouts, square adaptation, steps |
| `recipes/linkedin-banner.md` | Landscape grid and layouts, feed legibility |
| `recipes/landing-page.md` | Section order, per-breakpoint behaviour, quality gates, export |

### Non-negotiables (summary)

- **Wordmark:** official SVG only, black on light / white on dark, small, "r" clear space, never next to the logomark.
- **Type:** display font for headings and primary CTAs; sentence case; weights 300–500; no italics.
- **Colour:** gradients carry grain; one gradient per composition; text only on approved pairs.
- **Layout:** design mobile first; rearrange, don't shrink; siblings identical in size and line count.
- **Icons:** Nucleo Core outline, 24 grid, 1.5 stroke, round caps.
- **Motion:** transform and opacity only; loops only in product mocks; nothing changes size; respect reduced motion.
- **Voice:** calm, plain, confident; "Talk to Us" for Indus Cowork; only verified facts.

### Live reference
Run the app and open `/system` (overview), `/system/tokens`, `/system/expressions`, `/components` and `/studio`. Everything there is rendered from these files.


---

<!-- expressions.md -->
## Expressions

One Sarvam system, three ways of showing up. Every expression uses the same tokens, type roles, wordmark rules, spacing, grain and sibling rules. Only the **surface**, the **hero device** and the **energy** change. Derived from Sarvam's own split between its website and its social feed (`references/social/README.md`).

**Source labels:** `[observed]` seen in Sarvam's posts and site · `[addition]` our rule.

---

### Rules for AI (read first)

1. **Pick the expression from the content type, never from taste.** Use the table in §1.
2. **Never mix two expressions** in one piece. A Product page section can sit next to a Campaign hero band, but a single banner is one expression.
3. **The constants never change:** the wordmark (official file, black or white, small), Season Mix / Matter roles, the 4px spacing system, the grain, the margins, one hero device, sentence case, the "Talk to Us" CTA for Indus Cowork.
4. **Each expression has its own palette list.** Don't borrow across.

---

### 1. Choosing

| Content | Expression |
|---|---|
| Model or product launch, funding, a big announcement, a waitlist | **Campaign** |
| Features, "how it works", the product landing page, docs, release notes, dashboards | **Product** |
| Customer stories, programs (Startup, Champions), events, hiring, community, partnerships | **Community** |

---

### 2. The three expressions

#### A · Campaign: *the gateway opens*
Big, saturated, symmetric. The moment something new arrives.

- **Surfaces:** `--gradient-dusk`, `--gradient-dawn`, `--gradient-indigo-glow`, `--gradient-saffron-rose`, `--gradient-olive`, `--gradient-night`.
- **Hero device** (pick one):
  - a **gateway window** onto a gradient (social 02, 06)
  - **nested gateway echoes** filling the frame (social 12; our echo rings)
  - an **emblem** (EmblemArt)
- **Type:** centred. Display headline 2–5 words (Season Mix 300–400). For a product or model name, Matter 500 (`Sarvam 30B`) `[observed]`. Optional 1-line sub.
- **Wordmark:** top-centre, white on dark surfaces.
- **Energy:** high contrast, one strong colour family, nothing else on the canvas.

#### B · Product: *the work, shown plainly*
Calm, white, informative. The product is the image.

- **Surfaces:** `--color-sf` / white, `--gradient-haze`, tint panels (`--gradient-tint-*`), `--mesh-card-light`. A gradient only behind the product UI.
- **Hero device:**
  - **real product UI** (MockPlan / MockResearch / MockReview, the dashboards) on a tint panel
  - **split layouts** (text left, UI right)
- **Type:** left-aligned in splits. Season Mix H2 claim + Matter lead. Eyebrow = product name (indigo accent).
- **Wordmark:** top-left, black.
- **Energy:** quiet, structured, lots of white. Accents in indigo, orange and green one at a time (feature sequence).

#### C · Community: *people, warmly*
Soft, warm, floral. Stories about people and partners.

- **Surfaces:** `--gradient-lavender-dusk`, `--gradient-spring`, `--gradient-meadow`, tints. **Soft cloud** (`cloudSVG`, `--color-cloud`) as the text ground.
- **Hero device** (pick one):
  - a **soft cloud** behind a centred headline (social 05, 07)
  - **gloss shapes**: a cluster of 2–4 glossy flowers and medallions beside the text (social 03, 10)
  - a **shape cluster**: a mirrored arrangement of small gloss shapes (social 11)
- **Type:** Season Mix 400, centred on a cloud and left in splits. Partner lockup `sarvam · PARTNER` above the headline.
- **Wordmark:** top-centre (cloud) or top-left (split), black.
- **Energy:** gentle and welcoming; colour comes from the shapes, not from heavy fields.

---

### 3. What stays identical (the consistency contract)

| Element | Rule (all three) |
|---|---|
| Wordmark | Official SVG, black on light / white on dark, `"r"` clear space, never the logomark beside it |
| Headline | One idea, ≤ 8 words, sentence case, display or Matter role from `typography.md` |
| Margins | 6–8% of the short side on banners; container tokens on web |
| Grain | On every gradient and every glow |
| Shapes | Only from `/studio` families (gateway, medallion, flower); one shape family per piece |
| Icons | Nucleo Core outline, 1.5 stroke |
| CTA | At most one: a pill button (web) or a small chip / URL line (banners) |
| Contrast | Text and symbols pass `tokens.md` §1.6 and `components.md` §3.2 |

---

### 4. Quick test: is it on-system?

1. Can you name its expression in one word? If not, it's mixing.
2. Is there exactly one hero device?
3. Does every colour trace back to a token?
4. Is the wordmark the official file, small, and in its clear space?
5. Would it sit happily next to Sarvam's last three posts?


---

<!-- tokens.md -->
## Tokens

The base layer of the Sarvam design system. Every colour, gradient, space, radius, shadow and motion value used in a banner or page must come from this file. The machine-readable mirror is [`tokens.css`](tokens.css). Token names match those on sarvam.ai, so `--color-sr-indigo-800` here is the same value as on the live site.

**Source labels**
- `[verified]`: read directly from sarvam.ai CSS or brand pages.
- `[sampled]`: colour-picked from an official Sarvam image, so it's approximate.
- `[addition]`: our own rule, added where Sarvam publishes nothing. These are listed under "Considered additions" at the end.

---

### Rules for AI (read first)

1. **Use tokens only.** Never write a raw hex, px or ms value that isn't in this file. If a value you need is missing, choose the nearest token. Never invent a new one.
2. **Blue and orange are the brand.** Indigo (`sr-indigo`) and orange (`sr-orange`) are the core pair. Every composition must show both, through a gradient or through two separate elements.
3. **Gradients are continuous, not blocks.** Use the four named gradients in §2. Never place flat blue and flat orange side by side as hard-edged blocks.
4. **Neutrals carry most of the surface.** Near-white (`sf`) and near-black (`sr-black`) backgrounds hold content. Gradients are moments: a hero, a banner field, a glow behind a gateway shape.
5. **Secondary ramps are accents only.** Green, pink, yellow and red appear only as small state or product markers. They never form a background or a gradient with blue/orange.
6. **Check contrast.** Use only the pairs in §1.6 for text.

---

### 1. Colour

#### 1.1 Core ramps [verified]

**Indigo** is the primary blue. `800` is the anchor.

| Token | Hex | Use |
|---|---|---|
| `--color-sr-indigo-50` | `#fafcff` | tinted page wash |
| `--color-sr-indigo-100` | `#e8effc` | tinted surface, chip background |
| `--color-sr-indigo-200` | `#d2dff9` | soft border, inset ring |
| `--color-sr-indigo-300` | `#a7c0f1` | illustration light tone |
| `--color-sr-indigo-400` | `#81a0e9` | illustration mid tone, shimmer |
| `--color-sr-indigo-500` | `#6a88e2` | illustration |
| `--color-sr-indigo-600` | `#556adc` | focus ring, links on light |
| `--color-sr-indigo-700` | `#4250d5` | hover for indigo-800 |
| **`--color-sr-indigo-800`** | **`#3333cc`** | **brand blue: solid fills, logomark backdrop, key accents** |
| `--color-sr-indigo-900` | `#212191` | pressed state, deep fills |
| `--color-sr-indigo-950` | `#11115b` | deepest blue: the "Sovereign by default" dark panel on /indus-cowork `[verified by sampling]` |

**Orange** is the primary warm colour. `800` is the anchor.

| Token | Hex | Use |
|---|---|---|
| `--color-sr-orange-50` | `#fffbfa` | warm page wash |
| `--color-sr-orange-100` | `#feede6` | warm tinted surface |
| `--color-sr-orange-200` | `#fddcce` | soft warm border |
| `--color-sr-orange-300` | `#f9bb9e` | illustration light tone |
| `--color-sr-orange-400` | `#f59970` | illustration mid tone |
| `--color-sr-orange-500` | `#f38858` | illustration |
| `--color-sr-orange-600` | `#ee7944` | glow tone |
| `--color-sr-orange-700` | `#e96c2f` | hover for orange-800 |
| **`--color-sr-orange-800`** | **`#e6651b`** | **brand orange: accents, glows, large display fills** |
| `--color-sr-orange-900` | `#a5460f` | orange that passes AA with white text |
| `--color-sr-orange-950` | `#682906` | deepest warm, dark gradient ends |

#### 1.2 Neutrals [verified]

| Token | Hex | Use |
|---|---|---|
| `--color-sr-white` | `#ffffff` | pure white (cards on `sf`) |
| `--color-sr-grey-50` | `#f9f9f9` | |
| `--color-sr-grey-100` | `#f5f5f5` | = `sf-secondary` |
| `--color-sr-grey-200` | `#f0f0f0` | = `sf-tertiary`, `st-secondary`, line motif colour |
| `--color-sr-grey-300` | `#e6e6e6` | = `sf-quaternary`, `st` |
| `--color-sr-grey-400` | `#cccccc` | disabled border |
| `--color-sr-grey-500` | `#b3b3b3` | disabled text on dark |
| `--color-sr-grey-600` | `#999999` | secondary text on dark |
| `--color-sr-grey-700` | `#666666` | = `tx-tertiary` |
| `--color-sr-grey-800` | `#525252` | |
| `--color-sr-grey-900` | `#3d3d3d` | = `tx-secondary` |
| `--color-sr-grey-950` | `#292929` | raised surface on dark |
| `--color-sr-slate` | `#2a2c33` | cool dark surface (code blocks) |
| `--color-sr-black` | `#141414` | **dark background** |

#### 1.3 Semantic tokens [verified]

Use these in components rather than the raw ramps.

| Role | Token | Value |
|---|---|---|
| Text, primary | `--color-tx` | `#1f1f1f` |
| Text, secondary (leads, body) | `--color-tx-secondary` | `#3d3d3d` |
| Text, tertiary (eyebrows, meta) | `--color-tx-tertiary` | `#666666` |
| Text, brand (warm near-black) | `--color-tx-brand` | `#29211d` |
| Text, accent (warm highlight) | `--color-tx-accent` | `#c4733d` |
| Text on dark | `--color-tx-inverse` | `#faf8f5` |
| Surface, page | `--color-sf` | `#fcfcfc` |
| Surface, secondary | `--color-sf-secondary` | `#f5f5f5` |
| Surface, tertiary | `--color-sf-tertiary` | `#f0f0f0` |
| Surface, quaternary | `--color-sf-quaternary` | `#e6e6e6` |
| Stroke, default | `--color-st` | `#e6e6e6` |
| Stroke, subtle | `--color-st-secondary` | `#f0f0f0` |
| Focus ring | `--color-focus` | `var(--color-sr-indigo-600)` |
| Accent (eyebrows, timeline dots) | `--color-accent` | `var(--color-sr-indigo-800)`. Sarvam's markup uses `ct-accent-indigo`, which isn't defined in their CSS, so it's mapped to brand indigo `[assumption]` |

On-dark roles `[addition]`, built from verified values:

| Role | Token | Value |
|---|---|---|
| Surface, dark page | `--color-sf-dark` | `var(--color-sr-black)` `#141414` |
| Surface, dark raised | `--color-sf-dark-raised` | `var(--color-sr-grey-950)` `#292929` |
| Text on dark, secondary | `--color-tx-inverse-secondary` | `#ffffffbf` (white 75%) `[verified]` |
| Stroke on dark | `--color-st-dark` | `#ffffff1a` (white 10%) |

#### 1.4 Secondary ramps (accents only) [verified]

These come from Indian craft colours: textile pink, marigold, kumkum red, leaf green (brand-img-05). Use the **500** step for a dot, tag, icon or illustration fill. Use **50/100** for a tinted chip background.

| Ramp | 50 | 100 | 500 | 900 |
|---|---|---|---|---|
| Yellow (marigold) | `#fff8e6` | `#fff0cf` | `#feb12b` | `#6b4c1c` |
| Pink (textile) | `#fceaf0` | `#f9d5e1` | `#b12060` | `#611c35` |
| Red (kumkum) | `#fde7e2` | `#f8d1c6` | `#b81514` | `#52170e` |
| Green (leaf) | `#f2f8eb` | `#e3f1d8` | `#83c040` | `#263d0e` |

Full 50–950 values are in `tokens.css`.

**Status mapping** `[addition]`: success = green-500, warning = yellow-500, error = red-500, info = indigo-600.

#### 1.5 Colour proportions [addition]

Approximate share of any composition, matching how sarvam.ai and /brand imagery are balanced:

- **~70% neutral**: `sf` / white, or `sr-black` on dark compositions
- **~25% spectrum**: one gradient field or glow
- **≤5% solid accent**: an indigo-800 or orange-800 element, or a secondary-ramp dot

#### 1.6 Approved text pairs (WCAG 2.1)

Ratios computed from the token values. **AA** = 4.5:1 for body text. **AA-large** = 3:1, which counts only for text ≥ 24px regular or ≥ 18.66px bold.

| Text | Background | Ratio | Allowed for |
|---|---|---|---|
| `tx` `#1f1f1f` | `sf` `#fcfcfc` | 16.1 | everything |
| `tx-secondary` `#3d3d3d` | `sf` | 10.6 | everything |
| `tx-tertiary` `#666666` | `sf` | 5.6 | everything, including 12px eyebrows |
| `sr-indigo-700` `#4250d5` | `sf` | 6.1 | links, inline accents |
| `tx-accent` `#c4733d` | `sf` | 3.5 | **large only** (≥ 24px) |
| white | `sr-indigo-800` `#3333cc` | 8.5 | everything |
| `tx-inverse` `#faf8f5` | `sr-black` `#141414` | 17.4 | everything |
| `sr-grey-600` `#999999` | `sr-black` | 6.5 | secondary text on dark |
| white 75% `#ffffffbf` | `sr-black` | 10.6 | secondary text on dark (`tx-inverse-secondary`) |
| white | Dusk gradient, top 38% (`#314b82` and darker) | ≥ 8.5 | everything |
| white | Dusk gradient, 38–50% (down to `#5f78af`) | ≥ 4.4 | **large only** |
| `sr-black` | Dawn gradient, middle (`#fc9230`) | 8.2 | display and body |
| white | `sr-orange-900` `#a5460f` | 6.0 | everything |
| white | `sr-orange-800` `#e6651b` | 3.4 | **large only** |
| white | Sun core `#f9730c` | 2.8 | **never for text**. Logo only (Sarvam's own og image does this) |

---

### 2. Gradients `[sampled]`

The blue-to-orange spectrum is Sarvam's "foundational language". It works through continuous transitions in light and tone, never fixed colour blocks. Each gradient below was sampled from an official Sarvam image. All four contain both a blue and an orange family.

#### 2.1 Dusk: dark night to warm horizon
Source: brand-img-01 (logomark on gradient).
```css
/* 20 stops, densely sampled so there are no visible bands. Exact value in tokens.css. */
--gradient-dusk: #181a1c 0% → #202f50 25% → #2c4476 35% → #6079b0 50% → #a5b4dc 65% → #d5bab2 80% → #f89536 100%
```
- **Use for:** dark, premium, launch moments. Banner backgrounds, dark hero.
- **Text:** white. Body text only in the top 38%; display text can extend to 50%. Put the headline in the dark zone.
- **Logo:** white wordmark in the dark zone, or white logomark at centre.

#### 2.2 Dawn: warm sky to pale morning
Source: brand-img-10, sarvam.ai og image.
```css
/* 20 stops, densely sampled so there are no visible bands. Exact value in tokens.css. */
--gradient-dawn: #aa490d 0% → #d45f0c 25% → #f67b17 40% → #fc9230 50% → #ecb983 70% → #cecedf 85% → #e7efff 100%
```
- **Use for:** energetic, announcement, social. Banners, closing CTA band.
- **Text:** `sr-black` across the middle and bottom. White only for display ≥ 48px on the top 25%.
- **Logo:** white wordmark on the orange top (Sarvam's own og image), or black wordmark on the pale bottom.

#### 2.3 Indigo glow: brand blue melting into peach
Source: brand-img-06 ("AI for all, from India" inside a gateway).
```css
/* 20 stops, densely sampled so there are no visible bands. Exact value in tokens.css. */
--gradient-indigo-glow: #3838ce 0% → #554dc9 25% → #8a79ca 50% → #bca0c4 65% → #e2b6b7 75% → #f6c0ac 100%
```
- **Use for:** product and feature moments. Fill inside a gateway shape, feature cards, the Indus Cowork hero.
- **Text:** white. Body text only in the top 38% (6.2:1); display text can extend to 50% (4.1:1, large only).

#### 2.4 Sun: radial glow (homepage hero)
Source: `hero-gradient-1622.webp` on sarvam.ai: a solid orange disc with a periwinkle halo that fades into the white page.
```css
/* 20 stops, densely sampled so there are no visible bands. Exact value in tokens.css. */
--gradient-sun: circle from top-centre: #f9730c solid to 56% → soft blend to periwinkle #c0ccf5 by 81% → fades to transparent at 100%
```
- **How sarvam.ai uses it:** the sun image is mostly *above* the hero (`top: -110%` desktop, `-150%` mobile). Only its lower arc shows, so a curved orange horizon with a periwinkle halo descends into the top of the hero. A white-to-transparent fade (112px) softens the very top edge. The headline sits below it on `sf`.
- **Shape:** it's a circle centred on the layer's top edge (`circle farthest-side at 50% 0%`). Apply it to a layer with `aspect-ratio: 1622 / 872` (the source image's ratio), which makes the radius equal to the layer height.
- **Blend:** the orange-to-periwinkle transition is stretched about 1.5× compared with the source image, for a softer edge `[addition]`. The colours are unchanged.
- **Use for:** light heroes and light banner tops. Put the gradient's centre above the frame so only the bottom 25–40% of the disc is visible.
- **Text:** never on the orange core. Headline goes below the arc, on `sf`, in `tx`.

#### 2.4b Product-page gradients `[sampled, sarvam.ai/indus-cowork]`
The Indus Cowork page uses quieter versions of the spectrum: a haze behind the hero, and tinted panels behind product UI.

| Token / class | Value (summary) | Use on sarvam.ai |
|---|---|---|
| `--gradient-night` / `.sr-gradient-night` | `#13121e 0%` → `#a5bbfc 116.55%`, vertical `[verified, exact from sarvam.ai markup]` | Closing CTA card ("Meet your first teammate."), white display-2 text in the top 40% |
| `--gradient-haze` / `.sr-haze` | transparent → `#f2f6fd` → `#e3ebfc` → `#cfddfc` → `#bed1fc`, vertical | Lower half of the product hero, behind the product mockup |
| `--gradient-tint-indigo` / `.sr-tint-indigo` | `#e6ecfd` → `#d5dffc` → `#b8c9fa`, 135° | Feature panel 1 ("Plans the work") |
| `--gradient-tint-orange` / `.sr-tint-orange` | `#fcecdb` → `#f8dbb9` → `#efbb7e`, 135° | Feature panel 2 ("Researches on its own") |
| `--gradient-tint-green` / `.sr-tint-green` | `#d8efde` → `#b6dcc6` → `#bcd1ee`, vertical (green melting into periwinkle) | Feature panel 3 ("Improves until it holds up") |

Rules:
- Tint panels hold a **white UI card** (product mockup) on top. Never put text directly on a tint.
- Use them **in sequence** when features repeat: indigo, then orange, then green. The checkmark icons in each feature take the matching colour (`sr-indigo-800`, `sr-orange-800`, `sr-green-600`) `[observed]`.
- The haze is the product-page alternative to the Sun: calmer, all blue, for pages where the product UI is the hero.

#### 2.5 Blend space: OKLab `[addition]`
All gradients interpolate **in OKLab** (`linear-gradient(in oklab 180deg, …)`). With sRGB, the default, blue meeting orange turns slightly grey and muddy. OKLab keeps brightness even and passes through the soft lavender and peach seen in Sarvam's images.
- Not OKLCH: it blends around the hue wheel, so blue-to-orange picks up extra saturated pink and a harder band. That's off-brand. Comparison: `process/screens/interp-compare.png`.
- `tokens.css` declares the sRGB values first and overrides them with OKLab inside `@supports`, so older browsers still get a correct gradient.
- When writing a gradient by hand outside the tokens, always add `in oklab`.

#### 2.6 Grain (always on) `[sampled pattern]`
Sarvam's gradient imagery carries a fine film grain (look closely at brand-img-01 and 06). Grain also stops the visible horizontal lines (banding) that smooth CSS gradients show on 8-bit screens and in PNG exports.

- Token: `--texture-grain` (an SVG fractal-noise tile, 240px, blended with `overlay`).
- **Never use a raw `--gradient-*` on its own.** Use the ready-made classes in `tokens.css`, which layer grain over the gradient:
  `.sr-gradient-dusk`, `.sr-gradient-dawn`, `.sr-gradient-indigo-glow`, `.sr-gradient-sun`.
- `.sr-gradient-sun` also masks its edge, so grain never lands on the page around the glow.
- Outside these classes, use this layering: `background-image: var(--texture-grain), var(--gradient-x); background-size: var(--texture-grain-size), 100% 100%; background-blend-mode: overlay, normal;`

#### 2.7 Gradient rules
- **Direction:** vertical (180deg) for linear gradients. Dark or saturated at top, light at bottom, like a sky. The radial Sun hangs from the top edge. `[observed across all official samples]`
- **One gradient per composition.** Never stack two named gradients.
- **Never put a gradient on text or the logo.** Gradients are backgrounds, fills inside shapes, or glows.
- **Don't add stops.** Don't recolour. You may crop or stretch a gradient, or move the 50% point by ±10% to fit a format.
- **Accent glow** `[verified pattern]`: a single blurred blob (`sr-orange-800` or `sr-indigo-400`, `blur(80px)`, opacity 0.4–0.7) behind a card or section is allowed on `sf` surfaces.

---

#### 2.8 More surfaces (see `components.md` §2)
Mesh glow (5 colour triads), light card mesh, dark orbs, button surfaces, glass, well and bevel shadows, and the cursor spotlight are tokens/classes in `tokens.css`, documented with their use in `components.md` §2. Campaign gradients for social banners: §2.9.

#### 2.9 Campaign gradients `[sampled, Sarvam social posts]`
Sarvam's social feed uses a wider palette than the website: earthy and floral, but always smooth, vertical and grainy. Each one is sampled from a real post (`references/social/`). They are used in the **Campaign** and **Community** expressions (`expressions.md`), never on the website UI.

| Token / class | Ramp (top → bottom) | Seen in | Mood |
|---|---|---|---|
| `--gradient-olive` | gold `#c2a12d` → olive `#5b7828` → deep olive `#486523` | Knowledge Fabric for Agents | research, depth |
| `--gradient-meadow` | leaf `#8fbf6f` → sage `#aed1a7` → periwinkle `#b0c6ef` | Indic DiarBench | datasets, open research |
| `--gradient-saffron-rose` | saffron `#f1c480` → rose `#c4706e` → magenta `#a13060` | Sarvam 30B | model launches |
| `--gradient-lavender-dusk` | cream `#f1f4e9` → lavender `#c6bdd3` → violet `#5957c4` | Supernova customer story | stories, partnerships |
| `--gradient-spring` | cream `#f2f6e8` → pistachio `#d9dfb3` → leaf `#98c659` | Equal customer story | stories, growth |
| `--color-cloud` | `#f7efed` warm white | soft-cloud glow | text ground on gradients |

Rules:
- One campaign gradient per banner. Grain always. OKLab blending (§2.5).
- Text sits in the gradient's calm zone or on a soft cloud. Dark text on the pale ends; white only on olive, saffron-rose (middle down) and the violet end of lavender-dusk.
- Blue and orange together remains the **website** rule. Campaign art may use one family when the subject calls for it, because Sarvam's own posts do.

### 3. Spacing

#### 3.1 Base scale [verified]
4px base unit (`--spacing: 0.25rem`). Use only these steps:

| Token | px | Typical use |
|---|---|---|
| `--space-1` | 4 | icon to label |
| `--space-2` | 8 | tight inline gaps, meta separators |
| `--space-3` | 12 | chip padding |
| `--space-4` | 16 | eyebrow to heading, text stack |
| `--space-5` | 20 | button horizontal padding |
| `--space-6` | 24 | card padding (mobile), heading row gap (mobile) |
| `--space-8` | 32 | card padding (desktop), grid gap (mobile) |
| `--space-10` | 40 | section header to content (mobile), grid gap (tablet) |
| `--space-12` | 48 | heading row gap (desktop), grid gap (desktop) |
| `--space-14` | 56 | section header to content (desktop) |
| `--space-16` | 64 | |
| `--space-20` | 80 | |
| `--space-24` | 96 | |
| `--space-32` | 128 | |

#### 3.2 Responsive spacing tokens

These change value at breakpoints. Use them for layout rhythm instead of fixed steps. Breakpoints are defined in `layout.md`.

| Token | Mobile < 768 | Tablet 768–1023 | Desktop ≥ 1024 | Source |
|---|---|---|---|---|
| `--space-section` (gap between sections) | 96 | 176 | 176 | `[verified]` homepage gap-24 / md:gap-44 |
| `--space-hero-top` (hero top padding, clears nav) | 144 | 160 | 160 | `[verified]` pt-36 / md:pt-40 |
| `--space-section-head` (section header to its content) | 40 | 56 | 56 | `[verified]` mb-10 / md:mb-14 |
| `--space-heading-row` (title block to side CTA) | 24 | 48 | 48 | `[verified]` gap-6 / md:gap-12 |
| `--space-grid` (card grid gap) | 32 | 40 | 48 | `[verified]` gap-8 / md:gap-10 / lg:gap-12 |
| `--space-card` (card inner padding) | 24 | 32 | 32 | `[addition]` |
| `--container-width` | 88% | 83.333% | 83.333% (max 1280px) | `[verified]` w-[88%] / md:w-10/12. Max width is an `[addition]` |

**Banners** use fixed px, not responsive tokens. Their margins are defined per format in `recipes/`.

---

### 4. Radius [verified]

| Token | px | Use |
|---|---|---|
| `--radius-xs` | 2 | |
| `--radius-sm` | 4 | tags |
| `--radius-md` | 6 | inputs |
| `--radius-lg` | 8 | image thumbnails, code blocks |
| `--radius-xl` | 12 | small cards, dropdowns |
| `--radius-2xl` = `--radius-card` | 16 | **default card** |
| `--radius-3xl` | 24 | large media frames |
| `--radius-4xl` = `--radius-card-lg` | 32 | **feature panels, hero media** |
| `--radius-full` | 9999 | buttons (pill), chips, avatars `[addition, matches site buttons]` |

Rule: radius grows with element size. Never put a card radius on a button, or a button radius on a card.

---

### 5. Borders [verified]

- Default border: `1px solid var(--color-st)`.
- Subtle border (image frames, dividers): `1px solid var(--color-st-secondary)`.
- Hover: border goes from `st-secondary` to `st`.
- Inset focus/selected ring: `inset 0 0 0 2px var(--color-sr-indigo-200)`.
- Focus outline: `2px solid var(--color-focus)`, offset 2px.

### 6. Shadows [verified]

Shadows are soft, neutral and ambient. Never coloured, never hard.

| Token | Value | Use |
|---|---|---|
| `--shadow-ambient-sm` | `0 1px 3px #00000014` | buttons, chips |
| `--shadow-ambient-md` | `0 4px 24px #0000001f` | cards on hover, dropdowns |
| `--shadow-ambient-lg` | `0 12px 40px -8px #0000001f` | floating panels, product mockups |
| `--shadow-ambient-xl` | `0 0 40px 0 #0000000f` | large media resting |
| `--shadow-ambient-xl-hover` | `0 8px 40px -4px #0000001f` | large media hover |
| `--shadow-button-inset` | `inset 0 1px 0 #fff6, inset 0 -2px 0 #0003` | dark solid buttons: a subtle bevel `[verified]` |
| `--ring-dot` | `0 0 0 4px var(--color-sf)` | ring around timeline dots `[verified]` |

Rule: on `sf`, cards rest with a border and **no shadow**. A shadow appears on hover, or on elements that float (mockups, menus).

### 7. Blur [verified]

| Token | Value | Use |
|---|---|---|
| `--blur-glow` | 80px | accent glows behind sections |
| `--blur-glow-lg` | 100px | hero glow |
| `--blur-glass` | 24px (`backdrop-blur-xl`) | sticky nav, overlays on imagery |

### 8. Motion [verified]

Names and values match sarvam.ai's own motion tokens.

| Token | Value | Use |
|---|---|---|
| `--duration-instant` | 100ms | press feedback |
| `--duration-fast` | 150ms | colour, opacity |
| `--duration-normal` | 200ms | hover states (most common on site) |
| `--duration-moderate` | 300ms | tabs, accordions, panels |
| `--duration-button` | 350ms | buttons |
| `--duration-slow` | 500ms | image zoom on hover |
| `--duration-entrance` | 700ms | section reveal |
| `--ease-standard` | `cubic-bezier(.4,0,.2,1)` | default |
| `--ease-out` | `cubic-bezier(0,0,.2,1)` | entering |
| `--ease-in` | `cubic-bezier(.4,0,1,1)` | exiting |
| `--ease-emphasized` | `cubic-bezier(.2,0,0,1)` | buttons |
| `--ease-out-quint` | `cubic-bezier(.22,1,.36,1)` | reveals |
| `--ease-out-expo` | `cubic-bezier(.16,1,.3,1)` | arrivals, timeline events |

Rules:
- Motion is calm. Transitions signal flow; they are not spectacle.
- Image hover = `scale(1.02)` over 500ms.
- Button press = `scale(0.97)` at `--duration-fast` `[verified]`.
- Sections reveal on scroll with a short fade and rise.
- Always respect `prefers-reduced-motion: reduce`: turn off reveals and zooms, keep colour changes.

---

### Do / Don't

| Do | Don't |
|---|---|
| Use `sr-indigo-800` and `sr-orange-800` as the anchors | Use Tailwind default `blue-600` / `orange-500` |
| Use one named gradient per composition | Mix two gradients, or make your own |
| Run gradients vertically, saturated at top | Run diagonal rainbow gradients |
| Keep most of the surface neutral | Fill every section with colour |
| Use secondary ramps as small accents | Build a green or pink background |
| Use body text only from the §1.6 pairs | Put white body text on orange-800 |
| Use soft ambient shadows | Use coloured or hard drop shadows |

---

### Considered additions

Things Sarvam doesn't publish, which we added so the system is complete. Each one is built from verified values.

1. **On-dark semantic roles** (§1.3): Sarvam's CSS has `tx-inverse` but no dark surface tokens. Mapped to existing `sr-black` / `sr-grey`.
2. **Status mapping** (§1.4): reuses the secondary ramps.
3. **Colour proportions** (§1.5): codifies the balance seen on sarvam.ai and /brand.
4. **Named gradients** (§2): Sarvam ships its gradients as images. We sampled them into CSS (20 stops each) so AI tools can reproduce them, and added grain (§2.6) to match the texture of the originals and prevent banding.
8. **OKLab blending** (§2.5): smoother blue-to-orange transitions than the browser default.
9. **Softer Sun edge** (§2.4): the orange-to-periwinkle transition is wider than in the source image.
5. **Card padding 24/32** (§3.2): not exposed as a token on the site.
6. **Container max width 1280px** (§3.2): the site uses `max-w-width-mx`, but its value isn't exposed in the CSS we captured.
7. **`--radius-full` for pill buttons.**


---

<!-- typography.md -->
## Typography

How Sarvam sets type, on the web and in banners. Every size, weight, line height and tracking value here is a token in [`tokens.css`](tokens.css). Colours come from [`tokens.md`](tokens.md).

**Source labels:** `[verified]` read from sarvam.ai markup or CSS · `[observed]` seen across official brand imagery · `[addition]` our own rule.

---

### Rules for AI (read first)

1. **Two voices, one job each.** The **display** font (serif) is for headings at every level (hero H1 down to card headings h3/h4) and for primary buttons. The **text** font (sans) is for body, UI, eyebrows, list items and listing-card titles. The **code** font (mono) is only for code, mono eyebrows, step numbers and times.
2. **Use a role, not a size.** Pick a role from §3 (`display-1`, `h2`, `lead`…) and apply all of its tokens together: font, size, weight, line height, tracking. Never set a font size on its own.
3. **Sentence case everywhere.** The only uppercase text is the eyebrow and the mono label.
4. **Light and regular, never bold.** Display headlines use 300–500. Nothing in the system is heavier than 500 (600 only for General Sans at ≤ 14px, if needed for legibility).
5. **No italics.** Sarvam loads upright fonts only (`MatterUprights`, `SeasonMixVFUprights`) `[verified]`. For emphasis, use a colour change (`tx-accent`, large text only) or a weight step (400 → 500).
6. **One display heading per block.** A section has one H2. Each card has at most one display heading (h3 or h4). Never put two display headings directly on top of each other.
7. **Short lines.** Body text ≤ 65ch, leads ≤ 42rem, hero headline ≤ 56rem. Use `text-wrap: balance` on headings and `text-wrap: pretty` on paragraphs.
8. **Numbers use tabular figures** (`font-variant-numeric: tabular-nums`) wherever they line up or count: stats, times, step numbers `[verified]`.

---

### 1. Families

| Role | Sarvam uses `[verified]` | We use (free stand-in) | Token | Source |
|---|---|---|---|---|
| Display: headlines, primary buttons | **Season Mix** (variable 300–900) | **Gambetta** (300–600) | `--font-display` | Fontshare |
| Text: body, UI, eyebrows, titles | **Matter** (variable 100–1000) | **General Sans** (400–600) | `--font-text` | Fontshare |
| Code: code, mono labels | **Matter Mono** (400, 500), **Matter Semi Mono** (400) | **DM Mono** (400, 500) | `--font-code` | Google Fonts |
| Devanagari fallback `[addition]` | (not specified) | Noto Serif / Noto Sans Devanagari | inside the stacks above | Google Fonts |

**Why stand-ins:** Season Mix, Matter and Matter Mono are commercial fonts licensed to Sarvam. We don't own a licence and must not take the font files from sarvam.ai. The stand-ins were chosen by rendering the same sample in Sarvam's real fonts and in 11 free sans and 8 free mono candidates (`process/screens/font-compare-*.png`).

**Switching to the licensed fonts** is a one-place change in `tokens.css`. Swap the three `--font-*` family values, then set the tracking tokens back to Sarvam's own values (listed in the comments in `tokens.css` and in §1.1).

#### 1.1 Calibration (measured, not eyeballed)
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

#### 1.2 Loading
- Web (`src/app/layout.tsx`) and banners load the same two stylesheets:
  - `https://api.fontshare.com/v2/css?f[]=gambetta@300,400,500,600&f[]=general-sans@400,500,600&display=swap`
  - `https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Noto+Sans+Devanagari:wght@400;500&family=Noto+Serif+Devanagari:wght@300;400;500&display=swap`
- Devanagari fonts download only when Devanagari characters appear on the page (the stylesheet scopes them by unicode-range).

---

### 2. Weights

| Token | Value | Use |
|---|---|---|
| `--weight-light` | 300 | Display statements on imagery and banners `[observed]` |
| `--weight-regular` | 400 | Hero and product H1 `[verified]`, body, leads, meta, mono |
| `--weight-medium` | 500 | H2, h3, h4 `[verified]`, feature and card titles, eyebrows, buttons |

---

### 3. Web type scale (responsive)

#### 3.1 Sarvam's own named scale `[verified]`
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

#### 3.2 Roles

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

#### 3.3 CSS recipe

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

### 4. How type behaves across breakpoints

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

### 5. Banner type (fixed px) `[addition]`

Banners are fixed-size images, so they use **fixed px values, not fluid tokens**. The ratios follow the web scale: display ≈ 2.5–3× the subhead, and the eyebrow sits at the bottom of the hierarchy. The exact layouts are in `recipes/`.

| Role | Meta square 1080×1080 | Meta portrait 1080×1350 | LinkedIn 1200×627 |
|---|---|---|---|
| Display headline (display font, 300–400, lh 1.05, tracking −0.04em) | 96–112 | 104–120 | 60–72 |
| Subhead (text font, 400, lh 1.4) | 32–36 | 34–38 | 22–26 |
| Eyebrow (text font, 500, UPPERCASE, tracking 4px) | 20 | 22 | 15 |
| Footnote / CTA line (text font, 500) | 24 | 26 | 18 |
| Mono label (code font, UPPERCASE) | 18 | 20 | 14 |
| Max headline lines | 3 | 4 | 2 |

Rules:
- The headline is the hero of the banner: one idea, ≤ 8 words. On imagery it's light (300) `[observed]`; on flat surfaces it's regular (400).
- Minimum text size on any banner is **14px at LinkedIn scale and 18px at Meta scale**. Anything smaller is unreadable in a feed.
- Respect the text zones of the gradient (`tokens.md` §2). Headlines never sit on the Sun's orange core.

---

### 6. Indic scripts `[addition]`

Sarvam is an Indic-language AI company, and its brand imagery shows Devanagari set large in indigo (brand-img-08).
- Devanagari falls back to **Noto Serif Devanagari** (display) or **Noto Sans Devanagari** (text) automatically through the font stacks.
- Add **+0.1 to the line height** for any block containing Devanagari, so the matras (marks above and below the line) don't collide.
- Never fake Indic text with transliteration in a Latin font. If a banner shows an Indian language, set it in its real script.

---

### Do / Don't

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

### Considered additions

1. **Stand-in fonts** (Gambetta, General Sans, DM Mono), with tracking calibrated against the originals by measurement (§1.1).
2. **Fluid interpolation** between Sarvam's verified mobile and desktop sizes.
3. **`display-2` statement role** (32 → 48, light), derived from the light display headlines in /brand imagery.
7. **`--color-accent`**: Sarvam's markup references `ct-accent-indigo` but never defines it, so we map it to `sr-indigo-800`.
4. **Banner type scale** (§5).
5. **Devanagari fallbacks and the line-height rule** (§6).
6. **`--measure-body: 65ch`** and `--text-code: 14px`.


---

<!-- layout.md -->
## Layout

How Sarvam pages are built at every screen size: breakpoints, containers, grids, alignment, section patterns and the rules for how they **rearrange**, not just shrink. All values are tokens in [`tokens.css`](tokens.css). Type roles come from [`typography.md`](typography.md).

**Source labels:** `[verified]` read from sarvam.ai CSS/markup · `[observed]` seen in sarvam.ai screenshots at 375 / 768 / 1440 (`references/site/`) · `[addition]` our own rule.

---

### Rules for AI (read first)

1. **Design mobile first.** Write the 375px layout first, then add tablet and desktop. Mobile is never "desktop squeezed".
2. **Rearrange, don't shrink.** Each pattern in §6 states what moves, stacks, hides or changes at each tier. Follow that table, never just scale.
3. **Siblings are identical** (§5): equal width, equal height, aligned inner rows, and the **same number of lines** in every title and every description. Write copy to fit.
4. **One alignment per role** (§4): the hero is centred; everything else is left-aligned on mobile.
5. **Use tokens only:** `--container-width`, `--space-*`, `--grid-*`. No raw px for layout.
6. **Nothing scrolls sideways** except an intentional swipe row (§7.4), which must show a peek of the next item.
7. **Check every width,** not only the three exports (§8).

---

### 1. Breakpoints `[verified]`

sarvam.ai uses Tailwind's default breakpoints, and so do we. Most of Sarvam's layout changes happen at **md (768)**, with refinements at lg and xl.

| Tier | Name | Range | Typical device | Export frame |
|---|---|---|---|---|
| T1 | **phone** | 0–639 | phones (320–430) | **375** |
| T2 | **large phone** | 640–767 | large phones in landscape, small tablets | (in-between check: 640) |
| T3 | **tablet** | 768–1023 | iPad portrait | **768** |
| T4 | **laptop** | 1024–1279 | small laptops, iPad landscape | (in-between check: 1024) |
| T5 | **desktop** | 1280+ | desktop | **1440** |
| (cap) | 2xl | 1536+ | wide screens | content stops growing at `--container-max` |

```css
/* mobile first: base styles = phone */
@media (min-width: 640px)  { /* large phone */ }
@media (min-width: 768px)  { /* tablet */ }
@media (min-width: 1024px) { /* laptop */ }
@media (min-width: 1280px) { /* desktop */ }
```

Tailwind: `sm:` `md:` `lg:` `xl:` `2xl:`, identical values.

---

### 2. Container `[verified]` + `[addition]`

Sarvam uses a percentage-width container rather than fixed gutters (`w-[88%] md:w-10/12 2xl:max-w-width-mx`).

| | Phone | Tablet | Laptop | Desktop 1440 |
|---|---|---|---|---|
| `--container-width` | 88% | 83.333% | 83.333% | 83.333% |
| Content width | 330 at 375 · 282 at 320 | 640 at 768 | 853 at 1024 | **1200** at 1440 |
| Side margin | 22.5 at 375 | 64 | 85 | 120 |
| Max width | | | | `--container-max` 1280 (reached at 1536) `[addition]` |

```css
.container { width: var(--container-width); max-width: var(--container-max); margin-inline: auto; }
```

**Full-bleed exceptions:** the hero background (Sun or haze), the dark sovereign band and the footer background span the full viewport. Their **content** still sits in `.container`.

---

### 3. Grid `[addition]`

Sarvam doesn't publish a column grid. We add one so that every section aligns to the same columns.

| | Phone | Tablet | Laptop+ |
|---|---|---|---|
| Columns (`--grid-columns`) | 4 | 8 | 12 |
| Gutter (`--grid-gutter`) | 16 | 24 | 32 |
| Card gap (`--space-grid`) `[verified]` | 32 | 40 | 48 |

```css
.grid { display: grid; grid-template-columns: repeat(var(--grid-columns), minmax(0, 1fr)); column-gap: var(--grid-gutter); }
```

Common spans:

| Content | Phone (of 4) | Tablet (of 8) | Laptop+ (of 12) |
|---|---|---|---|
| Hero text block | 4 | 8 (max 42rem lead) | 8, centred (cols 3–10) |
| Section header | 4 | 6 | 7 (left) + 5 (side content) |
| Split: text / visual | 4 / 4 stacked | 8 / 8 stacked, or 4 / 4 | 5 / 7 or 6 / 6 |
| 3-card row | 4 each (stacked) | 4 + 4, then 8 (see §6) | 4 + 4 + 4 |
| Body paragraph | 4 | 6 | 6 (max 65ch) |

#### 3.1 Vertical rhythm `[verified]`

| Token | Phone | Tablet | Laptop+ | Where |
|---|---|---|---|---|
| `--space-hero-top` | 144 | 160 | 160 | top of hero (clears nav) |
| `--space-section` | 96 | 176 | 176 | between sections |
| `--space-section-head` | 40 | 56 | 56 | section header to content |
| `--space-heading-row` | 24 | 48 | 48 | header text to side CTA |
| `--space-grid` | 32 | 40 | 48 | between cards |
| `--space-card` `[addition]` | 24 | 32 | 32 | card padding |

Inside a text block: eyebrow → heading `--space-4`, heading → lead `--space-4`, lead → buttons `--space-8`.

---

### 4. Alignment rules `[addition]`, fixing an inconsistency found on sarvam.ai

On sarvam.ai/indus-cowork at 375px, section headers switch between **centred** ("It runs the whole task", "Runs while you sleep") and **left-aligned** ("Plugs into the stack", "Message an agent") with no clear rule `[observed]`. We fix one rule per role:

| Role | Phone | Tablet | Laptop+ |
|---|---|---|---|
| Hero (eyebrow, H1, lead, buttons) | centred | centred | centred |
| Chapter header above a symmetric grid or cards | **left** | centred | centred |
| Split header (H2 with side text or CTA) | left, stacked | left + right | left + right |
| Card and list content | left | left | left |
| Closing CTA card | centred | centred | centred |
| Numbers in stats | left | left | left, tabular figures |

Why left on phone: centred text over 3+ lines gives a ragged left edge that's hard to read on a narrow screen. Centred is kept for short blocks (≤ 2 lines of lead) and for the hero.

**Never justify text** (`text-align: justify`). It creates uneven gaps between words ("rivers"), especially at narrow widths.

---

### 5. Sibling consistency `[addition]`, our core rule

When two or more blocks sit side by side, or stack as a set (cards, features, steps, stats, testimonials, pricing tiers), they must be **identical in structure and size**. Sarvam's own page doesn't hold this (on mobile, "Teach any skill, or let AI write it" wraps to 2 lines while sibling titles take 1–2; card heights vary) `[observed]`. We hold it everywhere.

#### 5.1 The five rules
1. **Same structure.** If one card has an icon, an eyebrow or a CTA, all of them do. Same order of parts.
2. **Same width.** Use grid tracks `repeat(n, minmax(0, 1fr))`, never `flex-wrap` with content-sized items.
3. **Same height.** Grid items stretch. Cards are `display: flex; flex-direction: column` with the CTA or footer pinned by `margin-top: auto`.
4. **Aligned inner rows.** Icons, eyebrows, titles, descriptions and CTAs start on the same y-position across siblings. Use **subgrid**:
   ```css
   .card-row { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--space-grid); }
   .card { display: grid; grid-row: span 4; grid-template-rows: subgrid; row-gap: var(--space-3); }
   /* rows: icon / eyebrow / title / description; each row's height = the tallest sibling's */
   ```
5. **Same line count.** All sibling titles wrap to the same number of lines, and all descriptions too, **at every breakpoint**. Achieve it with copy (§5.2), with `min-height` in `lh` units as a safety net:
   ```css
   .card-title { min-height: 2lh; }       /* every title occupies exactly 2 lines */
   .card-desc  { min-height: 3lh; }       /* every description exactly 3 lines */
   ```

#### 5.2 Copy budgets (characters per line) `[measured]`
Average character width, measured on our fonts: **General Sans ≈ 0.45em**, **Gambetta ≈ 0.42em** (at our tracking).

`characters per line ≈ text width ÷ (font size × 0.45 or 0.42)`

Real text widths inside a card (container − gaps − card padding), measured on the /system page:

| Layout | Width | Card text width | Body 16px chars/line | h4 22px chars/line |
|---|---|---|---|---|
| 1 column, phone | 320 | 234 | ~32 | ~25 |
| 1 column, phone | 375 | 282 | ~39 | ~30 |
| 1 column, horizontal card, tablet | 768 | 512 | ~71 | ~55 |
| **3 columns** | 1024 | **188** | **~26** | **~20** |
| 3 columns | 1280 | 259 | ~36 | ~28 |
| 3 columns | 1440 | 304 | ~42 | ~33 |

**Writing rules:**
1. **Size for the narrowest side-by-side tier.** For 3-up cards that's 1024: titles ≤ 16 characters stay on 1 line everywhere.
2. **Stay away from line-break boundaries.** For each width, `length ÷ chars-per-line` must not be within ±12% of a whole number. Otherwise one sibling wraps and the next doesn't. Example: 3-up descriptions of **54–58 characters** give 2 / 2 / 1 / 3 / 2 / 2 lines across the tiers, identical for every sibling.
3. **Keep siblings within ±4 characters** of each other.
4. If no length works at every tier, change the layout (fewer columns, horizontal cards), not the padding.

**Tested on /system (2026-11-03):**
- **First attempt:** 3 columns from 768. Card text was only ~122px wide at 768, so titles wrapped to 2 and 3 lines and descriptions to 5 and 6.
- **Fix:** 1 column of horizontal cards at tablet, 3 columns only from 1024.
- **Second attempt:** descriptions of 68–70 characters sat on line-break boundaries, so parity failed at 320, 600, 1024 and 1280.
- **Fix:** rewrote the copy to 54–58 characters and titles to ≤ 15. Result: **all 10 widths pass** (equal heights, equal line counts, no overflow).

#### 5.3 Other consistency rules
- Icons: one size per set (`20px` in a `40px` tile), aligned to the first line of text.
- Numbers: `tabular-nums`, so 01 / 02 / 03 and stats are equally wide.
- Bullet and check lists inside siblings: the same number of items.
- Images in sibling cards: the same aspect ratio (`aspect-ratio`) and crop.
- QA: run the parity check (§8.2) before calling any section done.

---

### 6. Section patterns and how they rearrange

The building blocks of a Sarvam product page, in the order sarvam.ai/indus-cowork uses them `[verified/observed]`, with our consistency upgrades. Component internals (button, card anatomy) are in `components.md`.

#### P1. Navigation
| Phone | Tablet | Laptop+ |
|---|---|---|
| Wordmark left · "Talk to Us" pill + menu icon right `[observed]`. Menu opens a full-screen sheet with the 4 groups as large tappable rows (min 44px). | Same as phone (links don't fit at 768 with the CTA). | Wordmark · Products / Developers / Resources / Company (centre) · "Talk to Us" pill right `[observed]`. |

Sticky at the top with `backdrop-filter: blur(var(--blur-glass))` over an `sf` 80% background. Height 64.

#### P2. Product hero
| Phone | Tablet | Laptop+ |
|---|---|---|
| Line motif → eyebrow → H1 (`display-product`, 36, centred, 2–3 lines) → lead (16, centred, ≤ 5 lines) → buttons **side by side** if both fit in 330px, otherwise stacked full-width, primary on top → product mockup. | Same order; H1 ~46; lead max 42rem; buttons side by side. | H1 52, max 56rem (2 lines); mockup 1200 wide. |
| **Mockup on phone:** don't shrink the full desktop UI. Show a **cropped, simplified view**: one panel (the task view), real text at ≥ 12px, tabs as a swipe row `[observed: Sarvam crops to the task panel with swipeable tabs]`. | Mockup at full container width, sidebar visible. | Full mockup: sidebar + task view. |

Background: `--gradient-haze` rising behind the lower half of the hero and the mockup (full-bleed).

#### P3. Section header
| Phone | Tablet | Laptop+ |
|---|---|---|
| Eyebrow → H2 → lead, stacked, **left-aligned**, max 4 lines of lead. | Chapter header: centred. Split header: H2 left, lead or CTA right, aligned to the bottom (`items-end`) `[verified]`. | Split: `grid-template-columns: 1.2fr 1fr`, gap 64 `[verified CSS]`. Chapter: centred, H2 max 18ch. |

#### P4. Feature rows (text + tinted visual)
| Phone | Tablet | Laptop+ |
|---|---|---|
| Each feature is one card. **Visual on top**, then title → body → CTA → checklist `[observed]`. Every row has the same order (no alternating). | Still **stacked** (visual on top, full width) so the product mock keeps ≥ 380px and stays readable; text under it. `[addition, from QA: side-by-side at 768 squeezed the mock to 187px]` | 5 / 7 split, the visual always on the right. Sarvam keeps the visual on the right `[observed]`; we keep it consistent rather than alternating. |

Tints in sequence: indigo → orange → green (`tokens.md` §2.4b). All feature rows share the same height and the same checklist length (3 items) (§5).

#### P5. Card grid (2 + 3 "building blocks")
| Phone | Tablet | Laptop+ |
|---|---|---|
| 1 column, 5 cards stacked, all the same height (same line counts). | **2 columns**: 2 + 2 + 1, with the last card spanning both columns in a horizontal layout (icon left, text right), so there's no orphan half-width card. **Never 3 text cards side by side below 1024**: at 768 they'd have only ~122px for text. | Sarvam's feature rail: 6-column grid, first 2 cards span 3, last 3 span 2 `[verified CSS]`. Rows aligned with subgrid. |

#### P6. Logo / app directory panel
| Phone | Tablet | Laptop+ |
|---|---|---|
| One white panel, radius 24 `[verified]`. Group label above, **2 apps per row** `[verified CSS <640]`. Padding 24. | Group label above, 4 per row `[verified CSS <1024]`. | Group label in a 144px left column, 4 apps per row, rows separated by 1px `st` `[verified CSS]`. |

#### P7. Split content + mockup card (e.g. "Skills")
| Phone | Tablet | Laptop+ |
|---|---|---|
| Text block, then sub-points, then the mockup card (full width). | Same, mockup max 560px, centred. | Text left (5 cols), mockup right (6 cols), vertically centred. |

#### P8. Timeline ("Runs while you sleep")
| Phone | Tablet | Laptop+ |
|---|---|---|
| **Vertical list**: mono time (eyebrow-mono) above each event title and description `[observed]`; a vertical line connects the dots. | 2 columns of events (768–1279). | **Horizontal from 1280**: 5 events on one line with a progress line and dots (`--ring-dot`) `[observed]`; all event titles 1 line, all descriptions 2 lines (§5). |

#### P9. Numbered steps (01 / 02 / 03)
| Phone | Tablet | Laptop+ |
|---|---|---|
| Stacked; 40px number circle on the left, text to its right, connecting line between circles `[observed]`. | 3 columns, number circle on top. | 3 columns, number circle (48px) on top `[verified md:w-12]`, connecting line across. Same title and description line counts. |

#### P10. Role / use-case cards ("Give each teammate a job")
| Phone | Tablet | Laptop+ |
|---|---|---|
| One bordered list with dividers `[observed]`, or a swipe row of equal cards (82% width + peek). | 2 columns. | 5 equal columns, or 3 + 2 with the same rule as P5. |

#### P11. Dark trust band ("Sovereign by default")
| Phone | Tablet | Laptop+ |
|---|---|---|
| `sr-indigo-950` panel, radius 24, inside the container. Title, then points separated by `st-dark` dividers `[observed]`. | Same, 2 columns of points. | Title left (4 cols), points in a 2×2 grid right (8 cols). Text uses `tx-inverse` / `tx-inverse-secondary`. |

#### P12. FAQ
| Phone | Tablet | Laptop+ |
|---|---|---|
| Accordion rows, question `item-title` 15→16, chevron right, min-height 44, answer 13–14 `[verified]`. | Same, max 720px. | Heading left (4 cols), accordion right (8 cols), or centred at max 720px. |

#### P13. Closing CTA card
| Phone | Tablet | Laptop+ |
|---|---|---|
| `--gradient-night` card, radius 24, inside the container. Centred display-2 headline (white), symbol, "Talk to Us". Height ≈ 420. | Same, height ≈ 380. | Same, height ≈ 460. Behind it, our **ring lattice**: a half rosette (5 + 7 circles, white 20%) centred on the bottom edge, growing up layer by layer on entry. `[addition: Sarvam enlarges its logomark here, which logo.md forbids us to copy]` |

#### P14. Footer
| Phone | Tablet | Laptop+ |
|---|---|---|
| Wordmark + "AI for all from India" → badges → socials → address card → link groups in a **2-column grid** of bordered boxes `[observed]`. | Brand column on top, link groups in 4 columns. | Brand column (left) + 5 link columns `[observed]`. |

---

### 7. Mobile rules `[addition]`, built on Sarvam's mobile strengths

Sarvam's mobile hierarchy, spacing and type sizes are kept exactly (`typography.md` §3).

#### 7.1 Touch
- Every tappable element has at least **44 × 44px** (`--tap-min`) `[verified: min-h-[44px] buttons]`.
- At least **8px** between adjacent tap targets.
- The primary CTA ("Talk to Us") is always reachable: in the nav, and repeated at the end of the hero and the closing card.

#### 7.2 Reading
- Minimum text size on mobile: **12px** for eyebrows, labels and mockup UI; **15px** for body.
- Lines ≤ 42 characters for body in cards, ≤ 50 in full-width paragraphs.
- When columns stack, the reading order follows the desktop **left-to-right, top-to-bottom** order, except the visual-first feature cards (P4).

#### 7.3 Hover has a tap equivalent
- Anything revealed on hover (card shadow, image zoom) is either always visible on touch, or not needed. Use `@media (hover: hover)` for hover-only effects `[verified: Sarvam does this]`.

#### 7.4 Swipe rows (the only allowed sideways scroll)
- Used for: hero mockup tabs, role cards (P10).
- Items are ≤ 82% of the viewport so the next one peeks (signals "swipe").
- `scroll-snap-type: x mandatory`, `scroll-padding-inline` = side margin, scrollbar hidden.
- All items in the row are equal size (§5).

#### 7.5 Viewport
- Use `100dvh`, not `100vh`, for full-height sections (mobile browser bars).
- Respect safe areas: `padding-bottom: env(safe-area-inset-bottom)` on fixed bars.
- No fixed element covers more than 15% of the screen height.

---

### 8. In-between widths and QA

#### 8.1 Between breakpoints
- **Type is fluid** (`typography.md`), so text never jumps.
- **Containers are percentages**, so margins grow smoothly.
- **Grids switch at breakpoints**, but standalone cards use **container queries**, so a card adapts to its own width rather than the viewport's. ⚠️ Never put `container-type` on a card that is a **subgrid** item: size containment collapses its height (found in QA). Use a viewport media query for those.
  ```css
  .card { container-type: inline-size; }
  @container (min-width: 420px) { .card--horizontal { grid-template-columns: 40px 1fr; } }
  ```
- Hard minimum: the layout must hold at **320px** with no overflow.

#### 8.2 Test matrix (run before calling any page done)
Widths: **320 · 375 · 414 · 600 · 768 · 900 · 1024 · 1280 · 1440 · 1920**

For each width, check:
1. No horizontal page scroll (`document.documentElement.scrollWidth === innerWidth`).
2. **Sibling parity:** in every sibling set, each title and description has the same rendered line count, and siblings sharing a row have equal heights. Automated: `node scripts/check-layout.mjs <url>`. Mark sets with `data-siblings`, items with `data-sibling`, and text slots with `data-line="title"` etc.
3. No text under its minimum size (§7.2).
4. Every tap target ≥ 44px (phone widths).
5. Alignment follows §4.
6. Screenshot at 375 / 768 / 1440 for the submission.

---

### Do / Don't

| Do | Don't |
|---|---|
| Start from the 375px layout | Design at 1440 and squeeze |
| Change the arrangement per tier (§6) | Just scale everything down |
| Make sibling cards equal in size, rows and line counts | Let one title wrap to 2 lines while the others take 1 |
| Write copy to the character budget | Fix uneven cards with random padding |
| Left-align multi-line text on phones | Centre a 5-line paragraph |
| Crop and simplify product mockups on phone | Show an unreadable miniature of the desktop UI |
| Use swipe rows with a visible peek | Hide content in sideways scroll with no hint |
| Use container queries for cards | Rely only on viewport breakpoints |

---

### Considered additions

1. **Column grid** (4 / 8 / 12, gutters 16 / 24 / 32). Sarvam uses percentage containers but no published grid.
2. **`--container-max` 1280px.** Sarvam's `max-w-width-mx` value isn't exposed in the CSS we captured.
3. **Alignment rules** (§4), resolving the centred/left mix on Sarvam's mobile page.
4. **Sibling consistency system** (§5): subgrid rows, `lh` min-heights, copy budgets. This is our main flair.
5. **Non-alternating feature rows** and no orphan cards at tablet (P4, P5).
6. **Mobile rules** (§7) and the **test matrix with an automated parity check** (§8).


---

<!-- components.md -->
## Components

The building blocks of Sarvam pages, as React components with exact anatomy, tokens, states and responsive behaviour. Implemented in `src/components/sarvam/` (`index.tsx` + `components.css`) and shown live at **`/components`**. Layout rules come from [`layout.md`](layout.md), type roles from [`typography.md`](typography.md), and values from [`tokens.css`](tokens.css).

**Source labels:** `[verified]` read from sarvam.ai markup or CSS · `[observed]` seen on sarvam.ai · `[addition]` our own rule.

---

### Rules for AI (read first)

1. **Use the components; don't restyle them.** Compose pages from the components below. If something is missing, build it from the same tokens and add it here.
2. **Quiet surfaces, generous space.** White or `sf` surfaces, 1px `st` borders, radius 16 (cards) or 24 (panels), and plenty of padding. Colour lives in gradient panels and accents, never in borders or text blocks.
3. **Line icons only** (§3). Never use filled, duotone or emoji icons.
4. **Every symbol is visible.** An icon or symbol must reach **≥ 3:1** against what it sits on. No same-tone icon on a same-tone tile (§3.2).
5. **Siblings are identical** (`layout.md` §5): mark sets with `data-siblings`, items with `data-sibling`, slots with `data-line`, and run `node scripts/check-layout.mjs <url>`.
6. **Gradients carry grain and sit behind content, never on it.** Use the surface classes (§2), never a hand-written gradient.
7. **Primary action = "Talk to Us"** for Indus Cowork (not generally available). One primary button per view; everything else is secondary or ghost.

---

### 0. Principle: clearer than sarvam.ai `[addition]`

Sarvam's components are the **brand reference, not the template**. We keep the DNA (tokens, type, surfaces, gateway, voice) and make every component calmer and clearer. Each block must have **one focal point, one accent and one action**.

| sarvam.ai today `[observed]` | Ours |
|---|---|
| Icons sometimes the same tone as their tile (2.6–3.0:1) | Same hue, accessible shade (≥ 5:1) |
| Sibling cards with uneven heights and line counts | Equal size, aligned rows, equal line counts, machine-checked |
| Section headers switch between centred and left on mobile | One alignment rule per role |
| Feature rows alternate sides | Visual always right; text always in the same place |
| White glass button on a light gradient end | Dark primary pill (readable) |
| Small text links in the mobile footer | 44px rows on touch screens |
| Cards stack icon + mono eyebrow + title + body + CTA + checklist | Card = icon, label, title, one sentence. Checklists only in feature rows |
| Several accents per section (indigo eyebrow, orange icon, green check) | One tone per block, repeated for every element inside it |

Applying the rule to new components: (1) list what's noisy or unclear in Sarvam's version, (2) remove until only the focal point, the supporting line and the action remain, (3) add space before adding decoration.

---

### 1. Spacing feel `[addition]`

A calm, Apple-like rhythm built on Sarvam's verified section spacing (96 / 176):

| Space | Phone | Tablet | Desktop |
|---|---|---|---|
| Between sections | 96 | 176 | 176 |
| Section header → content | 40 | 56 | 56 |
| Card padding | 24 | 32 | 32 |
| Feature-row text padding | 8 + 16 | 24 | 40 |
| Gap between cards | 32 | 40 | 48 |
| Inside a card: icon → eyebrow | 24 | 24 | 24 |
| Inside a card: eyebrow → title → body | 12 | 12 | 12 |

Rule of thumb: **if two elements are related, 12–16px; if they're different groups, 32px+; if they're different sections, 96px+.**

---

### 2. Surfaces `[verified]`

Recipes read from sarvam.ai markup. All of them are classes in `tokens.css`.

| Surface | Class / token | Recipe | Use |
|---|---|---|---|
| Page | `--color-sf` | `#fcfcfc` | Background |
| Card | `.sr-card` | white, `1px st`, radius 16 | Cards, lists |
| **Tint panel** | `.sr-tint-indigo / -orange / -green` | 135° tint gradient + grain | Behind product UI in feature rows (Indus Cowork) |
| **Mesh glow** | `.sr-mesh .sr-mesh--indigo / --sunset / --green / --marigold / --indigo-deep` | 3 layers: deep radial bottom-left → mid radial bottom → pale wash rising; white base; grain | Feature cards on the homepage (Sarvam's `cw-glow` triads) |
| Light card mesh | `--mesh-card-light` | indigo-200 wash from the top, indigo-100 pools at the bottom corners, indigo-50 → sf base | Highlighted card, quiet hero |
| Dark orb | `--mesh-orb-indigo`, `--mesh-orb-maroon` | radial deep-colour orb | Dark feature cards |
| Night | `.sr-gradient-night` | `#13121e → #a5bbfc 116.55%` + grain | Closing CTA card |
| Trust band | `--color-sr-indigo-950` | flat `#11115b` | "Sovereign by default" |
| Haze | `.sr-haze` | transparent → periwinkle | Product hero background |

**Grain:** Sarvam overlays a 64px noise tile with `mix-blend-mode: soft-light` at 50% opacity on gradients `[verified]`. We use our SVG noise token (`--texture-grain`, `overlay`), which looks equivalent and needs no image file.

**Inner shadows and bevels** `[verified]`:

| Token | Recipe | Use |
|---|---|---|
| `--shadow-button-inset` | `inset 0 1px 0 #fff6, inset 0 -2px 0 #0003` | Dark primary button bevel |
| `--shadow-button-light` | `inset 0 0 0 1px rgb(30 32 51 / .14)` | Light button / chip outline |
| `--shadow-glass` | `inset 0 1px 0 #fff9, inset 0 -1px 0 #ffffff2e, 0 6px 24px #0000001f` | Glass button or tile on dark |
| `--shadow-well` | `inset 0 1px 4px sr-grey-100` | Recessed note inside a mock card |
| `--shadow-inner-soft` | `inset 0 0 6px #00000014` | Panel edge |
| Coloured chip edge | `inset 0 -0.5px 1px <colour>-200` | Tinted chips |
| `.sr-spotlight` | 80px white 16% radial following the cursor | Dark cards (hover devices only) |

---

### 3. Icons

#### 3.1 Style `[verified]` + library `[addition]`
- **Line icons only.** sarvam.ai's UI icons are 24×24, `fill="none"`, `stroke="currentColor"`, mostly `stroke-width="1.5"` (114 icons sampled; the only filled SVGs are logos and social marks).
- **Library: Nucleo Core, outline, 24px. One library only, for everything.** Licensed (Nucleo Pro). Components live in `src/components/icons/nucleo/` (copied from the local Nucleo install, never imported from it). They are wrapped in `src/components/icons/index.tsx` with our defaults: **stroke 1.5, round caps and joins** (`corners="round"`).
- To add an icon: find it with the Nucleo MCP (`family: core, fill: outline, size: 24px`), copy the component into `icons/nucleo/`, and export it from `icons/index.tsx` under a semantic name. Never mix in icons from another set.
- Semantic mapping in use:
  - arrows (right, up, up-right), check, chevron-down
  - circle-dashed (pending), circle-check (done), spinner-loader (working)
  - menu-bars, globe, sparkle, magnifier, user, xmark, media-play, clock
  - chart-bar-trend-up, suitcase, heartbeat, inbox-arrow-down, megaphone, target
  - book-open, calendar-clock, books, plug, shield-check
- Sizes: 20px inside a 40px tile; 18px inline with 16px text; 22–24px for nav and controls. **Never scale the stroke**: keep 1.5 at every size.
- Checkmarks in lists use stroke 2 so they don't look faint next to body text.
- Colour: `currentColor` (or the `color` prop inside SVG art), inheriting from the text or tile.

#### 3.2 Contrast fix `[addition]`
Sarvam sometimes sets a symbol in the same tone as its background (e.g. an indigo-500 icon on an indigo-100 tile is 2.9:1). WCAG 1.4.11 asks for **≥ 3:1** for meaningful graphics. Our tiles keep the same hue but use the accessible shade:

| Tile | Background | Icon | Ratio |
|---|---|---|---|
| `indigo` | `sr-indigo-100` | `sr-indigo-800` | 7.3 |
| `orange` | `sr-orange-100` | `sr-orange-900` | 5.3 |
| `green` | `sr-green-100` | `sr-green-700` | 5.1 |
| `neutral` | `sf-tertiary` | `tx` | 14+ |
| `dark` | white 10% on dark | white | 15+ |

Never use: indigo-500 on indigo-100 (2.9), orange-800 on orange-100 (3.0), green-600 on green-100 (2.6), yellow-600 on yellow-100 (2.1).

---

### 4. Component reference

Each entry lists anatomy → tokens → states → behaviour per tier.

#### Button `<Button variant size display arrow>`
- **Anatomy:** pill · label · optional trailing arrow icon (18px).
- **Variants:**
  - `primary`: `--surface-button-dark` (`#3a3f5c → #1e2033`) + `--shadow-button-inset`, white text `[verified]`.
  - `secondary`: `--surface-button-light` (`#fff → #f0f1f5`) + `--shadow-button-light` `[verified]`.
  - `ghost`: text only.
  - `on-dark`: white 12% + `--shadow-glass` + blur. Use it only on the **dark** part of a surface.
- **Size:** `md` min-height 44 `[verified min-h-[44px]]`, padding 24; `lg` 52, padding 32. Font: text 500 16; `display` swaps to the display font for hero CTAs `[verified: homepage CTAs use Season Mix]`.
- **States:**
  - hover: primary lightens; secondary gains `shadow-ambient-sm`; the arrow nudges 2px.
  - press: `scale(.97)` at 150ms `[verified]`.
  - focus: 2px indigo-600 ring, offset 2.
  - disabled: 40% opacity `[verified]`.
- **Motion:** 350ms `cubic-bezier(.2,0,0,1)` `[verified]`.
- **Tiers:** phone: side by side if both fit in the container, otherwise stacked full-width with the primary first. The size never shrinks below `md`.

#### Chip `<Chip tone>`
Min-height 32, radius full, text 14. Neutral: white + light bevel. Tinted: 50 background, 800/900 text, coloured inset edge `[verified pattern]`. Used for tabs inside mockups, tags and statuses. Not tappable on its own; if one is, wrap it to 44px.

#### IconTile `<IconTile icon tone>`
40×40, radius 8, icon 20 at stroke 1.5. Tones per §3.2. Aligned to the top of its text block.

#### Eyebrow `<Eyebrow mono tone>`
- Text: General Sans 500 12, uppercase, 1.6px tracking, `tx-tertiary`.
- `mono`: DM Mono 12, uppercase, 0.13em tracking, tabular figures.
- `tone="accent"` (indigo) marks a product section; `tone="warm"` (`tx-accent`) is for a highlight section like "Skills" `[observed]`.

#### SectionHeader `<SectionHeader variant eyebrow title lead aside large>`
- `chapter`: eyebrow → H2 → lead. **Left-aligned on phone, centred from 768**, H2 max 20ch.
- `split`: H2 (often `large` = h2-lg) left; lead and/or CTA right in a `1.2fr / 1fr` grid aligned to the bottom from 768 `[verified CSS]`; stacked on phone.
- Bottom margin `--space-section-head`.

#### Card · CardGrid `<CardGrid cards columns name>`
- **Anatomy:** IconTile → mono eyebrow → h4 title (1 line) → body (2 lines) → optional foot.
- **Surface:** white, 1px `st`, radius 16, padding `--space-card`. Linked cards gain a `grey-400` border and `shadow-ambient-md` on hover.
- **Tiers:**
  - phone: 1 column, stacked.
  - tablet: 1 column of **horizontal** cards (icon left, text right).
  - ≥1024: 3 (or 2) columns using **subgrid**, so icon, eyebrow, title and body rows align across cards.
- **Copy budget:** titles ≤ 15 characters (1 line at every tier); bodies 54–58 characters (2 lines; 3 at 1024) `[measured]`.

#### MeshPanel + MockChecklist `<MeshPanel tone><MockChecklist …/></MeshPanel>`
- **Panel:** radius 24, tint gradient + grain + soft inner edge, padding 32/24 on phone and 48 from tablet, min-height 260 / 340.
- **Mock card:** white 92% with blur, radius 12, `shadow-ambient-lg` + hairline, padding 20, max width 360.
- **Mock rows:** 14px with an 18px stroke icon. Done = indigo check; active = empty circle; pending = grey.
- **Note well:** `--shadow-well`.
- **Rule:** the mock shows **real, readable product states** (text ≥ 12px), never lorem ipsum or blurry screenshots.

#### FeatureRow `<FeatureRow tone title body cta checklist visual>`
- **Anatomy:** white card (radius 24, padding 16) holding a tint panel + text block (h3 → body → CTA → 3-item checklist).
- **Tiers:**
  - phone: **panel on top**, text below `[observed]`.
  - tablet: still stacked (panel on top, full width) so the mock stays readable.
  - ≥1024: 5fr / 7fr.
  - The panel is **always on the right**: no alternating `[addition]`.
- **Sequence:** indigo → orange → green. Checklist icons use the tone's accessible shade.
- **Copy budget:** titles ≤ 22 characters (1 line); bodies about 61 characters, equal rendered width ±3% (2 lines at every tier); text slots capped at 36ch so line counts stay stable on wide screens `[measured]`.

#### Steps `<Steps steps>`
- Number circle: white with a 1px `st` border, mono, tabular figures. 40px on phone, 48px from 768 `[verified]`.
- phone: vertical, circle left, connecting line down.
- ≥768: 3 columns, circle on top, line across, subgrid rows.
- Titles 1 line; bodies 2 lines.

#### Timeline `<Timeline events>`
- Indigo dot with `--ring-dot`, mono time, item-title, small body.
- phone: vertical with a connecting line.
- 768–1279: 2 columns.
- ≥1280: one horizontal row of 5 with a line through the dots.
- Bodies about 52–56 characters, capped at 34ch (2 lines at every tier) `[measured]`.

#### TrustBand `<TrustBand title lead points>`
- `sr-indigo-950` panel `[verified]`, radius 24, inverse text (headings `tx-inverse`, body white 75% `[verified]`).
- Points separated by white-10% dividers.
- Points: 1 column on phone → 2 columns from 768; title column left from 1024 (4fr / 8fr).

#### Faq `<Faq items>`
Native `<details>`: works without JavaScript and is accessible. Each question row has a min-height of 44, item-title type and a chevron that rotates 180° (300ms, emphasized ease). The answer is body text with 40px right padding. The first item opens by default. Hairline dividers.

#### CtaCard `<CtaCard title cta>` (animated)
- Night gradient + grain, radius 24, centred.
- Display-2 white headline (max 14ch) in the dark top zone, a thin-stroke symbol in the middle, a **dark primary** pill at the bottom.
- White glass buttons are not allowed here: the bottom of the gradient is light (`#a5bbfc`), and white on it is about 1.9:1.
- **Ring lattice:** a half rosette of thin 20%-white circles (5 + 7) centred on the bottom edge, nudged slightly below it. When the card scrolls into view, the two layers grow up from the bottom (1.8s, out-quint, 220ms apart). The symbol (an 8-petal lotus from the Flower generator) unfurls from scale 0.3 and −180° with the blur clearing, and the headline and button rise 32px. All motion is off under reduced motion.
- Sarvam's version enlarges its logomark for this background. We built our own lattice because `logo.md` forbids cropping or recreating the logomark.
- Height 420 / 380 / 440.

#### Product mocks `<MockPlan />` `<MockResearch />` `<MockReview />`
Three distinct moments of a teammate's work, so feature panels never repeat the same card:
1. **Plan**: teammate header with a "Working" status, the task, a progress bar (2 of 4), and steps with states and mono times.
2. **Research**: a live query field (well shadow), the sources being read (favicon tile, title, mono domain, used/reading state), and a diff note ("2 new steps added to the plan").
3. **Review**: a draft with highlighted, footnoted claims, "Pass 3", checks, and an approval gate ("Waiting for your yes", Request changes / Approve).

Sizes: max width 380, text 13–14, mono 11. Each mock's accent follows its panel's tone (indigo → orange → green). Spinners stop under reduced motion.

#### FeatureBento `<FeatureBento items>`
A denser alternative to three FeatureRows: one wide tile (text + visual side by side) and two equal tiles below (subgrid rows). Phone: stacked. Same tones, same mocks.

#### TileCard `<TileCard svg title desc>`
A horizontal card: a **crisp glow tile** (64px on phone, 80px from 768; radius 16/20; inner top highlight + 1px hairline) beside a feature-title and one line. Stacked until 1280, then 3 across. Used for options like Sarvam Cloud / Private Cloud (VPC) / On-Premises `[verified copy, evened out to equal length]`.

#### GlowCard · FactCard
- **GlowCard:** a card whose header is a crisp glow shape on its tint (lavender / rose / leaf), then eyebrow, h4 and body. Header 16:10, **rendered at that aspect (never cropped)**; the shape fills 66% of the header height so siblings match; the header is inset 8px on three sides; text is inset 24px left, right and bottom.
- **FactCard:** one verified fact set large in light display type ("100+", "Your yes", "India"), with a label and one line. Never an invented number.

**Crisp, not blurry** `[addition, from review]`: glow shapes use a sharp 1.6px gradient rim, a 2.4px white inner highlight and only a faint 4px halo. The soft, heavily blurred version reads muddy at small sizes.

#### Nav `<Nav overlay links actions>` `[verified behaviour, sarvam.ai Navbar]`
- **Overlay mode** (any page with a hero): fixed and **transparent at the top**, so the hero glow shows through. After **8px** of scroll a **solid white** surface **fades in** (opacity only, 300ms standard ease, no movement); it fades out again only below **2px** (hysteresis, so no flicker). `[addition: Sarvam slides the surface down; we use opacity only, from review]` A hairline sits at the bottom, inset 6%.
- **Solid mode** (pages without a hero): always white.
- **Actions:** dark "Log In" + light "Contact Us" (Sarvam default), or a single action (e.g. "Talk to Us" on Indus Cowork). On phones only the last action shows, beside the menu button.
- **Layout:**
  - phone and tablet: wordmark · action · 44px menu button opening a full-screen sheet of 56px rows in the display font
  - ≥1024: wordmark · links (40px pills, grey hover) · actions
- **Height:** 64. Pages using overlay add `sr-under-nav` (64px offset) and usually a `<HeroGlow />` behind the top: a wide **horizon**, i.e. the Sun disc stretched horizontally so the orange arc spans most of the width, with the periwinkle halo to the edges (height 640; phone: 220vw × 1.1; ≥768: max(1500px, 125vw) × 1.35; fade to `sf` from 70%). **Use it only on the main hero of a page** (the system overview, the landing page hero), as a direct child of a full-width element, never inside `.sr-container` (it would start at the container edge). Inner pages and tools use the overlay nav over plain `sf`. Original Sun colours, no saturation changes.
- **QA:** `scripts/check-nav.mjs` checks transparent → solid → transparent at 0 / 400 / 0px.

#### Footer `<Footer>`
- Wordmark + "AI for all from India".
- Link columns: 2 on phone → 4 from 768, beside the brand column from 1024.
- Links are 44px tall on touch screens and 36 from 1024.
- Legal line + Bengaluru address `[verified]`.
- Faint grain over the flat surface (`--texture-grain` tile scaled to 360px for a coarser speck, 35% opacity, behind content). Ties the footer to the grained gradients above it. `[considered addition]`

#### Motif `<Motif>`
The official Sarvam line motif (`/brand/motif.svg`) sits above a hero eyebrow `[observed on /indus-cowork]`. Never recolour it into the spectrum.

---

#### Dashboards `<CoworkDashboard />` `<ScheduleDashboard />` (working)
Calm, information-dense product views that **work**. They sit on a tint stage (`.db-frame` + `sr-tint-*`), like Sarvam's hero mockup over its haze.
- **Cowork (teammates):** sidebar "Your teammates" (name, role, a status dot; a swipe row on phone) + one detail view (name + status, the task in display type, steps, the result table, approval, message box).
  - **Run now** walks the steps, then waits for your yes.
  - **Approve** updates the "need your yes" count.
  - **Messages** get a reply.
- **Schedule (today):** a quiet day timeline + one list (time, task, last result, status, a run icon, an on/off switch) + "Needs your yes" with approve/decline and the latest activity.
- **Status:** a small dot + plain text (indigo working, orange needs your yes, green done, grey scheduled). No colourful pills.
- **Rules:** no KPI-box walls, one accent, hairline separators instead of boxes. Fixed heights per breakpoint; the detail stage scrolls inside, so the page never moves. Text rows are single-line with ellipsis. Tap targets are 44px on touch screens.

#### EmblemArt · EmblemCard `<EmblemArt shape icon surface />`
Our richest illustration, built only from our assets (`imagery.md` §2.4):
1. **Ground:** a named Sarvam gradient at its real direction (tint-indigo 135°, tint-green, dawn, indigo glow, dusk), a gentle centre light and grain.
2. **Echo rings:** the emblem's own gateway, medallion or lotus outline repeated at 1.5 / 2.1 / 2.8 / 3.6×, each embossed (a soft glow, a light line, a darker groove 1px below) and fading outward.
3. **Emblem:** a frosted white body (97 → 74% white), a top-edge highlight, a tinted bottom inner shadow, two drop shadows (8px and 1.5px), an inner sheen, an inset frame line (our generator's frame), and a crisp gradient rim.
4. **Icon:** engraved. A white line 0.8px below, then the stroke icon in the surface's accessible shade.

Same emblem box (104 of 200) in every card, so siblings match. No decorative extras (e.g. no tiny diamond accents), from review.

### Do / Don't

| Do | Don't |
|---|---|
| Use one primary "Talk to Us" per view | Put two dark buttons side by side |
| Use line icons at 1.5 stroke | Use filled or duotone icons, or emoji |
| Use dark accessible shades for icons on tints | Put indigo-500 on indigo-100 |
| Put product UI on a tint panel inside a white mock card | Put text directly on a tint or mesh |
| Keep the visual on the right of feature rows | Alternate left/right (it breaks scanning on tablet) |
| Use 44px tap targets, including footer links on phones | Use 28px text links on touch screens |
| Use the night gradient with a dark CTA | Put a white glass button on the light end of a gradient |

---

### Considered additions

1. **Icon contrast rule** (§3.2), fixing same-tone symbols.
2. **Non-alternating feature rows**; tablet horizontal cards; no orphan cards.
3. **Copy budgets per component**, verified by `scripts/check-layout.mjs` at 10 widths.
4. **44px footer links on touch screens** (Sarvam's are smaller).
5. **Nucleo Core (outline, 24px) as the only icon library**, chosen to match Sarvam's 24/1.5 stroke style. Licensed Nucleo Pro; wrapped with our defaults.
6. **Spacing feel table** (§1): an explicit rhythm on top of the verified section spacing.


---

### 5. Motion `[addition, built on verified tokens]`

Library: **Motion** (`motion/react`). Tokens in `src/components/sarvam/motion.ts` mirror `tokens.css`, so CSS and JS motion feel identical.

| Token | Value | Use |
|---|---|---|
| `T.enter` | 500ms, out-quint | Items arriving |
| `T.state` | 300ms, emphasized | A state change (icon, label, colour) |
| `T.bar` | 700ms, out-quint | Progress and width changes |
| `T.exit` | 200ms, standard | Leaving |
| `rise` | opacity 0 → 1, y 8 → 0 | The only entrance motion |
| `STAGGER` | 60ms | Between siblings |

**Rules**
1. **Loops only, and only in product mocks** (Plan / Research / Review). Each loop is 6–9s and **rests ≥ 2s on the finished state**. Built with one hook, `useLoop(durations)`.
2. **Dashboards are calm:** no loops, only 200–300ms fades on state change. They respond to the user; they don't perform.
3. **Nothing changes size.** Every slot that will hold content exists from the start (skeleton → content in place). Labels that switch have fixed widths. Rows are single-line. Checked by `scripts/check-motion.mjs`, which samples each animated element's size every 250ms for 10s at 375 / 768 / 1440 and must see one value.
4. **Order:** things appear in reading order (top → bottom, left → right). Nothing arrives before what's above it.
5. **Off-screen loops pause** (`useInView`). **Reduced motion:** loops hold the finished frame; spinners, shimmers and pulses stop.
6. **Only transform and opacity animate.** Never animate width, height, top, margins, box-shadow, background-position or filters. Progress bars use `scaleX`. Shimmers are not used.
7. **Hover never repaints art.** Hover shadows live on a pre-rendered `::after` layer and only its opacity animates. Heavy SVG art (emblems, glow, gloss, grain) sits on its own compositor layer (`transform: translateZ(0)`) so its filters render once. Measured on /system with `scripts/check-hover.mjs`: raster work during hover went from 5,848ms to 161ms (−97%).
8. **Infinite loops run on wrappers, not SVGs.** Spinners rotate a `<span>` around the icon; pulses are opacity/scale on a pseudo-element. Off-screen sections use `content-visibility: auto` so their animations cost nothing.
9. **Performance QA:** `scripts/check-perf.mjs` (style/layout work per second while loops run) and `scripts/check-hover.mjs` (paint + raster during hover). Note: headless fps always reads 60, so measure the work, not the fps.


---

<!-- imagery.md -->
## Imagery

What goes into Sarvam visuals: gradients, gateway shapes, motifs, product UI and photography, and how to combine them. Surfaces and their tokens are in [`tokens.md`](tokens.md) §2 and [`components.md`](components.md) §2. Shapes are generated in **`/studio`** (code: `src/lib/shapes.ts`) and placed with `<GatewayFrame>`.

**Source labels:** `[verified]` from sarvam.ai / brand pages · `[observed]` seen across the 14 /brand images · `[addition]` our own rule.

---

### Rules for AI (read first)

1. **Pick one hero device per composition:** a gradient field, a gateway window, a product mockup, or a photograph. Never two.
2. **Gradients come from the named set** (dusk, dawn, indigo glow, sun, haze, tints, night). Always add grain. Never invent one.
3. **Gateways are windows, not decoration.** A gateway shape always contains something (a gradient, a tint, product UI, a photo) and is the largest shape on the canvas.
4. **Product UI is real and readable:** real Indus Cowork states, text ≥ 12px at the final size, white cards on tints.
5. **Ornaments are punctuation.** At most one motif or divider per composition, small, in a quiet colour.
6. **Every symbol reaches ≥ 3:1** against its background (dark ink on tints, white on deep gradients).
7. **Never recreate the Sarvam logomark.** No closed, lotus-like mark built from overlapping circles, and never a ring construction used as a symbol. The one allowed ring construction is the CTA **ring lattice**: a half rosette at ≤ 20% white, cropped by the card edge, purely as background texture.

---

### 1. The spectrum (gradient fields) `[verified + sampled]`

| Field | Mood | Typical use |
|---|---|---|
| Dusk | premium, launch | dark banner backgrounds; white headline in the top 38% |
| Dawn | energy, announcement | social banners; black text in the middle band |
| Indigo glow | product, calm | inside a gateway; feature moments |
| Sun | warm welcome | light hero top: only the lower arc visible |
| Haze | product page | behind the product mockup in the hero |
| Tints (indigo / orange / green) | feature | behind a white UI card |
| Night | closing | final CTA card |

Gradients are **vertical**: darker or more saturated at the top, lighter at the bottom, like a sky. The Sun hangs from the top edge. Always rendered with grain (`tokens.md` §2.6) and blended in OKLab (§2.5).

---

### 2. Gateways and medallions `[verified concept]` + `[addition: generator]`

The gateway is Sarvam's central idea: "a moment of transition, where two worlds move toward each other" `[verified, /brand]`. In the brand imagery it's a **cusped arch used as a window** onto photography, gradient or landscape (brand-img-03, 04, 06, 11, 14) `[observed]`.

#### 2.1 Shape families (generated in /studio)
| Family | Character | Use |
|---|---|---|
| **Gateway** (onion arch, domed door, mihrab, jharokha, lantern) | Vertical, an entrance | Main window on banners and the hero; product UI or a gradient inside |
| **Medallion** (ogee cross, quatrefoil, eight-point star, stepped star) | Symmetric, features on every side | Square formats, icon backdrops, pattern tiles |
| **Flower** (lotus, marigold, rosette, kamal) | Organic, petalled | Small accents, glow cards, section ornaments |

#### 2.2 Render styles
| Style | Look | Use |
|---|---|---|
| **Window** (`<GatewayFrame>`) | The shape clips a surface, image or UI | Hero visual, banner main visual |
| **Solid** | Flat silhouette, optional inset frame line cut out | Small marks on light surfaces, pattern tiles |
| **Line** | 1.5px outline (+ inset frame) | Quiet decoration on cards, dividers |
| **Glow** | Soft blurred rim + sheen + grain on a matching tint | Feature cards and social tiles: echoes the soft lotus forms in brand-img-07/08 |

#### 2.4 Emblems `[addition]`
A white emblem (any studio shape) on a named Sarvam gradient, surrounded by **echo rings** of its own outline. This is our take on the soft, layered symbol art in Sarvam's product visuals, built from our assets only. Rich in layers (frosted body, bevel, tinted inner shadow, inset frame, embossed rings, grain) but quiet in colour: one gradient, white, and the surface's own deep tone for the icon. Spec: `components.md` → EmblemArt.

#### 2.3 Rules
- **Frame line inset 3** (in a 100-unit shape) and 1.5px. White 80% on deep surfaces, `sr-indigo-950` on tints.
- **Proportions:** gateways 1.2–1.7 tall, medallions 1.0–1.2. Don't stretch a shape; regenerate it at the right aspect.
- **Size:** a gateway window is the largest element. On a banner it takes 45–70% of the height. On the web hero it sits inside the container (max 560px wide on desktop).
- **Contents:** gradient, tint + UI card, or photograph. Never text alone, and never the logo.
- **One window per composition.** Pattern tiles may repeat a shape, but only as a quiet background at ≤ 12% contrast.

---

### 3. Line motifs and dividers `[verified: motif.svg]` + `[addition: generator]`

- **Official motif:** `/brand/motif.svg`, a fine light-grey scroll used above the hero eyebrow on /indus-cowork `[observed]`. Use it as-is, never recoloured into the spectrum.
- **Generated motifs (/studio → Line motif):** radial petal patterns (lens, drop, heart, leaf). 1.5px stroke, `currentColor`.
- **Dividers (/studio → Divider):** six families (scroll fan, twin scroll, lotus rule, bead rule, gateway rule, vine). They use a 2px line, round caps and joins, soft teardrop petals: **soft and round, never sharp** `[addition, from review]`.
- **Placement:** above a headline (motif, 80–120px wide) or between two blocks (divider, ≤ 60% of the container width). Never behind text.
- **Colour:** `tx-tertiary` / `grey-400` on light; white 70–90% on deep gradients; `tx-accent` only for a single highlight.

---

### 4. Product UI (mockups) `[verified pattern]`

Sarvam shows **real product UI** rather than stock imagery (Indus Cowork teammate sidebar, task view, to-do lists, skill cards, schedules) `[verified, /indus-cowork]`.

- **Build mockups from components** (`MockChecklist`, chips, cards), not screenshots, so they stay sharp and on-token.
- **Content is real Indus Cowork language:** "Work the new inbound list before EOD and draft outreach.", "Completed in 3m 40s", "Ready to hand off for approval.", teammate roles (Sales Outbound, Paid Media, Chief of Staff…).
- **States:** done (indigo check), active (empty circle), pending (grey). Show progress, not an empty screen.
- **On phone:** crop to one panel with readable text (`layout.md` P2). Never shrink the full desktop UI.
- **On banners:** one card, ≤ 5 rows, ≥ 18px text at 1080px canvas width.

---

### 5. Photography `[observed]`

Brand photography is **cinematic, real Indian life and architecture**: a farmer in a field, dancers on a shore, carved arches at dusk, a monument with light glowing inside (brand-img-03, 04, 12, 13, 14).

- Natural light, muted and moody colour, shallow depth of field, people mid-motion, nothing staged.
- Frequently seen **through a gateway shape**.
- **Avoid:** stock-photo smiles, laptops and handshakes, neon "AI" visuals, robots, glowing brains, circuit boards, tricolour or region-specific clichés (`/brand`: "rooted in India without relying on nostalgia or symbolism for its own sake").
- **Sourcing:** use official Sarvam brand imagery, licensed photography, or AI-generated images that follow this prompt recipe (and say so in the write-up):

```
Cinematic photograph, real [subject: e.g. a textile weaver at a loom in Varanasi],
natural window light at golden hour, muted warm palette with deep indigo shadows,
shallow depth of field, candid moment, 35mm film grain, no text, no logos,
no futuristic or sci-fi elements, documentary style.
```

---

### 6. Composition recipes

| Composition | Layers (bottom → top) |
|---|---|
| **Launch banner** | Dusk field + grain → gateway window (indigo glow inside) → white display headline in the dark zone → wordmark |
| **Feature banner** | Sf background → tint panel → white UI card (product state) → headline on sf above → wordmark |
| **Statement tile** | Glow card (lavender / rose / leaf) → one display-2 line → nothing else |
| **Web hero** | Sf + haze (or Sun arc) → motif → eyebrow → H1 → lead → buttons → mockup |
| **Closing CTA** | Night card + grain → display-2 white → thin symbol → dark pill |

---

### Do / Don't

| Do | Don't |
|---|---|
| Use a gateway as a window onto something | Use a gateway as an empty outline frame for text |
| Use one hero device per composition | Stack a photo + gateway + gradient + motif |
| Use real, readable product states | Use lorem ipsum or blurry UI screenshots |
| Make dividers soft and round, quiet in colour | Use sharp, heavy, colourful ornaments |
| Use cinematic, candid Indian photography | Use stock "AI" imagery, robots or circuit brains |
| Use generated petal motifs and echo rings | Build a symbol from overlapping circles (too close to the logomark) |

---

### Considered additions

1. **Shape generator** (`/studio`): gateway, medallion and flower families; window/solid/line/glow renders; pattern tiling; dividers.
2. **Glow render style**, derived from the soft lotus forms in brand-img-07/08.
3. **Soft-divider rule** (2px, round caps, teardrop petals), from design review.
4. **AI photo prompt recipe** for when official photography isn't available.
5. **Contrast rule for symbols on surfaces** (dark ink on tints, white on deep gradients).


---

<!-- logo.md -->
## Logo

How to use the Sarvam wordmark and logomark. All rules are `[verified]` from sarvam.ai/brand-guidelines and its do/don't visuals (`references/brand/guidelines/`), except where marked `[addition]`.

**Files** (official only; never redraw):
- Wordmark black: `/brand/sarvam-wordmark-black.svg` (source: https://assets.sarvam.ai/assets/brand/logos/sarvam-wordmark-black.svg)
- Wordmark white: `/brand/sarvam-wordmark-white.svg`
- Logomark: https://assets.sarvam.ai/assets/brand/logos/sarvam-logo-black.svg

---

### Rules for AI (read first)

1. **Wordmark: black on light, white on dark.** Nothing else, ever.
2. **Never combine the wordmark and the logomark** in one lockup or one layout.
3. **Use the official SVG file** as an `<img>`. Never type "sarvam" in a font to imitate it.
4. **No effects:** no gradient, shadow, glow, outline, accent colour, rotation, stretch, or change of case or weight.
5. **Clear space = the wordmark's own "r"** on every side.
6. **Pages use the wordmark; banners use the wordmark by default.** The logomark is for places where the brand is already established (app icons, avatars, product UI). `[addition]` A social banner posted from Sarvam's own account is such a place, so a banner may carry the logomark **alone** (0.55× the wordmark height) on a calm milestone or statement post. Never with the wordmark, never in a partner lockup.

---

### 1. Wordmark

- Lowercase "sarvam", wide letterforms with refined curves. Use it "when the logomark alone is not sufficient".
- **Colour:** `#000000`-black file on light backgrounds (sf, white, tints, the light half of the haze); white file on dark backgrounds (sr-black, indigo-950, the dark zone of dusk, night).
- **On gradients:** place it in the zone with the strongest contrast (the dark top of dusk/night → white; the pale bottom of dawn → black). Never across a gradient transition.

#### Clear space `[verified diagram]`
The minimum clear space equals the width of the wordmark's "r" on the left and right, and the height of the "r" above and below. No text, image edge or shape may enter it.

#### Minimum size `[addition]`
| Medium | Minimum wordmark width |
|---|---|
| Web UI | 72px (nav uses 18px height ≈ 114px width) |
| Social banner (1080 wide) | 160px |
| LinkedIn banner (1200 wide) | 150px |
| Footer / small print | 96px |

#### Placement on banners `[addition]`
| Format | Position | Width |
|---|---|---|
| Meta 1080×1080 | Bottom-left or top-left, 72px from the edges | 180–200px |
| Meta 1080×1350 | Bottom-left, 72px from the edges | 200px |
| LinkedIn 1200×627 | Top-left or bottom-left, 56px from the edges | 150–170px |

The wordmark is a signature, not the headline: always smaller than the headline's cap height × 6.

---

### 2. Logomark

- Repeated circles in mandala construction forming a lotus, with a diamond centre.
- **Use it where the brand is already established:** product UI, app icons, social profile avatars. **Not on our banners or landing page alongside the wordmark.**
- Shown white on black, black on white, and white on indigo (`sr-indigo-800`) in product context.
- **Don't:**
  - recolour it or fill it with a gradient
  - put it on a low-contrast background
  - thin or thicken its strokes
  - crop or distort it
  - change its proportions
  - place it next to the wordmark

---

### 3. Misuse (from the official do/don't visuals)

**Wordmark, never:**
- (A) gradient fill or effects
- (B) accent colour (e.g. green)
- (C) rotated or warped
- (D) recased ("Sarvam")
- (E) stretched or condensed
- (F) weight changed
- (G) grey or low contrast
- (H) on a low-contrast box

**Logomark, never:**
- (A) recoloured or gradient
- (B) combined with the wordmark
- (C) on a low-contrast background
- (D) strokes thinned
- (E) strokes thickened
- (F) cropped or distorted

---

### 4. Co-branding

- **Partner lockup:** `sarvam · Partner` with a centred dot separator. The wordmark only, never the logomark. Match the visual weight of both logos; don't show them at very different sizes. Never over a busy image. Needs approval from Sarvam.
- **Government lockup:** a vertical stack of emblem and ministry name → "with" → Sarvam wordmark. Don't reorder; no logomark; no photographic background. Needs approval from Sarvam.
- **Third-party integrations:** "powered by Sarvam AI" / "built with Sarvam AI's speech-to-text API" (see `voice.md`).

---

### Do / Don't

| Do | Don't |
|---|---|
| Use the official SVG, black or white | Retype the wordmark in a font |
| Put white on the dark zone of a gradient | Put the wordmark on the gradient's middle transition |
| Keep "r" clear space on every side | Let the headline or gateway touch the wordmark |
| Use the wordmark on banners and pages | Use the logomark next to the wordmark |
| Use the logomark for avatars and app icons | Recolour the logomark into the spectrum |


---

<!-- voice.md -->
## Voice

How Sarvam sounds, and how to write copy for banners and pages. Built from sarvam.ai (/brand, /brand-guidelines, homepage, /indus-cowork). Line-length budgets come from `layout.md` §5.2 and `typography.md` §5.

**Source labels:** `[verified]` quoted or stated by Sarvam · `[observed]` a pattern across Sarvam's copy · `[addition]` our rule.

---

### Rules for AI (read first)

1. **Plain, calm, confident.** Short declaratives. No hype words (§4).
2. **Outcome over features.** Say what the person gets ("you hand off the outcome, not the steps") `[verified]`.
3. **Sentence case**, and full stops on headlines that are sentences ("It runs the whole task, start to finish.") `[verified]`.
4. **Exact names:** "Sarvam AI" on first mention, then "Sarvam"; "Indus Cowork"; "teammates"; "Indus Chat" `[verified]`.
5. **Only true claims** (§5). If a fact isn't in §5, don't state it.
6. **Fit the budget.** Every slot has a character limit; siblings match within ±4 characters.

---

### 1. Personality `[observed]`

| Sarvam is | So it sounds | Not |
|---|---|---|
| Grounded | Concrete verbs, real tasks ("Work the new inbound list before EOD") | Abstract ("unlock synergies") |
| Confident | Short statements, no hedging ("Nothing ships without your yes.") | Boastful ("the world's most powerful…") |
| Human-centred | People stay in control; AI is a colleague ("the way you would a colleague") | AI replacing people |
| Rooted in India | "AI for all from India", "Built for India" | Nostalgia, clichés, tricolour talk |
| Patient | Reflective lines on the brand side ("You don't rush a mandala.") | Urgent marketing ("Act now!") |

---

### 2. Headline patterns `[observed]`

| Pattern | Sarvam examples | Use for |
|---|---|---|
| **Claim, full stop** | "It runs the whole task, start to finish." · "Intelligence, built around you." | Section H2, feature banners |
| **Imperative / hire** | "Hire an AI teammate that finishes the work" · "Give each teammate a job" | Hero H1, CTA banners |
| **Two-beat contrast** | "Teach it once. Every teammate knows it." · "Not a handoff. A partnership." | Statement tiles, closing lines |
| **Plain place/time** | "Runs while you sleep" · "Plugs into the stack you already run on" | Feature sections |
| **Question** (brand) | "Who gets to be understood?" | Brand or statement banners only |
| **Invitation** | "Begin here" · "Ask Sarvam" · "Meet your first teammate." | Closing CTA |

**Feature titles** are short full sentences with a full stop: "Plans the work before it starts." "Researches on its own." `[verified]`

---

### 3. Calls to action

| Context | CTA |
|---|---|
| Indus Cowork (not generally available) | **"Talk to Us"** (primary) `[verified]` |
| Secondary | "See how it works" `[verified]` |
| Trust | "Explore the Trust Center" `[verified]` |
| Banner footnote | "sarvam.ai/indus-cowork" (URL as plain text) `[addition]` |

Never "Sign up free", "Try now", "Get started for free" or "Download": the product isn't generally available.

---

### 4. Words

**Use:** teammate, hand off, finish, plan, research, review, approve, your yes, connected apps, skills, knowledge base, sovereign, data stays in India, built on Sarvam's own models, Indian languages.

**Avoid:**
- revolutionary
- cutting-edge
- game-changing
- unleash
- supercharge
- seamless
- leverage
- synergy
- next-gen
- magic
- "AI-powered" as a headline
- exclamation marks
- emoji in headlines
- ALL CAPS (except eyebrows)

---

### 5. Indus Cowork fact sheet `[verified, sarvam.ai/indus-cowork, 2026-11-03]`

Use only these claims.

- An Indus Cowork **teammate** plans the work as a to-do list, connects to your apps, searches the web, and improves its own output until the job is done, then **returns the result for your approval**.
- Teammates live in **Slack** or **Indus Chat**; you message them like a colleague. They can also run **scheduled tasks**.
- Building blocks: **Skills** (including a skill-creator skill), **Teammates**, **Scheduled tasks**, **Knowledge base**, **Built-in research** (web search), **Connected apps**: **more than 100 connectors**.
- Control: **"Nothing ships without your yes."** Sending, merging and making changes wait for approval. Every task leaves a trail.
- Sovereignty: runs on **Sarvam's own models and infrastructure**, with **data residency in India for Indian deployments**.
- Security: **ISO 27001:2022** and **SOC 2 Type I** (this page says Type I; don't write Type II). Role-based access, SSO, audit logs, encryption at rest and in transit.
- Availability: **not generally available yet.** Access via "Talk to Us".
- Example roles: Sales Outbound, Talent Scout, Paid Media, Product Performance, Chief of Staff, Account Manager, Cluster Health Monitor.

**Company line:** Sarvam AI is an Indic language AI company. Mission (press): "make artificial intelligence accessible and useful for every Indian language speaker." Tagline: **"AI for all from India."**

**Don't invent** user numbers, customer names, speed claims, language counts (sources say 22 and 23 in different places, so avoid the number) or pricing.

---

### 6. Copy budgets per slot `[addition]`

| Slot | Max | Notes |
|---|---|---|
| Hero H1 (web) | 45 characters | 2 lines at desktop |
| Section H2 | 40 characters | |
| Feature title | 22 characters | 1 line at every tier |
| Card title | 15 characters | 1 line |
| Card description | 54–58 characters | 2 lines; siblings ±4 characters |
| Lead | 160 characters | ≤ 4 lines on phone |
| Banner headline | 8 words / 40 characters | ≤ 3 lines (Meta), ≤ 2 lines (LinkedIn) |
| Banner subhead | 70 characters | 1–2 lines |
| Eyebrow | 24 characters | uppercase via CSS, written in sentence case |

---

### 7. Formats

**Banner (Meta / LinkedIn):** eyebrow (product name) → headline (one idea) → optional subhead (one fact from §5) → CTA line or URL → wordmark. Example:

> INDUS COWORK
> **Hire a teammate that finishes the work.**
> Plans, researches and checks its own work, then waits for your yes.
> Talk to Us · sarvam.ai

**LinkedIn post caption** `[addition]`: 2–4 short lines, the first line restating the headline, one fact, one CTA. No hashtag walls (≤ 3).

**Web section:** eyebrow → H2 claim → one-sentence lead → components.

---

### Do / Don't

| Do | Don't |
|---|---|
| "Nothing ships without your yes." | "Fully autonomous AI that does everything for you!" |
| "Hire an AI teammate that finishes the work" | "Revolutionize your workflow with AI" |
| "Talk to Us" | "Sign up free" |
| "Data residency in India for Indian deployments" | "100% secure, unhackable" |
| "SOC 2 Type I" (as published on the Cowork page) | "SOC 2 Type II" |
| Sentence case, full stops on sentence headlines | Title Case Headlines, exclamation marks |


---

<!-- recipes/banner-builder.md -->
## Recipe · Banner builder (prompt-less)

Every Sarvam banner is a **composition of a few choices + at most two lines of text**. **Usual workflow:** give the AI a subject only; it makes the choices below, writes the spec into `banners/briefs.json`, runs QA and exports (`.claude/skills/sarvam-banner`). The builder is the same engine with a UI, for manual tweaks: pick the parts, the builder renders Meta (1080×1350) and LinkedIn (1200×627) at once, fits the type to each format, and exports exact PNGs.

- Live tool: **`/banners/make`** · Engine: `src/components/sarvam/composer.tsx` · Saved set: `banners/briefs.json` · Export: `node scripts/export-banners.mjs` · QA: `node scripts/check-banners.mjs situations|set`
- Text effects: `src/components/sarvam/StyledText.tsx` · Shapes: `/studio` (`src/lib/shapes.ts`)

---

### 0. Hard rules (non-negotiable; the engine and `check-banners.mjs` enforce them)

| # | Rule | Value |
|---|---|---|
| 1 | **Two formats only** | Meta **1080×1350** (4:5) · LinkedIn **1200×627** (1.91:1). The same banner is rearranged for each, never cropped |
| 2 | **Two text sections, max** | One primary (headline or number) + one optional supporting line. No eyebrows, pills, mono, CTAs or URLs on the art |
| 3 | **One hero device** | One shape (or one cluster). No stacked devices, no decorative extras |
| 4 | **Never stretch** | Uniform scale only. Medallions are 1:1; gateways change structure per format, never scale |
| 5 | **Padding** | ≥ 1.5 × margin of clear space on both sides (Meta 108px, LinkedIn 84px). Meta: the shape sits fully inside (≥ 72px top and bottom). LinkedIn may bleed off the top and bottom only |
| 6 | **Text lives inside the shape** | In the largest rectangle inside the shape's measured outline, inset from the glow |
| 7 | **Fixed type steps** | Headline = the largest of 100 / 86 / 74 / 64 / 55 / 48 % of the format base that fits (base Meta: sans 124, serif 132, number 270 · LinkedIn: sans 92, serif 100, number 170). Max 3 lines. Supporting line ≥ 28px Meta / 20px LinkedIn |
| 8 | **Sharp, not soft** | Every shape has a crisp edge. Inner glow blur ≤ 3.5% of the shape size. No white blobs, no cloud device. Mesh shapes (gloss device): a two-tone fill + an inner shadow in a contrasting hue + a soft centre light; **no drop shadows, no highlight blobs** |
| 12 | **One message per banner** | Every banner in a set says something different; facts only from `voice.md` §5 |
| 9 | **Logo** | Official files only. Wordmark 124px (Meta) / 96px (LinkedIn), **or** the logomark alone (height 0.55× that), never both. White on dark, black on light, or none. Partner lockups always use the wordmark |
| 10 | **Seamless grain** | One pre-generated noise image (`public/brand/grain.png`, 1200×1350, overlay), never a repeated tile and never a live SVG filter (too slow to repaint) |
| 11 | **QA** | `node scripts/check-banners.mjs situations` and `set` must PASS before export |

### 1. The spec

```json
{
  "background": "saffron-rose",     // one gradient (tokens.md §2, §2.9) or "plain"
  "device": "gateway-carved",       // the single hero device
  "shape": "Domed door",            // studio preset for gateway/medallion devices
  "treatment": "white",             // white | gold | indigo | ink
  "titleStyle": "sans",             // sans (bold launches/research) | serif (stories, programs, numbers)
  "mark": "inside",                 // inside | top | bottom | none. Always small (124px / 96px)
  "layout": "centered",             // centered (text inside the device) | split | stacked. Rearranges per format
  "partner": "Supernova",           // optional partner lockup: sarvam · PARTNER
  "card": "plan",                   // optional product moment inside the device (split / stacked)
  "primary": "Indus Cowork",        // the headline, or a number
  "primaryIsNumber": false,
  "secondary": "An AI teammate that finishes the work",   // optional, the ONLY other text
  "secondaryPlace": "below"         // above | below
}
```

### 2. Rules (enforced by the engine + QA)

1. **Two text sections, maximum:** one primary + one optional secondary. No eyebrows, pills, mono labels, CTAs or URLs on the art (put those in the post caption).
2. **Two headline styles** (from Sarvam's posts):
   - **sans:** General Sans 600, tight. For launches, product names and research titles ("Knowledge Fabric for Agents", "Sarvam 30B").
   - **serif:** Gambetta 400. For stories, programs, statements and numbers ("Champions Program", "$300 Million").
3. **Text treatments** (StyledText = gradient fill + inner shadow + top highlight + lift):
   - **white:** emboss on saturated grounds
   - **gold:** numbers and money
   - **indigo:** a two-tone deep → periwinkle, on light grounds
   - **ink:** on light grounds
4. **One device:**

   | Device | What it is | Best for |
   |---|---|---|
   | `medallion-glow` | **One** large text-holding shape (onion lantern, cusped window, quatrefoil, scalloped medallion, ogee cross), filled with a deeper tone of the ground and lit by a contrasting glow from its edge inward (Sarvam's Knowledge Fabric / DiarBench) | Launches, milestones, funding (default) |
   | `gateway-carved` | 4 nested filled gateway layers, cast shadows, crisp rims, lit doorway | Launches |
   | `medallion-carved` | 4 nested medallion layers, centred | Milestones |
   | `gateway-window` | 3 carved layers opening onto warm cream light | Funding, big announcements |
   | `gateway-echo` | 5 thin outline gateways rising from the bottom | Announcements |
      | `gloss` | Mirrored cluster of glossy studio shapes | Events, programs, community |
   | `emblem` | One frosted, bevelled medallion with **one Nucleo icon engraved** in it, echo rings on true offsets. Text sits beside it (split on LinkedIn, stacked on Meta). `icon`: shield, plug, check, calendar, search, globe, inbox, megaphone, target, chart, book, sparkle, person | A capability you can name as an object |
   | `arch-window` | The gateway as a **window onto the real product**: a recessed arch (Mihrab / Domed door) standing on the bottom edge, light inside, one frozen product mock (`card`) seen through it. Text beside it | A product moment you can see |
   | `script-mandala` | **"Sarvam" in nine Indian scripts**, set in rings around a glowing disc. Meta: the headline sits in the disc. LinkedIn: the logomark sits in the disc and the text sits left (the wordmark is dropped; never both) `[addition]` | India, languages, mission, sovereignty, people |
   | `plain` | Gradient only | Pure type statements |

5. **Logo (`logo`: `wordmark` | `logomark`):** the official files only, black or white by ground. Wordmark small (124px Meta, 96px LinkedIn); the logomark (the mandala "pattern logo") at 0.55× that height, for milestones and statements where the brand is already clear. Inside the device above the text, or top/bottom centre. Never both; partner lockups always use the wordmark.
6. **Geometry is never stretched.** Every shape (medallions, the cloud, gloss) keeps its true proportions in every format and only changes size. Gateways rebuild their arch per format through the generator (a structural parameter, not a scale). No `preserveAspectRatio="none"`, no non-uniform scale, anywhere. Carved rings are true offsets (each ring grows the shape by the same distance everywhere), spaced at 5% of the shape size.
7. **The text box is measured, not guessed:** the largest centred rectangle inside the shape's densely sampled outline (including long straight sides), inset from any glow band. If the type only fits small, the engine also tries taller boxes inside the same shape and keeps the one where the type sits largest. Type scales down until it fits that box in width and height; supporting lines have a legible floor (28px Meta, 20px LinkedIn); a headline never breaks into more than 3 lines.
8. **Grain is one seamless pre-generated image** (tiled grain shows seams when scaled; a live feTurbulence filter cost ~30 ms of raster per change in the builder).
9. **QA must pass:** no text outside the opening or the safe margin, no overlaps, ≤ 2 text sections.

#### Layouts (rearrange per format, never shrink)
| Layout | LinkedIn | Meta |
|---|---|---|
| `centered` | text inside the device | same |
| `split` | text left (left-aligned), device right 53% | becomes **stacked** |
| `stacked` | becomes **split** | text top 44%, device bottom 56% |

#### Slots (not text sections)
- **Partner lockup:** `sarvam · PARTNER` with the partner in bold caps at wordmark height (indigo on light, white on dark).
- **Product card:** a frozen product moment floating over the device in split/stacked layouts, ~62% of the device width.

### 3. Situations (starting presets; change any part)

| Situation | Background | Device | Treatment · style | Text |
|---|---|---|---|---|
| **launch** | saffron-rose | medallion-glow (onion lantern) | white · sans | Product name + one line |
| **announcement** | dusk | gateway-echo | white · serif | Statement + one line |
| **milestone** | night | medallion-glow (scalloped) | gold · serif | Number + label |
| **funding** | olive | medallion-glow (onion lantern) | gold · serif | "Announcing …" above + amount |
| **event** | spring | gloss | indigo · serif | Event name + date/line |
| **story** | lavender-dusk | medallion-glow (scalloped) | ink · serif | One sentence |
| **partnership** | lavender-dusk | medallion-glow (ogee cross) + partner lockup | ink · serif | One sentence |
| **program** | plain | gloss, split | ink · serif | Program name + one line |
| **feature** | lavender-dusk | medallion-glow, split + product card | indigo · serif | Claim + one line |

**Variations:** the builder shows 6 on-system alternatives for the current copy (different layouts, devices and grounds, contrast-safe). Click one to use it.

**Reference match** (`scripts/reference-match.mjs`, `process/screens/reference-match-r2.png`): four real Sarvam posts (Knowledge Fabric, Sarvam 30B, Supernova, Startup Program) rebuilt using only builder options, side by side with the originals. The gaps found in round 1 (scale too timid, a narrow landscape lantern, a thin carved stack, a tiny partner name) were fixed in the engine.

### 4. How to make a banner (for an AI agent or a person)

1. **From a subject:** choose the situation from what happened (launched, crossed a number, raised, hosting, a customer). Write the primary (≤ 6 words, or a number) and at most one secondary (≤ 60 characters) from `voice.md` §5 facts only.
2. **From a reference design:** identify its device, ground, headline style and text count, then map each to the nearest option above. If it needs something the builder lacks, add it to the engine (new device or shape preset) rather than hand-drawing one banner.
3. Set the spec in `/banners/make` (or write it into `banners/briefs.json`).
4. Check all three formats; run `node scripts/check-banners.mjs set`.
5. **Save & export** (or run `node scripts/export-banners.mjs <id>`). Review the PNGs at 100% and at phone size.
6. Log the brief, the choices and any changes in `process/prompt-log.md`.

### 5. From subject to banner: the method (the usual workflow)

Malay gives a **subject only**. The AI makes every decision below, in order. The banner should look like *this subject*, not like the last banner.

**Step 1 · Find the one idea.** Write one sentence: "What changes for the reader?" That sentence becomes the headline (≤ 6 words, or a number), and one supporting fact from `voice.md` §5 becomes the second line. If you can't write it, ask for the missing fact; never invent one.

**Step 2 · Name the idea type, and the part follows from it:**

| The idea is… | Part (device) | Why | Ground (mood) | Headline |
|---|---|---|---|---|
| A **name** being launched | `medallion-glow` (Onion lantern) | The name *is* the hero, lit from the edge | warm: saffron-rose, dawn | sans |
| A **number** (scale, milestone, funding) | `medallion-glow` (Scalloped) | The number *is* the object | deep: night, olive | serif number, gold |
| A **capability** you can name as one object (security, approvals, connectors, scheduling, research) | `emblem` + the icon for that object | An object is faster to read than a sentence | trust: indigo-glow, dusk, night | serif |
| A **product moment** you can see (plans, research, review) | `arch-window` + the matching mock | Show, don't claim; the gateway is the threshold into the product | dusk, indigo-glow | serif |
| **India, languages, mission, sovereignty** | `script-mandala` | Sarvam = wholeness: every script, one whole | olive, dusk, saffron-rose | serif |
| A **statement** or **where it's available** | `gateway-echo` | Thresholds opening outward | dusk | serif |
| **Community** (event, program, cohort) | `gloss` | Many shapes, one family | spring, plain | serif |
| A **partner** | `medallion-glow` + partner lockup | Two names, matched weight | lavender-dusk | serif |

**Step 3 · Vary within the set.** Across a set: different idea types where possible, no ground or shape used twice, and both headline styles appear. Before choosing, read `banners/briefs.json` so a new banner doesn't repeat the last one.

**Step 4 · Logo.** Wordmark by default. Use the logomark alone for calm milestones and statements, and the mandala centre on LinkedIn script-mandala banners.

**Step 5 · Render, QA, look.** Run `check-banners.mjs set`, export, then **look** at both PNGs at 100% and at phone size. On a QA fail, change the shape or shorten the supporting line; never shrink below the type steps.

**Step 6 · Log** the subject, the one-sentence idea, the idea type and the choices in `process/prompt-log.md`.

#### Worked examples
| Subject | Idea | Type → part | Result |
|---|---|---|---|
| "Indus Cowork has audit logs" | Every task leaves a trail | capability → `emblem` (shield), indigo-glow | `process/screens/banners-r7/` |
| "It plans before it acts" | It plans the work before it starts | product moment → `arch-window` (plan mock), dusk | same |
| "Sarvam's mission" | AI for all from India | mission → `script-mandala`, olive | same |

### 6. Our taste (personal flair, within the brand) `[addition]`

The assignment asks for some personal flair. Ours lives in **composition and craft, never in new colours or fonts**:

1. **One idea, one object.** Each banner says one thing and shows one thing. It's quieter than Sarvam's own posts: no stacked effects, no decorative extras.
2. **Script mandala.** The brand's meaning ("Sarvam" = wholeness, AI for every Indian language) made literal: the name in nine scripts, built like the mandala logomark. Transliterations must be checked by a native reader before publishing.
3. **Engraved emblems.** Product capabilities become crafted objects (frosted body, bevel, inset groove, engraved Nucleo line icon, echo rings on true offsets). The same material is used in the web components, so banners and page match.
4. **The gateway as a window onto the product.** Sarvam uses the arch as a mask for photography; we use it to frame the real Indus Cowork UI.
5. **Precision.** True-offset rings, measured text boxes, fixed type steps, sibling consistency. Nothing is stretched, and nothing is placed by eye.


---

<!-- recipes/meta-banner.md -->
## Recipe · Meta banner (Instagram / Facebook)

Format: **1080×1350** (portrait, 4:5) only. Export PNG at exactly this size. (Square was dropped so every Meta banner shares one grid.)
> **Use the builder:** compositions are now made with the prompt-less builder (`recipes/banner-builder.md`, `/banners/make`). This file keeps the per-format grid rules the builder follows.

Read first: `expressions.md` (pick one), `voice.md` §5–6 (facts, budgets), `logo.md` §1 (placement).

---

### 1. The grid (both formats)

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

### 2. Layouts (one per expression)

#### A · Campaign: "Nested gateways"
1. Background: one campaign gradient with grain (`.sr-gradient-saffron-rose`, `-dusk`, `-olive`, `-indigo-glow`).
2. Hero device: **5 nested Domed-door gateway outlines** rising from the bottom edge (widths 620 / 800 / 980 / 1160 / 1340, the first one filled white 7%), stroke white 55% → 15%, 1.6px.
3. Wordmark: white, top-centre.
4. Headline + sub: centred inside the innermost arch, starting 170px below its crown. White.
5. Nothing else.
Reference component: `CampaignBanner` (`src/components/sarvam/banners.tsx`).

#### B · Product: "Claim + product UI"
1. Background: `--color-sf`.
2. Wordmark: black, top-left (72, 72).
3. Eyebrow (product name) at y=196, headline below it, left-aligned, max 820 wide.
4. Hero device: a **tint panel** (`.sr-tint-indigo` / `-orange` / `-green`) from y=500 to the bottom margin, radius 40, holding **one real product mock** (MockPlan / MockResearch / MockReview) scaled ×1.6, centred.
Reference component: `ProductBanner`.

#### C · Community: "Soft cloud"
1. Background: `.sr-gradient-lavender-dusk`, `-spring` or `-meadow`.
2. Hero device: a **soft cloud** (`cloudSVG` of the Scalloped medallion, `--color-cloud`) centred, about 1200 wide.
3. Wordmark: black, top-centre. For partners: `sarvam · PARTNER` lockup at the same spot.
4. Headline (Season Mix 400, tracking −0.03em) + sub, centred on the cloud.
Reference component: `CommunityBanner`.

#### Square (1080×1080) adaptation, rearranged, not cropped
| Layout | Change from portrait |
|---|---|
| Campaign | Arch widths ×0.85; the headline moves up so its centre sits at y=600; sub ≤ 1 line |
| Product | Headline max 2 lines; the panel starts at y=440; mock scale ×1.35 |
| Community | Cloud ~1000 wide, centred at y=560; the headline stays centred |

---

### 3. Steps (for an AI tool)

1. Pick the **expression** from the content type (`expressions.md` §1).
2. Write copy to budget: headline ≤ 8 words / 40 characters; sub ≤ 70 characters; facts only from `voice.md` §5.
3. Build the composition at real pixel size on the grid above, using tokens and components only.
4. Check: wordmark official file + clear space; text contrast (`tokens.md` §1.6); one hero device; grain on the gradient.
5. Export with `node scripts/export-banners.mjs` (Playwright, exact size, deviceScaleFactor 1).
6. Open the PNG at 100% and at phone size (~375 wide). The headline must read at both.

### Don't
- Put more than one headline or more than one hero device on a banner.
- Put text on the transition band of a gradient.
- Shrink a desktop page section into a banner.
- Use "Sign up", "Try free" or invented numbers.


---

<!-- recipes/linkedin-banner.md -->
## Recipe · LinkedIn banner (single image post)

Format: **1200×627** (≈1.91:1). Export PNG at exactly this size.
> **Use the builder:** compositions are now made with the prompt-less builder (`recipes/banner-builder.md`, `/banners/make`). This file keeps the per-format grid rules the builder follows.

Read first: `expressions.md`, `voice.md` §5–6, `logo.md` §1, and `meta-banner.md` (same layouts, rearranged for landscape).

---

### 1. The grid

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

### 2. Layouts (landscape versions of the three expressions)

#### A · Campaign: "Nested gateways, centred"
- Campaign gradient + grain; 5 nested gateway outlines rising from the bottom, centred (widths 420 → 1100).
- White wordmark top-centre; centred 1–2 line headline inside the innermost arch; optional 1-line sub.

#### B · Product: "Split: claim left, product right"
- `sf` background. Wordmark top-left. Eyebrow + headline + sub in cols 1–6, vertically centred.
- Cols 7–12: a tint panel (inset 32 from the right/top/bottom edges, radius 28) holding one product mock at ×1.15.

#### C · Community: "Split or cloud"
- **Cloud variant:** soft gradient, a wide soft cloud centred, headline centred on it.
- **Gloss variant:** wordmark top-left, headline left (cols 1–6), and a cluster of 2–4 **gloss** shapes (studio → gloss render) in cols 7–12, overlapping slightly, largest at the back. One shape family per banner.

---

### 3. Steps
1. Same copy as the Meta version of the campaign; the headline may shorten to fit 2 lines.
2. Rebuild on the landscape grid (rearrange, don't crop the Meta art).
3. Check legibility at 360px wide (mobile feed) and 1200px.
4. Export with `scripts/export-banners.mjs`.

### Don't
- Centre a long 3-line headline on a landscape canvas: switch to the split layout.
- Put text in the right half when the hero device is there.
- Let the wordmark exceed 180px wide.


---

<!-- recipes/landing-page.md -->
## Recipe · Indus Cowork landing page

One complete, responsive product page, hero → footer, built only from `src/components/sarvam` and tokens. Expression: **Product**, with one **Campaign** moment (the closing CTA) and one **Community** moment (the testimonial / proof band).
Exports: **375 / 768 / 1440**. It must also hold at every width in between (QA at 10 widths).

---

### 1. Section order

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

### 2. Responsive behaviour per section (rearrange, not shrink)

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

### 3. Quality gates (all must pass before export)
1. `node scripts/check-layout.mjs http://localhost:3000/`: no overflow, sibling parity, 44px tap targets at 10 widths.
2. `node scripts/check-motion.mjs http://localhost:3000/`: no element changes size while animating; dashboards work.
3. `node scripts/check-nav.mjs http://localhost:3000/`: transparent → solid → transparent.
4. `node scripts/check-perf.mjs http://localhost:3000/`: idle loops cause no layout per second outside mocks.
5. Copy: every claim is in `voice.md` §5; CTA is "Talk to Us".
6. Manual: check on a real phone (Malay).

### 4. Export
`node scripts/export-page.mjs` → full-page PNGs at 375 / 768 / 1440 in `/exports/page/`.
