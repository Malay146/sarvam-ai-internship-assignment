# Sarvam brand findings (verified)

Source of truth for writing `/design-system/`. Everything here was pulled from sarvam.ai on 2026-11-03.
Raw sources live next to this file:

- `brand-css/brand.txt`, `brand-css/brand-guidelines.txt`: page text from /brand and /brand-guidelines
- `brand-css/tokens-raw.txt`: CSS custom properties from the live site stylesheet
- `brand/logos/`, `brand/loaders/`, `brand/motifs/`: official SVGs
- `brand/images/brand-img-01…14.png`: the 14 images on /brand
- `brand/guidelines/*.png`: the do/don't visuals on /brand-guidelines
- `site/hero-gradient-1622.webp`: homepage hero gradient

Labels: **[verified]** read directly from a Sarvam source. **[sampled]** colour picked from an official raster, so it's approximate. **[observed]** a pattern seen across several official images that isn't written down by Sarvam.

---

## 1. Story and concept [verified, /brand]

- "Sarvam means all." Sanskrit for wholeness: everything, everyone, everywhere.
- Vision line: **"AI for all from India."**
- The brand must feel **grounded, familiar and modern at the same time, without leaning on nostalgia or spectacle**.
- It has to be: **comprehensive** (spans many products), **cohesive** (earns trust), **flexible** (evolves without losing identity), and **rooted in India without relying on nostalgia or symbolism for its own sake**.
- Directions Sarvam rejected: too region-specific, visually rich but over-decorative, or meaningful but unable to scale as a system. Use this as a filter for our work: **no region-specific clichés, no ornament for its own sake.**
- **Central idea: the gateway.** Architectural gateways appear across Indian life (public spaces, streets, shops, graphic culture) "not as decoration, but as structure". They are recognizable without being tied to one region and scale from everyday to monumental. They express **inclusivity and openness while retaining clarity and discipline**.
- A gateway is "a moment of transition, where two worlds move toward each other. Human and machine. Culture and computation. What already exists and what is still emerging."
- **Mandala construction logic.** Intricate, multi-layered, intentional; each pattern interlocks with another and each layer reveals more meaning. It is coherent only as a whole. "You don't rush a mandala."

## 2. Colour

### 2.1 The spectrum [verified, /brand]
- "A **blue-to-orange spectrum** as a foundational language. Instead of relying on fixed color blocks, it operates through **continuous transitions in light and tone**."
- Transitions "communicate motion, energy, and progression" and "are not decorative. They function as **signals of flow**, helping the system feel responsive and alive."

### 2.2 Gradient stops [sampled from official images]

| Gradient | Direction | Stops (top to bottom) | Source |
|---|---|---|---|
| **Dusk** (dark to warm) | vertical | `#17191a` 0% · `#1f2f55` 25% · `#314b82` 38% · `#5f78af` 50% · `#9cafdd` 62% · `#c8c3d2` 75% · `#ddac88` 87% · `#fa9b43` 100% | brand-img-01 |
| **Dawn** (warm to light) | vertical | `#ab4b0f` 0% · `#d7610c` 25% · `#f57613` 38% · `#fc9230` 50% · `#faac57` 62% · `#e3bf9e` 75% · `#ccd0e7` 87% · `#e2ebff` 100% | brand-img-10, og-home.png |
| **Indigo glow** | vertical, often behind a gateway shape | `#3333cc` 0–25% · `#554ecd` 38% · `#7c71d0` 50% · `#9d8ecc` 62% · `#c2abcc` 75% · `#ecc4bf` 87% · `#fabea3` 100% | brand-img-06 |
| **Sun** (homepage hero) | radial, rising from below | core `#f9730c` · `#ed8c44` · `#bfc9f1` · `#c9d7fe` · `#e8effd` fading to transparent on a white page | hero-gradient-1622.webp |

Key observation: **every gradient passes orange to soft periwinkle (`#c9d7fe` / `#e2ebff`) or indigo to peach.** Blue and orange are always both present. Never a single-hue gradient.

