// Indus Cowork landing page, v2: our own structure. Each section is something the reader DOES, not a copy of sarvam.ai's
// sections. Brand: tokens + src/components/sarvam. Copy: design-system/voice.md §5 (verified facts only).
// Playbook (rules learned building this page): design-system/recipes/landing-page.md.
import type { Metadata } from "next";
import {
  BookOpenFill, CalendarClockFill, Check, Globe, Message as MessageIcon, ListTodoFill, Lock, SearchFill, ShieldCheck, ShieldCheckFill, SparkleFill, UserFill, UserRound,
} from "@/components/icons";
import { Button, ButtonRow, Checklist, CoworkDashboard, CtaCard, Faq, Footer, HeroGlow, MockPlan, MockResearch, MockReview, Motif, SectionHeader, TileCard } from "@/components/sarvam";
import { FLOWER_PRESETS, MEDALLION_PRESETS, flowerPath, glowSVG, medallionPath } from "@/lib/shapes";
import { MegaNav } from "@/components/sarvam/mega-nav";
import { Reveal, Stage, StepVisual } from "@/components/sarvam/cowork";
import { ApprovalDesk, DayScrubber, IntegrationField, TeammateBuilder } from "@/components/sarvam/cowork-play";
import { ROLES } from "@/components/sarvam/cowork-data";
import "./cowork.css";

