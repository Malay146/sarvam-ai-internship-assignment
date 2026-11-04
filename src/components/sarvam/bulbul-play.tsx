"use client";
// Bulbul V4 Flash page: the live pieces. Each is a fixed-size mini UI (nothing resizes), loops only while visible and
// stops for good once the reader interacts; reduced motion shows the finished state. Rules: recipes/landing-page.md §0.
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { BoltFill, Check, Copy, PlayCircleFill, VolumeFill } from "@/components/icons";
import { LANGS, VOICES } from "./bulbul-data";
import { VoiceAvatar, Wave, type WaveState } from "./bulbul-wave";
import { EASE, useLoop } from "./motion";
import { MedallionEcho } from "./patterns";

const STATE_LABEL: Record<string, string> = { idle: "Ready", stream: "Generating", play: "Playing", done: "Done" };

/* ── Hero: the studio. Generate → audio streams in → it plays, words lighting up as they are spoken. ── */
export function BulbulStudio() {
  const PLAY = 5600;
  const [ref, phase] = useLoop([1500, 1200, PLAY, 2600]);
  const state = (["idle", "stream", "play", "done"] as const)[phase];
  const v = VOICES[0];
  const words = v.line.split(" ");
  return (
    <div ref={ref} className="bb-studio" data-state={state}>
      <p className="sr-visually-hidden">A Bulbul V4 Flash studio: a Hindi and English line, spoken by the voice Ishita, with first audio in under 250 milliseconds.</p>
      <div className="bb-studio__bar" aria-hidden>
        <span className="bb-studio__title"><span className="bb-studio__mark cw-tone--orange"><VolumeFill width={14} height={14} /></span>Text to speech</span>
        <code className="bb-code-chip">bulbul:v4-flash</code>
        <span className="bb-status" data-state={state}><i />{STATE_LABEL[state]}</span>
      </div>
      <div className="bb-studio__body" aria-hidden>
        <div className="bb-studio__main">
          <p className="bb-label">Script</p>
          <p className="bb-words" lang="hi" style={{ "--word-ms": `${PLAY / words.length}ms` } as CSSProperties}>
            {words.map((w, i) => <span key={i} style={{ "--i": i } as CSSProperties}>{w} </span>)}
          </p>
          <div className="bb-player">
            <span className="bb-player__btn"><PlayCircleFill width={36} height={36} /></span>
            <Wave seed={v.seed} n={84} state={state} playMs={PLAY} streamMs={1000} />
          </div>
          <div className="bb-studio__meta">
            <span className="bb-first" data-on={phase >= 1}><BoltFill width={13} height={13} />First audio in under 250 ms</span>
            <span className="bb-studio__fmt">24 kHz · WAV</span>
          </div>
        </div>
        <div className="bb-studio__side">
          <div className="bb-field bb-field--voice"><span className="bb-label">Voice</span>
            <span className="bb-voice-row"><VoiceAvatar svg={v.avatar} size={36} /><span><b>{v.name}</b><small>{v.style} · {v.lang}</small></span></span>
          </div>
          <div className="bb-field"><span className="bb-label">Language</span><b>Hindi + English</b></div>
          <div className="bb-field"><span className="bb-label">Pace</span><span className="bb-track"><i style={{ "--v": 0.33 } as CSSProperties} /></span><b>1.0×</b></div>
          <div className="bb-field bb-field--half"><span className="bb-label">Sample rate</span><b>24 kHz</b></div>
          <div className="bb-field bb-field--half"><span className="bb-label">Format</span><b>WAV</b></div>
          <span className="bb-gen" data-press={state === "idle"}>Generate</span>
        </div>
      </div>
    </div>
  );
}

