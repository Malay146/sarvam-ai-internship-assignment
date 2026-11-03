import fs from "node:fs";
import path from "node:path";
import "./system.css";
import { Nav, SYSTEM_NAV } from "@/components/sarvam";

export const metadata = { title: "Tokens · Sarvam design system" };

// Single source of truth: read every token straight from design-system/tokens.css.
function readTokens() {
  const css = fs.readFileSync(path.join(process.cwd(), "design-system/tokens.css"), "utf8");
  const root = css.slice(css.indexOf(":root {"), css.indexOf("}", css.indexOf(":root {")));
  const tokens: Record<string, string> = {};
  for (const m of root.matchAll(/(--[\w-]+):\s*([^;]+);/g)) tokens[m[1]] = m[2].trim();
  return tokens;
}

const RAMPS = ["indigo", "orange", "yellow", "pink", "red", "green", "grey"] as const;
const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const GRADIENTS = [
  { name: "dusk", label: "Dusk", use: "Dark, premium, launch", source: "/system/brand-img-01.png", sourceLabel: "brand-img-01", text: "#fff", textTop: true },
  { name: "dawn", label: "Dawn", use: "Energetic, announcement, social", source: "/system/og-home.png", sourceLabel: "sarvam.ai og image", text: "var(--color-sr-black)", textTop: false },
  { name: "indigo-glow", label: "Indigo glow", use: "Product moments, inside gateway", source: "/system/brand-img-06.png", sourceLabel: "brand-img-06", text: "#fff", textTop: true },
  { name: "sun", label: "Sun", use: "Light hero, hangs from top", source: "/system/hero-gradient-1622.webp", sourceLabel: "homepage hero", text: "var(--color-tx)", textTop: false },
];

const CONTRAST = [
  { fg: "var(--color-tx)", bg: "var(--color-sf)", label: "tx on sf", ratio: 16.1, ok: "all" },
  { fg: "var(--color-tx-secondary)", bg: "var(--color-sf)", label: "tx-secondary on sf", ratio: 10.6, ok: "all" },
  { fg: "var(--color-tx-tertiary)", bg: "var(--color-sf)", label: "tx-tertiary on sf", ratio: 5.6, ok: "all" },
  { fg: "var(--color-sr-indigo-700)", bg: "var(--color-sf)", label: "indigo-700 on sf", ratio: 6.1, ok: "all" },
  { fg: "var(--color-tx-accent)", bg: "var(--color-sf)", label: "tx-accent on sf", ratio: 3.5, ok: "large" },
  { fg: "#fff", bg: "var(--color-sr-indigo-800)", label: "white on indigo-800", ratio: 8.5, ok: "all" },
  { fg: "var(--color-tx-inverse)", bg: "var(--color-sr-black)", label: "tx-inverse on sr-black", ratio: 17.4, ok: "all" },
  { fg: "var(--color-sr-grey-600)", bg: "var(--color-sr-black)", label: "grey-600 on sr-black", ratio: 6.5, ok: "all" },
  { fg: "#fff", bg: "var(--color-sr-orange-900)", label: "white on orange-900", ratio: 6.0, ok: "all" },
  { fg: "#fff", bg: "var(--color-sr-orange-800)", label: "white on orange-800", ratio: 3.4, ok: "large" },
  { fg: "#fff", bg: "#f9730c", label: "white on Sun core", ratio: 2.8, ok: "never" },
];

