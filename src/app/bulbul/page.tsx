// Bulbul V4 Flash landing page (Product expression, Dawn theme). Shared system parts: MegaNav, HeroGlow + Motif,
// SectionHeader (chapter / split rhythm), OneFaq, CtaCard, SiteFooter, tokens. Bulbul's own formats: studio, tracklist,
// chorus, ripple stage, multitrack, request timeline, playground, diff, doors. Facts: design-system/voice.md §5 (Bulbul fact sheet) only. Playbook: design-system/recipes/landing-page.md §0.
// Recipe for this page: design-system/recipes/bulbul-page.md.
import type { Metadata } from "next";
import type { ComponentType, ReactNode } from "react";
import {
  ArrowUpRight, BoltFill, BookOpenFill, Check, ClapperboardFill, CodeFill, FilmFill, GraduationCapFill, HeadsetFill, LanguageFill, MegaphoneFill, MicrophoneFill, PlayCircleFill, SlidersFill, TrophyFill,
} from "@/components/icons";
import { Button, ButtonRow, CtaCard, HeroGlow, Motif, SectionHeader } from "@/components/sarvam";
import { MegaNav } from "@/components/sarvam/mega-nav";
import { SiteFooter } from "@/components/sarvam/site-footer";
import { Reveal } from "@/components/sarvam/cowork";
import { OneFaq } from "@/components/sarvam/cowork-play";
import { BrandMark } from "@/components/sarvam/brand";
import { BulbulStudio, LangField, Multitrack, Playground, StreamDemo, VoicePicker } from "@/components/sarvam/bulbul-play";
import { VoiceAvatar, Wave } from "@/components/sarvam/bulbul-wave";
import { VOICES, type Tone, type WaveProfile } from "@/components/sarvam/bulbul-data";
import "../cowork.css";
import "./bulbul.css";

export const metadata: Metadata = {
  title: "Bulbul V4 Flash · Text to speech for India · Sarvam",
  description: "Expressive, native text to speech in 11 languages, with 83 voices in 224 styles and first audio in under 250 ms.",
};

const API_KEY = "https://indus.sarvam.ai/";
type Ic = ComponentType<{ width?: number; height?: number }>;

/* Tracklist row: number, title + one line, then the line it is about (a transcript). */
function Track({ n, icon: I, title, desc, clip }: { n: string; icon: Ic; title: string; desc: string; clip: ReactNode }) {
  return (
    <li className="bb-trk" data-sibling="tracks">
      <span className="bb-trk__num" aria-hidden>{n}</span>
      <div className="bb-trk__text">
        <span className="bb-trk__icon" aria-hidden><I width={16} height={16} /></span>
        <h3 className="sr-h4" data-line="title">{title}</h3>
        <p className="sr-body" data-line="desc">{desc}</p>
      </div>
      <div className="bb-trk__clip" aria-hidden>{clip}</div>
    </li>
  );
}

/* Multitrack lane: what it is on the left, its delivery signature across the lane. */
function Lane({ tone, icon: I, title, desc, seed, profile, legend }: { tone: Tone; icon: Ic; title: string; desc: string; seed: number; profile: WaveProfile; legend?: [string, string] }) {
  return (
    <div className="bb-lane" data-sibling="lanes">
      <div className="bb-lane__label">
        <span className={`bb-lane__icon cw-tone--${tone}`} aria-hidden><I width={16} height={16} /></span>
        <span><b data-line="title">{title}</b><span data-line="desc">{desc}</span></span>
      </div>
      <div className="bb-lane__wave">
        <Wave seed={seed} n={96} profile={profile} tone={tone} head={false} />
        {legend && <span className="bb-lane__legend" aria-hidden><i data-seg="0" />{legend[0]}<i data-seg="1" />{legend[1]}</span>}
      </div>
    </div>
  );
}

