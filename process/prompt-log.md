# Prompt log

Every meaningful generation or prompt, logged as it happens. The write-up (`process/writeup.md`) is built from this file.

Entry format:

```
## YYYY-MM-DD — <short title>
- Tool:
- Goal:
- Prompt (verbatim):
- Output:
- What changed and why:
- Screens: process/screens/<file>
```

---

## 2026-11-03 — Subject chosen
- Decision: Indus Cowork is the single subject for all 6 banners and the landing page.
- Why: newest flagship, real product UI available for mockups, richest story; keeps consistency across formats visible.

## 2026-11-03 — Brand research: /brand, /brand-guidelines, site CSS
- Tool: Claude Code (curl + Python/PIL for extraction and colour sampling)
- Goal: capture verified brand data before writing any system files.
- Prompt (verbatim): "go over sarvam this pages, /brand and /brand-guidelines, and get the appropriate data and use it and update it"
- Output: `references/brand-findings.md`, plus official logos, loaders, motif, 14 brand images and 10 guideline visuals in `references/brand/`, and CSS tokens in `references/brand-css/tokens-raw.txt`.
- What changed and why: the brand gradient isn't a CSS token (it's raster), so its stops were sampled from the official images and labelled [sampled]. Imagery patterns (the gateway used as a mask, cinematic photography, light Season Mix headlines) came from studying the 14 /brand images and are labelled [observed].