### 2.3 Palette tokens [verified, site CSS]
Brand ramps `--color-sr-*`, each 50–950:
- **Indigo** (primary blue): 50 `#fafcff` · 100 `#e8effc` · 200 `#d2dff9` · 300 `#a7c0f1` · 400 `#81a0e9` · 500 `#6a88e2` · 600 `#556adc` · 700 `#4250d5` · **800 `#3333cc`** · 900 `#212191` · 950 `#11115b`
- **Orange** (primary warm): 50 `#fffbfa` · 100 `#feede6` · 200 `#fddcce` · 300 `#f9bb9e` · 400 `#f59970` · 500 `#f38858` · 600 `#ee7944` · 700 `#e96c2f` · **800 `#e6651b`** · 900 `#a5460f` · 950 `#682906`
- **Yellow**: 50 `#fff8e6` … 500 `#feb12b` … 950 `#362813`
- **Pink**: 50 `#fceaf0` … 500 `#b12060` … 950 `#4d192c`
- **Red**: 50 `#fde7e2` … 500 `#b81514` … 1000 `#3e140b`
- **Green**: 50 `#f2f8eb` … 500 `#83c040` … 1000 `#152605`
- **Grey**: 50 `#f9f9f9` · 100 `#f5f5f5` · 200 `#f0f0f0` · 300 `#e6e6e6` · 400 `#cccccc` · 500 `#b3b3b3` · 600 `#999999` · 700 `#666666` · 800 `#525252` · 900 `#3d3d3d` · 950 `#292929`
- Singles: `sr-black #141414`, `sr-slate #2a2c33`, `sr-white #ffffff`

Full values in `brand-css/tokens-raw.txt`.

Semantic tokens:
- Text: `tx #1f1f1f` · `tx-secondary #3d3d3d` · `tx-tertiary #666666` · `tx-brand #29211d` · `tx-accent #c4733d` · `tx-inverse #faf8f5`
- Surface: `sf #fcfcfc` · `sf-secondary #f5f5f5` · `sf-tertiary #f0f0f0` · `sf-quaternary #e6e6e6`
- Stroke: `st #e6e6e6` · `st-secondary #f0f0f0`
- Focus ring: `sr-indigo-600`

The logomark's product-context background samples as `#3133a3` [sampled]. That's close to indigo-800/900, so use the `sr-indigo-800` token.

### 2.4 Where the secondary ramps come from [observed, brand-img-05]
Brand image 05 pulls swatches from Indian textiles, flowers and architecture: `#293A18` (green), `#B1205F` (pink), `#FEBF2B` (marigold), `#C11317` (red), `#9E5F0A` (ochre). These map onto the `sr-green`, `sr-pink` (500 = `#b12060`), `sr-yellow` (500 = `#feb12b`) and `sr-red` ramps. **The secondary ramps are craft-derived accents**, used for product or state colour. They are not part of the core spectrum.

### 2.5 Colour per symbol state [observed, brand-img-07]
The lotus/gateway symbol appears in four families, each a soft gradient fill on near-black: **indigo/periwinkle, green, pink/violet, orange**. The columns are labelled "Gateway", "Under Load", "In Context", which suggests one colour family per product or state.

## 3. Typography [verified, site CSS + homepage markup]

- **Season Mix** (variable, 300–900): display and headings. In brand imagery it is set **light, sentence case, large, generous leading** ("Who gets to be understood?", "In your own words", "Built for India", "Begin here"). The homepage uses it for H1/H2 with `leading-tight tracking-tight`.
- **Matter** (variable, 100–1000): body, UI, buttons, eyebrows.
- **Matter Mono** (400, 500) and **Matter Semi Mono** (400): code, technical labels, numbers.
- Eyebrow: Matter 500, 12px, UPPERCASE, `tracking 2px`, `tx-tertiary`.
- Section H2: Season Mix, 28px mobile to 36px desktop, `leading-tight`, `tracking-tight`, `text-balance`.
- Section lead: Matter, 16px to 18px, `leading-relaxed`, `tx-secondary`, `text-pretty`.
- Card title: Matter 500, 18px, `leading 1.45`, `tracking -0.015em`.
- Meta line: Matter 400, 13px, `leading 1.55`, `tx-tertiary`.
- Site scale tokens: `text-label 12` · `caption 14` · `body 16` · `lg 18` · `xl 20` · `2xl 24` · `3xl 28` · `4xl 32` · `5xl 36` · `6xl 40` · `7xl 48` · `8xl 56` · `9xl 64` px. Display sizes use line-height 1.
- These are **licensed fonts**. Font strategy is still to be decided (Malay is handling it).

