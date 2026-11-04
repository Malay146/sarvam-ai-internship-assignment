# Imagery

What goes into Sarvam visuals: gradients, gateway shapes, motifs, product UI and photography, and how to combine them. Surfaces and their tokens are in [`tokens.md`](tokens.md) §2 and [`components.md`](components.md) §2. Shapes are generated in **`/studio`** (code: `src/lib/shapes.ts`) and placed with `<GatewayFrame>`.

**Source labels:** `[verified]` from sarvam.ai / brand pages · `[observed]` seen across the 14 /brand images · `[addition]` our own rule.

---

## Rules for AI (read first)

1. **Pick one hero device per composition:** a gradient field, a gateway window, a product mockup, or a photograph. Never two.
2. **Gradients come from the named set** (dusk, dawn, indigo glow, sun, haze, tints, night, and the page lights in tokens.md §2.4c). Always add grain. Never invent one. Multi-colour gradients stack **vertically** (top → bottom for a hero or sky, bottom → top for panels and the footer), never side by side.
3. **Gateways are windows, not decoration.** A gateway shape always contains something (a gradient, a tint, product UI, a photo) and is the largest shape on the canvas.
4. **Product UI is real and readable:** real Indus Cowork states, text ≥ 12px at the final size, white cards on tints.
5. **Ornaments are punctuation.** At most one motif or divider per composition, small, in a quiet colour.
6. **Every symbol reaches ≥ 3:1** against its background (dark ink on tints, white on deep gradients).
7. **Never recreate the Sarvam logomark.** No closed, lotus-like mark built from overlapping circles, and never a ring construction used as a symbol. The one allowed ring construction is the CTA **ring lattice**: a half rosette at ≤ 20% white, cropped by the card edge, purely as background texture.

---

## 1. The spectrum (gradient fields) `[verified + sampled]`

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

## 2. Gateways and medallions `[verified concept]` + `[addition: generator]`

The gateway is Sarvam's central idea: "a moment of transition, where two worlds move toward each other" `[verified, /brand]`. In the brand imagery it's a **cusped arch used as a window** onto photography, gradient or landscape (brand-img-03, 04, 06, 11, 14) `[observed]`.

### 2.1 Shape families (generated in /studio)
| Family | Character | Use |
|---|---|---|
| **Gateway** (onion arch, domed door, mihrab, jharokha, lantern) | Vertical, an entrance | Main window on banners and the hero; product UI or a gradient inside |
| **Medallion** (ogee cross, quatrefoil, eight-point star, stepped star) | Symmetric, features on every side | Square formats, icon backdrops, pattern tiles |
| **Flower** (lotus, marigold, rosette, kamal) | Organic, petalled | Small accents, glow cards, section ornaments |

### 2.2 Render styles
| Style | Look | Use |
|---|---|---|
| **Window** (`<GatewayFrame>`) | The shape clips a surface, image or UI | Hero visual, banner main visual |
| **Solid** | Flat silhouette, optional inset frame line cut out | Small marks on light surfaces, pattern tiles |
| **Line** | 1.5px outline (+ inset frame) | Quiet decoration on cards, dividers |
| **Glow** | Soft blurred rim + sheen + grain on a matching tint | Feature cards and social tiles: echoes the soft lotus forms in brand-img-07/08 |

### 2.4 Emblems `[addition]`
A white emblem (any studio shape) on a named Sarvam gradient, surrounded by **echo rings** of its own outline. This is our take on the soft, layered symbol art in Sarvam's product visuals, built from our assets only. Rich in layers (frosted body, bevel, tinted inner shadow, inset frame, embossed rings, grain) but quiet in colour: one gradient, white, and the surface's own deep tone for the icon. Spec: `components.md` → EmblemArt.

