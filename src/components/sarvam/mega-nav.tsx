"use client";
// Mega navigation, modelled on sarvam.ai's navbar (menu items, descriptions and icon tones read from its navbar bundle,
// references/brand-css/dep_Navbar.Bna_uiTB.js). Icons: Nucleo Core glyph (filled) 24, in the item's tone. Spec: components.md → MegaNav.
// Desktop (≥1024): click or hover a link → one panel drops under the bar (items in 2 columns + a featured card), the page dims.
// Direction aware hover: one pill slides between the links, and the panel content slides in from the side you moved toward.
// Phone/tablet: the menu button opens a full sheet with one accordion per section. Esc / outside click closes. Reduced motion: no slide.
import Link from "next/link";
import { useEffect, useId, useRef, useState, type ComponentType, type SVGProps } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight, BookOpenAltFill as BookOpenAlt, BrainFill as Brain, CalendarCheckFill as CalendarCheck, ClapperboardFill as Clapperboard,
  CodeFill as Code, DocumentSearchFill as DocumentSearch, FileTextFill as FileText, FilmFill as Film, HandshakeFill as Handshake,
  InfoFill as Info, LanguageFill as Language, Menu as MenuIcon, MicrophoneFill as Microphone, MobileFill as Mobile,
  NewspaperFill as Newspaper, NodesFill as Nodes, PlugFill as Plug, QuoteFill as Quote, ServerFill as Server,
  BriefcaseFill as Suitcase, TagFill as Tag, VolumeFill as Volume, X,
} from "@/components/icons";
import { NavFrame } from "./client";
import { DUR, EASE } from "./motion";
import "./mega-nav.css";

type Ic = ComponentType<SVGProps<SVGSVGElement> & { strokeWidth?: number | string }>;
type Tone = "indigo" | "green" | "orange" | "red" | "neutral";
type Item = { label: string; desc?: string; icon: Ic; tone: Tone; href?: string };
type Menu = { key: string; label: string; heading: string; items: Item[]; feature: { eyebrow: string; title: string; desc: string; cta: string; href: string; surface: string } };

/* [verified] labels, descriptions and tones from sarvam.ai's navbar */
const MENUS: Menu[] = [
  {
    key: "products", label: "Products", heading: "Products",
    items: [
      { label: "Voice Agents", desc: "Conversational AI", icon: Microphone, tone: "indigo" },
      { label: "Token Factory", desc: "Open model inference in India", icon: Server, tone: "green" },
      { label: "Work Agents", desc: "AI for Work", icon: Nodes, tone: "green", href: "#build" },
      { label: "Model Training", desc: "Custom AI models", icon: Brain, tone: "indigo" },
      { label: "Coding Agents", desc: "Ship high quality code", icon: Code, tone: "orange" },
      { label: "Sarvam Edge", desc: "On device AI", icon: Mobile, tone: "neutral" },
      { label: "Content Studio", desc: "Content Transformation", icon: Newspaper, tone: "green" },
      { label: "Document AI", desc: "Parse, extract and translate docs", icon: FileText, tone: "orange" },
    ],
    feature: { eyebrow: "New", title: "Indus Cowork", desc: "AI teammates that finish the work.", cta: "Build a teammate", href: "#build", surface: "sr-gradient-dawn" },
  },
  {
    key: "developers", label: "Developers", heading: "APIs",
    items: [
      { label: "Text to Speech", desc: "Bulbul V4 Flash", icon: Volume, tone: "orange" },
      { label: "Speech to Text", desc: "Saaras V4", icon: Microphone, tone: "indigo" },
      { label: "Parse", desc: "Sarvam Vision", icon: DocumentSearch, tone: "red" },
      { label: "Document Translation", desc: "PDF, Word, Excel and more", icon: Language, tone: "indigo" },
      { label: "Dubbing", desc: "Content Studio API", icon: Clapperboard, tone: "green" },
      { label: "Documentation", desc: "API reference and guides", icon: BookOpenAlt, tone: "green" },
    ],
    feature: { eyebrow: "Developers", title: "Build with Sarvam APIs", desc: "Speech, text and documents, in Indian languages.", cta: "Read the docs", href: "#", surface: "sr-gradient-indigo-glow" },
  },
  {
    key: "resources", label: "Resources", heading: "Resources",
    items: [
      { label: "Customer Stories", icon: Quote, tone: "orange", href: "#stories" },
      { label: "Integrations", icon: Plug, tone: "green", href: "#build" },
      { label: "API Pricing", icon: Tag, tone: "red" },
      { label: "Events", icon: CalendarCheck, tone: "indigo" },
      { label: "Partnerships", icon: Handshake, tone: "green" },
      { label: "Blogs", icon: Film, tone: "indigo" },
    ],
    feature: { eyebrow: "Stories", title: "India builds with Sarvam", desc: "How teams across India work with Sarvam.", cta: "Read the stories", href: "#stories", surface: "sr-gradient-dusk" },
  },
  {
    key: "company", label: "Company", heading: "Company",
    items: [
      { label: "About Sarvam", icon: Info, tone: "indigo" },
      { label: "Careers", icon: Suitcase, tone: "green" },
    ],
    feature: { eyebrow: "Company", title: "AI for all from India", desc: "Sovereign AI, built in India for India.", cta: "About Sarvam", href: "#", surface: "sr-gradient-saffron-rose" },
  },
];

