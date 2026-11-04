"use client";
// Indus Cowork dashboards (components.md §4 · Dashboards).
// Calm, information-dense and fully working: select, run, approve, message, toggle, run now.
// Motion is limited to short fades on state change; fixed heights mean nothing on the page moves.
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowUp, BarChart3, BriefcaseBusiness, Check, CircleCheck, Clock, HeartPulse, Inbox, LoaderCircle, Megaphone, Play, Target, UserRound, X,
} from "@/components/icons";
import { T } from "./motion";
import "./dashboards.css";

const S = 1.5;
type Icon = typeof Target;
type Status = "working" | "waiting" | "done" | "scheduled";
const STATUS_LABEL: Record<Status, string> = { working: "Working", waiting: "Needs your yes", done: "Done", scheduled: "Scheduled" };
// Phone label: same meaning, fits beside the longest teammate name in one line.
const STATUS_SHORT: Record<Status, string> = { working: "Working", waiting: "Needs you", done: "Done", scheduled: "Scheduled" };

function StatusPill({ s }: { s: Status }) {
  return (
    <span className={`db-status db-status--${s}`}>
      <span className="db-status__dot" />
      <span className="db-status__full">{STATUS_LABEL[s]}</span>
      <span className="db-status__short" aria-hidden>{STATUS_SHORT[s]}</span>
    </span>
  );
}
const fade = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: T.state };

/* ════════════════════════ 1 · Teammates dashboard ════════════════════════ */
type Mate = {
  id: string; name: string; team: string; icon: Icon; task: string; status: Status; last: string; next: string;
  steps: string[]; summary: string; columns: [string, string, string]; rows: [string, string, string][]; approve?: string; approved?: string;
};
const MATES: Mate[] = [
  { id: "sales", name: "Sales Outbound", team: "Go-to-market", icon: Target, task: "Work the new inbound list before EOD and draft outreach.", status: "waiting", last: "09:14", next: "—",
    steps: ["Pulled the inbound list", "Researched each account", "Scored on fit and buying intent", "Drafted email and LinkedIn"],
    summary: "40 accounts researched and scored. Drafts parked for your review.", columns: ["Tier", "Accounts", "Action"],
    rows: [["High intent", "12", "Personalised email + LinkedIn"], ["Medium", "19", "Templated email"], ["Low fit", "9", "Held"]], approve: "Approve 31 drafts", approved: "31 drafts approved · sending from 10:00" },
  { id: "media", name: "Paid Media", team: "Marketing", icon: Megaphone, task: "Check this week's spend and flag anything wasted.", status: "waiting", last: "08:40", next: "Fri 17:00",
    steps: ["Pulled spend and cost per result", "Compared against targets", "Flagged wasted budget", "Recommended the moves"],
    summary: "3 campaigns reviewed, 2 changes recommended.", columns: ["Campaign", "Spend", "Recommendation"],
    rows: [["Search · brand", "₹1.2L", "Keep as is"], ["Display · retargeting", "₹84K", "Pause 2 ad sets"], ["Social · prospecting", "₹2.1L", "Move ₹40K to search"]], approve: "Approve 2 changes", approved: "2 changes approved · live in 15 min" },
  { id: "growth", name: "Product Performance", team: "Growth", icon: BarChart3, task: "Write the weekly funnel readout.", status: "done", last: "Mon 18:02", next: "Mon 18:00",
    steps: ["Pulled the funnel", "Spotted the drop-offs", "Found the reasons", "Posted the readout"],
    summary: "Readout posted to #growth.", columns: ["Stage", "Change", "Why"],
    rows: [["Sign-up", "+6%", "New landing page"], ["Activation", "−4%", "Slower onboarding email"], ["Retention", "Flat", "No change this week"]] },
  { id: "cos", name: "Chief of Staff", team: "Operations", icon: BriefcaseBusiness, task: "Prepare tomorrow's leadership review.", status: "scheduled", last: "Yesterday", next: "17:00",
    steps: ["Chase owners on blockers", "Collect updates", "Draft the agenda", "Log decisions"],
    summary: "Runs at 17:00 today.", columns: ["Item", "Owner", "Status"],
    rows: [["Pricing page", "Ananya", "Unblocked"], ["Q4 hiring plan", "Rohan", "Waiting on finance"], ["Partner launch", "Meera", "On track"]] },
  { id: "am", name: "Account Manager", team: "Customer success", icon: Inbox, task: "Clear the shared inbox and draft replies.", status: "done", last: "12:00", next: "Tomorrow 12:00",
    steps: ["Read 31 new emails", "Drafted 14 replies", "Flagged 2 for you", "Parked drafts"],
    summary: "14 replies drafted, 2 flagged for you.", columns: ["Group", "Emails", "Action"],
    rows: [["Renewals", "6", "Replies drafted"], ["Support follow-ups", "8", "Replies drafted"], ["Escalations", "2", "Flagged for you"]] },
  { id: "cluster", name: "Cluster Health Monitor", team: "Engineering", icon: HeartPulse, task: "Overnight cluster check.", status: "done", last: "06:00", next: "Tomorrow 06:00",
    steps: ["Checked node health", "Reviewed error rates", "Compared with last week", "Saved the report"],
    summary: "All clusters healthy. Report saved to the knowledge base.", columns: ["Cluster", "Status", "Note"],
    rows: [["prod-blr-1", "Healthy", "—"], ["prod-blr-2", "Healthy", "Disk at 71%"], ["staging", "Healthy", "—"]] },
];
type Msg = { id: number; from: "you" | "mate"; text: string; pending?: boolean };