const TYPE_ROLES = [
  { role: "display-1", spec: "display 400 · 44→64 · lh 1.05 · home hero", sample: "Work, built around you." },
  { role: "display-product", spec: "display 400 · 36→52 · lh 1.2 · product hero", sample: "Hire an AI teammate that finishes the work" },
  { role: "display-2", spec: "display 300 · 32→48 · lh 1.1 · statement", sample: "Who gets to be understood?" },
  { role: "h2-lg", spec: "display 500 · 30→44 · lh 1.1 · max 18ch", sample: "Plugs into the stack you already run on" },
  { role: "h2", spec: "display 500 · 28→36 · lh 1.2", sample: "It runs the whole task, start to finish." },
  { role: "h3", spec: "display 500 · 20→24 · lh 1.2", sample: "Teach any skill, or let AI write it" },
  { role: "h4", spec: "display 500 · 20→22 · lh 1.25 · card heading", sample: "A memory every chat can draw on" },
  { role: "feature-title", spec: "text 500 · 18→21 · lh 1.3", sample: "Plans the work before it starts." },
  { role: "item-title", spec: "text 500 · 16→18 · lh 1.3", sample: "How is Indus Cowork different from a chat assistant?" },
  { role: "title", spec: "text 500 · 18 · lh 1.3 · listing card", sample: "How we built the knowledge fabric for enterprise agents" },
  { role: "lead", spec: "text 400 · 16→18 · lh 1.65", sample: "Give a task to an Indus Cowork teammate the way you would a colleague. It plans the work, connects to your apps, researches what it needs, and improves its own output until the job is done." },
  { role: "body", spec: "text 400 · 15→16 · lh 1.6", sample: "Teammates draft and prepare the work. Sending, merging and making changes wait for your approval." },
  { role: "small", spec: "text 400 · 14 · lh 1.6", sample: "And more, including Asana, Calendly, Dropbox, Canva and Vercel." },
  { role: "meta", spec: "text 400 · 13 · lh 1.55", sample: "Oct 27, 2026 · Announcement" },
  { role: "eyebrow", spec: "text 500 · 12 · UPPERCASE", sample: "Indus Cowork" },
  { role: "eyebrow-mono", spec: "code 400 · 12 · UPPERCASE · tabular", sample: "Scheduled tasks · 06:00" },
  { role: "label-mono", spec: "code 400 · 12 · UPPERCASE", sample: "01 · Hand over the task" },
  { role: "code", spec: "code 400 · 14 · lh 1.6", sample: 'response = client.chat(model="sarvam-m")' },
];

const SIBLINGS = [
  { icon: "✦", eyebrow: "Skills", title: "Teach it once", desc: "Write it once and every teammate can use and improve it." },
  { icon: "◷", eyebrow: "Scheduled tasks", title: "Runs on its own", desc: "Set a report once and it arrives on its own every morning." },
  { icon: "▤", eyebrow: "Knowledge base", title: "Never forgets", desc: "Store your context once and every task can draw on it." },
];

const SPACE = [1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 20, 24, 32];
const RESPONSIVE = [
  { token: "--space-section", values: "96 / 176 / 176" },
  { token: "--space-hero-top", values: "144 / 160 / 160" },
  { token: "--space-section-head", values: "40 / 56 / 56" },
  { token: "--space-heading-row", values: "24 / 48 / 48" },
  { token: "--space-grid", values: "32 / 40 / 48" },
  { token: "--space-card", values: "24 / 32 / 32" },
];
const RADII = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "full"];
const SHADOWS = ["ambient-sm", "ambient-md", "ambient-lg", "ambient-xl", "ambient-xl-hover"];

function Section({ id, eyebrow, title, lead, children }: { id: string; eyebrow: string; title: string; lead?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="sys-section">
      <header className="sys-sectionHead">
        <p className="sys-eyebrow">{eyebrow}</p>
        <h2 className="sys-h2">{title}</h2>
        {lead && <p className="sys-lead">{lead}</p>}
      </header>
      {children}
    </section>
  );
}

