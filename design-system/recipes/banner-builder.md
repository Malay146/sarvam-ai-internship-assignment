# Recipe · Banner builder (prompt-less)

Every Sarvam banner is a **composition of five choices + at most two lines of text**. No prompt writing: pick the parts, the builder renders Meta portrait (1080×1350), Meta square (1080×1080) and LinkedIn (1200×627) at once, fits the type to each format, and exports exact PNGs.

- Live tool: **`/banners/make`** · Engine: `src/components/sarvam/composer.tsx` · Saved set: `banners/briefs.json` · Export: `node scripts/export-banners.mjs` · QA: `node scripts/check-banners.mjs situations|set`
- Text effects: `src/components/sarvam/StyledText.tsx` · Shapes: `/studio` (`src/lib/shapes.ts`)

---

## 1. The spec

```json
{
  "background": "saffron-rose",     // one gradient (tokens.md §2, §2.9) or "plain"
  "device": "gateway-carved",       // the single hero device
  "shape": "Domed door",            // studio preset for gateway/medallion devices
  "treatment": "white",             // white | gold | indigo | ink
  "titleStyle": "sans",             // sans (bold launches/research) | serif (stories, programs, numbers)
  "mark": "inside",                 // inside the device | top | bottom. Always small (124px / 96px)
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
   | `cloud` | Soft scalloped glow | Stories, quotes |
   | `gloss` | Mirrored cluster of glossy studio shapes | Events, programs, community |
   | `plain` | Gradient only | Pure type statements |

5. **Wordmark:** the official file, small (124px on Meta, 96px on LinkedIn), black or white by ground. Inside the device above the text, or top/bottom centre. Never the logomark.
6. **Geometry is never stretched.** Shapes scale uniformly; their proportions are a design parameter set per format (taller on portrait, square on square, wide or cropped on landscape). Carved rings are true offsets (each ring grows the shape by the same distance everywhere), spaced at 5% of the shape size.
7. **The text box is measured, not guessed:** the largest centred rectangle inside the shape's densely sampled outline (including long straight sides), inset from any glow band. Type scales down until it fits that box in width and height; supporting lines have a legible floor (28px Meta, 20px LinkedIn).
8. **Grain is one seamless generated layer** per banner (tiled grain shows seams when scaled).
9. **QA must pass:** no text outside the opening or the safe margin, no overlaps, ≤ 2 text sections.

## 3. Situations (starting presets; change any part)

| Situation | Background | Device | Treatment · style | Text |
|---|---|---|---|---|
| **launch** | saffron-rose | medallion-glow (onion lantern) | white · sans | Product name + one line |
| **announcement** | dusk | gateway-echo | white · serif | Statement + one line |
| **milestone** | night | medallion-glow (scalloped) | gold · serif | Number + label |
| **funding** | olive | medallion-glow (onion lantern) | gold · serif | "Announcing …" above + amount |
| **event** | spring | gloss | indigo · serif | Event name + date/line |
| **story** | lavender-dusk | cloud | ink · serif | One sentence |

## 4. How to make a banner (for an AI agent or a person)

1. **From a subject:** choose the situation from what happened (launched, crossed a number, raised, hosting, a customer). Write the primary (≤ 6 words, or a number) and at most one secondary (≤ 60 characters) from `voice.md` §5 facts only.
2. **From a reference design:** identify its device, ground, headline style and text count, then map each to the nearest option above. If it needs something the builder lacks, add it to the engine (new device or shape preset) rather than hand-drawing one banner.
3. Set the spec in `/banners/make` (or write it into `banners/briefs.json`).
4. Check all three formats; run `node scripts/check-banners.mjs set`.
5. **Save & export** (or run `node scripts/export-banners.mjs <id>`). Review the PNGs at 100% and at phone size.
6. Log the brief, the choices and any changes in `process/prompt-log.md`.
