// Sarvam component library. Spec: design-system/components.md · Styles: ./components.css
// Server components by default; interactive bits live in ./client.tsx.
import type { ReactNode, ComponentType, SVGProps } from "react";
import { ArrowRight, Check, ChevronDown, Circle, CircleCheck, Menu } from "@/components/icons";
import "./components.css";
import { InView } from "./client";
import { LATTICE_SVG } from "./lattice.svg";
import { flowerSVG } from "@/lib/shapes";

export type Tone = "indigo" | "orange" | "green";
type Icon = ComponentType<SVGProps<SVGSVGElement> & { strokeWidth?: number; size?: number }>;
const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

/** Icons: Nucleo Core outline only (src/components/icons), 24px grid, 1.5 stroke, round caps (components.md §3). */
export const ICON_STROKE = 1.5;

/* ── Text ── */
export function Eyebrow({ children, mono, tone }: { children: ReactNode; mono?: boolean; tone?: "accent" | "warm" }) {
  return <p className={cx("sr-eyebrow", mono && "sr-eyebrow--mono", tone && `sr-eyebrow--${tone}`)}>{children}</p>;
}

/* ── Button ── */
type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost" | "on-dark";
  size?: "md" | "lg";
  display?: boolean;
  arrow?: boolean;
};
export function Button({ children, href = "#", variant = "primary", size = "md", display, arrow }: ButtonProps) {
  return (
    <a href={href} className={cx("sr-button", `sr-button--${variant}`, size === "lg" && "sr-button--lg", display && "sr-button--display")}>
      {children}
      {arrow && <ArrowRight className="sr-button__icon sr-button__icon--trail" strokeWidth={ICON_STROKE} aria-hidden />}
    </a>
  );
}
export function ButtonRow({ children, center }: { children: ReactNode; center?: boolean }) {
  return <div className={cx("sr-button-row", center && "sr-button-row--center")}>{children}</div>;
}

export function Chip({ children, tone }: { children: ReactNode; tone?: Tone }) {
  return <span className={cx("sr-chip", tone && `sr-chip--${tone}`)}>{children}</span>;
}

export function IconTile({ icon: I, tone = "indigo" }: { icon: Icon; tone?: Tone | "neutral" | "dark" }) {
  return (
    <span className={`sr-icon-tile sr-icon-tile--${tone}`} aria-hidden>
      <I strokeWidth={ICON_STROKE} />
    </span>
  );
}

/* ── Section header ── */
export function SectionHeader({
  eyebrow, title, lead, aside, variant = "chapter", large, eyebrowTone,
}: { eyebrow?: string; title: ReactNode; lead?: ReactNode; aside?: ReactNode; variant?: "chapter" | "split"; large?: boolean; eyebrowTone?: "accent" | "warm" }) {
  return (
    <header className={`sr-section-head sr-section-head--${variant}`}>
      <div className="sr-section-head__text">
        {eyebrow && <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow>}
        <h2 className={large ? "sr-h2-lg" : "sr-h2"}>{title}</h2>
        {lead && variant === "chapter" && <p className="sr-lead">{lead}</p>}
      </div>
      {(variant === "split" && (lead || aside)) && (
        <div className="sr-section-head__aside sr-stack" style={{ gap: "var(--space-6)" }}>
          {lead && <p className="sr-lead">{lead}</p>}
          {aside}
        </div>
      )}
    </header>
  );
}

