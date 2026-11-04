# Sarvam AI · Design Engineer Internship take-home

**Malay Patel** · A design system built on Sarvam's existing brand, and everything generated from it.

**Live site → https://sarvam-ai-internship-assignment-4of.vercel.app/**

The brand system is the main deliverable. I captured Sarvam's brand as explicit tokens, rules and recipes written for AI, then used AI to generate the banners and the page from it, while I directed, rejected and refined. Every correction became a rule. The banners and the page are the proof that the system works.

## Deliverables

| # | Deliverable | Link |
|---|---|---|
| 1 | **Brand & design system** (packaged as a skill) | [`design-system/SKILL.md`](design-system/SKILL.md) (start here) · single file [`design.md`](design-system/design.md) · tokens [`tokens.css`](design-system/tokens.css) · visual review [/system](https://sarvam-ai-internship-assignment-4of.vercel.app/system) |
| 2 | **3 Meta banners** (1080×1350) | [`banners/final/`](banners/final) · gallery [/banners](https://sarvam-ai-internship-assignment-4of.vercel.app/banners) |
| 3 | **3 LinkedIn banners** (1200×627) | [`banners/final/`](banners/final) |
| 4 | **Responsive web page**: Indus Cowork | **[Live](https://sarvam-ai-internship-assignment-4of.vercel.app/)** · exports [375](exports/page/cowork-375.png) · [768](exports/page/cowork-768.png) · [1440](exports/page/cowork-1440.png) |
| 5 | **Source files** | this repo (Next.js; plain CSS on the system's tokens) |
| 6 | **Write-up**: process, tools, key prompts, testing | [`process/writeup.md`](process/writeup.md) · full log [`process/prompt-log.md`](process/prompt-log.md) |

## The banners
One subject (Indus Cowork), one message per banner. Each banner is rearranged per format, never cropped or stretched.

| Meta 1080×1350 | LinkedIn 1200×627 |
|---|---|
| <img src="banners/final/meta-1-sarvam-prism.png" width="260"> | <img src="banners/final/linkedin-1-sarvam-prism.png" width="420"> |
| <img src="banners/final/meta-2-every-task-leaves-a-trail.png" width="260"> | <img src="banners/final/linkedin-2-every-task-leaves-a-trail.png" width="420"> |
| <img src="banners/final/meta-3-indus-cowork-early-access.png" width="260"> | <img src="banners/final/linkedin-3-indus-cowork-early-access.png" width="420"> |

## How the system was tested
- **Before / after:** the same prompt went to a fresh model in an empty folder, once without the system and once with it. Without, it invented a logo, numbers and a wrong CTA; with, the output was on-brand. See [`process/screens/before-after/`](process/screens/before-after).
- **New subjects, same playbook:** two more pages, each with its own theme (structure + hero light), generated from the system:
  - [Bulbul V4 Flash](https://sarvam-ai-internship-assignment-4of.vercel.app/bulbul) · exports [375](exports/page/bulbul-375.png) · [768](exports/page/bulbul-768.png) · [1440](exports/page/bulbul-1440.png)
  - [Document AI](https://sarvam-ai-internship-assignment-4of.vercel.app/document-ai) · exports [375](exports/page/document-ai-375.png) · [768](exports/page/document-ai-768.png) · [1440](exports/page/document-ai-1440.png)
- **Responsive at every width:** every page is checked at 10 widths (320–1920) in Chromium and WebKit for sideways overflow, sibling sizes and line counts, and 44px touch targets.

## Tools
Claude Code (Claude Opus) for research, the system, generation and QA scripts · Playwright for checks and exports · Next.js + Vercel · Nucleo icons · free type stand-ins: Gambetta, General Sans, DM Mono (Sarvam's fonts are commercial; the swap point is one token).

## Run it locally
```bash
npm install
npm run dev                              # http://localhost:3000
node scripts/export-page.mjs             # page exports → exports/page/
node scripts/check-layout.mjs http://localhost:3000/   # layout QA at 10 widths
```

*Sarvam's own reference images are kept locally as research and aren't republished here. What I took from them is written up in [`references/brand-findings.md`](references/brand-findings.md).*