export default function SystemPage() {
  const t = readTokens();

  return (
    <>
    <Nav links={SYSTEM_NAV} cta="Indus Cowork page" ctaHref="/" />
    <main className="sys-page">
      <header className="sys-hero">
        <div className="sys-heroSun sr-gradient-sun" aria-hidden />
        <div className="sys-heroInner">
          <p className="sys-eyebrow">Sarvam design system</p>
          <h1 className="sys-h1">Tokens, type and layout</h1>
          <p className="sys-lead">
            Every value on this page is read live from <code>design-system/tokens.css</code>. If it looks wrong here, it is wrong in
            the system. Fonts are placeholders until the font decision is made.
          </p>
          <nav className="sys-toc">
            {["gradients", "colour", "semantic", "contrast", "type", "layout", "spacing", "radius", "shadow", "motion"].map((s) => (
              <a key={s} href={`#${s}`}>{s}</a>
            ))}
          </nav>
        </div>
      </header>

      <Section id="gradients" eyebrow="01 · Spectrum" title="Four gradients, sampled from Sarvam's own images" lead="Top: our CSS gradient. Bottom: the official image it was sampled from. They should feel like the same light.">
        <div className="sys-gradGrid">
          {GRADIENTS.map((g) => (
            <figure key={g.name} className="sys-gradCol">
              <div className={`sys-gradSwatch ${g.name === "sun" ? "sys-sunSwatch" : `sr-gradient-${g.name}`}`}>
                {g.name === "sun" && <div className="sys-sunLayer sr-gradient-sun" aria-hidden />}
                <span className="sys-gradText" style={{ color: g.text, alignSelf: g.textTop ? "flex-start" : "flex-end" }}>
                  {g.label}
                </span>
              </div>
              <img className={`sys-gradSource ${g.name === "sun" ? "sys-sunSource" : ""}`} src={g.source} alt={`Official: ${g.sourceLabel}`} />
              <figcaption>
                <strong>--gradient-{g.name}</strong>
                <span>{g.use}</span>
                <span className="sys-muted">Source: {g.sourceLabel}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <h3 className="sys-h3">Product-page gradients (from sarvam.ai/indus-cowork)</h3>
        <div className="sys-tintGrid">
          {[["sr-haze", "--gradient-haze", "hero haze"], ["sr-tint-indigo", "--gradient-tint-indigo", "feature panel 1"], ["sr-tint-orange", "--gradient-tint-orange", "feature panel 2"], ["sr-tint-green", "--gradient-tint-green", "feature panel 3"]].map(([cls, tok, use]) => (
            <figure key={cls} className="sys-gradCol">
              <div className={`sys-tint ${cls}`}><div className="sys-tintCard">White UI card sits here</div></div>
              <figcaption><strong>{tok}</strong><span>{use}</span></figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section id="colour" eyebrow="02 · Colour" title="Brand ramps" lead="Indigo 800 and orange 800 are the anchors (outlined). Yellow, pink, red and green are craft-derived accents, used small.">
        <div className="sys-ramps">
          {RAMPS.map((r) => (
            <div key={r} className="sys-rampRow">
              <p className="sys-rampName">{r}{(r === "indigo" || r === "orange") && <span className="sys-badge">core</span>}</p>
              <div className="sys-ramp">
                {STEPS.map((s) => {
                  const v = t[`--color-sr-${r}-${s}`];
                  if (!v) return <div key={s} className="sys-chipEmpty" />;
                  const anchor = s === 800 && (r === "indigo" || r === "orange");
                  return (
                    <div key={s} className={`sys-chip ${anchor ? "sys-anchor" : ""}`}>
                      <div className="sys-chipColor" style={{ background: v }} />
                      <span>{s}</span>
                      <span className="sys-muted">{v}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="semantic" eyebrow="03 · Roles" title="Semantic tokens" lead="Components use these, not the raw ramps.">
        <div className="sys-semGrid">
          <div className="sys-semCard" style={{ background: "var(--color-sf)" }}>
            <p className="sys-eyebrow">Light surface · sf</p>
            <p style={{ color: "var(--color-tx)", fontSize: 24 }}>tx: primary text</p>
            <p style={{ color: "var(--color-tx-secondary)" }}>tx-secondary: leads and body copy</p>
            <p style={{ color: "var(--color-tx-tertiary)" }}>tx-tertiary: eyebrows and meta</p>
            <p style={{ color: "var(--color-tx-brand)" }}>tx-brand: warm near-black</p>
            <p style={{ color: "var(--color-tx-accent)", fontSize: 24 }}>tx-accent: large only</p>
          </div>
          <div className="sys-semCard" style={{ background: "var(--color-sf-dark)" }}>
            <p className="sys-eyebrow" style={{ color: "var(--color-tx-inverse-secondary)" }}>Dark surface · sr-black</p>
            <p style={{ color: "var(--color-tx-inverse)", fontSize: 24 }}>tx-inverse: primary on dark</p>
            <p style={{ color: "var(--color-tx-inverse-secondary)" }}>tx-inverse-secondary: body on dark</p>
            <div style={{ background: "var(--color-sf-dark-raised)", border: "1px solid var(--color-st-dark)", borderRadius: "var(--radius-card)", padding: 16, color: "var(--color-tx-inverse)" }}>
              sf-dark-raised card with st-dark border
            </div>
          </div>
          <div className="sys-semCard">
            <p className="sys-eyebrow">Surfaces and strokes</p>
            <div className="sys-surfaceRow">
              {["sf", "sf-secondary", "sf-tertiary", "sf-quaternary"].map((s) => (
                <div key={s} className="sys-surface" style={{ background: `var(--color-${s})` }}>{s}</div>
              ))}
            </div>
            <div className="sys-surfaceRow">
              <div className="sys-surface" style={{ border: "var(--border-default)" }}>border-default</div>
              <div className="sys-surface" style={{ border: "var(--border-subtle)" }}>border-subtle</div>
              <div className="sys-surface" style={{ boxShadow: "var(--ring-selected)" }}>ring-selected</div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="contrast" eyebrow="04 · Legibility" title="Approved text pairs" lead="Large = 24px and up. Red means never use for text.">
        <div className="sys-contrastGrid">
          {CONTRAST.map((c) => (
            <div key={c.label} className="sys-contrastCard" style={{ background: c.bg, color: c.fg }}>
              <span className="sys-contrastBig">Aa</span>
              <span>Body text sample at 16px</span>
              <span className="sys-contrastMeta">
                {c.label} · {c.ratio}:1
                <b className={c.ok === "all" ? "sys-pass" : c.ok === "large" ? "sys-warn" : "sys-fail"}>
                  {c.ok === "all" ? "all text" : c.ok === "large" ? "large only" : "never"}
                </b>
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section id="type" eyebrow="05 · Type" title="Typography" lead="Gambetta, General Sans and DM Mono stand in for Sarvam's licensed Season Mix, Matter and Matter Mono. Sizes are fluid: resize the window and every row scales smoothly between 375 and 1024.">
        <div className="sys-typeList">
          {TYPE_ROLES.map((r) => (
            <div key={r.role} className="sys-typeRow">
              <div className="sys-typeMeta">
                <code>{r.role}</code>
                <span className="sys-muted">{r.spec}</span>
              </div>
              <div className={`sys-t-${r.role}`}>{r.sample}</div>
            </div>
          ))}
        </div>
        <h3 className="sys-h3">In context: a section header</h3>
        <div className="sys-typeContext">
          <div>
            <p className="sys-t-eyebrow" style={{ color: "var(--color-accent)" }}>Indus Cowork</p>
            <h2 className="sys-t-h2" style={{ marginTop: "var(--space-4)" }}>It runs the whole task, start to finish.</h2>
            <p className="sys-t-lead" style={{ marginTop: "var(--space-4)" }}>
              Every teammate plans, researches, and checks its own work, so you hand off the outcome and not the steps.
            </p>
          </div>
          <a className="sys-t-button" href="#type">Talk to Us</a>
        </div>
        <h3 className="sys-h3">Devanagari fallback</h3>
        <p className="sys-t-display-2" style={{ color: "var(--color-sr-indigo-800)", lineHeight: "calc(var(--leading-statement) + 0.1)" }}>
          नींद पूरी नहीं हुई और मुझे काम पर जल्दी जाना है
        </p>
      </Section>

      <Section id="layout" eyebrow="06 · Layout" title="Grid and sibling consistency" lead="4 columns on phone, 8 on tablet, 12 from 1024. Below: three sibling cards built with subgrid. Every icon, eyebrow, title and description row lines up, and every title and description has the same line count at every width.">
        <div className="sys-gridDemo" aria-hidden>
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="sys-gridCol"><span>{i + 1}</span></div>
          ))}
        </div>
        <p className="sys-bpIndicator">
          Current tier: <span className="sys-bpMobile">phone · 4 columns · 88% container</span>
          <span className="sys-bpTablet">tablet · 8 columns · 83% container</span>
          <span className="sys-bpDesktop">laptop+ · 12 columns · 83% container</span>
        </p>
        <h3 className="sys-h3">Sibling cards (copy written to the character budget)</h3>
        <div className="sys-sibRow" data-siblings="system sibling cards">
          {SIBLINGS.map((c) => (
            <article key={c.eyebrow} className="sys-sibCard" data-sibling>
              <div className="sys-sibIcon">{c.icon}</div>
              <p className="sys-t-eyebrow-mono">{c.eyebrow}</p>
              <h4 className="sys-t-h4 sys-sibTitle" data-line="title">{c.title}</h4>
              <p className="sys-t-body sys-sibDesc" data-line="desc">{c.desc}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="spacing" eyebrow="07 · Space" title="Spacing" lead="4px base. The responsive tokens change value at 768px and 1024px. Resize the window to see the live bars move.">
        <div className="sys-spaceList">
          {SPACE.map((k) => (
            <div key={k} className="sys-spaceRow">
              <code>--space-{k}</code>
              <span className="sys-muted">{t[`--space-${k}`]}</span>
              <div className="sys-spaceBar" style={{ width: `var(--space-${k})` }} />
            </div>
          ))}
        </div>
        <h3 className="sys-h3">Responsive (mobile / tablet / desktop)</h3>
        <div className="sys-spaceList">
          {RESPONSIVE.map((r) => (
            <div key={r.token} className="sys-spaceRow">
              <code>{r.token}</code>
              <span className="sys-muted">{r.values}</span>
              <div className={`sys-spaceBar sys-spaceBarLive`} style={{ width: `var(${r.token})` }} />
            </div>
          ))}
        </div>
        <p className="sys-bpIndicator">
          Current breakpoint: <span className="sys-bpMobile">mobile (&lt; 768)</span>
          <span className="sys-bpTablet">tablet (768–1023)</span>
          <span className="sys-bpDesktop">desktop (≥ 1024)</span>
        </p>
      </Section>

      <Section id="radius" eyebrow="08 · Shape" title="Radius" lead="Radius grows with element size. Card = 2xl (16), feature panel = 4xl (32), buttons = full.">
        <div className="sys-radiusGrid">
          {RADII.map((r) => (
            <div key={r} className="sys-radiusItem">
              <div className="sys-radiusBox" style={{ borderRadius: `var(--radius-${r})` }} />
              <code>radius-{r}</code>
              <span className="sys-muted">{t[`--radius-${r}`]}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section id="shadow" eyebrow="09 · Depth" title="Shadows" lead="Soft, neutral, ambient. Cards rest with a border; shadow appears on hover or for floating elements.">
        <div className="sys-shadowGrid">
          {SHADOWS.map((s) => (
            <div key={s} className="sys-shadowCard" style={{ boxShadow: `var(--shadow-${s})` }}>
              <code>shadow-{s}</code>
            </div>
          ))}
        </div>
      </Section>

      <Section id="motion" eyebrow="10 · Motion" title="Motion" lead="Hover the cards. Calm, short, standard easing. Image zoom is 1.02 over 500ms.">
        <div className="sys-motionGrid">
          {[["fast", "150ms · colour"], ["normal", "200ms · hover"], ["moderate", "300ms · panels"], ["slow", "500ms · image zoom"]].map(([k, d]) => (
            <div key={k} className="sys-motionCard" style={{ transitionDuration: `var(--duration-${k})` }}>
              <div className="sys-motionInner sr-gradient-indigo-glow" style={{ transitionDuration: `var(--duration-${k})` }} />
              <code>duration-{k}</code>
              <span className="sys-muted">{d}</span>
            </div>
          ))}
        </div>
      </Section>
    </main>
    </>
  );
}
