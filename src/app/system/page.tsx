import { EmblemArt, EmblemCard, Eyebrow, Footer, Motif, Nav, SYSTEM_NAV, HeroGlow } from "@/components/sarvam";
import { BookOpen, Sparkles, Library, Plug } from "@/components/icons";
import "./hub.css";

export const metadata = { title: "Sarvam design system" };

const PAGES = [
  { href: "/system/tokens", icon: Library, shape: { family: "medallion" as const, preset: "Ogee cross" }, surface: "lavender" as const, eyebrow: "Foundations", title: "Tokens, type, layout", desc: "Colour, gradients, spacing, type scale and the grid, all live from tokens.css." },
  { href: "/components", icon: Plug, shape: { family: "flower" as const, preset: "Lotus" }, surface: "dawn" as const, eyebrow: "Library", title: "Components", desc: "Cards, features, dashboards, emblems and motion, tested at ten widths." },
  { href: "/system/expressions", icon: Sparkles, shape: { family: "gateway" as const, preset: "Domed door" }, surface: "indigo" as const, eyebrow: "Expressions", title: "Three ways to show up", desc: "Campaign, Product and Community, from one consistent system." },
  { href: "/studio", icon: BookOpen, shape: { family: "medallion" as const, preset: "Lantern medallion" }, surface: "leaf" as const, eyebrow: "Tool", title: "Pattern studio", desc: "Generate gateways, medallions, flowers and dividers from the brand." },
];

const DOCS = [
  ["SKILL.md", "Start here: what the system is and which file to read for each task"],
  ["tokens.md · tokens.css", "Colour, gradients (web + campaign), spacing, radius, shadows, motion"],
  ["typography.md", "Fonts, calibrated tracking, the fluid type scale, banner type"],
  ["layout.md", "Breakpoints, grid, alignment, sibling consistency, 14 section patterns"],
  ["components.md", "Every component: anatomy, states, tiers, motion and icon rules"],
  ["expressions.md", "Campaign, Product, Community: when to use which"],
  ["imagery.md", "Gradients, gateways, emblems, motifs, product UI, photography"],
  ["logo.md", "Wordmark and logomark rules, clear space, placement"],
  ["voice.md", "Tone, headline patterns, the Indus Cowork fact sheet, copy budgets"],
  ["recipes/", "Step-by-step builds for Meta, LinkedIn and the landing page"],
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
          <a href={PAGES[3].href} className="hub-wide">
            <div className="hub-wide__art"><EmblemArt id="hub3" shape={PAGES[3].shape} icon={PAGES[3].icon} surface={PAGES[3].surface} aspect={2.2} /></div>
            <div className="hub-wide__text">
              <Eyebrow mono>{PAGES[3].eyebrow}</Eyebrow>
              <h2 className="sr-h3">{PAGES[3].title}</h2>
              <p className="sr-body">{PAGES[3].desc}</p>
            </div>
          </a>
        </section>

        <section className="sr-container hub-section">
          <header className="sr-section-head sr-section-head--split">
            <div className="sr-section-head__text"><Eyebrow>The files</Eyebrow><h2 className="sr-h2">Written for AI and for people</h2></div>
            <div className="sr-section-head__aside"><p className="sr-lead">Every value is labelled verified, sampled or added, so nothing is invented. Hand the folder to an AI and it knows where to look.</p></div>
          </header>
          <ul className="hub-docs">
            {DOCS.map(([f, d]) => <li key={f}><code>design-system/{f}</code><span>{d}</span></li>)}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