/* Depth card visual: a transcript with what Bulbul handles marked, then either tags or written → spoken rows. */
function Transcript({ voice, line, lang, marks = [], tags, reads }: { voice: number; line: string; lang: string; marks?: string[]; tags?: string[]; reads?: [string, string][] }) {
  const v = VOICES[voice];
  // wrap each marked phrase in <mark>, keep the rest as text
  const parts: ReactNode[] = [];
  let rest = line;
  marks.forEach((m, k) => {
    const at = rest.indexOf(m);
    if (at < 0) return;
    parts.push(rest.slice(0, at), <mark key={k}>{m}</mark>);
    rest = rest.slice(at + m.length);
  });
  parts.push(rest);
  return (
    <div className="bb-tx">
      <div className="bb-tx__head"><VoiceAvatar svg={v.avatar} size={24} /><b>{v.name}</b><span>{v.style}</span><code>{v.code}</code></div>
      <p className="bb-tx__line" lang={lang}>{parts}</p>
      {tags && <p className="bb-tx__tags">{tags.map((t) => <span key={t}>{t}</span>)}</p>}
      {reads && (
        <ul className="bb-tx__reads">
          {reads.map(([w, s]) => <li key={w}><code>{w}</code><span className="bb-tx__arrow" aria-hidden>→</span><span lang="hi">{s}</span></li>)}
        </ul>
      )}
    </div>
  );
}

