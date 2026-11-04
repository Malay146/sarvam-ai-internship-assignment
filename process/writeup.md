# Write-up: a Sarvam design system, and what it made

**Malay Patel · Design Engineer Internship take-home · November 2026**
Source: https://github.com/Malay146/sarvam-ai-internship-assignment · Live site: *(Vercel link)*

## In one paragraph
I didn't design banners or a page by hand. I wrote down Sarvam's existing brand as a system an AI can follow: tokens, type, layout, components, imagery, logo rules, voice and recipes, packaged as a skill. Then I used AI to generate everything else from it. My job was direction: choosing, rejecting, correcting, and turning every correction into a rule, so the next output needed fewer corrections. The deliverables are the proof:
- **6 banners** (3 Meta, 3 LinkedIn).
- **The Indus Cowork landing page.** The banners and the page share a subject, so you can see one system across formats.
- **Two extra pages** (Bulbul V4 Flash, Document AI), generated from the same playbook to test whether the system holds up on new subjects.

## What's where

| Deliverable | Where |
|---|---|
| 1 · Brand & design system | `design-system/`: start at `SKILL.md`; single file `design.md`; machine tokens `tokens.css` |
| 2 · 3 Meta banners (1080×1350) | `banners/final/meta-*.png` |
| 3 · 3 LinkedIn banners (1200×627) | `banners/final/linkedin-*.png` |
| 4 · Responsive web page | Live `/` (Indus Cowork); exports `exports/page/cowork-{375,768,1440}.png` |
| 5 · Source | the repo (Next.js, plain CSS on the tokens) |
| 6 · This write-up + evidence | `process/writeup.md`, `process/prompt-log.md`, `process/screens/` |
| System tests | `/bulbul`, `/document-ai` (+ exports) · before/after in `process/screens/before-after/` |

## Process

**1. Research, before any design (day 1).** I read sarvam.ai, /brand, /brand-guidelines and /indus-cowork, extracted the site's CSS custom properties (palette, text, stroke and surface roles, radius, breakpoints, containers) and sampled gradient stops from Sarvam's official images. Every value in the system is labelled **[verified]**, **[sampled]** or **[addition]**, and all additions are listed. Sarvam's own fonts are commercial, so I calibrated free stand-ins by measurement (Gambetta for Season Mix, General Sans for Matter, DM Mono for Matter Mono). The swap point is one token.

**2. The system, written for AI.** Each file opens with "Rules for AI" and gives explicit tokens, do/don't lists and recipes rather than adjectives:
- **Visual language:** color (ramps and semantic roles; named gradients blended in OKLab, with grain), type (a fluid scale per role), spacing, radius, motion.
- **Responsive behaviour (`layout.md`):** breakpoints, the 4/8/12 grid, and 14 section patterns described per phone/tablet/desktop as *rearrangements*, not shrinking, with a "fit ladder" for anything that doesn't fit.
- **Components, imagery and logo:** components, the gateway/medallion imagery, and logo rules including misuse.
- **Voice and facts:** voice with a verified fact sheet per product.
- **Recipes:** banners and pages.
- **Three expressions** (Campaign / Product / Community), picked by content type.

**3. Generation, with direction.** Banners came from a recipe-driven builder; pages came from the landing-page playbook. Every round followed the same loop: generate, review in the browser at 375/768/1440, name what's wrong, fix it, then **write the fix into the system** (the playbook in `recipes/landing-page.md` §0 grew to ~40 rules this way). Scripts check what the eye shouldn't have to:
- `check-layout` runs at 10 widths and checks for sideways overflow, sibling sizes and line counts, and 44px tap targets.
- `check-motion`, `check-nav` and `check-banners` check animation, the nav's scroll states and the banner hard rules.
- Every page is checked in both Chromium and WebKit.

**4. My flair, inside the system.**
- **Sibling consistency:** side-by-side blocks have equal widths and heights, aligned rows and identical line counts at every width (`layout.md` §5).
- **Product UI that works:** the dashboards, the approval desk and the Bulbul playground are real, working mini UIs, not screenshots.
- **One theme per page:** each page has its own structure and its own hero light (below).

## Tools

