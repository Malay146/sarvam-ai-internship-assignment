"use client";
// Indus Cowork landing page: interactive pieces. Spec: design-system/recipes/landing-page.md, components.md §5 (motion).
// Motion rules: transform + opacity only; nothing changes size; every loop pauses off-screen; reduced motion = static.
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { DUR, EASE, useLoop } from "./motion";
import { ArrowUp, BriefcaseFill, ChartFill, Check, MegaphoneFill, SparkleFill, TargetFill } from "@/components/icons";
import { MEDALLION_PRESETS, medallionPath } from "@/lib/shapes";

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
export type StageItem = { key: string; tab: string; tabShort?: string; tabNote?: string; panel: ReactNode; icon?: ReactNode; tone?: "indigo" | "orange" | "green" | "rose" };
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
            className="cw-stage__tab" data-tone={it.tone} onClick={() => pick(n)}>
            {it.icon ? <span className="cw-stage__icon" aria-hidden>{it.icon}</span> : <span className="cw-stage__num">{String(n + 1).padStart(2, "0")}</span>}
            <span className="cw-stage__tabtext">
              <span className="cw-stage__tabtitle">{it.tab}</span>
              {it.tabShort && <span className="cw-stage__short" aria-hidden>{it.tabShort}</span>}
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

/* ── Step visuals: one small product moment per card, all the SAME box (100% × 176px, max 300 wide), content top-aligned
 *  with one padding, so the three cards line up. Each loops while visible (useLoop); reduced motion = the finished state.
 *  "approve" is functional: press Approve / Review and it answers, then the loop carries on. ── */
const MSG_LOOP = [900, 1300, 2400, 600];
const PROG_LOOP = [700, 900, 900, 900, 1800, 500];
const APPROVE_LOOP = [1600, 2200, 2400, 500];
export function StepVisual({ kind }: { kind: "message" | "progress" | "approve" | "approvals" }) {
  if (kind === "message") return <StepMessage />;
  if (kind === "progress") return <StepProgress />;
  if (kind === "approve") return <StepApprove />;
  return <StepQueue />;
}
const easeT = (reduced: boolean | null) => (reduced ? { duration: 0 } : { duration: DUR.slow, ease: EASE.outQuint });

function StepMessage() {
  const [ref, phase] = useLoop(MSG_LOOP);           // 0 empty · 1 you · 2 teammate replies · 3 fade
  const reduced = useReducedMotion();
  const vis = (on: boolean) => ({ opacity: on ? 1 : 0, y: on ? 0 : 6 });
  return (
    <div ref={ref} className="cw-sv" aria-hidden>
      <div className="cw-sv__app"><span className="cw-sv__hash">#</span>sales-team</div>
      <motion.div className="cw-sv__bubble cw-sv__bubble--you" initial={false} animate={vis(phase >= 1 && phase < 3)} transition={easeT(reduced)}>
        <b>You</b><span><i>@Sales Outbound</i> work the inbound list.</span>
      </motion.div>
      <motion.div className="cw-sv__bubble" initial={false} animate={vis(phase === 2)} transition={easeT(reduced)}>
        <b>Sales Outbound</b><span>On it. Planning a to-do list.</span>
      </motion.div>
    </div>
  );
}

function StepProgress() {
  const [ref, phase] = useLoop(PROG_LOOP);          // 0 start · 1–3 steps tick · 4 done · 5 reset
  const reduced = useReducedMotion();
  const steps = ["Pull the inbound list", "Research accounts", "Draft outreach"];
  const done = phase === 5 ? 0 : Math.min(3, phase);
  return (
    <div ref={ref} className="cw-sv" aria-hidden>
      <div className="cw-sv__row"><b>{done === 3 && phase >= 4 ? "Ready for review" : "Working"}</b><span>{done} of 3</span></div>
      <div className="cw-sv__track"><motion.span className="cw-sv__fill" initial={false} animate={{ scaleX: done / 3 }} transition={reduced ? { duration: 0 } : { duration: 0.7, ease: EASE.outQuint }} /></div>
      <ul>{steps.map((s, n) => (
        <motion.li key={s} initial={false} animate={{ opacity: n < done ? 1 : 0.35 }} transition={easeT(reduced)}>
          <span className="cw-sv__tick" data-on={n < done}><Check width={12} height={12} strokeWidth={2.25} /></span>{s}
        </motion.li>
      ))}</ul>
    </div>
  );
}

function StepApprove() {
  const [ref, phase] = useLoop(APPROVE_LOOP);       // 0 waiting · 1 press · 2 approved · 3 reset
  const reduced = useReducedMotion();
  const [user, setUser] = useState<null | "approved" | "review">(null);
  useEffect(() => { if (!user) return; const t = setTimeout(() => setUser(null), 2600); return () => clearTimeout(t); }, [user]);
  const approved = user ? user === "approved" : phase === 2;
  const note = user === "review" ? "Opened the 31 drafts for you." : approved ? "Approved. Sending at 10:00." : "Drafts parked for your review.";
  return (
    <div ref={ref} className="cw-sv">
      <div className="cw-sv__row"><b>40 accounts researched</b><span>31 drafts</span></div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.p key={note} className="cw-sv__note" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={easeT(reduced)}>{note}</motion.p>
      </AnimatePresence>
      <div className="cw-sv__drafts" aria-hidden>{["Email · VP Sales", "LinkedIn · Head of Ops"].map((d) => <span key={d}><i />{d}</span>)}</div>
      <div className="cw-sv__actions">
        <button type="button" className="cw-sv__btn" onClick={() => setUser("review")}>Review</button>
        <motion.button type="button" className="cw-sv__btn cw-sv__btn--primary" data-on={approved} onClick={() => setUser("approved")}
          animate={phase === 1 && !user && !reduced ? { scale: [1, 0.94, 1] } : { scale: 1 }} transition={{ duration: 0.45, delay: 0.9 }}>
          {approved ? <>Approved<Check width={12} height={12} strokeWidth={2.25} /></> : "Approve"}
        </motion.button>
      </div>
    </div>
  );
}

