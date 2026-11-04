"use client";
// Document AI page: the live pieces. Fixed-size mini UIs; loops run only while visible and stop once the reader
// interacts; reduced motion shows the finished state. Rules: recipes/landing-page.md §0, recipe: recipes/document-ai-page.md.
import { useEffect, useState, type CSSProperties } from "react";
import { motion } from "motion/react";
import { Check, FileTextFill, SparkleFill } from "@/components/icons";
import { PAGE_ELEMENTS, PAINS, TABLE_ROWS, type El } from "./doc-data";
import { EASE, useLoop } from "./motion";

/* ── The sample page: paper, the real content, and (optionally) the layout boxes Document AI finds on it ── */
export function SamplePage({ shown = PAGE_ELEMENTS.length, active, scanning, className = "" }: { shown?: number; active?: string; scanning?: boolean; className?: string }) {
  // each block of content sits exactly in its element's box, so the layout boxes always line up with the text
  const at = (k: string) => { const b = PAGE_ELEMENTS.find((e) => e.key === k)!.box; return { left: `${b[0]}%`, top: `${b[1]}%`, width: `${b[2]}%`, height: `${b[3]}%` } as CSSProperties; };
  return (
    <div className={`da-page ${className}`} data-scan={scanning} lang="hi">
      <div className="da-page__seal" aria-hidden />
      <div className="da-blk da-page__h" style={at("h")}><p>भूमि अभिलेख प्रमाण पत्र</p><p className="da-page__sub">तहसील कार्यालय · पृष्ठ 3</p></div>
      <p className="da-blk da-page__p" style={at("p1")}>{PAGE_ELEMENTS[1].md}</p>
      <p className="da-blk da-page__p" style={at("p2")}>{PAGE_ELEMENTS[2].md}</p>
      <div className="da-blk" style={at("t")}>
        <table className="da-page__table">
          <thead><tr><th>खसरा सं.</th><th>क्षेत्रफल<sup>*</sup></th><th>खाताधारक</th></tr></thead>
          <tbody>{TABLE_ROWS.map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i}>{c}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <p className="da-blk da-page__hw" style={at("hw")}>सत्यापित <span>12.03.2024</span></p>
      <p className="da-blk da-page__foot" style={at("f")}>* क्षेत्रफल हेक्टेयर में</p>
      {/* the layout Document AI sees: one box per element, numbered in reading order */}
      {PAGE_ELEMENTS.map((e, i) => (
        <span key={e.key} className="da-box" data-tone={e.tone} data-on={i < shown} data-active={active === e.key} style={at(e.key)} aria-hidden>
          <i className="da-box__n">{i + 1}</i><b className="da-box__t">{e.type}</b>
        </span>
      ))}
      {scanning && <span className="da-scanline" aria-hidden />}
    </div>
  );
}

/* ── Hero: the workspace. Scan → each element found in reading order → structured output streams in → done ── */
export function DocStudio() {
  const N = PAGE_ELEMENTS.length;
  const [ref, phase] = useLoop([1500, ...PAGE_ELEMENTS.map(() => 650), 3000]);
  const shown = Math.min(N, phase);           // phase 0 = scanning, 1..N = elements found, N+1 = done
  const done = phase > N;
  const status = phase === 0 ? "Scanning" : done ? "Done" : "Parsing";
  return (
    <div ref={ref} className="da-studio">
      <p className="sr-visually-hidden">A Document AI workspace: a scanned Hindi land record page, with its heading, two columns, a table, a handwritten note and a footnote found in reading order and returned as Markdown.</p>
      <div className="da-studio__bar" aria-hidden>
        <span className="da-studio__file"><span className="da-studio__icon cw-tone--rose"><FileTextFill width={14} height={14} /></span>land-record-0412.pdf</span>
        <span className="da-chip">Page 3 of 48</span>
        <span className="da-status" data-state={done ? "done" : "run"}><i />{status}</span>
      </div>
      <div className="da-studio__body" aria-hidden>
        <div className="da-studio__src"><SamplePage shown={shown} scanning={phase === 0} /></div>
        <div className="da-studio__out">
          <div className="da-out__tabs"><span data-on="true">Markdown</span><span>JSON</span><span>DOCX</span></div>
          <ol className="da-out">
            {PAGE_ELEMENTS.map((e, i) => (
              <li key={e.key} data-on={i < shown} data-tone={e.tone}>
                <span className="da-out__n">{i + 1}</span>
                <span className="da-out__type">{e.type}</span>
                {e.key === "t"
                  ? <span className="da-out__md da-out__table" lang="hi">{["| खसरा सं. | क्षेत्रफल | खाताधारक |", ...TABLE_ROWS.map((r) => `| ${r.join(" | ")} |`)].map((l) => <code key={l}>{l}</code>)}</span>
                  : <code className="da-out__md" lang="hi">{e.md}</code>}
              </li>
            ))}
          </ol>
          <p className="da-out__foot" data-on={done}><Check width={12} height={12} strokeWidth={2.75} />Layout and reading order kept · 6 elements</p>
        </div>
      </div>
    </div>
  );
}

