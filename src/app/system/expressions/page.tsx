// /system/expressions: the three expressions, rendered by the same banner engine that made the final set.
// Spec: design-system/expressions.md. Every artboard below is a live render of a BannerSpec (no screenshots).
import { Artboard, Banner, BANNER_BRIEFS, Eyebrow, Footer, Nav, SITUATIONS, SYSTEM_NAV, type BannerSpec, type Situation } from "@/components/sarvam";
import "../hub.css";

export const metadata = { title: "Expressions · Sarvam design system" };

const brief = (id: string) => BANNER_BRIEFS.find((b) => b.id === id)!.spec;

type Expr = {
  id: "campaign" | "product" | "community"; n: string; name: string; line: string; when: string[];
  surfaces: { cls: string; name: string }[]; devices: string[]; type: string; logo: string; energy: string;
  hero: BannerSpec; heroId: string; more: Situation[];
};

const EXPRESSIONS: Expr[] = [
  {
    id: "campaign", n: "01", name: "Campaign", line: "The gateway opens",
    when: ["Model and product launches", "Funding and milestones", "Big announcements"],
    surfaces: [{ cls: "sr-gradient-dawn", name: "Dawn" }, { cls: "sr-gradient-saffron-rose", name: "Saffron rose" }, { cls: "sr-gradient-dusk", name: "Dusk" }, { cls: "sr-gradient-olive", name: "Olive" }],
    devices: ["One lit medallion holding the headline", "Gateway echoes rising from the edge", "Number set as the hero"],
    type: "Centred. Name in Matter 600, statements in Season Mix", logo: "Logomark or wordmark, top-centre, white", energy: "Saturated, symmetric, one moment",
    hero: brief("prism"), heroId: "prism", more: ["launch", "announcement", "milestone"],
  },
  {
    id: "product", n: "02", name: "Product", line: "The work, shown plainly",
    when: ["Features and capabilities", "How it works, security, trust", "The landing page"],
    surfaces: [{ cls: "sr-gradient-indigo-glow", name: "Indigo glow" }, { cls: "sr-tint-indigo", name: "Indigo tint" }, { cls: "sr-haze", name: "Haze" }, { cls: "ex-sw-plain", name: "Surface" }],
    devices: ["An emblem: the capability as one engraved object", "The arch as a window onto the product", "Real product UI on a tint panel"],
    type: "Left-aligned claim + one fact, Season Mix", logo: "Wordmark, top-left", energy: "Calm, structured, the object explains",
    hero: brief("final-trail"), heroId: "final-trail", more: ["product", "spectrum", "sunrise"],
  },
  {
    id: "community", n: "03", name: "Community", line: "People, warmly",
    when: ["Programs and early access", "Partners and customer stories", "Events and hiring"],
    surfaces: [{ cls: "ex-sw-plain", name: "Surface" }, { cls: "sr-gradient-spring", name: "Spring" }, { cls: "sr-gradient-lavender-dusk", name: "Lavender dusk" }, { cls: "sr-gradient-meadow", name: "Meadow" }],
    devices: ["A cluster of gloss flowers and medallions", "Partner lockup: sarvam · Partner", "Script mandala for India-wide stories"],
    type: "Season Mix, left in splits, centred on shapes", logo: "Wordmark or partner lockup, top-left", energy: "Light, warm, colour from the shapes",
    hero: brief("final-early-access"), heroId: "final-early-access", more: ["event", "partnership", "mission"],
  },
];

// One message, three expressions: the expression changes the surface, device and energy; the copy and constants stay.
const SAME = { primary: "Indus Cowork early access", secondary: "Talk to us about your team's workflows", secondaryPlace: "below" as const, titleStyle: "serif" as const };
const TRIO: { name: string; spec: BannerSpec }[] = [
  { name: "Campaign", spec: { ...SAME, background: "saffron-rose", device: "medallion-glow", shape: "Onion lantern", treatment: "white", mark: "inside", titleStyle: "sans" } },
  { name: "Product", spec: { ...SAME, background: "indigo-glow", device: "emblem", shape: "Scalloped medallion", icon: "inbox", treatment: "white", mark: "inside" } },
  { name: "Community", spec: { ...SAME, layout: "split", background: "plain", device: "gloss", treatment: "ink", mark: "inside", partner: "Partner" } },
];

const CONSTANTS: [string, string][] = [
  ["Wordmark", "Official file, black on light, white on dark, never beside the logomark"],
  ["Type", "Season Mix for statements, Matter for names and lines; two text sections at most"],
  ["Headline", "One idea, sentence case; ≤ 3 lines on Meta, ≤ 2 on LinkedIn, never shrunk to fit"],
  ["Shapes", "Only the studio families: gateway, medallion, flower; one hero device"],
  ["Finish", "Grain on every gradient; crisp 1.5px edges; no drop-shadow blobs"],
  ["Spacing", "Margins of 72 / 56px; 1.5× margin of clear space beside every shape"],
];

