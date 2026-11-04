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

## 2026-11-04 — Rosette stroke thicker
- Prompt (verbatim): "great, loved it, but with a somewhat thicker pattern, thicker stroke"
- Rosette line 1.5px → 3px (Meta) / 2.5px (LinkedIn): about 2× the old weight, so it holds at phone size (~375px wide: 3px reads as ~1px). QA PASS, re-exported.

## 2026-11-04 — Rosette set: more patterns, thicker stroke
- Prompt (verbatim): "a different set of patterns and thicker strokes"
- Stroke 3 → 4.5px (Meta) / 2.5 → 3.5px (LinkedIn), with round caps.
- New rosettes, all following the one-element-by-rotation rule:
  - **lens:** 12 vesica petals, a lotus
  - **orbits:** 6 ellipses turned 30°
  - **rings:** 6 concentric circles; the hue steps outward
  - Joining the existing circles and lobes.
- Tried and dropped **arches** (Mihrab gateway repeated by rotation). Even after moving them onto an inner ring, the gateway's long straight sides read as boxy door frames, not a rosette.
- Sheet: `process/screens/banners-simple/rosette-set-thick.png`. The prism-spectrum banner stays on circles. QA PASS, re-exported. The builder's "Corner rosette" control lists all five.

## 2026-11-04 — Prism spectrum: solid lotus
- Prompts (verbatim): "use a different type of pattern. I don't want circles." → "Yeah now make it solid and have a gradient in it."
- The rosette switched to **lens** (12 vesica petals, a lotus).
- Then made solid (`rosetteSolid`): each petal is filled base → tip, from a 70% white tint of its spectrum hue to the full hue, so the lotus shows the whole spectrum (indigo petals facing the canvas, orange toward the corner). A 2.5px (Meta) / 2px (LinkedIn) canvas-coloured edge keeps the overlapping petals crisp at the centre. No blur, no stroke colour.
- QA PASS, re-exported. The builder has a Petals line / solid control.

## 2026-11-04 — Lotus: bigger, fewer, broader petals
- Prompts (verbatim): "make it bigger in size and have a little bit fewer petals in number." → "Make the petal thicker."
- Lens rosette: 12 → 8 petals; length ×1.32 (Meta) / ×1.22 (LinkedIn); petal width 0.26 R → 0.36 × length. It stays clear of the headline in both formats. QA PASS, re-exported.

## 2026-11-04 — Spectrum family: ornaments, placements, dividers; pruned to distinct ones
- Prompts (verbatim): "now suggest some other sets of banner designs." → "do all of it. I will remove some if I don't like it." → "Maybe use our dividers also to decorate it and make it look good." → "Wait what? Why so many of them? Remove the similar ones." → "As I have told you I need different ones."
- Engine:
  - `ornament` (lotus / quatrefoil / star / ogee / arch, solid with spectrum fills)
  - `place` (corner / rise / center / small, each with its own text region and alignment; landscape rearranges rise and center to the right)
  - `petals`, `ornamentTone: white`
  - `divider` (/studio divider presets in the spectrum between headline and supporting line, counted in the fit)
- Fixes after looking:
  - Cropped solid medallions read as purple blobs → solids sit whole in the top-right.
  - Text overlapped the rising arch → the text box ends above the shape's measured top.
  - The single petal was flat lilac → it runs the full spectrum base to tip.
  - LinkedIn rise squeezed the text → it rearranges to fan right, text left.
  - LinkedIn bloom touched "Prism" → moved to 0.79 W.
  - Dividers were too small → 440 / 300 px.
- I built 16 and Malay rightly flagged that most repeated one idea. Kept one per distinct composition:
  - `prism-bloom`: centred lotus + divider
  - `prism-rise`: rising lotus fan + divider
  - `fam-approval`: whole quatrefoil + bead divider
  - `fam-slack`: arch rising from the strip
  - `fam-early`: a single spectrum petal + lotus divider
  - Plus the existing `prism-spectrum` (corner lotus).
  - Dropped: dark, tone-on-tone, number, launch, quote, event, three teasers, star, ogee.
- Lesson: "do all of it" still means distinct. Build variety in composition, not repeats of one layout.
- QA PASS for the whole set. Sheet: `process/screens/banners-simple/spectrum-family.png`.

## 2026-11-04 — Spectrum family trimmed
- Prompt (verbatim): "remove prism, bloom, fam approval, fam, slack, fam ally." (read as prism-bloom, fam-approval, fam-slack, fam-early)
- Removed those four briefs and their PNGs. Spectrum banners left: `prism-spectrum` (corner lotus) and `prism-rise` (rising fan). The engine options (ornaments, placements, dividers) stay available.

## 2026-11-04 — Prism rise: sunrise horizon; dividers above the title
- Prompts (verbatim): "in Prism Rise have a horizon gradient wherever it looks best, either from top to bottom or bottom to top, only halfway through, wherever you think is best." · "Also the dividers should always be above the text content like they should be above the title."
- Choice: **bottom**. The lotus already rises from the bottom edge, so the Sun gradient entering from below reads as a sunrise behind it. The text stays on the calm upper half.
- Build: `horizon` reuses the /system hero's `--gradient-sun` disc (1622 × 872 proportions, widened 1.35× like the hero), mirrored, with its centre on the bottom edge, so the arc reaches about half the frame.
- After looking: the spectrum strip sank into the orange and its orange end vanished, so a bottom horizon now replaces the strip.
- Dividers moved above the headline everywhere, as a rule in banner-builder.md. QA PASS, prism-rise and prism-spectrum re-exported.