export function CoworkDashboard() {
  const reduced = useReducedMotion();
  const [mates, setMates] = useState(MATES);
  const [sel, setSel] = useState(MATES[0].id);
  const [runStep, setRunStep] = useState<Record<string, number>>({});
  const [chats, setChats] = useState<Record<string, Msg[]>>({});
  const [draft, setDraft] = useState("");
  const msgId = useRef(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const mate = mates.find((m) => m.id === sel)!;
  const msgs = chats[sel] ?? [];


  // Run now: walk the steps (one per 700ms), then wait for approval or finish.
  const step = runStep[sel];
  useEffect(() => {
    if (step === undefined) return;
    if (step >= mate.steps.length) {
      setMates((ms) => ms.map((m) => (m.id === sel ? { ...m, status: m.approve ? "waiting" : "done", last: "now" } : m)));
      setRunStep((r) => { const n = { ...r }; delete n[sel]; return n; });
      return;
    }
    const id = setTimeout(() => setRunStep((r) => ({ ...r, [sel]: (r[sel] ?? 0) + 1 })), reduced ? 0 : 700);
    return () => clearTimeout(id);
  }, [step, sel, mate.steps.length, mate.approve, reduced]);

  const runNow = () => { setMates((ms) => ms.map((m) => (m.id === sel ? { ...m, status: "working" } : m))); setRunStep((r) => ({ ...r, [sel]: 0 })); };
  const approve = () => setMates((ms) => ms.map((m) => (m.id === sel ? { ...m, status: "done", summary: m.approved ?? m.summary } : m)));
  const send = (text: string) => {
    if (!text.trim()) return;
    const you: Msg = { id: ++msgId.current, from: "you", text: text.trim() };
    const reply: Msg = { id: ++msgId.current, from: "mate", text: "On it…", pending: true };
    setChats((c) => ({ ...c, [sel]: [...(c[sel] ?? []), you, reply] }));
    setTimeout(() => setChats((c) => ({ ...c, [sel]: (c[sel] ?? []).map((m) => (m.id === reply.id ? { ...m, pending: false, text: "Added to the plan. I'll bring it back for your approval before anything goes out." } : m)) })), reduced ? 0 : 1100);
  };
  useEffect(() => { const el = stageRef.current; if (el && msgs.length) el.scrollTo({ top: el.scrollHeight }); else if (el) el.scrollTo({ top: 0 }); }, [msgs.length, sel]);

  const stepState = (i: number) => {
    if (mate.status === "working") { const s = step ?? 0; return i < s ? "done" : i === s ? "active" : "pending"; }
    return mate.status === "scheduled" ? "pending" : "done";
  };

  const needs = mates.filter((m) => m.status === "waiting").length;
  return (
    <div className="db-frame sr-tint-indigo">
    <div className="db" data-dashboard="cowork">
      <div className="db-body">
        <aside className="db-side">
          <div className="db-side__head"><p className="db-label"><span className="db-side__your">Your </span>teammates</p><span className="db-side__count">{needs} need your yes</span></div>
          <div className="db-side__list" role="listbox" aria-label="Teammates">
            {mates.map((m) => (
              <button key={m.id} role="option" aria-selected={m.id === sel} className="db-mate" title={m.name} onClick={() => setSel(m.id)}>
                <span className="db-row__icon"><m.icon strokeWidth={S} /></span>
                <span className="db-mate__text"><b>{m.name}</b><small>{m.team}</small></span>
                <span className={`db-status__dot db-status__dot--${m.status}`} aria-label={STATUS_LABEL[m.status]} />
              </button>
            ))}
          </div>
        </aside>

        <section className="db-detail" aria-label={`${mate.name} details`}>
          <div className="db-detail__head">
            <div className="db-detail__who"><b>{mate.name}</b><StatusPill s={mate.status} /></div>
            <button className="db-run db-run--head" onClick={runNow} disabled={mate.status === "working"}><Play strokeWidth={S} /><span>Run now</span></button>
          </div>
          <div className="db-detail__stage" ref={stageRef}>
            <p className="db-detail__task">{mate.task}</p>
            <ol className="db-steps">
              {mate.steps.map((s, i) => {
                const st = stepState(i);
                return (
                  <li key={s} data-state={st}>
                    <span className="db-steps__icon">{st === "done" ? <CircleCheck strokeWidth={S} /> : st === "active" ? <span className="sr-spin"><LoaderCircle strokeWidth={S} /></span> : <span className="db-dot" />}</span>
                    <span>{s}</span>
                  </li>
                );
              })}
            </ol>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={`${sel}-${mate.status}`} className="db-result" {...fade}>
                <p className="db-summary">{mate.status === "working" ? "Working through the plan…" : mate.summary}</p>
                {mate.status !== "scheduled" && (
                  <div className="db-table" role="table" aria-label="Result">
                    <div className="db-table__row db-table__row--head" role="row">{mate.columns.map((c) => <span key={c} role="columnheader">{c}</span>)}</div>
                    {mate.rows.map((r) => (
                      <div key={r[0]} className={`db-table__row${mate.status === "working" ? " is-dim" : ""}`} role="row">{r.map((c, j) => <span key={j} role="cell" data-col={mate.columns[j]}>{c}</span>)}</div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
            {msgs.length > 0 && (
              <ul className="db-chat">
                {msgs.map((m) => (
                  <li key={m.id} className={`db-msg db-msg--${m.from}`}>
                    {m.from === "mate" && <span className="db-msg__who"><UserRound strokeWidth={S} /></span>}
                    <span className="db-msg__text">{m.pending ? <><span className="sr-spin"><LoaderCircle strokeWidth={S} /></span>{m.text}</> : m.text}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="db-detail__foot">
            <div className="db-approve">
              <span className="sr-meta">{mate.status === "waiting" ? "Nothing goes out without your yes." : mate.status === "working" ? "You'll be asked before anything ships." : mate.status === "scheduled" ? `Scheduled for ${mate.next}.` : "No action needed."}</span>
              <button className="sr-button sr-button--primary db-btn" onClick={approve} disabled={mate.status !== "waiting"}>{mate.approve ?? "Approve"}</button>
              <button className="db-run db-run--foot" onClick={runNow} disabled={mate.status === "working"} aria-label="Run now"><Play strokeWidth={S} /></button>
            </div>
            <form className="db-input" onSubmit={(e) => { e.preventDefault(); send(draft); setDraft(""); }}>
              <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={`Message ${mate.name}…`} aria-label={`Message ${mate.name}`} />
              <button type="submit" aria-label="Send" disabled={!draft.trim()}><ArrowUp strokeWidth={2} /></button>
            </form>
          </div>
        </section>
      </div>
    </div>
    </div>
  );
}

/* ════════════════════════ 2 · Schedule dashboard ════════════════════════ */
type Job = { id: string; time: string; mins: number; label: string; mate: string; result: string; status: Status; approval?: string; on: boolean };
const NOW_MIN = 13 * 60 + 20;                          // the dashboard shows "today, 13:20"
const JOBS: Job[] = [
  { id: "cluster", time: "06:00", mins: 360, label: "Overnight cluster check", mate: "Cluster Health Monitor", result: "Report saved to the knowledge base", status: "done", on: true },
  { id: "standup", time: "08:00", mins: 480, label: "Morning standup digest", mate: "Chief of Staff", result: "Digest posted to #leadership", status: "done", on: true },
  { id: "inbox", time: "12:00", mins: 720, label: "Inbox, cleared", mate: "Account Manager", result: "14 replies drafted, 2 flagged", status: "waiting", approval: "Send 14 drafted replies", on: true },
  { id: "spend", time: "17:00", mins: 1020, label: "Spend watch", mate: "Paid Media", result: "Wasted budget flagged", status: "scheduled", approval: "Pause 2 ad sets", on: true },
  { id: "readout", time: "18:00", mins: 1080, label: "Weekly readout", mate: "Product Performance", result: "Readout drafted for review", status: "scheduled", on: false },
];
type Log = { id: number; at: string; job: string; text: string };
const DAY_A = 5 * 60, DAY_B = 20 * 60;
const pct = (m: number) => ((m - DAY_A) / (DAY_B - DAY_A)) * 100;

export function ScheduleDashboard() {
  const reduced = useReducedMotion();
  const [jobs, setJobs] = useState(JOBS);
  const [log, setLog] = useState<Log[]>([
    { id: 2, at: "12:00", job: "Inbox, cleared", text: "14 replies drafted, 2 flagged" },
    { id: 1, at: "08:00", job: "Morning standup digest", text: "Digest posted to #leadership" },
    { id: 0, at: "06:00", job: "Overnight cluster check", text: "Report saved to the knowledge base" },
  ]);
  const [queue, setQueue] = useState<{ id: string; text: string; state: "waiting" | "approved" | "declined" }[]>([{ id: "inbox", text: "Send 14 drafted replies", state: "waiting" }]);
  const logId = useRef(3);
  const ranToday = jobs.filter((j) => j.status === "done" || j.status === "waiting").length;
  const waiting = queue.filter((q) => q.state === "waiting").length;

  const runNow = (job: Job) => {
    setJobs((js) => js.map((j) => (j.id === job.id ? { ...j, status: "working" } : j)));
    setTimeout(() => {
      setJobs((js) => js.map((j) => (j.id === job.id ? { ...j, status: job.approval ? "waiting" : "done" } : j)));
      setLog((l) => [{ id: ++logId.current, at: "13:20", job: job.label, text: job.result }, ...l].slice(0, 4));
      if (job.approval) setQueue((q) => (q.some((x) => x.id === job.id && x.state === "waiting") ? q : [{ id: job.id, text: job.approval!, state: "waiting" as const }, ...q].slice(0, 3)));
    }, reduced ? 0 : 1200);
  };
  const decide = (id: string, state: "approved" | "declined") => {
    setQueue((q) => q.map((x) => (x.id === id ? { ...x, state } : x)));
    setJobs((js) => js.map((j) => (j.id === id ? { ...j, status: "done" } : j)));
  };

  return (
    <div className="db-frame sr-tint-orange">
    <div className="db db--schedule" data-dashboard="schedule">
      <header className="db-top">
        <div><p className="db-label">Scheduled tasks · Today</p><p className="db-top__line">{ranToday} ran so far · next at 17:00</p></div>
        <span className="db-date"><Clock strokeWidth={S} />13:20</span>
      </header>

      <div className="db-day" aria-hidden>
        <div className="db-day__track" /><div className="db-day__fill" style={{ width: `${pct(NOW_MIN)}%` }} />
        {jobs.map((j) => <span key={j.id} className={`db-day__job${j.mins <= NOW_MIN ? " is-past" : ""}${j.on ? "" : " is-off"}`} style={{ left: `${pct(j.mins)}%` }}><i /><em>{j.time}</em></span>)}
        <span className="db-day__now" style={{ left: `${pct(NOW_MIN)}%` }} />
      </div>

      <div className="db-body db-body--schedule">
        <div className="db-list" role="table" aria-label="Scheduled tasks">
          {jobs.map((j) => {
            const last = log.find((l) => l.job === j.label);
            return (
              <div key={j.id} role="row" className={`db-row db-row--job${j.on ? "" : " is-off"}`}>
                <time role="cell">{j.time}</time>
                <span role="cell" className="db-row__who"><span><b>{j.label}</b><small>{last ? last.text : j.mate}</small></span></span>
                <span role="cell" className="db-row__status"><StatusPill s={j.on ? j.status : "scheduled"} /></span>
                <span role="cell" className="db-row__actions">
                  <button className="db-icon-btn db-icon-btn--ghost" onClick={() => runNow(j)} disabled={j.status === "working" || !j.on} aria-label={`Run ${j.label} now`}>{j.status === "working" ? <span className="sr-spin"><LoaderCircle strokeWidth={S} /></span> : <Play strokeWidth={S} />}</button>
                  <button role="switch" aria-checked={j.on} aria-label={`${j.label} ${j.on ? "on" : "off"}`} className="db-switch" onClick={() => setJobs((js) => js.map((x) => (x.id === j.id ? { ...x, on: !x.on } : x)))}><span /></button>
                </span>
              </div>
            );
          })}
        </div>

        <aside className="db-aside">
          <div className="db-panel">
            <p className="db-panel__title">Needs your yes <span className="db-side__count">{waiting}</span></p>
            <ul className="db-queue">
              {queue.length === 0 && <li className="db-empty">No approvals pending.</li>}
              {queue.map((q) => (
                <li key={q.id} data-state={q.state}>
                  <span>{q.text}</span>
                  <AnimatePresence mode="wait" initial={false}>
                    {q.state === "waiting" ? (
                      <motion.span key="w" className="db-queue__actions" {...fade}>
                        <button className="db-icon-btn" aria-label={`Decline: ${q.text}`} onClick={() => decide(q.id, "declined")}><X strokeWidth={2} /></button>
                        <button className="db-icon-btn db-icon-btn--yes" aria-label={`Approve: ${q.text}`} onClick={() => decide(q.id, "approved")}><Check strokeWidth={2} /></button>
                      </motion.span>
                    ) : <motion.span key="d" className="db-queue__state" {...fade}>{q.state === "approved" ? "Approved" : "Declined"}</motion.span>}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
            <ul className="db-log" aria-label="Activity">
              {log.slice(0, 1).map((l) => <li key={l.id}><time>{l.at}</time><span><b>{l.job}</b>{l.text}</span></li>)}
            </ul>
          </div>
        </aside>
      </div>
    </div>
    </div>
  );
}
