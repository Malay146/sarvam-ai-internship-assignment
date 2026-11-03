// Banner composer: a banner = background + device + text treatment + content. No prompts; every part is a choice.
// Situations are presets of these choices. Spec: design-system/recipes/banner-builder.md.
import type { CSSProperties, ReactNode } from "react";
import {
  FLOWER_PRESETS, GATEWAY_PRESETS, MEDALLION_PRESETS, cloudSVG, flowerPath, gatewayPath, glossSVG, medallionPath,
  type GatewayParams, type GlossPalette,
} from "@/lib/shapes";
import { StyledText, balanceLines, charW, type TextFill } from "./StyledText";
import { FORMATS, type BannerFormat } from "./banners";

/* ── Vocabulary ── */
export type Background = "saffron-rose" | "dusk" | "dawn" | "indigo-glow" | "night" | "olive" | "meadow" | "spring" | "lavender-dusk" | "plain";
export type Device = "medallion-glow" | "gateway-carved" | "medallion-carved" | "gateway-window" | "gateway-echo" | "cloud" | "gloss" | "plain";
export type Treatment = "white" | "gold" | "indigo" | "ink";
export type MarkPlace = "inside" | "top" | "bottom";
export type Situation = "launch" | "announcement" | "milestone" | "funding" | "event" | "story";
export type TitleStyle = "serif" | "sans";
/** Max two text sections: one primary (headline or big number) + one optional secondary line above or below. */
export type BannerSpec = {
  situation?: Situation;
  background: Background; device: Device; shape?: string; treatment: Treatment; mark: MarkPlace;
  primary: string;                 // headline, or a number when primaryIsNumber
  primaryIsNumber?: boolean;
  titleStyle: TitleStyle;          // serif = display (stories, programs, numbers) · sans = bold (launches, research)
  secondary?: string;              // the only other text
  secondaryPlace?: "above" | "below";
};

export const BACKGROUNDS: Background[] = ["saffron-rose", "dusk", "dawn", "indigo-glow", "night", "olive", "meadow", "spring", "lavender-dusk", "plain"];
export const DEVICES: Device[] = ["medallion-glow", "gateway-carved", "medallion-carved", "gateway-window", "gateway-echo", "cloud", "gloss", "plain"];
export const TREATMENTS: Treatment[] = ["white", "gold", "indigo", "ink"];
export const DARK_BG = new Set<Background>(["saffron-rose", "dusk", "indigo-glow", "night", "olive"]);
/** Shapes curated for holding text (generator params; proportions are set per format, never stretched). */
export const TEXT_SHAPES = ["Onion lantern", "Cusped window", "Quatrefoil", "Scalloped medallion", "Ogee cross"] as const;
export const shapesFor = (d: Device) => (d === "medallion-glow" || d === "medallion-carved" ? [...TEXT_SHAPES] : d.startsWith("gateway") ? Object.keys(GATEWAY_PRESETS) : []);

export const SITUATIONS: Record<Situation, BannerSpec> = {
  launch: { situation: "launch", background: "saffron-rose", device: "medallion-glow", shape: "Onion lantern", treatment: "white", mark: "inside", titleStyle: "sans", primary: "Indus Cowork", secondary: "An AI teammate that finishes the work", secondaryPlace: "below" },
  announcement: { situation: "announcement", background: "dusk", device: "gateway-echo", shape: "Mihrab", treatment: "white", mark: "inside", titleStyle: "serif", primary: "Message a teammate like a colleague", secondary: "Indus Cowork, in Slack and Indus Chat", secondaryPlace: "below" },
  milestone: { situation: "milestone", background: "night", device: "medallion-glow", shape: "Scalloped medallion", treatment: "gold", mark: "bottom", titleStyle: "serif", primary: "100+", primaryIsNumber: true, secondary: "apps your teammates can work in", secondaryPlace: "below" },
  funding: { situation: "funding", background: "olive", device: "medallion-glow", shape: "Onion lantern", treatment: "gold", mark: "inside", titleStyle: "serif", primary: "$300 Million", primaryIsNumber: true, secondary: "Announcing Series B", secondaryPlace: "above" },
  event: { situation: "event", background: "spring", device: "gloss", treatment: "indigo", mark: "top", titleStyle: "serif", primary: "Build your first teammate", secondary: "A live Indus Cowork session", secondaryPlace: "below" },
  story: { situation: "story", background: "lavender-dusk", device: "cloud", treatment: "ink", mark: "top", titleStyle: "serif", primary: "Your newest colleague lives in Slack." },
};