/* Playback for one selection: stream in, then play, then rest. Starts when visible; reduced motion = done. */
function usePlayback(key: number | string, playMs: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduced = useReducedMotion();
  const [st, setSt] = useState<WaveState>("idle");
  useEffect(() => {
    if (reduced) { setSt("done"); return; }
    if (!inView) return;
    setSt("stream");
    const a = setTimeout(() => setSt("play"), 900);
    const b = setTimeout(() => setSt("done"), 900 + playMs);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, [key, inView, reduced, playMs]);
  return [ref, st, inView, reduced] as const;
}

/* ── Voices: pick a voice, hear its line (the panel streams and plays it). Cycles until the reader picks one. ── */
export function VoicePicker() {
  const PLAY = 4200;
  const [sel, setSel] = useState(0);
  const [touched, setTouched] = useState(false);
  const [ref, st, inView, reduced] = usePlayback(sel, PLAY);
  useEffect(() => {
    if (touched || reduced || !inView || st !== "done") return;
    const t = setTimeout(() => setSel((s) => (s + 1) % VOICES.length), 1600);
    return () => clearTimeout(t);
  }, [st, touched, inView, reduced]);
  const v = VOICES[sel];
  return (
    <div ref={ref} className="bb-voices">
      <div className="bb-voices__list" role="group" aria-label="Voices">
        {VOICES.map((x, n) => (
          <button key={x.id} type="button" className="bb-vbtn" aria-pressed={n === sel} onClick={() => { setTouched(true); setSel(n); }}>
            <VoiceAvatar svg={x.avatar} size={40} />
            <span className="bb-vbtn__text"><b>{x.name}</b><small>{x.style} · {x.lang}</small></span>
            {n === sel && <motion.span layoutId="bb-vbtn-ring" className="bb-vbtn__ring" transition={{ duration: 0.35, ease: EASE.outQuint }} />}
          </button>
        ))}
      </div>
      <div className="bb-voices__stage" data-tone={v.tone} data-live={st === "stream" || st === "play"} aria-live="polite">
        {/* the voice's ripple: Sarvam's medallion repeated outward, like sound leaving a source */}
        <MedallionEcho className="bb-ripple" shape="Scalloped medallion" rings={6} step={0.42} fade={0.14} />
        <motion.div key={v.id} className="bb-vcard" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE.outQuint }}>
          <div className="bb-vcard__head">
            <VoiceAvatar svg={v.avatar} size={56} />
            <span><b className="bb-vcard__name">{v.name}</b><small>{v.style} · {v.lang}</small></span>
            <span className="bb-status" data-state={st}><i />{STATE_LABEL[st]}</span>
          </div>
          <p className="bb-vcard__line" lang={v.code.slice(0, 2)}>{v.line}</p>
          <Wave seed={v.seed} n={56} state={st} tone={v.tone} playMs={PLAY} />
          <div className="bb-vcard__foot"><code className="bb-code-chip">{v.id}</code><span>{v.code}</span></div>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Languages: a chorus. Eleven greetings in large type on the Dawn band; one at a time is "sung" (saffron + level). ── */
const LANG_ATTR: Record<string, string> = { "od-IN": "or" };
export function LangField() {
  const [ref, phase] = useLoop<HTMLUListElement>(LANGS.map(() => 1400));
  return (
    <ul ref={ref} className="bb-chorus__list">
      {LANGS.map((l, i) => (
        <li key={l.code} data-on={i === phase}>
          <span className="bb-chorus__hello" lang={LANG_ATTR[l.code] ?? l.code.slice(0, 2)}>{l.hello}</span>
          <span className="bb-chorus__name">{l.name}<code>{l.code}</code></span>
          <span className="bb-eq" aria-hidden><i /><i /><i /><i /></span>
        </li>
      ))}
    </ul>
  );
}

/* ── Experiences: a multitrack. Six lanes, one delivery each; a playhead sweeps all lanes while visible. ── */
export function Multitrack({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduced = useReducedMotion();
  return (
    <div ref={ref} className="bb-mix" data-run={inView && !reduced}>
      <div className="bb-mix__ruler" aria-hidden><span />{["0:00", "0:05", "0:10", "0:15"].map((t) => <span key={t}>{t}</span>)}</div>
      <div className="bb-mix__body">
        {children}
        <div className="bb-mix__headtrack" aria-hidden><i /></div>
      </div>
    </div>
  );
}

/* ── Developers: one request, start to finish. Delivery mode changes each run. ── */
const MODES = ["HTTP streaming", "WebSocket", "Single response"];
export function StreamDemo() {
  const [ref, phase] = useLoop([900, 1100, 2400, 2000]);
  const [mode, setMode] = useState(0);
  const reduced = useReducedMotion();
  const prev = useRef(phase);
  useEffect(() => {
    if (prev.current === 3 && phase === 0) setMode((m) => (m + 1) % MODES.length);
    prev.current = phase;
  }, [phase]);
  const single = MODES[mode] === "Single response";
  return (
    <div ref={ref} className="bb-stream" data-phase={reduced ? 3 : phase} aria-hidden>
      <div className="bb-stream__head"><b>One request</b><code className="bb-code-chip">POST /text-to-speech</code></div>
      <ol className="bb-stream__steps">
        <li data-on={phase >= 0}><span className="bb-stream__dot" /><span>Request sent</span><code>0 ms</code></li>
        <li data-on={phase >= 1}><span className="bb-stream__dot" /><span>First audio</span><span className="bb-ok"><BoltFill width={12} height={12} />Under 250 ms</span></li>
        <li data-on={phase >= 2}><span className="bb-stream__dot" /><span>{single ? "Full audio returned" : "Audio streams in"}</span><code>{single ? "one file" : "chunk by chunk"}</code></li>
        <li data-on={phase >= 3}><span className="bb-stream__dot" /><span>Ready to play</span><span className="bb-ok bb-ok--done"><Check width={12} height={12} strokeWidth={2.75} />Done</span></li>
      </ol>
      <div className="bb-chunks" data-single={single}>{Array.from({ length: 10 }, (_, i) => <i key={i} style={{ "--i": i } as CSSProperties} />)}</div>
      <div className="bb-stream__modes">
        {MODES.map((m, i) => <span key={m} data-on={i === mode}>{m}</span>)}
      </div>
    </div>
  );
}

/* ── Try it: real controls, a live request. Every change shows up in the code in the same frame. ── */
type Seg = { t: string; k?: "key" | "str" | "num" | "com" | "kw"; live?: boolean };
const RATES = [8000, 24000, 48000];
const CODECS = ["wav", "mp3", "flac", "aac"];
const TABS = ["cURL", "Python", "JavaScript"] as const;

function Segmented<T extends string | number>({ label, options, value, onChange, render, id, hideLabel }: { label: string; options: T[]; value: T; onChange: (v: T) => void; render: (v: T) => string; id: string; hideLabel?: boolean }) {
  return (
    <div className="bb-ctl" role="group" aria-labelledby={`${id}-l`}>
      <p className={hideLabel ? "sr-visually-hidden" : "bb-ctl__label"} id={`${id}-l`}>{label}</p>
      <div className="pv-seg" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
        {options.map((o) => (
          <button key={String(o)} type="button" aria-pressed={o === value} onClick={() => onChange(o)}>
            {o === value && <motion.span layoutId={`${id}-pill`} className="pv-seg__pill" transition={{ duration: 0.35, ease: EASE.outQuint }} />}
            <span className="pv-seg__label">{render(o)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function Playground() {
  const [vi, setVi] = useState(0);
  const [pace, setPace] = useState(1);
  const [rate, setRate] = useState(24000);
  const [codec, setCodec] = useState("wav");
  const [tab, setTab] = useState<(typeof TABS)[number]>("cURL");
  const [copied, setCopied] = useState(false);
  const v = VOICES[vi];
  const p = pace.toFixed(1);

  const fields: [string, Seg][] = [
    ["text", { t: `"${v.line}"`, k: "str", live: true }],
    ["language_code", { t: `"${v.code}"`, k: "str", live: true }],
    ["model", { t: `"bulbul:v4-flash"`, k: "str" }],
    ["speaker", { t: `"${v.id}"`, k: "str", live: true }],
    ["pace", { t: p, k: "num", live: true }],
    ["speech_sample_rate", { t: String(rate), k: "num", live: true }],
    ["output_audio_codec", { t: `"${codec}"`, k: "str", live: true }],
  ];
  const body = (indent: string, keyQuote: boolean, sep: string): Seg[][] =>
    fields.map(([k, val], i) => [{ t: indent }, { t: keyQuote ? `"${k}"` : k, k: "key" }, { t: sep }, val, { t: i < fields.length - 1 || !keyQuote ? "," : "" }]);
  const lines: Seg[][] =
    tab === "cURL" ? [
      [{ t: "curl", k: "kw" }, { t: " -X POST https://api.sarvam.ai/text-to-speech \\" }],
      [{ t: "  -H " }, { t: `"api-subscription-key: $SARVAM_API_KEY"`, k: "str" }, { t: " \\" }],
      [{ t: "  -H " }, { t: `"Content-Type: application/json"`, k: "str" }, { t: " \\" }],
      [{ t: "  -d '{" }],
      ...body("    ", true, ": "),
      [{ t: "  }'" }],
    ] : tab === "Python" ? [
      [{ t: "import", k: "kw" }, { t: " requests" }],
      [],
      [{ t: "response = requests.post(" }],
      [{ t: "    " }, { t: `"https://api.sarvam.ai/text-to-speech"`, k: "str" }, { t: "," }],
      [{ t: "    headers={" }, { t: `"api-subscription-key"`, k: "str" }, { t: ": SARVAM_API_KEY}," }],
      [{ t: "    json={" }],
      ...body("        ", true, ": "),
      [{ t: "    }," }],
      [{ t: ")" }],
      [{ t: "audio = response.json()[" }, { t: `"audios"`, k: "str" }, { t: "][0]  " }, { t: "# base64", k: "com" }],
    ] : [
      [{ t: "import", k: "kw" }, { t: " { SarvamAIClient } " }, { t: "from", k: "kw" }, { t: " " }, { t: `"sarvamai"`, k: "str" }, { t: ";" }],
      [],
      [{ t: "const", k: "kw" }, { t: " client = " }, { t: "new", k: "kw" }, { t: " SarvamAIClient({ apiSubscriptionKey: process.env.SARVAM_API_KEY });" }],
      [],
      [{ t: "const", k: "kw" }, { t: " response = " }, { t: "await", k: "kw" }, { t: " client.textToSpeech.convert({" }],
      ...body("  ", false, ": "),
      [{ t: "});" }],
    ];
  const plain = lines.map((l) => l.map((s) => s.t).join("")).join("\n");
  const copy = async () => {
    try { await navigator.clipboard.writeText(plain); setCopied(true); setTimeout(() => setCopied(false), 1600); } catch { /* clipboard blocked: nothing to do */ }
  };

  return (
    <div className="bb-play">
      <div className="bb-play__controls">
        <div className="bb-ctl" role="group" aria-labelledby="pg-voice-l">
          <p className="bb-ctl__label" id="pg-voice-l">Voice</p>
          <div className="bb-ctl__voices">
            {VOICES.map((x, n) => (
              <button key={x.id} type="button" className="bb-vchip" aria-pressed={n === vi} onClick={() => setVi(n)}>
                <VoiceAvatar svg={x.avatar} size={28} /><span><b>{x.name}</b><small>{x.lang}</small></span>
              </button>
            ))}
          </div>
        </div>
        <div className="bb-ctl">
          <p className="bb-ctl__label"><label htmlFor="pg-pace">Pace</label><output htmlFor="pg-pace">{p}×</output></p>
          <input id="pg-pace" className="bb-range" type="range" min={0.5} max={2} step={0.1} value={pace} onChange={(e) => setPace(Number(e.target.value))}
            style={{ "--v": (pace - 0.5) / 1.5 } as CSSProperties} />
          <p className="bb-range__scale" aria-hidden><span>0.5×</span><span>2.0×</span></p>
        </div>
        <Segmented id="pg-rate" label="Sample rate" options={RATES} value={rate} onChange={setRate} render={(r) => `${r / 1000} kHz`} />
        <Segmented id="pg-codec" label="Format" options={CODECS} value={codec} onChange={setCodec} render={(c) => c.toUpperCase()} />
      </div>
      <div className="bb-codecard">
        <div className="bb-codecard__bar">
          <Segmented id="pg-tab" label="Code language" hideLabel options={[...TABS]} value={tab} onChange={setTab} render={(t) => t} />
          <button type="button" className="pv-again bb-copy" onClick={copy} aria-live="polite">
            {copied ? <Check width={14} height={14} strokeWidth={2.5} /> : <Copy width={14} height={14} />}{copied ? "Copied" : "Copy"}
          </button>
        </div>
        <pre className="bb-pre" tabIndex={0} aria-label={`${tab} request`}><code>
          {lines.map((l, i) => (
            <span key={`${tab}-${i}`} className="bb-pre__line">
              {l.map((s, j) => s.live
                ? <span key={`${j}-${s.t}`} className={`bb-tok-${s.k} bb-live`}>{s.t}</span>
                : <span key={j} className={s.k ? `bb-tok-${s.k}` : undefined}>{s.t}</span>)}
              {"\n"}
            </span>
          ))}
        </code></pre>
      </div>
    </div>
  );
}
