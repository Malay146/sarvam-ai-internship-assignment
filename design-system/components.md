# Components

The building blocks of Sarvam pages, as React components with exact anatomy, tokens, states and responsive behaviour. Implemented in `src/components/sarvam/` (`index.tsx` + `components.css`) and shown live at **`/components`**. Layout rules come from [`layout.md`](layout.md), type roles from [`typography.md`](typography.md), and values from [`tokens.css`](tokens.css).

**Source labels:** `[verified]` read from sarvam.ai markup or CSS · `[observed]` seen on sarvam.ai · `[addition]` our own rule.

---

## Rules for AI (read first)

1. **Use the components; don't restyle them.** Compose pages from the components below. If something is missing, build it from the same tokens and add it here.
2. **Quiet surfaces, generous space.** White or `sf` surfaces, 1px `st` borders, radius 16 (cards) or 24 (panels), and plenty of padding. Colour lives in gradient panels and accents, never in borders or text blocks.
3. **Line icons by default** (§3). Filled (glyph) icons only where §3.1 allows; never duotone or emoji.
4. **Every symbol is visible.** An icon or symbol must reach **≥ 3:1** against what it sits on. No same-tone icon on a same-tone tile (§3.2).
5. **Siblings are identical** (`layout.md` §5): mark sets with `data-siblings`, items with `data-sibling`, slots with `data-line`, and run `node scripts/check-layout.mjs <url>`.
6. **Gradients carry grain and sit behind content, never on it.** Use the surface classes (§2), never a hand-written gradient.
7. **Primary action = "Talk to Us"** for Indus Cowork (not generally available). One primary button per view; everything else is secondary or ghost.

---

## 0. Principle: clearer than sarvam.ai `[addition]`

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

## 1. Spacing feel `[addition]`

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

## 2. Surfaces `[verified]`

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

**Strong grain (CTA card):** the closing CTA adds a second layer, `--texture-grain-strong` (grey luminance noise with both dark and light specks, contrast boosted, 200px tile at 1:1), as `.sr-cta::after`, with `overlay` blend at 22% opacity. It sits above the gradient and lattice and below the text. The white-only `--texture-grain` almost disappears on near-black, so dark surfaces need this one. `[considered addition]`

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

## 3. Icons

### 3.1 Style `[verified]` + library `[addition]`
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
- **Filled (glyph) icons, sparingly** `[addition, Malay 2026-11-04]`: Nucleo Core **glyph 24** (exported with a `Fill` suffix: `TargetFill`, `UserFill`, `SparkleFill`…). Use them where a solid mark reads better: **tab icons, chips, small tone tiles, mega-menu items, card labels and fact lists**. In fact lists the glyph carries its own bottom-to-top indigo gradient + a soft inner shadow and sits **without a tile**. Outline stays the default for buttons, inline text and the nav bar itself. Never mix outline and glyph inside one group of siblings.
- Colour: `currentColor` (or the `color` prop inside SVG art), inheriting from the text or tile.

### 3.1b Brand logos (third-party marks) `[addition]`
- **Real marks only, never invented ones.** Integrations are shown with the official mark from `src/components/sarvam/brand-marks.ts`:
  - Simple Icons (CC0) paths on a 24 grid
  - Slack from Nucleo `social-media` (licensed)
  - each mark's official colour from Simple Icons data
