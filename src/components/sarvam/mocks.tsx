"use client";
// Product-UI moments for Indus Cowork (imagery.md §4), animated in loops with Motion (components.md §5).
// Each loop plays one moment of a teammate's work, rests on the finished state, then restarts.
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, Circle, CircleCheck, Globe, LoaderCircle, Search, Sparkles, UserRound } from "@/components/icons";
import { STAGGER, T, rise, useLoop } from "./motion";

const S = 1.5; // ICON_STROKE
type StepState = "done" | "active" | "pending";

function StepIcon({ state }: { state: StepState }) {
  return (
    <span className="sr-mock__icon">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span key={state} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }} transition={T.state}>
          {state === "done" ? <CircleCheck strokeWidth={S} /> : state === "active" ? <span className="sr-spin"><LoaderCircle strokeWidth={S} /></span> : <Circle strokeWidth={S} />}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* 1 · Plans the work ─ steps advance, the bar fills, the status flips to "Ready for review". */
const PLAN_STEPS = ["Pull the inbound list", "Score accounts on intent", "Draft outreach in your voice", "Leave a list for your review"];
const PLAN_TIMES = ["09:02", "09:06", "09:11", "09:14"];
const PLAN_LOOP = [1500, 1500, 1500, 1500, 2600];
export function MockPlan({ freeze }: { freeze?: number } = {}) {
  const [ref, loopPhase] = useLoop(PLAN_LOOP);
  const phase = freeze ?? loopPhase;           // phase 0–3: step `phase` is active · 4: all done
  const done = Math.min(phase, 4);
  const finished = phase === 4;
  return (
    <div ref={ref} className="sr-mock sr-mock--plan" aria-hidden>
      <div className="sr-mock__head">
        <span className="sr-mock__avatar"><UserRound strokeWidth={S} /></span>
        <div className="sr-mock__who"><b>Sales Outbound</b><span>Go-to-market<span className="sr-mock__wide"> teammate</span></span></div>
        <span className={`sr-mock__status${finished ? " sr-mock__status--ready" : ""}`}>
          {finished ? <><Check strokeWidth={2} /><span className="sr-mock__wide">Ready</span></> : <><span className="sr-spin"><LoaderCircle strokeWidth={S} /></span><span className="sr-mock__wide">Working</span></>}
        </span>
      </div>
      <p className="sr-mock__task">Work the new inbound list before EOD and draft outreach.</p>
      <div className="sr-mock__progress"><motion.span initial={false} animate={{ scaleX: done / 4 }} transition={T.bar} /></div>
      <div className="sr-mock__meta"><span>To-do · {done} of 4</span><span>{finished ? "Done" : `${(4 - done) * 4} min left`}</span></div>
      <ol className="sr-mock__steps">
        {PLAN_STEPS.map((s, i) => {
          const state: StepState = i < done ? "done" : i === done ? "active" : "pending";
          return (
            <li key={s} data-state={state}>
              <StepIcon state={state} /><span>{s}</span>
              <time>{state === "done" ? PLAN_TIMES[i] : state === "active" ? "now" : "--:--"}</time>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* 2 · Researches on its own ─ the query types in, sources arrive and get read, the plan grows. */
const QUERY = "Indian SaaS outlook 2026";
const SOURCES = [["Market size and growth", "industry-report.in"], ["Competitor positioning", "analyst-notes.com"], ["Recent launches", "news.example.org"]] as const;
const RESEARCH_LOOP = [1400, 1100, 1100, 1100, 2800];
export function MockResearch({ freeze }: { freeze?: number } = {}) {
  const [ref, loopPhase] = useLoop(RESEARCH_LOOP);
  const phase = freeze ?? loopPhase;       // 0 typing · 1–3 source n read · 4 diff shown
  return (
    <div ref={ref} className="sr-mock sr-mock--research" aria-hidden>
      <div className="sr-mock__query">
        <Search strokeWidth={S} />
        <span className="sr-mock__typed">
          {phase === 0
            ? QUERY.split("").map((ch, i) => <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03, duration: 0.01 }}>{ch}</motion.span>)
            : QUERY}
        </span>
        {phase < 4 ? <span className="sr-spin"><LoaderCircle strokeWidth={S} /></span> : <Check strokeWidth={2} className="sr-mock__used" />}
      </div>
      {/* Three fixed slots: a skeleton until the source is found, then the source fades in place. No height change. */}
      <ul className="sr-mock__sources">
        {SOURCES.map(([title, domain], i) => {
          const found = phase >= i + 1, used = phase > i + 1 || phase === 4;
          return (
            <li key={title} className="sr-mock__slot">
              <motion.span className="sr-mock__skeleton" initial={false} animate={{ opacity: found ? 0 : 1 }} transition={T.state} />
              <motion.span className="sr-mock__found" initial={false} animate={{ opacity: found ? 1 : 0, y: found ? 0 : 6 }} transition={{ ...T.enter, delay: found ? STAGGER : 0 }}>
                <span className="sr-mock__fav"><Globe strokeWidth={S} /></span>
                <span className="sr-mock__src"><b>{title}</b><code>{domain}</code></span>
                <span className="sr-mock__icon">{used ? <Check strokeWidth={2} className="sr-mock__used" /> : <span className="sr-spin sr-mock__reading"><LoaderCircle strokeWidth={S} /></span>}</span>
              </motion.span>
            </li>
          );
        })}
      </ul>
      <motion.div className="sr-mock__diff" initial={false} animate={{ opacity: phase === 4 ? 1 : 0, y: phase === 4 ? 0 : 4 }} transition={T.enter}>
        <Sparkles strokeWidth={S} /><span>2 steps added to the plan</span>
      </motion.div>
    </div>
  );
}

/* 3 · Checks its own work ─ claims get sourced, checks tick, it waits for your yes, then approval lands. */
const REVIEW_LOOP = [1200, 1100, 1100, 1700, 2400];
export function MockReview({ freeze }: { freeze?: number } = {}) {
  const [ref, loopPhase] = useLoop(REVIEW_LOOP);
  const phase = freeze ?? loopPhase;         // 0 draft · 1 claim 1 · 2 claim 2 · 3 waiting · 4 approved
  const pass = Math.min(3, Math.max(1, phase));
  const Mark = ({ on, children, n }: { on: boolean; children: React.ReactNode; n: number }) => (
    <span className="sr-mock__claim">
      <motion.span className="sr-mock__hl" initial={false} animate={{ scaleX: on ? 1 : 0 }} transition={T.bar} />
      <span className="sr-mock__claim-text">{children}</span>
      <motion.sup initial={false} animate={{ opacity: on ? 1 : 0 }} transition={T.state}>{n}</motion.sup>
    </span>
  );
  return (
    <div ref={ref} className="sr-mock sr-mock--review" aria-hidden>
      <div className="sr-mock__doc-head"><b>Q3 pipeline readout</b>
        <AnimatePresence mode="wait" initial={false}><motion.span key={pass} className="sr-mock__pass" {...rise} transition={T.state}>Pass {pass}</motion.span></AnimatePresence>
      </div>
      <div className="sr-mock__doc">
        <p>Pipeline grew <Mark on={phase >= 1} n={1}>18% over Q2</Mark>, led by inbound from <Mark on={phase >= 2} n={2}>Bengaluru and Pune</Mark>.</p>
        <span className="sr-mock__line" style={{ width: "92%" }} /><span className="sr-mock__line" style={{ width: "74%" }} />
      </div>
      <ul className="sr-mock__checks">
        {["Every claim is sourced", "Reads cleanly"].map((c, i) => (
          <li key={c} data-on={phase >= i + 2}><StepIcon state={phase >= i + 2 ? "done" : "pending"} />{c}</li>
        ))}
      </ul>
      <div className="sr-mock__gate">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={phase === 4 ? "a" : "w"} className="sr-meta" {...rise} transition={T.state}>{phase === 4 ? "Sends at 10:00" : "Needs your yes"}</motion.span>
        </AnimatePresence>
        <div className="sr-mock__actions">
          <span className="sr-mock__btn">Request changes</span>
          <motion.span className="sr-mock__btn sr-mock__btn--primary" animate={phase === 3 ? { scale: [1, 0.96, 1] } : { scale: 1 }} transition={{ duration: 0.6, ease: EASE_EMPH, delay: 1.1 }}>
            {phase === 4 ? <>Approved<Check strokeWidth={2} /></> : <>Approve<ArrowUpRight strokeWidth={S} className="sr-mock__wide" /></>}
          </motion.span>
        </div>
      </div>
    </div>
  );
}
const EASE_EMPH = [0.2, 0, 0, 1] as const;