/* ── Where plain OCR falls short: the same page, plain OCR on the left, Document AI on the right ── */
const OCR: Record<string, { ocr: React.ReactNode; da: React.ReactNode; note: string }> = {
  layout: {
    note: "Two columns, read across instead of down",
    ocr: <p lang="hi">प्रमाणित किया जाता है कि नीचे दी गई यह प्रमाण पत्र केवल सूचना भूमि का विवरण राजस्व अभिलेख हेतु जारी किया गया है। के अनुसार है।</p>,
    da: <><p lang="hi"><b>1</b>प्रमाणित किया जाता है कि नीचे दी गई भूमि का विवरण राजस्व अभिलेख के अनुसार है।</p><p lang="hi"><b>2</b>यह प्रमाण पत्र केवल सूचना हेतु जारी किया गया है।</p></>,
  },
  script: {
    note: "Vowel signs dropped, words broken",
    ocr: <p lang="hi">प्रमणत कय जत ह क नच द गई भम क ववरण</p>,
    da: <p lang="hi">प्रमाणित किया जाता है कि नीचे दी गई भूमि का विवरण</p>,
  },
  table: {
    note: "Rows and columns flattened into one line",
    ocr: <p lang="hi">खसरा सं. क्षेत्रफल खाताधारक 214 0.42 रमेश कुमार 215 1.10 सुनीता देवी 219 0.75 अब्दुल रहीम</p>,
    da: <table className="da-mini-table" lang="hi"><thead><tr><th>खसरा सं.</th><th>क्षेत्रफल</th><th>खाताधारक</th></tr></thead><tbody>{TABLE_ROWS.map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i}>{c}</td>)}</tr>)}</tbody></table>,
  },
  fix: {
    note: "A misread cell, with nowhere to correct it",
    ocr: <p lang="hi">215 &nbsp;1.1O&nbsp; सुनीता देवी <span className="da-ocr__lock">read-only text</span></p>,
    da: <p lang="hi" className="da-fixed">215 &nbsp;<mark>1.10</mark>&nbsp; सुनीता देवी <span className="da-fixed__tag"><SparkleFill width={11} height={11} />Corrected · linked to page 3, table row 2</span></p>,
  },
};
export function OcrCompare() {
  const [sel, setSel] = useState(0);
  const [touched, setTouched] = useState(false);
  const [ref, phase] = useLoop(PAINS.map(() => 4200));
  useEffect(() => { if (!touched) setSel(phase); }, [phase, touched]);
  const p = PAINS[sel];
  const c = OCR[p.key];
  return (
    <div ref={ref} className="da-cmp">
      <div className="pv-seg da-cmp__tabs" role="group" aria-label="Where plain OCR falls short" style={{ gridTemplateColumns: `repeat(${PAINS.length}, minmax(0, 1fr))` }}>
        {PAINS.map((x, n) => (
          <button key={x.key} type="button" aria-pressed={n === sel} onClick={() => { setTouched(true); setSel(n); }}>
            {n === sel && <motion.span layoutId="da-cmp-pill" className="pv-seg__pill" transition={{ duration: 0.35, ease: EASE.outQuint }} />}
            <span className="pv-seg__label">{x.label}</span>
          </button>
        ))}
      </div>
      <div className="da-cmp__pair">
        <div className="da-cmp__side da-cmp__side--ocr" data-sibling="cmp">
          <p className="da-cmp__label"><span className="da-dot" />Plain OCR<span className="da-cmp__note">{c.note}</span></p>
          {/* every state shares one grid cell, so the box never changes size between tabs (rule 22) */}
          <div className="da-cmp__body da-cmp__stack">{PAINS.map((x) => <div key={x.key} className="da-cmp__state" data-on={x.key === p.key} aria-hidden={x.key !== p.key}>{OCR[x.key].ocr}</div>)}</div>
        </div>
        <div className="da-cmp__side da-cmp__side--da" data-tone={p.tone} data-sibling="cmp">
          <p className="da-cmp__label"><span className="da-dot da-dot--on" />Document AI<span className="da-cmp__note">Structure kept</span></p>
          <div className="da-cmp__body da-cmp__stack">{PAINS.map((x) => <div key={x.key} className="da-cmp__state" data-on={x.key === p.key} aria-hidden={x.key !== p.key}>{OCR[x.key].da}</div>)}</div>
        </div>
      </div>
    </div>
  );
}

