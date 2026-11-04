// Submission page: the take-home's six deliverables on one page, built with the system it presents.
// Shared parts: HeroGlow (homepage Sun), Motif, SectionHeader, Button, CtaCard, Reveal, tokens. A plain header and footer
// (not Sarvam's marketing nav/footer): this page is Malay's submission, so it names him and links the repo.
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { Button, ButtonRow, CtaCard, HeroGlow, Motif, SectionHeader } from "@/components/sarvam";
import { Reveal } from "@/components/sarvam/cowork";
import { SubmissionBar } from "@/components/sarvam/submission-bar";
import "../cowork.css";
import "./submission.css";

export const metadata: Metadata = {
  title: "Submission · Sarvam AI Design Engineer take-home · Malay Patel",
  description: "A design system built on Sarvam's brand, and the banners and responsive page generated from it.",
};

const LIVE = "https://sarvam-ai-internship-assignment-4of.vercel.app";
const REPO = "https://github.com/Malay146/sarvam-ai-internship-assignment";
const tree = (p: string) => `${REPO}/tree/main/deliverables/${p}`;
const blob = (p: string) => `${REPO}/blob/main/deliverables/${p}`;
const IMG = "/submission/";

function Ext({ href, children }: { href: string; children: ReactNode }) {
  return <a className="sb-link" href={href} target="_blank" rel="noreferrer">{children}<ArrowUpRight width={14} height={14} aria-hidden /></a>;
}

const DELIVERABLES: { n: string; title: string; line: string; links: [string, string][] }[] = [
  { n: "01", title: "Brand & design system", line: "Sarvam's brand as tokens, rules and recipes, written for AI.", links: [["SKILL.md", blob("1-design-system/SKILL.md")], ["Live review", `${LIVE}/system`]] },
  { n: "02", title: "3 Meta banners", line: "1080 × 1350, one message each, ready to post.", links: [["Folder", tree("2-meta-banners")], ["Below", "#banners"]] },
  { n: "03", title: "3 LinkedIn banners", line: "1200 × 627, the same subjects rearranged.", links: [["Folder", tree("3-linkedin-banners")], ["Below", "#banners"]] },
  { n: "04", title: "Responsive web page", line: "Indus Cowork, live, with 375 / 768 / 1440 exports.", links: [["Live page", `${LIVE}/`], ["Exports", tree("4-web-page")]] },
  { n: "05", title: "Source files", line: "A Next.js app that reads every value from the tokens.", links: [["Repository", REPO], ["Map", tree("5-source")]] },
  { n: "06", title: "Write-up", line: "Process, tools, key prompts and how it was tested.", links: [["writeup.md", blob("6-writeup/writeup.md")], ["Below", "#tested"]] },
];

const SYSTEM: [string, string, string][] = [
  ["SKILL.md", "Entry point: how to use it, the non-negotiables", "SKILL.md"],
  ["tokens", "Colour ramps, gradients, grain, spacing, radius, motion", "tokens.md"],
  ["typography", "Families, roles and a fluid type scale", "typography.md"],
  ["layout", "Breakpoints, grids, and how each section rearranges", "layout.md"],
  ["components", "Anatomy and behaviour per breakpoint", "components.md"],
  ["imagery", "Gateways, medallions, gradients, product UI", "imagery.md"],
  ["logo", "Wordmark and logomark rules, misuse", "logo.md"],
  ["voice", "Tone, copy budgets, verified fact sheets", "voice.md"],
  ["recipes", "Banners and landing pages, step by step", "recipes"],
];

const BANNERS: [string, string, string][] = [
  ["Sarvam Prism launch", "meta-1-sarvam-prism", "linkedin-1-sarvam-prism"],
  ["Every task leaves a trail", "meta-2-every-task-leaves-a-trail", "linkedin-2-every-task-leaves-a-trail"],
  ["Sarvam Edge × Qualcomm", "meta-3-sarvam-edge-qualcomm", "linkedin-3-sarvam-edge-qualcomm"],
];

