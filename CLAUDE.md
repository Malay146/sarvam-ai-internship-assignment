# CLAUDE.md — Sarvam Design Engineer Internship: Take-home

You are helping Malay Patel complete a take-home assignment for the **Design Engineer Internship at Sarvam AI**. Read this file fully before doing anything. It is the source of truth for scope, rules and brand findings so far.

---

## 1. Context

- Sarvam AI builds AI for India: foundation models, voice and language products across Indian languages.
- Their team uses design systems + AI to scale work instead of hand-crafting every asset. The assignment tests exactly that.
- **Deadline: 7 days from 2026-11-03** (confirmed by the recruiter; ignore the earlier "48 hours" email). Expected effort: 12–16 focused hours.
- Malay's stack: Next.js, Tailwind, Figma. Deploy target: Vercel.
- **Any AI tools are allowed**, but we must disclose which ones and share key prompts.

---

## 2. The core idea (do not lose sight of this)

The **brand/design system is the main deliverable**. The banners and the web page are *proof* that the system works.

Order of work is non-negotiable:
1. Capture Sarvam's existing brand as a written system (markdown / skill files).
2. Feed that system to AI to **generate** banners and the web page.
3. Malay directs, iterates, refines and polishes.

**Do not design from scratch by hand.** Do not rebrand. Small, considered additions are welcome; a new brand language is not.

---

## 3. Deliverables (all behind ONE public link, accessible to anyone with it)

| # | Deliverable | Spec |
|---|---|---|
| 1 | Brand & design system | Markdown (.md) and/or skill files. Structure is our choice. |
| 2 | 3 Meta banners | PNG, 1080×1080 (square) or 1080×1350 (portrait). Mixing allowed. |
| 3 | 3 LinkedIn banners | PNG, 1200×627 (single image post). |
| 4 | One complete responsive web page | Hero → footer. Exports at **375 / 768 / 1440 px** (mobile + desktop minimum, tablet strongly preferred). Live link recommended — we will build and deploy it. Must behave sensibly *between* breakpoints too. |
| 5 | Source files | This repo. |
| 6 | Short write-up | Process, tools used, key prompts, how the system was tested. |

Banners must be "ready to go live." Subject is our choice (a Sarvam product, feature or announcement). Banners and page must clearly come from the same system.

---

## 4. What the design system must cover

**Visual language:** color, typography, spacing, radius, layout & grid, imagery & illustration style, logo usage, tone of voice for copy.

**Responsive & adaptive behaviour (heavily weighted):**
- Breakpoints
- Layout and grid at each size
- A type scale that adapts across sizes
- Spacing that scales
- How components behave and **rearrange** (not just shrink) across mobile, tablet, desktop

**Written for AI:** must be handed to an AI tool or teammate and reliably produce on-brand output. Prefer explicit tokens, rules, do/don't lists and recipes over vague description.

---

## 5. How we'll be judged

- Scalable system built on the **existing** brand — clear, reusable tokens and rules
- System that adapts across breakpoints
- Banners + page look and feel like Sarvam, polished enough to ship today
- Genuinely responsive page — intentional at every size
- Consistency across formats
- **Good direction of AI** — show guiding, iterating, refining; not raw generations, not hand-drawn work
- Some personal flair within the system
- Craft: alignment, spacing, typography, legibility, finish

---

## 6. Testing the system (must be shown in the write-up)

Keep it short — a handful of examples with brief notes. Ideas:
- **Before / after:** same prompt to AI *without* the system vs *with* it
- Several generations from one prompt, and how the system/prompts were refined
- Same system producing consistent Meta, LinkedIn and web output
- Web page at each breakpoint, showing how responsive rules shaped layout
- Notes on what didn't work at first and what changed

### Logging rule (do this from the start)
Every meaningful generation or prompt goes into `/process/prompt-log.md` with: date, tool, prompt (verbatim), what came out, what was changed and why. Save before/after screenshots to `/process/screens/`. The write-up is built from this log — never reconstruct it at the end.

---

## 7. Brand findings so far (from sarvam.ai, /brand, /brand-guidelines)

> **Full verified detail lives in `references/brand-findings.md`** (gradient stops, full palette, type, layout, logo rules, imagery patterns, voice). Read it before writing any design-system file. Official assets are downloaded to `references/brand/`.

