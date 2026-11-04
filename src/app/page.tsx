// Indus Cowork landing page. Built only from the Sarvam system (tokens + src/components/sarvam).
// Recipe: design-system/recipes/landing-page.md. Copy: design-system/voice.md §5 (verified facts only).
// Feel: sarvam.ai's homepage rhythm (Sun hero, centred chapters, product stage, pillars, deployment, customer voice, night CTA),
// told for one product. Expression per section is named in each comment.
import type { Metadata } from "next";
import {
  BookOpenFill, BriefcaseFill, ListTodoFill, ShieldCheckFill, CalendarClockFill, ChartFill, Check, Globe, Lock, MegaphoneFill, PlugFill, SearchFill, ShieldCheck, SparkleFill, TargetFill, UserFill, UserRound,
} from "@/components/icons";
import {
  Button, ButtonRow, Checklist, CoworkDashboard, CtaCard, Eyebrow, Faq, Footer, HeroGlow, MockPlan, MockResearch, MockReview,
  Motif, ScheduleDashboard, SectionHeader, TileCard, TrustBand,
} from "@/components/sarvam";
import { BrandMark, LogoLockup, hasMark } from "@/components/sarvam/brand";
import { BRAND_MARKS } from "@/components/sarvam/brand-marks";
import { MegaNav } from "@/components/sarvam/mega-nav";
import { Marquee, Reveal, SkillCreator, Stage, StepVisual } from "@/components/sarvam/cowork";
import { FLOWER_PRESETS, MEDALLION_PRESETS, flowerPath, glowSVG, medallionPath } from "@/lib/shapes";
import "./cowork.css";

export const metadata: Metadata = {
  title: "Indus Cowork · Hire an AI teammate that finishes the work · Sarvam",
  description: "Indus Cowork teammates plan the work, research on their own, act inside your apps and bring the result back for your approval. Built on Sarvam's sovereign stack.",
};


/* Connectors named on sarvam.ai/indus-cowork [verified]. Shown with their official mono mark (brand-marks.ts); name only when no official mark exists. */
const CONNECTORS: { group: string; tone: "indigo" | "orange" | "green"; apps: string[] }[] = [
  { group: "Productivity", tone: "indigo", apps: ["Gmail", "Google Calendar", "Google Docs", "Google Drive", "Google Sheets", "Slack", "Notion", "Airtable"] },
  { group: "Data", tone: "orange", apps: ["Metabase", "PostHog", "BigQuery", "Snowflake"] },
  { group: "Engineering", tone: "green", apps: ["GitHub", "Linear", "Jira", "Sentry"] },
];
const MORE_APPS = ["Asana", "Calendly", "Dropbox", "Canva", "Apify", "DataRobot", "PagerDuty", "Vercel"];
const ALL_APPS = [...CONNECTORS.flatMap((g) => g.apps.map((a) => ({ a, tone: g.tone }))), ...MORE_APPS.map((a) => ({ a, tone: "neutral" as const }))];

function App({ name }: { name: string; tone?: string }) {
  if (BRAND_MARKS[name]?.vh) return <span className="cw-app" title={name}><BrandMark name={name} size={18} colored title={name} /></span>;   // wordmark logos carry the name
  return <span className="cw-app">{hasMark(name) ? <BrandMark name={name} size={18} colored /> : <span className="cw-app__none" aria-hidden />}{name}</span>;
}

