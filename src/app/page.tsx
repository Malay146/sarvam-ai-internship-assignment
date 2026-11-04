// Indus Cowork landing page. Built only from the Sarvam system (tokens + src/components/sarvam).
// Recipe: design-system/recipes/landing-page.md. Copy: design-system/voice.md §5 (verified facts only).
// Feel: sarvam.ai's homepage rhythm (Sun hero, centred chapters, product stage, pillars, deployment, customer voice, night CTA),
// told for one product. Expression per section is named in each comment.
import type { Metadata } from "next";
import { BookOpen, CalendarClock, Check, Globe, Lock, Plug, Search, ShieldCheck, Sparkles, UserRound } from "@/components/icons";
import {
  Button, ButtonRow, CardGrid, Checklist, CoworkDashboard, CtaCard, Eyebrow, Faq, Footer, HeroGlow, MockPlan, MockResearch, MockReview,
  Motif, Nav, ScheduleDashboard, SectionHeader, Steps, TileCard, TrustBand,
} from "@/components/sarvam";
import { Marquee, Reveal, SkillCard, Stage } from "@/components/sarvam/cowork";
import { FLOWER_PRESETS, MEDALLION_PRESETS, flowerPath, glowSVG, medallionPath } from "@/lib/shapes";
import "./cowork.css";

export const metadata: Metadata = {
  title: "Indus Cowork · Hire an AI teammate that finishes the work · Sarvam",
  description: "Indus Cowork teammates plan the work, research on their own, act inside your apps and bring the result back for your approval. Built on Sarvam's sovereign stack.",
};

const NAV = ["Products", "Developers", "Resources", "Company"].map((label) => ({ label, href: "#" }));

/* Connectors named on sarvam.ai/indus-cowork [verified]. Shown as names with a monogram, never as third-party logos. */
const CONNECTORS: { group: string; tone: "indigo" | "orange" | "green"; apps: string[] }[] = [
  { group: "Productivity", tone: "indigo", apps: ["Gmail", "Google Calendar", "Google Docs", "Google Drive", "Google Sheets", "Slack", "Notion", "Airtable"] },
  { group: "Data", tone: "orange", apps: ["Metabase", "PostHog", "BigQuery", "Snowflake"] },
  { group: "Engineering", tone: "green", apps: ["GitHub", "Linear", "Jira", "Sentry"] },
];
const MORE_APPS = ["Asana", "Calendly", "Dropbox", "Canva", "Apify", "DataRobot", "PagerDuty", "Vercel"];
const ALL_APPS = [...CONNECTORS.flatMap((g) => g.apps.map((a) => ({ a, tone: g.tone }))), ...MORE_APPS.map((a) => ({ a, tone: "neutral" as const }))];

function App({ name, tone }: { name: string; tone: "indigo" | "orange" | "green" | "neutral" }) {
  return <span className={`cw-app cw-app--${tone}`}><span className="cw-app__mono" aria-hidden>{name.replace("Google ", "G").slice(0, 2)}</span>{name}</span>;
}

/* Roles + outcomes from sarvam.ai/indus-cowork [verified]; the request lines are illustrative UI text. */
const ROLES = [
  { key: "sales", role: "Sales Outbound", ask: "Work the new inbound list before EOD and draft outreach.", does: "Researches accounts, scores contacts on intent, drafts email and LinkedIn in your voice.", hands: "A review list for you to approve", tone: "indigo" },
  { key: "talent", role: "Talent Scout", ask: "Find five strong candidates for the backend role.", does: "Sources candidates, screens them against the role and drafts warm outreach.", hands: "A shortlist, ready to review", tone: "orange" },
  { key: "media", role: "Paid Media", ask: "Keep an eye on spend across this week's campaigns.", does: "Watches spend and cost per result, flags wasted budget and recommends the moves.", hands: "Recommendations, never changes without your yes", tone: "green" },
  { key: "product", role: "Product Performance", ask: "Write this week's funnel readout.", does: "Pulls the funnel, spots the drop-offs and writes the weekly readout.", hands: "The reason, not just the number", tone: "indigo" },
  { key: "cos", role: "Chief of Staff", ask: "Chase the owners on this week's blockers.", does: "Chases owners on blockers, prepares your reviews and records every decision.", hands: "A running record of decisions", tone: "orange" },
] as const;

