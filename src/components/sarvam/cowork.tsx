"use client";
// Indus Cowork landing page: interactive pieces. Spec: design-system/recipes/landing-page.md, components.md §5 (motion).
// Motion rules: transform + opacity only; nothing changes size; every loop pauses off-screen; reduced motion = static.
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { DUR, EASE } from "./motion";

/* ── Reveal: one gentle entrance per block (8px rise + fade), once ── */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }} transition={{ duration: DUR.entrance, ease: EASE.outQuint, delay }}>
      {children}
    </motion.div>
  );
}

/* ── Marquee: the connector strip under the hero. CSS transform loop; pauses on hover and off-screen ── */
export function Marquee({ children, label }: { children: ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0 });
  return (
    <div ref={ref} className="cw-marquee" aria-label={label} data-run={inView}>
      <div className="cw-marquee__track">
        <div className="cw-marquee__set">{children}</div>
        <div className="cw-marquee__set" aria-hidden>{children}</div>
      </div>
    </div>
  );
}

/* ── Stage: a fixed-size product stage with a tab rail (how it works · roles).
 *  All panels share one grid cell, so the stage is always as tall as the tallest panel: switching never moves the page.
 *  Auto-advances while visible (progress bar = scaleX), stops for good once the reader picks a tab. ── */
export type StageItem = { key: string; tab: string; tabNote?: string; panel: ReactNode };
export function Stage({ items, interval = 7000, label, rail = "side" }: { items: StageItem[]; interval?: number; label: string; rail?: "side" | "top" }) {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduced = useReducedMotion();
  const running = auto && inView && !reduced;
  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setI((n) => (n + 1) % items.length), interval);
    return () => clearTimeout(t);
  }, [running, i, interval, items.length]);
  const pick = (n: number) => { setI(n); setAuto(false); };
  // keep the active tab in view on a scrolling rail (phone/tablet) without scrolling the page
  const railRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const rail = railRef.current, tab = rail?.children[i] as HTMLElement | undefined;
    if (!rail || !tab || rail.scrollWidth <= rail.clientWidth) return;
    rail.scrollTo({ left: tab.offsetLeft - rail.offsetLeft - parseFloat(getComputedStyle(rail).paddingLeft), behavior: reduced ? "auto" : "smooth" });
  }, [i, reduced]);
  return (
    <div ref={ref} className={`cw-stage cw-stage--${rail}`}>
      <div ref={railRef} className="cw-stage__rail" role="tablist" aria-label={label}>
        {items.map((it, n) => (
          <button key={it.key} role="tab" type="button" aria-selected={n === i} aria-controls={`${it.key}-panel`} id={`${it.key}-tab`}
            className="cw-stage__tab" onClick={() => pick(n)}>
            <span className="cw-stage__num">{String(n + 1).padStart(2, "0")}</span>
            <span className="cw-stage__tabtext">
              <span className="cw-stage__tabtitle">{it.tab}</span>
              {it.tabNote && <span className="cw-stage__tabnote">{it.tabNote}</span>}
            </span>
            <span className="cw-stage__bar" aria-hidden>
              <motion.span className="cw-stage__fill" key={`${i}-${running}`} initial={{ scaleX: n === i && running ? 0 : n === i ? 1 : 0 }}
                animate={{ scaleX: n === i ? 1 : 0 }} transition={n === i && running ? { duration: interval / 1000, ease: "linear" } : { duration: DUR.moderate, ease: EASE.emphasized }} />
            </span>
          </button>
        ))}
      </div>
      <div className="cw-stage__panels">
        {items.map((it, n) => (
          <motion.div key={it.key} id={`${it.key}-panel`} role="tabpanel" aria-labelledby={`${it.key}-tab`} aria-hidden={n !== i}
            className="cw-stage__panel" inert={n !== i}
            initial={false} animate={{ opacity: n === i ? 1 : 0, y: n === i ? 0 : 8 }}
            transition={{ duration: reduced ? 0 : DUR.slow, ease: EASE.outQuint, delay: n === i && !reduced ? 0.08 : 0 }}>
            {it.panel}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Skill card: the steps write themselves in, once, when the card comes into view ── */
export function SkillCard({ name, tags, steps, foot }: { name: string; tags: string[]; steps: string[]; foot: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  return (
    <div ref={ref} className="cw-skill" role="img" aria-label={`Skill ${name}: ${steps.join(", ")}`}>
      <div className="cw-skill__head">
        <code className="cw-skill__name">{name}</code>
        <span className="cw-skill__tags">{tags.map((t) => <span key={t} className="sr-chip">{t}</span>)}</span>
      </div>
      <p className="sr-eyebrow cw-skill__label">Steps</p>
      <ol className="cw-skill__steps">
        {steps.map((s, n) => (
          <motion.li key={s} initial={reduced ? false : { opacity: 0, y: 6 }} animate={inView || reduced ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: DUR.slow, ease: EASE.outQuint, delay: 0.25 + n * 0.35 }}>
            <span className="cw-skill__n">{n + 1}</span><span>{s}</span>
          </motion.li>
        ))}
      </ol>
      <AnimatePresence>
        {(inView || reduced) && (
          <motion.p className="cw-skill__foot" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: DUR.slow, delay: 0.25 + steps.length * 0.35 }}>{foot}</motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