function StepQueue() {
  const [ref, phase] = useLoop([1400, 1400, 1400, 1800]);   // approvals land one by one, then reset
  const reduced = useReducedMotion();
  const items = [["Send 31 outreach emails", "Sales Outbound"], ["Merge the pricing fix", "Product Performance"], ["Pause two campaigns", "Paid Media"]];
  return (
    <div ref={ref} className="cw-sv cw-sv--queue" aria-hidden>
      <div className="cw-sv__row"><b>Needs your yes</b><span>{3 - Math.min(3, phase)}</span></div>
      <ul>{items.map(([a, who], n) => {
        const ok = n < phase;
        return (
          <li key={a}>
            <span className="cw-sv__qtext"><b>{a}</b><span>{who}</span></span>
            <motion.span className="cw-sv__mini" data-on={ok} initial={false} animate={{ scale: ok && phase === n + 1 && !reduced ? [1, 0.92, 1] : 1 }} transition={{ duration: 0.4 }}>
              {ok ? <><span className="cw-sv__wide">Approved</span><Check width={11} height={11} strokeWidth={2.25} /></> : "Approve"}
            </motion.span>
          </li>
        );
      })}</ul>
    </div>
  );
}

/* ── Skill creator (loop): a prompt → the skill-creator drafts the steps → the skill is shared with the team → again.
 *  Fixed layout: every row is always rendered, only opacity / transform change, so nothing resizes. Pauses off-screen;
 *  reduced motion shows the finished state. ── */
const SKILL_LOOP = [1800, 700, 700, 700, 700, 2600, 900];
const SKILL_STEPS = ["Pull the week's numbers from the data source", "Compare against last week and the plan", "Explain the movement, not just the delta", "Draft the readout and park it for review"];
/* teammates are AI roles, so their avatar is the role's icon (never a stock face, never initials) */
const SKILL_MATES = [["Sales Outbound", TargetFill, "indigo"], ["Paid Media", MegaphoneFill, "green"], ["Product Performance", ChartFill, "orange"], ["Chief of Staff", BriefcaseFill, "rose"]] as const;
const RING = medallionPath({ ...MEDALLION_PRESETS["Scalloped medallion"], aspect: 1, frame: 0 });
export function SkillCreator() {
  const [ref, phase] = useLoop(SKILL_LOOP);
  const reduced = useReducedMotion();
  const prompt = "Write our weekly revenue readout";
  const shown = phase >= 1 ? Math.min(4, phase) : 0;          // steps drafted so far
  const shared = phase >= 5 && phase < 6;
  const done = phase >= 5;
  const ease = reduced ? { duration: 0 } : { duration: DUR.slow, ease: EASE.outQuint };
  return (
    <div ref={ref} className="cw-sc" aria-label={`Skill-creator: "${prompt}" becomes a four-step skill shared with the team`} role="img">
      <svg className="cw-sc__rings" viewBox={`-30 -30 ${RING.width + 60} ${RING.height + 60}`} aria-hidden>
        {[0, 10, 20].map((o) => <path key={o} d={RING.d} fill="none" stroke="currentColor" strokeWidth={0.6} transform={`translate(${RING.width / 2} ${RING.height / 2}) scale(${1 + o / 50}) translate(${-RING.width / 2} ${-RING.height / 2})`} vectorEffect="non-scaling-stroke" />)}
      </svg>
      <div className="cw-sc__prompt">
        <span className="cw-sc__ask"><SparkleFill width={13} height={13} />Skill-creator</span>
        <span className="cw-sc__text">
          <motion.span className="cw-sc__typed" initial={false} animate={{ clipPath: phase === 0 && !reduced ? ["inset(0 100% 0 0)", "inset(0 0% 0 0)"] : "inset(0 0% 0 0)" }}
            transition={phase === 0 && !reduced ? { duration: 1.3, ease: "linear" } : { duration: 0 }}>{prompt}</motion.span>
        </span>
        <span className="cw-sc__send"><ArrowUp width={14} height={14} strokeWidth={2} /></span>
      </div>
      <div className="cw-sc__card">
        <div className="cw-sc__head">
          <code>weekly-revenue-readout</code>
          <motion.span className="cw-sc__status" key={done ? "d" : "w"} initial={reduced ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={ease}>
            {done ? "Published" : shown > 0 ? "Drafting…" : "New skill"}
          </motion.span>
        </div>
        <ol className="cw-sc__steps">
          {SKILL_STEPS.map((s, n) => (
            <motion.li key={s} initial={false} animate={{ opacity: n < shown ? 1 : 0.18, x: n < shown ? 0 : 6 }} transition={ease}>
              <span className="cw-sc__n">{n + 1}</span>{s}
            </motion.li>
          ))}
        </ol>
        <div className="cw-sc__foot">
          <span className="cw-sc__mates">
            {SKILL_MATES.map(([name, I, tone], n) => (
              <motion.span key={name} title={name} className={`cw-sc__mate cw-tone--${tone}`} initial={false}
                animate={{ opacity: done ? 1 : 0.25, scale: shared && !reduced ? [1, 1.12, 1] : 1 }} transition={{ ...ease, delay: reduced ? 0 : n * 0.08 }}><I width={14} height={14} /></motion.span>
            ))}
          </span>
          <motion.span className="cw-sc__note" initial={false} animate={{ opacity: done ? 1 : 0 }} transition={ease}>Shared with 4 teammates</motion.span>
        </div>
      </div>
    </div>
  );
}