function RolePanel({ r }: { r: (typeof ROLES)[number] }) {
  return (
    <div className="cw-role">
      <div className="cw-role__text">
        <h3 className="sr-h3">{r.role}</h3>
        <p className="sr-body">{r.does}</p>
        <p className="cw-role__hands"><Check width={18} strokeWidth={1.75} aria-hidden />{r.hands}</p>
      </div>
      <div className={`cw-thread sr-tint-${r.tone}`} aria-hidden>
        <div className="cw-thread__card">
          <div className="cw-msg cw-msg--you"><span className="cw-msg__who">You</span><p>{r.ask}</p></div>
          <div className="cw-msg cw-msg--mate"><span className="cw-msg__who">{r.role} · teammate</span><p>On it. I&apos;ll plan it as a to-do list and bring it back for your yes.</p></div>
          <div className="cw-thread__approve"><span>Ready for review</span><span className="cw-thread__btn">Approve</span></div>
        </div>
      </div>
    </div>
  );
}

function HowPanel({ title, body, checks, tone, visual }: { title: string; body: string; checks: string[]; tone: "indigo" | "orange" | "green"; visual: React.ReactNode }) {
  return (
    <div className="cw-how">
      <div className="cw-how__text">
        <h3 className="sr-h3">{title}</h3>
        <p className="sr-body">{body}</p>
        <Checklist tone={tone} items={checks} />
      </div>
      <div className={`cw-how__visual sr-tint-${tone}`}><div className="cw-how__mock">{visual}</div></div>
    </div>
  );
}