export default function ExpressionsPage() {
  return (
    <>
      <Nav overlay links={SYSTEM_NAV} cta="Banners" ctaHref="/banners" />
      <main className="hub sr-under-nav">
        <header className="sr-container hub-intro">
          <Eyebrow>Expressions</Eyebrow>
          <h1 className="sr-display-product">One system, three ways to show up</h1>
          <p className="sr-lead ex-lead">Pick the expression from the content, never from taste. The copy, type, logo rules, spacing and finish stay the same; only the surface, the hero device and the energy change.</p>
          <ol className="ex-index">
            {EXPRESSIONS.map((e) => (
              <li key={e.id}><a href={`#${e.id}`}><span className="ex-index__n">{e.n}</span><span className="ex-index__name">{e.name}</span><span className="ex-index__line">{e.line}</span></a></li>
            ))}
          </ol>
        </header>

        {EXPRESSIONS.map((e) => (
          <section key={e.id} id={e.id} className="sr-container ex-band" aria-labelledby={`${e.id}-h`}>
            <div className="ex-band__head">
              <p className="ex-band__n">{e.n}</p>
              <h2 id={`${e.id}-h`} className="sr-h2">{e.name}</h2>
              <p className="ex-band__line">{e.line}</p>
            </div>
            <div className="ex-band__spec">
              <div className="ex-block">
                <p className="sr-eyebrow">Use it for</p>
                <ul className="ex-list">{e.when.map((w) => <li key={w}>{w}</li>)}</ul>
              </div>
              <div className="ex-block">
                <p className="sr-eyebrow">Surfaces</p>
                <ul className="ex-swatches">{e.surfaces.map((s) => <li key={s.name}><span className={`ex-swatch ${s.cls}`} aria-hidden /><span>{s.name}</span></li>)}</ul>
              </div>
              <div className="ex-block">
                <p className="sr-eyebrow">Hero device (pick one)</p>
                <ul className="ex-list">{e.devices.map((d) => <li key={d}>{d}</li>)}</ul>
              </div>
              <dl className="ex-facts">
                <div><dt>Type</dt><dd>{e.type}</dd></div>
                <div><dt>Logo</dt><dd>{e.logo}</dd></div>
                <div><dt>Energy</dt><dd>{e.energy}</dd></div>
              </dl>
            </div>
            <div className="ex-band__art">
              <figure className="ex-pair">
                <Artboard width={1080} height={1350} label={`${e.name}: Meta`}><Banner spec={e.hero} format="portrait" id={`ex-${e.id}-p`} /></Artboard>
                <Artboard width={1200} height={627} label={`${e.name}: LinkedIn`}><Banner spec={e.hero} format="landscape" id={`ex-${e.id}-l`} /></Artboard>
              </figure>
              <p className="sr-meta ex-caption">From the final set · <code>{e.heroId}</code> · Meta 1080×1350 and LinkedIn 1200×627, rearranged per format</p>
              <div className="ex-more">
                <p className="sr-eyebrow">More in {e.name}</p>
                <div className="ex-more__grid">
                  {e.more.map((s) => (
                    <figure key={s} className="ex-more__item">
                      <Artboard width={1080} height={1350} label={`${s} preset`}><Banner spec={SITUATIONS[s]} format="portrait" id={`ex-more-${s}`} /></Artboard>
                      <figcaption className="sr-meta"><code>{s}</code> · {SITUATIONS[s].device}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}

        <section className="sr-container ex-band ex-band--stack" aria-labelledby="same-h">
          <header className="ex-same__head">
            <Eyebrow>The test</Eyebrow>
            <h2 id="same-h" className="sr-h2">Same message, three expressions</h2>
            <p className="sr-body">One brief, “Indus Cowork early access”, rendered three ways. The words and the constants hold; the expression decides how loud it is.</p>
          </header>
          <div className="ex-trio">
            {TRIO.map((t) => (
              <figure key={t.name} className="ex-trio__item">
                <Artboard width={1080} height={1350} label={`Early access as ${t.name}`}><Banner spec={t.spec} format="portrait" id={`ex-same-${t.name}`} /></Artboard>
                <figcaption><span className="ex-trio__name">{t.name}</span><span className="sr-meta">{t.spec.device}</span></figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="sr-container ex-band ex-band--stack" aria-labelledby="const-h">
          <header className="ex-same__head">
            <Eyebrow>The contract</Eyebrow>
            <h2 id="const-h" className="sr-h2">What never changes</h2>
          </header>
          <ul className="ex-contract">
            {CONSTANTS.map(([k, v]) => <li key={k}><b>{k}</b><span>{v}</span></li>)}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
