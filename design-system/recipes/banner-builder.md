# Recipe · Banner builder (prompt-less)

Every Sarvam banner is a **composition of a few choices + at most two lines of text**. **Usual workflow:** give the AI a subject only; it makes the choices below, writes the spec into `banners/briefs.json`, runs QA and exports (`.claude/skills/sarvam-banner`). The builder is the same engine with a UI, for manual tweaks: pick the parts, the builder renders Meta (1080×1350) and LinkedIn (1200×627) at once, fits the type to each format, and exports exact PNGs.

- Live tool: **`/banners/make`** · Engine: `src/components/sarvam/composer.tsx` · Saved set: `banners/briefs.json` · Export: `node scripts/export-banners.mjs` · QA: `node scripts/check-banners.mjs situations|set`
- Text effects: `src/components/sarvam/StyledText.tsx` · Shapes: `/studio` (`src/lib/shapes.ts`)

---

## 0. Hard rules (non-negotiable; the engine and `check-banners.mjs` enforce them)

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

## 1. The spec

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

## 2. Rules (enforced by the engine + QA)

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
   | `spectrum` | **Our taste** `[addition]`: a calm off-white canvas, one thin hard-edged strip of the brand spectrum (indigo → orange) near the bottom, and a **rosette** in the top-right corner, cropped by the corner. It is built the way Sarvam's logomark is built: **one element repeated around a centre** `rosette`: **circles** (default: 12 equal circles through one centre, the logomark's construction), **lens** (12 vesica petals, a lotus; `rosetteSolid: true` fills each petal with a gradient from a pale tint of its hue at the centre to the full hue at the tip, with a 2.5px canvas-coloured edge between petals), **orbits** (6 equal ellipses turned by 30°), **rings** (6 concentric circles, the hue stepping outward), **lobes** (12 rounded petals). Every copy is the same line (4.5px Meta, 3.5px LinkedIn), and each one takes a hue of the spectrum by its direction: indigo toward the canvas, orange toward the corner. Text is set left and low (`editorial` layout). | Model launches and announcements that should feel calm and precise |
   | `emblem` | One frosted, bevelled medallion with **one Nucleo icon engraved** in it, echo rings on true offsets. Text sits beside it (split on LinkedIn, stacked on Meta). `icon`: shield, plug, check, calendar, search, globe, inbox, megaphone, target, chart, book, sparkle, person | A capability you can name as an object |
   | `arch-window` | The gateway as a **window onto the real product**: a recessed arch (Mihrab / Domed door) standing on the bottom edge, light inside, one frozen product mock (`card`) seen through it. Text beside it | A product moment you can see |
   | `script-mandala` | **"Sarvam" in nine Indian scripts**, set in rings around a glowing disc. Meta: the headline sits in the disc. LinkedIn: the logomark sits in the disc and the text sits left (the wordmark is dropped; never both) `[addition]` | India, languages, mission, sovereignty, people |
   | `plain` | Gradient only | Pure type statements |

5. **Logo (`logo`: `wordmark` | `logomark`):** the official files only, black or white by ground. Wordmark small (124px Meta, 96px LinkedIn); the logomark (the mandala "pattern logo") at 0.55× that height, for milestones and statements where the brand is already clear. Inside the device above the text, or top/bottom centre. Never both; partner lockups always use the wordmark.
6. **Geometry is never stretched.** Every shape (medallions, the cloud, gloss) keeps its true proportions in every format and only changes size. Gateways rebuild their arch per format through the generator (a structural parameter, not a scale). No `preserveAspectRatio="none"`, no non-uniform scale, anywhere. Carved rings are true offsets (each ring grows the shape by the same distance everywhere), spaced at 5% of the shape size.
7. **The text box is measured, not guessed:** the largest centred rectangle inside the shape's densely sampled outline (including long straight sides), inset from any glow band. If the type only fits small, the engine also tries taller boxes inside the same shape and keeps the one where the type sits largest. Type scales down until it fits that box in width and height; supporting lines have a legible floor (28px Meta, 20px LinkedIn); a headline never breaks into more than 3 lines.
8. **Grain is one seamless pre-generated image** (tiled grain shows seams when scaled; a live feTurbulence filter cost ~30 ms of raster per change in the builder).
9. **QA must pass:** no text outside the opening or the safe margin, no overlaps, ≤ 2 text sections.

