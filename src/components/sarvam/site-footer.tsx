// Site footer (v2): a calm white top (brand, columns, trust, socials) and a closing band where the official white
// wordmark sits large on Sarvam's indigo-glow horizon, filled with a light gradient (exception to logo.md rule 4, Malay's call).
// Links and address [verified: sarvam.ai footer].
import { SOCIAL } from "./social";

const COLS: { h: string; links: string[] }[] = [
  { h: "Products", links: ["Indus Cowork", "Work Agents", "Document AI", "Coding Agents", "Sarvam Edge"] },
  { h: "APIs", links: ["Text to Speech", "Speech to Text", "Translation", "Dubbing", "Parse"] },
  { h: "Resources", links: ["Blogs", "Documentation", "API Pricing", "Customer Stories", "Startup Program"] },
  { h: "Company", links: ["About Us", "Careers", "Brand", "Partnerships", "Contact Us"] },
];

export function SiteFooter() {
  return (
    <footer className="sf">
      <div className="sr-container sf__top">
        <div className="sf__brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="sf__logo" src="/brand/sarvam-wordmark-black.svg" alt="Sarvam" width={132} height={28} />
          <p className="sf__tag">AI for all from India.</p>
          <ul className="sf__social" aria-label="Sarvam on social media">
            {SOCIAL.map((s) => (
              <li key={s.name}>
                <a href={s.href} aria-label={s.name} target="_blank" rel="noreferrer">
                  <svg viewBox={s.vb} width={18} height={18} fill="currentColor" aria-hidden>{s.d.map((d, i) => <path key={i} d={d} fillRule={s.evenodd ? "evenodd" : undefined} />)}</svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <nav className="sf__cols" aria-label="Footer">
          {COLS.map((c) => (
            <div key={c.h} className="sf__col">
              <p className="sf__h">{c.h}</p>
              <ul>{c.links.map((l) => <li key={l}><a href="#">{l}</a></li>)}</ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="sr-container sf__meta">
        <p className="sf__badges"><span>ISO 27001:2022</span><span>SOC 2 Type I</span><span>Data residency in India</span></p>
        <p className="sf__legal"><a href="#">Trust Center</a><a href="#">Terms</a><a href="#">Privacy</a></p>
      </div>
      <div className="sf__band">
        <div className="sr-container sf__band-inner">
          {/* Malay's call (2026-11-04): the official wordmark shape, filled with a gradient — a deliberate exception to
              logo.md rule 4, used only here as a decorative footer mark. The shape is the official file used as a mask. */}
          <span className="sf__giant" aria-hidden />
          <div className="sf__band-foot">
            <span>© 2026 Axonwise Private Limited. All rights reserved.</span>
            <span>732, Chinmaya Mission Hospital Road, Indiranagar Stage 1, Bengaluru, Karnataka 560038</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