/* ── Carved layer palettes (radial core → edge per band). Brand ramps only. ── */
type Pal = { core: string; mid: string; edge: string; shadow: string; rim: string };
const PAL: Record<Background, Pal> = {
  "saffron-rose": { core: "#a13060", mid: "#c4706e", edge: "#f1c480", shadow: "#611c35", rim: "#ffe8b7" },
  dusk: { core: "#1c273e", mid: "#4a649c", edge: "#c8bfcc", shadow: "#11115b", rim: "#e8effc" },
  dawn: { core: "#ab4b0f", mid: "#f57613", edge: "#faac57", shadow: "#682906", rim: "#fff0cf" },
  "indigo-glow": { core: "#3333cc", mid: "#7c71d0", edge: "#e2b6b7", shadow: "#11115b", rim: "#f9d5e1" },
  night: { core: "#13121e", mid: "#30344a", edge: "#899bd2", shadow: "#000000", rim: "#d2dff9" },
  olive: { core: "#486523", mid: "#72842a", edge: "#c2a12d", shadow: "#263d0e", rim: "#ffe8b7" },
  meadow: { core: "#79af3f", mid: "#a7cf97", edge: "#b6cce1", shadow: "#385418", rim: "#ffffff" },
  spring: { core: "#98c659", mid: "#d9dfb3", edge: "#f2f6e8", shadow: "#496d21", rim: "#ffffff" },
  "lavender-dusk": { core: "#5957c4", mid: "#aca1cd", edge: "#f1f4e9", shadow: "#212191", rim: "#ffffff" },
  plain: { core: "#3333cc", mid: "#a7c0f1", edge: "#e8effc", shadow: "#212191", rim: "#ffffff" },
};
/* Single-shape glow: inside = a deeper/lighter take on the ground; the edge glows inward in a contrasting tone (Sarvam's Knowledge Fabric / DiarBench). */
const GLOW: Record<Background, { top: string; bottom: string; glow: string }> = {
  "saffron-rose": { top: "#c4706e", bottom: "#a13060", glow: "#f1c480" },
  dusk: { top: "#314b82", bottom: "#17191a", glow: "#fa9b43" },
  dawn: { top: "#f57613", bottom: "#ab4b0f", glow: "#fff0cf" },
  "indigo-glow": { top: "#554dc9", bottom: "#3333cc", glow: "#fabea3" },
  night: { top: "#30344a", bottom: "#13121e", glow: "#899bd2" },
  olive: { top: "#6a952f", bottom: "#3a5520", glow: "#d9a92a" },
  meadow: { top: "#84c040", bottom: "#cde4c6", glow: "#b0c6ef" },
  spring: { top: "#e4e5c6", bottom: "#a6cb6c", glow: "#ffffff" },
  "lavender-dusk": { top: "#efefe3", bottom: "#aca1cd", glow: "#5957c4" },
  plain: { top: "#e8effc", bottom: "#d2dff9", glow: "#6a88e2" },
};
const LIGHT_INSIDE = new Set<Background>(["meadow", "spring", "lavender-dusk", "plain"]);

const bgClass = (b: Background) => (b === "plain" ? "" : `sr-gradient-${b}`);

type Geom = { d: string; width: number; height: number };
const place = (d: string, s: number, tx: number, ty: number) => { let i = 0; return d.replace(/-?\d+(\.\d+)?/g, (m) => String(+((i++ % 2 === 0 ? +m * s + tx : +m * s + ty).toFixed(2)))); };
type Rect = { x: number; y: number; w: number; h: number };