### Layouts (rearrange per format, never shrink)
| Layout | LinkedIn | Meta |
|---|---|---|
| `centered` | text inside the device | same |
| `editorial` | one left column (≥ 1.5·M from the sides) anchored low, wordmark top-left aligned to the column, type base ×1.3 | same |
| `split` | text left (left-aligned), device right 53% | becomes **stacked** |
| `stacked` | becomes **split** | text top 44%, device bottom 56% |

### Slots (not text sections)
- **Partner lockup:** `sarvam · PARTNER` with the partner in bold caps at wordmark height (indigo on light, white on dark).
- **Product card:** a frozen product moment floating over the device in split/stacked layouts, ~62% of the device width.

## 3. Situations (starting presets; change any part)

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
| **capability** | indigo-glow | emblem (+ icon) | white · serif | Claim + one fact |
| **product** | dusk | arch-window (+ product mock) | white · serif | What it does + one line |
| **mission** | olive | script-mandala | white · serif | One line |

**Variations:** the builder shows 6 on-system alternatives for the current copy (different layouts, devices and grounds, contrast-safe). Click one to use it.

**Reference match** (`scripts/reference-match.mjs`, `process/screens/reference-match-r2.png`): four real Sarvam posts (Knowledge Fabric, Sarvam 30B, Supernova, Startup Program) rebuilt using only builder options, side by side with the originals. The gaps found in round 1 (scale too timid, a narrow landscape lantern, a thin carved stack, a tiny partner name) were fixed in the engine.

## 4. How to make a banner (for an AI agent or a person)

1. **From a subject:** choose the situation from what happened (launched, crossed a number, raised, hosting, a customer). Write the primary (≤ 6 words, or a number) and at most one secondary (≤ 60 characters) from `voice.md` §5 facts only.
2. **From a reference design:** identify its device, ground, headline style and text count, then map each to the nearest option above. If it needs something the builder lacks, add it to the engine (new device or shape preset) rather than hand-drawing one banner.
3. Set the spec in `/banners/make` (or write it into `banners/briefs.json`).
4. Check all three formats; run `node scripts/check-banners.mjs set`.
5. **Save & export** (or run `node scripts/export-banners.mjs <id>`). Review the PNGs at 100% and at phone size.
6. Log the brief, the choices and any changes in `process/prompt-log.md`.

## 5. From subject to banner: the method (the usual workflow)

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

### Worked examples
| Subject | Idea | Type → part | Result |
|---|---|---|---|
| "Indus Cowork has audit logs" | Every task leaves a trail | capability → `emblem` (shield), indigo-glow | `process/screens/banners-r7/` |
| "It plans before it acts" | It plans the work before it starts | product moment → `arch-window` (plan mock), dusk | same |
| "Sarvam's mission" | AI for all from India | mission → `script-mandala`, olive | same |

## 6. Our taste (personal flair, within the brand) `[addition]`

The assignment asks for some personal flair. Ours lives in **composition and craft, never in new colours or fonts**:

1. **One idea, one object.** Each banner says one thing and shows one thing. It's quieter than Sarvam's own posts: no stacked effects, no decorative extras.
2. **Script mandala.** The brand's meaning ("Sarvam" = wholeness, AI for every Indian language) made literal: the name in nine scripts, built like the mandala logomark. Transliterations must be checked by a native reader before publishing.
3. **Engraved emblems.** Product capabilities become crafted objects (frosted body, bevel, inset groove, engraved Nucleo line icon, echo rings on true offsets). The same material is used in the web components, so banners and page match.
4. **The gateway as a window onto the product.** Sarvam uses the arch as a mask for photography; we use it to frame the real Indus Cowork UI.
5. **Precision.** True-offset rings, measured text boxes, fixed type steps, sibling consistency. Nothing is stretched, and nothing is placed by eye.

**Pattern rule (learned the hard way):** build ornaments from **one identical element repeated by rotation**, as the logomark is. Don't use offsets of a complex shape: their corners round differently ring by ring, and the set looks inconsistent.
