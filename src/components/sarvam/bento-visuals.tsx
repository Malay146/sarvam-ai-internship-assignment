"use client";
// Building-block bento: one small, real-looking product moment per card. Each is a fixed-size mini UI (nothing resizes),
// with one quiet loop while visible (useLoop); reduced motion shows the finished state. Copy is illustrative UI text.
import { motion } from "motion/react";
import { Check, FileTextFill, Search } from "@/components/icons";
import { BrandMark } from "./brand";
import { ROLES } from "./cowork-data";
import { EASE, useLoop } from "./motion";

const T = { duration: 0.45, ease: EASE.outQuint };

/* Teammates: a roster with live status per role. The "working" one cycles through the roster. */
export function BvTeammates() {
  const [ref, phase] = useLoop([1800, 1800, 1800, 1800, 1800]);
  const status = (n: number) => (n === phase ? "Working" : n < phase ? "Done" : "Queued");
  return (
    <div ref={ref} className="bv-card bv-roster" aria-hidden>
      <div className="bv-head"><b>Your teammates</b><span>{ROLES.length} active</span></div>
      <ul>
        {ROLES.map((r, n) => {
          const st = status(n);
          return (
            <li key={r.key}>
              <span className={`bv-ava cw-tone--${r.tone}`}><r.icon width={13} height={13} /></span>
              <span className="bv-roster__name">{r.role}</span>
              <span className="bv-pill" data-st={st}>
                {st === "Working" && <motion.span className="bv-pulse" animate={{ opacity: [1, 0.35, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />}
                {st === "Done" && <Check width={10} height={10} strokeWidth={2.75} />}
                {st}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* Skills: a skill file with numbered steps on a rail, and the teammates it is shared with. Steps light up in turn. */
export function BvSkill() {
  // 0–2: step n is running (ring), earlier steps are done (check) · 3: all done, hold · then reset
  const [ref, phase] = useLoop([1100, 1100, 1100, 2400]);
  const steps = ["Pull the week's numbers", "Explain the movement", "Park it for review"];
  return (
    <div ref={ref} className="bv-card bv-skill" aria-hidden>
      <div className="bv-head"><code>weekly-revenue-readout</code><span className="bv-tag">Skill</span></div>
      <ol className="bv-steps">
        {/* the rail fills down to the running step */}
        <motion.span className="bv-steps__fill" initial={false} animate={{ scaleY: Math.min(phase, 2) / 2 }} transition={{ duration: 0.6, ease: EASE.outQuint }} />
        {steps.map((s, n) => {
          const st = n < phase ? "done" : n === phase ? "run" : "todo";
          return (
            <li key={s} data-st={st}>
              <span className="bv-num">
                {st === "done" ? <motion.span key="d" initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={T}><Check width={11} height={11} strokeWidth={3} /></motion.span> : n + 1}
                {st === "run" && <motion.span className="bv-num__ring" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />}
              </span>
              <span className="bv-steps__text">{s}</span>
            </li>
          );
        })}
      </ol>
      <div className="bv-foot">
        <span className="bv-stack">{ROLES.slice(0, 4).map((r) => <span key={r.key} className={`bv-ava bv-ava--sm cw-tone--${r.tone}`}><r.icon width={11} height={11} /></span>)}</span>
        <span>{phase >= 3 ? "Ready · shared with 4 teammates" : "Shared with 4 teammates"}</span>
      </div>
    </div>
  );
}

/* Scheduled tasks: today's runs on a mini timeline; the next one ticks over to Done. */
export function BvSchedule() {
  const [ref, phase] = useLoop([1600, 1600, 2400]);
  const runs = [["06:00", "Cluster check"], ["08:00", "Standup digest"], ["17:00", "Spend watch"]];
  return (
    <div ref={ref} className="bv-card bv-sched" aria-hidden>
      <div className="bv-head"><b>Today</b><span>3 scheduled</span></div>
      <ul>
        {runs.map(([t, l], n) => {
          const done = n <= phase;
          return (
            <li key={t}>
              <code>{t}</code>
              <span className="bv-sched__dot" data-on={done} />
              <span className="bv-sched__label">{l}</span>
              <span className="bv-pill" data-st={done ? "Done" : "Queued"}>{done ? <><Check width={10} height={10} strokeWidth={2.75} />Done</> : "Next"}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* Knowledge base: files with type and freshness; the one being read glows. */
export function BvKnowledge() {
  const [ref, phase] = useLoop([1800, 1800, 1800]);
  const docs = [["Pricing playbook", "PDF · 12 pages"], ["Brand voice", "Doc · updated today"], ["Q3 targets", "Sheet · 4 tabs"]];
  return (
    <div ref={ref} className="bv-card bv-kb" aria-hidden>
      <div className="bv-head"><b>Knowledge base</b><span>Used in 12 tasks</span></div>
      <ul>
        {docs.map(([d, m], n) => (
          <li key={d} data-on={n === phase}>
            <span className="bv-file"><FileTextFill width={14} height={14} /></span>
            <span className="bv-kb__text"><b>{d}</b><span>{m}</span></span>
            <motion.span className="bv-kb__read" initial={false} animate={{ opacity: n === phase ? 1 : 0 }} transition={T}>Reading</motion.span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Built-in research: a query and the sources it found (real marks), one at a time. */
export function BvResearch() {
  const [ref, phase] = useLoop([900, 900, 900, 2200]);
  const hits = [["Google Sheets", "Q3 pipeline · tab 2"], ["Notion", "Regional notes"], ["BigQuery", "inbound_by_city"]];
  return (
    <div ref={ref} className="bv-card bv-research" aria-hidden>
      <div className="bv-query"><Search width={14} height={14} strokeWidth={1.75} /><span>Q3 inbound by city</span></div>
      <ul>
        {hits.map(([app, title], n) => (
          <motion.li key={app} initial={false} animate={{ opacity: n <= phase ? 1 : 0.25, y: n <= phase ? 0 : 4 }} transition={T}>
            <span className="bv-src"><BrandMark name={app} size={14} colored /></span>
            <span className="bv-kb__text"><b>{title}</b><span>{app}</span></span>
          </motion.li>
        ))}
      </ul>
      <div className="bv-foot"><span>{Math.min(3, phase + 1)} sources found</span></div>
    </div>
  );
}