### Concept
- "Sarvam" = Sanskrit for **wholeness** — everything, everyone, everywhere.
- Tagline: **"AI for all from India."** Hero eyebrow: "India's Sovereign AI Platform."
- Central motif: **the gateway** — a threshold where two worlds meet (human/machine, culture/computation, existing/emerging).
- Brand aims to feel **grounded, familiar and modern — without relying on nostalgia or spectacle.**

### Color
- Built on a **continuous blue-to-orange gradient spectrum**, not fixed color blocks. Transitions in light and tone signal motion and progression.
- Hero uses a soft gradient background (raster: `hero-gradient-1622-v1.webp`).
- ✅ Extracted from site CSS (2026-11-03) → raw dump in `references/brand-css/tokens-raw.txt`. Brand palette is `--color-sr-*` (indigo, orange, yellow, pink, red, green, grey 50–950), plus semantic `tx-*` (text), `st-*` (stroke), `sf-*` (surface). Key: indigo-800 `#33c`, orange-800 `#e6651b`, tx `#1f1f1f`, tx-brand `#29211d`, tx-accent `#c4733d`, sf `#fcfcfc`, sr-black `#141414`.
- Gradient stops sampled from official images (approximate, labelled [sampled]): **Dusk** `#17191a → #314b82 → #9cafdd → #ddac88 → #fa9b43`; **Dawn** `#ab4b0f → #f57613 → #faac57 → #ccd0e7 → #e2ebff`; **Indigo glow** `#3333cc → #7c71d0 → #c2abcc → #fabea3`; **Sun** (hero, radial) `#f9730c → #ed8c44 → #bfc9f1 → #e8effd → transparent`. Blue and orange always appear together.
- Secondary ramps (green, pink, yellow, red) are craft-derived accents (textile/marigold swatches on /brand), not part of the core spectrum.

### Typography
- ✅ **Season Mix** (variable 300–900) = display/headings (`font-season-mix`). **Matter** (variable 100–1000) = UI/body (`font-matter`). **Matter Mono** / Matter Semi Mono = code + labels. Commercial fonts, so we use free stand-ins: **Gambetta / General Sans / DM Mono** (see deliverables/1-design-system/typography.md).
- Eyebrow pattern: Matter medium, 12px, uppercase, tracking 2px, `tx-tertiary`. H2: Season Mix 28→36px, leading-tight, tracking-tight.
- Breakpoints (Tailwind defaults): 40 / 48 / 64 / 80 / 96 rem. Containers: `w-[88%] md:w-10/12 2xl:max-w-width-mx`. Radius: card 16px, card-lg 32px.

### Logo
- Wordmark: wide letterforms, balanced proportions, refined curves.
  - Black: https://assets.sarvam.ai/assets/brand/logos/sarvam-wordmark-black.svg
  - White: https://assets.sarvam.ai/assets/brand/logos/sarvam-wordmark-white.svg
- Monogram/logomark: repeated circles in a mandala-style geometric construction forming a lotus-like shape.
- Rules:
  - Wordmark **black on light, white on dark**. Nothing else.
  - Never: gradients in the logo, accent colors, shadows, borders, low-contrast backgrounds, recreating or rearranging it.
  - Logomark: don't crop, change stroke width or proportions. For contexts where the brand is already established (app icons, social avatars).
  - **Never combine wordmark and logomark** in one lockup or together anywhere.
  - Partner lockups: wordmark only, balanced visual weight, no busy image backgrounds.
  - Use official files only.

### Patterns & imagery
- Mandala-inspired layered construction; interlocking patterns building toward a whole.
- Gateway / threshold architecture as structural motif.
- Abstract line-style SVG motifs (`assets/motifs/ui/motif.svg`).
- **Gateway as mask/frame:** cusped Indian-arch silhouette used as a window onto photography, gradient or landscape. This is the strongest reusable visual device.
- Photography: cinematic real Indian life and architecture, natural light, muted and moody, people mid-motion. Never stock.
- Display type on imagery: Season Mix light, sentence case, one short line, lots of negative space ("Who gets to be understood?", "Begin here", "In your own words").
- Wordmark clear space = width/height of its own "r" glyph on every side.
- Partner lockup: `sarvam · Partner logo` (dot separator, matched visual weight). Government lockup: emblem above, "with", wordmark below.
- Realistic product UI mockups (e.g. Indus Cowork screens) rather than stock photography.
- Loader symbol: https://assets.sarvam.ai/assets/brand/loaders/loader-symbols-01.svg
- Brand images: `https://assets.sarvam.ai/tr:w-1024,q-70,f-auto,c-at_max,dpr-auto/assets/brand/images/brand-img-01.webp` … `-14` (09 and 10 are .png).