export default function IndusCoworkPage() {
  return (
    <>
      <Nav overlay links={NAV} cta="Talk to Us" ctaHref="#talk" />
      <main className="cw sr-under-nav">
        <HeroGlow height={720} />

        {/* 1 · Hero (Product, with the Sun from sarvam.ai's homepage) */}
        <section className="sr-container cw-hero" aria-labelledby="hero-h">
          <Reveal className="cw-hero__text">
            <Motif />
            <span className="cw-pill">Indus Cowork</span>
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
          <Marquee label="Connected apps">{ALL_APPS.map(({ a, tone }) => <App key={a} name={a} tone={tone} />)}</Marquee>
        </section>

        {/* 3 · How it works (Product): one stage, three moments of the work */}
        <section id="how" className="sr-container cw-section" aria-labelledby="how-h">
          <Reveal><SectionHeader eyebrow="How it works" eyebrowTone="accent" title={<span id="how-h">It runs the whole task, start to finish.</span>} lead="Every teammate plans, researches and checks its own work, so you hand off the outcome and not the steps." /></Reveal>
          <Reveal>
            <Stage label="How a teammate works" items={[
              { key: "plan", tab: "Plans the work", tabNote: "A to-do list first", panel: <HowPanel tone="indigo" title="Plans the work before it starts." body="It turns your request into a to-do list and works through it in order." checks={["Breaks the task into steps", "Orders the work itself", "Tracks progress as it goes"]} visual={<MockPlan />} /> },
              { key: "research", tab: "Researches", tabNote: "Web and your apps", panel: <HowPanel tone="orange" title="Researches on its own." body="Web search is built in, so it finds what it needs while it works." checks={["Searches the web as it works", "Pulls from your connected apps", "Re-plans when it learns more"]} visual={<MockResearch />} /> },
              { key: "review", tab: "Improves", tabNote: "Then asks for your yes", panel: <HowPanel tone="green" title="Improves until the work holds up." body="It reviews its own output and fixes weak spots before you see it." checks={["Reviews its own output", "Refines until it is right", "Returns it for your approval"]} visual={<MockReview />} /> },
            ]} />
          </Reveal>
        </section>

        {/* 4 · Building blocks (Product) */}
        <section className="sr-container cw-section" aria-labelledby="blocks-h">
          <Reveal><SectionHeader eyebrow="Building blocks" title={<span id="blocks-h">Everything a teammate is made of</span>} lead="Six parts you set up once. Every teammate on your workspace shares them." /></Reveal>
          <Reveal>
            <CardGrid name="building blocks" cards={[
              { icon: UserRound, eyebrow: "Teammates", title: "One per job", desc: "Point each teammate at a role and let it run the work end to end." },
              { icon: Sparkles, eyebrow: "Skills", title: "Teach it once", desc: "Write a way of working down once and every teammate can use it." },
              { icon: CalendarClock, eyebrow: "Scheduled tasks", title: "Runs on its own", desc: "Set a report up once and it lands on its own, every single morning." },
              { icon: BookOpen, eyebrow: "Knowledge base", title: "Never forgets", desc: "Store your context once and every chat and task can draw on it." },
              { icon: Search, eyebrow: "Built-in research", title: "Finds its answers", desc: "Web search is built in, so the plan stays current while it works." },
              { icon: Plug, eyebrow: "Connected apps", title: "100+ connectors", desc: "Teammates act inside the tools your team already runs every day." },
            ]} />
          </Reveal>
        </section>

        {/* 5 · Integrations (Product): the directory */}
        <section className="sr-container cw-section" aria-labelledby="int-h">
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
            <SkillCard name="weekly-revenue-readout" tags={["Skill", "Ops"]} foot="Drafted by the skill-creator" steps={[
              "Pull the week's numbers from the connected data source",
              "Compare against the prior week and the plan",
              "Explain the movement, not just the delta",
              "Draft the readout and park it for review",
            ]} />
          </Reveal>
        </section>

        {/* 7 · Runs while you sleep (Product): the working schedule */}
        <section className="sr-container cw-section" aria-labelledby="sched-h">
          <Reveal><SectionHeader eyebrow="Scheduled tasks" title={<span id="sched-h">Runs while you sleep</span>} lead="Set the schedule once and the work lands on its own, so your day starts with the output, not the to-do list." /></Reveal>
          <Reveal><ScheduleDashboard /></Reveal>
        </section>

        {/* 8 · Steps (Product) */}
        <section className="sr-container cw-section" aria-labelledby="steps-h">
          <Reveal><SectionHeader eyebrow="Day to day" title={<span id="steps-h">Message an agent like a teammate</span>} lead="Teammates live in Slack and Indus Chat. You talk to them the way you would a colleague." /></Reveal>
          <Reveal>
            <Steps steps={[
              { title: "Hand over the task", body: "Message a teammate in Slack or Indus Chat, the way you would a colleague." },
              { title: "It works on its own", body: "It searches the web and uses your apps to work out each next step by itself." },
              { title: "You approve the result", body: "It reviews its own output, then brings the finished work back for your yes." },
            ]} />
          </Reveal>
        </section>

        {/* 9 · Roles (Community-leaning Product): give each teammate a job */}
        <section className="sr-container cw-section" aria-labelledby="roles-h">
          <Reveal><SectionHeader eyebrow="Teammates" title={<span id="roles-h">Give each teammate a job</span>} lead="Point a teammate at a role and let it run. Every result comes back for your review before anything goes out." /></Reveal>
          <Reveal>
            <Stage label="Example teammates" interval={6000} rail="top" items={ROLES.map((r) => ({ key: r.key, tab: r.role, panel: <RolePanel r={r} /> }))} />
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
          <Reveal className="cw-security">
            <CardGrid name="security" columns={2} tone="neutral" cards={[
              { icon: Globe, eyebrow: "Data residency", title: "Stored in India", desc: "Data for Indian deployments is stored in India, under your controls." },
              { icon: ShieldCheck, eyebrow: "Certifications", title: "ISO and SOC 2", desc: "ISO 27001:2022 and SOC 2 Type I, with documents in the Trust Center." },
              { icon: UserRound, eyebrow: "Access controls", title: "SSO and roles", desc: "Role-based access and single sign-on, with audit logs to review it." },
              { icon: Lock, eyebrow: "Encryption", title: "At rest and in transit", desc: "Stored data and every connection between your services stay encrypted." },
            ]} />
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
        <section className="sr-container cw-section" aria-labelledby="quote-h">
          <Reveal><SectionHeader title={<span id="quote-h">What Sarvam&apos;s customers say</span>} /></Reveal>
          <Reveal>
            <figure className="cw-quote">
              <span className="cw-quote__org">Tata Capital</span>
              <blockquote className="cw-quote__text">“Our partnership with Sarvam has enabled us to scale highly personalized, product and segment-specific conversations across the customer lifecycle. By embedding multilingual interactions across our consumer loan products, we are reaching more customers with greater relevance, breaking access barriers, and deepening engagement in a cost-effective manner.”</blockquote>
              <figcaption className="cw-quote__who">
                <span className="cw-quote__avatar" aria-hidden>SK</span>
                <span><b>Shallu Kaushik</b><span className="sr-meta">Chief Digital Officer, Tata Capital</span></span>
              </figcaption>
            </figure>
          </Reveal>
        </section>

        {/* 13 · FAQ (Product) */}
        <section className="sr-container cw-section cw-faq" aria-labelledby="faq-h">
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

