// Indus Cowork landing page, v2: our own structure. Each section is something the reader DOES, not a copy of sarvam.ai's
// sections. Brand: tokens + src/components/sarvam. Copy: design-system/voice.md §5 (verified facts only).
// Playbook (rules learned building this page): design-system/recipes/landing-page.md.
import type { Metadata } from "next";
import { Globe, Lock, ShieldCheck, UserRound } from "@/components/icons";
import { Button, ButtonRow, CoworkDashboard, CtaCard, Faq, Footer, HeroGlow, Motif, SectionHeader } from "@/components/sarvam";
import { MegaNav } from "@/components/sarvam/mega-nav";
import { Reveal } from "@/components/sarvam/cowork";
import { ApprovalDesk, DayScrubber, IntegrationField, TeammateBuilder } from "@/components/sarvam/cowork-play";
import "./cowork.css";

export const metadata: Metadata = {
  title: "Indus Cowork · Hire an AI teammate that finishes the work · Sarvam",
  description: "Indus Cowork teammates plan the work, research on their own, act inside your apps and bring the result back for your approval. Built on Sarvam's sovereign stack.",
};

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

        {/* 2 · Assistant or teammate? (Product): the one idea to understand, side by side */}
        <section className="sr-container cw-section" aria-labelledby="vs-h">
          <Reveal><SectionHeader title={<span id="vs-h">An assistant answers. A teammate finishes.</span>} lead="The difference is who carries the work from the request to the result." /></Reveal>
          <Reveal className="pv-vs">
            <article className="pv-vs__col" data-sibling>
              <p className="pv-vs__label">A chat assistant</p>
              <ul>
                <li>Answers the question you asked</li>
                <li>Waits for your next prompt</li>
                <li>Leaves the doing to you</li>
              </ul>
            </article>
            <article className="pv-vs__col pv-vs__col--mate cw-surface--indigo" data-sibling>
              <p className="pv-vs__label">An Indus Cowork teammate</p>
              <ul>
                <li>Plans the work as a to-do list</li>
                <li>Researches and acts in your apps</li>
                <li>Brings the result back for your yes</li>
              </ul>
            </article>
          </Reveal>
        </section>

        {/* 3 · Integrations (Product): passive — real marks drifting behind one number */}
        <section id="integrations" className="sr-container cw-section" aria-labelledby="int-h">
          <Reveal><SectionHeader title={<span id="int-h">Works where your work already lives</span>} lead="Teammates act inside the tools your team already uses, from inboxes and docs to warehouses and trackers." /></Reveal>
          <Reveal><IntegrationField /></Reveal>
        </section>

        {/* 4 · Your yes (Product): the desk plays itself; the reader can step in */}
        <section id="control" className="sr-container cw-section" aria-labelledby="yes-h">
          <Reveal><SectionHeader variant="split" title={<span id="yes-h">Nothing ships without your yes</span>} lead="Teammates draft and prepare the work. Sending, merging and making changes wait for your approval, and every task leaves a trail." /></Reveal>
          <Reveal><ApprovalDesk /></Reveal>
        </section>

        {/* 5 · A day with your teammate (Product): scrub the clock */}
        <section id="day" className="sr-container cw-section" aria-labelledby="day-h">
          <Reveal><SectionHeader title={<span id="day-h">It works while you sleep</span>} lead="Set the schedule once and the work lands on its own, so your day starts with the output." /></Reveal>
          <Reveal><DayScrubber /></Reveal>
        </section>

        {/* 6 · Build a teammate: the main interaction, ends in Talk to Us */}
        <section id="build" className="sr-container cw-section" aria-labelledby="build-h">
          <Reveal><SectionHeader eyebrow="Try it" eyebrowTone="accent" title={<span id="build-h">Build your first teammate</span>} lead="Give it a job, connect the apps it works in and set its rhythm." /></Reveal>
          <Reveal><TeammateBuilder /></Reveal>
        </section>

        {/* 7 · Sovereign by default (Product): four facts, one quiet panel */}
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
        </section>

        {/* 8 · Customer voice (Community): Tata Capital's real quote about Sarvam, with their real logo and photo */}
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

        {/* 9 · FAQ (Product) */}
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

        {/* 10 · Closing CTA (Campaign moment) */}
        <section id="talk" className="sr-container cw-section cw-cta" aria-label="Talk to us">
          <Reveal><CtaCard title="Meet your first teammate." cta={<Button size="lg" href="https://www.sarvam.ai/contact">Talk to Us</Button>} /></Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