### Voice & naming
- Confident, mission-driven, short punchy fragments (e.g. "Not a handoff. A partnership.").
- Recurring themes: sovereignty, India-scale / population-scale, enterprise trust, "India builds with Sarvam", "India Can".
- "Sarvam AI" on first mention, "Sarvam" after. Describe as an Indic language AI company.
- Use exact published product names; never abbreviate or modify.

### Homepage section patterns (reusable component library reference)
Nav (Products, Developers, Resources, Company + Log In / Contact Us) → gradient hero with eyebrow + H1 + subhead + 2 CTAs → customer logo marquee ("India builds with Sarvam") → tabbed product demo (Indus Cowork) → developer section with code block (Python/JS/cURL tabs) + API cards → "India Can" statement → three pillars (Sovereign by design / State of the art models / Human at the core) → full-stack layers (Applications / Models / Infrastructure) with stats row (10B+ tokens, <100ms median latency, 99.9% uptime) → enterprise three-column → deployment cards (Sarvam Cloud / Private Cloud VPC / On-Prem) → testimonial → research & updates grid → closing CTA → footer (badges, socials, Bengaluru address, link columns).

### Candidate subjects for banners + page
**✅ Chosen (2026-11-03): Indus Cowork.** Page H1: "Hire an AI teammate that finishes the work". Not generally available yet, so the CTA is "Talk to Us". Agents are called "teammates". See brand-findings §9. Other options were:
- **Indus Cowork** (newest flagship work agent)
- **Bulbul V4 Flash** (recent voice model launch)
- **Voice Agents**

### Known source inconsistencies (don't copy blindly)
- SOC 2 Type II vs Type I mentioned in different places (the Indus Cowork page says **Type I**, so use that on the Cowork assets).
- 22 vs 23 Indian languages mentioned in different places.

---

## 8. Open items (blockers first)