/** Place a path with uniform scale s (never stretched). */
const fitPath = (g: Geom, s: number, x: number, y: number) => place(g.d, s, x, y);
/** Densely sampled boundary of a placed path (M/L/C/Q/Z): every segment, including long straight sides. */
const pts = (d: string) => {
  const out: [number, number][] = []; let cur: [number, number] = [0, 0], start: [number, number] = [0, 0];
  const toks = d.match(/[MLCQZ]|-?\d+(?:\.\d+)?/g) ?? []; let i = 0, cmd = "M";
  const num = () => +toks[i++];
  const line = (a: [number, number], b: [number, number]) => { for (let k = 1; k <= 24; k++) out.push([a[0] + ((b[0] - a[0]) * k) / 24, a[1] + ((b[1] - a[1]) * k) / 24]); };
  while (i < toks.length) {
    if (/[MLCQZ]/.test(toks[i])) cmd = toks[i++];
    if (cmd === "M") { cur = [num(), num()]; start = cur; out.push(cur); cmd = "L"; }
    else if (cmd === "L") { const p: [number, number] = [num(), num()]; line(cur, p); cur = p; }
    else if (cmd === "C") { const c1 = [num(), num()], c2 = [num(), num()], p: [number, number] = [num(), num()];
      for (let k = 1; k <= 24; k++) { const u = k / 24, v = 1 - u; out.push([v * v * v * cur[0] + 3 * v * v * u * c1[0] + 3 * v * u * u * c2[0] + u * u * u * p[0], v * v * v * cur[1] + 3 * v * v * u * c1[1] + 3 * v * u * u * c2[1] + u * u * u * p[1]]); } cur = p; }
    else if (cmd === "Q") { const c = [num(), num()], p: [number, number] = [num(), num()];
      for (let k = 1; k <= 24; k++) { const u = k / 24, v = 1 - u; out.push([v * v * cur[0] + 2 * v * u * c[0] + u * u * p[0], v * v * cur[1] + 2 * v * u * c[1] + u * u * p[1]]); } cur = p; }
    else if (cmd === "Z") { line(cur, start); cur = start; }
    else i++;
  }
  return out;
};
/** Largest centred rectangle of aspect r (w/h) inside the shape, from the boundary points around (cx, cy). */
function innerRect(d: string, cx: number, cy: number, r: number): Rect {
  const P = pts(d);
  let lo = 0, hi = 4000;
  for (let it = 0; it < 30; it++) {
    const h = (lo + hi) / 2, w = h * r;
    const ok = !P.some(([x, y]) => Math.abs(x - cx) < w / 2 && Math.abs(y - cy) < h / 2);
    if (ok) lo = h; else hi = h;
  }
  const h = lo * 0.94, w = h * r;
  return { x: cx - w / 2, y: cy - h / 2, w, h };
}

/** Carved stack by TRUE OFFSETS: every ring is the base shape grown by the same distance everywhere
 *  (shape + stroke of width 2·offset, round joins), so spacing is even on points, curves and flats. */
function Carved({ id, d, W, H, cx, cy, step, count, pal, inner }: {
  id: string; d: string; W: number; H: number; cx: number; cy: number; step: number; count: number; pal: Pal; inner: "glow" | "window";
}) {
  const k = (s: string) => `${s}-${id}`;
  const rings = Array.from({ length: count }, (_, i) => count - 1 - i);
  return (
    <svg width={W} height={H} style={{ position: "absolute", inset: 0 }} aria-hidden>
      <defs>
        {rings.map((i) => (
          <radialGradient key={i} id={k(`g${i}`)} gradientUnits="userSpaceOnUse" cx={cx} cy={cy} r={Math.max(W, H) * (0.42 + i * 0.07)}>
            <stop offset="0" stopColor={pal.core} /><stop offset="0.55" stopColor={pal.mid} /><stop offset="1" stopColor={pal.edge} />
          </radialGradient>
        ))}
        <radialGradient id={k("lit")} gradientUnits="userSpaceOnUse" cx={cx} cy={cy} r={Math.max(W, H) * 0.35}>
          <stop offset="0" stopColor={inner === "window" ? "#fffbf3" : "#ffffff"} stopOpacity={inner === "window" ? 1 : 0.18} />
          <stop offset="1" stopColor={inner === "window" ? "#f2e4c2" : "#ffffff"} stopOpacity={inner === "window" ? 1 : 0} />
        </radialGradient>
        <filter id={k("cast")} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor={pal.shadow} floodOpacity="0.4" />
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor={pal.shadow} floodOpacity="0.22" />
        </filter>
      </defs>
      {rings.map((i) => (
        <g key={i} filter={`url(#${k("cast")})`}>
          <path d={d} fill={`url(#${k(`g${i}`)})`} stroke={`url(#${k(`g${i}`)})`} strokeWidth={i * step * 2} strokeLinejoin="round" />
          {/* crisp rim exactly on the ring's outer edge */}
          {i > 0 && <path d={d} fill="none" stroke={pal.rim} strokeOpacity={0.5} strokeWidth={1.25} transform="" style={{ display: "none" }} />}
        </g>
      ))}
      {/* rims: draw the outline of each offset as a thin line (stroke of width 2·off+1.25 minus 2·off−1.25 via mask-free approach: outline the base for the inner, rings use their own edge) */}
      <path d={d} fill={`url(#${k("lit")})`} />
      <path d={d} fill="none" stroke={pal.rim} strokeOpacity={0.6} strokeWidth={1.25} />
    </svg>
  );
}

