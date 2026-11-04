"use client";
// Indus Cowork page, v2: our own interactive sections (not sarvam.ai's section order). Every section asks the reader to
// do something: pick a role, scrub a day, approve work, build a teammate. Facts: deliverables/1-design-system/voice.md §5.
// Motion rules (components.md §5): transform + opacity only, fixed boxes (nothing resizes), loops pause off-screen,
// reduced motion shows the final state. Request lines inside mocks are illustrative UI text.
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import {
  ArrowRight, ArrowUp, Check, Replay, X,
} from "@/components/icons";
import { BrandMark } from "./brand";
import { DUR, EASE } from "./motion";

export type Tone = "indigo" | "orange" | "green" | "rose";
const ease = (r: boolean | null) => (r ? { duration: 0 } : { duration: DUR.slow, ease: EASE.outQuint });

import { ROLES } from "./cowork-data";
export { ROLES };

/* ── 1 · Hero composer: pick a role → the teammate plans it live ── */
export function HeroComposer() {
  const [k, setK] = useState(0);
  const [step, setStep] = useState(0);              // 0 typing · 1–4 plan items · 5 result
  const [auto, setAuto] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduced = useReducedMotion();
  const r = ROLES[k];
  const shown = reduced ? 5 : step;
  useEffect(() => {
    if (reduced || !inView) return;
    const wait = step === 0 ? 1300 : step < 5 ? 750 : 2600;
    const t = setTimeout(() => {
      if (step < 5) setStep(step + 1);
      else { if (auto) setK((n) => (n + 1) % ROLES.length); setStep(0); }
    }, wait);
    return () => clearTimeout(t);
  }, [step, inView, reduced, auto]);
  return (
    <div ref={ref} className="pv-composer">
      <div className="pv-chips" role="radiogroup" aria-label="Pick a teammate">
        {ROLES.map((x, n) => (
          <button key={x.key} type="button" role="radio" aria-checked={n === k} className="pv-chip" data-tone={x.tone}
            onClick={() => { setK(n); setStep(reduced ? 5 : 0); setAuto(false); }}>
            <span className={`pv-chip__icon cw-tone--${x.tone}`}><x.icon width={14} height={14} /></span>{x.role}
          </button>
        ))}
      </div>
      <div className="pv-card" aria-live="polite">
        <div className="pv-msg">
          <span className="pv-msg__who">You → {r.role}</span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p key={r.key} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={ease(reduced)}>
              <motion.span style={{ display: "inline-block" }} initial={reduced ? false : { clipPath: "inset(0 100% 0 0)" }} animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={reduced ? { duration: 0 } : { duration: 1.1, ease: "linear" }}>{r.ask}</motion.span>
            </motion.p>
          </AnimatePresence>
          <span className="pv-send" aria-hidden><ArrowUp width={14} height={14} strokeWidth={2} /></span>
        </div>
        <div className="pv-plan">
          <div className="pv-plan__head"><b>To-do</b><span>{shown === 5 ? 4 : Math.max(0, shown - 1)} of 4</span></div>
          <ol>
            {r.plan.map((p, n) => {
              const done = shown > n + 1 || shown === 5, active = shown === n + 1;
              return (
                <li key={r.key + p} data-state={done ? "done" : active ? "active" : "todo"}>
                  <span className="pv-dot">{done && <Check width={11} height={11} strokeWidth={2.5} />}</span>{p}
                </li>
              );
            })}
          </ol>
        </div>
        <div className="pv-result" data-on={shown === 5}>
          <span className="pv-result__text">{shown === 5 ? r.result : "Working on it…"}</span>
          <span className="pv-result__btn">{shown === 5 ? "Review" : "Waiting"}</span>
        </div>
      </div>
    </div>
  );
}

