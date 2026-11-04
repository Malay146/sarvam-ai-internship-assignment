import { Artboard, Banner, BANNER_BRIEFS, EmblemArt, EmblemCard, Eyebrow, Footer, Motif, Nav, SYSTEM_NAV, HeroGlow } from "@/components/sarvam";
import { BookOpen, Sparkles, Library, Plug, Megaphone } from "@/components/icons";
import "./hub.css";

export const metadata = { title: "Sarvam design system" };

const PAGES = [
  { href: "/system/tokens", icon: Library, shape: { family: "medallion" as const, preset: "Ogee cross" }, surface: "lavender" as const, eyebrow: "Foundations", title: "Tokens, type, layout", desc: "Colour, gradients, spacing, type scale and the grid, all live from tokens.css." },
  { href: "/components", icon: Plug, shape: { family: "flower" as const, preset: "Lotus" }, surface: "dawn" as const, eyebrow: "Library", title: "Components", desc: "Cards, features, dashboards, emblems and motion, tested at ten widths." },
  { href: "/system/expressions", icon: Sparkles, shape: { family: "gateway" as const, preset: "Domed door" }, surface: "indigo" as const, eyebrow: "Expressions", title: "Three ways to show up", desc: "Campaign, Product and Community, from one consistent system." },
  { href: "/studio", icon: BookOpen, shape: { family: "medallion" as const, preset: "Lantern medallion" }, surface: "leaf" as const, eyebrow: "Tool", title: "Pattern studio", desc: "Generate gateways, medallions, flowers and dividers from the brand." },
  { href: "/banners", icon: Megaphone, shape: { family: "gateway" as const, preset: "Mihrab" }, surface: "dusk" as const, eyebrow: "Tool", title: "Banner builder", desc: "Turn one subject into Meta and LinkedIn banners, checked and exported." },
];

// Proof: everything below was generated from the files above, then directed and refined.
const PROOF = [
  { href: "/", light: "--light-indigo-glow", kicker: "Product page", title: "Indus Cowork", h1: "Hire an AI teammate that finishes the work", desc: "An approval desk and day timeline, in indigo glow." },
  { href: "/bulbul", light: "--light-garden-sunrise", kicker: "Consistency test", title: "Bulbul V4 Flash", h1: "Voices that sound like home", desc: "A studio and playground, lit by a garden sunrise." },
];

// SKILL.md "Non-negotiables", one line each.
const RULES: [string, string][] = [
  ["Tokens only", "Every colour, size, space, radius and duration comes from tokens.css"],
  ["One expression", "Campaign, Product or Community, picked from the content, never mixed"],
  ["Rearrange", "Layouts move, stack and swap at each tier; they never just shrink"],
  ["Siblings match", "Side-by-side blocks share width, height and line counts at every width"],
  ["Everything fits", "No sideways scroll, no two-line labels, no “…”, from 320 up"],
  ["Gradients stack", "Colours run top → bottom (heroes) or bottom → top (panels), with grain"],
  ["One light per page", "Each page owns its hero light and its formats; controls stay indigo"],
  ["Real assets", "Official wordmark, real logos, facts only from voice.md"],
];

const DOCS = [
  ["SKILL.md", "Start here: the task table says which files to read, in order"],
  ["design.md", "Every file below in one document, for tools that take a single file"],
  ["tokens.md · tokens.css", "Colour, web and campaign gradients, page lights, spacing, radius, shadows, motion"],
  ["typography.md", "Fonts, calibrated tracking, the fluid type scale, banner type, Indic scripts"],
  ["layout.md", "Breakpoints, grid, sibling consistency, 14 section patterns, the fit ladder"],
  ["components.md", "Every component: anatomy, states, container thresholds, motion and icon rules"],
  ["expressions.md", "Campaign, Product, Community: when to use which, and what never changes"],
  ["imagery.md", "Gateways, medallions, flowers, emblems, motifs, product UI, photography"],
  ["logo.md", "Wordmark and logomark rules, clear space, placement, co-branding"],
  ["voice.md", "Tone, headline patterns, the fact sheets, copy budgets per slot"],
  ["recipes/landing-page.md", "The page playbook (§0) and the Indus Cowork page, section by section"],
  ["recipes/bulbul-page.md", "A second page from the same system: its theme, sections and responsive table"],
  ["recipes/banner-builder.md", "The banner engine: spec, devices, presets, subject → banner method"],
  ["recipes/meta-banner.md", "The portrait grid (1080 × 1350) and the final Meta set"],
  ["recipes/linkedin-banner.md", "The landscape grid (1200 × 627) and how each layout rearranges"],
];

const GATES: [string, string][] = [
  ["check-fit", "Nothing sideways, clipped, truncated or wrapped at nine widths"],
  ["check-layout", "Sibling parity: equal heights, widths and line counts"],
  ["check-motion", "Animated parts never change size; dashboards still work"],
  ["check-banners", "Every banner preset × format, on real rendered geometry"],
  ["check-nav", "Overlay nav turns solid on scroll and back at the top"],
  ["check-perf · check-hover", "Paint and raster cost while loops run and cards are hovered"],
];

