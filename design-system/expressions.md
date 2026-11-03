# Expressions

One Sarvam system, three ways of showing up. Every expression uses the same tokens, type roles, wordmark rules, spacing, grain and sibling rules. Only the **surface**, the **hero device** and the **energy** change. Derived from Sarvam's own split between its website and its social feed (`references/social/README.md`).

**Source labels:** `[observed]` seen in Sarvam's posts and site · `[addition]` our rule.

---

## Rules for AI (read first)

1. **Pick the expression from the content type, never from taste.** Use the table in §1.
2. **Never mix two expressions** in one piece. A Product page section can sit next to a Campaign hero band, but a single banner is one expression.
3. **The constants never change:** the wordmark (official file, black or white, small), Season Mix / Matter roles, the 4px spacing system, the grain, the margins, one hero device, sentence case, the "Talk to Us" CTA for Indus Cowork.
4. **Each expression has its own palette list.** Don't borrow across.

---

## 1. Choosing

| Content | Expression |
|---|---|
| Model or product launch, funding, a big announcement, a waitlist | **Campaign** |
| Features, "how it works", the product landing page, docs, release notes, dashboards | **Product** |
| Customer stories, programs (Startup, Champions), events, hiring, community, partnerships | **Community** |

---

## 2. The three expressions

### A · Campaign: *the gateway opens*
Big, saturated, symmetric. The moment something new arrives.

- **Surfaces:** `--gradient-dusk`, `--gradient-dawn`, `--gradient-indigo-glow`, `--gradient-saffron-rose`, `--gradient-olive`, `--gradient-night`.
- **Hero device** (pick one):
  - a **gateway window** onto a gradient (social 02, 06)
  - **nested gateway echoes** filling the frame (social 12; our echo rings)
  - an **emblem** (EmblemArt)
- **Type:** centred. Display headline 2–5 words (Season Mix 300–400). For a product or model name, Matter 500 (`Sarvam 30B`) `[observed]`. Optional 1-line sub.
- **Wordmark:** top-centre, white on dark surfaces.
- **Energy:** high contrast, one strong colour family, nothing else on the canvas.

### B · Product: *the work, shown plainly*
Calm, white, informative. The product is the image.

- **Surfaces:** `--color-sf` / white, `--gradient-haze`, tint panels (`--gradient-tint-*`), `--mesh-card-light`. A gradient only behind the product UI.
- **Hero device:**
  - **real product UI** (MockPlan / MockResearch / MockReview, the dashboards) on a tint panel
  - **split layouts** (text left, UI right)
- **Type:** left-aligned in splits. Season Mix H2 claim + Matter lead. Eyebrow = product name (indigo accent).
- **Wordmark:** top-left, black.
- **Energy:** quiet, structured, lots of white. Accents in indigo, orange and green one at a time (feature sequence).

### C · Community: *people, warmly*
Soft, warm, floral. Stories about people and partners.

- **Surfaces:** `--gradient-lavender-dusk`, `--gradient-spring`, `--gradient-meadow`, tints. **Soft cloud** (`cloudSVG`, `--color-cloud`) as the text ground.
- **Hero device** (pick one):
  - a **soft cloud** behind a centred headline (social 05, 07)
  - **gloss shapes**: a cluster of 2–4 glossy flowers and medallions beside the text (social 03, 10)
  - a **shape cluster**: a mirrored arrangement of small gloss shapes (social 11)
- **Type:** Season Mix 400, centred on a cloud and left in splits. Partner lockup `sarvam · PARTNER` above the headline.
- **Wordmark:** top-centre (cloud) or top-left (split), black.
- **Energy:** gentle and welcoming; colour comes from the shapes, not from heavy fields.

---

## 3. What stays identical (the consistency contract)

| Element | Rule (all three) |
|---|---|
| Wordmark | Official SVG, black on light / white on dark, `"r"` clear space, never the logomark beside it |
| Headline | One idea, ≤ 8 words, sentence case, display or Matter role from `typography.md` |
| Margins | 6–8% of the short side on banners; container tokens on web |
| Grain | On every gradient and every glow |
| Shapes | Only from `/studio` families (gateway, medallion, flower); one shape family per piece |
| Icons | Nucleo Core outline, 1.5 stroke |
| CTA | At most one: a pill button (web) or a small chip / URL line (banners) |
| Contrast | Text and symbols pass `tokens.md` §1.6 and `components.md` §3.2 |

---

## 4. Quick test: is it on-system?

1. Can you name its expression in one word? If not, it's mixing.
2. Is there exactly one hero device?
3. Does every colour trace back to a token?
4. Is the wordmark the official file, small, and in its clear space?
5. Would it sit happily next to Sarvam's last three posts?