/* ── Review: every element in the output is linked to where it sits on the page (visual grounding) ── */
export function Grounding() {
  const [sel, setSel] = useState(3);
  const [touched, setTouched] = useState(false);
  const [ref, phase] = useLoop(PAGE_ELEMENTS.map(() => 2400));
  useEffect(() => { if (!touched) setSel(phase); }, [phase, touched]);
  const e: El = PAGE_ELEMENTS[sel];
  return (
    <div ref={ref} className="da-ground">
      <div className="da-ground__list" role="group" aria-label="Output elements">
        <p className="da-ground__title">Output · 6 elements</p>
        {PAGE_ELEMENTS.map((x, n) => (
          <button key={x.key} type="button" className="da-el" data-tone={x.tone} aria-pressed={n === sel} onClick={() => { setTouched(true); setSel(n); }}>
            <span className="da-el__n">{n + 1}</span>
            <span className="da-el__text"><b>{x.type}</b><small lang="hi">{x.snippet}</small></span>
            {x.key === "t" && <span className="da-el__fix"><SparkleFill width={11} height={11} />1 fix</span>}
            {n === sel && <motion.span layoutId="da-el-ring" className="da-el__ring" transition={{ duration: 0.35, ease: EASE.outQuint }} />}
          </button>
        ))}
      </div>
      <div className="da-ground__page">
        <SamplePage shown={6} active={e.key} className="da-page--focus" />
        <p className="da-ground__where"><span className="da-dot da-dot--on" data-tone={e.tone} />{e.type} · page 3<span className="da-ground__coords"> · box {e.box.map((v) => Math.round(v)).join(", ")}</span></p>
      </div>
    </div>
  );
}

/* ── Translate: the whole document, layout kept. Four steps; the translated page fills in as the steps run ── */
const STEPS = [["Upload", "PDF, Word, Excel, PowerPoint or a web page"], ["Choose", "One or more target languages"], ["Review", "Side by side, page against source"], ["Export", "DOCX, PDF, HTML, EPUB or TXT"]];
export function TranslateFlow() {
  const [ref, phase] = useLoop([1600, 1600, 2200, 2600]);
  const filled = phase >= 2;
  return (
    <div ref={ref} className="da-tr">
      <div className="da-tr__pages">
        <article className="da-sheet" lang="en" data-sibling="sheet">
          <p className="da-sheet__tag"><span>Source</span><code>English</code></p>
          <p className="da-sheet__ch">Chapter 7</p>
          <h4 className="da-sheet__h">How plants make food</h4>
          <div className="da-sheet__fig" aria-hidden><span /></div>
          <p className="da-sheet__p">Photosynthesis is the process by which green plants make their own food.</p>
          <p className="da-sheet__cap">Fig. 7.1 · A leaf in sunlight</p>
        </article>
        <span className="da-tr__arrow" aria-hidden>→</span>
        <article className="da-sheet da-sheet--to" lang="hi" data-filled={filled} data-sibling="sheet">
          <p className="da-sheet__tag"><span>Translated</span><code>हिन्दी</code></p>
          <p className="da-sheet__ch">अध्याय 7</p>
          <h4 className="da-sheet__h">पौधे भोजन कैसे बनाते हैं</h4>
          <div className="da-sheet__fig" aria-hidden><span /></div>
          <p className="da-sheet__p">प्रकाश संश्लेषण वह प्रक्रिया है जिसके द्वारा हरे पौधे अपना भोजन स्वयं बनाते हैं।</p>
          <p className="da-sheet__cap">चित्र 7.1 · धूप में एक पत्ती</p>
        </article>
      </div>
      <ol className="da-tr__steps">
        {STEPS.map(([t, d], i) => (
          <li key={t} data-on={i === phase} data-done={i < phase}>
            <span className="da-tr__n">{i < phase ? <Check width={12} height={12} strokeWidth={2.75} /> : i + 1}</span>
            <span><b>{t}</b><small>{d}</small></span>
          </li>
        ))}
      </ol>
    </div>
  );
}