/** Device layer + the opening (where the text block goes). */
function renderDevice(spec: BannerSpec, f: BannerFormat, id: string): { layer: ReactNode; open: Rect; lightInside: boolean } {
  const F = FORMATS[f], land = f === "landscape";
  const pal = PAL[spec.background];
  const safe: Rect = { x: F.M, y: F.M, w: F.W - F.M * 2, h: F.H - F.M * 2 };
  /** Text-holding shapes, proportioned for the format (aspect = h/w): tall-ish on portrait, square on square, tall + cropped on landscape. */
  const textShape = (name: string): Geom => {
    const a = land ? 1.12 : f === "square" ? 1.0 : 1.16;
    switch (name) {
      case "Onion lantern": return gatewayPath({ aspect: a * 1.08, top: "ogee", bottom: "mirror", shoulder: 0.3, lobes: 0, lobeDepth: 0, waist: 0, notch: 0, crown: 5, dome: 1, frame: 0 });
      case "Cusped window": return medallionPath({ fold: 4, feature: "point", depth: 7, width: 0.28, vertex: "none", vertexDepth: 0, base: "polygon", aspect: a, frame: 0 });
      case "Quatrefoil": return medallionPath({ ...MEDALLION_PRESETS["Quatrefoil"], aspect: a, frame: 0 });
      case "Ogee cross": return medallionPath({ ...MEDALLION_PRESETS["Ogee cross"], depth: 10, aspect: a, frame: 0 });
      default: return medallionPath({ ...MEDALLION_PRESETS["Scalloped medallion"], aspect: a, frame: 0 });
    }
  };
  const shapeGeom = (name: string, gatewayBottom: "flat" | "mirror") => ((TEXT_SHAPES as readonly string[]).includes(name) ? textShape(name) : name in MEDALLION_PRESETS ? medallionPath(MEDALLION_PRESETS[name]) : gatewayPath({ ...(GATEWAY_PRESETS[name] ?? GATEWAY_PRESETS["Domed door"]), bottom: gatewayBottom, notch: 0, frame: 0 }));
  const textAspect = spec.primaryIsNumber ? (land ? 1.5 : 1.05) : land ? 2.2 : f === "square" ? 1.15 : 0.95;

  if (spec.device === "gateway-carved" || spec.device === "gateway-window" || spec.device === "gateway-echo") {
    const window = spec.device === "gateway-window";
    // Proportioned per format (aspect is a design parameter, not a stretch): wide arches for wide frames.
    const name = spec.shape ?? (window ? "Framed jharokha" : "Domed door");
    const preset = GATEWAY_PRESETS[name] ?? GATEWAY_PRESETS["Domed door"];
    const g = gatewayPath({ ...preset, bottom: "flat", notch: 0, frame: 0, aspect: land ? 0.82 : f === "square" ? 1.02 : 1.24 });
    // Sized by width so the opening is generous; anchored to the bottom edge.
    const s = Math.min((land ? F.W * 0.5 : F.W * 0.66) / g.width, (F.H * 0.86) / g.height), w = g.width * s, h = g.height * s;
    const x = (F.W - w) / 2, y = F.H - h + 2;
    const d = fitPath(g, s, x, y);
    const open = innerRect(d, F.W / 2, y + h * (land ? 0.6 : 0.64), textAspect);
    if (spec.device === "gateway-echo") {
      const layer = (
        <svg width={F.W} height={F.H} style={{ position: "absolute", inset: 0 }} aria-hidden>
          {[4, 3, 2, 1, 0].map((i) => <path key={i} d={d} fill={i === 0 ? "rgb(255 255 255 / 0.08)" : "none"} stroke="#fff" strokeOpacity={0.62 - i * 0.11} strokeWidth={i === 0 ? 1.5 : 1.5} transform={`translate(${F.W / 2} ${F.H}) scale(${1 + i * (land ? 0.2 : 0.22)}) translate(${-F.W / 2} ${-F.H})`} vectorEffect="non-scaling-stroke" />)}
        </svg>
      );
      return { layer, open, lightInside: false };
    }
    return { layer: <Carved id={id} d={d} W={F.W} H={F.H} cx={F.W / 2} cy={F.H} step={Math.min(w, h) * 0.05} count={window ? 3 : 4} pal={pal} inner={window ? "window" : "glow"} />, open, lightInside: window };
  }
  if (spec.device === "medallion-carved" || spec.device === "medallion-glow") {
    const name = spec.shape ?? (spec.device === "medallion-glow" ? "Lantern medallion" : "Scalloped medallion");
    const g = shapeGeom(name, "mirror");
    const glow = spec.device === "medallion-glow";
    // Uniform scale. Glow: one shape that fills the frame; carved: a base shape that leaves room for the rings.
    // Glow: one shape that fills the frame (bleeds on landscape). Carved: a base that leaves room for 4 even rings.
    const s = glow ? (land ? (F.H * 1.12) / g.height : Math.min((F.W * 0.9) / g.width, (F.H * 0.94) / g.height))
                   : (land ? (F.H * 0.66) / g.height : Math.min((F.W * 0.6) / g.width, (F.H * 0.6) / g.height));
    const w = g.width * s, h = g.height * s;
    const cx = F.W / 2, cy = F.H / 2;
    const d = fitPath(g, s, cx - w / 2, cy - h / 2);
    const open = innerRect(d, cx, cy, textAspect);
    if (!glow) return { layer: <Carved id={id} d={d} W={F.W} H={F.H} cx={cx} cy={cy} step={Math.min(w, h) * 0.05} count={4} pal={pal} inner="glow" />, open, lightInside: false };
    const G = GLOW[spec.background], k = (sfx: string) => `${sfx}-${id}`, edge = Math.min(w, h);
    const layer = (
      <svg width={F.W} height={F.H} style={{ position: "absolute", inset: 0 }} aria-hidden>
        <defs>
          <linearGradient id={k("in")} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={G.top} /><stop offset="1" stopColor={G.bottom} /></linearGradient>
          <clipPath id={k("clip")}><path d={d} /></clipPath>
          <filter id={k("soft")} x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation={edge * 0.065} /></filter>
          <filter id={k("rim")} x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation={edge * 0.005} /></filter>
          <filter id={k("out")} x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation={edge * 0.035} /></filter>
        </defs>
        <path d={d} fill="none" stroke={G.glow} strokeOpacity={0.25} strokeWidth={edge * 0.04} filter={`url(#${k("out")})`} />
        <path d={d} fill={`url(#${k("in")})`} />
        <g clipPath={`url(#${k("clip")})`}>
          <path d={d} fill="none" stroke={G.glow} strokeWidth={edge * 0.17} strokeOpacity={0.82} filter={`url(#${k("soft")})`} />
          <path d={d} fill="none" stroke={G.glow} strokeWidth={edge * 0.016} strokeOpacity={0.85} filter={`url(#${k("rim")})`} />
        </g>
      </svg>
    );
    // Keep the text clear of the glow band: shrink the opening by the glow depth.
    const inset = edge * 0.045;
    return { layer, open: { x: open.x + inset, y: open.y + inset, w: open.w - inset * 2, h: open.h - inset * 2 }, lightInside: LIGHT_INSIDE.has(spec.background) };
  }
  if (spec.device === "cloud") {
    const cloud = cloudSVG(medallionPath(MEDALLION_PRESETS["Scalloped medallion"]), "#f7efed", 0.032);
    const box: CSSProperties = land ? { left: 110, right: 110, top: -20, bottom: -50 } : f === "portrait" ? { left: -30, right: -30, top: 250, bottom: 70 } : { left: 20, right: 20, top: 120, bottom: 0 };
    const html = cloud.replace("<svg ", `<svg width="100%" height="100%" ${land ? 'preserveAspectRatio="none" ' : ""}`).replace('preserveAspectRatio="xMidYMid meet"', land ? "" : 'preserveAspectRatio="xMidYMid meet"');
    return { layer: <div aria-hidden style={{ position: "absolute", ...box }} dangerouslySetInnerHTML={{ __html: html }} />, open: { ...safe, y: safe.y + 60, h: safe.h - 60 }, lightInside: true };
  }
  if (spec.device === "gloss") {
    // A mirrored cluster of glossy studio shapes (Sarvam's waitlist post): below the text on portrait/square, flanking on landscape.
    const items: [string, GlossPalette, number, number, number][] = [
      ["m:Scalloped medallion", "periwinkle", 0, 0, 1], ["f:Rosette", "rose", -0.55, 0.42, 0.55], ["f:Chakra flower", "indigo", 0.62, 0.5, 0.48],
      ["m:Ogee cross", "leaf", -0.2, 0.86, 0.42], ["f:Lotus", "saffron", 0.5, -0.38, 0.36],
    ];
    const unit = land ? 130 : 200;
    const sides = [-1, 1];
    const cx0 = land ? 200 : F.W / 2 - 230, cy0 = land ? F.H / 2 + 10 : F.H * (f === "portrait" ? 0.7 : 0.72);
    const els = sides.flatMap((side, si) => items.map(([key, palette, dx, dy, s], j) => {
      const [kind, name] = key.split(":");
      const geom = kind === "m" ? medallionPath(MEDALLION_PRESETS[name]) : flowerPath(FLOWER_PRESETS[name]);
      const size = unit * s * 1.2;
      const cx = (land ? (side < 0 ? cx0 : F.W - cx0) : F.W / 2 + side * 250) + side * dx * unit;
      const cy = cy0 + dy * unit;
      const html = glossSVG(geom, palette, `${id}-g${si}${j}`).replace("<svg ", '<svg width="100%" height="100%" ');
      return <div key={`${si}-${j}`} aria-hidden style={{ position: "absolute", left: cx - size / 2, top: cy - size / 2, width: size, height: size }} dangerouslySetInnerHTML={{ __html: html }} />;
    }));
    const open: Rect = land ? { x: 360, y: F.M, w: F.W - 720, h: F.H - F.M * 2 } : { x: F.M, y: F.M + 60, w: safe.w, h: cy0 - unit * 0.75 - F.M - 60 };
    return { layer: <>{els}</>, open, lightInside: true };
  }
  return { layer: null, open: { ...safe, y: safe.y + 40, h: safe.h - 40 }, lightInside: !DARK_BG.has(spec.background) };
}

