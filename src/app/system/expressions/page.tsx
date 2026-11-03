import { Artboard, CampaignBanner, CommunityBanner, Eyebrow, Footer, Nav, ProductBanner, SYSTEM_NAV, HeroGlow } from "@/components/sarvam";
import "../hub.css";

export const metadata = { title: "Expressions · Sarvam design system" };

const EXPRESSIONS = [
  {
    id: "campaign", name: "Campaign", line: "The gateway opens", use: "Launches, funding, big announcements",
    chips: ["sr-gradient-saffron-rose", "sr-gradient-dusk", "sr-gradient-olive", "sr-gradient-indigo-glow"],
    rules: [["Surface", "Saturated campaign gradient"], ["Device", "Gateway window or nested echoes"], ["Type", "Centred, 2–5 words, Season Mix or Matter 500"], ["Wordmark", "Top-centre, white"]],
    sample: <Artboard width={1080} height={1350} label="Campaign banner sample"><CampaignBanner /></Artboard>,
  },
  {
    id: "product", name: "Product", line: "The work, shown plainly", use: "Features, how it works, the landing page",
    chips: ["sr-tint-indigo", "sr-tint-orange", "sr-tint-green", "sr-haze"],
    rules: [["Surface", "White, haze or a tint panel"], ["Device", "Real product UI in a tint panel"], ["Type", "Left-aligned claim + lead"], ["Wordmark", "Top-left, black"]],
    sample: <Artboard width={1080} height={1350} label="Product banner sample"><ProductBanner /></Artboard>,
  },
  {
    id: "community", name: "Community", line: "People, warmly", use: "Stories, programs, events, partners",
    chips: ["sr-gradient-lavender-dusk", "sr-gradient-spring", "sr-gradient-meadow", "sr-tint-green"],
    rules: [["Surface", "Soft campaign gradient"], ["Device", "Soft cloud, gloss shapes or a shape cluster"], ["Type", "Season Mix, centred on a cloud"], ["Wordmark", "Top-centre, black, partner lockup"]],
    sample: <Artboard width={1080} height={1350} label="Community banner sample"><CommunityBanner /></Artboard>,
  },
];

export default function ExpressionsPage() {
  return (
    <>
      <Nav overlay links={SYSTEM_NAV} cta="Indus Cowork page" ctaHref="/" />
      <main className="hub sr-under-nav">
        <HeroGlow />
        <header className="sr-container hub-intro">
          <Eyebrow>Expressions</Eyebrow>
          <h1 className="sr-display-product">One system, three ways to show up</h1>
          <p className="sr-lead">Same tokens, type, wordmark, grain and spacing. Only the surface, the hero device and the energy change. Rules: <code>expressions.md</code>.</p>
        </header>
        <section className="sr-container hub-section">
          <div className="ex-grid" data-siblings="expressions">
            {EXPRESSIONS.map((e) => (
              <article key={e.id} className="ex-col" data-sibling>
                <div className="ex-head"><Eyebrow mono>{e.name}</Eyebrow><h2 className="sr-h3" data-line="title">{e.line}</h2><p className="sr-small" data-line="use">{e.use}</p></div>
                {e.sample}
                <div className="ex-chips">{e.chips.map((c) => <span key={c} className={`ex-chip ${c}`} title={c} />)}</div>
                <ul className="ex-rules">{e.rules.map(([k, v]) => <li key={k}><b>{k}</b><span>{v}</span></li>)}</ul>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