- Render with `<BrandMark name colored? />`.
- **Colour rule:**
  - **coloured** (official colour) wherever the mark is the subject: the integrations directory, bento logo tiles, app pickers
  - **mono** (`currentColor`, `tx-tertiary`) only in a logo marquee / proof strip, where many marks must read as one quiet row (as sarvam.ai's customer strip does)
- No official mark in either source (Canva, Apify, DataRobot) → **name only**, with a neutral dot. Never draw a lookalike.
- Customer logos and people: use **Sarvam's own published assets** (e.g. `assets.sarvam.ai/assets/logos/investors/tata-capital.svg`, the testimonial photo). Load them from Sarvam's CDN; don't copy them into the repo.

### 3.2 Contrast fix `[addition]`
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

## 4. Component reference

Each entry lists anatomy → tokens → states → behaviour per tier.

### Button `<Button variant size display arrow>`
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

### Chip `<Chip tone>`
Min-height 32, radius full, text 14. Neutral: white + light bevel. Tinted: 50 background, 800/900 text, coloured inset edge `[verified pattern]`. Used for tabs inside mockups, tags and statuses. Not tappable on its own; if one is, wrap it to 44px.

### IconTile `<IconTile icon tone>`
40×40, radius 8, icon 20 at stroke 1.5. Tones per §3.2. Aligned to the top of its text block.

### Eyebrow `<Eyebrow mono tone>`
- Text: General Sans 500 12, uppercase, 1.6px tracking, `tx-tertiary`.
- `mono`: DM Mono 12, uppercase, 0.13em tracking, tabular figures.
- `tone="accent"` (indigo) marks a product section; `tone="warm"` (`tx-accent`) is for a highlight section like "Skills" `[observed]`.

### SectionHeader `<SectionHeader variant eyebrow title lead aside large>`
- `chapter`: eyebrow → H2 → lead. **Left-aligned on phone, centred from 768**, H2 max 20ch.
- `split`: H2 (often `large` = h2-lg) left; lead and/or CTA right in a `1.2fr / 1fr` grid aligned to the bottom from 768 `[verified CSS]`; stacked on phone.
- Bottom margin `--space-section-head`.

### Card · CardGrid `<CardGrid cards columns name>`
- **Anatomy:** IconTile → mono eyebrow → h4 title (1 line) → body (2 lines) → optional foot.
- **Surface:** white, 1px `st`, radius 16, padding `--space-card`. Linked cards gain a `grey-400` border and `shadow-ambient-md` on hover.
- **Tiers:**
  - phone: 1 column, stacked.
  - tablet: 1 column of **horizontal** cards (icon left, text right).
  - ≥1024: 3 (or 2) columns using **subgrid**, so icon, eyebrow, title and body rows align across cards.
- **Copy budget:** titles ≤ 15 characters (1 line at every tier); bodies 54–58 characters (2 lines; 3 at 1024) `[measured]`.

### MeshPanel + MockChecklist `<MeshPanel tone><MockChecklist …/></MeshPanel>`
- **Panel:** radius 24, tint gradient + grain + soft inner edge, padding 32/24 on phone and 48 from tablet, min-height 260 / 340.
- **Mock card:** white 92% with blur, radius 12, `shadow-ambient-lg` + hairline, padding 20, max width 360.
- **Mock rows:** 14px with an 18px stroke icon. Done = indigo check; active = empty circle; pending = grey.
- **Note well:** `--shadow-well`.
- **Rule:** the mock shows **real, readable product states** (text ≥ 12px), never lorem ipsum or blurry screenshots.

### FeatureRow `<FeatureRow tone title body cta checklist visual>`
- **Anatomy:** white card (radius 24, padding 16) holding a tint panel + text block (h3 → body → CTA → 3-item checklist).
- **Tiers:**
  - phone: **panel on top**, text below `[observed]`.
  - tablet: still stacked (panel on top, full width) so the mock stays readable.
  - ≥1024: 5fr / 7fr.
  - The panel is **always on the right**: no alternating `[addition]`.
- **Sequence:** indigo → orange → green. Checklist icons use the tone's accessible shade.
- **Copy budget:** titles ≤ 22 characters (1 line); bodies about 61 characters, equal rendered width ±3% (2 lines at every tier); text slots capped at 36ch so line counts stay stable on wide screens `[measured]`.

### Steps `<Steps steps>`
- Number circle: white with a 1px `st` border, mono, tabular figures. 40px on phone, 48px from 768 `[verified]`.
- phone: vertical, circle left, connecting line down.
- ≥768: 3 columns, circle on top, line across, subgrid rows.
- Titles 1 line; bodies 2 lines.

### Timeline `<Timeline events>`
- Indigo dot with `--ring-dot`, mono time, item-title, small body.
- phone: vertical with a connecting line.
- 768–1279: 2 columns.
- ≥1280: one horizontal row of 5 with a line through the dots.
- Bodies about 52–56 characters, capped at 34ch (2 lines at every tier) `[measured]`.

### TrustBand `<TrustBand title lead points>`
- `sr-indigo-950` panel `[verified]`, radius 24, inverse text (headings `tx-inverse`, body white 75% `[verified]`).
- Points separated by white-10% dividers.
- Points: 1 column on phone → 2 columns from 768; title column left from 1024 (4fr / 8fr).

### Faq `<Faq items defaultOpen>` (animated, client)
Accordion built on Motion (`src/components/sarvam/faq.tsx`). Each question is a `<button aria-expanded aria-controls>` inside an `h3`, and its answer is a labelled `region`. Rows are at least 44px tall and use item-title type, with hairline dividers. The answer is body text with 40px right padding. The first item opens by default, and several items can be open at once.
- **Open:** the height eases from 0 to auto (500ms, out-quint). The answer fades in, rises 8px and goes from 4px blur to sharp, starting 80ms behind the height. The chevron turns 180° on the same curve.
- **Close:** the answer fades out first (150ms, standard ease, up 4px). Then the height collapses (300ms, emphasized ease, 50ms delay), so text is never clipped while it is still visible.
- **Reduced motion:** every transition is instant.

### CtaCard `<CtaCard title cta>` (animated)
- Night gradient + grain, radius 24, centred.
- Display-2 white headline (max 14ch; a longer line widens to ≤ 30ch, balanced and viewport-scaled on phones, so it stays at **2 lines max**) in the dark top zone, a thin-stroke symbol in the middle, a **dark primary** pill at the bottom.
- White glass buttons are not allowed here: the bottom of the gradient is light (`#a5bbfc`), and white on it is about 1.9:1.
- **Ring lattice:** a half rosette of thin 20%-white circles (5 + 7) centred on the bottom edge, nudged slightly below it. When the card scrolls into view, the two layers grow up from the bottom (1.8s, out-quint, 220ms apart). The symbol (an 8-petal lotus from the Flower generator) unfurls from scale 0.3 and −180° with the blur clearing, and the headline and button rise 32px. All motion is off under reduced motion.
- Sarvam's version enlarges its logomark for this background. We built our own lattice because `logo.md` forbids cropping or recreating the logomark.
- Height 420 / 380 / 440.

### Product mocks `<MockPlan />` `<MockResearch />` `<MockReview />`
Three distinct moments of a teammate's work, so feature panels never repeat the same card:
1. **Plan**: teammate header with a "Working" status, the task, a progress bar (2 of 4), and steps with states and mono times.
2. **Research**: a live query field (well shadow), the sources being read (favicon tile, title, mono domain, used/reading state), and a diff note ("2 new steps added to the plan").
3. **Review**: a draft with highlighted, footnoted claims, "Pass 3", checks, and an approval gate ("Waiting for your yes", Request changes / Approve).

Sizes: max width 380, text 13–14, mono 11. Each mock's accent follows its panel's tone (indigo → orange → green). Spinners stop under reduced motion.

**Narrow mocks** (`container: mock`, layout.md §7.7): the card drops decoration and never truncates content. < 340: step times and the "teammate" tail go. < 300: status word beside the spinner, favicons, the gate meta line go; fixed-width pills become auto. < 260: the Approve arrow and search icon go, buttons tighten, rows go to 13px. Copy is written to fit the narrowest card ("Indian SaaS outlook 2026", "2 steps added to the plan", "Needs your yes" / "Sends at 10:00").

### FeatureBento `<FeatureBento items>`
A denser alternative to three FeatureRows: one wide tile (text + visual side by side) and two equal tiles below (subgrid rows). Phone: stacked. Same tones, same mocks.

### TileCard `<TileCard svg title desc>`
A horizontal card: a **crisp glow tile** (64px on phone, 80px from 768; radius 16/20; inner top highlight + 1px hairline) beside a feature-title and one line. Stacked until 1280, then 3 across. Below 768 the tile is 56px and **always beside** the text (never above it); the title is one line and the description is balanced. Used for options like Sarvam Cloud / Private Cloud (VPC) / On-Premises `[verified copy, evened out to equal length]`.

### GlowCard · FactCard
- **GlowCard:** a card whose header is a crisp glow shape on its tint (lavender / rose / leaf), then eyebrow, h4 and body. Header 16:10, **rendered at that aspect (never cropped)**; the shape fills 66% of the header height so siblings match; the header is inset 8px on three sides; text is inset 24px left, right and bottom.
- **FactCard:** one verified fact set large in light display type ("100+", "Your yes", "India"), with a label and one line. Never an invented number.

**Crisp, not blurry** `[addition, from review]`: glow shapes use a sharp 1.6px gradient rim, a 2.4px white inner highlight and only a faint 4px halo. The soft, heavily blurred version reads muddy at small sizes.

### Nav `<Nav overlay links actions>` `[verified behaviour, sarvam.ai Navbar]`
- **Overlay mode** (any page with a hero): fixed and **transparent at the top**, so the hero glow shows through. After **8px** of scroll a **solid white** surface **fades in** (opacity only, 300ms standard ease, no movement); it fades out again only below **2px** (hysteresis, so no flicker). `[addition: Sarvam slides the surface down; we use opacity only, from review]` A hairline sits at the bottom, inset 6%.
- **Solid mode** (pages without a hero): always white.
- **Actions:** dark "Log In" + light "Contact Us" (Sarvam default), or a single action (e.g. "Talk to Us" on Indus Cowork). On phones only the last action shows, beside the menu button.
- **Layout:**
  - phone and tablet: wordmark · action · 44px menu button opening a full-screen sheet of 56px rows in the display font
  - ≥1024: wordmark · links (40px pills, grey hover) · actions
- **Height:** 64. Pages using overlay add `sr-under-nav` (64px offset) and usually a `<HeroGlow />` behind the top: a wide **horizon**, i.e. the Sun disc stretched horizontally so the orange arc spans most of the width, with the periwinkle halo to the edges (height 640; phone: 220vw × 1.1; ≥768: max(1500px, 125vw) × 1.35; fade to `sf` from 70%). **Use it only on the main hero of a page** (the system overview, the landing page hero), as a direct child of a full-width element, never inside `.sr-container` (it would start at the container edge). Inner pages and tools use the overlay nav over plain `sf`. Original Sun colours, no saturation changes.
- **QA:** `scripts/check-nav.mjs` checks transparent → solid → transparent at 0 / 400 / 0px.

### Footer `<Footer>`
- Wordmark + "AI for all from India".
- Link columns: 2 on phone → 4 from 768, beside the brand column from 1024.
- Links are 44px tall on touch screens and 36 from 1024. Hover (pointer devices only): text goes `tx-secondary` → `sr-indigo-800` over `--duration-normal`. Indigo, not `tx-accent`, because accent fails contrast at 14px. `[considered addition]`
- Legal line + Bengaluru address `[verified]`.
- Faint grain over the flat surface (`--texture-grain` tile scaled to 360px for a coarser speck, 35% opacity, behind content). Ties the footer to the grained gradients above it. `[considered addition]`

### Motif `<Motif>`
The official Sarvam line motif (`/brand/motif.svg`) sits above a hero eyebrow `[observed on /indus-cowork]`. Never recolour it into the spectrum.

---

### Dashboards `<CoworkDashboard />` `<ScheduleDashboard />` (working)
Calm, information-dense product views that **work**. They sit on a tint stage (`.db-frame` + `sr-tint-*`), like Sarvam's hero mockup over its haze.
- **Cowork (teammates):** sidebar "Your teammates" (name, role, a status dot) + one detail view (name + status, the task in display type, steps, the result table, approval, message box).
  - **Run now** walks the steps, then waits for your yes.
  - **Approve** updates the "need your yes" count.
  - **Messages** get a reply.
- **Schedule (today):** a quiet day timeline + one list (time, task, last result, status, a run icon, an on/off switch) + "Needs your yes" with approve/decline and the latest activity.
- **Status:** a small dot + plain text (indigo working, orange needs your yes, green done, grey scheduled). No colourful pills.
- **Rules:** no KPI-box walls, one accent, hairline separators instead of boxes. Fixed heights per breakpoint, **sized so no teammate needs inner scrolling** (640 tablet, 660 phone, 700 under 300px, 664 desktop with a 264px sidebar); only an added chat thread scrolls inside, so the page never moves. Tap targets are 44px on touch screens.
- **Responsive (Cowork), keyed to the dashboard's own width** (`container: db`, layout.md §7.7). The grid track is `minmax(0, 1fr)` so a wide child can't widen it.
  | Dashboard width | Teammate list | Detail |
  |---|---|---|
  | ≥ 1024 viewport | sidebar, name + team + dot | head: name, full status, Run now · meta line + Approve |
  | 520 – 1023 | 2-column named grid above the detail | same as desktop |
  | 300 – 519 | **one row of 6 icon tiles** (status dot on the tile; names visually hidden, kept in `title`) | head: name + **short status** ("Needs you") · footer: full-width Approve + round Run · table rows re-flow to "name · value" with the action underneath, no header |
  | < 300 | icon tiles 3 × 2 (taps stay ≥ 44px); "Your" drops from the header | same |
  Header ("Your teammates · 2 need your yes") is one row below 1024 and stacks only in the narrow desktop sidebar.

### EmblemArt · EmblemCard `<EmblemArt shape icon surface />`
Our richest illustration, built only from our assets (`imagery.md` §2.4):
1. **Ground:** a named Sarvam gradient at its real direction (tint-indigo 135°, tint-green, dawn, indigo glow, dusk), a gentle centre light and grain.
2. **Echo rings:** the emblem's own gateway, medallion or lotus outline repeated at 1.5 / 2.1 / 2.8 / 3.6×, each embossed (a soft glow, a light line, a darker groove 1px below) and fading outward.
3. **Emblem:** a frosted white body (97 → 74% white), a top-edge highlight, a tinted bottom inner shadow, two drop shadows (8px and 1.5px), an inner sheen, an inset frame line (our generator's frame), and a crisp gradient rim.
4. **Icon:** engraved. A white line 0.8px below, then the stroke icon in the surface's accessible shade.

Same emblem box (104 of 200) in every card, so siblings match. No decorative extras (e.g. no tiny diamond accents), from review.

### MegaNav `<MegaNav cta ctaHref login>` `[verified items + addition]`
- **Current build:** filled item icons; featured tile = a frameless gradient tile (kicker, serif title) + one line + a text link with arrow, 320px wide, no divider line; **one CTA** in the bar (`login={false}`, Talk to Us as primary).
- **What:** sarvam.ai's opening navbar.
  - Products / Developers / Resources / Company open one panel under the bar.
  - Labels, descriptions and icon tones come from sarvam.ai's navbar bundle (`references/brand-css/dep_Navbar.Bna_uiTB.js`).
- **Desktop (≥1024):**
  - Hover (mouse) or click opens; Esc, an outside click or leaving the bar closes.
  - Panel: the section heading, items in **2 columns** (a 44px white icon tile with a hairline, Nucleo outline icon in the item's tone, then title + description), and a **featured card** on the right (a named gradient + the title).
  - The page dims behind it (scrim, 6px blur).
  - Switching menus crossfades inside one panel; the panel never moves.
  - **Direction-aware hover** `[addition]`: the links share **one grey pill** (`sf-tertiary`, full radius). It appears under the first link the mouse enters (200ms fade, no slide in from nowhere), **slides** to each next link with its width (300ms out-quint), stays on the open link, and fades out when the pointer leaves the links with no menu open. The panel content slides **24px in from the side the pointer moved toward** and leaves to the other side (200ms, standard ease). Reduced motion: no slide, the pill jumps.
- **Phone/tablet:**
  - The burger opens a full sheet with **one accordion per section** (64px rows, `+` rotates to `×`), items in 1 column (2 from 640), and CTAs at the bottom.
  - Page scroll is locked while open.
- **Motion:** opacity + 6px slide only (`--duration-moderate`, outQuint); none with reduced motion.
- **Tones** (icon colour, never the tile): indigo-800, green-800, orange-900, red-800, `tx-secondary`.

### Stage `<Stage items rail="side"|"top">` `[addition]`
- **What:** a product stage with a tab rail. Each tab has an optional icon (glyph, in a tone tile) and a `tone`; the active tab shows the tone's border and a progress bar.
- **No page movement:** all panels share one grid cell, so the stage is as tall as the tallest panel and switching never moves the page.
- **Side rail (≥1024):** the tabs stretch to exactly the panel's height (`grid-auto-rows: 1fr`), so both columns start and end on one line. Use 4 tabs.
- **Below 1280:** the rail is a **2 × 2 grid** above the panel (never a sideways scroller, layout.md §7.4). Rail < 560px: icon + a one-word `tabShort` (e.g. Plans / Researches / Improves / Asks first), no note. Rail ≥ 560px: title + note. The side rail starts at 1280 (at 1024 a 3/12 rail cut labels short).
- **How-it-works panel inside a Stage:** phone = visual first in a thin frame (the mock gets the width), then text. 768–1023 = visual on top, then title + body **beside** the checklist (two columns, each check one line). ≥ 1024 = text 5 / visual 7. Panel titles use `text-wrap: balance`.
- **Auto-advance:** only while visible; it stops for good once the reader picks a tab.

### Landing-page interactive pieces `[addition]` (`cowork-play.tsx`, `bento-visuals.tsx`)
How each one stays whole on a phone. All use layout.md §7.6 (fit ladder) and §7.7 (thresholds).
- **ApprovalDesk** (queue + trail): task titles and the role line are one line. On a card < 440px, Approve becomes a **round ✓ button** (`aria-label="Approve: …"`) beside the send-back ✕, and the result pill compacts (min 104px). < 280px: titles 13.5px. Queue copy is written short ("Send 31 emails", "Post the readout").
- **DayScrubber** (timeline): see layout.md P8. Phone/tablet stacked cards; 1024–1279 one row per event; ≥ 1280 five columns with two reserved title lines and bottom-pinned pills.
- **TeammateBuilder:** the result card's track is `minmax(0, 1fr)`; the role name sizes to the card (`clamp(15px, calc((100cqi - 60px) / 9.6), 22px)`, longest "Product Performance" = 9.34em). Narrow fields: rhythm reads Daily / Weekly / On demand (the full rhythm stays in the card's Runs row), the hint reads "up to 5", the CTA reads "Talk to us". Each app tile is its own container: < 160px shows "Calendar / Sheets / Docs" (the Google mark carries the brand; the full name stays the accessible name). Verify **every role** at every width.
- **IntegrationField:** padding never drops to 0 on phones; the logo grid is 6 across at every width (24 marks = 4 even rows).
- **Bento visuals** (`bv-*`): one line per row; on narrow cards gaps and pill widths tighten, then the schedule's status dot steps out (the pill already says Done / Next). Copy: "Ready for 4 teammates".
- **Assistant vs teammate:** both card labels stay one line by sizing to the card (`clamp(15px, calc((100cqi - 48px) / 12.6), 22px)`; "An Indus Cowork teammate" = 12.3em).

### Bulbul page pieces `[addition]` (`bulbul-wave.tsx`, `bulbul-play.tsx`, recipe `recipes/bulbul-page.md`)
- **`<Wave seed n profile state tone steps>`**: a deterministic speech waveform. Its state drives CSS only (transform + colour): `idle` (flat) → `stream` (bars rise left to right) → `play` (colour fills left to right, playhead sweeps) → `done`. `profile` is speech, calm, energy, duet or bilingual (two-colour segments); `steps` quantises the heights (a lo-fi look for 8 kHz).
- **`<VoiceAvatar svg>`**: a voice's avatar is one of our studio shapes on a glow card (voices have no faces; no stock photos).
- **Per-item tone (`data-tone`)**: sets `--t`, `--t-soft` and `--t-w1/2` for anything that carries a tone (rows, stages, icons). Controls stay system indigo.
- **Copy button**: see landing-page.md 19d.
- **Fixed-height request pane + Response panel**: code tabs share one height; the response under it replays on every change.
- **Fit on every width** (layout.md §7.4, §7.6, §7.7):
  - **VoicePicker list**: never a sideways rail. Below 768 it is **4 × 2 avatar tiles** with the name under each; style and language show in the stage card. From 768, 2-up rows; a row narrower than 280px puts style and language on their own lines.
  - **Voice card head**: a grid (avatar beside two rows: name + status, then style · language). A card < 300px shows the status as its dot (the word stays for screen readers), splits style / language onto two lines and drops the duplicate language code from the foot, so the voice id never clips.
  - **Playground**: voice chips go 4-up only when the control is ≥ 520px wide; chip labels never clip. On a code card < 420px, Copy becomes a 44px icon button (label visually hidden).
  - **Transcript clips** (tracklist): every row one line; a card < 260px drops the voice-style word; reading rows size their first column to content. Example readings are written to fit ("₹1,200 → बारह सौ रुपये").
  - **Request timeline**: each step one line; a card < 300px reads "Request", values at 11px, "in chunks".
  - **Studio settings**: a settings column < 280px gives each field a full row (no "Sample / rate").

## Do / Don't

| Do | Don't |
|---|---|
| Use one primary "Talk to Us" per view | Put two dark buttons side by side |
| Use line icons at 1.5 stroke; glyphs where §3.1 allows | Use duotone icons or emoji, or mix outline and glyph in one group |
| Use dark accessible shades for icons on tints | Put indigo-500 on indigo-100 |
| Put product UI on a tint panel inside a white mock card | Put text directly on a tint or mesh |
| Keep the visual on the right of feature rows | Alternate left/right (it breaks scanning on tablet) |
| Use 44px tap targets, including footer links on phones | Use 28px text links on touch screens |
| Use the night gradient with a dark CTA | Put a white glass button on the light end of a gradient |

---

## Considered additions

1. **Icon contrast rule** (§3.2), fixing same-tone symbols.
2. **Non-alternating feature rows**; tablet horizontal cards; no orphan cards.
3. **Copy budgets per component**, verified by `scripts/check-layout.mjs` at 10 widths.
4. **44px footer links on touch screens** (Sarvam's are smaller).
5. **Nucleo Core (outline, 24px) as the only icon library**, chosen to match Sarvam's 24/1.5 stroke style. Licensed Nucleo Pro; wrapped with our defaults.
6. **Spacing feel table** (§1): an explicit rhythm on top of the verified section spacing.


---

## 5. Motion `[addition, built on verified tokens]`

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