/* ── Cards (sibling-ready) ── */
export type CardData = { icon: Icon; eyebrow: string; title: string; desc: string; href?: string; foot?: ReactNode };
export function Card({ icon, eyebrow, title, desc, href, foot, tone = "indigo" }: CardData & { tone?: Tone | "neutral" }) {
  const Tag = href ? "a" : "article";
  return (
    <Tag className="sr-card" data-sibling {...(href ? { href } : {})}>
      <span className="sr-card__icon"><IconTile icon={icon} tone={tone} /></span>
      <Eyebrow mono>{eyebrow}</Eyebrow>
      <h3 className="sr-h4 sr-card__title" data-line="title">{title}</h3>
      <p className="sr-body sr-card__desc" data-line="desc">{desc}</p>
      {foot && <div className="sr-card__foot">{foot}</div>}
    </Tag>
  );
}
export function CardGrid({ cards, columns = 3, tone, name }: { cards: CardData[]; columns?: 2 | 3; tone?: Tone | "neutral"; name?: string }) {
  const hasFoot = cards.some((c) => c.foot);
  return (
    <div className={`sr-card-grid sr-card-grid--${columns}${hasFoot ? " sr-card-grid--foot" : ""}`} data-siblings={name ?? "cards"}>
      {cards.map((c) => <Card key={c.title} {...c} tone={tone} />)}
    </div>
  );
}

/* ── Mesh panel + mock UI ── */
/** Feature panel: Sarvam's verified 135° tint gradients (Indus Cowork) + grain. */
export function MeshPanel({ tone = "indigo", children }: { tone?: Tone; children: ReactNode }) {
  return <div className={`sr-mesh-panel sr-tint-${tone}`}>{children}</div>;
}
export function MockChecklist({ label, items, note, tag }: { label: string; tag?: string; note?: string; items: { text: string; state: "done" | "active" | "pending" }[] }) {
  return (
    <div className="sr-mock" aria-hidden>
      <div className="sr-mock__label"><Eyebrow mono>{label}</Eyebrow>{tag && <span className="sr-meta" style={{ fontFamily: "var(--font-display)", fontSize: 15, color: "var(--color-tx-accent)" }}>{tag}</span>}</div>
      {items.map((it) => (
        <div key={it.text} className={cx("sr-mock__row", it.state === "done" && "sr-mock__row--done", it.state === "pending" && "sr-mock__row--pending")}>
          {it.state === "done" ? <CircleCheck strokeWidth={ICON_STROKE} style={{ color: "var(--color-sr-indigo-800)" }} /> : <Circle strokeWidth={ICON_STROKE} />}
          <span>{it.text}</span>
        </div>
      ))}
      {note && <p className="sr-mock__note">{note}</p>}
    </div>
  );
}

export function Checklist({ items, tone = "indigo" }: { items: string[]; tone?: Tone }) {
  return (
    <ul className={`sr-checklist sr-checklist--${tone}`}>
      {items.map((t) => (
        <li key={t}><Check strokeWidth={2} aria-hidden /><span>{t}</span></li>
      ))}
    </ul>
  );
}

/* ── Feature row (P4) ── */
export function FeatureRow({ title, body, checklist, tone = "indigo", visual, cta }: { title: string; body: string; checklist: string[]; tone?: Tone; visual: ReactNode; cta?: ReactNode }) {
  return (
    <article className="sr-feature-row" data-sibling>
      <div className="sr-feature-row__visual"><MeshPanel tone={tone}>{visual}</MeshPanel></div>
      <div className="sr-feature-row__text">
        <h3 className="sr-h3" data-line="title">{title}</h3>
        <p className="sr-body" data-line="body">{body}</p>
        {cta}
        <Checklist items={checklist} tone={tone} />
      </div>
    </article>
  );
}