### 2.3 Rules
- **Frame line inset 3** (in a 100-unit shape) and 1.5px. White 80% on deep surfaces, `sr-indigo-950` on tints.
- **Proportions:** gateways 1.2–1.7 tall, medallions 1.0–1.2. Don't stretch a shape; regenerate it at the right aspect.
- **Size:** a gateway window is the largest element. On a banner it takes 45–70% of the height. On the web hero it sits inside the container (max 560px wide on desktop).
- **Contents:** gradient, tint + UI card, or photograph. Never text alone, and never the logo.
- **One window per composition.** Pattern tiles may repeat a shape, but only as a quiet background at ≤ 12% contrast.

---

## 3. Line motifs and dividers `[verified: motif.svg]` + `[addition: generator]`

- **Official motif:** `/brand/motif.svg`, a fine light-grey scroll used above the hero eyebrow on /indus-cowork `[observed]`. Use it as-is, never recoloured into the spectrum.
- **Generated motifs (/studio → Line motif):** radial petal patterns (lens, drop, heart, leaf). 1.5px stroke, `currentColor`.
- **Dividers (/studio → Divider):** six families (scroll fan, twin scroll, lotus rule, bead rule, gateway rule, vine). They use a 2px line, round caps and joins, soft teardrop petals: **soft and round, never sharp** `[addition, from review]`.
- **Placement:** above a headline (motif, 80–120px wide) or between two blocks (divider, ≤ 60% of the container width). Never behind text.
- **Colour:** `tx-tertiary` / `grey-400` on light; white 70–90% on deep gradients; `tx-accent` only for a single highlight.

---

## 4. Product UI (mockups) `[verified pattern]`

Sarvam shows **real product UI** rather than stock imagery (Indus Cowork teammate sidebar, task view, to-do lists, skill cards, schedules) `[verified, /indus-cowork]`.

- **Build mockups from components** (`MockChecklist`, chips, cards), not screenshots, so they stay sharp and on-token.
- **Content is real Indus Cowork language:** "Work the new inbound list before EOD and draft outreach.", "Completed in 3m 40s", "Ready to hand off for approval.", teammate roles (Sales Outbound, Paid Media, Chief of Staff…).
- **States:** done (indigo check), active (empty circle), pending (grey). Show progress, not an empty screen.
- **On phone:** crop to one panel with readable text (`layout.md` P2). Never shrink the full desktop UI.
- **On banners:** one card, ≤ 5 rows, ≥ 18px text at 1080px canvas width.

---

## 5. Photography `[observed]`

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

## 6. Composition recipes

| Composition | Layers (bottom → top) |
|---|---|
| **Launch banner** | Dusk field + grain → gateway window (indigo glow inside) → white display headline in the dark zone → wordmark |
| **Feature banner** | Sf background → tint panel → white UI card (product state) → headline on sf above → wordmark |
| **Statement tile** | Glow card (lavender / rose / leaf) → one display-2 line → nothing else |
| **Web hero** | Sf + haze (or Sun arc) → motif → eyebrow → H1 → lead → buttons → mockup |
| **Closing CTA** | Night card + grain → display-2 white → thin symbol → dark pill |

---

## Do / Don't

| Do | Don't |
|---|---|
| Use a gateway as a window onto something | Use a gateway as an empty outline frame for text |
| Use one hero device per composition | Stack a photo + gateway + gradient + motif |
| Use real, readable product states | Use lorem ipsum or blurry UI screenshots |
| Make dividers soft and round, quiet in colour | Use sharp, heavy, colourful ornaments |
| Use cinematic, candid Indian photography | Use stock "AI" imagery, robots or circuit brains |
| Use generated petal motifs and echo rings | Build a symbol from overlapping circles (too close to the logomark) |

---

## Considered additions

1. **Shape generator** (`/studio`): gateway, medallion and flower families; window/solid/line/glow renders; pattern tiling; dividers.
2. **Glow render style**, derived from the soft lotus forms in brand-img-07/08.
3. **Soft-divider rule** (2px, round caps, teardrop petals), from design review.
4. **AI photo prompt recipe** for when official photography isn't available.
5. **Contrast rule for symbols on surfaces** (dark ink on tints, white on deep gradients).
