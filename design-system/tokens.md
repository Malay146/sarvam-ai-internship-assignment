# Tokens

The base layer of the Sarvam design system. Every colour, gradient, space, radius, shadow and motion value used in a banner or page must come from this file. The machine-readable mirror is [`tokens.css`](tokens.css). Token names match those on sarvam.ai, so `--color-sr-indigo-800` here is the same value as on the live site.

**Source labels**
- `[verified]`: read directly from sarvam.ai CSS or brand pages.
- `[sampled]`: colour-picked from an official Sarvam image, so it's approximate.
- `[addition]`: our own rule, added where Sarvam publishes nothing. These are listed under "Considered additions" at the end.

---

## Rules for AI (read first)

1. **Use tokens only.** Never write a raw hex, px or ms value that isn't in this file. If a value you need is missing, choose the nearest token. Never invent a new one.
2. **Blue and orange are the brand.** Indigo (`sr-indigo`) and orange (`sr-orange`) are the core pair. Every composition must show both, through a gradient or through two separate elements.
3. **Gradients are continuous, not blocks.** Use the four named gradients in §2. Never place flat blue and flat orange side by side as hard-edged blocks.
4. **Neutrals carry most of the surface.** Near-white (`sf`) and near-black (`sr-black`) backgrounds hold content. Gradients are moments: a hero, a banner field, a glow behind a gateway shape.
5. **Secondary ramps are accents only.** Green, pink, yellow and red appear only as small state or product markers. They never form a background or a gradient with blue/orange.
6. **Check contrast.** Use only the pairs in §1.6 for text.

---

## 1. Colour

### 1.1 Core ramps [verified]

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

### 1.2 Neutrals [verified]

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

### 1.3 Semantic tokens [verified]

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

### 1.4 Secondary ramps (accents only) [verified]

These come from Indian craft colours: textile pink, marigold, kumkum red, leaf green (brand-img-05). Use the **500** step for a dot, tag, icon or illustration fill. Use **50/100** for a tinted chip background.

| Ramp | 50 | 100 | 500 | 900 |
|---|---|---|---|---|
| Yellow (marigold) | `#fff8e6` | `#fff0cf` | `#feb12b` | `#6b4c1c` |
| Pink (textile) | `#fceaf0` | `#f9d5e1` | `#b12060` | `#611c35` |
| Red (kumkum) | `#fde7e2` | `#f8d1c6` | `#b81514` | `#52170e` |
| Green (leaf) | `#f2f8eb` | `#e3f1d8` | `#83c040` | `#263d0e` |

Full 50–950 values are in `tokens.css`.

**Status mapping** `[addition]`: success = green-500, warning = yellow-500, error = red-500, info = indigo-600.

### 1.5 Colour proportions [addition]

Approximate share of any composition, matching how sarvam.ai and /brand imagery are balanced:

- **~70% neutral**: `sf` / white, or `sr-black` on dark compositions
- **~25% spectrum**: one gradient field or glow
- **≤5% solid accent**: an indigo-800 or orange-800 element, or a secondary-ramp dot

### 1.6 Approved text pairs (WCAG 2.1)

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

## 2. Gradients `[sampled]`

The blue-to-orange spectrum is Sarvam's "foundational language". It works through continuous transitions in light and tone, never fixed colour blocks. Each gradient below was sampled from an official Sarvam image. All four contain both a blue and an orange family.

### 2.1 Dusk: dark night to warm horizon
Source: brand-img-01 (logomark on gradient).
```css
/* 20 stops, densely sampled so there are no visible bands. Exact value in tokens.css. */
--gradient-dusk: #181a1c 0% → #202f50 25% → #2c4476 35% → #6079b0 50% → #a5b4dc 65% → #d5bab2 80% → #f89536 100%
```
- **Use for:** dark, premium, launch moments. Banner backgrounds, dark hero.
- **Text:** white. Body text only in the top 38%; display text can extend to 50%. Put the headline in the dark zone.
- **Logo:** white wordmark in the dark zone, or white logomark at centre.

