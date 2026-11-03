"use client";
import { useDeferredValue, useMemo, useState } from "react";
import { Artboard, BACKGROUNDS, Banner, DEVICES, SITUATIONS, TREATMENTS, shapesFor, variationsOf, type BannerSpec, type Situation } from "@/components/sarvam";
import { FORMATS, type BannerFormat } from "@/components/sarvam/banners";

const SIT: [Situation, string][] = [["launch", "Launch"], ["announcement", "Announcement"], ["milestone", "Milestone"], ["funding", "Funding"], ["event", "Event"], ["story", "Story"], ["partnership", "Partnership"], ["program", "Program"], ["feature", "Feature"]];
const label = (s: string) => s.replace(/-/g, " ");

function Seg<T extends string>({ name, value, options, onChange, swatch }: { name: string; value?: T; options: readonly T[]; onChange: (v: T) => void; swatch?: (v: T) => string }) {
  return (
    <div className="mk-field"><span>{name}</span>
      <div className="mk-seg">{options.map((o) => (
        <button key={o} aria-pressed={value === o} onClick={() => onChange(o)} className={swatch ? `mk-swatch ${swatch(o)}` : undefined} title={label(o)}>{swatch ? <i>{label(o)}</i> : label(o)}</button>
      ))}</div>
    </div>
  );
}

export default function Maker() {
  const [spec, setSpec] = useState<BannerSpec>(SITUATIONS.launch);
  const [id, setId] = useState("my-banner");
  const [status, setStatus] = useState("");
  const [showVars, setShowVars] = useState(false);
  // Controls update instantly; previews and variations follow in a deferred (interruptible) render.
  const view = useDeferredValue(spec);
  const vars = useMemo(() => (showVars ? variationsOf(view) : []), [showVars, view]);
  const set = (p: Partial<BannerSpec>) => setSpec((s) => ({ ...s, ...p }));
  const metaFormat: BannerFormat = "portrait";   // two formats only: Meta 1080×1350, LinkedIn 1200×627
  const save = async () => {
    setStatus("Saving and exporting…");
    const r = await fetch("/api/banners", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ id, formats: { meta: metaFormat, linkedin: "landscape" }, spec }) });
    const j = await r.json();
    setStatus(r.ok ? `Saved. ${j.files.join(" · ")}` : j.error);
  };
  return (
    <div className="mk">
      <aside className="mk-panel">
        <Seg name="Situation (preset)" value={spec.situation} options={SIT.map(([s]) => s)} onChange={(s) => setSpec(SITUATIONS[s])} />
        <label className="mk-field"><span>Headline {spec.primaryIsNumber ? "(number)" : ""}</span>
          <input value={spec.primary} onChange={(e) => set({ primary: e.target.value })} /></label>
        <label className="mk-check"><input type="checkbox" checked={!!spec.primaryIsNumber} onChange={(e) => set({ primaryIsNumber: e.target.checked })} /> Headline is a big number</label>
        <label className="mk-field"><span>One supporting line (optional, the only other text)</span>
          <input value={spec.secondary ?? ""} placeholder="Leave empty for headline only" onChange={(e) => set({ secondary: e.target.value || undefined })} /></label>
        {spec.secondary && <Seg name="Supporting line goes" value={spec.secondaryPlace ?? "below"} options={["above", "below"] as const} onChange={(v) => set({ secondaryPlace: v })} />}
        <Seg name="Layout" value={spec.layout ?? "centered"} options={["centered", "split", "stacked"] as const} onChange={(v) => set({ layout: v })} />
        <label className="mk-field"><span>Partner (lockup next to the wordmark, optional)</span>
          <input value={spec.partner ?? ""} placeholder="e.g. Supernova" onChange={(e) => set({ partner: e.target.value || undefined })} /></label>
        {(spec.layout ?? "centered") !== "centered" && <Seg name="Product card inside the device" value={spec.card ?? "none"} options={["none", "plan", "research", "review"] as const} onChange={(v) => set({ card: v === "none" ? undefined : v })} />}
        <Seg name="Headline style" value={spec.titleStyle} options={["serif", "sans"] as const} onChange={(v) => set({ titleStyle: v })} />
        <Seg name="Background" value={spec.background} options={BACKGROUNDS} onChange={(v) => set({ background: v })} swatch={(v) => (v === "plain" ? "mk-plain" : `sr-gradient-${v}`)} />
        <Seg name="Device" value={spec.device} options={DEVICES} onChange={(v) => set({ device: v, shape: shapesFor(v)[0] === undefined ? undefined : shapesFor(v).includes(spec.shape ?? "") ? spec.shape : shapesFor(v)[0] })} />
        {shapesFor(spec.device).length > 0 && <Seg name="Shape" value={spec.shape} options={shapesFor(spec.device)} onChange={(v) => set({ shape: v })} />}
        <Seg name="Text treatment" value={spec.treatment} options={TREATMENTS} onChange={(v) => set({ treatment: v })} />
        <Seg name="Logo" value={spec.logo ?? "wordmark"} options={["wordmark", "logomark"] as const} onChange={(v) => set({ logo: v })} />
        <Seg name="Logo position" value={spec.mark} options={["inside", "top", "bottom", "none"] as const} onChange={(v) => set({ mark: v })} />
        <div className="mk-out">
          <label className="mk-field"><span>Save as</span><input value={id} onChange={(e) => setId(e.target.value)} /></label>
          <button className="sr-button sr-button--primary" onClick={save}>Save & export PNGs</button>
          {status && <p className="sr-meta">{status}</p>}
        </div>
      </aside>
      <section className="mk-stage">
        <div className="mk-vars">
          <div className="mk-vars__head"><p className="sr-eyebrow">Variations of this copy</p>
            <button className="sr-button sr-button--secondary" onClick={() => setShowVars((s) => !s)}>{showVars ? "Hide variations" : "Show 6 variations"}</button></div>
          {showVars && <div className="mk-vars__grid">
            {vars.map((v, i) => (
              <button key={i} className="mk-var" onClick={() => setSpec({ ...v, situation: spec.situation })} aria-label={`Use variation ${i + 1}`}>
                <Artboard width={FORMATS.landscape.W} height={FORMATS.landscape.H}><Banner spec={v} format="landscape" id={`var-${i}`} /></Artboard>
              </button>
            ))}
          </div>}
        </div>
        {(["portrait", "landscape"] as BannerFormat[]).map((f) => (
          <figure key={f} className={`mk-frame mk-frame--${f}`}>
            <Artboard width={FORMATS[f].W} height={FORMATS[f].H} label={f}><Banner spec={view} format={f} id={`mk-${f}`} /></Artboard>
            <figcaption className="sr-meta">{f} · {FORMATS[f].W}×{FORMATS[f].H}</figcaption>
          </figure>
        ))}
      </section>
    </div>
  );
}
