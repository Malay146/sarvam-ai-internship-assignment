"use client";
import { useMemo, useState } from "react";
import {
  DIVIDER_PRESETS, FLOWER_PRESETS, GATEWAY_PRESETS, MEDALLION_PRESETS, MOTIF_PRESETS,
  GLOSS_PALETTES, GLOW_PALETTES, cloudSVG, glossSVG, dividerSVG, flowerPath, flowerSVG, gatewayPath, gatewaySVG, glowSVG, medallionPath, medallionSVG, motifPaths, patternSVG,
  randomDivider, randomFlower, randomGateway, randomMedallion, randomMotif, rng,
  type DividerParams, type FlowerParams, type GatewayParams, type GlossPalette, type GlowPalette, type MedallionParams, type MotifParams,
} from "@/lib/shapes";

type Mode = "gateway" | "medallion" | "flower" | "motif" | "divider";
type Render = "solid" | "line" | "glow" | "gloss" | "cloud";
const MODES: [Mode, string][] = [["gateway", "Gateway"], ["medallion", "Medallion"], ["flower", "Flower"], ["motif", "Line motif"], ["divider", "Divider"]];

// [label, class, ink] — ink keeps every symbol ≥ 3:1 against its surface (components.md §3.2)
const SURFACES = [
  ["tint-indigo", "sr-tint-indigo", "dark"], ["tint-orange", "sr-tint-orange", "dark"], ["tint-green", "sr-tint-green", "dark"],
  ["dusk", "sr-gradient-dusk", "light"], ["dawn", "sr-gradient-dawn", "light"], ["indigo glow", "sr-gradient-indigo-glow", "light"], ["night", "sr-gradient-night", "light"],
] as const;
const inkFor = (cls: string) => (SURFACES.find(([, c]) => c === cls)?.[2] === "light" ? "var(--color-sr-white)" : "var(--color-sr-indigo-950)");