export default function BulbulPage() {
  return (
    <>
      <MegaNav cta="Get API key" ctaHref={API_KEY} login={false} />
      <main className="cw bb sr-under-nav">
        <HeroGlow height={720} />

        {/* 1 · Promise (Product): centred kicker + H1 + lead + buttons, the studio below */}
        <section className="sr-container pv-hero" aria-labelledby="hero-h">
          <Reveal className="pv-hero__text">
            <Motif />
            <p className="cw-kicker">Bulbul V4 Flash</p>
            <h1 id="hero-h" className="sr-display-product">Voices that sound like home</h1>
            <p className="sr-lead">Expressive, native text to speech in 11 languages, with 83 voices in 224 styles and first audio in under 250 ms.</p>
            <ButtonRow center>
              <Button size="lg" href={API_KEY}>Get API key</Button>
              <Button size="lg" variant="secondary" href="#try">Try it here</Button>
            </ButtonRow>
          </Reveal>
          <Reveal delay={0.12} className="pv-hero__shot"><BulbulStudio /></Reveal>
        </section>

        {/* 2 · Why it's different (Bulbul format: a tracklist). Four numbered tracks, each with the line it is about. */}
        <section id="depth" className="sr-container cw-section" aria-labelledby="depth-h">
          <Reveal><SectionHeader variant="split" title={<span id="depth-h">Built for the depth of Indian speech</span>} lead="The details that make a voice sound local: the pauses, the particles, and the names and numbers people say every day." /></Reveal>
          <Reveal>
            <ol className="bb-trks">
              <Track n="01" icon={LanguageFill} title="Voices that sound native" desc="Bengali delivery with natural hesitation, and English words kept as they are said."
                clip={<Transcript voice={4} lang="bn" line="ধুর বাবা, এই জ্যামে আর পারা যায় না!" marks={["ধুর বাবা,"]} tags={["Bengali delivery", "Hesitation", "English inside Bengali"]} />} />
              <Track n="02" icon={MicrophoneFill} title="Indian English that sounds Indian" desc="The particles and regional cadence of English as India speaks it, not a borrowed accent."
                clip={<Transcript voice={1} lang="en" line="What ra Sudeep? You said five minutes!" marks={["ra"]} tags={["Indian English particles", "Regional cadence"]} />} />
              <Track n="03" icon={BookOpenFill} title="Names and numbers, read in context" desc="PNR, train, coach and seat numbers, PAN and Aadhaar, each read the way an agent would."
                clip={<Transcript voice={3} lang="hi" line="हाँ जी, umm… एक second, आपकी booking details check कर रही हूँ…" marks={["umm…", "second"]} reads={[["Coach B2", "कोच बी टू"], ["Seat 34", "सीट चौंतीस"]]} />} />
              <Track n="04" icon={BoltFill} title="Amounts and dates in a payment reminder" desc="Rupee amounts, due dates and cut-off times, spoken clearly enough to act on."
                clip={<Transcript voice={2} lang="hi" line="नमस्ते राहुल जी, मैं Vistaar Finance से बोल रही हूँ।" marks={["राहुल जी"]} reads={[["₹4,250", "चार हज़ार दो सौ पचास रुपये"], ["15 Nov", "पंद्रह नवंबर"]]} />} />
            </ol>
          </Reveal>
        </section>

        {/* 3 · Where it works (Bulbul format: the chorus). Eleven greetings on the Dawn band, one sung at a time. */}
        <section id="languages" className="sr-container cw-section" aria-labelledby="lang-h">
          <Reveal><SectionHeader title={<span id="lang-h">Eleven languages, each in its own script</span>} lead="Write in the script your listener reads. Code-mixed lines like Hinglish work too, as long as each language keeps its own script." /></Reveal>
          <Reveal>
            <div className="bb-chorus">
              <LangField />
              <p className="bb-chorus__mix"><span lang="hi">नमस्ते, hello</span><span aria-hidden>·</span><span>Code-mixed lines work when each language keeps its own script</span></p>
            </div>
          </Reveal>
        </section>

        {/* 4 · Voices (Product, hands-on): pick a voice, hear its line */}
        <section id="voices" className="sr-container cw-section" aria-labelledby="voices-h">
          <Reveal><SectionHeader variant="split" title={<span id="voices-h">A voice for every experience</span>} lead="83 voices in 224 styles, from a calm assistant to a match commentator. Pick one to hear its line." /></Reveal>
          <Reveal><VoicePicker /></Reveal>
        </section>

        {/* 5 · One model, many experiences (Bulbul format: a multitrack). Six lanes, one delivery each. */}
        <section id="experiences" className="sr-container cw-section" aria-labelledby="exp-h">
          <Reveal><SectionHeader title={<span id="exp-h">One model. Many experiences.</span>} lead="The same model changes its delivery to fit the moment, from a quiet documentary to a sale that has to sell." /></Reveal>
          <Reveal>
            <Multitrack>
              <Lane tone="indigo" icon={HeadsetFill} title="A voice agent" desc="Eleven turns, both voices from one script." seed={5} profile="duet" legend={["Agent", "Caller"]} />
              <Lane tone="green" icon={MicrophoneFill} title="A support agent" desc="Hesitation, clear next steps, calm delivery." seed={17} profile="calm" />
              <Lane tone="rose" icon={GraduationCapFill} title="A teacher" desc="A physics lesson in Bengali and English." seed={29} profile="bilingual" legend={["Bengali", "English"]} />
              <Lane tone="orange" icon={TrophyFill} title="Live sports" desc="Speed and energy, as the action unfolds." seed={43} profile="energy" />
              <Lane tone="neutral" icon={FilmFill} title="A documentary" desc="Measured pacing and a sense of wonder." seed={61} profile="calm" />
              <Lane tone="orange" icon={MegaphoneFill} title="An ad" desc="A Hinglish sale ad that moves people." seed={83} profile="energy" />
            </Multitrack>
          </Reveal>
        </section>

        {/* 6 · For developers (Product): three facts + one request, start to finish */}
        <section id="developers" className="sr-container cw-section" aria-labelledby="dev-h">
          <Reveal><SectionHeader variant="split" title={<span id="dev-h">Made for developers. Scales for enterprises.</span>} lead="Real time in production, the output you need, and the same request shape you already use." /></Reveal>
          {/* paint for the filled fact icons, in the page theme: saffron rising bottom → top + a soft inner shadow */}
          <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
            <defs>
              <linearGradient id="bb-icon-grad" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#e6651b" /><stop offset="1" stopColor="#faac57" /></linearGradient>
              <filter id="bb-icon-inset" x="-20%" y="-20%" width="140%" height="140%">
                <feOffset dy="-1.2" in="SourceAlpha" result="up" /><feComposite in="SourceAlpha" in2="up" operator="out" result="edge" />
                <feGaussianBlur in="edge" stdDeviation="0.8" result="eb" /><feFlood floodColor="#7a2e05" floodOpacity="0.45" />
                <feComposite in2="eb" operator="in" result="sh" /><feComposite in="sh" in2="SourceAlpha" operator="in" result="inset" />
                <feMerge><feMergeNode in="SourceGraphic" /><feMergeNode in="inset" /></feMerge>
              </filter>
            </defs>
          </svg>
          <Reveal className="bb-dev">
            <div className="bb-dev__facts">
              {([
                [BoltFill, "Real time at scale", "First audio in under 250 ms in production, over HTTP streaming, WebSocket or a single response."],
                [SlidersFill, "The output you need", "Sample rates from 8 kHz to 48 kHz, in WAV, MP3, FLAC or AAC, at the pace you set."],
                [CodeFill, "Plug and play", "The same request shape as Bulbul V3, with SDKs for Python and Node.js."],
              ] as [Ic, string, string][]).map(([I, t, d]) => (
                <div key={t} className="bb-fact" data-sibling="dev">
                  <span className="bb-fact__icon" aria-hidden><I width={26} height={26} /></span>
                  <span><b data-line="title">{t}</b><span data-line="desc">{d}</span></span>
                </div>
              ))}
              <p className="bb-sdks">
                <span className="bb-sdk"><BrandMark name="Python" size={18} colored />Python</span>
                <span className="bb-sdk"><BrandMark name="Node.js" size={18} colored />Node.js</span>
              </p>
            </div>
            <StreamDemo />
          </Reveal>
        </section>

        {/* 7 · Try it (hands-on): real controls, a live request, then the key */}
        <section id="try" className="sr-container cw-section" aria-labelledby="try-h">
          <Reveal><SectionHeader eyebrow="Try it" eyebrowTone="accent" title={<span id="try-h">Shape the voice, then ship it</span>} lead="Pick a voice, set the pace and the output. The request updates as you go." /></Reveal>
          <Reveal><Playground /></Reveal>
          <Reveal className="bb-try-foot"><Button size="lg" href={API_KEY}>Get API key</Button><span className="sr-meta">Run this request with your own key.</span></Reveal>
        </section>

        {/* 8 · Upgrade (Product): the one-line diff + what changes */}
        <section id="upgrade" className="sr-container cw-section" aria-labelledby="up-h">
          <Reveal><SectionHeader variant="split" title={<span id="up-h">Switch from V3 in one line</span>} lead="Bulbul V4 Flash keeps V3's request shape, so an existing integration changes one value." /></Reveal>
          <Reveal className="bb-up">
            <div className="bb-diff" data-sibling="up">
              <p className="bb-diff__file"><code>request.json</code></p>
              <pre className="bb-pre bb-pre--diff"><code>
                <span className="bb-pre__line">{"{\n"}</span>
                <span className="bb-pre__line">{"  "}<span className="bb-tok-key">&quot;text&quot;</span>{": "}<span className="bb-tok-str">&quot;नमस्ते राहुल जी…&quot;</span>{",\n"}</span>
                <span className="bb-pre__line">{"  "}<span className="bb-tok-key">&quot;language_code&quot;</span>{": "}<span className="bb-tok-str">&quot;hi-IN&quot;</span>{",\n"}</span>
                <span className="bb-pre__line bb-del">{"- "}<span className="bb-tok-key">&quot;model&quot;</span>{": "}<span className="bb-tok-str">&quot;bulbul:v3&quot;</span>{",\n"}</span>
                <span className="bb-pre__line bb-add">{"+ "}<span className="bb-tok-key">&quot;model&quot;</span>{": "}<span className="bb-tok-str">&quot;bulbul:v4-flash&quot;</span>{",\n"}</span>
                <span className="bb-pre__line">{"  "}<span className="bb-tok-key">&quot;speech_sample_rate&quot;</span>{": "}<span className="bb-tok-num">24000</span>{"\n"}</span>
                <span className="bb-pre__line">{"}"}</span>
              </code></pre>
            </div>
            <div className="bb-gains" data-sibling="up">
              <p className="bb-gains__title">What you get for that one line</p>
              <ul>
                {["A more expressive delivery", "Indian names, numbers and abbreviations read in context", "₹20 per 10,000 characters, a third less than V3", "Nothing else in your integration changes"].map((x) => (
                  <li key={x}><span className="pv-vs__mark" aria-hidden><Check width={12} height={12} strokeWidth={2.5} /></span>{x}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>

        {/* 9 · Where to use it (Bulbul format: one band, three doors). */}
        <section id="where" className="sr-container cw-section" aria-labelledby="where-h">
          <Reveal><SectionHeader title={<span id="where-h">Use it where you build</span>} lead="Call it from code, try it in the browser, or use it inside Sarvam's own tools." /></Reveal>
          <Reveal>
            <ul className="bb-doors">
              {([
                [CodeFill, "Sarvam API", "Call it from your stack with the Python or Node.js SDK.", "Read the docs", "https://docs.sarvam.ai/api-reference-docs/text-to-speech/convert"],
                [PlayCircleFill, "Playground", "Write any line, pick a voice and hear it right away.", "Open the playground", "https://indus.sarvam.ai/text-to-speech"],
                [ClapperboardFill, "Content Studio", "Dub and localise your audio and video across languages.", "See Content Studio", "https://www.sarvam.ai/products/content-studio"],
              ] as [Ic, string, string, string, string][]).map(([I, t, d, cta, href]) => (
                <li key={t} data-sibling="doors">
                  <span className="bb-fact__icon" aria-hidden><I width={28} height={28} /></span>
                  <b data-line="title">{t}</b>
                  <span className="bb-doors__desc" data-line="desc">{d}</span>
                  <a className="bb-doors__link" href={href}>{cta}<ArrowUpRight width={16} height={16} aria-hidden /></a>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* 10 · Questions (Product): 8, one open at a time */}
        <section id="faq" className="sr-container cw-section cw-faq" aria-labelledby="faq-h">
          <Reveal><SectionHeader title={<span id="faq-h">Questions developers ask first</span>} /></Reveal>
          <Reveal className="cw-narrow">
            <OneFaq items={[
              { q: "What is Bulbul V4 Flash?", a: "Sarvam's real-time text to speech model. It speaks 11 languages in 83 voices and 224 styles, with first audio in under 250 ms in production." },
              { q: "Which languages are supported?", a: "Hindi, Bengali, Gujarati, Kannada, Malayalam, Marathi, Odia, Punjabi, Tamil, Telugu and Indian English. Code-mixed text such as Hinglish works when each language is written in its own script." },
              { q: "How is it different from Bulbul V3?", a: "It is more expressive and better with Indian names, numbers and abbreviations in context. It also costs a third less than V3." },
              { q: "Do I need to change my integration?", a: "No. Bulbul V4 Flash uses the same request shape as V3, so you only change the model name to bulbul:v4-flash." },
              { q: "Which outputs can I get?", a: "Sample rates from 8 kHz to 48 kHz, in WAV, MP3, FLAC or AAC. Audio arrives over HTTP streaming, WebSocket or a single response." },
              { q: "Where can I use it?", a: "Through the Sarvam API with the Python or Node.js SDK, in the Playground, and in Content Studio." },
              { q: "How much does it cost?", a: "₹20 per 10,000 characters. During the launch offer it is 50% off, at ₹10 per 10,000 characters until 12 Nov." },
              { q: "Are the samples on this page real recordings?", a: "The lines on this page show what Bulbul reads. To hear them, generate them in the Playground or with your API key." },
            ]} />
          </Reveal>
        </section>

        {/* 11 · Act (Campaign moment) */}
        <section id="start" className="sr-container cw-section cw-cta" aria-label="Get started">
          <Reveal><CtaCard title="Your next million conversations can sound more human." cta={<Button size="lg" href={API_KEY}>Get API key</Button>} /></Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