/* ── 2 · A day with your teammate: scrub the clock ── */
const DAY = [
  { t: "06:00", title: "Overnight cluster check", body: "Health report waiting in the knowledge base before anyone logs on." },
  { t: "08:00", title: "Morning standup digest", body: "Yesterday's movement across your tools, summarised and posted to Slack." },
  { t: "12:00", title: "Inbox, cleared", body: "Replies drafted and parked, the two that need you flagged." },
  { t: "17:00", title: "Spend watch", body: "Wasted budget caught early, with a fix ready to approve." },
  { t: "Fri", title: "Weekly readout", body: "The numbers and the reason behind them, drafted for your review." },
]; // [verified copy: sarvam.ai/indus-cowork "Runs while you sleep"]
export function DayScrubber() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduced = useReducedMotion();
  const at = reduced ? DAY.length - 1 : i;
  useEffect(() => {
    if (!auto || !inView || reduced) return;
    const t = setTimeout(() => setI((n) => (n + 1) % DAY.length), i === DAY.length - 1 ? 3600 : 2400);
    return () => clearTimeout(t);
  }, [i, auto, inView, reduced]);
  return (
    <div ref={ref} className="pv-day">
      {/* one rail across all five; the fill reaches the current time */}
      <div className="pv-day__rail" aria-hidden>
        <motion.span className="pv-day__fill" initial={false} animate={{ scaleX: at / (DAY.length - 1) }} transition={reduced ? { duration: 0 } : { duration: 0.9, ease: EASE.outQuint }} />
      </div>
      <ol className="pv-day__grid" role="tablist" aria-label="A day of scheduled tasks">
        {DAY.map((d, n) => {
          const done = n <= at, now = n === at;
          return (
            <li key={d.t}>
              <button type="button" role="tab" aria-selected={now} className="pv-day__item" data-done={done} data-now={now} onClick={() => { setI(n); setAuto(false); }}>
                <span className="pv-day__dot" aria-hidden />
                <span className="pv-day__time">{d.t}</span>
                <span className="pv-day__title" data-may-wrap>{d.title}</span>
                <span className="pv-day__body">{d.body}</span>
                <span className="pv-day__status">{done ? <><Check width={12} height={12} strokeWidth={2.5} />Delivered</> : "Scheduled"}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ── 3 · Your yes: rows never leave (no empty space). Each row turns Approved / Sent back in place; the trail is always
 *  four lines (history pre-filled, new events push the oldest out). Plays itself until the reader acts. ── */
type Item = { id: number; what: string; who: string };
type Status = "waiting" | "approved" | "back";
const QUEUE: Item[] = [
  { id: 1, what: "Send 31 emails", who: "Sales Outbound" },
  { id: 2, what: "Pause two campaigns", who: "Paid Media" },
  { id: 3, what: "Post the readout", who: "Product Performance" },
];
const HISTORY: Ev[] = [
  { id: -1, text: "Drafted 31 emails", who: "Sales Outbound", time: "09:42", ok: true },
  { id: -2, text: "Flagged wasted spend", who: "Paid Media", time: "09:15", ok: true },
  { id: -3, text: "Pulled the funnel", who: "Product Performance", time: "08:30", ok: true },
  { id: -4, text: "Researched 40 accounts", who: "Sales Outbound", time: "08:05", ok: true },
];
type Ev = { id: number; text: string; who: string; time: string; ok: boolean; you?: boolean };
const roleOf = (who: string) => ROLES.find((r) => r.role === who) ?? ROLES[0];
export function ApprovalDesk() {
  const fresh = () => Object.fromEntries(QUEUE.map((q) => [q.id, "waiting"])) as Record<number, Status>;
  const [status, setStatus] = useState<Record<number, Status>>(fresh);
  const [trail, setTrail] = useState(HISTORY);
  const [touched, setTouched] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduced = useReducedMotion();
  const waiting = QUEUE.filter((q) => status[q.id] === "waiting");
  const decide = (it: Item, ok: boolean) => {
    setStatus((s) => ({ ...s, [it.id]: ok ? "approved" : "back" }));
    setTrail((tr) => [{ id: Date.now(), text: `${ok ? "You approved" : "You sent back"}: ${it.what.toLowerCase()}`, who: it.who, time: "Just now", ok, you: true }, ...tr].slice(0, 4));
  };
  useEffect(() => {
    if (touched || !inView || reduced) return;
    const t = setTimeout(() => {
      if (waiting.length) decide(waiting[0], true);
      else { setStatus(fresh()); setTrail(HISTORY); }
    }, waiting.length ? 2400 : 3200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, touched, inView, reduced]);
  const reset = () => { setStatus(fresh()); setTrail(HISTORY); };
  return (
    <div ref={ref} className="pv-desk">
      <div className="pv-desk__queue">
        <div className="pv-desk__head"><b>Needs your yes</b><span>{waiting.length ? `${waiting.length} waiting` : <button type="button" className="pv-again" onClick={() => { setTouched(true); reset(); }}><Replay width={14} height={14} strokeWidth={1.75} />Run it again</button>}</span></div>
        <ul>
          {QUEUE.map((it) => {
            const st = status[it.id];
            return (
              <li key={it.id} data-status={st}>
                <span className="pv-desk__what"><b>{it.what}</b><span>{it.who}</span></span>
                <span className="pv-desk__btns">
                  <AnimatePresence mode="wait" initial={false}>
                    {st === "waiting" ? (
                      <motion.span key="w" className="pv-desk__btnrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={ease(reduced)}>
                        <button type="button" className="pv-btn" aria-label={`Send back: ${it.what}`} onClick={() => { setTouched(true); decide(it, false); }}><X width={14} height={14} strokeWidth={2} /></button>
                        <button type="button" className="pv-btn pv-btn--yes" aria-label={`Approve: ${it.what}`} onClick={() => { setTouched(true); decide(it, true); }}><Check className="pv-btn__icon" width={16} height={16} strokeWidth={2.25} /><span className="pv-btn__label">Approve</span></button>
                      </motion.span>
                    ) : (
                      <motion.span key="d" className={`pv-desk__state pv-desk__state--${st}`} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={ease(reduced)}>
                        {st === "approved" ? <><Check width={13} height={13} strokeWidth={2.5} />Approved</> : <><X width={13} height={13} strokeWidth={2.5} />Sent back</>}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </li>
            );
          })}
        </ul>
        <p className="pv-desk__foot">Sending, merging and changes always wait here first.</p>
      </div>
      <div className="pv-desk__trail">
        <div className="pv-log">
          <div className="pv-desk__head"><b>Trail</b><span>Every task leaves one</span></div>
          <ol className="pv-log__list">
            <AnimatePresence initial={false} mode="popLayout">
              {trail.map((ev) => {
                const r = roleOf(ev.who);
                return (
                  <motion.li key={ev.id} layout={!reduced} initial={reduced ? false : { opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={ease(reduced)}>
                    <span className={`pv-log__icon ${ev.you ? (ev.ok ? "pv-log__icon--yes" : "pv-log__icon--back") : `cw-tone--${r.tone}`}`} aria-hidden>
                      {ev.you ? (ev.ok ? <Check width={13} height={13} strokeWidth={2.5} /> : <X width={13} height={13} strokeWidth={2.5} />) : <r.icon width={13} height={13} />}
                    </span>
                    <span className="pv-log__text"><b>{ev.text}</b><span>{ev.who} · {ev.time}</span></span>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ol>
        </div>
      </div>
    </div>
  );
}

/* ── 4 · Build a teammate: role + apps + rhythm → a live teammate card ── */
const APP_CHOICES = ["Gmail", "Slack", "Google Sheets", "Notion", "Google Calendar", "Google Docs", "BigQuery", "PostHog", "Metabase", "Linear", "GitHub", "Jira"];
const RHYTHMS = [["daily", "Every morning at 8"], ["weekly", "Every Friday"], ["ondemand", "When you message it"]] as const;
/* one-word labels for a narrow segmented control; the full rhythm still shows in the card's "Runs" row */
const RHYTHM_SHORT: Record<(typeof RHYTHMS)[number][0], string> = { daily: "Daily", weekly: "Weekly", ondemand: "On demand" };
export function TeammateBuilder() {
  const [k, setK] = useState(0);
  const [apps, setApps] = useState<string[]>(ROLES[0].apps);
  const [rhythm, setRhythm] = useState<(typeof RHYTHMS)[number][0]>("daily");
  const r = ROLES[k];
  const reduced = useReducedMotion();
  const pickRole = (n: number) => { setK(n); setApps(ROLES[n].apps); };
  const toggle = (a: string) => setApps((xs) => (xs.includes(a) ? xs.filter((x) => x !== a) : xs.length >= 5 ? xs : [...xs, a]));
  const when = useMemo(() => RHYTHMS.find(([v]) => v === rhythm)![1], [rhythm]);
  const subject = encodeURIComponent(`Indus Cowork: a ${r.role} teammate`);
  return (
    <div className="pv-build">
      <div className="pv-build__controls">
        <div className="pv-field" role="group" aria-labelledby="pv-f1">
          <p className="pv-field__title" id="pv-f1"><span className="pv-n">1</span>Give it a job</p>
          <div className="pv-chips pv-chips--wrap">
            {ROLES.map((x, n) => (
              <button key={x.key} type="button" aria-pressed={n === k} className="pv-chip" data-tone={x.tone} onClick={() => pickRole(n)}>
                <span className={`pv-chip__icon cw-tone--${x.tone}`}><x.icon width={14} height={14} /></span>{x.role}
              </button>
            ))}
          </div>
        </div>
        <div className="pv-field" role="group" aria-labelledby="pv-f2">
          <p className="pv-field__title" id="pv-f2"><span className="pv-n">2</span>Connect its apps <span className="pv-hint">up to 5<span className="pv-wide"> of 100+</span></span></p>
          <div className="pv-apps">
            {APP_CHOICES.map((a) => (
              <button key={a} type="button" aria-pressed={apps.includes(a)} className="pv-app" onClick={() => toggle(a)} title={a}>
                <BrandMark name={a} size={20} colored /><span className="pv-app__full">{a}</span>{a.startsWith("Google ") && <span className="pv-app__short" aria-hidden>{a.slice(7)}</span>}
              </button>
            ))}
          </div>
        </div>
        <div className="pv-field" role="group" aria-labelledby="pv-f3">
          <p className="pv-field__title" id="pv-f3"><span className="pv-n">3</span>Set its rhythm</p>
          <div className="pv-seg">
            {RHYTHMS.map(([v, l]) => (
              <button key={v} type="button" aria-pressed={rhythm === v} onClick={() => setRhythm(v)}>
                {rhythm === v && <motion.span layoutId="pv-seg-pill" className="pv-seg__pill" transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }} />}
                <span className="pv-seg__label"><span className="pv-seg__full">{l}</span><span className="pv-seg__short" aria-hidden>{RHYTHM_SHORT[v]}</span></span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className={`pv-mate cw-surface--${r.tone}`} data-tone={r.tone}>
        {/* layered echoes of one medallion per job; switching jobs crossfades to that job's shape */}
        <div className="pv-mate__card">
          <div className="pv-mate__head">
            <span className={`pv-mate__avatar cw-tone--${r.tone}`}><r.icon width={22} height={22} /></span>
            <span><b>{r.role}</b><span><span className="pv-wide">Your </span>Indus Cowork teammate</span></span>
          </div>
          <dl className="pv-mate__rows">
            <div><dt>Does</dt><dd>
              {/* swaps in the same frame as the role (no exit wait), then a quick fade so the change still reads */}
              <motion.span key={r.key} initial={reduced ? false : { opacity: 0.35 }} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0 : 0.18 }}>{r.plan.slice(0, 3).join(" · ")}</motion.span>
            </dd></div>
            <div><dt>Works in</dt><dd className="pv-mate__apps">
              {apps.length ? apps.map((a) => <span key={a} title={a}><BrandMark name={a} size={18} colored title={a} /></span>) : <span className="pv-hint">Pick at least one app</span>}
            </dd></div>
            <div><dt>Runs</dt><dd>{when}</dd></div>
            <div><dt>Ships</dt><dd>Only after your yes</dd></div>
          </dl>
          <a className="sr-button sr-button--primary pv-mate__cta" href={`https://www.sarvam.ai/contact?subject=${subject}`}>Talk to us<span className="pv-wide"> about this teammate</span><ArrowRight width={16} height={16} strokeWidth={1.75} /></a>
        </div>
      </div>
    </div>
  );
}

/* ── Integrations: one quiet panel. The number on the left, a static grid of the 24 named connectors (real,
 *  coloured marks) on the right. Only motion: the grid fades in once (soft stagger). ── */
const INT_APPS = [
  "Gmail", "Google Calendar", "Google Docs", "Google Drive", "Google Sheets", "Slack",
  "Notion", "Airtable", "Metabase", "PostHog", "BigQuery", "Snowflake",
  "GitHub", "Linear", "Jira", "Sentry", "PagerDuty", "Vercel",
  "Asana", "Calendly", "Dropbox", "Apify", "DataRobot", "Canva",
];
export function IntegrationField() {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  return (
    <div ref={ref} className="pv-int">
      <div className="pv-int__text">
        <p className="pv-int__num">100+</p>
        <p className="pv-int__label">connectors across productivity, data and engineering tools.</p>
        <p className="pv-int__more">Need something custom? Bring your own connector.</p>
        <a className="sr-button sr-button--secondary pv-int__cta" href="#build">Pick apps for a teammate<ArrowRight width={16} height={16} strokeWidth={1.75} /></a>
      </div>
      <ul className="pv-int__grid">
        {INT_APPS.map((a, n) => (
          <motion.li key={a} title={a} initial={reduced ? false : { opacity: 0 }} animate={on || reduced ? { opacity: 1 } : {}}
            transition={reduced ? { duration: 0 } : { duration: DUR.slow, ease: EASE.outQuint, delay: n * 0.02 }}>
            <BrandMark name={a} size={24} colored title={a} />
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/* ── FAQ: one answer open at a time (opening one closes the other). Height animates with Motion; reduced motion = instant. ── */
export function OneFaq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useReducedMotion();
  return (
    <div className="pv-faq">
      {items.map((it, n) => {
        const on = open === n;
        return (
          <div key={it.q} className="pv-faq__item" data-open={on}>
            <button type="button" className="pv-faq__q" aria-expanded={on} aria-controls={`pv-faq-${n}`} id={`pv-faq-q-${n}`} onClick={() => setOpen(on ? null : n)}>
              <span>{it.q}</span><span className="pv-faq__chev" aria-hidden />
            </button>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div id={`pv-faq-${n}`} role="region" aria-labelledby={`pv-faq-q-${n}`} className="pv-faq__a"
                  initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  transition={reduced ? { duration: 0 } : { height: { duration: 0.3, ease: EASE.outQuint }, opacity: { duration: 0.2 } }}>
                  <p>{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