/* Roles + outcomes from sarvam.ai/indus-cowork [verified]; the request lines are illustrative UI text. */
const ROLES = [
  { key: "sales", icon: TargetFill, role: "Sales Outbound", ask: "Work the new inbound list before EOD and draft outreach.", does: "Researches accounts, scores contacts on intent, drafts email and LinkedIn in your voice.", hands: "A review list for you to approve", tone: "indigo" },
  { key: "talent", icon: UserFill, role: "Talent Scout", ask: "Find five strong candidates for the backend role.", does: "Sources candidates, screens them against the role and drafts warm outreach.", hands: "A shortlist, ready to review", tone: "rose" },
  { key: "media", icon: MegaphoneFill, role: "Paid Media", ask: "Keep an eye on spend across this week's campaigns.", does: "Watches spend and cost per result, flags wasted budget and recommends the moves.", hands: "Recommendations, never changes without your yes", tone: "green" },
  { key: "product", icon: ChartFill, role: "Product Performance", ask: "Write this week's funnel readout.", does: "Pulls the funnel, spots the drop-offs and writes the weekly readout.", hands: "The reason, not just the number", tone: "orange" },
  { key: "cos", icon: BriefcaseFill, role: "Chief of Staff", ask: "Chase the owners on this week's blockers.", does: "Chases owners on blockers, prepares your reviews and records every decision.", hands: "A running record of decisions", tone: "indigo" },
] as const;

function RolePanel({ r }: { r: (typeof ROLES)[number] }) {
  return (
    <div className="cw-role">
      <div className="cw-role__text">
        <h3 className="sr-h3">{r.role}</h3>
        <p className="sr-body">{r.does}</p>
        <p className="cw-role__hands"><Check width={18} strokeWidth={1.75} aria-hidden />{r.hands}</p>
      </div>
      <div className={`cw-thread cw-surface--${r.tone}`} aria-hidden>
        <div className="cw-thread__card">
          <div className="cw-msg cw-msg--you"><span className="cw-msg__who">You</span><p>{r.ask}</p></div>
          <div className="cw-msg cw-msg--mate"><span className="cw-msg__who"><span className={`cw-msg__icon cw-tone--${r.tone}`}><r.icon width={12} height={12} /></span>{r.role} · teammate</span><p>On it. I&apos;ll plan it as a to-do list and bring it back for your yes.</p></div>
          <div className="cw-thread__approve"><span>Ready for review</span><span className="cw-thread__btn">Approve</span></div>
        </div>
      </div>
    </div>
  );
}

function BentoTile({ area, tone, icon: I, eyebrow, title, desc, visual }: {
  area: string; tone: "indigo" | "orange" | "green" | "rose" | "neutral"; icon: React.ComponentType<{ width?: number; height?: number }>;
  eyebrow: string; title: string; desc: string; visual: React.ReactNode;
}) {
  return (
    <article className="cw-tile" style={{ gridArea: area }} data-sibling>
      <div className={`cw-tile__visual cw-well--${tone}`} aria-hidden>{visual}</div>
      <div className="cw-tile__text">
        <p className="cw-tile__eyebrow"><span className={`cw-tile__icon cw-tone--${tone}`}><I width={14} height={14} /></span>{eyebrow}</p>
        <h3 className="sr-h4" data-line="title">{title}</h3>
        <p className="sr-body" data-line="desc">{desc}</p>
      </div>
    </article>
  );
}

function HowPanel({ title, body, checks, tone, visual }: { title: string; body: string; checks: string[]; tone: "indigo" | "orange" | "green" | "rose"; visual: React.ReactNode }) {
  return (
    <div className="cw-how">
      <div className="cw-how__text">
        <h3 className="sr-h3">{title}</h3>
        <p className="sr-body">{body}</p>
        <Checklist tone={tone === "rose" ? "orange" : tone} items={checks} />
      </div>
      <div className={`cw-how__visual cw-surface--${tone}`}><div className="cw-how__mock">{visual}</div></div>
    </div>
  );
}

