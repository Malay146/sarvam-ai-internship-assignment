// Document AI landing page (Product expression). Its theme is paper and ink: a document workspace hero, plain OCR vs
// Document AI, three file folders, a proofreading desk, a type-specimen sheet, translated pages and library index
// cards. Hero light: seal ink (red-rose into paper cream). Shared system parts: MegaNav, HeroGlow + Motif, SectionHeader,
// OneFaq, CtaCard, SiteFooter, tokens, pv-seg. Facts: voice.md §5 (Document AI). Recipe: recipes/document-ai-page.md.
import type { Metadata } from "next";
import type { ComponentType } from "react";
import {
  ArrowRight, BookOpenFill, CodeFill, DocumentSearchFill, GraduationCapFill, LanguageFill, StampFill, StatementFill, TableFill,
} from "@/components/icons";
import { Button, ButtonRow, CtaCard, HeroGlow, Motif, SectionHeader } from "@/components/sarvam";
import { MegaNav } from "@/components/sarvam/mega-nav";
import { SiteFooter } from "@/components/sarvam/site-footer";
import { Reveal } from "@/components/sarvam/cowork";
import { OneFaq } from "@/components/sarvam/cowork-play";
import { DocStudio, Grounding, OcrCompare, TranslateFlow } from "@/components/sarvam/doc-play";
import { SCRIPTS, type Tone } from "@/components/sarvam/doc-data";
import "../cowork.css";
import "./document-ai.css";

export const metadata: Metadata = {
  title: "Document AI · Every page, read the way it was written · Sarvam",
  description: "Parse, extract, review and translate long, messy documents in English and 22 Indian languages, with layout and reading order intact.",
};

const TRY = "https://dashboard.sarvam.ai/";
const DOCS = "https://docs.sarvam.ai/";
type Ic = ComponentType<{ width?: number; height?: number }>;

/* A file folder: a coloured tab, the verb, one line, and the formats it hands back as file chips. */
function Folder({ tone, icon: I, verb, line, formats }: { tone: Tone; icon: Ic; verb: string; line: string; formats: string[] }) {
  return (
    <article className="da-folder" data-tone={tone} data-sibling="folders">
      <span className="da-folder__tab" aria-hidden />
      <div className="da-folder__body">
        <span className="da-icon" data-tone={tone} aria-hidden><I width={26} height={26} /></span>
        <h3 className="sr-h4" data-line="title">{verb}</h3>
        <p className="sr-body" data-line="desc">{line}</p>
        <ul className="da-files" aria-label={`${verb} outputs`}>
          {formats.map((f) => <li key={f}><span className="da-file__ear" aria-hidden />{f}</li>)}
        </ul>
      </div>
    </article>
  );
}

/* A library index card: punched hole, ruled lines, a coloured tab with the field, and what it holds. */
function IndexCard({ tone, icon: I, title, lines, n }: { tone: Tone; icon: Ic; title: string; lines: string; n: string }) {
  return (
    <article className="da-card" data-tone={tone} data-sibling="cards">
      <span className="da-card__tab">{n}</span>
      <span className="da-card__hole" aria-hidden />
      <span className="da-icon" data-tone={tone} aria-hidden><I width={24} height={24} /></span>
      <h3 className="da-card__title" data-line="title">{title}</h3>
      <p className="da-card__lines" data-line="desc">{lines}</p>
    </article>
  );
}

