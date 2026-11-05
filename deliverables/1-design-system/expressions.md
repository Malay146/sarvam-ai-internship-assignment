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

Every sample below is rendered by the banner engine (`src/components/sarvam/composer.tsx`); live at `/system/expressions`. Device names are the engine's `device` values.

### A · Campaign: *the gateway opens*
Big, saturated, symmetric. The moment something new arrives.

- **Surfaces:** `dawn`, `saffron-rose`, `dusk`, `olive`, `night`.
- **Hero device** (pick one):
  - `medallion-glow`: one lit medallion holding the headline (Onion lantern, Eight-point star, Scalloped…)
  - `gateway-echo`: nested gateways rising from the edge
  - a **number as the hero** (`primaryIsNumber`, gold treatment)
- **Type:** centred. A product or model name in Matter 600 (`Sarvam Prism`) `[observed]`; statements in Season Mix.
- **Logo:** logomark or wordmark, top-centre, white.
- **Energy:** saturated, symmetric, one moment.
- **Final set:** `prism`, `your-yes`. Presets: `launch`, `announcement`, `milestone`, `funding`.

### B · Product: *the work, shown plainly*
Calm and structured. The object explains.

- **Surfaces:** `indigo-glow`, tints, haze, `plain` (`--color-sf`).
- **Hero device** (pick one):
  - `emblem`: the capability as one engraved object (a Nucleo icon in a frosted medallion)
  - `arch-window`: the gateway as a window onto the product
  - `spectrum`: a calm canvas, the brand spectrum strip and a corner rosette `[addition]`
  - real product UI on a tint panel (web)
- **Type:** left-aligned claim + one fact (split / editorial layouts), Season Mix.
- **Logo:** wordmark, top-left.
- **Energy:** quiet; one accent at a time.
- **Worked example:** `final-trail` (shown on /system/expressions; replaced in the submission set by `your-yes`). Presets: `capability`, `product`, `spectrum`, `sunrise`.

### C · Community: *people, warmly*
Light, warm and floral. Programs, partners and people.

- **Surfaces:** `plain`, `spring`, `lavender-dusk`, `meadow`.
- **Hero device** (pick one):
  - `gloss`: a cluster of glossy flowers and medallions beside the text (social 03, 10, 11)
  - `medallion-glow` on a soft ground + the **partner lockup** `sarvam · PARTNER`
  - `script-mandala`: "Sarvam" in nine scripts, for India-wide stories `[addition]`
- **Type:** Season Mix 400; left in splits, centred on shapes.
- **Logo:** wordmark or partner lockup, top-left (split) or top-centre.
- **Energy:** gentle and welcoming; colour comes from the shapes, not heavy fields.
- **Final set:** `final-early-access`. Presets: `program`, `event`, `story`, `partnership`, `mission`.

**The test:** the same message ("Indus Cowork early access") rendered in all three expressions sits on `/system/expressions`. The copy and the constants hold; the surface, device and energy change.

---

## 3. What stays identical (the consistency contract)

| Element | Rule (all three) |
|---|---|
| Wordmark | Official SVG, black on light / white on dark, `"r"` clear space, never the logomark beside it |
| Headline | One idea, ≤ 8 words, sentence case, display or Matter role from `typography.md` |
| Margins | 6–8% of the short side on banners; container tokens on web |
| Grain | On every gradient and every glow |
| Shapes | Only from `/studio` families (gateway, medallion, flower); one hero device per piece; never stretched |
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
