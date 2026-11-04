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

/* A textbook figure: photosynthesis, drawn in the system's way (soft vertical gradients, hairline strokes, tone colours
   per idea: sunlight orange, water indigo, carbon dioxide neutral, oxygen green). Sky to paper behind, a plant with a
   veined leaf on a soil mound, a chloroplast callout. The same drawing on both pages; only the labels change. */
type FigLabels = { sun: string; co2: string; o2: string; water: string; chloro: string };
function PlantFigure({ l, id }: { l: FigLabels; id: string }) {
  const u = (k: string) => `${k}-${id}`;
  const veins = [-48, -26, -4, 18, 38];
  return (
    <svg className="da-fig" viewBox="0 0 360 176" role="img" aria-label={`${l.sun}, ${l.water}, ${l.co2}, ${l.o2}, ${l.chloro}`}>
      <defs>
        <linearGradient id={u("sky")} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e9effc" /><stop offset="0.55" stopColor="#f5f1ea" /><stop offset="1" stopColor="#fbf8f1" /></linearGradient>
        <radialGradient id={u("glow")}><stop offset="0" stopColor="#f9b24a" stopOpacity="0.55" /><stop offset="1" stopColor="#f9b24a" stopOpacity="0" /></radialGradient>
        <linearGradient id={u("sun")} x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#f2972f" /><stop offset="1" stopColor="#fbd77a" /></linearGradient>
        <linearGradient id={u("leaf")} x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#5f9f45" /><stop offset="0.6" stopColor="#8cc46c" /><stop offset="1" stopColor="#b9dd9c" /></linearGradient>
        <linearGradient id={u("soil")} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#d9c3a3" /><stop offset="1" stopColor="#c4a57f" /></linearGradient>
        <marker id={u("a")} viewBox="0 0 8 8" refX="6.5" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 8 4 0 8 2 4z" fill="context-stroke" /></marker>
      </defs>
      <rect width="360" height="176" rx="8" fill={`url(#${u("sky")})`} />

      {/* sun: a soft glow, a core rising bottom → top, short rays */}
      <circle cx="54" cy="42" r="40" fill={`url(#${u("glow")})`} />
      <g transform="translate(54 42)" stroke="#e8a23a" strokeWidth="1.4" strokeLinecap="round">
        {Array.from({ length: 12 }, (_, i) => <line key={i} x1="0" y1="-19" x2="0" y2={i % 2 ? "-23" : "-26"} transform={`rotate(${i * 30})`} />)}
      </g>
      <circle cx="54" cy="42" r="14" fill={`url(#${u("sun")})`} />

      {/* sunlight: three parallel dashed beams onto the leaf */}
      <g stroke="#e6651b" strokeWidth="1.2" strokeDasharray="3 4" fill="none" opacity="0.8">
        <path d="M72 52 L150 74" /><path d="M70 62 L148 86" markerEnd={`url(#${u("a")})`} /><path d="M66 72 L140 96" />
      </g>

      {/* soil mound with roots */}
      <ellipse cx="150" cy="176" rx="118" ry="20" fill={`url(#${u("soil")})`} />
      <g stroke="#9a7650" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.8">
        <path d="M150 158 q-6 8 -16 12" /><path d="M150 158 q4 9 14 13" /><path d="M150 160 v12" /><path d="M142 166 q-8 2 -12 8" />
      </g>

      {/* stem, a small leaf, and the main leaf with midrib, veins and a light highlight */}
      <path d="M150 158 Q140 134 126 112" stroke="#4f8a3a" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <g transform="translate(142 138) rotate(28)">
        <path d="M0 0C8 -10 26 -10 34 0C26 10 8 10 0 0Z" fill={`url(#${u("leaf")})`} stroke="#4f8a3a" strokeWidth="1.1" />
        <path d="M0 0H30" stroke="#4f8a3a" strokeWidth="0.8" />
      </g>
      <g transform="translate(190 84) rotate(-24)">
        <path d="M-70 0C-48 -40 18 -44 72 0C18 44 -48 40 -70 0Z" fill={`url(#${u("leaf")})`} stroke="#3f7d2e" strokeWidth="1.5" />
        <path d="M-62 -6C-40 -34 14 -38 62 -6C20 -24 -30 -22 -62 -6Z" fill="#ffffff" opacity="0.28" />
        <path d="M-70 0H66" stroke="#3f7d2e" strokeWidth="1.3" fill="none" />
        {veins.map((x) => <g key={x} stroke="#3f7d2e" strokeWidth="0.9" fill="none" opacity="0.85"><path d={`M${x} 0q9 -10 18 -22`} /><path d={`M${x} 0q9 10 18 22`} /></g>)}
      </g>

      {/* water: up through the roots and stem */}
      <g stroke="#3333cc" strokeWidth="1.2" fill="none">
        <path d="M70 154 Q110 160 138 146" markerEnd={`url(#${u("a")})`} />
      </g>
      <g fill="#3333cc" opacity="0.7"><path d="M84 146c0 0 -3 4 -3 6a3 3 0 0 0 6 0c0 -2 -3 -6 -3 -6z" /><path d="M98 150c0 0 -2.4 3.2 -2.4 4.8a2.4 2.4 0 0 0 4.8 0c0 -1.6 -2.4 -4.8 -2.4 -4.8z" /></g>

      {/* carbon dioxide in, oxygen out (with small bubbles) */}
      <path d="M338 36 Q292 38 252 58" stroke="#6b625b" strokeWidth="1.2" fill="none" markerEnd={`url(#${u("a")})`} />
      <path d="M236 100 Q284 94 334 104" stroke="#3f7d2e" strokeWidth="1.2" fill="none" markerEnd={`url(#${u("a")})`} />
      <g fill="none" stroke="#3f7d2e" strokeWidth="0.9" opacity="0.8"><circle cx="262" cy="88" r="2.6" /><circle cx="284" cy="84" r="2" /><circle cx="304" cy="90" r="2.8" /></g>

      {/* chloroplast callout: a magnified cell, linked to the leaf */}
      <path d="M214 104 L283 130" stroke="#6b625b" strokeWidth="0.8" strokeDasharray="2 3" fill="none" />
      <circle cx="300" cy="140" r="20" fill="#f4faef" stroke="#3f7d2e" strokeWidth="1.1" />
      <g fill="#8cc46c" stroke="#3f7d2e" strokeWidth="0.6">
        <ellipse cx="292" cy="134" rx="6" ry="3.4" transform="rotate(-20 292 134)" /><ellipse cx="306" cy="132" rx="5.4" ry="3" transform="rotate(15 306 132)" />
        <ellipse cx="297" cy="146" rx="6" ry="3.2" transform="rotate(10 297 146)" /><ellipse cx="310" cy="144" rx="4.6" ry="2.8" transform="rotate(-30 310 144)" />
      </g>

      {/* labels: a tone dot + text, in the page's text face */}
      <g className="da-fig__labels" fontSize="10.5" fill="#3b342f">
        <circle cx="92" cy="20" r="3" fill="#e6651b" /><text x="99" y="24">{l.sun}</text>
        <circle cx="30" cy="140" r="3" fill="#3333cc" /><text x="37" y="144">{l.water}</text>
        <circle cx="244" cy="20" r="3" fill="#6b625b" /><text x="251" y="24">{l.co2}</text>
        <circle cx="292" cy="72" r="3" fill="#3f7d2e" /><text x="299" y="76">{l.o2}</text>
        <text x="300" y="173" textAnchor="middle" fontSize="9.5" fill="#5f5750">{l.chloro}</text>
      </g>
    </svg>
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
          <figure className="da-sheet__fig"><PlantFigure id="en" l={{ sun: "Sunlight", water: "Water", co2: "Carbon dioxide", o2: "Oxygen", chloro: "Chloroplasts" }} /></figure>
          <p className="da-sheet__p">Photosynthesis is the process by which green plants make their own food.</p>
          <p className="da-sheet__cap">Fig. 7.1 · A leaf in sunlight</p>
        </article>
        <span className="da-tr__arrow" aria-hidden>→</span>
        <article className="da-sheet da-sheet--to" lang="hi" data-filled={filled} data-sibling="sheet">
          <p className="da-sheet__tag"><span>Translated</span><code>हिन्दी</code></p>
          <p className="da-sheet__ch">अध्याय 7</p>
          <h4 className="da-sheet__h">पौधे भोजन कैसे बनाते हैं</h4>
          <figure className="da-sheet__fig"><PlantFigure id="hi" l={{ sun: "सूर्य का प्रकाश", water: "जल", co2: "कार्बन डाइऑक्साइड", o2: "ऑक्सीजन", chloro: "हरितलवक" }} /></figure>
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
