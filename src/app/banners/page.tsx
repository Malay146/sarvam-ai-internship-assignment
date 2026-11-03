import { Artboard, BANNER_BRIEFS, Eyebrow, Nav, Banner, SYSTEM_NAV, sizeOfFormat } from "@/components/sarvam";
import "./banners.css";

export const metadata = { title: "Banners · Sarvam design system" };

export default function BannersPage() {
  return (
    <>
      <Nav overlay links={SYSTEM_NAV} cta="Banner builder" ctaHref="/banners/make" />
      <main className="sr-container bn-page sr-under-nav">
        <header className="bn-intro">
          <Eyebrow>Indus Cowork · banner set</Eyebrow>
          <h1 className="sr-display-product">Banners</h1>
          <p className="sr-lead">Six banners, six messages: three for Meta (1080×1350) and three for LinkedIn (1200×627), all from one system. Source: <code>banners/briefs.json</code>. PNGs: <code>banners/png</code>.</p>
        </header>
        {(["meta", "linkedin"] as const).map((pl) => (
          <section key={pl} className="bn-row">
            <h2 className="sr-h3">{pl === "meta" ? "Meta" : "LinkedIn"}</h2>
            <div className={`bn-grid bn-grid--${pl}`}>
              {BANNER_BRIEFS.filter((b) => b.formats[pl]).map((b) => {
                const f = b.formats[pl]!, s = sizeOfFormat(f);
                return (
                  <figure key={b.id} className="bn-item">
                    <Artboard width={s.W} height={s.H} label={`${pl}-${b.id}`}><Banner spec={b.spec} format={f} id={`${pl}-${b.id}`} /></Artboard>
                    <figcaption><code>{pl}-{b.id}</code><span className="sr-meta">{b.spec.situation} · {s.W}×{s.H}</span></figcaption>
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