export default function DocumentAIPage() {
  return (
    <>
      <MegaNav cta="Try Document AI" ctaHref={TRY} login={false} />
      <main className="cw da sr-under-nav">
        <HeroGlow height={720} />
        {/* paint for the filled icons: each tone rises bottom → top, with a soft inner shadow, no tile */}
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
          <defs>
            {([["indigo", "#3333cc", "#8b93f0"], ["green", "#3f7d20", "#9ccf6e"], ["rose", "#c2185b", "#f2a0c0"], ["orange", "#e6651b", "#faac57"], ["neutral", "#3d3d3d", "#9a9a9a"]] as const).map(([k, a, b]) => (
              <linearGradient key={k} id={`da-grad-${k}`} x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor={a} /><stop offset="1" stopColor={b} /></linearGradient>
            ))}
            <filter id="da-icon-inset" x="-20%" y="-20%" width="140%" height="140%">
              <feOffset dy="-1.2" in="SourceAlpha" result="up" /><feComposite in="SourceAlpha" in2="up" operator="out" result="edge" />
              <feGaussianBlur in="edge" stdDeviation="0.8" result="eb" /><feFlood floodColor="#11115b" floodOpacity="0.35" />
              <feComposite in2="eb" operator="in" result="sh" /><feComposite in="sh" in2="SourceAlpha" operator="in" result="inset" />
              <feMerge><feMergeNode in="SourceGraphic" /><feMergeNode in="inset" /></feMerge>
            </filter>
          </defs>
        </svg>

        {/* 1 · Promise: centred kicker + H1 + lead + buttons, the document workspace below */}
        <section className="sr-container pv-hero" aria-labelledby="hero-h">
          <Reveal className="pv-hero__text">
            <Motif />
            <p className="cw-kicker">Document AI</p>
            <h1 id="hero-h" className="sr-display-product">Every page, read the way it was written</h1>
            <p className="sr-lead">Parse, extract, review and translate long, messy documents in English and 22 Indian languages, with layout and reading order intact.</p>
            <ButtonRow center>
              <Button size="lg" href={TRY}>Try Document AI</Button>
              <Button size="lg" variant="secondary" href="#review">See the review desk</Button>
            </ButtonRow>
          </Reveal>
          <Reveal delay={0.12} className="pv-hero__shot"><DocStudio /></Reveal>
        </section>

        {/* 2 · Why it's different: plain OCR vs Document AI, on the same page */}
        <section id="ocr" className="sr-container cw-section" aria-labelledby="ocr-h">
          <Reveal><SectionHeader variant="split" title={<span id="ocr-h">Where plain OCR falls short</span>} lead="Columns read across, vowel signs dropped, tables flattened, and no way to fix a misread. The same page, read twice." /></Reveal>
          <Reveal><OcrCompare /></Reveal>
        </section>

        {/* 3 · What it does: three folders, each with the formats it hands back */}
        <section id="outputs" className="sr-container cw-section" aria-labelledby="out-h">
          <Reveal><SectionHeader title={<span id="out-h">Parse it. Extract it. Translate it.</span>} lead="One document in, the output you need back: readable text, structured data or the whole document in another language." /></Reveal>
          <Reveal className="da-folders">
            <Folder tone="indigo" icon={DocumentSearchFill} verb="Parse" line="Text with its headings, tables and footnotes in reading order." formats={["HTML", "Markdown", "DOCX", "TXT"]} />
            <Folder tone="orange" icon={TableFill} verb="Extract" line="The fields and tables you need, as structured data." formats={["JSON", "CSV", "XLSX"]} />
            <Folder tone="green" icon={LanguageFill} verb="Translate" line="The whole document in another language, layout in place." formats={["DOCX", "PDF", "HTML", "EPUB", "TXT"]} />
          </Reveal>
        </section>

        {/* 4 · Control (hands-on): every output element linked to where it sits on the page */}
        <section id="review" className="sr-container cw-section" aria-labelledby="review-h">
          <Reveal><SectionHeader variant="split" title={<span id="review-h">Check every element against its source</span>} lead="Each heading, cell and note in the output is linked to its place on the page. Agents correct what they can, and you edit the rest." /></Reveal>
          <Reveal><Grounding /></Reveal>
        </section>

        {/* 5 · Where it works: a type-specimen sheet of the scripts */}
        <section id="languages" className="sr-container cw-section" aria-labelledby="lang-h">
          <Reveal><SectionHeader title={<span id="lang-h">English and 22 Indian languages</span>} lead="From Devanagari to Ol Chiki, including mixed-language pages, each read in its own script." /></Reveal>
          <Reveal>
            <div className="da-specimen">
              <p className="da-specimen__head"><span>Specimen</span><span>23 languages · by script</span></p>
              <ul className="da-specimen__grid">
                {SCRIPTS.map((s) => (
                  <li key={s.script} data-wide={s.langs.length > 2}>
                    <span className="da-specimen__glyph" lang={s.lang}>{s.glyph}</span>
                    <span className="da-specimen__script">{s.script}</span>
                    <ul className="da-specimen__langs">
                      {s.langs.map(([en, nat]) => <li key={en}><span lang={s.lang}>{nat}</span><small>{en}</small></li>)}
                    </ul>
                  </li>
                ))}
                <li className="da-specimen__mix">
                  <span className="da-specimen__glyph" lang="hi">हि + En</span>
                  <span className="da-specimen__script">Mixed pages</span>
                  <p>Pages that mix scripts, like a Hindi form with English entries, are read as one page.</p>
                </li>
              </ul>
            </div>
          </Reveal>
        </section>

        {/* 6 · Translate: the whole document, layout kept, in four steps */}
        <section id="translate" className="sr-container cw-section" aria-labelledby="tr-h">
          <Reveal><SectionHeader variant="split" title={<span id="tr-h">Translate the whole document, layout and all</span>} lead="Headings, paragraphs, figures and tables stay where they were. Review each page against its source before you export." /></Reveal>
          <Reveal><TranslateFlow /></Reveal>
          <Reveal className="da-limits">
            <span>Up to <b>500 pages</b></span><span>Up to <b>300 MB</b> per upload</span><span>Scanned pages are OCR&apos;d first</span><span>One editor per target language</span>
          </Reveal>
        </section>

        {/* 7 · Who it's for: library index cards */}
        <section id="uses" className="sr-container cw-section" aria-labelledby="uses-h">
          <Reveal><SectionHeader title={<span id="uses-h">Built for documents that matter</span>} lead="Records that have to be read exactly, at the scale of a department, a publisher or an archive." /></Reveal>
          <Reveal className="da-cards">
            <IndexCard n="A" tone="rose" icon={StampFill} title={"Government\nrecords"} lines="Land records and notices, read in the script they were filed in." />
            <IndexCard n="B" tone="indigo" icon={BookOpenFill} title={"Publishing and\narchives"} lines="Books and back catalogues, digitised and translated, layout intact." />
            <IndexCard n="C" tone="orange" icon={StatementFill} title={"Finance and\nlegal"} lines="Statements, contracts and filings, with every table kept a table." />
            <IndexCard n="D" tone="green" icon={GraduationCapFill} title={"Research and\neducation"} lines="Papers and textbooks, parsed and translated for every classroom." />
            <IndexCard n="E" tone="neutral" icon={CodeFill} title={"Developers\nand teams"} lines="Parse through the API and build documents into your own product." />
          </Reveal>
        </section>

        {/* 8 · Two ways in: API (batch) or Platform (review) */}
        <section id="access" className="sr-container cw-section" aria-labelledby="access-h">
          <Reveal><SectionHeader variant="split" title={<span id="access-h">Two ways in</span>} lead="Run documents in bulk through the API, or open them in the Platform to review and correct before you export." /></Reveal>
          <Reveal className="da-ways">
            <article className="da-way" data-tone="indigo" data-sibling="ways">
              <p className="da-way__kicker">API</p>
              <h3 className="sr-h4">Batch, with no manual step</h3>
              <ul>
                {["Send documents in bulk from your own pipeline", "Get HTML, Markdown, JSON and more back", "Built for developers and back offices"].map((x) => <li key={x}><span className="pv-vs__mark" aria-hidden />{x}</li>)}
              </ul>
              <a className="da-way__link" href={DOCS}>Try the API<ArrowRight width={16} height={16} aria-hidden /></a>
            </article>
            <article className="da-way" data-tone="rose" data-sibling="ways">
              <p className="da-way__kicker">Platform</p>
              <h3 className="sr-h4">Review before you export</h3>
              <ul>
                {["Side-by-side editor, page against source", "Guidelines and learned rules for your terms", "Free to sign up; talk to sales for volume"].map((x) => <li key={x}><span className="pv-vs__mark" aria-hidden />{x}</li>)}
              </ul>
              <a className="da-way__link" href={TRY}>Explore the Platform<ArrowRight width={16} height={16} aria-hidden /></a>
            </article>
          </Reveal>
        </section>

        {/* 9 · Questions: 8, one open at a time */}
        <section id="faq" className="sr-container cw-section cw-faq" aria-labelledby="faq-h">
          <Reveal><SectionHeader title={<span id="faq-h">Questions teams ask first</span>} /></Reveal>
          <Reveal className="cw-narrow">
            <OneFaq items={[
              { q: "What is Document AI?", a: "Sarvam's document processing. It parses, extracts, reviews and translates long, messy documents and returns structured output with layout and reading order intact." },
              { q: "Which languages does it read?", a: "English and 22 Indian languages, from Hindi and Bengali to Santali and Sindhi, including pages that mix languages." },
              { q: "What can I get back?", a: "Parse returns HTML, Markdown, DOCX or plain text. Extract returns JSON, CSV or XLSX. Translate returns DOCX, PDF, HTML, EPUB or TXT." },
              { q: "Does it handle scanned and handwritten pages?", a: "Yes. Scanned PDFs are OCR'd before translation, with progress tracked page by page, and handwritten notes are read as their own elements." },
              { q: "Does translation keep my formatting?", a: "Yes. Headings, paragraphs, images and layout stay in place, and you can review each page against the source before export." },
              { q: "How big can a document be?", a: "Up to 300 MB and 500 pages per upload, from a PDF, Word file, spreadsheet, presentation or web page." },
              { q: "Can I control terminology?", a: "Yes. Choose a genre, add guidelines and let Learned Rules keep your terms consistent. Bulk Translate re-runs the whole document with the latest rules." },
              { q: "What is the difference between the API and the Platform?", a: "The API processes documents in batches with no manual step. The Platform adds a visual editor to review and correct before you export." },
            ]} />
          </Reveal>
        </section>

        {/* 10 · Act: Sarvam's own line, on the saffron-rose gradient turned upside down (rose at the top for white type) */}
        <section id="start" className="sr-container cw-section cw-cta" aria-label="Get started">
          <Reveal><CtaCard title="Down to the last page." cta={<Button size="lg" href={TRY}>Try Document AI</Button>} /></Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
