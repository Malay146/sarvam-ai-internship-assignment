// Site footer (v2): a calm white top (brand, columns, trust, socials) and a closing band where the official white
// wordmark sits large over the footer wash: each letter has its own bottom → top gradient in one soft spectrum family,
// with a light inner edge (exception to logo.md rule 4, Malay's call 2026-11-04).
// Links and address [verified: sarvam.ai footer].
import { GlobeFill, LockFill, ShieldCheckFill } from "@/components/icons";
import { SOCIAL } from "./social";

// trust badges: a filled glyph in its own brand hue on a soft tint of that hue
const BADGES = [
  { label: "ISO 27001:2022", icon: ShieldCheckFill, tone: "indigo" },
  { label: "SOC 2 Type I", icon: LockFill, tone: "green" },
  { label: "Data residency in India", icon: GlobeFill, tone: "orange" },
] as const;

// The official wordmark path (public/brand/sarvam-wordmark-white.svg), unchanged. Letters are separated by clipping
// the same path to each letter's x-range, so the shape is never redrawn.
const WORDMARK_D = "m56.729 1.024-.112 4.665-.025.835-.412-.723c-1.006-1.784-2.395-3.168-4.132-4.137C50.348.7 48.426.21 46.335.21c-2.636 0-5.055.71-7.184 2.1-2.137 1.4-3.87 3.313-5.155 5.687-1.24 2.37-1.871 5.114-1.871 8.149 0 3.035.59 5.733 1.759 8.107 1.164 2.328 2.798 4.199 4.851 5.558 2.087 1.314 4.486 1.983 7.122 1.983 4.686 0 8.157-1.879 10.327-5.592l.408-.698.025.81.112 4.64h6.74V1.023h-6.74Zm-2.307 21.872c-1.626 1.788-3.763 2.69-6.353 2.69s-4.744-.902-6.41-2.686c-1.643-1.804-2.441-4.053-2.441-6.872s.823-5.138 2.44-6.872c1.663-1.784 3.82-2.69 6.41-2.69 2.591 0 4.728.906 6.354 2.69 1.617 1.738 2.436 4.05 2.436 6.872 0 2.823-.82 5.093-2.436 6.868ZM86.862 1.126l-.61 6.602A10.737 10.737 0 0 0 82.68 7.1c-2.424 0-4.32.903-5.638 2.67-1.305 1.708-1.962 4.174-1.962 7.33v13.848H68V1.035h6.785l.054 5.824.013 1.277.436-1.202c.74-2.02 1.838-3.6 3.28-4.685 1.43-1.119 3.114-1.692 5.01-1.692.624 0 1.256.062 1.875.174.578.104 1.048.237 1.414.395h-.005ZM119.693 1.047 107.956 30.95h-7.512L88.704 1.047h7.952l7.584 22.625.108.324.108-.324 7.766-22.625h7.471ZM143.905 1.02l-.133 4.669-.017.835-.412-.723c-1.01-1.784-2.398-3.168-4.132-4.137C137.51.7 135.59.21 133.499.21c-2.64 0-5.056.71-7.185 2.1-2.136 1.4-3.874 3.313-5.155 5.687-1.243 2.37-1.875 5.114-1.875 8.149 0 3.035.595 5.737 1.759 8.107 1.164 2.328 2.802 4.199 4.856 5.558 2.087 1.314 4.481 1.983 7.121 1.983 4.682 0 8.157-1.879 10.319-5.592l.412-.698.016.81.121 4.64h6.735l.013-29.925h-6.735l.004-.008Zm-2.333 21.872c-1.621 1.788-3.758 2.69-6.352 2.69-2.595 0-4.744-.902-6.411-2.686-1.642-1.804-2.436-4.053-2.436-6.872s.819-5.139 2.436-6.872c1.663-1.784 3.821-2.69 6.411-2.69 2.59 0 4.731.906 6.352 2.69 1.618 1.738 2.437 4.05 2.437 6.872 0 2.823-.819 5.093-2.437 6.868ZM201.773 12.858v18.09h-7.051V14.233c0-5.18-2.025-7.807-6.02-7.807-2.129 0-3.817.752-5.014 2.232-1.143 1.43-1.721 3.488-1.721 6.116V30.95h-6.997V14.176c0-5.143-2.004-7.75-5.958-7.75-2.133 0-3.821.753-5.014 2.233-1.185 1.426-1.779 3.484-1.779 6.116V30.95h-6.997V1.026h6.764l.054 4.382.012.973.424-.873a9.042 9.042 0 0 1 3.609-3.9c1.592-.931 3.455-1.401 5.55-1.401 4.49 0 7.588 1.979 9.213 5.883l.208.495.216-.487c.815-1.82 2.108-3.272 3.85-4.315C186.864.73 188.851.207 191.03.207c3.455 0 6.124 1.098 7.941 3.26 1.858 2.132 2.802 5.296 2.802 9.391ZM29.963 22.035c0 3.575-1.659 6.26-4.93 7.974C21.892 31.655 18.051 32 15.377 32c-5.18 0-9.117-.99-11.699-2.944C1.285 27.244.05 24.616.004 21.25v-.104L0 20.937h7.35l.009.2v.095c.158 3.538 3.076 5.488 8.227 5.488 2.112 0 7.018-.395 7.018-4.058 0-2.956-4.003-3.513-8.635-4.165C7.754 17.627.711 16.638.711 9.508.71 3.468 5.604 0 14.13 0c9.122 0 14.248 3.363 14.834 9.728l.008.113.021.228h-7.363l-.016-.19-.009-.092c-.2-2.179-2.19-4.507-7.184-4.507-4.257 0-6.598 1.339-6.598 3.77 0 2.707 3.87 3.181 8.357 3.734 3.064.374 6.535.803 9.184 2.054 3.093 1.463 4.598 3.82 4.598 7.197Z";
// per letter: x-range in the 202×32 viewBox, and the gradient (bottom, middle, top) — one soft family, a different hue each
const LETTERS: { x: [number, number]; c: [string, string, string] }[] = [
  { x: [0, 31], c: ["#8b9ff0", "#bcc8f6", "#f1f4ff"] },        // s · periwinkle
  { x: [31, 66], c: ["#a596e6", "#cbc1f1", "#f5f2ff"] },       // a · lavender
  { x: [66, 88], c: ["#c493d6", "#dfc1e8", "#fbf2ff"] },       // r · orchid
  { x: [88, 119.5], c: ["#e39cbd", "#f0c5d7", "#fff3f8"] },    // v · rose
  { x: [119.5, 154], c: ["#ee957f", "#f6c3b4", "#fff5f0"] },   // a · coral
  { x: [154, 202], c: ["#f7a35f", "#fbcb9e", "#fff6ec"] },     // m · saffron
];