/* ── Steps (P9) ── */
export function Steps({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <ol className="sr-steps" data-siblings="steps">
      {steps.map((s, i) => (
        <li key={s.title} className="sr-step" data-sibling>
          <span className="sr-step__num">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="sr-item-title sr-step__title" data-line="title">{s.title}</h3>
          <p className="sr-body" data-line="body">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

/* ── Timeline (P8) ── */
export function Timeline({ events }: { events: { time: string; title: string; body: string }[] }) {
  return (
    <ol className="sr-timeline" data-siblings="timeline">
      {events.map((e) => (
        <li key={e.time} className="sr-timeline__event" data-sibling>
          <span className="sr-timeline__dot" aria-hidden />
          <Eyebrow mono>{e.time}</Eyebrow>
          <h3 className="sr-item-title" data-line="title">{e.title}</h3>
          <p className="sr-small" data-line="body">{e.body}</p>
        </li>
      ))}
    </ol>
  );
}

/* ── FAQ (P12) ── */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="sr-faq">
      {items.map((it, i) => (
        <details key={it.q} className="sr-faq__item" open={i === 0}>
          <summary className="sr-faq__q">{it.q}<ChevronDown strokeWidth={ICON_STROKE} aria-hidden /></summary>
          <div className="sr-faq__a"><p className="sr-body">{it.a}</p></div>
        </details>
      ))}
    </div>
  );
}

/* ── Trust band (P11) ── */
export function TrustBand({ title, lead, points }: { title: string; lead: string; points: { title: string; body: string }[] }) {
  return (
    <section className="sr-trust">
      <div className="sr-stack" style={{ gap: "var(--space-4)" }}>
        <h2 className="sr-h2">{title}</h2>
        <p className="sr-lead">{lead}</p>
      </div>
      <div className="sr-trust__points" data-siblings="trust points">
        {points.map((p) => (
          <div key={p.title} className="sr-trust__point" data-sibling>
            <h3 className="sr-h4" data-line="title">{p.title}</h3>
            <p className="sr-body" data-line="body">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── CTA card (P13) ── */
// Night gradient + grain; a ring lattice that grows from the bottom edge layer by layer; a 4-petal symbol that
// unfurls; headline and button rise in. Our own construction (Sarvam enlarges its logomark here, which logo.md forbids us to copy).
// Symbol: our own flower (studio → Flower), 8 lotus petals with a cut centre.
const SYMBOL = flowerSVG({ petals: 8, shape: "lotus", depth: 0.55, layers: 1, centre: 0.16, frame: 0 }, "solid", "cta-symbol");
export function CtaCard({ title, cta }: { title: string; cta: ReactNode }) {
  return (
    <InView className="sr-cta sr-gradient-night">
      <div className="sr-cta__lattice" dangerouslySetInnerHTML={{ __html: LATTICE_SVG }} />
      <h2 className="sr-display-2 sr-cta__title">{title}</h2>
      <span className="sr-cta__symbol" aria-hidden dangerouslySetInnerHTML={{ __html: SYMBOL }} />
      <div className="sr-cta__action">{cta}</div>
    </InView>
  );
}

/* ── Nav (P1) ── */
const NAV = ["Products", "Developers", "Resources", "Company"];
export function Nav({ cta = "Talk to Us" }: { cta?: string }) {
  return (
    <nav className="sr-nav" aria-label="Main">
      <div className="sr-container sr-nav__bar">
        <a href="#" className="sr-nav__logo" aria-label="Sarvam home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/sarvam-wordmark-black.svg" alt="Sarvam" />
        </a>
        <ul className="sr-nav__links">{NAV.map((l) => <li key={l}><a href="#">{l}</a></li>)}</ul>
        <div className="sr-nav__actions">
          <Button variant="secondary">{cta}</Button>
          <details className="sr-nav__menu">
            <summary aria-label="Open menu"><Menu strokeWidth={ICON_STROKE} /></summary>
            <div className="sr-nav__sheet">
              {NAV.map((l) => <a key={l} href="#">{l}<ArrowRight width={20} strokeWidth={ICON_STROKE} /></a>)}
            </div>
          </details>
        </div>
      </div>
    </nav>
  );
}

/* ── Footer (P14) ── */
const FOOTER: Record<string, string[]> = {
  Products: ["Indus Cowork", "Work Agents", "Document AI", "Sarvam Edge"],
  APIs: ["Text to Speech", "Speech to Text", "Translation", "Dubbing"],
  Resources: ["Blogs", "Documentation", "API Pricing", "Customer Stories"],
  Company: ["About Us", "Careers", "Brand", "Trust Center"],
};
export function Footer() {
  return (
    <footer className="sr-footer">
      <div className="sr-container">
        <div className="sr-footer__grid">
          <div className="sr-footer__brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/sarvam-wordmark-black.svg" alt="Sarvam" />
            <p className="sr-small">AI for all from India</p>
          </div>
          <div className="sr-footer__cols">
            {Object.entries(FOOTER).map(([h, links]) => (
              <div key={h} className="sr-footer__col">
                <Eyebrow>{h}</Eyebrow>
                {links.map((l) => <a key={l} href="#">{l}</a>)}
              </div>
            ))}
          </div>
        </div>
        <div className="sr-footer__legal">
          <p className="sr-meta">© 2026 Axonwise Private Limited. All rights reserved.</p>
          <p className="sr-meta">732, Chinmaya Mission Hospital Road, Indiranagar Stage 1, Bengaluru, Karnataka 560038</p>
        </div>
      </div>
    </footer>
  );
}

export function Motif() {
  // Official Sarvam line motif (references/brand/motifs/motif.svg)
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="sr-motif" src="/brand/motif.svg" alt="" aria-hidden />;
}
export { GatewayFrame } from "./GatewayFrame";

export { MockPlan, MockResearch, MockReview } from "./mocks";

/* ── Feature bento: one wide tile + two square tiles, each with its own product moment ── */
export function FeatureBento({ items }: { items: { tone: Tone; title: string; body: string; visual: ReactNode }[] }) {
  return (
    <div className="sr-bento" data-siblings="bento small tiles">
      {items.map((it, i) => (
        <article key={it.title} className={`sr-bento__tile${i === 0 ? " sr-bento__tile--wide" : ""}`} {...(i > 0 ? { "data-sibling": "" } : {})}>
          <div className={`sr-bento__visual sr-tint-${it.tone}`}>{it.visual}</div>
          <div className="sr-bento__text">
            <h3 className="sr-h4" data-line="title">{it.title}</h3>
            <p className="sr-body" data-line="body">{it.body}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

/* ── Card variants ── */
/** Glow card: a soft studio shape on a tint as the header (imagery.md §2.2 glow). */
export function GlowCard({ svg, eyebrow, title, desc }: { svg: string; eyebrow: string; title: string; desc: string }) {
  return (
    <article className="sr-card sr-card--glow" data-sibling>
      <div className="sr-card__glow" aria-hidden dangerouslySetInnerHTML={{ __html: svg }} />
      <Eyebrow mono>{eyebrow}</Eyebrow>
      <h3 className="sr-h4 sr-card__title" data-line="title">{title}</h3>
      <p className="sr-body sr-card__desc" data-line="desc">{desc}</p>
    </article>
  );
}
/** Fact card: one verified fact set large, with a short label. Never invented numbers (voice.md §5). */
export function FactCard({ fact, label, note }: { fact: string; label: string; note: string }) {
  return (
    <article className="sr-card sr-card--fact" data-sibling>
      <p className="sr-card__fact" data-line="fact">{fact}</p>
      <h3 className="sr-item-title" data-line="title">{label}</h3>
      <p className="sr-small" data-line="desc">{note}</p>
    </article>
  );
}

/* ── Tile card: crisp glow tile + title + one line (horizontal) ── */
export function TileCard({ svg, title, desc }: { svg: string; title: string; desc: string }) {
  return (
    <div data-sibling>
      <article className="sr-tile-card">
        <span className="sr-tile" aria-hidden dangerouslySetInnerHTML={{ __html: svg }} />
        <div className="sr-tile-card__text">
          <h3 className="sr-feature-title" data-line="title">{title}</h3>
          <p className="sr-body" data-line="desc">{desc}</p>
        </div>
      </article>
    </div>
  );
}

export { CoworkDashboard, ScheduleDashboard } from "./dashboards";
export { EmblemArt, EmblemCard } from "./Emblem";
