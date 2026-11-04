"use client";
// Indus Cowork page, v2: our own interactive sections (not sarvam.ai's section order). Every section asks the reader to
// do something: pick a role, scrub a day, approve work, build a teammate. Facts: design-system/voice.md §5.
// Motion rules (components.md §5): transform + opacity only, fixed boxes (nothing resizes), loops pause off-screen,
// reduced motion shows the final state. Request lines inside mocks are illustrative UI text.
import { useEffect, useMemo, useRef, useState, type ComponentType, type SVGProps } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import {
  ArrowRight, ArrowUp, BriefcaseFill, ChartFill, Check, MegaphoneFill, TargetFill, UserFill, X,
} from "@/components/icons";
import { BrandMark } from "./brand";
import { DUR, EASE } from "./motion";

type Ic = ComponentType<SVGProps<SVGSVGElement>>;
export type Tone = "indigo" | "orange" | "green" | "rose";
const ease = (r: boolean | null) => (r ? { duration: 0 } : { duration: DUR.slow, ease: EASE.outQuint });

/* Roles [verified: sarvam.ai/indus-cowork]; the request and plan lines are illustrative, written from each role's description. */
export const ROLES: { key: string; role: string; icon: Ic; tone: Tone; ask: string; plan: string[]; result: string; apps: string[] }[] = [
  { key: "sales", role: "Sales Outbound", icon: TargetFill, tone: "indigo", ask: "Work the new inbound list before EOD and draft outreach.",
    plan: ["Research each account", "Score contacts on intent", "Draft email and LinkedIn in your voice", "Leave a review list"], result: "31 drafts ready for your review", apps: ["Gmail", "Google Sheets", "Slack"] },
  { key: "talent", role: "Talent Scout", icon: UserFill, tone: "rose", ask: "Find strong candidates for the backend role.",
    plan: ["Source candidates", "Screen against the role", "Draft warm outreach", "Hand over a shortlist"], result: "A shortlist, ready for your review", apps: ["Gmail", "Notion", "Google Calendar"] },
  { key: "media", role: "Paid Media", icon: MegaphoneFill, tone: "green", ask: "Keep an eye on spend across this week's campaigns.",
    plan: ["Watch spend and cost per result", "Flag wasted budget", "Recommend the moves", "Wait for your yes"], result: "3 changes waiting for your yes", apps: ["Google Sheets", "Slack", "BigQuery"] },
  { key: "product", role: "Product Performance", icon: ChartFill, tone: "orange", ask: "Write this week's funnel readout.",
    plan: ["Pull the funnel", "Spot the drop-offs", "Explain the reason, not just the number", "Draft the weekly readout"], result: "Weekly readout drafted for review", apps: ["PostHog", "Metabase", "Notion"] },
  { key: "cos", role: "Chief of Staff", icon: BriefcaseFill, tone: "indigo", ask: "Chase the owners on this week's blockers.",
    plan: ["Find the open blockers", "Chase each owner", "Prepare your review", "Record every decision"], result: "Review pack and decision log ready", apps: ["Slack", "Linear", "Google Docs"] },
];

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
  useEffect(() => {
    if (!auto || !inView || reduced) return;
    const t = setTimeout(() => setI((n) => (n + 1) % DAY.length), 3200);
    return () => clearTimeout(t);
  }, [i, auto, inView, reduced]);
  const d = DAY[i];
  return (
    <div ref={ref} className="pv-day">
      <div className="pv-day__track" role="tablist" aria-label="Pick a time of day">
        <span className="pv-day__line" aria-hidden><motion.span className="pv-day__fill" initial={false} animate={{ scaleX: i / (DAY.length - 1) }} transition={ease(reduced)} /></span>
        {DAY.map((x, n) => (
          <button key={x.t} type="button" role="tab" aria-selected={n === i} className="pv-day__stop" data-past={n <= i} onClick={() => { setI(n); setAuto(false); }}>
            <span className="pv-day__knob" aria-hidden /><span className="pv-day__time">{x.t}</span>
          </button>
        ))}
      </div>
      <div className="pv-day__stage">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={d.t} className="pv-day__card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={ease(reduced)}>
            <span className="pv-day__badge">Delivered at {d.t}</span>
            <h3 className="sr-h3">{d.title}</h3>
            <p className="sr-body">{d.body}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── 3 · Your yes: approve or send back, and watch the trail ── */
type Item = { id: number; what: string; who: string };
const START: Item[] = [
  { id: 1, what: "Send 31 outreach emails", who: "Sales Outbound" },
  { id: 2, what: "Pause two campaigns", who: "Paid Media" },
  { id: 3, what: "Post the weekly readout", who: "Product Performance" },
];
export function ApprovalDesk() {
  const [items, setItems] = useState<Item[]>(START);
  const [trail, setTrail] = useState<{ id: number; text: string; ok: boolean }[]>([
    { id: 0, text: "Drafted 31 emails · Sales Outbound", ok: true },
  ]);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [touched, setTouched] = useState(false);
  // self-playing demo: approves the next item every 2.4s and starts over; stops once the reader acts
  useEffect(() => {
    if (touched || !inView || reduced) return;
    const t = setTimeout(() => {
      if (items.length) {
        const it = items[0];
        setItems((xs) => xs.slice(1));
        setTrail((tr) => [{ id: Date.now(), text: `Approved: ${it.what.toLowerCase()}`, ok: true }, ...tr].slice(0, 4));
      } else { setItems(START); setTrail((tr) => tr.slice(-1)); }
    }, items.length ? 2400 : 3000);
    return () => clearTimeout(t);
  }, [items, touched, inView, reduced]);
  const act = (it: Item, ok: boolean) => {
    setTouched(true);
    setItems((xs) => xs.filter((x) => x.id !== it.id));
    setTrail((t) => [{ id: Date.now(), text: `${ok ? "Approved" : "Sent back"}: ${it.what.toLowerCase()}`, ok }, ...t].slice(0, 4));
  };
  return (
    <div ref={ref} className="pv-desk">
      <div className="pv-desk__queue">
        <div className="pv-desk__head"><b>Needs your yes</b><span>{items.length}</span></div>
        <ul>
          <AnimatePresence initial={false}>
            {items.map((it) => (
              <motion.li key={it.id} layout={!reduced} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: 12 }} transition={ease(reduced)}>
                <span className="pv-desk__what"><b>{it.what}</b><span>{it.who}</span></span>
                <span className="pv-desk__btns">
                  <button type="button" className="pv-btn" aria-label={`Send back: ${it.what}`} onClick={() => act(it, false)}><X width={14} height={14} strokeWidth={2} /></button>
                  <button type="button" className="pv-btn pv-btn--yes" onClick={() => act(it, true)}>Approve</button>
                </span>
              </motion.li>
            ))}
          </AnimatePresence>
          {items.length === 0 && (
            <li className="pv-desk__empty">All clear. <button type="button" className="pv-link" onClick={() => { setItems(START); setTrail(trail.slice(-1)); }}>Run it again</button></li>
          )}
        </ul>
      </div>
      <div className="pv-desk__trail">
        <div className="pv-desk__head"><b>Trail</b><span>Every task leaves one</span></div>
        <ol>
          <AnimatePresence initial={false}>
            {trail.map((t) => (
              <motion.li key={t.id} initial={reduced ? false : { opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={ease(reduced)} data-ok={t.ok}>
                <span className="pv-desk__mark" aria-hidden />{t.text}
              </motion.li>
            ))}
          </AnimatePresence>
        </ol>
      </div>
    </div>
  );
}

/* ── 4 · Build a teammate: role + apps + rhythm → a live teammate card ── */
const APP_CHOICES = ["Gmail", "Slack", "Google Sheets", "Notion", "Google Calendar", "Google Docs", "BigQuery", "PostHog", "Metabase", "Linear", "GitHub", "Jira"];
const RHYTHMS = [["daily", "Every morning at 8"], ["weekly", "Every Friday"], ["ondemand", "When you message it"]] as const;
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
        <fieldset className="pv-field">
          <legend><span className="pv-n">1</span>Give it a job</legend>
          <div className="pv-chips pv-chips--wrap">
            {ROLES.map((x, n) => (
              <button key={x.key} type="button" aria-pressed={n === k} className="pv-chip" data-tone={x.tone} onClick={() => pickRole(n)}>
                <span className={`pv-chip__icon cw-tone--${x.tone}`}><x.icon width={14} height={14} /></span>{x.role}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset className="pv-field">
          <legend><span className="pv-n">2</span>Connect its apps <span className="pv-hint">up to 5 of 100+</span></legend>
          <div className="pv-apps">
            {APP_CHOICES.map((a) => (
              <button key={a} type="button" aria-pressed={apps.includes(a)} className="pv-app" onClick={() => toggle(a)} title={a}>
                <BrandMark name={a} size={20} colored /><span>{a}</span>
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset className="pv-field">
          <legend><span className="pv-n">3</span>Set its rhythm</legend>
          <div className="pv-seg">
            {RHYTHMS.map(([v, l]) => <button key={v} type="button" aria-pressed={rhythm === v} onClick={() => setRhythm(v)}>{l}</button>)}
          </div>
        </fieldset>
      </div>
      <div className={`pv-mate cw-surface--${r.tone}`}>
        <div className="pv-mate__card">
          <div className="pv-mate__head">
            <span className={`pv-mate__avatar cw-tone--${r.tone}`}><r.icon width={22} height={22} /></span>
            <span><b>{r.role}</b><span>Your Indus Cowork teammate</span></span>
          </div>
          <dl className="pv-mate__rows">
            <div><dt>Does</dt><dd>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={r.key} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={ease(reduced)}>{r.plan.slice(0, 3).join(" · ")}</motion.span>
              </AnimatePresence>
            </dd></div>
            <div><dt>Works in</dt><dd className="pv-mate__apps">
              {apps.length ? apps.map((a) => <span key={a} title={a}><BrandMark name={a} size={18} colored title={a} /></span>) : <span className="pv-hint">Pick at least one app</span>}
            </dd></div>
            <div><dt>Runs</dt><dd>{when}</dd></div>
            <div><dt>Ships</dt><dd>Only after your yes</dd></div>
          </dl>
          <a className="sr-button sr-button--primary pv-mate__cta" href={`https://www.sarvam.ai/contact?subject=${subject}`}>Talk to us about this teammate<ArrowRight width={16} height={16} strokeWidth={1.75} /></a>
        </div>
      </div>
    </div>
  );
}

/* ── Integrations: three rows of real, coloured app marks drifting in opposite directions behind one statement.
 *  Passive (no clicks). CSS transform loops, paused off-screen; static rows with reduced motion. ── */
const ROW_APPS = [
  ["Gmail", "Google Calendar", "Google Docs", "Google Drive", "Google Sheets", "Slack", "Notion", "Airtable"],
  ["Metabase", "PostHog", "BigQuery", "Snowflake", "Asana", "Calendly", "Dropbox", "Apify"],
  ["GitHub", "Linear", "Jira", "Sentry", "PagerDuty", "Vercel", "DataRobot", "Canva"],
];
export function IntegrationField() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0 });
  return (
    <div ref={ref} className="pv-int" data-run={inView}>
      <div className="pv-int__card">
        <p className="pv-int__num">100+</p>
        <p className="pv-int__label">connectors across productivity, data and engineering</p>
        <p className="pv-int__more">Bring your own connector for anything custom.</p>
      </div>
      <div className="pv-int__rows" aria-hidden>
        {ROW_APPS.map((row, r) => (
          <div key={r} className="pv-int__row" data-dir={r % 2 ? "rev" : "fwd"}>
            {[0, 1].map((copy) => (
              <div key={copy} className="pv-int__set">
                {row.map((a) => <span key={a} className="pv-int__tile" title={a}><BrandMark name={a} size={28} colored /></span>)}
              </div>
            ))}
          </div>
        ))}
      </div>
      <ul className="sr-visually-hidden">{ROW_APPS.flat().map((a) => <li key={a}>{a}</li>)}</ul>
    </div>
  );
}
