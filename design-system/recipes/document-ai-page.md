# Recipe · Document AI page (`/document-ai`)

> **Built:** `src/app/document-ai/page.tsx` + `src/app/document-ai/document-ai.css` (prefix `da-`) + `src/components/sarvam/{doc-play,doc-data}.tsx`.
> Facts: `voice.md` §5, Document AI fact sheet. Playbook: `landing-page.md` §0. Third page built from the same system, after Indus Cowork and Bulbul.

## 0. Theme: paper and ink
The theme is the **structure and presentation** (rule 9a): everything is a document. That means a workspace with a scanned page, the same page read twice, file folders, a proofreading desk, a type-specimen sheet, translated pages and library index cards. Colour stays the system's: indigo for controls and selection, with tones given per item.

| Where | Treatment |
|---|---|
| Hero light | **Seal ink** (tokens.md §2.4c): red-rose `#cf5f5a` → `#e3847a` → blush `#f0a99c` → `#f6c9b9` → paper `#f9e2d3` → `#fcf1e6`, a radial from the top, eased over 17 stops (no ring). It is the ink of an official seal and an editor's red pen. Only the outer blush and cream show. |
| Paper | Documents are warm paper `#fffdf8` with a hairline, a soft shadow and multiply grain. Desks behind pages are a kraft tint (`#f6efe6 → #ecdfcf`, vertical). |
| Element tones | The six element types keep one tone everywhere (box, number, output row): Heading indigo, Paragraph green, Table orange, Handwriting rose, Footnote neutral |
| Filled icons | Glyphs with a gradient in their tone, rising bottom → top, plus a soft inner shadow and no tile (`#da-grad-<tone>`, `#da-icon-inset`) |
| Closing card | `CtaCard` on Sarvam's **saffron-rose** campaign gradient turned upside down (deep rose at the top for white type, saffron at the foot) |
| Pattern | None besides the shared card lattice: the paper is the motif |

## 1. Sections

| # | Beat | Section | Header | Format | Interaction |
|---|---|---|---|---|---|
| 1 | Promise | Every page, read the way it was written | (hero) | **Workspace**: a scanned Hindi land-record page. A scan line sweeps, then six layout boxes appear in reading order (numbered, typed) and the Markdown output fills in beside them. | plays itself |
| 2 | Why | Where plain OCR falls short | split | **Read twice**: four tabs (Sarvam's four pain points). Plain OCR (muted, broken) next to Document AI (structured) on paper. All states share one cell, so the height never changes. | auto-cycles; tabs |
| 3 | What | Parse it. Extract it. Translate it. | centred | **Folders**: three tabbed folders (indigo, orange, green) with the formats each returns as file chips | passive |
| 4 | Control | Check every element against its source | split | **Proofreading desk**: output elements (with a "1 fix" agent correction) ↔ the page, the chosen element's box lit, with its location | hands-on; cycles until touched |
| 5 | Where | English and 22 Indian languages | centred | **Specimen sheet**: languages grouped by script, each with a large glyph and the languages in their own names; a "Mixed pages" cell completes the last row at every width | passive |
| 6 | Translate | Translate the whole document, layout and all | split | **Translated pages**: an English textbook page with a labelled line diagram (sun, leaf with veins, water, CO₂, O₂) → the Hindi page with the same diagram and translated labels (fills in at Review), four steps (Upload, Choose, Review, Export) and limit chips | plays itself |
| 7 | Who | Built for documents that matter | centred | **Index cards**: five library cards (lettered tab, red margin rule, ruled lines, punched hole), titles always 2 lines | passive |
| 8 | Access | Two ways in | split | API vs Platform, two tinted cards with forward-arrow links | links |
| 9 | Questions | Questions teams ask first | centred | `OneFaq`, 8 | accordion |
| 10 | Act | Down to the last page. | — | `CtaCard` on saffron-rose | Try Document AI |

## 2. Responsive

| Section | Phone (<768) | Tablet (768–1023) | Desktop (≥1024) |
|---|---|---|---|
| Workspace | page, then output; the bar hides the page chip | page 5 / output 6 | same |
| Read twice | tabs as a 2 × 2 grid (< 600), sides stacked | sides 2-up | same |
| Folders | stacked | 3-up | same |
| Proofreading | list, then page | same | list 5 / page 7, list rows stretch to the page height |
| Specimen | 2 columns (wide scripts span 2) | 4 columns | 6 columns from 1280 |
| Translate | pages stacked, steps 2 × 2 | pages side by side with an arrow | steps 4-up |
| Index cards | stacked | 2-up | 5-up |

## 3. Copy rules
- Facts only from the fact sheet: no accuracy numbers, benchmarks or customers (Sarvam publishes none).
- The sample land record, the textbook page and the OCR errors are illustrative UI text. No real person or record appears. Hindi is checked; numbers stay identical across views (214 / 0.42, 215 / 1.10, 219 / 0.75).
- The language count is "English and 22 Indian languages" (Sarvam's own wording on this page).