## 4. Layout, spacing, radius [verified, site CSS + markup]

- Breakpoints: Tailwind defaults `sm 640` · `md 768` · `lg 1024` · `xl 1280` · `2xl 1536`. The site mainly switches at **md (768)**, with some changes at lg and xl.
- Section container: `w-[88%] md:w-10/12 2xl:max-w-width-mx`, so fluid width with percentage gutters, capped at very large screens.
- Section rhythm: headings stack on mobile and become a side-by-side row on desktop (`flex-col md:flex-row md:justify-between md:items-end`), with gap 24px to 48px and margin below of 40px to 56px.
- Blog grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, with gaps 32 / 40 / 48px.
- Spacing base: 4px (`--spacing: .25rem`).
- Radius: `sm 4` · `md 6` · `lg 8` · `xl 12` · `2xl 16` (= `radius-card`) · `3xl 24` · `4xl 32` (= `radius-card-lg`). Image thumbnails use `rounded-lg` with a 1px `st-secondary` border.
- Motion: Tailwind easing; reveal-on-scroll sections; `prefers-reduced-motion` respected.

## 5. Logo [verified, /brand-guidelines + visuals]

**General**
- Use only the official files; never recreate or modify any element.
- Two marks: **wordmark** and **logomark**. **Keep them independent and never combine them in one lockup.**
- Keep clear space around the logo. The clear-space diagram uses the **wordmark's own "r" glyph as the unit**: one "r" width of clear space on the left and right, and the r's height above and below [observed from wordmark-clear-space.png].

**Wordmark** (lowercase "sarvam", wide geometric letterforms)
- When to use it: wherever the logomark alone isn't enough.
- **Black on light backgrounds, white on dark backgrounds.** Nothing else.
- Don't do these (from wordmark-incorrect-usage.png):
  - add effects (shadow, border)
  - use any accent colour
  - rotate or warp it
  - change the case or rearrange it
  - stretch or condense it
  - change its weight
  - lower its contrast with grey
  - fill it with a gradient
  - place it on a low-contrast background

**Logomark** (repeated circles in mandala construction forming a lotus, diamond centre)
- When to use it: **where the brand is already established**, such as product UI, app icons and social media profiles.
- Shown white on black, black on white, and white on indigo (product context).
- Don't do these (from logomark-incorrect-usage.png):
  - recolour it or fill it with a gradient
  - combine it with the wordmark
  - put it on a low-contrast background
  - thin or thicken its strokes
  - crop or distort it
- Keep its original proportions.

**Partner lockups**
- Use the wordmark only, never the logomark.
- Lockup layout: `sarvam · Partner logo`, with a centred dot separator.
- Match the visual weight of the two logos. Don't show them at very different sizes.
- Never place the lockup over a busy image.
- Co-branded material needs approval from Sarvam.

**Government lockups**
- Vertical stack: the emblem and ministry name on top, then "with", then the Sarvam wordmark.
- Don't reorder the hierarchy. Don't use the logomark. Don't use a busy or photographic background.
- Needs approval from Sarvam.

## 6. Imagery [observed, /brand images 01–14]

