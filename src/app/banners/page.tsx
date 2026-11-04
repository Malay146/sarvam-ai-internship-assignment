import { Artboard, BANNER_BRIEFS, Eyebrow, Footer, Nav, Banner, SITUATIONS, SYSTEM_NAV, sizeOfFormat } from "@/components/sarvam";
import "./banners.css";

export const metadata = { title: "Banners · Sarvam design system" };

// The submission set (banners/final/README.md). Each subject comes in both formats, rearranged for the format.
const FINAL = [
  { id: "prism", n: "01", subject: "Sarvam Prism launch", expression: "Campaign", device: "Lit medallion on Dawn" },
  { id: "final-trail", n: "02", subject: "Every task leaves a trail", expression: "Product", device: "Shield emblem on indigo glow" },
  { id: "final-early-access", n: "03", subject: "Indus Cowork early access", expression: "Community", device: "Gloss cluster, partner lockup" },
];
const FINAL_IDS = new Set(FINAL.map((f) => f.id));

export default function BannersPage() {
  const explorations = BANNER_BRIEFS.filter((b) => !FINAL_IDS.has(b.id));
  return (
    <>
      <Nav overlay links={SYSTEM_NAV} cta="Banner builder" ctaHref="/banners/make" />
      <main className="sr-container bn-page sr-under-nav">
        <header className="bn-intro">
          <Eyebrow>Banners</Eyebrow>
          <h1 className="sr-display-product">Three subjects, two formats, one system</h1>
          <p className="sr-lead">
            Meta is 1080×1350 and LinkedIn is 1200×627. Each subject picks its expression from the content, then the engine rearranges it for
            each format rather than cropping it. Everything here is a live render of <code>banners/briefs.json</code>; the PNGs are in{" "}
            <code>banners/final</code>.
          </p>
        </header>

        <section className="bn-row" aria-labelledby="bn-final">
          <header className="bn-row__head">
            <h2 id="bn-final" className="sr-h2">The final set</h2>
            <p className="sr-body">Ready to post. All six pass <code>node scripts/check-banners.mjs set</code>.</p>
          </header>
          <div className="bn-final">
            {FINAL.map((f) => {
              const b = BANNER_BRIEFS.find((x) => x.id === f.id)!;
              return (
                <figure key={f.id} className="bn-final__item">
                  <div className="bn-preset__pair">
                    <Artboard width={1080} height={1350} label={`${f.subject}: Meta`}><Banner spec={b.spec} format="portrait" id={`final-${f.id}-p`} /></Artboard>
                    <Artboard width={1200} height={627} label={`${f.subject}: LinkedIn`}><Banner spec={b.spec} format="landscape" id={`final-${f.id}-l`} /></Artboard>
                  </div>
                  <figcaption className="bn-final__cap">
                    <span className="bn-final__n">{f.n}</span>
                    <span className="bn-final__subject">{f.subject}</span>
                    <span className="sr-meta">{f.expression} · {f.device}</span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </section>

        {(["meta", "linkedin"] as const).map((pl) => (
          <section key={pl} className="bn-row" aria-labelledby={`bn-${pl}`}>
            <header className="bn-row__head">
              <h2 id={`bn-${pl}`} className="sr-h3">Explorations · {pl === "meta" ? "Meta" : "LinkedIn"}</h2>
              {pl === "meta" && <p className="sr-body">Earlier rounds from the same engine, kept to show how the set was directed and refined.</p>}
            </header>
            <div className={`bn-grid bn-grid--${pl}`}>
              {explorations.filter((b) => b.formats[pl]).map((b) => {
                const f = b.formats[pl]!, s = sizeOfFormat(f);
                return (
                  <figure key={b.id} className="bn-item">
                    <Artboard width={s.W} height={s.H} label={`${pl}-${b.id}`}><Banner spec={b.spec} format={f} id={`${pl}-${b.id}`} /></Artboard>
                    <figcaption><code>{b.id}</code><span className="sr-meta">{s.W}×{s.H}</span></figcaption>
                  </figure>
                );
              })}
            </div>
          </section>
        ))}

        <section className="bn-row" aria-labelledby="bn-presets">
          <header className="bn-row__head">
            <h2 id="bn-presets" className="sr-h3">Presets</h2>
            <p className="sr-body">Every starting point in the builder ({Object.keys(SITUATIONS).length}), rendered in both formats exactly as the preset defines it. Open one in <a href="/banners/make">the builder</a> to change any part.</p>
          </header>
          <div className="bn-presets">
            {Object.entries(SITUATIONS).map(([name, spec]) => (
              <figure key={name} className="bn-preset">
                <div className="bn-preset__pair">
                  <Artboard width={1080} height={1350} label={`${name} portrait`}><Banner spec={spec} format="portrait" id={`ps-${name}-p`} /></Artboard>
                  <Artboard width={1200} height={627} label={`${name} landscape`}><Banner spec={spec} format="landscape" id={`ps-${name}-l`} /></Artboard>
                </div>
                <figcaption><code>{name}</code><span className="sr-meta">{spec.device}{spec.ornament ? ` · ${spec.ornament}` : spec.shape ? ` · ${spec.shape}` : ""}</span></figcaption>
              </figure>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
