import { Artboard, BANNER_BRIEFS, Eyebrow, Nav, Banner, SITUATIONS, SYSTEM_NAV, sizeOfFormat } from "@/components/sarvam";
import "./banners.css";

export const metadata = { title: "Banners · Sarvam design system" };

export default function BannersPage() {
  return (
    <>
      <Nav overlay links={SYSTEM_NAV} cta="Banner builder" ctaHref="/banners/make" />
      <main className="sr-container bn-page sr-under-nav">
        <header className="bn-intro">
          <Eyebrow>Banner set + every preset</Eyebrow>
          <h1 className="sr-display-product">Banners</h1>
          <p className="sr-lead">Every banner carries its own message. Meta is 1080×1350 and LinkedIn is 1200×627, all from one system. Below the set, every builder preset is shown in both formats. Source: <code>banners/briefs.json</code>. PNGs: <code>banners/png</code>.</p>
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
    </>
  );
}