1. **Gateway as frame/mask.** A cusped Indian-arch silhouette is used as a window. Through it you see photography (brand-img-03, 04), gradient (06, 11) or landscape (14, a real carved arch opening to the sea, "Begin here").
2. **Cinematic, real Indian life.** Farmer in a field, dancers on a beach, architecture at dusk. Natural light, muted and moody palettes, shallow depth of field, people mid-motion, nothing staged or stock-looking.
3. **Monumental architecture and light.** Brand-img-12 shows a dark gateway monument on water with "Sarvam M" glowing orange inside it. Light shows through the threshold.
4. **Large calm type on image or gradient.** Season Mix light, sentence case, lots of negative space, usually one short line.
5. **Gradient fields** with the logomark or wordmark centred and small (brand-img-01, 10). These are the spectrum used as a whole background.
6. **Product UI.** White rounded cards on light grey, indigo-to-violet gradient cards, Devanagari text in indigo, soft lotus-shape illustrations in gradient fills (brand-img-08). UI states have human-voice labels: "Ready and Listening", "Forming a relevant resolution.", "Holding steady under pressure."
7. **Environmental applications.** Billboards and posters in transit spaces, wordmark small at the bottom, one statement line ("A gateway between people and intelligence.").
8. **Line motif** (`brand/motifs/motif.svg`): thin light-grey (`#F0F0F0`) single-line drawing used as a subtle UI ornament.
9. **Loader symbols** (`brand/loaders/loader-symbols-01…10.svg`): ten geometric symbols for loading states.

## 7. Voice [verified, /brand + /brand-guidelines + homepage]

- Tone on the brand page: reflective, confident, patient, specific. Short declaratives alternate with longer reasoning ("You don't rush a mandala.").
- Headline patterns from imagery: questions ("Who gets to be understood?"), invitations ("Begin here", "Ask Sarvam"), possession ("In your own words"), claims ("Built for India", "AI for all, from India").
- Homepage Indus Cowork: eyebrow "Indus Cowork", H2 **"Intelligence, built around you."**, lead "Indus Cowork connects your business context, tools, and teams so people can create, decide, and get work done faster." Feature columns include 01 Research …
- Naming:
  - Say **"Sarvam AI"** on first mention and "Sarvam" after that.
  - Describe it as **"an Indic language AI company"**.
  - Mission line for press: "make artificial intelligence accessible and useful for every Indian language speaker."
  - Use product names exactly as published. Never abbreviate them ("Doc Agents", "Voice Agents" are examples given).
  - For integrations: "powered by Sarvam AI" / "built with Sarvam AI's speech-to-text API".
- Legal entity in the footer: "© 2026 Axonwise Private Limited. All rights reserved." Address: 732, Chinmaya Mission Hospital Road, Indiranagar Stage 1, Bengaluru, Karnataka 560038.

## 8. Current product naming (footer, 2026-11-03)

- **Products:** Content Studio, Token Factory, Document AI, Work Agents, Coding Agents, Sarvam Edge, Model Training
- **APIs:** Text to Speech, Speech to Text, Parse, Translation, Document Translation, Dubbing
- **Resources:** Blogs, Building AI Agents, Events, Customer Stories, Documentation, API Pricing, Integrations, Startup Program, Sarvam Champions
- **Company:** About Us, Careers, Contact Us, Brand, Brand Guidelines, Partnerships, Legal, Trust Center, Terms of Service, Privacy Policy, EULA

Note: Indus Cowork is not listed by name in the footer. It is probably under **Work Agents**, but that is unverified. Check its own page for exact naming before writing copy.

---

## 9. Indus Cowork product page (sarvam.ai/indus-cowork, read 2026-11-03)

Raw text: `brand-css/indus-cowork.txt`. Screenshots: `site/indus-cowork-{375,768,1440}.png` (homepage: `site/home-*.png`).