export default function SubmissionPage() {
  return (
    <>
      <SubmissionBar>
        <div className="sr-container sb-bar__in">
          <a className="sb-bar__brand" href="#top" aria-label="Back to top">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/sarvam-wordmark-black.svg" alt="Sarvam" width={96} height={15} />
            <span className="sb-bar__sep" aria-hidden />
            <span className="sb-bar__who">Take-home · Malay Patel</span>
          </a>
          <nav className="sb-bar__nav" aria-label="Sections">
            <a href="#deliverables">Deliverables</a><a href="#system">System</a><a href="#banners">Banners</a><a href="#page">Page</a><a href="#tested">Testing</a>
          </nav>
          <a className="sr-button sr-button--primary sb-bar__cta" href={REPO} target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </SubmissionBar>

      <main id="top" className="cw sb sr-under-nav">
        <HeroGlow height={640} />

        {/* Hero */}
        <section className="sr-container pv-hero sb-hero" aria-labelledby="hero-h">
          <Reveal className="pv-hero__text">
            <Motif />
            <p className="cw-kicker">Design Engineer Internship · Take-home</p>
            <h1 id="hero-h" className="sr-display-product">One brand system, and everything it made</h1>
            <p className="sr-lead">I wrote Sarvam&apos;s existing brand down as a system an AI can follow, then used it to generate the banners and a responsive page, directing and refining every round.</p>
            <ButtonRow center>
              <Button size="lg" href={`${LIVE}/`}>Open the live page</Button>
              <Button size="lg" variant="secondary" href={REPO}>View the repository</Button>
            </ButtonRow>
          </Reveal>
        </section>

        {/* The six deliverables */}
        <section id="deliverables" className="sr-container cw-section" aria-labelledby="del-h">
          <Reveal><SectionHeader title={<span id="del-h">The six deliverables</span>} lead="Everything the brief asks for, numbered the same way. The repository mirrors it in deliverables/." /></Reveal>
          <Reveal>
            <ol className="sb-index">
              {DELIVERABLES.map((d) => (
                <li key={d.n} data-sibling="del">
                  <span className="sb-index__n">{d.n}</span>
                  <h3 className="sb-index__t" data-line="title">{d.title}</h3>
                  <p className="sb-index__l" data-line="desc">{d.line}</p>
                  <p className="sb-index__links">
                    {d.links.map(([label, href]) => href.startsWith("#")
                      ? <a key={label} className="sb-link" href={href}>{label}<ArrowRight width={14} height={14} aria-hidden /></a>
                      : <Ext key={label} href={href}>{label}</Ext>)}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>

        {/* 01 · The system */}
        <section id="system" className="sr-container cw-section" aria-labelledby="sys-h">
          <Reveal><SectionHeader variant="split" eyebrow="01 · The main deliverable" eyebrowTone="accent" title={<span id="sys-h">A design system written for AI</span>} lead="Every value is labelled verified, sampled or added. Each file opens with rules for AI: explicit tokens, do and don't lists and recipes, not adjectives." /></Reveal>
          <Reveal>
            <ul className="sb-files">
              {SYSTEM.map(([name, what, path]) => (
                <li key={name}>
                  <a href={path === "recipes" ? tree("1-design-system/recipes") : blob(`1-design-system/${path}`)} target="_blank" rel="noreferrer">
                    <code className="sb-files__name">{name}</code>
                    <span className="sb-files__what">{what}</span>
                    <ArrowUpRight className="sb-files__go" width={16} height={16} aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="sb-row-links">
            <Ext href={`${LIVE}/system`}>System overview</Ext><Ext href={`${LIVE}/system/tokens`}>Tokens, rendered live</Ext><Ext href={`${LIVE}/components`}>Components</Ext><Ext href={blob("1-design-system/design.md")}>Single-file design.md</Ext>
          </Reveal>
        </section>

        {/* 02–03 · Banners */}
        <section id="banners" className="sr-container cw-section" aria-labelledby="ban-h">
          <Reveal><SectionHeader eyebrow="02 – 03 · Banners" eyebrowTone="accent" title={<span id="ban-h">Three messages, two formats each</span>} lead="Each subject is rearranged for Meta and LinkedIn, never cropped or stretched. One device, two text slots, official logos only." /></Reveal>
          <div className="sb-banners">
            {BANNERS.map(([name, meta, li]) => (
              <Reveal key={name} className="sb-pair">
                <figure className="sb-pair__meta">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${IMG}${meta}.webp`} alt={`${name}, Meta 1080 × 1350`} width={720} height={900} loading="lazy" />
                  <figcaption>Meta · 1080 × 1350</figcaption>
                </figure>
                <figure className="sb-pair__li">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${IMG}${li}.webp`} alt={`${name}, LinkedIn 1200 × 627`} width={1200} height={627} loading="lazy" />
                  <figcaption><b>{name}</b><span>LinkedIn · 1200 × 627</span></figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <Reveal className="sb-row-links"><Ext href={tree("2-meta-banners")}>Meta PNGs</Ext><Ext href={tree("3-linkedin-banners")}>LinkedIn PNGs</Ext><Ext href={`${LIVE}/banners`}>Banner gallery</Ext></Reveal>
        </section>

        {/* 04 · The page */}
        <section id="page" className="sr-container cw-section" aria-labelledby="page-h">
          <Reveal><SectionHeader variant="split" eyebrow="04 · Responsive web page" eyebrowTone="accent" title={<span id="page-h">Indus Cowork, at every size</span>} lead="Sections rearrange rather than shrink: tab rails become grids, rows become cards, the dashboard gets its own phone layout. Checked at ten widths in Chromium and WebKit." /></Reveal>
          <Reveal>
            <a className="sb-shot sb-shot--desk" href={`${LIVE}/`} target="_blank" rel="noreferrer">
              <span className="sb-shot__chrome" aria-hidden><i /><i /><i /><span>sarvam-ai-internship-assignment-4of.vercel.app</span></span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${IMG}cowork-1440.webp`} alt="The Indus Cowork page at 1440 wide" width={1600} height={1000} loading="lazy" />
            </a>
          </Reveal>
          <Reveal className="sb-devices">
            <figure className="sb-shot sb-shot--tab">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${IMG}cowork-768.webp`} alt="The page at 768 wide" width={900} height={1200} loading="lazy" />
              <figcaption>Tablet · 768</figcaption>
            </figure>
            <figure className="sb-shot sb-shot--phone">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${IMG}cowork-375.webp`} alt="The page at 375 wide" width={500} height={1083} loading="lazy" />
              <figcaption>Phone · 375</figcaption>
            </figure>
            <div className="sb-devices__note">
              <p className="sb-devices__big">10<span> widths checked</span></p>
              <p>From 320 to 1920. No sideways scroll, equal sibling heights and line counts, 44 px touch targets.</p>
              <p className="sb-index__links"><Ext href={`${LIVE}/`}>Live page</Ext><Ext href={tree("4-web-page")}>Full-page exports</Ext></p>
            </div>
          </Reveal>
        </section>

        {/* 05–06 · Testing + write-up */}
        <section id="tested" className="sr-container cw-section" aria-labelledby="test-h">
          <Reveal><SectionHeader eyebrow="05 – 06 · Source and write-up" eyebrowTone="accent" title={<span id="test-h">How the system was tested</span>} lead="Same prompt, fresh model, empty folder. Once without the system, once with it. No edits, no retries." /></Reveal>
          <Reveal className="sb-ba">
            {([["banner", "LinkedIn banner"], ["hero", "Landing-page hero"]] as const).map(([k, label]) => (
              <div key={k} className="sb-ba__row">
                <figure data-v="without">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${IMG}ba-${k}-without.webp`} alt={`${label} without the system`} loading="lazy" />
                  <figcaption><span className="sb-tag sb-tag--off">Without the system</span>{k === "banner" ? "Invented logo, made-up data, generic SaaS." : "Invented logo and numbers, a wrong CTA."}</figcaption>
                </figure>
                <figure data-v="with">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${IMG}ba-${k}-with.webp`} alt={`${label} with the system`} loading="lazy" />
                  <figcaption><span className="sb-tag sb-tag--on">With the system</span>{k === "banner" ? "Official wordmark, one gateway, a named gradient." : "Sarvam's nav, verified copy, the display serif."}</figcaption>
                </figure>
              </div>
            ))}
          </Reveal>
          <Reveal><SectionHeader variant="split" title="New subjects, same playbook" lead="Two more pages, each with its own structure and hero light, built from the system alone. What broke along the way became rules." /></Reveal>
          <Reveal className="sb-tests">
            {([["Bulbul V4 Flash", "Text to speech · studio, tracklist, chorus, multitrack, playground", "bulbul"], ["Document AI", "Paper and ink · workspace, read-twice, proofreading desk, specimen sheet", "document-ai"]] as const).map(([t, d, slug]) => (
              <a key={slug} className="sb-test" href={`${LIVE}/${slug}`} target="_blank" rel="noreferrer" data-sibling="tests">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${IMG}${slug}.webp`} alt={`${t} page`} loading="lazy" />
                <span className="sb-test__text"><b data-line="title">{t}</b><span data-line="desc">{d}</span></span>
                <ArrowUpRight className="sb-test__go" width={18} height={18} aria-hidden />
              </a>
            ))}
          </Reveal>
          <Reveal className="sb-row-links">
            <Ext href={blob("6-writeup/writeup.md")}>Read the write-up</Ext><Ext href={tree("6-writeup/before-after")}>Before / after evidence</Ext><Ext href={`${REPO}/blob/main/process/prompt-log.md`}>Full prompt log</Ext><Ext href={tree("5-source")}>Source map</Ext>
          </Reveal>
        </section>

        {/* Process */}
        <section className="sr-container cw-section" aria-labelledby="proc-h">
          <Reveal><SectionHeader title={<span id="proc-h">How it was made</span>} /></Reveal>
          <Reveal>
            <ol className="sb-steps">
              {[["Capture", "Read sarvam.ai, its brand pages and CSS. Every value labelled verified, sampled or added."], ["Generate", "Banners and pages generated by AI from the system's recipes, never drawn by hand."], ["Direct", "Review at every size, name what's wrong, fix it, and write the fix back as a rule."]].map(([t, d], i) => (
                <li key={t} data-sibling="steps"><span className="sb-steps__n">{i + 1}</span><b data-line="title">{t}</b><span data-line="desc">{d}</span></li>
              ))}
            </ol>
          </Reveal>
          <Reveal><p className="sb-tools">Claude Code (Claude Opus) · Playwright · Next.js · Vercel · Nucleo icons · Gambetta, General Sans, DM Mono</p></Reveal>
        </section>

        <section className="sr-container cw-section cw-cta" aria-label="Thank you">
          <Reveal><CtaCard title="Thank you for reviewing." cta={<Button size="lg" href={REPO}>View the repository</Button>} /></Reveal>
        </section>
      </main>

      <footer className="sb-foot">
        <div className="sr-container sb-foot__in">
          <span>Malay Patel · Sarvam AI Design Engineer Internship take-home · November 2026</span>
          <span className="sb-foot__links"><a href={REPO}>GitHub</a><a href={`${LIVE}/`}>Live page</a></span>
        </div>
        <p className="sr-container sb-foot__note">A take-home exercise. Sarvam&apos;s name, wordmark and product facts belong to Sarvam AI and are used to demonstrate the system.</p>
      </footer>
    </>
  );
}