export default function IndusCoworkPage() {
  return (
    <>
      <MegaNav cta="Talk to Us" ctaHref="#talk" login={false} />
      <main className="cw sr-under-nav">
        <HeroGlow height={720} />

        {/* 1 · Hero (Product, with the Sun from sarvam.ai's homepage) */}
        <section className="sr-container cw-hero" aria-labelledby="hero-h">
          <Reveal className="cw-hero__text">
            <Motif />
            <p className="cw-kicker">Indus Cowork</p>
            <h1 id="hero-h" className="sr-display-product">Hire an AI teammate that finishes the work</h1>
            <p className="sr-lead">Message it like a colleague. It plans the work, researches on its own, acts inside your apps and brings the result back for your yes.</p>
            <ButtonRow center>
              <Button size="lg" href="#talk">Talk to Us</Button>
              <Button size="lg" variant="secondary" href="#how">See how it works</Button>
            </ButtonRow>
          </Reveal>
          <Reveal delay={0.15} className="cw-hero__shot">
            <CoworkDashboard />
          </Reveal>
        </section>

        {/* 2 · Connector strip (Product): proof of reach, the way the homepage shows its customer marquee */}
        <section className="cw-strip" aria-labelledby="strip-h">
          <p id="strip-h" className="sr-eyebrow cw-strip__label">Works where your work already lives</p>
          <Marquee label="Connected apps">{ALL_APPS.filter(({ a }) => hasMark(a)).map(({ a }) => <LogoLockup key={a} name={a} />)}</Marquee>
        </section>

        {/* 3 · How it works (Product): one stage, three moments of the work */}
        <section id="how" className="sr-container cw-section" aria-labelledby="how-h">
          <Reveal><SectionHeader eyebrow="How it works" eyebrowTone="accent" title={<span id="how-h">It runs the whole task, start to finish.</span>} lead="Every teammate plans, researches and checks its own work, so you hand off the outcome and not the steps." /></Reveal>
          <Reveal>
            <Stage label="How a teammate works" interval={6500} items={[
              { key: "plan", tone: "indigo", icon: <span className="cw-tab-icon cw-tone--indigo"><ListTodoFill width={18} height={18} /></span>, tab: "Plans the work", tabNote: "A to-do list first", panel: <HowPanel tone="indigo" title="Plans the work before it starts." body="It turns your request into a to-do list and works through it in order." checks={["Breaks the task into steps", "Orders the work itself", "Tracks progress as it goes"]} visual={<MockPlan />} /> },
              { key: "research", tone: "orange", icon: <span className="cw-tab-icon cw-tone--orange"><SearchFill width={18} height={18} /></span>, tab: "Researches", tabNote: "Web and your apps", panel: <HowPanel tone="orange" title="Researches on its own." body="Web search is built in, so it finds what it needs while it works." checks={["Searches the web as it works", "Pulls from your connected apps", "Re-plans when it learns more"]} visual={<MockResearch />} /> },
              { key: "review", tone: "green", icon: <span className="cw-tab-icon cw-tone--green"><SparkleFill width={18} height={18} /></span>, tab: "Improves", tabNote: "Until it holds up", panel: <HowPanel tone="green" title="Improves until the work holds up." body="It reviews its own output and fixes weak spots before you see it." checks={["Reviews its own output", "Sources every claim", "Refines until it is right"]} visual={<MockReview />} /> },
              { key: "approve", tone: "rose", icon: <span className="cw-tab-icon cw-tone--rose"><ShieldCheckFill width={18} height={18} /></span>, tab: "Waits for your yes", tabNote: "Nothing ships without it", panel: <HowPanel tone="rose" title="Nothing ships without your yes." body="Sending, merging and making changes all wait for your approval." checks={["Drafts and prepares the work", "Asks before anything goes out", "Leaves a trail of every step"]} visual={<StepVisual kind="approvals" />} /> },
            ]} />
          </Reveal>
        </section>

        {/* 4 · Building blocks (Product): a bento of six tiles, each its own colour and its own small product moment */}
        <section id="blocks" className="sr-container cw-section" aria-labelledby="blocks-h">
          <Reveal><SectionHeader title={<span id="blocks-h">Everything a teammate is made of</span>} lead="Five parts you set up once. Every teammate on your workspace shares them." /></Reveal>
          <Reveal className="cw-bento" >
            <BentoTile area="mates" tone="indigo" icon={UserFill} eyebrow="Teammates" title="One teammate per job" desc="Point each one at a role and it runs the work from start to finish."
              visual={<div className="cw-bv-mates">{ROLES.map((r) => <span key={r.key} className="cw-bv-mate"><span className={`cw-bv-mate__icon cw-tone--${r.tone}`}><r.icon width={14} height={14} /></span>{r.role}</span>)}</div>} />
            <BentoTile area="skills" tone="orange" icon={SparkleFill} eyebrow="Skills" title="Teach it once" desc="Write a way of working down and every teammate can use it."
              visual={<div className="cw-bv-code"><div className="cw-bv-code__head"><code>weekly-revenue-readout</code><span>Shared</span></div><ol><li>Pull the week&apos;s numbers</li><li>Explain the movement</li><li>Park it for review</li></ol></div>} />
            <BentoTile area="sched" tone="green" icon={CalendarClockFill} eyebrow="Scheduled tasks" title="Runs on its own" desc="Set a report up once and it lands on its own every morning."
              visual={<ul className="cw-bv-times">{[["06:00", "Cluster check"], ["08:00", "Standup digest"], ["17:00", "Spend watch"]].map(([h, l]) => <li key={h}><code>{h}</code>{l}</li>)}</ul>} />
            <BentoTile area="kb" tone="rose" icon={BookOpenFill} eyebrow="Knowledge base" title="Never forgets" desc="Store your context once and every task can draw on it."
              visual={<div className="cw-bv-docs">{["Pricing playbook", "Brand voice", "Q3 targets"].map((d) => <span key={d}>{d}</span>)}</div>} />
            <BentoTile area="apps" tone="neutral" icon={PlugFill} eyebrow="Connected apps" title="100+ connectors" desc="Teammates act inside the tools your team already uses."
              visual={<div className="cw-bv-logos">{["Gmail", "Slack", "Notion", "GitHub", "Jira", "Snowflake", "Linear", "Google Drive"].map((a) => <span key={a} title={a}><BrandMark name={a} size={24} title={a} colored /></span>)}</div>} />
          </Reveal>
        </section>

        {/* 5 · Integrations (Product): the directory */}
        <section id="integrations" className="sr-container cw-section" aria-labelledby="int-h">
          <Reveal><SectionHeader variant="split" large eyebrow="Integrations" title={<span id="int-h">Plugs into the stack you already run on</span>} lead="Connect the tools your team already uses. With more than 100 connectors, your teammates work where your work already lives." aside={<p className="sr-small cw-muted">Need something custom? Bring your own connector.</p>} /></Reveal>
          <Reveal className="cw-directory">
            {CONNECTORS.map((g) => (
              <div key={g.group} className="cw-directory__row">
                <p className="sr-eyebrow cw-directory__group">{g.group}</p>
                <div className="cw-directory__apps">{g.apps.map((a) => <App key={a} name={a} tone={g.tone} />)}</div>
              </div>
            ))}
            <div className="cw-directory__row">
              <p className="sr-eyebrow cw-directory__group">And more</p>
              <div className="cw-directory__apps">{MORE_APPS.map((a) => <App key={a} name={a} tone="neutral" />)}</div>
            </div>
          </Reveal>
        </section>

        {/* 6 · Skills (Product): text + a skill card that writes itself in */}
        <section className="sr-container cw-section cw-split" aria-labelledby="skills-h">
          <Reveal className="cw-split__text">
            <Eyebrow tone="warm">Skills</Eyebrow>
            <h2 id="skills-h" className="sr-h2">Teach it once. Every teammate knows it.</h2>
            <p className="sr-lead">A skill is a repeatable way of doing something, written down. There is even a skill that writes new skills, so a prompt is enough to start one.</p>
            <ul className="cw-points">
              <li><b>Written by AI</b><span>Describe the outcome. The skill-creator drafts the steps.</span></li>
              <li><b>Shared across the team</b><span>Publish a skill once and any teammate can use it.</span></li>
              <li><b>Gets better with use</b><span>Edit it as the work changes; every teammate picks it up.</span></li>
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="cw-split__visual sr-tint-orange cw-panel">
            <SkillCreator />
          </Reveal>
        </section>

        {/* 7 · Runs while you sleep (Product): the working schedule */}
        <section className="sr-container cw-section" aria-labelledby="sched-h">
          <Reveal><SectionHeader title={<span id="sched-h">Runs while you sleep</span>} lead="Set the schedule once and the work lands on its own, so your day starts with the output, not the to-do list." /></Reveal>
          <Reveal><ScheduleDashboard /></Reveal>
        </section>

        {/* 8 · Day to day (Product): three cards, each showing its moment */}
        <section className="sr-container cw-section" aria-labelledby="steps-h">
          <Reveal><SectionHeader title={<span id="steps-h">Message an agent like a teammate</span>} lead="Teammates live in Slack and Indus Chat. You talk to them the way you would a colleague." /></Reveal>
          <Reveal className="cw-steps" >
            {[
              { kind: "message" as const, tone: "indigo", title: "Hand over the task", body: "Message a teammate in Slack or Indus Chat, the way you would a colleague." },
              { kind: "progress" as const, tone: "orange", title: "It works on its own", body: "It searches the web and uses your apps to work out each next step itself." },
              { kind: "approve" as const, tone: "green", title: "You approve the result", body: "It reviews its own output, then brings the finished work back for your yes." },
            ].map((s, n) => (
              <article key={s.kind} className="cw-step" data-sibling>
                <div className={`cw-step__visual cw-surface--${s.tone}`}><StepVisual kind={s.kind} /></div>
                <div className="cw-step__text">
                  <span className="cw-step__num">{String(n + 1).padStart(2, "0")}</span>
                  <h3 className="sr-h4" data-line="title">{s.title}</h3>
                  <p className="sr-body" data-line="body">{s.body}</p>
                </div>
              </article>
            ))}
          </Reveal>
        </section>

        {/* 9 · Roles (Community-leaning Product): give each teammate a job */}
        <section className="sr-container cw-section" aria-labelledby="roles-h">
          <Reveal><SectionHeader title={<span id="roles-h">Give each teammate a job</span>} lead="Point a teammate at a role and let it run. Every result comes back for your review before anything goes out." /></Reveal>
          <Reveal>
            <Stage label="Example teammates" interval={6000} rail="top" items={ROLES.map((r) => ({ key: r.key, tab: r.role, tone: r.tone, icon: <span className={`cw-tab-icon cw-tone--${r.tone}`}><r.icon width={16} height={16} /></span>, panel: <RolePanel r={r} /> }))} />
          </Reveal>
        </section>

        {/* 10 · Sovereign by default (Product, the trust band) + security details */}
        <section className="sr-container cw-section" aria-labelledby="trust-h">
          <Reveal>
            <TrustBand title="Sovereign by default" lead="Powerful teammates you can hand real work to, without handing over control." points={[
              { title: "Your data stays with you", body: "Knowledge and task history stay together in your own workspace." },
              { title: "Nothing ships without you", body: "Sending, merging and changes always wait for your approval first." },
              { title: "Every task leaves a trail", body: "Review what each teammate did, step by step, in a live record." },
              { title: "Built on Sarvam's stack", body: "Runs on Sarvam's own models, with data residency in India." },
            ]} />
          </Reveal>
          <Reveal>
            <ul className="cw-sec" data-siblings="security">
              {[
                { icon: Globe, title: "Data residency", desc: "Data for Indian deployments stays in India." },
                { icon: ShieldCheck, title: "Certifications", desc: "ISO 27001:2022 and SOC 2 Type I, on record." },
                { icon: UserRound, title: "Access controls", desc: "SSO, role-based access and full audit logs." },
                { icon: Lock, title: "Encryption", desc: "Your data is encrypted at rest and in transit." },
              ].map(({ icon: I, title, desc }) => (
                <li key={title} data-sibling><I width={20} height={20} strokeWidth={1.5} aria-hidden /><b data-line="title">{title}</b><span data-line="desc">{desc}</span></li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* 11 · Deployment (Product): from sarvam.ai's homepage */}
        <section className="sr-container cw-section" aria-labelledby="deploy-h">
          <Reveal><SectionHeader title={<span id="deploy-h">Built to run anywhere your business runs</span>} /></Reveal>
          <Reveal className="sr-tile-row" >
            <TileCard svg={glowSVG(medallionPath(MEDALLION_PRESETS["Ogee cross"]), "lavender", "cw-t1")} title="Sarvam Cloud" desc="Fully managed and scales on its own. Fastest to value." />
            <TileCard svg={glowSVG(flowerPath(FLOWER_PRESETS["Rosette"]), "rose", "cw-t2")} title="Private Cloud (VPC)" desc="Inside your own security perimeter, managed by Sarvam." />
            <TileCard svg={glowSVG(medallionPath(MEDALLION_PRESETS["Scalloped medallion"]), "leaf", "cw-t3")} title="On-Premises" desc="Full control and air-gapped, for regulated industries." />
          </Reveal>
        </section>

        {/* 12 · Customer voice (Community): a real quote from sarvam.ai, about Sarvam (not Indus Cowork) */}
        <section id="stories" className="sr-container cw-section" aria-labelledby="quote-h">
          <Reveal><SectionHeader title={<span id="quote-h">What Sarvam&apos;s customers say</span>} /></Reveal>
          <Reveal>
            <figure className="cw-quote">
              <div className="cw-quote__glow" aria-hidden />
              {/* Customer logo + photo exactly as published on sarvam.ai (served from Sarvam's CDN, not copied into this repo) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="cw-quote__logo" src="https://assets.sarvam.ai/assets/logos/investors/tata-capital.svg" alt="Tata Capital" width={145} height={27} />
              <blockquote className="cw-quote__text">“Our partnership with Sarvam has enabled us to scale highly personalized, product and segment-specific conversations across the customer lifecycle. By embedding multilingual interactions across our consumer loan products, we are reaching more customers with greater relevance, breaking access barriers, and deepening engagement in a cost-effective manner.”</blockquote>
              <figcaption className="cw-quote__who">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="cw-quote__avatar" src="https://assets.sarvam.ai/tr:w-112,q-80,f-auto/assets/products/voice-agents/logos/testimonial-profiel.png" alt="Shallu Kaushik" width={56} height={56} />
                <span><b>Shallu Kaushik</b><span className="sr-meta">Chief Digital Officer, Tata Capital</span></span>
              </figcaption>
            </figure>
          </Reveal>
        </section>

        {/* 13 · FAQ (Product) */}
        <section id="faq" className="sr-container cw-section cw-faq" aria-labelledby="faq-h">
          <Reveal><SectionHeader title={<span id="faq-h">Your questions, answered</span>} /></Reveal>
          <Reveal className="cw-narrow">
            <Faq items={[
              { q: "How can my team get access?", a: "Indus Cowork is not generally available yet. Talk to us about your team's workflows and access to the product." },
              { q: "How is Indus Cowork different from a chat assistant?", a: "A chat assistant answers a question. A Cowork teammate plans the work, researches and acts inside your connected apps. It reviews its output and brings the result back for your approval." },
              { q: "Which apps can a teammate connect to?", a: "There are more than 100 connectors to popular apps, covering productivity, data and engineering tools. You can also bring your own connector for anything custom." },
              { q: "Can I create my own skills?", a: "Yes. Create as many skills as you need. There is a skill-creator skill too, so you can use AI to build new skills for your own purpose." },
              { q: "How do I work with a teammate day to day?", a: "Teammates connect to Slack or Indus Chat. You message them like any colleague, and they can also run scheduled tasks on their own." },
              { q: "Do I stay in control of what a teammate does?", a: "Yes. Teammates come back for your approval, and every task shows a live progress trail of what was done." },
              { q: "Where does my data go?", a: "Your knowledge bases and task history stay within your workspace. Data for Indian deployments is stored in India and encrypted at rest and in transit." },
            ]} />
          </Reveal>
        </section>

        {/* 14 · Closing CTA (Campaign moment) */}
        <section id="talk" className="sr-container cw-section cw-cta" aria-label="Talk to us">
          <Reveal><CtaCard title="Meet your first teammate." cta={<Button size="lg" href="https://www.sarvam.ai/contact">Talk to Us</Button>} /></Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}