const motifSVG = (m: MotifParams) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-50 -50 100 100" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round">${motifPaths(m).join("")}</svg>`;

function download(name: string, svg: string) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
  a.download = name; a.click(); URL.revokeObjectURL(a.href);
}
function Slider({ label, value, min, max, step = 1, onChange }: { label: string; value: number; min: number; max: number; step?: number; onChange: (v: number) => void }) {
  return (
    <label className="st-field">
      <span className="st-field__row"><span>{label}</span><code>{value}</code></span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(+e.target.value)} />
    </label>
  );
}
function Seg<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: readonly T[]; onChange: (v: T) => void }) {
  return (
    <div className="st-field">
      <span className="st-field__row"><span>{label}</span></span>
      <div className="st-seg">{options.map((o) => <button key={o} type="button" aria-pressed={o === value} onClick={() => onChange(o)}>{o}</button>)}</div>
    </div>
  );
}
const Svg = ({ html, className, style }: { html: string; className?: string; style?: React.CSSProperties }) => <div className={className} style={style} dangerouslySetInnerHTML={{ __html: html }} />;

export default function Studio() {
  const [mode, setMode] = useState<Mode>("gateway");
  const [g, setG] = useState<GatewayParams>(GATEWAY_PRESETS["Domed door"]);
  const [md, setMd] = useState<MedallionParams>(MEDALLION_PRESETS["Ogee cross"]);
  const [fl, setFl] = useState<FlowerParams>(FLOWER_PRESETS["Lotus"]);
  const [m, setM] = useState<MotifParams>(MOTIF_PRESETS["Lotus"]);
  const [d, setD] = useState<DividerParams>(DIVIDER_PRESETS["Scroll fan"]);
  const [render, setRender] = useState<Render>("solid");
  const [palette, setPalette] = useState<GlowPalette>("lavender");
  const [gloss, setGloss] = useState<GlossPalette>("periwinkle");
  const [surface, setSurface] = useState<string>("sr-gradient-dusk");
  const [pat, setPat] = useState({ cols: 6, gap: 10, stagger: true });
  const [seed, setSeed] = useState(7);
  const [copied, setCopied] = useState("");

  const geomFor = (k: Mode) => (k === "gateway" ? gatewayPath(g) : k === "medallion" ? medallionPath(md) : flowerPath(fl));
  const glyph = useMemo(() => {
    const r: "solid" | "line" = render === "line" ? "line" : "solid";
    if (render === "glow" && (mode === "gateway" || mode === "medallion" || mode === "flower")) return glowSVG(geomFor(mode), palette, "main");
    if (render === "gloss" && (mode === "gateway" || mode === "medallion" || mode === "flower")) return glossSVG(geomFor(mode), gloss, "main");
    if (render === "cloud" && (mode === "gateway" || mode === "medallion" || mode === "flower")) return cloudSVG(geomFor(mode));
    if (mode === "gateway") return gatewaySVG(g, r, "main");
    if (mode === "medallion") return medallionSVG(md, r, "main");
    if (mode === "flower") return flowerSVG(fl, r, "main");
    if (mode === "motif") return motifSVG(m);
    return dividerSVG(d);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, g, md, fl, m, d, render, palette, gloss]);

  const windowShape = mode === "gateway" ? gatewayPath(g) : mode === "medallion" ? medallionPath(md) : null;
  const isGlow = render === "glow" && mode !== "motif" && mode !== "divider";
  const isArt = (render === "gloss" || render === "cloud") && mode !== "motif" && mode !== "divider";
  const pattern = useMemo(() => (mode === "divider" || isGlow || render === "cloud" ? "" : patternSVG(glyph, { ...pat, width: 480, height: 480 })), [mode, glyph, pat, isGlow, render]);

  const gallery = useMemo(() => {
    const r = rng(seed * 31 + mode.length);
    return Array.from({ length: 24 }, (_, i) => {
      const art = (geom: { d: string; width: number; height: number }, fallback: string, k: string) =>
        render === "glow" ? glowSVG(geom, palette, k) : render === "gloss" ? glossSVG(geom, gloss, k) : fallback;
      if (mode === "gateway") { const v = randomGateway(r); return { svg: art(gatewayPath(v), gatewaySVG(v, "solid", `g${i}`), `g${i}`), use: () => setG(v) }; }
      if (mode === "medallion") { const v = randomMedallion(r); return { svg: art(medallionPath(v), medallionSVG(v, "solid", `m${i}`), `m${i}`), use: () => setMd(v) }; }
      if (mode === "flower") { const v = randomFlower(r); return { svg: art(flowerPath(v), flowerSVG(v, "solid", `f${i}`), `f${i}`), use: () => setFl(v) }; }
      if (mode === "motif") { const v = randomMotif(r); return { svg: motifSVG(v), use: () => setM(v) }; }
      const v = randomDivider(r); return { svg: dividerSVG(v), use: () => setD(v) };
    });
  }, [seed, mode, render, palette, gloss]);

  const presets: Record<string, () => void> = useMemo(() => {
    const bind = <T,>(src: Record<string, T>, set: (v: T) => void) => Object.fromEntries(Object.entries(src).map(([k, v]) => [k, () => set(v)]));
    return mode === "gateway" ? bind(GATEWAY_PRESETS, setG) : mode === "medallion" ? bind(MEDALLION_PRESETS, setMd) : mode === "flower" ? bind(FLOWER_PRESETS, setFl) : mode === "motif" ? bind(MOTIF_PRESETS, setM) : bind(DIVIDER_PRESETS, setD);
  }, [mode]);

  const copy = async (label: string, text: string) => { await navigator.clipboard.writeText(text); setCopied(label); setTimeout(() => setCopied(""), 1400); };
  const solidCapable = mode === "gateway" || mode === "medallion" || mode === "flower";

  return (
    <div className="st">
      <aside className="st-panel">
        <div className="st-tabs" role="tablist">
          {MODES.map(([k, label]) => <button key={k} role="tab" aria-selected={mode === k} onClick={() => setMode(k)}>{label}</button>)}
        </div>
        <div className="st-presets">{Object.entries(presets).map(([k, fn]) => <button key={k} className="sr-chip" onClick={fn}>{k}</button>)}</div>

        <div className="st-fields">
          {solidCapable && <Seg label="Render" value={render} options={["solid", "line", "glow", "gloss", "cloud"] as const} onChange={setRender} />}
          {solidCapable && render === "gloss" && <Seg label="Gloss palette" value={gloss} options={Object.keys(GLOSS_PALETTES) as GlossPalette[]} onChange={setGloss} />}
          {solidCapable && render === "glow" && <Seg label="Glow palette" value={palette} options={Object.keys(GLOW_PALETTES) as GlowPalette[]} onChange={setPalette} />}

          {mode === "gateway" && <>
            <Seg label="Top" value={g.top} options={["ogee", "round", "point", "flat"] as const} onChange={(top) => setG({ ...g, top })} />
            <Seg label="Bottom" value={g.bottom} options={["mirror", "flat", "round"] as const} onChange={(bottom) => setG({ ...g, bottom })} />
            <Slider label="Dome width" value={g.dome ?? 1} min={0.35} max={1} step={0.01} onChange={(dome) => setG({ ...g, dome })} />
            <Slider label="Aspect (h/w)" value={g.aspect} min={0.8} max={1.8} step={0.05} onChange={(aspect) => setG({ ...g, aspect })} />
            <Slider label="Shoulder" value={g.shoulder} min={0.12} max={0.45} step={0.01} onChange={(shoulder) => setG({ ...g, shoulder })} />
            <Slider label="Side lobes" value={g.lobes} min={0} max={4} onChange={(lobes) => setG({ ...g, lobes })} />
            <Slider label="Lobe depth (− cusp · + lobe)" value={g.lobeDepth} min={-8} max={8} step={0.5} onChange={(lobeDepth) => setG({ ...g, lobeDepth })} />
            <Slider label="Waist" value={g.waist} min={0} max={14} step={0.5} onChange={(waist) => setG({ ...g, waist })} />
            <Slider label="Corner step" value={g.notch} min={0} max={8} step={0.5} onChange={(notch) => setG({ ...g, notch })} />
            <Slider label="Finial" value={g.crown} min={0} max={10} step={0.5} onChange={(crown) => setG({ ...g, crown })} />
            <Slider label="Inner frame" value={g.frame ?? 0} min={0} max={8} step={0.5} onChange={(frame) => setG({ ...g, frame })} />
          </>}

          {mode === "medallion" && <>
            <Slider label="Symmetry (sides)" value={md.fold} min={3} max={12} onChange={(fold) => setMd({ ...md, fold })} />
            <Seg label="Feature on each side" value={md.feature} options={["ogee", "lobe", "point", "scallop", "step", "flat"] as const} onChange={(feature) => setMd({ ...md, feature })} />
            <Slider label="Feature depth" value={md.depth} min={0} max={24} step={0.5} onChange={(depth) => setMd({ ...md, depth })} />
            <Slider label="Feature width" value={md.width} min={0.3} max={1} step={0.05} onChange={(width) => setMd({ ...md, width })} />
            <Seg label="At each corner" value={md.vertex} options={["none", "lobe", "point", "notch"] as const} onChange={(vertex) => setMd({ ...md, vertex })} />
            <Slider label="Corner depth" value={md.vertexDepth} min={0} max={12} step={0.5} onChange={(vertexDepth) => setMd({ ...md, vertexDepth })} />
            <Seg label="Base" value={md.base} options={["circle", "polygon"] as const} onChange={(base) => setMd({ ...md, base })} />
            <Slider label="Aspect" value={md.aspect} min={0.8} max={1.4} step={0.05} onChange={(aspect) => setMd({ ...md, aspect })} />
            <Slider label="Inner frame" value={md.frame ?? 0} min={0} max={8} step={0.5} onChange={(frame) => setMd({ ...md, frame })} />
          </>}

          {mode === "flower" && <>
            <Seg label="Petal" value={fl.shape} options={["round", "pointed", "lotus", "notched"] as const} onChange={(shape) => setFl({ ...fl, shape })} />
            <Slider label="Petals" value={fl.petals} min={4} max={20} onChange={(petals) => setFl({ ...fl, petals })} />
            <Slider label="Petal length" value={fl.depth} min={0.12} max={0.65} step={0.01} onChange={(depth) => setFl({ ...fl, depth })} />
            <Slider label="Layers" value={fl.layers} min={1} max={3} onChange={(layers) => setFl({ ...fl, layers })} />
            <Slider label="Centre" value={fl.centre} min={0} max={0.35} step={0.01} onChange={(centre) => setFl({ ...fl, centre })} />
            <Slider label="Inner frame" value={fl.frame ?? 0} min={0} max={6} step={0.5} onChange={(frame) => setFl({ ...fl, frame })} />
          </>}

          {mode === "motif" && <>
            <Seg label="Petal" value={m.petal} options={["lens", "drop", "heart", "leaf"] as const} onChange={(petal) => setM({ ...m, petal })} />
            <Slider label="Petals" value={m.petals} min={4} max={16} onChange={(petals) => setM({ ...m, petals })} />
            <Slider label="Rings" value={m.rings} min={1} max={3} onChange={(rings) => setM({ ...m, rings })} />
            <Slider label="Petal width" value={m.width} min={0.15} max={0.9} step={0.05} onChange={(width) => setM({ ...m, width })} />
            <Slider label="Inner radius" value={m.inner} min={0} max={0.45} step={0.01} onChange={(inner) => setM({ ...m, inner })} />
            <Slider label="Twist alternate rings" value={m.twist} min={0} max={1} onChange={(twist) => setM({ ...m, twist })} />
            <Seg label="Centre" value={m.centre} options={["dot", "ring", "none"] as const} onChange={(centre) => setM({ ...m, centre })} />
          </>}

          {mode === "divider" && <>
            <Seg label="Family" value={d.family} options={["scroll", "twin", "lotus", "beads", "gateway", "vine"] as const} onChange={(family) => setD({ ...d, family })} />
            <Slider label="Petals / beads / leaves" value={d.petals} min={2} max={6} onChange={(petals) => setD({ ...d, petals })} />
            <Slider label="Fan spread (°)" value={d.spread} min={20} max={95} onChange={(spread) => setD({ ...d, spread })} />
            <Slider label="Spiral turns" value={d.turns} min={0.8} max={2.2} step={0.1} onChange={(turns) => setD({ ...d, turns })} />
            <Slider label="Line length" value={d.line} min={0.2} max={1} step={0.05} onChange={(line) => setD({ ...d, line })} />
            <Slider label="Ornament size" value={d.size} min={0.7} max={1.3} step={0.05} onChange={(size) => setD({ ...d, size })} />
          </>}
        </div>

        {mode !== "divider" && !isGlow && (
          <div className="st-fields st-fields--pattern">
            <p className="sr-eyebrow">Pattern tiling</p>
            <Slider label="Columns" value={pat.cols} min={3} max={12} onChange={(cols) => setPat({ ...pat, cols })} />
            <Slider label="Gap" value={pat.gap} min={0} max={40} onChange={(gap) => setPat({ ...pat, gap })} />
            <Seg label="Rows" value={pat.stagger ? "staggered" : "grid"} options={["staggered", "grid"] as const} onChange={(v) => setPat({ ...pat, stagger: v === "staggered" })} />
          </div>
        )}

        <div className="st-actions">
          <button className="sr-button sr-button--primary" onClick={() => download(`sarvam-${mode}.svg`, glyph)}>Download SVG</button>
          <button className="sr-button sr-button--secondary" onClick={() => copy("svg", glyph)}>{copied === "svg" ? "Copied" : "Copy SVG"}</button>
          {mode !== "divider" && !isGlow && <button className="sr-button sr-button--secondary" onClick={() => download(`sarvam-${mode}-pattern.svg`, pattern)}>Download pattern</button>}
        </div>
      </aside>

      <section className="st-stage">
        <div className="st-surfaces">
          {SURFACES.map(([n, c]) => <button key={c} aria-pressed={surface === c} className={c} title={n} onClick={() => setSurface(c)}><span className="sr-meta">{n}</span></button>)}
        </div>

        <div className={`st-preview${mode === "divider" ? " st-preview--wide" : ""}`}>
          {isGlow ? (
            <figure className="st-card st-card--glow"><Svg html={glyph} className="st-glowcard" /><figcaption className="sr-meta">Glow · {palette}</figcaption></figure>
          ) : isArt ? (
            <figure className={`st-card ${render === "cloud" ? "sr-gradient-lavender-dusk" : ""}`}><Svg html={glyph} className="st-glyph" /><figcaption className="sr-meta">{render === "gloss" ? `Gloss · ${gloss}` : "Soft cloud on lavender dusk"}</figcaption></figure>
          ) : windowShape ? (
            <figure className="st-card">
              <svg viewBox={`0 0 ${windowShape.width} ${windowShape.height}`} className="st-mask" role="img" aria-label="Shape as a window">
                <defs><clipPath id="win"><path d={windowShape.d} /></clipPath></defs>
                <foreignObject x="0" y="0" width={windowShape.width} height={windowShape.height} clipPath="url(#win)">
                  <div className={surface} style={{ width: "100%", height: "100%" }} />
                </foreignObject>
              </svg>
              <figcaption className="sr-meta">As a window onto a brand surface</figcaption>
            </figure>
          ) : (
            <figure className={`st-card ${surface}`}>
              <Svg html={glyph} className={`st-glyph${mode === "divider" ? " st-glyph--wide" : ""}`} style={{ color: inkFor(surface) }} />
              <figcaption className="sr-meta">On {SURFACES.find(([, c]) => c === surface)?.[0]}</figcaption>
            </figure>
          )}
          <figure className="st-card">
            <Svg html={isGlow ? (mode === "gateway" ? gatewaySVG(g, "solid", "sil") : mode === "medallion" ? medallionSVG(md, "solid", "sil") : flowerSVG(fl, "solid", "sil")) : glyph} className={`st-glyph${mode === "divider" ? " st-glyph--wide" : ""}`} />
            <figcaption className="sr-meta">{isGlow || isArt ? "Silhouette source" : solidCapable ? (render === "solid" ? "Solid · cut lines 1.5px" : "Line · 1.5 stroke") : mode === "divider" ? "2px ornament line · round caps" : "1.5 stroke · currentColor"}</figcaption>
          </figure>
          {mode !== "divider" && !isGlow && pattern && (
            <figure className={`st-card st-card--pattern ${surface}`}>
              <Svg html={pattern} className="st-pattern" style={{ color: inkFor(surface), opacity: 0.9 }} />
              <figcaption className="sr-meta">Pattern · {pat.cols} columns · {pat.stagger ? "staggered" : "grid"}</figcaption>
            </figure>
          )}
        </div>

        <div className="st-gallery-head">
          <p className="sr-eyebrow">24 variations · seed {seed}</p>
          <button className="sr-button sr-button--secondary" onClick={() => setSeed((s) => s + 1)}>Generate more</button>
        </div>
        <div className={`st-gallery${mode === "divider" ? " st-gallery--wide" : ""}`}>
          {gallery.map((v, i) => (
            <button key={`${seed}-${i}`} className="st-thumb" onClick={v.use} aria-label={`Use variation ${i + 1}`}>
              <Svg html={v.svg} className="st-thumb__svg" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
