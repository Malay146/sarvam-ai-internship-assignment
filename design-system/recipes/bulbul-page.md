# Recipe · Bulbul V4 Flash page (`/bulbul`)

> **Built:** `src/app/bulbul/page.tsx` + `src/app/bulbul/bulbul.css` (prefix `bb-`) + `src/components/sarvam/{bulbul-play,bulbul-wave,bulbul-data}.tsx`.
> Facts: `voice.md` §5, Bulbul fact sheet (sources and source conflicts listed there). Playbook: `landing-page.md` §0. This page was the consistency test for the playbook.

## 0. Theme
Bulbul's theme is its **structure and presentation**: a studio hero, a tracklist, a chorus band, a ripple stage, a multitrack, a live playground (`landing-page.md` rule 9a). It is **not a single colour**. Colour stays the system's: indigo for controls and selection, and the full tone set given per item.

| Where | Treatment |
|---|---|
| Hero light | **Bulbul horizon, a garden at sunrise**: leaf green `#5fae8c` → spring green `#94cc86` → lime `#cfdc84` → marigold `#f4d474` → cream `#fbe1b4`, radial from the top, colour and alpha eased over 17 stops (no ring). It uses Sarvam's green and yellow craft ramps so it can't be confused with the homepage Sun (orange) or Cowork's indigo glow. |
| Controls | System indigo: selection rings, slider, segmented pills, playhead, live dots, level meters |
| Per-item tone | `data-tone` sets `--t`, `--t-soft` and `--t-w1/2`. Tracklist rows: 01 indigo, 02 rose, 03 green, 04 orange. The voice stage and its ripple take the voice's tone. Lanes take theirs. Fact icons: orange, indigo, green. Doors: indigo, orange, rose. |
| Filled icons | Glyphs with a gradient in their own tone, rising bottom → top, plus a soft inner shadow and no tile (`#bb-grad-<tone>`, `#bb-icon-inset`) |
| Panels | The chorus band is the Dawn sky (top → bottom). The request panel is the indigo tint. All carry grain. |
| Closing card | `CtaCard` on **Dusk** (multi-colour, night into saffron) |
| Pattern | Only on the voice stage: Sarvam's medallion repeated outward like sound (`MedallionEcho`), in the voice's tone, breathing while it speaks |

## 1. Sections

| # | Beat | Section | Header | Format (Bulbul's own unless marked) | Interaction |
|---|---|---|---|---|---|
| 1 | Promise | Voices that sound like home | (hero) | Studio: script, waveform, settings; Generate → stream → play, with words lighting up as they are spoken | plays itself |
| 2 | Why | Built for the depth of Indian speech | split | **Tracklist**: 01–04 rows, each with a transcript clip on a Dawn well (marks, tags or written → spoken rows) | passive |
| 3 | Where | Eleven languages, each in its own script | centred | **Chorus**: 11 greetings in large type on the Dawn band; one at a time is "sung" (ring + level meter); a code-mixed note | passive loop |
| 4 | Try (light) | A voice for every experience | split | Voice list + **ripple stage**: pick a voice, hear its line stream and play | hands-on; cycles until touched |
| 5 | Range | One model. Many experiences. | centred | **Multitrack**: six lanes with a time ruler; one saffron playhead sweeps every lane while visible | passive |
| 6 | Build | Made for developers. Scales for enterprises. | split | Fact list with filled gradient icons and SDK chips (official Python and Node.js marks) + **request timeline** (sent → first audio → streams → ready; delivery mode rotates) | plays itself |
| 7 | Try it | Shape the voice, then ship it | centred + eyebrow | **Playground**: voice chips, pace slider, rate and format segmented controls → a live cURL / Python / JS request in a **fixed-height** area (scrolls with a soft fade, so the cards never change size between tabs; changed values flash) + a **Response** panel that replays on every change (pace sets the clip length, sample rate its detail: 8 kHz stepped, 48 kHz smooth). Copy swaps icon + label in place (fixed width, turns green), with a fallback if clipboard access is blocked; then Get API key | hands-on |
| 8 | Upgrade | Switch from V3 in one line | split | Diff card + "What you get for that one line" checklist | passive |
| 9 | Where to use | Use it where you build | centred | **Doors**: one band, three columns (API, Playground, Content Studio), each with a link | links |
| 10 | Questions | Questions developers ask first | centred | `OneFaq` (shared), 8 questions | accordion |
| 11 | Act | Your next million conversations can sound more human. (Sarvam's line; title 30ch wide, balanced, scales on phones, so it stays at 2 lines) | — | `CtaCard` (shared) on Dusk | Get API key |

Shared with every page: `MegaNav` (CTA "Get API key"), `HeroGlow` + `Motif`, `SectionHeader`, `OneFaq`, `CtaCard`, `SiteFooter`, tokens, `pv-seg` and `pv-again` controls.

## 2. Responsive

| Section | Phone (<768) | Tablet (768–1023) | Desktop (≥1024) |
|---|---|---|---|
| Studio | script, player, then settings in a 2-up grid; bar hides the model chip | main 8 / settings 4 | same; script 22–28px |
| Tracklist | number, text, then clip | number / text 5 / clip 6 | same, more padding |
| Chorus | 2-up tiles | wrapped row, centred | same |
| Voices | sideways rail of voice buttons (edge to edge), then the stage | 2-up list above the stage | list 7 / stage 5, rows stretch to the stage |
| Multitrack | label above each lane; no ruler, no playhead | label column 320px + lanes, ruler, playhead | label 360px |
| Developers | facts, then timeline | same | facts 5 / timeline 7 |
| Playground | controls, then code | voices 4-up | controls 5 / code 7, equal height |
| Diff | stacked | 2 columns | same |
| Doors | stacked, hairlines between | 3 columns | same |

## 3. Copy rules for this page
- Facts only from the fact sheet. Don't claim pitch or loudness for V4 Flash (the API docs say V2 only). Use `language_code`, not `target_language_code`.
- The sample lines come from Sarvam's own samples where they exist; the rest are short everyday lines that claim nothing. Written → spoken readings are illustrative.
- Voice avatars are studio shapes (our geometry), never faces.
