# Source files

The rest of this repo is the source. It's a Next.js app that reads every value from the design system's tokens.

| Path | What it is |
|---|---|
| `src/app/page.tsx`, `src/app/cowork.css` | The Indus Cowork page (deliverable 4) |
| `src/app/bulbul/`, `src/app/document-ai/` | The two system-test pages |
| `src/components/sarvam/` | The component library: nav, footer, dashboards, banner engine (`composer.tsx`) |
| `src/components/icons/` | Nucleo icons (licensed, Core set only) |
| `src/lib/shapes.ts` | Gateway, medallion and flower geometry (also in `/studio`) |
| `src/app/system/`, `/components`, `/studio`, `/banners` | Review pages for the system, components, pattern tool and banners |
| `banners/briefs.json` | Banner specs; `scripts/export-banners.mjs` renders them to PNG |
| `scripts/` | Exports (`export-page`, `export-banners`), QA (`check-layout`, `check-fit`, `check-motion`, `check-nav`, `check-banners`), `build-design-md` |
| `.claude/skills/sarvam-banner/` | The banner skill for Claude Code |
| `process/` | Working log (`prompt-log.md`) and iteration screenshots |
| `references/` | Brand research notes (Sarvam's own images are kept local, not republished) |

Run it: `npm install && npm run dev`, then open http://localhost:3000.