| Tool | Used for |
|---|---|
| **Claude Code (Claude Opus)** | Research (reading Sarvam's pages and CSS), writing the system files, generating banners and pages as code, QA scripts, logging |
| **Playwright** (Chromium + WebKit) | Screenshots at every breakpoint, layout/motion/nav checks, PNG exports |
| **Next.js + Vercel** | The pages and the live site |
| **Nucleo** (MCP, licensed) | Icons. One library only: Core outline, with filled glyphs where the rules allow |
| **Simple Icons / official SVGs** | Third-party brand marks in the integrations grid (nominative use) |
| Fontshare / Google Fonts | Free type stand-ins |

## Key prompts (verbatim, from the log)
- System from the source: *"go over sarvam this pages, /brand and /brand-guidelines, and get the appropriate data and use it and update it"*
- Craft over guesswork: *"In all our gradients I can see horizontal lines…"* → OKLab blending + grain. *"is tracking, spacing, leading, everything, etc, perfect."* → measured type calibration.
- Banners from a subject, not a template: *"What if I want to generate the images in a way where I will give you a subject and based on it you make it for a launch product, for a campaign…"*
- Rules, not taste: *"Have two sets of aspect ratios only… clear and sharper things"* · *"It should not ever stretch."*
- Page hierarchy: *"It's okay to have some sections to be similar as them because your hierarchy and structure are not proper at all."*
- Testing the system: *"create a page… choose a subject from sarvam… basically this is going to be a testing page to me check how consistent you are"*
- Theme ≠ colour: *"by theme… i meant the structure layout and how to present it, so use different colors also"* · *"top to bottom only, always keep in mind"*

## How the system was tested

**1. Before / after (the same prompt, fresh model, no conversation).**
- **Setup:** four headless Claude Code runs in empty folders. Two got only the prompt; two got the prompt plus `design-system/` and the official logos.
- **Without the system:** polished but generic, with an invented logo, made-up numbers and people, a "Pricing / Get started" CTA for a product that isn't generally available, and Inter.
- **With the system:** the official wordmark, the gateway device, a named gradient with grain, Sarvam's nav with the single "Talk to Us" CTA, verified copy, the display serif, the indigo hero light, and a phone layout that *rearranges*.
- **The one drift and its fix:** a soft blurred glow on the banner. That rule existed, but only in a script a fresh model never runs. So the script-enforced banner rules now also sit in `SKILL.md`'s non-negotiables.
- Evidence: `process/screens/before-after/`.

**2. One system, every format.** The same subject (Indus Cowork), tokens and gradients run through 3 Meta banners, 3 LinkedIn banners and the landing page. Each banner is rearranged per format, never cropped or stretched, with one message per banner.

**3. Responsive at every size.** The page is checked at 10 widths, 320 to 1920. Sections rearrange:
- Tab rails become 2×2 grids.
- 3-up cards become horizontal cards on tablet.
- The dashboard has its own phone layout.
- Code panes keep one height across tabs.

Exports: `exports/page/*-{375,768,1440}.png`.

**4. New subjects, same playbook.** Bulbul V4 Flash (text to speech) and Document AI were built from the playbook alone, with facts researched fresh into `voice.md`.
- **What held:** structure, header rhythm, one CTA, real assets, the QA gates.
- **What didn't at first, and became rules:**

| What went wrong | Rule now |
|---|---|
| Bulbul's first pass reused Cowork's formats | Each page's sections come from its own subject (rule 9a) |
| I read "theme" as one colour and made everything orange | A theme is structure + one hero light; colour stays multi-tone |
| Side-by-side gradient colours | Multi-colour gradients stack vertically (rule 12) |
| A code tab that changed the card's height | Tabbed panes keep one fixed height (rule 22) |
| A closing title that ran to 4 lines | Closing titles never go past 2 lines (rule 33b) |

Document AI, built after those rules, needed only craft fixes (aligning layout boxes to text, one illustration redrawn).

**5. What didn't work, early on.**
- **Banners:** rounds 1–4 had white blobs, stretched shapes, too many devices and too much text. They became the banner hard rules (two formats, two text slots, one device, never stretch, sharp edges).
- **The landing page:** v1 copied sarvam.ai's section order, and v2 dropped the hierarchy. v3 tells a story (promise → how → why → made of → control → try → trust → proof → act).
- **The footer wordmark:** it went through gradient → plain white → per-letter colour → a soft grey fill. It is recorded as the one logo exception.

## Considered additions (ours, not Sarvam's)
These sit on top of the verified brand, not instead of it:
- per-page hero lights
- per-item tones
- the sibling-consistency rules
- 44px touch targets
- OKLab blending
- the banner engine
- the "Rules for AI" sections

Each is listed in its file under "Considered additions".