## 2026-11-03 — tokens.md + tokens.css
- Tool: Claude Code (Python to generate tokens.css from the raw CSS dump; Playwright to render a preview)
- Prompt (verbatim): "go and do the tokens.md."
- Output: `design-system/tokens.md` (colour ramps, semantic roles, 4 named gradients, spacing, radius, borders, shadows, blur, motion, contrast pairs, do/don't, considered additions) and `design-system/tokens.css`.
- Test: rendered `process/screens/tokens-preview.html` comparing our CSS gradients side by side with the official Sarvam images. See `process/screens/tokens-preview.png`.
- What didn't work at first, and what changed:
  1. The Sun gradient was first written as a soft glow rising from the bottom. The preview showed it was wrong: the official image is a solid orange disc with a thin periwinkle halo. The homepage markup places it *above* the hero (`top: -110%`), so it hangs from the top. Stops were tightened (orange solid to 72%) and the origin moved to the top.
  2. Section spacing was first an invented 64/96/128. The homepage markup gave the real values (`gap-24 md:gap-44` = 96/176px, hero `pt-36 md:pt-40`), so the tokens were switched to those and marked [verified].
  3. Contrast check: white on orange-800 is only 3.4:1, and white on the Sun core is 2.8:1. Added an approved text-pairs table so AI never puts white body text on orange.

## 2026-11-03 — Visual token review page (/system)
- Tool: Claude Code + Playwright screenshots
- Prompt (verbatim): "what I need to review, but where are the images? I need to see visually so create something on the page so I would know that."
- Output: `src/app/system/page.tsx` + `system.css`, a living style guide that reads `design-system/tokens.css` at render time. It shows gradients next to their official sources, the colour ramps, semantic roles, contrast pairs, spacing (with live responsive bars), radius, shadows and motion.
- Screens: `process/screens/system-tokens-375.png`, `-768.png`, `-1440.png`
- What didn't work at first, and what changed:
  1. CSS modules rendered unstyled. The project's `next.config.ts` Turbopack rule (`*.css` → `as: "*.css"`) strips the `.module` semantics. Switched to a plain stylesheet with `sys-` prefixed classes rather than changing the config.
  2. The hero Sun first covered the title (text on the orange core breaks our own contrast rule), then sat too high. Settled on `translate(-50%, -68%)`, so only the lower arc and halo show above the title, matching sarvam.ai.

## 2026-11-03 — Gradient banding + Sun blend fix
- Tool: Claude Code (Python/PIL resampling, Playwright 2× screenshots)
- Prompt (verbatim): "I think only the gradient sun is not good. All the other things, I feel like, are perfect. What we can do in the gradient sun is just try to make it blend even better. In all our gradients I can see horizontal lines, which are not there in Sarvam, so fix that. The blending is not proper in our gradients."
- Diagnosis: (1) only 8 stops per gradient, so each stop made a visible "kink" line; (2) smooth 8-bit gradients band; (3) Sarvam's originals hide banding with film grain.
- Changes: re-sampled every gradient at 21 points, averaging a strip of pixels (median) and lightly smoothing; dropped stops where text or shapes in the source image interfered. Added a `--texture-grain` SVG noise token and `.sr-gradient-*` utility classes that always layer the grain. The Sun is now a true circle (`circle farthest-side at 50% 0%`) using the measured radial profile, with the orange-to-periwinkle blend stretched about 1.5× for a softer edge, and masked so grain stays inside the glow.
- Result: no visible lines at 2×; the gradients match the official images side by side. Screens: process/screens/system-tokens-*.png (re-exported).

## 2026-11-03 — Gradient blend space: OKLab
- Prompt (verbatim): "are you using hex or oklch for gradient, i feel like oklch is better?" then "ok then use oklab"
- Test: rendered all four gradients in sRGB, OKLab and OKLCH side by side (`process/screens/interp-compare.png`). sRGB went grey and muddy where blue met orange. OKLCH added hue-wheel saturation and a harder band in Dawn. OKLab was the smoothest.
- Change: `tokens.css` keeps the sRGB values as a fallback and overrides them with `in oklab` inside `@supports`. tokens.md §2.5 documents the rule and why OKLCH was rejected.

## 2026-11-03 — Free font substitutes for Matter and Matter Mono
- Prompt (verbatim): "i think for for seson mix will go with gambetta, but still finding for matter and mono, suggest me some which are closed"
- Decision so far: Season Mix → **Gambetta** (Fontshare, free), chosen by Malay.
- Method: rendered a reference sample using Sarvam's own Matter / Matter Mono, live on sarvam.ai (for local comparison only, nothing downloaded or redistributed), then the same sample in 11 free sans and 8 free mono candidates.
- Screens: `process/screens/font-compare-matter.png`, `process/screens/font-compare-mono.png`
- Shortlist: Matter → General Sans, Plus Jakarta Sans, Manrope. Matter Mono → DM Mono, Geist Mono.

## 2026-11-03 — typography.md + font loading
- Prompt (verbatim): "ok then general sans, dm mono and gambetta"
- Tool: Claude Code + Playwright
- Inputs: real Sarvam type values pulled from homepage markup (H1 Season Mix 44→64 / lh 1.05, H2 Season Mix 500 28→36 / lh 1.2, feature title Matter 500 18→21, body 15→16 / 155–165%, meta 13, eyebrow 12 / 2px, primary buttons in Season Mix 500 16px, mono labels in Matter Semi Mono 12 uppercase).
- Calibration test: rendered the same headlines and body in Sarvam's fonts (live on sarvam.ai) next to Gambetta / General Sans / DM Mono (`process/screens/font-calibration.png`). Gambetta came out ~5% wider than Season Mix, so display tracking was tightened from -0.025em to -0.04em and heading tracking from -0.02em to -0.03em. Swap-back values are documented.
- Output: `design-system/typography.md` (rules for AI, families + licence note, weights, a fluid web scale with 375/768/1024 values, breakpoint behaviour, banner type scale, Devanagari fallback, do/don't, additions); typography tokens in `tokens.css`; fonts loaded in `src/app/layout.tsx`; Tailwind theme mapped to the tokens in `globals.css`; a Typography section on /system.
- Issue avoided: naming our tokens `--font-sans` / `--font-mono` would have clashed with Tailwind v4's own theme variables, so they're `--font-text` / `--font-code`.

## 2026-11-03 — Typography QA: measured calibration
- Prompt (verbatim): "is tracking, spacing, leading, everything, etc, perfect."
- Honest answer: not yet. Measured each role's rendered width, cap height and x-height in Sarvam's fonts vs ours (Playwright on sarvam.ai, canvas metrics).
- Before: display +1.7% wider; h3 +3.9%; title/lead +2%; eyebrow +4.2%; mono label +7.2%. Gambetta x-height −13% and cap height −6% vs Season Mix.
- Changes: per-role tracking tokens (display −0.045em, statement −0.03em, title −0.025em, lead −0.01em, eyebrow 1.6px, mono label −0.04em).
- After: every role within ±1% width, except h3 at +1.7%.
- Accepted difference: Gambetta's smaller x-height. Scaling up would break the matched line widths, so it's documented in typography.md §1.1 instead.

## 2026-11-03 — Audit: typography + tokens vs the Indus Cowork page
- Prompts (verbatim): "are you sure is there anything left, in terms of typegraphy and tokens, also check sarvam indus cowrork website" / "so will be doing work on indus cowork, so i think will get things from indus cowork and there main page too, i guess that would help right?"
- Found missing:
  - Sarvam's own named type scale (`type-display-xl` 64 … `type-label` 12) in global CSS.
  - Display font used down to card headings (h3 20→24, h4 20→22), so the rule "display = H1/H2 only" was wrong and is now fixed.
  - Product H1 (36→52, lh 1.2) differs from the home H1 (44→64, lh 1.05).
  - h2-lg uses Sarvam's own `clamp(1.875rem, 3.1vw, 2.75rem)`, which confirms the fluid approach.
  - Mono eyebrows with 0.16em tracking and tabular figures; lead colour is tx-tertiary on product pages.
  - Text on dark is white 75%, not grey-600.
  - Sarvam's motion token names (instant/fast/normal/moderate/slow/entrance) and easings (.2,0,0,1 buttons; .22,1,.36,1 reveals; .16,1,.3,1 arrivals).
  - Button inset bevel shadow; ring-4 dots.
  - `ct-accent-indigo` is referenced but undefined in Sarvam's CSS, so it's mapped to sr-indigo-800 [assumption].
  - Product-page gradients (hero haze + indigo/orange/green tint panels), sampled from screenshots.
- Calibrated tracking for every new role by measurement (all within ±2%).
- Output: tokens.css/tokens.md/typography.md updated; /system shows all 18 type roles + product gradients; brand-findings §9 has Cowork facts, voice, page structure and patterns; screenshots of home + Cowork at 375/768/1440 in references/site/.

## 2026-11-03 — layout.md + sibling-consistency flair + layout QA script
- Prompts (verbatim): "so what to do for layout.md, i think its the most complex part, also the assignent said, it should be prefect in mobile too…" and Malay's direction: "what i like the most is, that their type heirarchy, also what they are not doing and will be doing is consistency in blocks and typo… If there are three blocks, each block's contents should have equal height, equal width, and inner content text. If they are one line, then all the blocks should have one line only… Also I like how the spacing is there and how on-point the mobile typography is."
- Research: studied sarvam.ai/indus-cowork at 375/768/1440. Kept their mobile hierarchy, spacing and sizes. Found inconsistencies: section headers switch between centred and left on mobile; sibling card titles wrap to different line counts; card heights vary. Sampled the dark trust panel (= sr-indigo-950) and the closing CTA gradient (`--gradient-night`).
- Output: `design-system/layout.md` (breakpoints, container, 4/8/12 grid, vertical rhythm, alignment rules, sibling consistency system, 14 section patterns with phone/tablet/laptop behaviour, mobile rules, in-between rules, test matrix) + `scripts/check-layout.mjs` (automated parity/overflow/tap-target QA at 10 widths) + a layout demo on /system.
- Testing the system, what failed and what changed:
  1. Three sibling cards in 3 columns from 768: at 768 the card text was ~122px wide, so titles wrapped 2 vs 3 lines. → Rule: never 3 text cards side by side below 1024; tablet uses 1 column of horizontal cards.
  2. Descriptions of 68–70 chars sat on line-break boundaries, so parity failed at 320, 600, 1024 and 1280. → Measured chars-per-line per tier and added the "±12% boundary" copy rule; rewrote copy to 54–58 chars → all 10 widths PASS.
  3. The QA script flagged the /system nav pills at 40px tall (< 44 tap minimum). → Fixed.

## 2026-11-03 — components.md, /components, surfaces research, /studio pattern tool
- Prompt (verbatim, summarised): "lets do components.md, and create a page for comps… sarvam brand is mostly based on this type of mesh gradients with grain… they are not proper on contrast things like the same tone symbol has same tone bg, so will fix that… create a script or internal tool for that type of design and patterns that i shared… inner shadow gradient, mesh gradient with outer bg, grain… for icons… only stroke icon… comps… clean, minimal… spacing good amount like apple." Mid-turn follow-up: "don't try to make the components exactly like them, we need to make better than them, in terms of more clarity and cleaner".
- Research (sarvam.ai markup): mesh-glow recipe (3 layers, 5 colour triads), light card mesh, dark orbs, exact night CTA gradient `#13121e → #a5bbfc 116.55%`, grain = 64px noise tile with soft-light at 50%, button surfaces/bevels, glass and well inner shadows, cursor spotlight. Icons: 24px, stroke 1.5, fill none (114 sampled).
- Built: surface tokens + classes; `src/components/sarvam` (Button, Chip, IconTile, Eyebrow, SectionHeader, Card/CardGrid, MeshPanel, MockChecklist, Checklist, FeatureRow, Steps, Timeline, TrustBand, Faq, CtaCard, Nav, Footer, Motif); `/components` showcase; `components.md`; `/studio` (gateway, line motif and divider generators with presets, 24-variation gallery, surface preview, SVG/clip-path export) + `src/lib/shapes.ts`.
- Testing, what failed and what changed:
  1. Mesh tokens defined on :root couldn't read per-element colour vars → moved the recipes into classes.
  2. Contrast check: Sarvam-style same-tone icons fail 3:1 (indigo-500/100 = 2.9; orange-800/100 = 3.0; green-600/100 = 2.6) → tiles use 800/900/700 shades (7.3 / 5.3 / 5.1).
  3. QA script: footer links 28px on phones → 44px. Feature and timeline copy failed parity at 375/768/1024 → measured rendered width vs slot width per breakpoint, capped text slots (36ch/34ch) so ratios stay constant on wide screens, chose copy with equal rendered widths → all 10 widths PASS.
  4. Visual review: mesh-glow panels looked washed out → switched feature panels to Sarvam's verified 135° tints. CTA used white glass on the light gradient end (≈1.9:1) → dark pill. Empty card footer row removed.
  5. /studio: the ogee top looked like a tent → rebuilt as a concave flare + convex shoulder. White ink on pale tints was unreadable → ink switches per surface. Divider: rebuilt so the baseline flows into the spiral; petal fan direction still needs a pass.
  6. Direction from Malay: be clearer than sarvam.ai, not a copy → added "Clearer than sarvam.ai" table to components.md §0.

## 2026-11-03 — Studio v2: medallions, flowers, glow, pattern tiling, divider rebuild
- Prompts (verbatim, in order): "in studio try to create this type of motif too, like smaller one with more of like patterns too" [ref: framed gateway shapes] · "your pattern just have like thing like on top and bottom only we need ike all four sides and six or something like that" · "Our divider is so bad. Make it more proper and cleaner. Have different types of variations also… Generate more types of things." [ref: scroll fan] · "Add one more tab… a pattern of flowers, which are similar to gateway patterns." · "The new tab will have patterns like these things." [ref: soft glowing shapes on tinted cards] · "Our divider is more like a sharp type of thing. Their divider is more like a soft roundy thing… a little bit of roundness and smoothness only."
- Built:
  - Gateway: dome width (dome on a ledge), rounder side lobes, inner frame line (exact inset via masked strokes, works on any background), 6 new presets.
  - Medallion tab: N-fold (3–12) outlines with a feature on every side (ogee/lobe/point/scallop/step) plus corner features.
  - Flower tab: solid floral silhouettes (round/pointed/lotus/notched), inner petal layers and centre cut as 1.5px lines.
  - Glow render: shape as a soft blurred rim + sheen + grain on a tinted card, palettes from brand ramps (lavender, rose, leaf, marigold, dusk).
  - Pattern tiling: grid or staggered rows, any column count and gap, exportable SVG.
  - Dividers: six families (scroll fan, twin scroll, lotus rule, bead rule, gateway rule, vine) with presets and a 24-variation gallery.
- What failed and what changed:
  1. Divider v1 had petals that clumped into wedges. Debug render showed the tip arc bent inward (notched) → petals rebuilt.
  2. v2 was "matchstick" petals (thin stem + separate circle), which Malay called sharp → one smooth teardrop curve with a fully round tip and rounded base, a soft calyx, 2px round-capped lines, and rounded diamond corners.
  3. Gateways only had features top and bottom → Medallion tab (features on all sides).
  4. Gallery overflowed its column → `minmax(0, 1fr)` tracks.

## 2026-11-03 — GatewayFrame + imagery.md, logo.md, voice.md
- Prompt (verbatim): "yep, we can go next"
- Built: `<GatewayFrame>` (studio shapes as responsive windows via objectBoundingBox clip-paths; optional inset frame line, light or dark ink), shown on /components with gradient, tint and product-UI fills.
- Wrote: `imagery.md` (one hero device per composition, gradient field usage, gateway/medallion/flower families, window/solid/line/glow renders, motif and soft-divider rules, product mockup rules, photography direction + AI photo prompt recipe, composition recipes); `logo.md` (official files, colour rule, "r" clear space, minimum sizes and banner placement [addition], logomark scope, misuse lists from the official visuals, co-branding); `voice.md` (personality, headline patterns from Sarvam copy, CTAs ("Talk to Us" because Cowork isn't GA), banned words, a verified Indus Cowork fact sheet, copy budgets per slot, banner/caption formats).
- Guard rails captured from research: SOC 2 **Type I** on the Cowork page; avoid language counts (22 vs 23 inconsistency); never "Sign up free".

## 2026-11-03 — CTA ring lattice, distinct product mocks, card variants, crisp glow
- Prompts (verbatim, in order): "their footer CTA has somewhat this type of bottom pattern so do that. They are animated like it grows from 0 layers to multiple layers… coming from down to up. Also we need to improve more on the component side. It is too similar to them… The three cards are too similar…" · "In footer CTA, use our flower pattern for that small logo type of thing and have a little bit more petals." · "Our 'Have too many rings' reduces that and it should be properly centred in half only." · "Our component is so bad, like the inner shadows… It should feel crisp and sharper." [ref: Sarvam Cloud tile card] · "a little bit of a downside: that CTA rings pattern"
- Research: Sarvam's CTA background is its logomark enlarged (stroke #F5F5F5 at 15%, 0.72px), GSAP scale 0→1 + rotate 360→0 + blur 20→0 over 2.2s. We can't copy it (logo.md: never crop or recreate the logomark) → built our own ring lattice.
- Iterations on the lattice:
  1. A full-width lattice was too busy.
  2. A centred dome was still too many rings.
  3. Now: a half rosette (5 + 7 circles) centred on the bottom edge, scaled to sit behind the symbol, nudged down 14%. The symbol is our 8-petal lotus.
- Components: three distinct product moments (Plan, Research, Review) replace three copies of one checklist card; FeatureBento layout; GlowCard, FactCard (verified facts only), TileCard. Glow switched to a crisp style (sharp rim, fine inner highlight, faint halo).
- QA failures fixed: 3-up cards were enabled at 768 (against our own rule, now 1024+); fact, glow and bento copy re-fitted with the width-ratio tool so line counts match at all 10 widths.
- Tile cards then failed QA at 320/375/1280 ("Private Cloud (VPC)" wrapped; descriptions broke unevenly) → the card adapts to its own width with a container query (tile stacks above the text under 360px), and descriptions were re-fitted to 54 characters each → all 10 widths PASS.
- "There is no proper padding, symmetry, or aspect ratio. Fix it." [ref: glow cards] → the glow SVG rendered square and was cropped to 16:10 (shapes clipped, unequal visual size). Now the canvas matches the container aspect, every shape fits 66% of the canvas height (equal visual size), the header is inset 8px on three sides, the text is inset 24px left/right/bottom, and label/title/body gaps are tightened. QA: all 10 widths PASS.

## 2026-11-03 — Motion system, looping mocks, working dashboards, emblems
- Prompts (verbatim, in order): "our components are not animated. I want to use Motion, but in a professional and proper way only so that our consistency doesn't go bad. The animations should be in a loop only. Also create one or two more components… like a dashboard just like Indus Cowork has… Everything should be functional" · "nothing is jittery and no component is coming before the other components. The height is not increasing or decreasing… Only a fixed height for cards is better." · "The dashboard itself should not have heavy animations… a proper dashboard… properly structured" · "the dashboard is just looking like a typical ai thing, and too much is going on, fix it" · [emblem refs] "I want our cards that have this type of logo to have this type of effect: that gradient thing, grain thing, and behind that, a soft opaque pattern…" · "not exactly but in our way, use our assets only" · "ours should be better and more professional, go all out on it" · "our just looks bad, look how they play with lots of inner and outer shadow, multiple layers…" · "now it looks good" · "i don't like this small star things" · "the gradient logic should be of Sarvam only"
- Built:
  - `motion.ts` (Motion tokens mirroring tokens.css, plus `useLoop`: pauses off-screen, holds the final frame under reduced motion).
  - Looping Plan / Research / Review mocks.
  - Two working dashboards (Cowork teammates, Schedule).
  - EmblemArt/EmblemCard.
  - `scripts/check-motion.mjs`: samples every animated element's size for 10s at 375/768/1440, then clicks through every dashboard interaction.
- What failed and what changed:
  1. **Size test v1:** the plan mock changed height 391→430 at 375, and the review mock's width changed at 768 (labels and bold text re-wrapping). → Single-line rows with fixed columns, fixed-width status and button labels, no weight change on the active row; feature rows stay stacked until 1024 (the mock was 187px wide at 768). The research list now uses 3 fixed slots (skeleton → source in place), and the diff note always occupies its space. → All stable.
  2. **Dashboards v1** had looping auto-runs and growing chat → too busy and jumped in height. **v2:** fixed heights, but a generic SaaS look (KPI boxes, full tables, colourful pills). **v3:** a tint stage like Sarvam's hero mockup, the KPI row removed, a teammate sidebar + one focused detail view, dot + text status, hairlines instead of boxes. All interactions verified by script.
  3. **Emblems v1:** generic lens pattern → rejected ("use our assets only"). **v2:** echo rings of our own shapes, but flat. **v3:** layered material (frosted body, bevel highlight, tinted inner shadow, double drop shadow, inner sheen, inset frame, embossed rings, engraved icon) → approved. Then the small diamond accents were removed, and the grounds switched to the exact Sarvam gradients with their real directions.
  4. **QA:** a container query on subgrid cards collapsed their height (the art overlapped the text) → replaced with a viewport media query. Emblem copy was re-fitted for equal line counts → all 10 widths PASS.

## 2026-11-03 — Social references organised + icon library switched to Nucleo
- Prompt (verbatim): "i have put few images unordred in social folder, check it, they put same images in every platform, also organise like give proper name and then will move forward and also For icons try to use a specific library only, like Tabler Icons, Nuclear Icons, or hugeicon Icons. Any one of them. Also we have pro nuclear icons too."
- Social: renamed 12 posts to `NN-type-subject-ratio.png` and wrote `references/social/README.md`: per-post layout, ratio and headline type, plus findings for the banner recipes (five recurring layouts: gateway window, nested gateway echoes, soft cloud, split text + glossy shapes, shape cluster; wordmark placement; partner lockups; headline type; gradients; ~6–8% margins; one CTA chip at most).
- Icons: chose **Nucleo Core outline 24px** (Malay's Nucleo Pro licence; the outline style matches Sarvam's 24/1.5 icons). Used the Nucleo MCP + local install to map all 27 icons, copied the components into `src/components/icons/nucleo/`, and wrapped them in `src/components/icons/index.tsx` (stroke 1.5, round corners). Swapped every import and uninstalled `lucide-react`. One fix: inside SVG art, Nucleo icons take colour from `color` (currentColor), not `stroke`, so the EmblemArt icon calls were updated.

## 2026-11-03 — Polish pass: commit, docs-vs-code audit, campaign gradients, expressions, hub
- Prompts (verbatim): "i feel like we need to improve this things more like so next things will ne more better i guess, we need to polishing right?" · "i feel do all thiings, 1. 2. i have few things like 3 different way, one for camapin things, one for some what different, give they are following same brand exporations but different but they look consistent, like it feels like they are sarwarm 3. 4."
- Commit: everything was still uncommitted; committed on branch `design-system`. Raw third-party site dumps are kept out of git; the extracted findings are committed.
- Audit (docs vs code): fixed feature rows on tablet (stacked, not 50/50); timeline horizontal from 1280; CTA ring lattice documented; exact night gradient; warning that container queries collapse subgrid cards; logomark rule clarified so it doesn't contradict the CTA lattice.
- Campaign gradients: sampled 5 gradients + the cloud colour from Sarvam's social posts (olive, meadow, saffron-rose, lavender-dusk, spring) → tokens + utilities + tokens.md §2.9.
- New renders in /studio: **gloss** (polished 3D-look shapes, from Startup Program / Fintech Fest) and **soft cloud** (from customer stories).
- `expressions.md`: Campaign / Product / Community, each with surfaces, hero device, type, wordmark and energy, plus a consistency contract and an on-system test.
- Review site: /system is now a hub (emblem cards, file index); tokens moved to /system/tokens; new /system/expressions with a live sample per expression; shared system nav. QA: both new pages PASS at all 10 widths.

## 2026-11-03 — Overlay nav, banner artboards, performance fixes
- Prompts (verbatim): "Sarvam Navbar is something like this. Its background is invisible when scrolling down and then it is visible." · [expressions screenshot] "This is not proper at all. There is no symmetry, no proper hierarchy. The aspect ratio is not there. Fix it." · "Also the animation is not properly working. It is too janky and laggy." · "By animation I meant the hover animations on the systems page."
- Nav: read Sarvam's Navbar bundle. Fixed overlay header; a white surface slides down + fades in after 8px of scroll, back below 2px (hysteresis), 500ms out-quint in / 300ms out; hairline inset 6%; Log In (dark) + Contact Us (light); an always-solid mode for pages without a hero. Rebuilt our Nav the same way (`overlay` prop, NavFrame client component).
- Expressions samples: fluid `cqw` sizing rendered the Product sample at the wrong scale and nothing shared a grid. → New `Artboard` (a fixed-pixel canvas scaled to fit) + `CampaignBanner` / `ProductBanner` / `CommunityBanner` designed at 1080×1350 on one grid (margin 72, wordmark 200×32 at 72 from the top, headline 88–104, sub 32). These double as banner prototypes.
- Performance:
  - Measured with Chrome DevTools metrics: about 60 style recalcs/s even at idle. → Removed shimmer (background-position), pulse via pseudo-element opacity/scale (not box-shadow), progress via scaleX (not width), spinners rotate a wrapper span, `content-visibility: auto` on off-screen blocks. Emblem area idle recalcs: 60/s → 5/s.
  - Hover jank on /system: a trace showed SVG filters re-rasterizing every frame → shadow moved to a pre-rendered ::after (opacity only), art on its own layer. Raster during hover: 5,848ms → 161ms.
  - New scripts: check-perf.mjs, check-hover.mjs.

## 2026-11-04 — Recipes, SKILL.md, single-file design.md
- Prompt (verbatim): "yes we should continue now" (+ asked mid-turn: "are this three banners?" → answered: no, these are prototypes; the final banners are Indus-Cowork-only, generated from the recipes, refined in rounds and exported as PNG).
- Wrote:
  - `recipes/meta-banner.md`: shared grid (margin 72, wordmark 200×32 at 72, headline 96–104, sub 32, min text 22), the Instagram centre-crop rule, one layout per expression, square adaptation by rearranging, steps, don'ts.
  - `recipes/linkedin-banner.md`: 1200×627 grid (margin 56, 12 columns, headline 60–72, sub 24, min 16), mobile-feed legibility at 0.3×, landscape layouts.
  - `recipes/landing-page.md`: 12-section order mapped to components and expressions, per-breakpoint behaviour, quality gates, export.
  - `SKILL.md`: an entry point with frontmatter, how to use it, a task → files routing table, a file index, non-negotiables.
  - `scripts/build-design-md.mjs` → `design.md` (all files in one, ~125k characters) for tools that take a single file.

## 2026-11-04 — Banners round 1 → 2 (all Indus Cowork)
- Prompt (verbatim): "but before that i need to see the banners you know, so check and change and improve it"
- Built: `banners.tsx` rewritten as format-aware compositions (portrait 1080×1350, square 1080×1080, landscape 1200×627) on the recipe grids; `banner-set.tsx` (6 banners: the same 3 campaigns on Meta and LinkedIn, the way Sarvam posts the same art everywhere); `/banners` review page; `/banners/[id]` raw route; `scripts/export-banners.mjs` (exact-size PNGs, reduced motion → frozen mock states via a new `freeze` prop).
  - Launch (Campaign): "Meet Indus Cowork" on saffron-rose, nested gateways; the wordmark + headline now sit **inside the innermost arch** (as in Sarvam's Knowledge Fabric post) instead of having arch lines cross the wordmark.
  - Feature (Product): "It plans the work before it starts." + the MockPlan state "2 of 4" on an indigo tint (split layout on LinkedIn).
  - Where it lives (Community): "Your newest colleague lives in Slack." on lavender-dusk with a soft scalloped cloud.
- Round-1 self-critique → fixes: the cloud was too soft to read as a shape (blur 0.06 → 0.032, centred on the text, stretched to a wide oval on landscape); the LinkedIn launch headline wrapped (text box 0.78 → 0.86 of the arch); the expressions page was previewing the square community banner in a 4:5 frame.
- Screens: `process/screens/banners-r2/`.

## 2026-11-04 — Banner system rebuilt: prompt-less builder, two-text rule, carved devices, styled type
- Prompts (verbatim, in order): "I don't like the plans banner so let's improve it. Others are also mediocre. What if I want to generate the images in a way where I will give you a subject and based on it you make it for a launch product, for a campaign, we hit a milestone, or we get a funding round?… check the images. They have text styling also, like text having a gradient, inner shadows… Right now the things we have made feel like the website only." · "they are using their company logo very minimally… the gateway very clearly and properly, with a lot of detailing, inner shadows, layers… clean and sharper" · "Create a prompt or a system like that so whenever I give you a design accordingly, it designs the banner in that way." · "Still didn't like it. Create a separate page for the banners where we can edit… We don't need that mono text and the plans one should not be there… a reusable type of prompt-less banner-type thing to create different types of effects and different types of banners according to the situations." · "the text should be less and there should not be more than two different sections of text… two types of header title styling… follow that" · "Remove these [INTRODUCING pill]" · "Make sure that in each and every format nothing is overlapping… properly structured."
- Studied text effects in Sarvam posts: gold gradient "$300 Million" + grey-gold label; two-tone indigo "Champions Program"; white lifted "Sarvam 30B"; bold sans "Knowledge Fabric".
- Built:
  - `StyledText` (SVG gradient fill + inner shadow + top highlight + lift; white / gold / goldMute / indigo / ink).
  - Carved layer stacks (nested filled gateways/medallions with radial core→edge bands, cast shadows, crisp rims, lit doorway or cream window).
  - `composer.tsx`: background × device × shape × treatment × title style × wordmark × ≤2 text, with auto-fit per format.
  - `/banners/make` builder with a dev-only Save & export API.
  - `banners/briefs.json` as the single source; `check-banners.mjs` QA; `recipes/banner-builder.md`; `.claude/skills/sarvam-banner`.
- Iterations:
  - v3 templates (launch/campaign/milestone/funding) → the campaign "plans" banner was rejected (card ghosting, faint second line, a random gloss flower) and later dropped entirely.
  - Pills and mono text removed.
  - Moved from fixed templates to a composable builder.
  - QA v1: 7/18 situation×format combos failed (text spilling out of openings, overlaps) → added fitting (scale type to the opening's height and width, conservative glyph widths, digits wider, spacing that accounts for the effect padding) → 18/18 + 6/6 saved banners PASS.
- Current set: launch (carved gateway, sans), connectors milestone (carved medallion, gold 100+), slack story (cloud, serif). Screens: `process/screens/banners-r4/`.

## 2026-11-04 — Banners r5: one shape, true geometry, measured text boxes, seamless grain
- Prompts (verbatim, in order): "Here there are too many gateway patterns… There is only one and it stands out way cooler… They are using those medallion patterns… see the inner gradient shadow type of thing on the pattern." · "this pattern is not properly structured or aligned… perfect in every single possible way." · "in the landscape one I can see a grid-type pattern. It should not be there." · "the Meta banners feel stretched vertically." · "in some formats… it is overlapping with the gateway. In square format… not properly aligned. The size is too small… properly hierarchically structured."
- Studied Knowledge Fabric + DiarBench: ONE large shape, bleeding, filled with a deeper ground tone, lit by a contrasting glow from the edge inward; bold centred text.
- Built `medallion-glow` (now the default for launch / milestone / funding) with 5 curated text-holding shapes (onion lantern, cusped window, quatrefoil, scalloped medallion, ogee cross).
- Root-cause fixes:
  1. Shapes were stretched non-uniformly → uniform scale only; proportions set per format via generator params.
  2. Carved rings were scaled copies (uneven spacing at points vs flats) → true offsets (shape + 2·offset stroke, round joins), step = 5% of shape size.
  3. Grid lines = seams of the 240px grain tile under scaling → one generated, seamless grain layer per banner.
  4. Text overlapping gateway walls while QA passed → the text-box finder only saw segment endpoints; long straight sides had no points. → Dense outline sampling of every M/L/C/Q/Z segment; gateways proportioned per format and sized by width.
  5. Tiny text: number-specific text-box aspect; a legible floor for supporting lines; softer, wider inner glow; larger, closer gloss clusters; light supporting lines on dark grounds.
- QA: 18/18 situation×format + 6/6 saved PASS. Screens: process/screens/banners-r5/.

## 2026-11-04 — No shape is ever stretched
- Prompt (verbatim): "In this type of pattern the text would be perfectly inside that background pattern. Why is it stretched in landscape and not in square or another format? Fix it. It should not ever stretch."
- Cause: the cloud was drawn with `preserveAspectRatio="none"` into a wide box on landscape. A second, quieter stretch: the medallion "aspect" option scales the shape vertically.
- Fix: the cloud is now the scalloped medallion at true proportions (blurred) with a measured text box inside it; medallion text shapes always use aspect 1; shapes are enlarged so text keeps room; headlines are capped at 3 lines (type shrinks instead of a 4th break). Rule written into banner-builder.md §2.6. QA 18/18 + 6/6.

## 2026-11-04 — Banner builder: layouts, slots, reference match, variations, final six
- Prompts (verbatim): "so tell me, can you just make these preset banners only or anything?… we need a lot of improvements… what should we do next for this banner thing?" → plan of 5 steps → "wait it will take 1hours and 2 hours why?" → "the do all 5 i guess"
- 1 · Layouts: centered / split / stacked, rearranged per format (split on portrait/square → stacked; stacked on landscape → split). Devices now render into a sub-area (frame-based renderDevice); text left-aligned in split.
- 2 · Slots: partner lockup (`sarvam · PARTNER`, partner at wordmark height in indigo) and a product card floating over the device (~62% of the device width). Wordmark option "none" (Sarvam 30B has none). New situations: partnership, program, feature. QA now reads all situations from the source: 27/27 PASS.
  - Fixes found by looking: the gloss cluster was mirrored for full canvases (cut off or tiny in sub-areas) → one centred cluster; the card was sized to the text box (tiny) → sized to the device area.
- 3 · Reference match (`scripts/reference-match.mjs`): rebuilt Knowledge Fabric, Sarvam 30B, Supernova and Startup Program with builder options only.
  - Round 1 gaps: everything too timid (shapes and type ~½ of Sarvam's scale), a narrow landscape lantern, a thin carved stack, a tiny partner name.
  - Fixes: type base +40–45%, a wide landscape lantern (structural aspect 0.74), glow fills ~86% of the width and bleeds, carved bands 10% of the shape, partner at wordmark height.
  - Round 2: Knowledge Fabric, Supernova and Startup Program read as the same family. Screens: `process/screens/reference-match.png` → `reference-match-r2.png`.
- 4 · Variations: `variationsOf(spec)` → 6 on-system alternatives for the current copy (contrast-safe treatments), clickable gallery in /banners/make. The carved-night option looked blocky as a thumbnail → replaced with a night glow.
- 5 · Final six (`banners/briefs.json`, all QA PASS): launch (saffron onion-lantern glow, sans), connectors milestone (night scalloped glow, gold 100+), early access (white, gloss cluster, split → stacked on Meta). Screens: `process/screens/banners-final/`.

## 2026-11-04 — Banner hard rules: two formats, no blobs, sharper, padding, fixed type steps
- Prompts (verbatim): "still we need to set the rules for the banners because I'm not feeling it. Remove these white blobs in the centre. Also have two sets of aspect ratios only: one for LinkedIn and one for Meta… clear and sharper things" · "There is no padding at all."
- Changes:
  - Two formats only (Meta 1080×1350, LinkedIn 1200×627; square removed from the builder, QA and set).
  - Cloud device removed (story/partnership → lavender medallion-glow).
  - Gloss highlight shrunk to a crisp specular (≤ 26% of the width, 45% opacity).
  - Glow sharpened (blur 6.5% → 3.5%, narrower band) + a 1.5px edge line on every shape.
  - Fixed type steps (100/86/74/64/55/48%) instead of continuous shrink.
  - Padding rule: ≥ 1.5·M clear on both sides; Meta shapes fully inside; LinkedIn bleeds vertically only.
- `banner-builder.md` §0: 11 hard rules table. The partnership copy was shortened to fit its shape (QA fail → copy fix, not smaller type).
- QA: 18/18 situations × 2 formats + 6/6 set PASS.

## 2026-11-04 — Mesh gloss, six distinct banners, the logomark, builder speed
- Prompts (verbatim): "Check the references. Improve the mesh gradient properly. Have some inner shadows type of thing. Improve these things." · "Have different contents on each banner and use the Sarvam logo on some of the banners where it looks appropriate and proper." · "I mean sarvam logo, i meant their pattern logo." · "Improve the performance also. When I am switching the presets and all those things, it is too slow. Find the issues, fix them, and it should be quicker." · "Also mostly, I will not be using these presets or the banner builder. I will tell you that this is the subject and you need to create it accordingly. But it's nice to have a banner builder though."
- Gloss device is now a mesh: two-tone fill + a clipped inner edge shadow in a contrasting hue + a soft centre light. No drop shadow, no highlight blob (`GLOSS_PALETTES` in `src/lib/shapes.ts`).
- Six banners, six messages (all from voice.md §5):
  - Meta: launch, 100+ connectors, early access
  - LinkedIn: approvals ("Nothing ships without your yes"), Slack, sovereign models
- "Pattern logo" = the official mandala logomark. It's a new `logo: "logomark"` option, rendered alone at 0.55× the wordmark height, on the connectors and approvals banners. logo.md rule 6 gets a labelled [addition]: banners from Sarvam's own account may use the logomark alone.
- QA fail → fix:
  - Landscape approvals and sovereign: the supporting line spilled out of the opening.
    - The fit now measures the supporting line at its 20px floor and counts the logomark's real height.
    - It also tries taller text boxes inside the shape.
    - Shapes were swapped to ones with a taller core (Ogee cross, Quatrefoil). The type was not shrunk.
  - The Meta PNGs carried the red Next.js "1 Issue" badge in the corner, caused by `searchParams` read outside Suspense on `/banners/render`. The route is now wrapped in Suspense, and the export hides `nextjs-portal`.
- Builder speed, before → after (`scripts/check-builder-speed.mjs`, `check-builder-raster.mjs`):
  - preset switch → painted frame: median 49 ms → 20 ms
  - per switch: raster 30 → 18 ms; script 41 → 17 ms
  - Causes:
    - a full-canvas live feTurbulence grain on 8 banners → one pre-generated grain PNG
    - every banner re-rendering on every keystroke → `memo` by spec value plus `useDeferredValue` previews
    - 6 variations always rendered → shown on demand
- Workflow note: the default path is now subject → Claude decides everything → QA → PNGs (`.claude/skills/sarvam-banner`). The builder stays as an optional manual tool.
- QA: 6/6 set + 18/18 situations PASS. Screen: `process/screens/banners-r6/set.png`.

## 2026-11-04 — Subject-led parts, the method, our taste; nav + overview
- Prompts (verbatim): "also just want to know: if I gave you the subject, you are not going to make the same type of banners… You are going for a very new approach, right?" · "the thing is, add two or three more parts but I need somewhat of an approach or type of thing based on the subject I gave you. Also in the home assignment… add our own taste also… but it should feel like server AI." · "Also in the navbar have the banner option, and in Overview also have its own card so I can just navigate easily."
- Method (`banner-builder.md` §5): subject → one-sentence idea → idea type → part.
  - Each type has its own part:
    - name → lantern
    - number → medallion
    - capability → emblem
    - product moment → arch window
    - India / mission → script mandala
    - statement → gateway echo
    - community → gloss
  - Plus a set-variety rule, and read briefs.json before choosing.
- Three new parts (composer.tsx):
  - `emblem`: frosted bevelled medallion, engraved Nucleo icon, echo rings on true offsets.
  - `arch-window`: a recessed gateway arch with the real product mock seen through it (CSS clip-path).
  - `script-mandala` [addition]: "Sarvam" in nine Indian scripts in rings around a glow disc; on LinkedIn the logomark sits in the centre. Fonts: Noto Sans per script, subset with `text=` (src/app/banners/layout.tsx). The transliterations need a native-reader check.
- Our taste (§6): one idea, one object; script mandala; engraved emblems; the gateway as a window onto the product; precision.
- Fixes found by looking:
  - Mandala centre logomark missing on LinkedIn (the device area is ~square, so the format guess was wrong) → explicit `beside` flag.
  - Emblem too small on Meta → 0.56 of the area.
  - LinkedIn split text sat on the light bottom of the gradient → the text column is now top-aligned.
- New situations: capability, product, mission. QA: 24/24 situations × formats + 6/6 set PASS. Builder switch median still ~20 ms.
- Nav: "Banners" link added. /system: the Studio and Banner builder cards now sit as equal siblings (stacked below 1024). check-layout PASS at 10 widths, check-nav PASS.
- Screens: `process/screens/banners-r7/`, `process/screens/system-tools-row.png`.

## 2026-11-04 — Overview tools row broken in Safari
- Prompt (verbatim): "this layout is not proper. Fix it." (screenshot: tool-card art at half width, empty space beside it)
- Cause: WebKit sizes an `aspect-ratio` grid item from its SVG's default 300px width instead of stretching it. Chromium was fine, so the Chromium-only QA missed it.
- Fix: `.hub-wide__art { width: 100% }`. WebKit (via Playwright) now matches Chromium at 375 / 768 / 1280 / 1504. I scanned seven pages in WebKit for any other collapsed aspect box: none found.
- Lesson: QA now includes a WebKit pass (`npx playwright install webkit`).

## 2026-11-04 — Banner from a subject: Sarvam Prism (first subject-only run of the method)
- Prompt (verbatim): "create a banner for this topic. I just got it from an X post about Sarvam. topic: "Today we're releasing Sarvam Prism, a System One model built on Sarvam 105B for fast, accurate decisions across enterprise workflows. It scores 71.8 with a median response time of 44 milliseconds, the highest average score among decision models that respond in under 100 milliseconds.""
- Facts added to voice.md §5, labelled with their source (X post, not yet on sarvam.ai).
- Method (§5):
  - Idea: "Sarvam Prism makes fast, accurate decisions."
  - Type: a name being launched → lantern-family medallion-glow, sans headline.
  - The one number goes in the supporting line: "Fast, accurate decisions in 44 ms".
- Personal touch: a prism splits light into a spectrum, and Sarvam's colour is a blue → orange spectrum. So the ground is **dawn** (orange → blue, unused in the set), and the shape is the faceted Cusped window (reads as a cut gem).
- Three directions rendered (`process/screens/banners-prism/directions.png`):
  - A: dawn + Cusped window, name, sans ✅
  - B: lavender + "44 ms" as the hero number. Rejected: the number without the name doesn't announce a launch.
  - C: dawn + gateway echo. Rejected: the type floats and the arches compete.
- Changes after looking:
  - The wordmark was dropped, because "Sarvam Prism" already carries the brand (as in Sarvam's own Sarvam 30B post).
  - The Meta shape was too small. Cause: the Cusped window generator box carried empty margin.
  - Engine fix: `tight()` re-boxes every glow shape to its drawn outline (translation only). This also enlarged the 100+ banner to its intended size.
- QA: 8/8 set (Prism in both formats) + all situations PASS. PNGs: `banners/png/meta-prism.png`, `banners/png/linkedin-prism.png`.

## 2026-11-04 — Feature preset removed
- Prompt (verbatim): "remove this feature preset. I don't like it anymore." (screenshot: lavender scalloped cloud behind a product card, split layout)
- Removed the `feature` situation from the engine, the builder and banner-builder.md §3. A product moment is now the `product` preset (the arch window). The builder's situation list also gains the capability, product and mission presets. QA 22/22 PASS.

## 2026-11-04 — Afterglow rejected and removed
- Prompt (verbatim): "no, remove it. I don't like it."
- I reverted the afterglow device, its two Prism banners, the Tilt control, the noise image and the doc rules (commit 9fd5b6d reverted). Malay's references and the three rounds stay in `process/screens/refs-afterglow/` as a record of a direction that was tried and rejected.
- Note for the write-up: copying a reference's effect too literally, even recoloured in brand hues, read as foreign to the system. The soft, fuzzy band fights the brand's "sharp, not soft" rule. That rule held.

## 2026-11-04 — "Precision" taste round tried and removed
- Prompts (verbatim): "Now suggest some ideas to improve it way better while still keeping this minimal and simple, yet make it so clear and sharper. Suggest some ideas to add our own taste into it." → "do all the things. Also is it for a banner?" → "Honestly remove it. We need something simpler yet effective. Suggest something else for the banner."
- What was tried:
  - construction hairlines
  - prism-edge outlines
  - a faceted "gem" device
  - number + unit typography
  - an inset frame with registration ticks
  - one key light
  - a bold crop
  - All of it was applied to three Prism candidates (`process/screens/rejected-precision/three-options.png`).
- Removed before commit; the engine is back to the previous state.
- Lesson: "do all the things" stacked several touches on each banner. Each one was sharp, but together they made the art busier, not simpler. The next proposal should be one move, not a toolkit.

## 2026-11-04 — Simpler direction: spectrum line, type hero, result card
- Prompt (verbatim): "try all three and suggest many other variations or ideas according to this design style only and to what we feel is the Sarvam design sense."
- One move per banner:
  1. `spectrum` device: an off-white canvas with one 12px (Meta) / 8px (LinkedIn) hard-edged strip of the brand spectrum, full bleed near the bottom.
  2. `editorial` layout on a plain gradient: the type is the hero (base ×1.3), set left and anchored low, wordmark top-left.
  3. `result-card` device: one white product-style card (radius 32/24, hairline divider) with the verified results 71.8 / 44 ms, the unit small and top-aligned.
- Fixes after looking:
  - The wordmark sat at 72px while the text column sat at 108px; it now aligns to the column.
  - The card used LinkedIn sizes on Meta. The device guessed its format from the stacked area's shape (1080×756 looks landscape), so the real format is now passed in.
  - The LinkedIn card's unit and label overflowed; I tightened the sizes and shortened the label to "Median response".
- Candidates `prism-spectrum`, `prism-type`, `prism-card`: QA PASS in both formats. Screen: `process/screens/banners-simple/three-options.png`.

## 2026-11-04 — Spectrum banner gets a corner medallion; result card removed
- Prompt (verbatim): "remove the Prism card. What we can do in the Prism Spectrum is that, on the top-right corner, we can have our patterns designed in a way that looks beautiful, somewhat like that Medioline or other things. Find a way to make it look good there because it looks too simple and plain. We need to add things there."
- Removed: the `prism-card` banner, its PNGs and the `result-card` device.
- Spectrum device: the top-right corner now holds a line medallion:
  - six nested true-offset outlines (five on LinkedIn) around the Lotus line-motif from /studio
  - all strokes in the same spectrum gradient as the strip, with indigo at the inner lower-left and orange toward the frame corner
  - a faint periwinkle wash behind it; no blur on any line
- Tried Scalloped medallion, Eight-point star and Ogee cross (`process/screens/banners-simple/spectrum-corner-shapes.png`). Ogee cross is the default: it reads most like Sarvam's gateway.
- Fixes after looking:
  - At first the gradient barely reached orange, so it's now aimed at the frame corner.
  - On LinkedIn the outer ring crossed "Prism", so landscape uses one ring fewer and the medallion sits further into the corner.
- QA PASS in both formats.

## 2026-11-04 — Spectrum corner: dispersion rings
- Prompt (verbatim): "Loved it but that gradient thing, I feel like, should be much better on the top-right thing."
- Cause: one diagonal gradient across every ring, plus fading opacity, washed the middle rings to pale lilac. Orange only showed at the very corner.
- Change: each ring is now one solid hue, stepping through the spectrum from indigo (inner) to orange (outer), at near-full opacity (`spectrumAt(t)`). The rings read as light dispersing through a prism, and they match the strip below.
- Added a crisp spectrum tint inside the core (periwinkle centre → peach edge), and the lotus motif is now in solid indigo.
- Before / after: `process/screens/banners-simple/spectrum-gradient-before-after.png` (left: before, middle: rings only, right: rings + tinted core ✅). QA PASS, re-exported.

## 2026-11-04 — Spectrum corner rebuilt as a logomark-style rosette
- Prompt (verbatim): "but still it is not there. The patterns are also not consistent. They look so odd and awkward. Try to make it more proper. Match the Sarvam design sense and all that. Make it proper. It is not looking good."
- Diagnosis:
  - The rings were true offsets of the Ogee cross. Each offset rounds the corners more, so the rings drift from sharp (inside) to blobby (outside): inconsistent.
  - The lotus motif (8 petals) had no relation to the 4-fold cross.
  - The ring spacing grew unevenly.
- Looked again at Sarvam's own geometry: the logomark is ONE element (a lobe / circle) repeated around a centre, and the Global Fintech Fest art is flat identical petals.
- Rebuild: 12 equal circles, centres on a ring, all passing through the centre — the logomark's own construction. Every line is the same 1.5px. Each circle takes one spectrum hue by its direction (mirror-symmetric: indigo toward the canvas, orange toward the corner), so there's no colour seam.
- Tried three constructions (`process/screens/banners-simple/spectrum-rosette-options.png`):
  - circles ✅
  - rounded squares sharing a centre: rejected, it reads as a spiral
  - petals on a ring: kept as the `rosette: "lobes"` option
- Fix after looking: on LinkedIn the rosette came close to "Prism" → R 0.38·H, pushed further into the corner. QA PASS, re-exported.
- Rule added to banner-builder.md §6: ornaments are one identical element repeated by rotation, never offsets of a complex shape.
