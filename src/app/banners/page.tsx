import { Artboard, BANNERS, Eyebrow, Nav, SYSTEM_NAV, sizeOf } from "@/components/sarvam";
import "./banners.css";

export const metadata = { title: "Banners · Sarvam design system" };

export default function BannersPage() {
  return (
    <>
      <Nav overlay links={SYSTEM_NAV} cta="Indus Cowork page" ctaHref="/" />
      <main className="sr-container bn-page sr-under-nav">
        <header className="bn-intro">
          <Eyebrow>Indus Cowork · banner set</Eyebrow>
          <h1 className="sr-display-product">Banners</h1>
          <p className="sr-lead">Three campaigns, each on Meta and LinkedIn, rearranged per format from one system. Rendered at exact pixel size; PNGs in <code>/banners/png</code>.</p>
        </header>
        {(["Meta", "LinkedIn"] as const).map((pl) => (
          <section key={pl} className="bn-row">
            <h2 className="sr-h3">{pl}</h2>
            <div className={`bn-grid bn-grid--${pl.toLowerCase()}`}>
              {BANNERS.filter((b) => b.platform === pl).map((b) => {
                const s = sizeOf(b);
                return (
                  <figure key={b.id} className="bn-item">
                    <Artboard width={s.W} height={s.H} label={b.id}>{b.render()}</Artboard>
                    <figcaption><code>{b.id}</code><span className="sr-meta">{b.expression} · {s.W}×{s.H}</span></figcaption>
                  </figure>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