function Mark({ tone, width, style }: { tone: "black" | "white"; width: number; style?: CSSProperties }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img data-qa="mark" src={`/brand/sarvam-wordmark-${tone}.svg`} alt="Sarvam" style={{ width, height: "auto", display: "block", ...style }} />;
}

const SECONDARY_FILL: Record<Treatment, TextFill> = { white: "white", gold: "goldMute", indigo: "indigo", ink: "ink" };

export function Banner({ spec, format, id }: { spec: BannerSpec; format: BannerFormat; id: string }) {
  const F = FORMATS[format], land = format === "landscape";
  const { layer, open, lightInside } = renderDevice(spec, format, id);
  const onLight = lightInside || spec.treatment === "ink" || spec.treatment === "indigo";
  const markW = land ? 96 : 124;
  const num = !!spec.primaryIsNumber, sans = spec.titleStyle === "sans";
  const base = land ? { p: num ? 150 : sans ? 64 : 70, s: num ? 30 : 24, gap: 16 } : format === "square" ? { p: num ? 230 : sans ? 88 : 98, s: num ? 44 : 32, gap: 24 } : { p: num ? 250 : sans ? 96 : 108, s: num ? 48 : 34, gap: 28 };
  // Fit: shrink type until the block fits the opening (width via wrapping, height via measured lines). Never below 60%.
  const pFont = sans ? "text" : "display", pWeight = sans ? 600 : 400;
  const blockH = (k: number) => {
    const ps = base.p * k, ss = base.s * k;
    const cw = ps * charW(pFont, pWeight, spec.primary);
    const plines = balanceLines(spec.primary, Math.max(4, Math.floor(open.w / cw)));
    const pl = Math.max(...plines.map((l) => l.length)) * cw > open.w * 0.98 ? 99 : plines.length;   // a word wider than the opening → too big
    const sl = spec.secondary ? balanceLines(spec.secondary, Math.max(6, Math.floor((open.w * 0.9) / (ss * charW(num ? "display" : "text", 400, spec.secondary))))).length : 0;
    const markH = spec.mark === "inside" ? (land ? 16 : 20) + base.gap * 0.7 : 0;
    return markH + pl * ps * 1.2 + (sl ? base.gap + sl * ss * 1.4 : 0);
  };
  let k = 1; while (k > 0.42 && blockH(k) > open.h * 0.92) k -= 0.03;
  const S = { p: Math.round(base.p * k), s: Math.round(Math.max(base.s * k, land ? 20 : 28)), gap: base.gap };
  const primary = (
    <StyledText data-qa="text" id={`${id}-p`} text={spec.primary} width={open.w} size={S.p} fill={spec.treatment}
      font={sans ? "text" : "display"} weight={sans ? 600 : 400} tracking={num ? -0.05 : sans ? -0.035 : -0.04} leading={sans ? 1.06 : 1.04} />
  );
  // Secondary: a number gets an elegant serif label; a headline gets a calm sans line.
  const secondary = spec.secondary && (num
    ? <StyledText data-qa="text" id={`${id}-s`} text={spec.secondary} width={open.w * 0.9} size={S.s} fill={onLight ? (spec.secondaryPlace === "above" ? SECONDARY_FILL[spec.treatment] : "ink") : "white"} tracking={-0.02} leading={1.15} />
    : <p data-qa="text" style={{ fontFamily: "var(--font-text)", fontSize: S.s * (land ? 1 : 0.94), lineHeight: 1.38, color: onLight ? "var(--color-tx-secondary)" : "rgb(255 255 255 / 0.92)", margin: 0, maxWidth: open.w * 0.92, textWrap: "balance" }}>{spec.secondary}</p>);
  const markTone = DARK_BG.has(spec.background) ? "white" : "black";
  return (
    <div data-banner={format} style={{ position: "relative", width: F.W, height: F.H, overflow: "hidden", background: spec.background === "plain" ? "var(--color-sf)" : `var(--gradient-${spec.background})` }}>
      {layer}
      {/* Seamless grain: one generated noise layer over the whole canvas (a repeated tile shows seams when scaled) */}
      <svg width={F.W} height={F.H} style={{ position: "absolute", inset: 0, mixBlendMode: "overlay", pointerEvents: "none" }} aria-hidden>
        <filter id={`grain-${id}`}><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="noStitch" /><feColorMatrix values="1 0 0 0 0  1 0 0 0 0  1 0 0 0 0  0 0 0 0.2 0" /></filter>
        <rect width={F.W} height={F.H} filter={`url(#grain-${id})`} />
      </svg>
      {spec.mark === "top" && <Mark tone={markTone} width={markW} style={{ position: "absolute", top: F.M, left: (F.W - markW) / 2 }} />}
      {spec.mark === "bottom" && <Mark tone={markTone} width={markW} style={{ position: "absolute", bottom: land ? 36 : F.M, left: (F.W - markW) / 2 }} />}
      <div data-qa="open" style={{ position: "absolute", left: open.x, top: open.y, width: open.w, height: open.h, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: S.gap, textAlign: "center" }}>
        {spec.mark === "inside" && <Mark tone={onLight ? "black" : "white"} width={markW} style={{ marginBottom: S.gap * 0.7, opacity: onLight ? 0.9 : 1 }} />}
        {spec.secondaryPlace === "above" && secondary}
        {primary}
        {spec.secondaryPlace !== "above" && secondary}
      </div>
    </div>
  );
}