export const metadata: Metadata = {
  title: "Indus Cowork · Hire an AI teammate that finishes the work · Sarvam",
  description: "Indus Cowork teammates plan the work, research on their own, act inside your apps and bring the result back for your approval. Built on Sarvam's sovereign stack.",
};

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

        {/* 1 · Hero (Product): centred promise, the live Cowork dashboard below */}
        <section className="sr-container pv-hero" aria-labelledby="hero-h">
          <Reveal className="pv-hero__text">
            <Motif />
            <p className="cw-kicker">Indus Cowork</p>
            <h1 id="hero-h" className="sr-display-product">Hire an AI teammate that finishes the work</h1>
            <p className="sr-lead">Message it like a colleague. It plans the work, acts inside your apps and brings the result back for your yes.</p>
            <ButtonRow center>
              <Button size="lg" href="#talk">Talk to Us</Button>
              <Button size="lg" variant="secondary" href="#build">Build a teammate</Button>
            </ButtonRow>
          </Reveal>
          <Reveal delay={0.12} className="pv-hero__shot"><CoworkDashboard /></Reveal>
        </section>

        {/* 2 · How it works (Product): one stage, four moments of the work */}
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


        {/* 3 · Assistant or teammate? (Product): the one idea to understand, side by side */}
        <section className="sr-container cw-section" aria-labelledby="vs-h">
          <Reveal><SectionHeader title={<span id="vs-h">An assistant answers. A teammate finishes.</span>} lead="The difference is who carries the work from the request to the result." /></Reveal>
          <Reveal className="pv-vs">
            <article className="pv-vs__col" data-sibling>
              <p className="pv-vs__label"><span className="pv-vs__icon pv-vs__icon--muted"><MessageIcon width={18} height={18} strokeWidth={1.5} /></span>A chat assistant</p>
              <ul>
                {["Answers the question you asked", "Waits for your next prompt", "Leaves the doing to you"].map((x) => (
                  <li key={x}><span className="pv-vs__mark pv-vs__mark--muted" aria-hidden />{x}</li>
                ))}
              </ul>
            </article>
            <span className="pv-vs__vs" aria-hidden>vs</span>
            <article className="pv-vs__col pv-vs__col--mate" data-sibling>
              <p className="pv-vs__label"><span className="pv-vs__icon cw-tone--indigo"><UserFill width={18} height={18} /></span>An Indus Cowork teammate</p>
              <ul>
                {["Plans the work as a to-do list", "Researches and acts in your apps", "Brings the result back for your yes"].map((x) => (
                  <li key={x}><span className="pv-vs__mark" aria-hidden><Check width={12} height={12} strokeWidth={2.5} /></span>{x}</li>
                ))}
              </ul>
            </article>
          </Reveal>
        </section>

        {/* 4 · Building blocks (Product): five parts, one bento */}
        <section id="blocks" className="sr-container cw-section" aria-labelledby="blocks-h">
          <Reveal><SectionHeader variant="split" title={<span id="blocks-h">Everything a teammate is made of</span>} lead="Five parts you set up once. Every teammate on your workspace shares them." /></Reveal>
          <Reveal className="cw-bento" >
            <BentoTile area="mates" tone="indigo" icon={UserFill} eyebrow="Teammates" title="One teammate per job" desc="Point each one at a role and it runs the work from start to finish."
              visual={<div className="cw-bv-mates">{ROLES.map((r) => <span key={r.key} className="cw-bv-mate"><span className={`cw-bv-mate__icon cw-tone--${r.tone}`}><r.icon width={14} height={14} /></span>{r.role}</span>)}</div>} />
            <BentoTile area="skills" tone="orange" icon={SparkleFill} eyebrow="Skills" title="Teach it once" desc="Write a way of working down and every teammate can use it."
              visual={<div className="cw-bv-code"><div className="cw-bv-code__head"><code>weekly-revenue-readout</code><span>Shared</span></div><ol><li>Pull the week&apos;s numbers</li><li>Explain the movement</li><li>Park it for review</li></ol></div>} />
            <BentoTile area="sched" tone="green" icon={CalendarClockFill} eyebrow="Scheduled tasks" title="Runs on its own" desc="Set a report up once and it lands on its own every morning."
              visual={<ul className="cw-bv-times">{[["06:00", "Cluster check"], ["08:00", "Standup digest"], ["17:00", "Spend watch"]].map(([h, l]) => <li key={h}><code>{h}</code>{l}</li>)}</ul>} />
            <BentoTile area="kb" tone="rose" icon={BookOpenFill} eyebrow="Knowledge base" title="Never forgets" desc="Store your context once and every task can draw on it."
              visual={<div className="cw-bv-docs">{["Pricing playbook", "Brand voice", "Q3 targets"].map((d) => <span key={d}>{d}</span>)}</div>} />
            <BentoTile area="apps" tone="neutral" icon={SearchFill} eyebrow="Built-in research" title="Finds its answers" desc="Web search is built in, so the plan stays current as it works."
              visual={<div className="cw-bv-search"><span className="cw-bv-search__bar">Q3 inbound by city</span><span className="cw-bv-search__hit" /><span className="cw-bv-search__hit" /></div>} />
          </Reveal>
        </section>


        {/* 5 · Integrations (Product): passive — the number and a quiet grid of real marks */}
        <section id="integrations" className="sr-container cw-section" aria-labelledby="int-h">
          <Reveal><SectionHeader title={<span id="int-h">Works where your work already lives</span>} lead="Teammates act inside the tools your team already uses, from inboxes and docs to warehouses and trackers." /></Reveal>
          <Reveal><IntegrationField /></Reveal>
        </section>

        {/* 6 · Your yes (Product): the desk plays itself; the reader can step in */}
        <section id="control" className="sr-container cw-section" aria-labelledby="yes-h">
          <Reveal><SectionHeader variant="split" title={<span id="yes-h">Nothing ships without your yes</span>} lead="Teammates draft and prepare the work. Sending, merging and making changes wait for your approval, and every task leaves a trail." /></Reveal>
          <Reveal><ApprovalDesk /></Reveal>
        </section>

        {/* 7 · A day with your teammate (Product): scrub the clock */}
        <section id="day" className="sr-container cw-section" aria-labelledby="day-h">
          <Reveal><SectionHeader variant="split" title={<span id="day-h">It works while you sleep</span>} lead="Set the schedule once and the work lands on its own, so your day starts with the output." /></Reveal>
          <Reveal><DayScrubber /></Reveal>
        </section>

        {/* 8 · Build a teammate: the main interaction, ends in Talk to Us */}
        <section id="build" className="sr-container cw-section" aria-labelledby="build-h">
          <Reveal><SectionHeader eyebrow="Try it" eyebrowTone="accent" title={<span id="build-h">Build your first teammate</span>} lead="Give it a job, connect the apps it works in and set its rhythm." /></Reveal>
          <Reveal><TeammateBuilder /></Reveal>
        </section>

        {/* 9 · Sovereign by default (Product): four facts, one quiet panel */}
        <section id="trust" className="sr-container cw-section" aria-labelledby="trust-h">
          <Reveal><SectionHeader title={<span id="trust-h">Sovereign by default</span>} lead="Runs on Sarvam's own models and infrastructure, with data residency in India for Indian deployments." /></Reveal>
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
          {/* deployment options [verified: sarvam.ai homepage] */}
          <Reveal className="sr-tile-row" >
            <TileCard svg={glowSVG(medallionPath(MEDALLION_PRESETS["Ogee cross"]), "lavender", "dp1")} title="Sarvam Cloud" desc="Fully managed and scales on its own. Fastest to value." />
            <TileCard svg={glowSVG(flowerPath(FLOWER_PRESETS["Rosette"]), "rose", "dp2")} title="Private Cloud (VPC)" desc="Inside your own security perimeter, managed by Sarvam." />
            <TileCard svg={glowSVG(medallionPath(MEDALLION_PRESETS["Scalloped medallion"]), "leaf", "dp3")} title="On-Premises" desc="Full control and air-gapped, for regulated industries." />
          </Reveal>
        </section>

        {/* 10 · Customer voice (Community): Tata Capital's real quote about Sarvam, with their real logo and photo */}
        <section id="stories" className="sr-container cw-section" aria-labelledby="quote-h">
          <Reveal><SectionHeader title={<span id="quote-h">What Sarvam&apos;s customers say</span>} /></Reveal>
          <Reveal>
            <figure className="cw-quote">
              <div className="cw-quote__glow" aria-hidden />
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

        {/* 11 · FAQ (Product) */}
        <section id="faq" className="sr-container cw-section cw-faq" aria-labelledby="faq-h">
          <Reveal><SectionHeader title={<span id="faq-h">Questions teams ask first</span>} /></Reveal>
          <Reveal className="cw-narrow">
            <Faq items={[
              { q: "How can my team get access?", a: "Indus Cowork is not generally available yet. Talk to us about your team's workflows and access to the product." },
              { q: "Where do teammates live?", a: "In Slack or Indus Chat. You message them like any colleague, and they can also run scheduled tasks on their own." },
              { q: "Which apps can a teammate connect to?", a: "More than 100 connectors across productivity, data and engineering tools. You can also bring your own connector for anything custom." },
              { q: "Can I teach it how my team works?", a: "Yes. Write a skill once and every teammate can use it. A skill-creator skill can even draft new skills from a prompt." },
              { q: "Where does my data go?", a: "Your knowledge bases and task history stay within your workspace. Data for Indian deployments is stored in India and encrypted at rest and in transit." },
            ]} />
          </Reveal>
        </section>

        {/* 12 · Closing CTA (Campaign moment) */}
        <section id="talk" className="sr-container cw-section cw-cta" aria-label="Talk to us">
          <Reveal><CtaCard title="Meet your first teammate." cta={<Button size="lg" href="https://www.sarvam.ai/contact">Talk to Us</Button>} /></Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