function GiantWordmark() {
  return (
    <svg className="sf__giant" viewBox="0 0 202 32" aria-hidden>
      <defs>
        {LETTERS.map((l, i) => (
          <linearGradient key={i} id={`sf-g${i}`} gradientUnits="userSpaceOnUse" x1="0" y1="32" x2="0" y2="0">
            <stop offset="0" stopColor={l.c[0]} /><stop offset="0.55" stopColor={l.c[1]} /><stop offset="1" stopColor={l.c[2]} />
          </linearGradient>
        ))}
        {LETTERS.map((l, i) => <clipPath key={i} id={`sf-c${i}`}><rect x={l.x[0]} y="0" width={l.x[1] - l.x[0]} height="32" /></clipPath>)}
        {/* light inner edge: a soft white band just inside the top of each stroke, plus a fainter one at the bottom;
            outer shadow: a tight contact shadow and a wide soft one, both faint indigo */}
        <filter id="sf-inner" x="-6%" y="-40%" width="112%" height="200%">
          <feOffset in="SourceAlpha" dy="0.7" result="down" />
          <feGaussianBlur in="down" stdDeviation="0.45" result="downBlur" />
          <feComposite in="SourceAlpha" in2="downBlur" operator="arithmetic" k2="1" k3="-1" result="topEdge" />
          <feFlood floodColor="#fff" floodOpacity="0.9" />
          <feComposite in2="topEdge" operator="in" result="topLight" />
          <feOffset in="SourceAlpha" dy="-0.5" result="up" />
          <feGaussianBlur in="up" stdDeviation="0.4" result="upBlur" />
          <feComposite in="SourceAlpha" in2="upBlur" operator="arithmetic" k2="1" k3="-1" result="bottomEdge" />
          <feFlood floodColor="#fff" floodOpacity="0.45" />
          <feComposite in2="bottomEdge" operator="in" result="bottomLight" />
          <feOffset in="SourceAlpha" dy="0.25" result="c1" />
          <feGaussianBlur in="c1" stdDeviation="0.2" result="c2" />
          <feFlood floodColor="#3333cc" floodOpacity="0.06" />
          <feComposite in2="c2" operator="in" result="contact" />
          <feOffset in="SourceAlpha" dy="1.6" result="s1" />
          <feGaussianBlur in="s1" stdDeviation="2" result="s2" />
          <feFlood floodColor="#3333cc" floodOpacity="0.06" />
          <feComposite in2="s2" operator="in" result="soft" />
          <feMerge><feMergeNode in="soft" /><feMergeNode in="contact" /><feMergeNode in="SourceGraphic" /><feMergeNode in="topLight" /><feMergeNode in="bottomLight" /></feMerge>
        </filter>
      </defs>
      <g filter="url(#sf-inner)">
        {LETTERS.map((_, i) => <path key={i} d={WORDMARK_D} fill={`url(#sf-g${i})`} clipPath={`url(#sf-c${i})`} />)}
      </g>
    </svg>
  );
}

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
        <p className="sf__badges">{BADGES.map((b) => <span key={b.label} data-tone={b.tone}><b.icon width={14} height={14} aria-hidden />{b.label}</span>)}</p>
        <p className="sf__legal"><a href="#">Trust Center</a><a href="#">Terms</a><a href="#">Privacy</a></p>
      </div>
      <div className="sf__band">
        <div className="sr-container sf__band-inner">
          <div className="sf__band-foot">
            <span>© 2026 Axonwise Private Limited. All rights reserved.</span>
            <span>732, Chinmaya Mission Hospital Road, Indiranagar Stage 1, Bengaluru, Karnataka 560038</span>
          </div>
          <GiantWordmark />
        </div>
      </div>
    </footer>
  );
}