### 2.2 Dawn: warm sky to pale morning
Source: brand-img-10, sarvam.ai og image.
```css
/* 20 stops, densely sampled so there are no visible bands. Exact value in tokens.css. */
--gradient-dawn: #aa490d 0% → #d45f0c 25% → #f67b17 40% → #fc9230 50% → #ecb983 70% → #cecedf 85% → #e7efff 100%
```
- **Use for:** energetic, announcement, social. Banners, closing CTA band.
- **Text:** `sr-black` across the middle and bottom. White only for display ≥ 48px on the top 25%.
- **Logo:** white wordmark on the orange top (Sarvam's own og image), or black wordmark on the pale bottom.

### 2.3 Indigo glow: brand blue melting into peach
Source: brand-img-06 ("AI for all, from India" inside a gateway).
```css
/* 20 stops, densely sampled so there are no visible bands. Exact value in tokens.css. */
--gradient-indigo-glow: #3838ce 0% → #554dc9 25% → #8a79ca 50% → #bca0c4 65% → #e2b6b7 75% → #f6c0ac 100%
```
- **Use for:** product and feature moments. Fill inside a gateway shape, feature cards, the Indus Cowork hero.
- **Text:** white. Body text only in the top 38% (6.2:1); display text can extend to 50% (4.1:1, large only).

### 2.4 Sun: radial glow (homepage hero)
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

### 2.4b Product-page gradients `[sampled, sarvam.ai/indus-cowork]`
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

### 2.4c Page lights: one hero light per page `[addition]`
Every product page owns one light, so pages read as different places in the same system (landing-page.md rule 9). It is a radial from the top edge, colour and alpha eased over ≥ 16 stops (no ring), with grain. Colours stack **top → bottom**, never side by side.

| Page | Light | Stops (centre → edge) |
|---|---|---|
| Homepage | **Sun** (§2.4) | `#f9730c` → `#ed8c44` → `#bfc9f1` → `#e8effd` → transparent |
| Indus Cowork | **Indigo glow** | `#5957c4` → `#8a7fd2` → `#c2abcc` → `#fabea3` → transparent |
| Bulbul V4 Flash | **Garden sunrise** | `#5fae8c` → `#94cc86` → `#cfdc84` → `#f4d474` → `#fbe1b4` → `#fdf0de` → transparent (Sarvam's green and yellow craft ramps) |
| Document AI | **Seal ink** | `#cf5f5a` → `#e3847a` → `#f0a99c` → `#f6c9b9` → `#f9e2d3` → `#fcf1e6` → transparent (Sarvam's red and pink ramps; an official seal, an editor's red pen) |

Tokens: `--light-sun` (= `--gradient-sun`), `--light-indigo-glow`, `--light-garden-sunrise` in `tokens.css` (sRGB first, OKLab inside `@supports`). Pages apply them as `background-image: var(--texture-grain), var(--light-x)` on `.sr-hero-glow__sun`; never paste the stops into page CSS. A new page picks a light no other page uses, built from the named ramps, and adds it here as a `--light-*` token. Only the lower part of the disc is visible (the centre sits above the frame), so the visible colour is the outer stops: marigold and cream for Bulbul.

### 2.5 Blend space: OKLab `[addition]`
All gradients interpolate **in OKLab** (`linear-gradient(in oklab 180deg, …)`). With sRGB, the default, blue meeting orange turns slightly grey and muddy. OKLab keeps brightness even and passes through the soft lavender and peach seen in Sarvam's images.
- Not OKLCH: it blends around the hue wheel, so blue-to-orange picks up extra saturated pink and a harder band. That's off-brand. Comparison: `process/screens/interp-compare.png`.
- `tokens.css` declares the sRGB values first and overrides them with OKLab inside `@supports`, so older browsers still get a correct gradient.
- When writing a gradient by hand outside the tokens, always add `in oklab`.

### 2.6 Grain (always on) `[sampled pattern]`
Sarvam's gradient imagery carries a fine film grain (look closely at brand-img-01 and 06). Grain also stops the visible horizontal lines (banding) that smooth CSS gradients show on 8-bit screens and in PNG exports.

- Token: `--texture-grain` (an SVG fractal-noise tile, 240px, blended with `overlay`).
- **Never use a raw `--gradient-*` on its own.** Use the ready-made classes in `tokens.css`, which layer grain over the gradient:
  `.sr-gradient-dusk`, `.sr-gradient-dawn`, `.sr-gradient-indigo-glow`, `.sr-gradient-sun`.
- `.sr-gradient-sun` also masks its edge, so grain never lands on the page around the glow.
- Outside these classes, use this layering: `background-image: var(--texture-grain), var(--gradient-x); background-size: var(--texture-grain-size), 100% 100%; background-blend-mode: overlay, normal;`

### 2.7 Gradient rules
- **Direction:** vertical (180deg) for linear gradients. Dark or saturated at top, light at bottom, like a sky. The radial Sun hangs from the top edge. `[observed across all official samples]`
- **One gradient per composition.** Never stack two named gradients.
- **Never put a gradient on text or the logo.** Gradients are backgrounds, fills inside shapes, or glows.
- **Don't add stops.** Don't recolour. You may crop or stretch a gradient, or move the 50% point by ±10% to fit a format.
- **Accent glow** `[verified pattern]`: a single blurred blob (`sr-orange-800` or `sr-indigo-400`, `blur(80px)`, opacity 0.4–0.7) behind a card or section is allowed on `sf` surfaces.

---

### 2.8 More surfaces (see `components.md` §2)
Mesh glow (5 colour triads), light card mesh, dark orbs, button surfaces, glass, well and bevel shadows, and the cursor spotlight are tokens/classes in `tokens.css`, documented with their use in `components.md` §2. Campaign gradients for social banners: §2.9.

### 2.9 Campaign gradients `[sampled, Sarvam social posts]`
Sarvam's social feed uses a wider palette than the website: earthy and floral, but always smooth, vertical and grainy. Each one is sampled from a real post (`references/social/`). They are used in the **Campaign** and **Community** expressions (`expressions.md`), never on the website UI.

| Token / class | Ramp (top → bottom) | Seen in | Mood |
|---|---|---|---|
| `--gradient-olive` | gold `#c2a12d` → olive `#5b7828` → deep olive `#486523` | Knowledge Fabric for Agents | research, depth |
| `--gradient-meadow` | leaf `#8fbf6f` → sage `#aed1a7` → periwinkle `#b0c6ef` | Indic DiarBench | datasets, open research |
| `--gradient-saffron-rose` | saffron `#f1c480` → rose `#c4706e` → magenta `#a13060` | Sarvam 30B | model launches |
| `--gradient-lavender-dusk` | cream `#f1f4e9` → lavender `#c6bdd3` → violet `#5957c4` | Supernova customer story | stories, partnerships |
| `--gradient-spring` | cream `#f2f6e8` → pistachio `#d9dfb3` → leaf `#98c659` | Equal customer story | stories, growth |
| `--color-cloud` | `#f7efed` warm white | soft-cloud glow | **retired for banners** (the cloud device was removed: soft white blobs); kept for web glows only |

Rules:
- One campaign gradient per banner. Grain always. OKLab blending (§2.5).
- Text sits in the gradient's calm zone or inside a hero shape. Dark text on the pale ends; white only on olive, saffron-rose (middle down) and the violet end of lavender-dusk.
- Blue and orange together remains the **website** rule. Campaign art may use one family when the subject calls for it, because Sarvam's own posts do.

## 3. Spacing

### 3.1 Base scale [verified]
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

### 3.2 Responsive spacing tokens

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

## 4. Radius [verified]

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

## 5. Borders [verified]

- Default border: `1px solid var(--color-st)`.
- Subtle border (image frames, dividers): `1px solid var(--color-st-secondary)`.
- Hover: border goes from `st-secondary` to `st`.
- Inset focus/selected ring: `inset 0 0 0 2px var(--color-sr-indigo-200)`.
- Focus outline: `2px solid var(--color-focus)`, offset 2px.

## 6. Shadows [verified]

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

## 7. Blur [verified]

| Token | Value | Use |
|---|---|---|
| `--blur-glow` | 80px | accent glows behind sections |
| `--blur-glow-lg` | 100px | hero glow |
| `--blur-glass` | 24px (`backdrop-blur-xl`) | sticky nav, overlays on imagery |

## 8. Motion [verified]

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

## Do / Don't

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

## Considered additions

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