function MenuItem({ it, onPick }: { it: Item; onPick?: () => void }) {
  const I = it.icon;
  return (
    <a className="mn-item" href={it.href ?? "#"} onClick={onPick}>
      <span className={`mn-item__icon mn-tone--${it.tone}`} aria-hidden><I width={20} height={20} /></span>
      <span className="mn-item__text"><span className="mn-item__label">{it.label}</span>{it.desc && <span className="mn-item__desc">{it.desc}</span>}</span>
    </a>
  );
}

/** Panel content slide: enters from the side the pointer moved toward, leaves to the other side. */
const slide = (d: number) => ({
  enter: (dir: number) => ({ opacity: 0, x: dir * d }),
  center: { opacity: 1, x: 0 },
  leave: (dir: number) => ({ opacity: 0, x: dir * -d }),
});

export function MegaNav({ cta = "Talk to Us", ctaHref = "#talk", login = true }: { cta?: string; ctaHref?: string; login?: boolean }) {
  const [open, setOpen] = useState<string | null>(null);
  const [sheet, setSheet] = useState(false);
  const [acc, setAcc] = useState<string | null>("products");
  const [hov, setHov] = useState<string | null>(null);
  const [dir, setDir] = useState(1);
  // One pill for all links: jumps under the first link you touch, then slides between links, fades out when you leave.
  const active = hov ?? open;
  const linkRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [pill, setPill] = useState<{ x: number; w: number; on: boolean; jump: boolean }>({ x: 0, w: 0, on: false, jump: true });
  useEffect(() => {
    const el = active ? linkRefs.current[active] : null;
    setPill((p) => el ? { x: el.offsetLeft, w: el.offsetWidth, on: true, jump: !p.on } : { ...p, on: false, jump: false });
  }, [active]);
  const reduced = useReducedMotion();
  const barRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const uid = useId();
  const menu = MENUS.find((m) => m.key === open);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(null); setSheet(false); } };
    const onDown = (e: PointerEvent) => { if (barRef.current && !barRef.current.contains(e.target as Node)) setOpen(null); };
    window.addEventListener("keydown", onKey); window.addEventListener("pointerdown", onDown);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("pointerdown", onDown); };
  }, []);
  useEffect(() => { document.documentElement.style.overflow = sheet ? "hidden" : ""; return () => { document.documentElement.style.overflow = ""; }; }, [sheet]);

  const idx = (k: string | null) => MENUS.findIndex((m) => m.key === k);
  // switching menus: remember which way we moved, so the panel content enters from that side
  const go = (k: string | null) => { if (k && open && k !== open) setDir(idx(k) > idx(open) ? 1 : -1); setOpen(k); };
  const hoverOpen = (k: string) => { if (closeTimer.current) clearTimeout(closeTimer.current); go(k); };
  const hoverClose = () => { closeTimer.current = setTimeout(() => setOpen(null), 160); };
  const t = reduced ? { duration: 0 } : { duration: DUR.moderate, ease: EASE.outQuint };

  return (
    <>
      <NavFrame overlay className={open || sheet ? "mn-open" : ""}>
        <div className="sr-nav__surface" aria-hidden />
        <div ref={barRef} onPointerLeave={hoverClose} onPointerEnter={() => closeTimer.current && clearTimeout(closeTimer.current)}>
          <div className="sr-container sr-nav__bar">
            <Link href="/" className="sr-nav__logo" aria-label="Sarvam home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/sarvam-wordmark-black.svg" alt="Sarvam" />
            </Link>
            <ul className="mn-links" onPointerLeave={() => setHov(null)}>
              <motion.li className="mn-link__pill" aria-hidden initial={false}
                animate={{ x: pill.x, width: pill.w, opacity: pill.on ? 1 : 0 }}
                transition={reduced || pill.jump
                  ? { x: { duration: 0 }, width: { duration: 0 }, opacity: { duration: reduced ? 0 : DUR.normal } }
                  : { x: { duration: DUR.moderate, ease: EASE.outQuint }, width: { duration: DUR.moderate, ease: EASE.outQuint }, opacity: { duration: DUR.normal } }} />
              {MENUS.map((m) => (
                <li key={m.key} className="mn-links__item">
                  <button type="button" ref={(el) => { linkRefs.current[m.key] = el; }} className="mn-link" aria-expanded={open === m.key} aria-controls={`${uid}-panel`}
                    onPointerEnter={(e) => { if (e.pointerType !== "mouse") return; setHov(m.key); hoverOpen(m.key); }} onClick={() => go(open === m.key ? null : m.key)}>
                    {m.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="sr-nav__actions">
              {login && <a className="sr-button sr-button--primary mn-wide" href="#">Log In</a>}
              <a className={`sr-button ${login ? "sr-button--secondary" : "sr-button--primary"} mn-wide`} href={ctaHref}>{cta}</a>
              <button type="button" className="mn-burger" aria-label={sheet ? "Close menu" : "Open menu"} aria-expanded={sheet} onClick={() => setSheet((s) => !s)}>
                {sheet ? <X width={22} height={22} strokeWidth={1.5} /> : <MenuIcon width={22} height={22} strokeWidth={1.5} />}
              </button>
            </div>
          </div>

          {/* Desktop panel: one cell for every menu, so switching menus never changes the panel's position */}
          <AnimatePresence>
            {menu && (
              <motion.div id={`${uid}-panel`} className="mn-panel" initial={{ opacity: 0, y: reduced ? 0 : -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -4 }} transition={t}>
                <div className="sr-container mn-panel__inner">
                  <AnimatePresence mode="wait" initial={false} custom={dir}>
                    <motion.div key={menu.key} className="mn-panel__body" custom={dir} variants={slide(reduced ? 0 : 24)} initial="enter" animate="center" exit="leave"
                      transition={reduced ? { duration: 0 } : { duration: DUR.normal, ease: EASE.standard }}>
                      <div className="mn-panel__items">
                        <p className="sr-eyebrow mn-panel__heading">{menu.heading}</p>
                        <div className="mn-grid">{menu.items.map((it) => <MenuItem key={it.label} it={it} onPick={() => setOpen(null)} />)}</div>
                      </div>
                      <a className="mn-feature" href={menu.feature.href} onClick={() => setOpen(null)}>
                        <span className={`mn-feature__art ${menu.feature.surface}`} aria-hidden>
                          <span className="mn-feature__kicker">{menu.feature.eyebrow}</span>
                          <span className="mn-feature__title">{menu.feature.title}</span>
                        </span>
                        <span className="mn-feature__desc">{menu.feature.desc}</span>
                        <span className="mn-feature__cta">{menu.feature.cta}<ArrowRight width={16} height={16} strokeWidth={1.5} /></span>
                      </a>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </NavFrame>

      {/* page dim behind the open desktop panel */}
      <AnimatePresence>{menu && <motion.div className="mn-scrim" aria-hidden initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={t} onClick={() => setOpen(null)} />}</AnimatePresence>

      {/* Phone/tablet sheet: accordions, 56px rows */}
      <AnimatePresence>
        {sheet && (
          <motion.div className="mn-sheet" initial={{ opacity: 0, y: reduced ? 0 : -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={t}>
            <div className="sr-container mn-sheet__inner">
              {MENUS.map((m) => (
                <section key={m.key} className="mn-acc">
                  <button type="button" className="mn-acc__head" aria-expanded={acc === m.key} onClick={() => setAcc(acc === m.key ? null : m.key)}>
                    {m.label}<span className="mn-acc__chev" data-open={acc === m.key} aria-hidden>+</span>
                  </button>
                  {acc === m.key && <div className="mn-acc__body">{m.items.map((it) => <MenuItem key={it.label} it={it} onPick={() => setSheet(false)} />)}</div>}
                </section>
              ))}
              <div className="mn-sheet__ctas">
                <a className={`sr-button ${login ? "sr-button--secondary" : "sr-button--primary"}`} href={ctaHref} onClick={() => setSheet(false)}>{cta}</a>
                {login && <a className="sr-button sr-button--primary" href="#">Log In</a>}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