export default function SystemHub() {
  return (
    <>
      <Nav overlay links={SYSTEM_NAV} cta="Indus Cowork page" ctaHref="/" />
      <main className="hub sr-under-nav">
        <HeroGlow />
        <header className="sr-container hub-intro">
          <Motif />
          <Eyebrow>Sarvam AI · design system</Eyebrow>
          <h1 className="sr-display-product">One system for every Sarvam surface</h1>
          <p className="sr-lead">
            Sarvam&apos;s existing brand, captured as tokens, rules and components that an AI tool or a teammate can use to produce on-brand banners
            and pages. Everything here is built from the system it describes.
          </p>
        </header>

        <section className="sr-container hub-section">
          <div className="sr-card-row" data-siblings="hub cards">
            {PAGES.slice(0, 3).map((p, i) => (
              <a key={p.href} href={p.href} className="hub-link">
                <EmblemCard art={<EmblemArt id={`hub${i}`} shape={p.shape} icon={p.icon} surface={p.surface} />} eyebrow={p.eyebrow} title={p.title} desc={p.desc} />
              </a>
            ))}
          </div>
          <div className="hub-tools" data-siblings="hub tools">
            {PAGES.slice(3).map((p, i) => (
              <a key={p.href} href={p.href} className="hub-wide">
                <div className="hub-wide__art"><EmblemArt id={`hubt${i}`} shape={p.shape} icon={p.icon} surface={p.surface} aspect={2.2} /></div>
                <div className="hub-wide__text" data-sibling>
                  <Eyebrow mono>{p.eyebrow}</Eyebrow>
                  <h2 className="sr-h3" data-line="title">{p.title}</h2>
                  <p className="sr-body" data-line="desc">{p.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="sr-container hub-section hub-gap" aria-labelledby="rules-h">
          <header className="sr-section-head sr-section-head--split">
            <div className="sr-section-head__text"><Eyebrow>At a glance</Eyebrow><h2 id="rules-h" className="sr-h2">Eight rules every piece follows</h2></div>
            <div className="sr-section-head__aside"><p className="sr-lead">The short version of SKILL.md. An AI or a teammate who holds these will produce something on-brand before reading another file.</p></div>
          </header>
          <ol className="hub-rules">
            {RULES.map(([k, v], i) => (
              <li key={k}><span className="hub-rules__n">{String(i + 1).padStart(2, "0")}</span><b>{k}</b><span data-may-wrap>{v}</span></li>
            ))}
          </ol>
        </section>

        <section className="sr-container hub-section hub-gap" aria-labelledby="proof-h">
          <header className="sr-section-head sr-section-head--split">
            <div className="sr-section-head__text"><Eyebrow>Built with it</Eyebrow><h2 id="proof-h" className="sr-h2">Two pages and six banners, one system</h2></div>
            <div className="sr-section-head__aside"><p className="sr-lead">Each page owns its structure and one hero light. The banners use the same type, wordmark rules, spacing and finish.</p></div>
          </header>
          <div className="sr-card-row" data-siblings="proof cards">
            {PROOF.map((p) => (
              <a key={p.href} href={p.href} className="hub-proof" data-sibling>
                <div className="hub-proof__art hub-proof__light">
                  <div className="hub-proof__disc" style={{ backgroundImage: `var(--texture-grain), var(${p.light})` }} aria-hidden />
                  <span className="hub-proof__h1" aria-hidden data-fit-ignore>{p.h1}</span>
                </div>
                <div className="hub-proof__text">
                  <Eyebrow mono>{p.kicker}</Eyebrow>
                  <h3 className="sr-h4" data-line="title">{p.title}</h3>
                  <p className="sr-body" data-line="desc">{p.desc}</p>
                  <span className="hub-arrow">Open the page <span aria-hidden>→</span></span>
                </div>
              </a>
            ))}
            <a href="/banners" className="hub-proof" data-sibling>
              <div className="hub-proof__art hub-proof__banner">
                <Artboard width={1200} height={627} label="Final LinkedIn banner"><Banner spec={BANNER_BRIEFS.find((b) => b.id === "prism")!.spec} format="landscape" id="hub-proof-banner" /></Artboard>
              </div>
              <div className="hub-proof__text">
                <Eyebrow mono>Social</Eyebrow>
                <h3 className="sr-h4" data-line="title">The banner set</h3>
                <p className="sr-body" data-line="desc">Six banners for Meta and LinkedIn, all live here.</p>
                <span className="hub-arrow">See the set <span aria-hidden>→</span></span>
              </div>
            </a>
          </div>
        </section>

        <section className="sr-container hub-section hub-gap">
          <header className="sr-section-head sr-section-head--split">
            <div className="sr-section-head__text"><Eyebrow>The files</Eyebrow><h2 className="sr-h2">Written for AI and for people</h2></div>
            <div className="sr-section-head__aside"><p className="sr-lead">Every value is labelled verified, sampled or added, so nothing is invented. Hand the design-system/ folder to an AI and it knows where to look.</p></div>
          </header>
          <ul className="hub-docs">
            {DOCS.map(([f, d]) => <li key={f}><code className="hub-docs__path">{f}</code><span>{d}</span></li>)}
          </ul>
        </section>

        <section className="sr-container hub-section hub-gap" aria-labelledby="gates-h">
          <header className="sr-section-head sr-section-head--split">
            <div className="sr-section-head__text"><Eyebrow>Quality gates</Eyebrow><h2 id="gates-h" className="sr-h2">Checked by scripts, not by eye</h2></div>
            <div className="sr-section-head__aside"><p className="sr-lead">Run against any page before calling it done: <code>node scripts/&lt;gate&gt;.mjs &lt;url&gt;</code>. Then click every interactive state at 320, 375, 768, 1024 and 1280.</p></div>
          </header>
          <ul className="hub-docs">
            {GATES.map(([f, d]) => <li key={f}><code>scripts/{f}</code><span>{d}</span></li>)}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