## 2026-11-04 — Horizon: flatter, smoother, calmer
- Prompt (verbatim): "but less curvy, with very well-blended colours, and less saturated"
- Replaced the hero Sun disc with a dedicated horizon:
  - a radial ellipse ~2.6× the frame width (an almost flat arc), 55% of the frame tall
  - interpolated in OKLab with 7 stops
  - every sampled Sun stop mixed ~35% toward white (#f9730c → #f6a96e, #bfc9f1 → #d8d6ee)
- Bug found by looking: the first export showed no horizon. `in oklab` was placed before the shape, which is invalid CSS, so the browser dropped the gradient silently. Fixed: `radial-gradient(ellipse … at … in oklab, …)`.
- QA PASS, re-exported.

## 2026-11-04 — One message per banner; every preset on /banners; product arch without the card
- Prompts (verbatim): "every banner should have different content. Also on the banners page, show each and every variation that you have in the preset so I can look into it. Not like colours and all those. I meant presets." · "Remove the product one. I don't like it." → "I like the design of the idea of the product one though so remove the inner cards only."
- Different copy for each Prism banner (facts from the X post only):
  - prism: "Sarvam Prism" / "Fast, accurate decisions in 44 ms"
  - prism-spectrum: "Fast, accurate decisions" / "Sarvam Prism, across enterprise workflows"
  - prism-type: "Built on Sarvam 105B" / "Sarvam Prism, a System One model"
  - prism-rise: "71.8" / "Highest average score among decision models under 100 ms" (keeps the under-100 ms qualifier)
- New presets so the newer looks are reusable:
  - `spectrum`: solid lotus corner — "Work that runs on schedule"
  - `sunrise`: rising lotus + horizon + divider — "Research, built in"
  - Both use Indus Cowork facts not used elsewhere.
- /banners now has a **Presets** section: all 14 presets, each shown as its Meta + LinkedIn pair with device and shape (`process/screens/banners-simple/presets-page.png`).
- Found and fixed: the `product` preset had been dropped by accident in the spectrum-family commit (05ccb5c); restored.
- Product: the arch window keeps its design; the product card inside is now optional and off, so it's a lit, empty doorway.
- QA: set + 28 preset renders PASS.

## 2026-11-04 — LinkedIn headlines: two lines, at full size
- Prompts (verbatim): [event + capability preset screenshots] "in this the landscape ones should have only the title in two lines." → "The text should not get smaller. It should be visually proper only."
- Rule: LinkedIn headlines ≤ 2 lines in every layout (Meta ≤ 3).
- My first fix let the type step down to fit two lines. Malay rejected it: the type shrank (event 100 → 86px, capability → 86px, product 64px, slack 55px).
- Second fix — make room, don't shrink:
  - The LinkedIn split text column went from 47% to 56%.
  - The gloss clusters moved outward (text box 480 → 620px).
  - The LinkedIn gateway grew (0.5 W → 0.6 W, 0.86 H → 0.94 H).
  - The Meta script mandala keeps one ring and a 0.76 R disc, with the wordmark moved to the top.
  - Copy that was simply too long for two lines was shortened, still using voice.md facts:
    - "Message it like a colleague"
    - "It plans the work first"
    - "Your colleague in Slack"
    - "Shipping faster, together"
    - sovereign: "Sarvam's own models" / "Indus Cowork, with data residency in India"
- QA now enforces it: the headline is ≤ 2 lines on LinkedIn and set at ≥ 72px (LinkedIn) / 96px (Meta). Otherwise it fails with "shorten the copy, don't shrink the type".
- Result: all 13 presets × 2 formats + the full set PASS; the set is re-exported.

## 2026-11-04 — Prism: Eight-point star, same object in both formats
- Prompt (verbatim): "use a different type of pattern, the same in portrait and landscape, for this one." (screenshot: prism, Cusped window)
- Shape: Cusped window → **Eight-point star**, the one glow medallion not used elsewhere in the set.
- New `whole` option for medallion-glow: on LinkedIn the shape no longer bleeds off the frame (it was cropped to ~70% of its height), so it reads as the same object on both formats.
- First try fitted the whole star inside the frame. The LinkedIn headline fell to 59px (QA fail, min 72). Scaled to 1.12 H instead: only the top and bottom tips touch the edges, and the headline is back above 72px. QA PASS, re-exported.

## 2026-11-04 — your-yes: portrait version, logomark above the shape, two-line title
- Prompts (verbatim): "show me the portrait version of this." · "Imported. Keep the Sarvam logo out of the pattern." · "Like at the top" · "If possible try to make the title a two-liner." · "Don't change the pattern. The pattern was good."
- Added a Meta portrait to `your-yes`. The logomark moved out of the shape to the top centre. The title is forced to two lines ("Nothing ships / without your yes"). The shape stays the Ogee cross. (While Malay was replying I briefly tested Quatrefoil and Scalloped; both were reverted.)
- Open: on portrait the Ogee cross's core is narrow, so the two-line title sets at 63px, under the 96px Meta minimum (QA flags it). LinkedIn passes at full size.

## 2026-11-04 — your-yes portrait: bigger title, same shape
- Prompts (verbatim): "increase the text size of the title in the portrait one. It looks kind of smaller." → "Why increase the pattern size? Increase the text size."
- First I grew the shape (side points to the frame edge) and tried wider text boxes. Malay rejected that: the pattern should stay, and only the text should grow. Both were reverted.
- New `titleSize` option: it sets the headline size directly, and the text box widens around it.
  - 96px: "w" and "s" landed on the gold glow band, lowering the contrast.
  - Settled at **88px** (from 63px): every glyph sits on the green core.
- QA flags 88 < 96 (Meta minimum) for this banner. That's accepted as a by-eye exception, the most the shape allows.
- Follow-up (verbatim): "Increase the size of the description text size in portrait by a bit." → new `lineSize` option; the portrait supporting line is now 32px (was 28px). It stays on one line inside the green core.

## 2026-11-04 — Program preset gets the partner lockup
- Prompt (verbatim): [program preset screenshot] "Have that partner thing in this."
- `program` now uses `partner: "Partner"`, giving the `sarvam · PARTNER` lockup (wordmark only, per logo.md) top-left on LinkedIn and top-centre on Meta. "Partner" is a placeholder for the real partner name. QA PASS in both formats.

## 2026-11-04 — Prism: logomark above the star
- Prompt (verbatim): [meta-prism screenshot] "In these have that Sarvam spiral logo out of the pattern on top. Don't change anything else in both landscape and portrait."
- `prism` now has the logomark at the top, outside the star. Nothing else changed.
- After looking: the logo rendered black (the dawn ground counts as light) → new `logoTone: "white"`. On LinkedIn the star fills the top centre, so a centred logo landed inside the pattern → new `logoLeftOnLinkedIn`, which puts it top-left at the margin. QA PASS, re-exported.

## 2026-11-04 — Prism LinkedIn: logomark inside the star, above the title
- Prompts (verbatim): "in landscape put it in the pattern only. Just about the title" → "Shift it a little bit upward." → "You know what you can do to fit it? Increase the size of the pattern in the landscape only, then fix the logo. It will be fitted perfectly."
- New `markOnLinkedIn` option: LinkedIn puts the logomark inside the star above the title; Meta keeps it above the star.
- With the logo inside, the title shrank (79 → 68px). I first patched it with a forced size, a forced line break and an upward nudge (the new `titleSize` and `textShift` options, plus a taller box for forced sizes).
- Malay's better fix: grow the star on LinkedIn only (new `landScale`, 1.12 → 1.4 × frame height). The opening grows, and the logo + two-line title + line fit at full size with no overrides, so the patches were removed from this banner. QA PASS.
- Follow-up (verbatim): "go back to the original size of the pattern." → `landScale` removed, so the star is back to 1.12 × the frame height. The title is pinned at 79px (`titleSize`) and the block is nudged up 28px (`textShift`), so the logo, the two-line title and the line all sit inside the star. QA PASS, re-exported.

## 2026-11-04 — Final banner set chosen
- Prompt (verbatim): [4 screenshots: program preset, meta-prism, linkedin-prism, capability preset] "take these as our final banners in the folder."
- Final set: 3 subjects × 2 formats, in `banners/final/` (numbered, renamed, with a README):
  1. Sarvam Prism
  2. Every task leaves a trail (capability preset, saved as brief `final-trail`)
  3. Indus Cowork early access with the partner lockup (program preset, saved as brief `final-early-access`)
- All six pass check-banners.

## 2026-11-04 — Repo published
- Prompts (verbatim): "is a reference folder needed for the assignment?" → "okay do the necessary changes and then create a repo, make it public, and push the code."
- Sarvam's own images (`references/brand/`, `references/site/`, `references/social/*.png`, 51 MB) are now git-ignored and purged from every commit (`git filter-branch`), so the public repo never contains them. They stay on disk as research. `brand-findings.md`, the social README and the extracted CSS text stay public as provenance.
- The rewrite also deleted the local copies; they were restored from the `backup/pre-public` branch.
- `main` fast-forwarded to `design-system`. Public repo: https://github.com/Malay146/sarvam-ai-internship-assignment (default branch `main`).

## 2026-11-04 — Expressions page rebuilt
- Prompt (verbatim): "improve the expression section. It is too simple and quite bad. Improve it."
- Problems with the old page:
  - Three narrow columns of legacy hand-built samples, including the soft cloud device we had removed.
  - A four-row rule list.
  - Nothing tied it to the banners we actually ship.
- New page (`/system/expressions`), with every artboard a live render from the banner engine:
  1. **Intro + index** (01 Campaign / 02 Product / 03 Community), with anchor links.
  2. **One band per expression:**
     - Left: the name and line, then "Use it for", surface swatches, hero devices, and type / logo / energy.
     - Right: the expression's final banner as a Meta + LinkedIn pair at equal heights, plus "More in …" (three presets showing its range).
     - Phone and tablet order: heading → banners → details. Desktop: two columns.
  3. **The test:** one message ("Indus Cowork early access") rendered as Campaign / Product / Community side by side.
  4. **The contract:** six things that never change (wordmark, type, headline, shapes, finish, spacing).
- `expressions.md` §2 was rewritten to match what the engine does: engine device names, the final-set banner and presets per expression, and the cloud removed.
- QA: check-layout PASS at 10 widths; no overflow in Chromium or WebKit at 375 / 768 / 1440. On tablet the swatches were oversized, so they're capped at 112px.
- Screens: `process/screens/expressions/`.

## 2026-11-04 — Docs and skills synced with the engine
- Prompt (verbatim): "are all the files and skill files updated?"
- An audit found stale banner guidance written before the engine. Fixed:
  - `meta-banner.md` and `linkedin-banner.md` were rewritten as per-format grids: margins, clear space, logo sizes, type bases, minimums and line caps, how each layout rearranges, and the final set. Gone: square, eyebrows, mono, cloud, and the old template components.
  - typography.md §5, logo.md banner placement and voice.md §7 (banner = two text sections, nothing else) now match the engine.
  - tokens.md: `--color-cloud` marked as retired for banners.
  - banner-builder.md:
    - the spec lists every option, including the per-banner fine-tuning fields
    - the presets table includes product, spectrum and sunrise
    - the method has a "calm launch" row
    - a §3b final-set table
    - rule order fixed; no "cloud"
  - sarvam-banner skill: all presets, expressions, the 96 / 72px and 2-line rules, the fine-tuning fields, how to add new facts, and `banners/final/`.
  - SKILL.md routing descriptions and the CLAUDE.md checklist (banners done, repo public) are updated. design.md rebuilt.

## 2026-11-04 · Claude Code · Stronger grain on the footer CTA

**Prompt:** "have like a stronger and good quality grain in this footer cta"

**Out:** The existing `--texture-grain` is white-only noise at 22% alpha. Under `overlay` on the near-black night gradient it barely showed. Added a `--texture-grain-strong` token: greyscale fractal noise (baseFrequency .95, 2 octaves), contrast boosted so it has both dark and light specks, full alpha, 200px tile drawn at 1:1 so the specks stay crisp. It goes on `.sr-cta::after` with `overlay` at 22% opacity (first tried 50%, which Malay found too strong, then 35% and 30%), painted above the gradient and lattice and below the text, so the headline stays sharp.

**Why:** Grain on dark surfaces needs dark and light values to read. A white-only overlay only lifts the midtones.

## 2026-11-04 · Claude Code · FAQ motion

**Prompt:** "faqs should have motion"

**Out:** Only the chevron moved before; the answer appeared and vanished in one frame. The FAQ keeps native `<details>` (it works without JS and is accessible) and adds CSS motion. `::details-content` animates from height 0 to auto through `interpolate-size: allow-keywords` (300ms, emphasized ease), and `content-visibility` flips discretely at the end, so closing animates too. The answer fades in and rises 8px; `@starting-style` gives it a start frame on open. Measured in Chromium: the row height eases 64 → 136px on open and back down on close. Browsers without `interpolate-size` snap the height but keep the fade. All of it is off under reduced motion.

**Why:** A JS height-measure accordion would animate in every browser, but it costs the no-JS fallback. Progressive CSS was the cleaner trade.

## 2026-11-04 · Claude Code · FAQ rebuilt on Motion

**Prompt:** "use motion from react/motion, and give it a proper animation of closing and openining"

**Out:** Replaced the CSS-only `<details>` motion. That version only animated height in Chromium. The FAQ is now a client component, `faq.tsx`, using `motion/react` and the shared `EASE`/`DUR` tokens from `motion.ts`. Open and close are choreographed separately. On open, the height eases to auto (500ms, out-quint) while the answer fades in, rises 8px and un-blurs, 80ms behind the height. On close, the text fades out first (150ms), then the height collapses (300ms, emphasized ease). The chevron rotates with Motion. Accessibility: a button with `aria-expanded`/`aria-controls` inside an `h3`, and the answer is a labelled region. Measured: open 64 → 136px and close 136 → 64px, both smooth, no console errors.

**Why:** Motion animates height to auto in every browser and lets open and close have different timing. Collapsing before the text has faded looks clipped. The trade-off is that the FAQ now needs JS.

## 2026-11-04 · Claude Code · Glow art: from flat outline to lit glass

**Prompt:** "I have provided you with two sets of images. The first is of Sarvam AI and the other one is ours. Ours looks too plain and like there is nothing at all. Try to improve it: design style and all that, inner shadow, gradient, masking, colours, etc." (Reference: Sarvam's deep red icon tile with a frosted lotus. Ours: a pale rose GlowCard with a white outline flower.)

**Out:** Rebuilt `glowSVG` (crisp style) in `src/lib/shapes.ts`. Card: saturated ramp gradient (for rose: red-400 → red-300 → red-200), plus a radial centre bloom (50 step) and an edge vignette in the deep step (600–700), so the card is lit from the middle like Sarvam's. Shape, as frosted glass: a halo behind it, a faint white sheen fill, and two clipped blurred strokes inside the outline (a deep-tone inner shadow nudged up-left, a white inner highlight nudged down-right) for the bevel, then a thin rim gradient that is brighter at the bottom. Grain is raised slightly. Palettes gained `deep` and `bloom`, both from brand ramps only.

**Iteration:** The first pass made the interiors milky white: halo 0.4, bloom 0.6, sheen 0.34. Cut them to 0.22 / 0.42 / 0.24 so the card colour shows through the glass, as in the reference.

**Applies to:** GlowCard headers, deployment TileCards, and Studio's glow render.

**Rejected, then redone (same day):** Malay: "no it looks just bad. The previous one was better. Try to make it like a glossy effect." Then: "Like a knot area, try to make it realistic, like the light coming from the bottom left, something like that." I reverted the saturated, vignetted card to the previous pastel cards. "Knot" was most likely "knob", so I relit the shape as a glossy object with one light source at the bottom-left: a lamp glow in that corner of the card; a glass body bright at bottom-left that fades toward top-right; a white inner highlight on the bottom-left edges; an inner shadow on the top-right edges in a new per-palette `shade` colour (one ramp step deeper); a specular hotspot low-left; a rim fading from white; and a drop shadow cast up-right. **Lesson:** a heavier, darker treatment read as "bad" here. The gloss works because it keeps the light pastel card and adds one consistent light direction.

**Dropped:** Malay: "Remove it. I don't like it." Reverted `glowSVG` and imagery.md to the original pastel glow (white rim on a light ramp card). The original stays. Neither the saturated vignette nor the bottom-left-lit gloss beat it.

**Follow-up:** "try to use slightly darker colours in the gradient, coming from the top to the bottom very slightly." Moved the glow card gradients one ramp step deeper at the top, so each card darkens gently from bottom to top. Lavender: indigo-300 → blend → blend (it used to dip darker in the middle). Rose: blends a step deeper than red-300 → pink-200. Leaf: green-400 → 300 → 200. Marigold: yellow-400 → 300 → 200. Dusk is unchanged. The outline and glow render are untouched.

**Follow-up:** "make the strokes of the petals and the centre pattern slightly thicker." In the crisp glow render: rim 1.6 → 2.2 → 3, inner white edge 2.4 → 3.2 → 4.2 (half of it shows, because it is clipped inside the shape), soft outer glow stroke 4 → 5 → 6.5. Malay asked for "more thicker" after the first bump. All in canvas units, so the stroke stays the same visual weight whatever the shape's scale.

**Follow-up:** "now the sticker stroke also has a gradient similar to its background, from darker to light, but in a slightly stronger way, very slightly." Rim gradients now run from a light tint of the card's own ramp at the top to white at the bottom: lavender indigo-100, rose red-100, leaf green-100, marigold yellow-100. So the stroke darkens toward the top like its card, a little more strongly. The clipped inner edge also uses the rim gradient now (it was flat white), otherwise it hid the gradient. Lavender loses its old pink-to-blue rim for consistency; lavender started at indigo-200, which melted into the card at the top, so it moved to indigo-100. Dusk is unchanged.

**Follow-up:** "stronger than the background. Darker colours from the top and slightly lighter colour at the bottom. Also one more stroke attached to it, which will have a gradient too, but it will be from the bottom left to the top right, like a white-to-transparent thing." The rim is now a coloured edge with a stronger fall-off than its card: lavender indigo-600 → 300, rose red-400 → red-200, leaf green-600 → 300, marigold orange-700 → yellow-400. A second stroke sits just inside it (6 wide, clipped, so 3 shows): white at the bottom-left fading to clear at the top-right. Together they read like the cut edge of a sticker catching the light. The blurred outer glow follows the rim colours.

**Follow-up:** "no gap between two strokes and the one which has a stronger colour gradient should be thicker than the inner rim." Changed the draw order and the widths so the two strokes butt together. The white highlight now draws first: 7 wide, clipped inside, so it fills 0–3.5 inside the edge. The coloured rim draws on top of it: 4 wide, centred, so it covers 2 outside and 2 inside. Result: a 4-unit coloured rim, then 1.5 units of white highlight starting exactly where the rim ends, with no gap.

**Follow-up:** "now reduce the strongness of the inner rim gradient." White highlight gradient changed from opacity 1 → 0 to 0.65 → 0.15 (bottom-left → top-right). It is softer at the bright end and never vanishes completely at the far end.

**Follow-up (with a Sarvam reference: lavender tile, pink-to-violet scalloped rim):** "they are using a slightly different colour in the blue one so use that one." Lavender rim restored to Sarvam's two-hue edge, pink-300 `#e380a8` (top) → indigo-400 `#81a0e9` (bottom), instead of a single indigo ramp. Same stroke structure: 4-unit rim plus the white inner highlight.

**Follow-up:** "the centre area of the pattern … should be transparent. It should have that background's gradient shown." Removed the white sheen fill from the crisp glow render, so the inside of each shape now shows the card gradient directly. The shape is defined only by its coloured rim, the white inner highlight and the soft outer glow.

**Follow-up:** "in the background's gradient, I want to have a slightly lighter colour on the bottom side." Bottom stops lightened: lavender `#c3cff6` → indigo-200 `#d2dff9`, rose `#e99fb6` → pink-200 `#efabc5`, leaf `#c8e4b0` → `#d6ebc4` (between green-200 and 100), marigold `#ffe8b7` → yellow-100 `#fff0cf`. Top and middle stops are unchanged.

**Follow-up:** "very slightly stronger on the top side and very slightly lighter on the bottom." Each card's top stop moved about 5% deeper and its bottom stop about 5% lighter (blends toward the next ramp step): lavender `#9db7ef` → `#dae5fa`, rose `#cc5844` → `#f2b8cd`, leaf `#88c350` → `#dcefcc`, marigold `#feb33a` → `#fff4da`. Middle stops are unchanged.

**Follow-up:** "I want you to have an inner shadow on the overall card, which would be in the light colour." Added a light inner shadow to the glow card: a blurred stroke on the card's edge, with the half outside the canvas cut off, so a soft light band runs inside every edge. Each palette gained an `inner` colour, its ramp's 50 step (lavender indigo-50, rose pink-50, leaf green-50, marigold yellow-50; dusk indigo-100). First pass (width 18, blur 6, opacity 0.75) read as fog that ate the card; tightened to width 9, blur 3, opacity 0.7. Now it reads as a pillowy lit edge, as on Sarvam's tiles. It also shows on the 64–80px deployment tiles.

**Follow-up:** "Slightly less strong, more professional, and covering properly, it will be subtle. And it should be blended quite well. The corners are also not covering properly. Fix it." Cause of the corner problem: the inner shadow was a square-edged SVG stroke, and the container's border-radius clipped it away at the corners. Moved it out of the SVG into CSS. `.sr-card__glow::after` is an inset box-shadow (20px blur, 2px spread, white) plus a 1px white hairline, blended with `mix-blend-mode: soft-light` so it becomes a lighter shade of each card's own hue instead of a white haze. It follows `border-radius`, so the corners are covered evenly. Tiles get a smaller version (10px blur, 28% white) on their existing `::after`. Removed the per-palette `inner` colours, which are no longer needed.

**Follow-up:** "the inner rim gradient should be from a light colour to transparent. Also the outer card's inner shadow should be visible. Right now it is not visible." (1) The inner highlight is now each palette's 50-step tint (new `light` field: indigo-50, red-50, green-50, yellow-50, orange-100 for dusk), running from full at the bottom-left to fully transparent at the top-right. (2) The soft-light blend made the card inner shadow nearly invisible on mid-tone cards. It is now a normal-blend token, `--shadow-glow-inset` (18px white band at 45% plus a 35% hairline; `-sm` version for tiles), applied on `::after` overlays for `.sr-card__glow`, `.sr-tile` and Studio's `.st-card--glow`. Studio's glow card had no inner shadow at all, which is probably the view in Malay's screenshot.

**Follow-up:** "it is blended too well so that I can't see the white glow. Fix it. Also I want you to have an inner shadow in the pattern, maybe black or white … it should be subtle." (1) Card inner glow raised: `--shadow-glow-inset` is now a 22px blur with 2px spread at 62% white plus a 55% hairline (tiles: 12px/1px at 58% plus a 50% hairline). (2) Tried a dark inner shadow inside the shape, not white: white would merge with the light highlight that is already there. It is ink `#1e2033` at 16%, a 12-unit stroke clipped inside the edge, 3-unit blur, nudged 1.2 down so it is slightly heavier under the top edge. It sits beneath the highlight and the rim, so the shape reads as gently pressed into the card while the centre stays transparent.

**Follow-up:** "remove the pattern inner shadow." Removed the dark inner shadow inside the shape. The card inner glow stays.

## 2026-11-04 — Indus Cowork landing page, round 1
- Prompts (verbatim): "Are you able to create the indus cowork page professionally … Don't do anything, just tell me." → "it should feel close to sarvam ai, not to sarvam's own indus cowork page, use your own creativity and all that. Try to add things, which are needed, like integration, testimonials and all that, or according to the Sarvam design sensors, all that. Try to build it. Also, try to use motion where needed."
- Direction: follow the rhythm of sarvam.ai's **homepage** (Sun hero, a marquee under it, a big product stage, centred chapters, pillars, deployment cards, a customer quote, a night CTA), told for one product. It is not a reskin of /indus-cowork.
- Sections, each with its expression named in a code comment:
  1. hero with the Sun, the line motif, a pill and the live CoworkDashboard
  2. connector marquee
  3. "How it works" stage: plan / research / improve, auto-advancing with a progress bar
  4. six building blocks
  5. integrations directory (Productivity / Data / Engineering / And more)
  6. skills, with a skill card whose steps write in
  7. live schedule dashboard
  8. three steps
  9. a roles stage with a message thread and an "Approve" moment
  10. Sovereign by default + four security cards
  11. deployment tiles
  12. customer quote
  13. FAQ
  14. night CTA
  15. footer
- Honesty calls:
  - Connectors appear as names with monograms, never third-party logos.
  - The only testimonial is Tata Capital's real quote from sarvam.ai, headed "What Sarvam's customers say", because it is about Sarvam, not Indus Cowork.
  - No customer-logo wall (none verified for Cowork); no invented numbers.
  - The role request lines inside the mock threads are illustrative UI text.
- Motion (new `src/components/sarvam/cowork.tsx`):
  - Reveal: 12px rise + fade, once
  - Marquee: CSS transform loop, paused off-screen and on hover
  - Stage: all panels share one grid cell, so switching never moves the page; it crossfades, auto-advances only while visible, and stops once the reader picks a tab; the rail scrolls to keep the active tab in view
  - SkillCard: steps write in once
  - Everything is static under reduced motion.
- Fixes found by looking / QA:
  - At 375 the page overflowed by 77px. Three causes: the hero column grew to the dashboard's swipe row; grid tracks sized to the mocks; a place-items cell sized to content. Fixed with min-width 0 and minmax(0, 1fr) tracks.
  - The hero dashboard was framed twice → the extra frame was removed.
  - Phone and tablet tabs were truncated ("Plans the …") → they size to their labels and the rail scrolls edge to edge.
  - The security cards broke unevenly (1 vs 2 lines) → copy evened out and the line capped at 40ch.
- QA:
  - check-layout PASS at all 10 widths; check-nav PASS.
  - No section or page height change over 10s while animating.
  - Ongoing layout only inside the plan / research / review mocks (~2ms/s).
  - No overflow or errors in Chromium or WebKit at 375 / 768 / 1440.
  - A production `next build` of a clean checkout passes.
- Known, not fixed here: on the shared ScheduleDashboard the 17:00 / 18:00 timeline labels nearly touch at ≤768. The component has uncommitted edits by someone else, so it was left alone.
- Screens: `process/screens/landing/landing-r1-{375,768,1440}.png`.

## 2026-11-04 — Indus Cowork landing page, rounds 2–4 (summary)
- Prompts (verbatim, in order): "in this have like 4 cards…" · "remove patter and gradient…" · "Okay, so what I want you to do is that keep notes of everything what we have done… build the whole landing page again but in our style." · "the subject is sarvam indus cowork only, just get the information from their page, but build the sections and all that in our way" · "less user interactivities will be there also… In the hero section, I want that our title and below dashboard thing." · "It's okay to have some sections to be similar as them because your hierarchy and structure are not proper at all." · then many section-level notes, ending with "update all the files and rules accordingly and properly".
- Round 2: real brand marks (Simple Icons CC0 + Nucleo Slack + Canva/Apify/DataRobot from their own sites), bento, toned tabs, step visuals, mega nav, filled icons.
- Round 3 (v2): our own interactive sections — rejected for losing the hierarchy.
- Round 4 (v3, current): a story order (promise → how → why → made of → where → control → try → trust → proof → questions → act); proven sections (how-it-works stage, bento) kept, mixed with ours (contrast, integrations grid, approval desk + activity trail, day timeline, teammate builder, one-open FAQ).
- Fixes along the way: indigo hero glow (no visible ring), no blank states (in-place row states, pre-filled logs, timelines show every card), dots on the rail, sliding segmented pill, fieldset legend on the border → div, patterns tried then removed, gradient icons without tiles, softer shadows, grain token 0.22 → 0.30.
- Every rule is recorded in  §0 (34 rules) so the next page needs no correction rounds; components.md updated for icons, brand marks, MegaNav, Stage.

## 2026-11-04 — MegaNav direction-aware hover
- Tool: Claude Code (Opus 5.5).
- Prompts (verbatim): "make the navbar direction aware thing" · then "direction aware thing on hover".
- First read: hide the bar on scroll down and show it on scroll up. Built it, then reverted it once the second prompt made clear the ask was about hover.
- What came out: one shared pill behind the desktop links slides between them (x + width), and the panel content slides in from the side the pointer moved toward.
- What changed and why:
  - First version used Motion `layoutId` with a pill per link. Mid-slide the shared-layout crossfade dropped the pill to about 0.3 opacity, so it flickered. Replaced it with one measured pill (`offsetLeft` / `offsetWidth`) that animates x and width at full opacity.
  - The pill fades only when it first appears or when the pointer leaves the links. Between links it only slides.
- QA: Playwright hover pass at 1440 with the pill matching each button's x and width (±1px), mid-slide opacity 1, opacity 0 after leaving, no page errors. tsc clean.

## 2026-11-04 · Claude Code · Landing page footer (rounds 5+)

- Prompts (verbatim, in order): "improve the footer, make it more professiona, and modern,yet keeping it minimal and sarvam, have that sarvam name belwo footer and like gradients and all that things" · "have a gradient to the footer bottom to top or like 75%, with a multi color and beautiful colors well blended and subtle one" · "improve this have filled icons and maybe colors" (trust badges) · "make the footer gradient stronger" · "remove the gradient from the sarvam logo, and increase the satrureation of footer gradient by a bitt" · "remove shadow from logo" · "make the footer gradient reach like 85%" · "make it like 95%" · "have gradient on each char of logo, ane inner shadow of light…" · "and outer shadow too" · "make the sarvam logo submerged belwo and increase the size by a bit, and reduce the opacity of outer shadow" · "haev this place somewhat properly, this looks odd" (© row) · "it is submerged too deep" · "there are 2 dividers need only one" · "increase the size of the sarvam logo" · "95% of logo should be visible…" → 3% → 7% → 10% · "for now remove gradient from the logo and have a very simple gray one" · "like gray to white" · "bottom to top" · "reduce the opaticy of both" · "have inner subtle white shadows" · "have outer shadow to make it slightly 3d, and subtle not to much spread and blur" · "reduce the opacituy of gradient by a bit" · "make the outer shadow more subtle and slightly reduce opacity too"
- What came out (current):
  - A spectrum wash stacked bottom → top (saffron, peach, blush, lilac, periwinkle; OKLab), fading out at 95% of the footer height, with grain on top.
  - Trust badges: a filled glyph in its own brand hue on a soft tint (ISO indigo, SOC 2 green, residency orange).
  - The © and address row sits under the trust/legal row, with one hairline above both.
  - The giant wordmark is the official path inline, at the full container width, with its lower 10% submerged. Fill is grey → white bottom to top at 40% opacity, with a subtle inner white edge and a tight, faint outer shadow for a slight 3D lift.
- What changed and why:
  - The logo gradient went through several versions: a spectrum fill, then plain white, then per-letter hues, then the current grey → white. Malay settled on a quieter mark. This is recorded as the one exception in logo.md rule 4.
  - The drop shadow is built from a solid copy of the shape and cut away under the letters, so the semi-transparent fill doesn't show a dark shadow through it.
  - A filter on a CSS-masked element is masked away, so the wordmark became an inline SVG (official path, unchanged).
  - The © row floated alone in the wash, so it moved into the meta block. The second divider was dropped.
- QA: check-layout 10/10 widths after each round. Chromium and WebKit screenshots of the wordmark filters.

## 2026-11-04 · Claude Code (Opus 5.5) · Mobile pass, round 1: hero dashboard

- Prompt (verbatim): "hey, i think we need to improve the mobile version of landing page, starting with hero section dashboard, make main point is that user shouldn't need to like scroll horizontally, and everything should fit properly like not stacked and text broken in 2 lines, etc, try to do that and fix the hero section dashbaord first"
- What we found at 375: the body grid used a `1fr` track, so the teammate swipe row's min-content (1266px) pushed the detail panel to 600px wide inside a ~300px frame. The task title, summary, table and footer were all clipped on the right. The teammate list itself was a sideways swipe. The sidebar header stacked onto two lines. The three-column result table truncated every action.
- What changed (CoworkDashboard, `dashboards.tsx` + `dashboards.css`):
  - Track is now `minmax(0, 1fr)`. Layout below 1024 is keyed to the dashboard's own width with container queries, so in-between widths get the layout that fits them.
  - Teammates, < 520px wide: one row of six icon tiles with a status dot. Names stay as accessible text and in `title`. Under 300px (320 phones) the tiles go 3 × 2 so taps stay at least 44px. From 520px to 1023px: a 2-column named grid. Desktop sidebar unchanged.
  - Detail head on phone: name plus a short status ("Needs you" for "Needs your yes") on one row. Run now moved to the footer as an icon button beside a full-width Approve. The meta line is hidden on phone.
  - Result table on phone: each row reads "name · value" with the action underneath. No header, no truncation.
  - Sidebar header is one row below 1024 ("Your" dropped under 300px). The two-line stack is kept only for the narrow desktop sidebar.
  - Detail heights (640 tablet, 660 phone, 700 under 300px) are sized so no teammate needs inner scrolling.
- QA: Playwright at 320/375/414/600/768/900/1024/1440, clicking every teammate. Stage overflow is 0 for all six teammates below 1024. No page overflow. check-layout PASS at all 10 widths.
- Still open: at 1024+ the stage scrolls 36px for five of the six teammates. This was already the case before this round.

## 2026-11-04 · Claude Code · Bulbul V4 Flash page (`/bulbul`): the consistency test

- Prompts (verbatim, in order): "now what i want to do is that create a page /whatever you want, choose a subject from sarvam, understand and gather information from it, and genareta a full landing page, a new one new creativity, try to make it as sarvam as possible and beauitful, make sure evertghing is conisistent, understandable and visually apealling and not too cluttered, make sure everythign is aligned properly … do your best, go all out" · "use pattersns, cards, or logos, etc, but make sure accordingly and not too much and make it look good" · "basically this is going to be a testing page to me check how consistent you are" · "ya but gradient thing should be like differnt know so we know the theme is different for bulbul" · "not everything section should feel like indus page, it should have its own theme like bulbul"
- Research:
  - Sources: sarvam.ai/apis/text-to-speech, sarvam.ai/models, the docs.sarvam.ai TTS reference and the voices guide.
  - Facts went into voice.md §5 first (Bulbul fact sheet), including the source conflicts. Pitch and loudness are V2 only per the docs. The API field is `language_code`, not `target_language_code`. The Kalpit and Ishita language pairings differ between the page and the docs.
- What came out, round 1:
  - The playbook followed as written: centred hero + product UI, split/centred header rhythm, real assets (official Python and Node.js marks, Nucleo icons), 8 FAQs and one CTA.
  - Too many sections reused Cowork's formats: bento tiles, the integrations panel and the deployment tiles.
- What changed and why:
  1. **Theme.** Each product page now owns one of Sarvam's lights. Bulbul has **Dawn**: hero light, saffron accent rings, the Dusk closing card and saffron fact icons.
  2. **Bulbul's own formats** replace the Cowork ones: tracklist, chorus band, ripple stage (Sarvam's medallion as sound rings), multitrack with a playhead, and doors.
  3. A class collision (`bb-track` was used by both the pace slider and the tracklist) was caught in a screenshot and renamed (`bb-trk`).
- New rule: landing-page.md 9a, "each product page owns a theme and its own formats". Recipe: recipes/bulbul-page.md.
- QA:
  - check-layout 10/10 widths and check-nav pass.
  - No overflow and no page errors in Chromium or WebKit at 375 / 768 / 1440.
  - Playground interactions scripted (voice, pace, rate, format, tab → code updated).
  - `next build` passes.

## 2026-11-04 · Claude Code (Opus 5.5) · Mobile pass, round 2: dashboard desktop fix + How it works

- Prompt (verbatim): "yes and good, now go to next section how it works"
- Dashboard follow-up: the earlier `minmax(0, 1fr)` rule came after the desktop rule, so it would have overridden the 248px sidebar column. I moved it into the base rule instead. Desktop detail height went from 600 to 664px, so no teammate scrolls inside the panel at 1024 or 1440.
- What we found in How it works: below 1024 the tab rail scrolled sideways at every width. At 1024 the 3/12 side rail cut off "Waits for your yes". At 768 the two-column panel squeezed the checklist onto two lines per item and truncated the mock rows. At 320–375 the mocks broke: plan steps truncated, research source titles wrapped into their URLs, the review card's Approve button spilled out, and the approval titles wrapped.
- What changed:
  - Rail: a 2 × 2 grid below 1280. No sideways scroll. When the rail is narrower than 560px, each tab shows an icon and a short label (new `tabShort`: Plans / Researches / Improves / Asks first). From 560px each tab shows its title and note. The side rail starts at 1280.
  - Panel on phone: a thinner frame, so the mock gets the width. From 768 to 1023: the visual sits on top, with the title and body on the left and the checklist on the right below it, so every check stays on one line. From 1024: text on the left, visual on the right. Panel titles use `text-wrap: balance`.
  - Mocks: container queries on each mock card. A narrow card drops decoration only (time stamps, favicons, status words, the arrow and the gate meta line) and never truncates content. Under 300px the approval queue shows a round check button instead of the worded pill.
  - Copy, written to fit the width: "Indian SaaS outlook 2026", "2 steps added to the plan", "Merge the pricing fix", "Pulls from connected apps", and "Needs your yes" / "Sends at 10:00" on the review gate. "Needs your yes" matches the dashboard's term.
- QA: a Playwright pass clicked every tab at 320 / 360 / 375 / 414 / 600 / 768 / 900 / 1024 / 1280 / 1440. No clipping or truncation in the visible panel at any width, and no page overflow. The only wraps left are panel headings (h3). check-layout PASS at 10/10 widths. tsc clean.

## 2026-11-04 · Claude Code · Bulbul page, refinement rounds (theme, playground, horizon)

- Prompts (verbatim, in order): "i see you using organe only, but by theme that now what i meant, i meant the strutcutre layout and how to presnt it, so use different colors also but accoridngly" · "improve this section the code is shorter and the card is bigger and improve it" · "this copy button is not working properly, fix it the animation part" · "now if i choose python then left side card is bigger, it should be conisistent fix it" · "this tilted icon is not looking good fix it" · "use different icon here" · "why in 4 lines, never go beyound 2 lines" · "don't change the text, increase the width simple" · "change the colors sets of hero section horizon" · "different set of colors it is too similar" · "have 2-3 different color well bleneded in it" · "ya but like top to bottom only, always keep in mind" · "have old one only, the yellowisg obe" · "good now update the rules and files accordingly an dproperly"
- What changed and why:
  1. **Theme is structure, not colour.** Indigo is back for controls; tones are given per item (tracklist rows, voice stage + ripple, fact and door icons).
  2. **Playground:**
     - A Response panel replays on every change (pace = clip length, sample rate = detail).
     - The code pane has one fixed height on every tab, so the cards stay equal (measured 657/657 on all tabs in Chromium and WebKit).
     - Long lines wrap.
     - Copy swaps icon + label without overlap at a fixed width, with a clipboard fallback. The inherited replay spin was removed.
  3. Link arrows are a plain → that slides on hover.
  4. The closing card keeps Sarvam's line at 2 lines at every width (320–1920): the title widens, balances and scales on phones.
  5. **Hero horizon:**
     - Tried: rose/lilac (too close to Cowork), three side-by-side lights (colours must stack vertically), a linear band (too strong).
     - Kept: the soft garden-sunrise radial (green core → marigold → cream).
- Rules recorded:
  - landing-page.md 9 (each page owns a hero light), 9a, 12 (gradients stack vertically), 19b–d (links, inherited hover, copy button), 22 (fixed-height tabbed panes), 33b (closing title ≤ 2 lines).
  - tokens.md §2.4c (page lights), imagery.md 2, components.md (CtaCard, Bulbul pieces), voice.md §6, SKILL.md.
  - bulbul-page.md §4 ("tried and rejected").
  - design.md regenerated.

## 2026-11-04 · Claude Code (Opus 5.5) · Mobile pass, round 3: every remaining section

- Prompt (verbatim): "yes and do all from now, do your best, go all out"
- Method: a page-wide Playwright audit (temporary script, kept out of the repo). Per section and per width (320 → 1440, 9 widths), it flagged sideways scrollers, clipped or truncated text, nowrap text overflowing its box, short labels that wrap, and elements past the viewport. Each section got a fix, a re-audit and a screenshot check. Interactive parts were clicked through: every Build role, every How-it-works tab, the mobile nav sheet with all groups open.
- Assistant vs teammate: the card label scales with its card (container units, 15–22px, measured at 12.3em), so "An Indus Cowork teammate" and "A chat assistant" both stay on one line at every width. Tighter card padding on phones.
- Building blocks (bento): the teammate roster spilled out of its card at 320, the schedule rows wrapped ("Cluster / check") and the skill footer wrapped. Changes: a tighter well on phones; one line per row; narrow cards trim gaps and pill widths; on the narrowest schedule card (the 1024 bento) the status dot steps out because the pill already shows the state. Copy: "Ready for 4 teammates".
- Integrations: a leftover phone rule had zeroed the panel's inline padding, so "100+" and the logos touched the edge. Padding restored. The logo grid is 6 across at every width: 4 even rows instead of 6 rows of scroll.
- Your yes (approval desk): the 148px of buttons forced every task title onto 2–3 lines. On narrow cards Approve becomes a round check button beside the send-back X, with an accessible label, and the result pills compact. Copy: "Send 31 emails", "Post the readout".
- A day with your teammate: below 1024 the stacked cards were already fine. At 1024–1279 the five columns were ~160px wide, so titles ran 1–3 lines. That range is now one timeline row per task (time · title · what lands · status). From 1280 it's five columns: titles reserve two balanced lines and pills sit on the bottom edge, so all five cards line up.
- Build a teammate: the CTA label ("Talk to us about this teammate") stretched the result card about 100px off-screen. The card track is now `minmax(0, 1fr)`, and on narrow cards the CTA reads "Talk to us". App tiles are their own containers: a narrow tile shows "Calendar / Sheets / Docs" (the Google mark carries the brand; the full name stays the accessible name). The rhythm control reads Daily / Weekly / On demand on narrow fields, and the full rhythm still shows in the card's Runs row. The role name sizes to the card (longest, "Product Performance", is 9.34em). The hint reads "up to 5". Verified for all five roles at 6 widths.
- Sovereign by default: on phones the icon sits beside the text, not above it, so the four facts and three deployment tiles take about half the scroll. Descriptions are capped at 32ch and balanced, so all four always take two lines (check-layout caught a 1/2/1/2 split at 414).
- Customer quote: 18px on phones (it ran 13 lines); the role line stays on one line.
- Hero CTAs: from 360px, two equal buttons side by side. Below 360, stacked at equal full width.
- Dashboard: the desktop sidebar went from 248px to 264px, so "Cluster Health Monitor" fits on one line. This was already the case before this round.
- Left as is: section H2s, FAQ questions, h3 panel titles and body paragraphs wrap naturally. The closing CTA's lattice bleeds past the card on purpose (decoration, clipped).
- QA: audit clean at 9 widths. check-layout PASS 10/10. check-nav PASS. tsc clean.

## 2026-11-04 · Claude Code (Opus 5.5) · Writing the responsive rules into the system

- Prompt (verbatim): "great, did you create proper files and rules for this responsive thing?"
- Honest answer at the time: no. Rounds 1–3 changed code and this log only. Worse, the docs still allowed swipe rows (layout.md §7.4) and said the tab rail and the dashboard list scroll sideways (components.md).
- What changed:
  - **layout.md:** Rules for AI 6–8 rewritten (no sideways scroll, ever; everything fits; check every state). §7.4 swipe rows replaced by "No sideways scroll". New §7.6, the fit ladder: rearrange → tighten → drop decoration → short label → fluid `cqi` size → rewrite copy, each with examples from the page, plus what may wrap and the accessibility rule for shortened labels. New §7.7, a container-threshold table per component. P2, P8, P10 and P11 updated to what's built. Test matrix §8.2 gains `check-fit` and a click-through of every state. New Do/Don't rows and Considered addition 7.
  - **components.md:** the Dashboards responsive table (by dashboard width), narrow product-mock rules, Stage below 1280 (2 × 2, `tabShort`), the How-it-works panel per tier, the TileCard phone row, and a new "Landing-page interactive pieces" entry (ApprovalDesk, DayScrubber, TeammateBuilder, IntegrationField, bento visuals, the vs labels).
  - **recipes/landing-page.md:** playbook 24 / 24b / 24c (no sideways scroll, the fit ladder, phone spacing tiers); the §2 responsive table rewritten per section; `check-fit` added to the done-gate.
  - **SKILL.md:** a Fit non-negotiable, and the QA step names `check-fit`. **CLAUDE.md:** Malay's fit rule in the working rules. design.md regenerated.
  - **scripts/check-fit.mjs (new):** the round-3 audit made permanent. It flags SIDEWAYS / CLIP / OVERFLOW / PAST-VIEWPORT as errors (exit 1) and wrapped short labels as warnings. It only counts text that actually crosses a box edge, skips decoration and visually hidden text, and lets deliberate two-line slots opt in with `data-may-wrap`. Landing page: all 9 widths fit. Sanity check on /bulbul at 375: it correctly fails on the sideways voice rail.
- Known gap: /bulbul breaks the new rule (sideways voice rail, recipes/bulbul-page.md). Flagged for the next pass.

## 2026-11-04 · Claude Code (Opus 5.5) · Bulbul page: the same responsive rules

- Prompt (verbatim): "apply that responsive rules on bulbul page"
- Start: `check-fit` on /bulbul found 16 errors and 39 warnings. The voice list was a sideways rail (SIDEWAYS at 320–600), voice and chip labels were clipped (320 / 600 / 1024), the voice id clipped at 320, tracklist tags and spoken readings wrapped (320 / 768), request-timeline labels wrapped at 320, and "Sample rate" split at 768.
- What changed:
  - **Voices:** the sideways rail is gone. Phones get 4 × 2 avatar tiles with the name under each; style and language live in the stage card. Narrow 2-up rows (the 1024 list) put style and language on their own lines. The stage card head became a grid (avatar beside name + status, then style · language). On the narrowest card the status shows as its dot, and the foot drops the duplicate language code.
  - **Playground:** chips go 4-up only when the control is ≥ 520px (container query, not viewport); chip labels never clip. On a narrow code card, Copy becomes an icon button. Phone padding tiers.
  - **Tracklist:** at 768–1023 there's no number column, so the clip gets 7/12. Clip rows stay on one line, and narrow clips drop the voice-style word. The reading example changed to "₹1,200 → बारह सौ रुपये": it fits, and it shows context reading better.
  - **Request timeline:** every step on one line; narrow cards read "Request", values at 11px, "in chunks".
  - **Studio:** a narrow settings column gives each field a full row. **Chorus:** language codes never split, and the code-mixed note is two deliberate lines on phones.
  - `check-fit` now treats `pre` code as may-wrap (code wraps by rule).
- Docs: recipes/bulbul-page.md §2 rewritten, plus two rejected-approach rows. components.md gets a "Fit on every width" entry for the Bulbul pieces. layout.md §7.7 gets the Bulbul container thresholds. design.md regenerated.
- QA: check-fit /bulbul and / at all 9 widths fit. check-layout 10/10 on both pages. All 8 voices, all 8 playground voice chips and all 10 segmented options clicked at 320–1280. The auto-playing studio, chorus and request timeline were watched through full cycles at 320 / 375 / 768 / 1024. tsc clean.

## 2026-11-04 · Claude Code · Document AI page (`/document-ai`)

- Prompt (verbatim): "what i want you to do is that create another landing page, find a subject from sarvam website, just like bulbul do a theme thing, make thing around that subject and create a professional and visually appealling landing page"
- **Subject:**
  - Document AI (sarvam.ai/products/doc-agents). Chosen over Sarvam Edge because documents give a strong, readable theme: paper and ink.
  - The Edge page also has a cloud-fallback inconsistency between its sections and its FAQ.
  - Facts went into voice.md §5 first.
- **Theme (rule 9a):** the structure is the theme. Sections:
  1. Workspace hero: scan → six layout boxes in reading order → Markdown output
  2. Plain OCR vs Document AI on the same page (Sarvam's four pain points)
  3. Parse / Extract / Translate as tabbed folders with format file chips
  4. Proofreading desk with visual grounding and an agent fix
  5. Type-specimen sheet of the 23 languages grouped by script
  6. Translated textbook page with four steps and limits
  7. Library index cards for the use cases
  8. API vs Platform
  9. FAQ (8)
  10. Closing card on the saffron-rose gradient turned upside down
- **Light:** seal ink (red-rose → blush → paper), unused by any other page. Colours stack vertically. Controls are indigo; one tone per element type throughout.
- **Fixes along the way:**
  - The layout boxes didn't line up with the page text, so each block is now positioned inside its own box.
  - The specimen sheet's last row had gaps, so a "Mixed pages" cell now completes it at every width.
  - Index-card titles had uneven line counts, so they are always 2 lines and the descriptions are ~66 characters.
  - The OCR tabs overlapped on phones, so they are a 2 × 2 grid there.
  - The comparison changed height between tabs (260–325px), so all states share one cell (now 277/325/558 at 1440/768/375 on every tab).
- **QA:**
  - check-layout 10/10 and check-nav pass.
  - No overflow or page errors in Chromium or WebKit at 375 / 768 / 1440.
  - Tabs and grounding clicked in a script.
  - `next build` passes.

## 2026-11-04 · Claude Code · Exports, before/after test, write-up

- Prompts (verbatim): "1. already done, do other rests, but before that i am kinda confused which to have it as our final deliverable webiste: cowork, bulbul or document-ai, help me with that" → final deliverable: **Indus Cowork** (same subject as the 6 banners; Bulbul and Document AI shown as system tests).
- **Exports:** `scripts/export-page.mjs` writes full-page PNGs at 375/768/1440 for all three pages. Reduced motion is on, so every section shows its finished state, and dev tooling is hidden.
- **Before/after:**
  - Setup: four fresh headless `claude -p` runs in empty folders. The without runs had the prompt only; the with runs also had `design-system/` and the official logos. No edits, no retries.
  - Without: generic output with an invented logo, invented data and a wrong CTA.
  - With: on-brand.
  - One drift: a soft banner glow, against rule 8, which only `check-banners.mjs` enforces.
  - Fix: the script-enforced banner rules were added to SKILL.md's non-negotiables.
  - Evidence and notes: `process/screens/before-after/`.
  - First draft of the notes wrongly called two outputs "drift" (the serif primary button, the sans banner headline). Both are allowed by the system, so the notes were corrected.
- **Write-up:** `process/writeup.md`, built from this log.