- [x] Extract exact colors (hex), font family + weights, radius, spacing from sarvam.ai CSS
- [x] Sample gradient stops from official images
- [x] Read /brand + /brand-guidelines, download official assets → `references/brand/`, write `references/brand-findings.md`
- [x] Read the Indus Cowork page (facts, voice, structure, visual patterns → `references/brand-findings.md` §9; screenshots in `references/site/`)
- [x] Font strategy: free stand-ins Gambetta (Season Mix), General Sans (Matter), DM Mono (Matter Mono). Swap point is the `--font-*` tokens in tokens.css
- [x] Collect Sarvam social posts → `/references/social/` (12 posts, renamed `NN-type-subject-ratio.png`, analysed in README.md)
- [x] Screenshot sarvam.ai home + /indus-cowork at 375 / 768 / 1440 → `/references/site/`
- [x] Choose the subject: Indus Cowork
- [x] Write the design system: SKILL.md entry point + tokens, typography, layout, components, expressions, imagery, logo, voice + recipes (meta, linkedin, landing page). Single-file `design.md` generated by `node scripts/build-design-md.mjs` (re-run after any .md edit). Review site /system, /system/tokens, /system/expressions, /components, /studio. QA: check-layout, check-fit, check-motion, check-nav, check-perf, check-hover.
- [x] `scripts/export-banners.mjs` (banners) · [x] `scripts/export-page.mjs` (page exports → `deliverables/4-web-page/`, `deliverables/6-writeup/system-tests/`)
- [x] Run before/after tests, log them (`deliverables/6-writeup/before-after/`)
- [x] 3 Meta + 3 LinkedIn banners: final set in `deliverables/2-meta-banners/` + `3-linkedin-banners/` (Prism, Every task leaves a trail, Indus Cowork early access). Engine: `recipes/banner-builder.md`; skill: `.claude/skills/sarvam-banner`; gallery `/banners`; expressions `/system/expressions`
- [x] Landing page built (`src/app/page.tsx`, v3); rules in `deliverables/1-design-system/recipes/landing-page.md` §0 — read before any new page
- [x] Document AI page `/document-ai` (paper-and-ink theme, seal-ink light): `deliverables/1-design-system/recipes/document-ai-page.md`
- [x] Consistency test page `/bulbul` (Bulbul V4 Flash; own formats, garden-sunrise hero light, multi-tone): `deliverables/1-design-system/recipes/bulbul-page.md`. Each product page owns its light and its formats (landing-page.md rule 9a)
- [x] Deploy to Vercel
- [x] Export page at 375 / 768 / 1440 (final deliverable = Indus Cowork `/`; Bulbul + Document AI exported as system stress tests)
- [x] Write-up (`deliverables/6-writeup/writeup.md`)
- [x] Public repo: https://github.com/Malay146/sarvam-ai-internship-assignment (Sarvam's reference images are git-ignored, kept locally)
- [x] /submission page (live, built with the system) · Submission page: repo README (live site https://sarvam-ai-internship-assignment-4of.vercel.app/) · [ ] reply on the original email thread (Malay)

---

## 9. Proposed repo structure

```
/deliverables/                 # everything the brief asks for, numbered to match it (README inside)
  1-design-system/             # Deliverable 1 — the system, packaged as a skill (SKILL.md, tokens.css, recipes/…)
  2-meta-banners/              # 3 Meta PNGs (1080×1350)
  3-linkedin-banners/          # 3 LinkedIn PNGs (1200×627)
  4-web-page/                  # Indus Cowork exports at 375/768/1440 + live link
  5-source/                    # map of the repo (the source itself is the rest of the repo)
  6-writeup/                   # writeup.md, before-after/, system-tests/ (Bulbul, Document AI exports)
/src/  /scripts/  /banners/    # the Next.js app, QA/export scripts, banner specs (briefs.json)
/process/                      # prompt-log.md + iteration screenshots
/references/                   # brand research
```

---

## 10. Working rules for you (Claude)

- Never invent brand values. If something isn't verified from Sarvam's sources, label it as an estimate or an addition, and list additions in the system under "Considered additions."
- All banners and the page must consume tokens from `deliverables/1-design-system/` — no hard-coded one-off colors, sizes or spacing.
- Responsive means **rearranging**, not just scaling: specify what moves, stacks, hides or changes at each breakpoint.
- Check every output at 375, 768 and 1440 (and in-between widths) before calling it done.
- Log prompts to `/process/prompt-log.md` as you go.
- Stay true to the brand; flair goes into composition, subject and copy, not into new colors or fonts.
- **Malay's flair rule: sibling consistency.** Side-by-side blocks have equal width and height, aligned inner rows, and identical line counts per text slot at every width (layout.md §5). Write copy to the character budget and run `node scripts/check-layout.mjs <url>` before calling any section done.
- Mobile gets equal care to desktop (Malay's explicit ask).
- **Malay's fit rule: nothing scrolls sideways, ever, and everything fits**: no label on two lines, no "…", no text under a neighbour, at every width from 320. Use the fit ladder (layout.md §7.6) and container thresholds (§7.7). Run `node scripts/check-fit.mjs <url>` (must exit 0) next to `check-layout`, and click every interactive state at 320 / 375 / 768 / 1024 / 1280.
- **Before building any page or section: read `deliverables/1-design-system/recipes/landing-page.md` §0** (the playbook: story hierarchy, facts from the source but our formats, real assets only, soft gradients + grain, no patterns unless asked, filled icons where allowed, no blank states, one CTA in the nav).
- **Icons: Nucleo Core outline 24px only** (Malay owns Nucleo Pro). Import from `@/components/icons`; add new ones via the Nucleo MCP and copy them into `src/components/icons/nucleo/`. No other icon library.
- **Each page owns its theme = its structure + one hero light** (tokens.md §2.4c: home Sun, Cowork indigo glow, Bulbul garden sunrise, Document AI seal ink), never a single colour; controls stay indigo, tones per item. **Multi-colour gradients stack vertically** (top → bottom hero, bottom → top panels/footer), never side by side.
- **Three expressions** (`deliverables/1-design-system/expressions.md`): Campaign / Product / Community, picked by content type. Banners and page sections must name their expression.
- **Social references:** `references/social/` (12 posts, indexed and analysed in its README). Sarvam posts the same art on every platform.