### 9.1 Product facts and naming [verified]
- Name: **Indus Cowork**. Its agents are called **teammates** ("an Indus Cowork teammate", "a Cowork teammate"). Users message them in **Slack** or **Indus Chat**.
- Status: **"Indus Cowork is not generally available yet."** The CTA is **"Talk to Us"**, never "Sign up" or "Try free". The secondary CTA is "See how it works".
- Capabilities: plans work as a to-do list · built-in web search · improves its own output until done · returns results **for your approval**.
- Building blocks: **Skills** (including a skill-creator skill), **Teammates**, **Scheduled tasks**, **Knowledge base**, **Built-in research**, **Connected apps** (more than 100 connectors).
- Example teammates (roles): Sales Outbound, Talent Scout, Paid Media, Product Performance, Chief of Staff, Account Manager, Cluster Health Monitor.
- Trust: data residency in India for Indian deployments · **ISO 27001:2022** and **SOC 2 Type I** (this page says Type I) · role-based access, SSO, audit logs · encryption at rest and in transit · Trust Center.
- Connectors named: Gmail, Google Calendar, Docs, Drive, Sheets, Slack, Notion, Airtable, Metabase, PostHog, BigQuery, Snowflake, GitHub, Linear, Jira, Sentry, plus Asana, Calendly, Dropbox, Canva, Apify, DataRobot, PagerDuty, Vercel.

### 9.2 Voice on this page [verified]
- H1: "Hire an AI teammate that finishes the work"
- Section H2s: "It runs the whole task, start to finish." · "The building blocks of a teammate" · "Plugs into the stack you already run on" · "Teach it once. Every teammate knows it." · "Runs while you sleep" · "Message an agent like a teammate" · "Give each teammate a job" · "Sovereign by default" · "Your questions, answered"
- Feature titles are short full sentences with a full stop: "Plans the work before it starts." "Researches on its own." "Improves until the work holds up."
- Reassurance lines: "Nothing ships without your yes", "It never changes a campaign without your yes", "Every task leaves a trail".
- Pattern: plain verbs, the colleague metaphor ("the way you would a colleague"), outcome over steps ("you hand off the outcome and not the steps"), human control stated plainly.

### 9.3 Page structure [verified, top to bottom]
1. Nav (wordmark, Products / Developers / Resources / Company, "Talk to Us" pill)
2. Hero: line motif → eyebrow "INDUS COWORK" → H1 → lead → [Talk to Us] [See how it works] → large product mockup (teammate sidebar + task view) over a periwinkle haze
3. "It runs the whole task": three alternating feature rows (text with checklist on the left, tinted panel with UI card on the right), tints indigo → orange → green
4. "The building blocks of a teammate": 2 + 3 card grid (icon tile, mono eyebrow, h4, body)
5. "Plugs into the stack": split heading (H2 left, intro right), then a directory panel of app logos grouped Productivity / Data / Engineering
6. "Skills": eyebrow in orange accent, H2, body, three sub-points + a skill card mockup (numbered steps)
7. "Runs while you sleep": schedule timeline (6:00 / 8:00 / 12:00 / 17:00 / Fri)
8. "Message an agent like a teammate": three numbered steps 01 / 02 / 03
9. "Give each teammate a job": role cards
10. "Sovereign by default": trust points + security cards
11. FAQ accordion
12. Footer

### 9.4 Visual patterns [observed + verified CSS]
- Product hero uses a **blue haze** (`--gradient-haze`), not the orange Sun.
- **Feature rows alternate** text and a tinted panel. Each panel holds a white UI card (to-do list, search results, self-review).
- **Building-block cards**: white, 1px `st` border, radius 16, a 40px icon tile with indigo-100 background and indigo icon, mono eyebrow, display h4, tertiary body.
- **Directory panel**: white, 1px `st` border, **radius 24**; group rows separated by 1px borders; 4 → 2 columns of apps below 640px `[verified CSS]`.
- **Feature rail grid**: 6 columns, first two items span 3, the rest span 2, collapsing to 1 column below 768px `[verified CSS]`.
- **Section heading row**: grid 1.2fr / 1fr (H2 left, intro right, aligned to the bottom), stacked below 640px `[verified CSS]`.
- **Step numbers**: 40px circles (48px from md), white with an `st-secondary` border, mono 12→14, tabular figures.
- **Buttons**: primary is a dark `sr-slate` pill with an inset bevel shadow (Matter 500 16, min-height 40); secondary is a white pill.
- **Motion**: timeline progress 2.9s `cubic-bezier(.2,.65,.35,1)`; events arrive with `cubic-bezier(.16,1,.3,1)`; pulse ring on dots; all disabled under reduced motion.
