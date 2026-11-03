// Banner composer: a banner = background + device + text treatment + content. No prompts; every part is a choice.
// Situations are presets of these choices. Spec: design-system/recipes/banner-builder.md.
import { memo, type CSSProperties, type ReactNode } from "react";
import {
  DIVIDER_PRESETS, FLOWER_PRESETS, GATEWAY_PRESETS, MEDALLION_PRESETS, MOTIF_PRESETS, dividerPaths, cloudSVG, flowerPath, gatewayPath, glossSVG, medallionPath, motifPaths,
  type GatewayParams, type GlossPalette,
} from "@/lib/shapes";
import { StyledText, balanceLines, charW, type TextFill } from "./StyledText";
import { MockPlan, MockResearch, MockReview } from "./mocks";
import { FORMATS, type BannerFormat } from "./banners";
import { BarChart3, BookOpen, CalendarClock, CircleCheck, Globe, Inbox, Megaphone, Plug, Search, ShieldCheck, Sparkles, Target, UserRound } from "@/components/icons";

/* ── Vocabulary ── */
export type Background = "saffron-rose" | "dusk" | "dawn" | "indigo-glow" | "night" | "olive" | "meadow" | "spring" | "lavender-dusk" | "plain";
export type Device = "medallion-glow" | "gateway-carved" | "medallion-carved" | "gateway-window" | "gateway-echo" | "gloss" | "emblem" | "arch-window" | "script-mandala" | "spectrum" | "plain";
export type Treatment = "white" | "gold" | "indigo" | "ink";
export type MarkPlace = "inside" | "top" | "bottom" | "none";
export type Situation = "launch" | "announcement" | "milestone" | "funding" | "event" | "story" | "partnership" | "program" | "capability" | "product" | "mission" | "spectrum" | "sunrise";
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
  layout?: Layout;                 // centred (text inside the device) · split · stacked. Rearranges per format.
  partner?: string;                // partner lockup: "sarvam · PARTNER" (replaces the plain wordmark)
  logo?: "wordmark" | "logomark";  // logomark = the official lotus symbol, used alone (logo.md: never beside the wordmark)
  card?: "plan" | "research" | "review";   // product moment shown inside the device (split / stacked only); arch-window shows it through the arch
  icon?: EmblemIcon;               // emblem device: the one object that stands for the subject
  divider?: string;                // a /studio divider preset ABOVE the headline (always the first thing in the text block), drawn in the spectrum
  horizon?: "top" | "bottom";      // the hero's Sun gradient as a horizon from one edge, reaching about half way
  ornament?: Ornament;             // spectrum device: one SOLID shape in the spectrum (supersedes the line rosettes)
  place?: "corner" | "rise" | "center" | "small";   // where the ornament sits; the text takes the space it leaves
  petals?: number;                 // lotus / petal: petal count (corner/center: full flower; rise: an upward fan)
  ornamentTone?: "spectrum" | "white";   // white = tone-on-tone on a gradient ground
  rosetteSolid?: boolean;          // spectrum device, lens: filled petals with a base → tip gradient instead of lines
  rosette?: "circles" | "lobes" | "lens" | "orbits" | "rings";   // spectrum device: the corner rosette (circles = the logomark's own construction)
};
/** Emblem icons: Nucleo Core outline only (components.md §3). One object per idea. */
export const EMBLEM_ICONS = {
  shield: ShieldCheck, plug: Plug, check: CircleCheck, calendar: CalendarClock, search: Search, globe: Globe, inbox: Inbox,
  megaphone: Megaphone, target: Target, chart: BarChart3, book: BookOpen, sparkle: Sparkles, person: UserRound,
} as const;
export type EmblemIcon = keyof typeof EMBLEM_ICONS;
export type Layout = "centered" | "split" | "stacked" | "editorial";

export const BACKGROUNDS: Background[] = ["saffron-rose", "dusk", "dawn", "indigo-glow", "night", "olive", "meadow", "spring", "lavender-dusk", "plain"];
export const DEVICES: Device[] = ["medallion-glow", "spectrum", "emblem", "arch-window", "script-mandala", "gateway-echo", "gateway-carved", "medallion-carved", "gloss", "plain"];
export const TREATMENTS: Treatment[] = ["white", "gold", "indigo", "ink"];
export const DARK_BG = new Set<Background>(["saffron-rose", "dusk", "indigo-glow", "night", "olive"]);
/** Shapes curated for holding text (generator params; proportions are set per format, never stretched). */
export const TEXT_SHAPES = ["Onion lantern", "Cusped window", "Quatrefoil", "Scalloped medallion", "Ogee cross"] as const;
export const shapesFor = (d: Device) => (d === "medallion-glow" || d === "medallion-carved" || d === "emblem" ? [...TEXT_SHAPES] : d.startsWith("gateway") ? Object.keys(GATEWAY_PRESETS) : d === "arch-window" ? ARCH_SHAPES : []);
export const ARCH_SHAPES = ["Mihrab", "Domed door"];
/** Devices that hold no text: the layout puts text beside them (split on landscape, stacked on portrait). */
const BESIDE = new Set<Device>(["emblem", "arch-window"]);
/** Devices that use the editorial layout: text set left, anchored low, wordmark top-left. */
const EDITORIAL = new Set<Device>(["spectrum"]);

export const SITUATIONS: Record<Situation, BannerSpec> = {
  launch: { situation: "launch", background: "saffron-rose", device: "medallion-glow", shape: "Onion lantern", treatment: "white", mark: "inside", titleStyle: "sans", primary: "Indus Cowork", secondary: "An AI teammate that finishes the work", secondaryPlace: "below" },
  announcement: { situation: "announcement", background: "dusk", device: "gateway-echo", shape: "Mihrab", treatment: "white", mark: "inside", titleStyle: "serif", primary: "Message a teammate like a colleague", secondary: "Indus Cowork, in Slack and Indus Chat", secondaryPlace: "below" },
  milestone: { situation: "milestone", background: "night", device: "medallion-glow", shape: "Scalloped medallion", treatment: "gold", mark: "bottom", titleStyle: "serif", primary: "100+", primaryIsNumber: true, secondary: "apps your teammates can work in", secondaryPlace: "below" },
  funding: { situation: "funding", background: "olive", device: "medallion-glow", shape: "Onion lantern", treatment: "gold", mark: "inside", titleStyle: "serif", primary: "$300 Million", primaryIsNumber: true, secondary: "Announcing Series B", secondaryPlace: "above" },
  event: { situation: "event", background: "spring", device: "gloss", treatment: "indigo", mark: "top", titleStyle: "serif", primary: "Build your first teammate", secondary: "A live Indus Cowork session", secondaryPlace: "below" },
  story: { situation: "story", background: "lavender-dusk", device: "medallion-glow", shape: "Scalloped medallion", treatment: "ink", mark: "inside", titleStyle: "serif", primary: "Your newest colleague lives in Slack." },
  partnership: { situation: "partnership", background: "lavender-dusk", device: "medallion-glow", shape: "Ogee cross", treatment: "ink", mark: "inside", partner: "Partner", titleStyle: "serif", primary: "Shipping faster with Indus Cowork" },
  program: { situation: "program", layout: "split", background: "plain", device: "gloss", treatment: "ink", mark: "inside", titleStyle: "serif", primary: "Indus Cowork early access", secondary: "Talk to us about your team's workflows", secondaryPlace: "below" },
  capability: { situation: "capability", background: "indigo-glow", device: "emblem", shape: "Scalloped medallion", icon: "shield", treatment: "white", mark: "inside", titleStyle: "serif", primary: "Every task leaves a trail", secondary: "Audit logs, SSO and role-based access", secondaryPlace: "below" },
  product: { situation: "product", background: "dusk", device: "arch-window", shape: "Mihrab", treatment: "white", mark: "inside", titleStyle: "serif", primary: "It plans the work before it starts", secondary: "Every request becomes a to-do list", secondaryPlace: "below" },
  spectrum: { situation: "spectrum", background: "plain", device: "spectrum", rosette: "lens", rosetteSolid: true, treatment: "ink", mark: "top", titleStyle: "serif", primary: "Work that runs on schedule", secondary: "Indus Cowork teammates run scheduled tasks", secondaryPlace: "below" },
  sunrise: { situation: "sunrise", background: "plain", device: "spectrum", ornament: "lotus", place: "rise", petals: 7, horizon: "bottom", divider: "Scroll fan", treatment: "ink", mark: "top", titleStyle: "serif", primary: "Research, built in", secondary: "Indus Cowork searches the web for you", secondaryPlace: "below" },
  mission: { situation: "mission", background: "olive", device: "script-mandala", treatment: "white", mark: "inside", titleStyle: "serif", primary: "AI for all from India" },
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

/** Re-box a shape to its drawn outline: generator boxes can carry empty margin (e.g. Cusped window), which made shapes
 *  render smaller than the padding rule allows. Translation only, never a scale. */
const tight = (g: Geom): Geom => {
  const P = pts(g.d), xs = P.map((p) => p[0]), ys = P.map((p) => p[1]);
  const x0 = Math.min(...xs), y0 = Math.min(...ys);
  return { d: place(g.d, 1, -x0, -y0), width: Math.max(...xs) - x0, height: Math.max(...ys) - y0 };
};
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
    <svg width={W} height={H} style={{ position: "absolute", inset: 0, overflow: "visible" }} aria-hidden>
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
type Frame = { W: number; H: number; M: number };
/** fit(r): the opening at text-box aspect r (w/h). Lets the layout try a taller box when a 3-part stack (mark, headline, line) needs height. */
type DeviceOut = { layer: ReactNode; open: Rect; lightInside: boolean; fit?: (r: number) => Rect; textAlign?: "left" | "center"; textJustify?: "flex-start" | "center" | "flex-end" };
function textAspectFor(spec: BannerSpec, f: BannerFormat) {
  const land = f === "landscape";
  return spec.primaryIsNumber ? (land ? 1.5 : 1.05) : land ? 2.2 : f === "square" ? 1.15 : 0.95;
}
function renderDevice(spec: BannerSpec, F: Frame, id: string, beside = false, _format?: BannerFormat): DeviceOut {
  const r0 = F.W / F.H, f: BannerFormat = r0 > 1.3 ? "landscape" : r0 > 0.85 ? "square" : "portrait", land = f === "landscape";
  const pal = PAL[spec.background];
  const safe: Rect = { x: F.M, y: F.M, w: F.W - F.M * 2, h: F.H - F.M * 2 };
  /** Text-holding shapes, proportioned for the format (aspect = h/w): tall-ish on portrait, square on square, tall + cropped on landscape. */
  const textShape = (name: string): Geom => {
    const a = land ? 1.12 : f === "square" ? 1.0 : 1.16;
    switch (name) {
      case "Onion lantern": return gatewayPath({ aspect: land ? 0.74 : a * 1.08, top: "ogee", bottom: "mirror", shoulder: land ? 0.34 : 0.3, lobes: 0, lobeDepth: 0, waist: 0, notch: 0, crown: 5, dome: 1, frame: 0 });
      // Medallions keep their true 1:1 proportions in every format (an "aspect" here would be a vertical stretch).
      case "Cusped window": return medallionPath({ fold: 4, feature: "point", depth: 7, width: 0.28, vertex: "none", vertexDepth: 0, base: "polygon", aspect: 1, frame: 0 });
      case "Quatrefoil": return medallionPath({ ...MEDALLION_PRESETS["Quatrefoil"], aspect: 1, frame: 0 });
      case "Ogee cross": return medallionPath({ ...MEDALLION_PRESETS["Ogee cross"], depth: 10, aspect: 1, frame: 0 });
      default: return medallionPath({ ...MEDALLION_PRESETS["Scalloped medallion"], aspect: 1, frame: 0 });
    }
  };
  const shapeGeom = (name: string, gatewayBottom: "flat" | "mirror") => ((TEXT_SHAPES as readonly string[]).includes(name) ? textShape(name) : name in MEDALLION_PRESETS ? medallionPath(MEDALLION_PRESETS[name]) : gatewayPath({ ...(GATEWAY_PRESETS[name] ?? GATEWAY_PRESETS["Domed door"]), bottom: gatewayBottom, notch: 0, frame: 0 }));
  const textAspect = textAspectFor(spec, f);

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
        <svg width={F.W} height={F.H} style={{ position: "absolute", inset: 0, overflow: "visible" }} aria-hidden>
          {[4, 3, 2, 1, 0].map((i) => <path key={i} d={d} fill={i === 0 ? "rgb(255 255 255 / 0.08)" : "none"} stroke="#fff" strokeOpacity={0.62 - i * 0.11} strokeWidth={i === 0 ? 1.5 : 1.5} transform={`translate(${F.W / 2} ${F.H}) scale(${1 + i * (land ? 0.2 : 0.22)}) translate(${-F.W / 2} ${-F.H})`} vectorEffect="non-scaling-stroke" />)}
        </svg>
      );
      return { layer, open, lightInside: false, fit: (r) => innerRect(d, F.W / 2, y + h * (land ? 0.6 : 0.64), r) };
    }
    return { layer: <Carved id={id} d={d} W={F.W} H={F.H} cx={F.W / 2} cy={F.H} step={Math.min(w, h) * 0.05} count={window ? 3 : 4} pal={pal} inner={window ? "window" : "glow"} />, open, lightInside: window, fit: (r) => innerRect(d, F.W / 2, y + h * (land ? 0.6 : 0.64), r) };
  }
  if (spec.device === "medallion-carved" || spec.device === "medallion-glow") {
    const name = spec.shape ?? (spec.device === "medallion-glow" ? "Lantern medallion" : "Scalloped medallion");
    const g = tight(shapeGeom(name, "mirror"));   // sized by its real outline, not its generator box
    const glow = spec.device === "medallion-glow";
    // Uniform scale. Glow: one shape that fills the frame; carved: a base shape that leaves room for the rings.
    // Glow: one shape that fills the frame (bleeds on landscape). Carved: a base that leaves room for 4 even rings.
    // Padding rule: ≥ 1.5·M clear on both sides always; on portrait the shape sits fully inside (≥ M top and bottom); landscape may bleed vertically only.
    const sideMax = (F.W - F.M * 3) / g.width;
    const s = glow ? (land ? Math.min(sideMax, Math.max((F.W * 0.78) / g.width, (F.H * 1.22) / g.height)) : Math.min(sideMax, (F.H - F.M * 2) / g.height))
                   : (land ? Math.min((F.W * 0.5) / g.width, (F.H * 0.86) / g.height) : Math.min((F.W * 0.66) / g.width, (F.H * 0.62) / g.height));
    const w = g.width * s, h = g.height * s;
    const cx = F.W / 2, cy = F.H / 2;
    const d = fitPath(g, s, cx - w / 2, cy - h / 2);
    const open = innerRect(d, cx, cy, textAspect);
    if (!glow) return { layer: <Carved id={id} d={d} W={F.W} H={F.H} cx={cx} cy={cy} step={Math.min(w, h) * 0.1} count={4} pal={pal} inner="glow" />, open, lightInside: false, fit: (r) => innerRect(d, cx, cy, r) };
    const G = GLOW[spec.background], k = (sfx: string) => `${sfx}-${id}`, edge = Math.min(w, h);
    const layer = (
      <svg width={F.W} height={F.H} style={{ position: "absolute", inset: 0, overflow: "visible" }} aria-hidden>
        <defs>
          <linearGradient id={k("in")} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={G.top} /><stop offset="1" stopColor={G.bottom} /></linearGradient>
          <clipPath id={k("clip")}><path d={d} /></clipPath>
          <filter id={k("soft")} x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation={edge * 0.035} /></filter>
          <filter id={k("rim")} x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation={edge * 0.005} /></filter>
          <filter id={k("out")} x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation={edge * 0.035} /></filter>
        </defs>
        <path d={d} fill="none" stroke={G.glow} strokeOpacity={0.18} strokeWidth={edge * 0.025} filter={`url(#${k("out")})`} />
        <path d={d} fill={`url(#${k("in")})`} />
        <g clipPath={`url(#${k("clip")})`}>
          <path d={d} fill="none" stroke={G.glow} strokeWidth={edge * 0.1} strokeOpacity={0.85} filter={`url(#${k("soft")})`} />
          <path d={d} fill="none" stroke={G.glow} strokeWidth={edge * 0.012} strokeOpacity={0.9} filter={`url(#${k("rim")})`} />
        </g>
        {/* crisp 1.5px edge line: the silhouette always reads sharp */}
        <path d={d} fill="none" stroke={G.glow} strokeOpacity={0.9} strokeWidth={1.5} />
      </svg>
    );
    // Keep the text clear of the glow band: shrink the opening by the glow depth.
    const inset = edge * 0.03;
    const shrink = (o: Rect): Rect => ({ x: o.x + inset, y: o.y + inset, w: o.w - inset * 2, h: o.h - inset * 2 });
    return { layer, open: shrink(open), lightInside: LIGHT_INSIDE.has(spec.background), fit: (r) => shrink(innerRect(d, cx, cy, r)) };
  }
  if (spec.device === "spectrum") return spectrumDevice(spec, F, id, land);
  if (spec.device === "emblem") return emblemDevice(spec, F, id, textShape(spec.shape ?? "Scalloped medallion"), pal);
  if (spec.device === "arch-window") return archWindowDevice(spec, F, id, pal);
  if (spec.device === "script-mandala") return scriptMandalaDevice(spec, F, id, beside);
  if (spec.device === "gloss") {
    // A mirrored cluster of glossy studio shapes (Sarvam's waitlist post): below the text on portrait/square, flanking on landscape.
    const items: [string, GlossPalette, number, number, number][] = [
      ["m:Scalloped medallion", "periwinkle", 0, 0, 1], ["f:Rosette", "rose", -0.55, 0.42, 0.55], ["f:Chakra flower", "indigo", 0.62, 0.5, 0.48],
      ["m:Ogee cross", "leaf", -0.2, 0.86, 0.42], ["f:Lotus", "saffron", 0.5, -0.38, 0.36],
    ];
    const single = (spec.layout ?? "centered") !== "centered";
    if (single) {
      // One cluster centred in the device area (Sarvam's Startup Program), largest shape at the back.
      const u = Math.min(F.W, F.H) * 0.42, cxs = F.W / 2, cys = F.H / 2;
      const one = items.map(([key, palette, dx, dy, s], j) => {
        const [kind, name] = key.split(":");
        const geom = kind === "m" ? medallionPath(MEDALLION_PRESETS[name]) : flowerPath(FLOWER_PRESETS[name]);
        const size = u * s * 1.5, cx = cxs + dx * u, cy = cys + dy * u;
        const html = glossSVG(geom, palette, `${id}-c${j}`).replace("<svg ", '<svg width="100%" height="100%" ');
        return <div key={j} aria-hidden style={{ position: "absolute", left: cx - size / 2, top: cy - size / 2, width: size, height: size }} dangerouslySetInnerHTML={{ __html: html }} />;
      });
      return { layer: <>{one}</>, open: { x: F.W * 0.2, y: F.H * 0.2, w: F.W * 0.6, h: F.H * 0.6 }, lightInside: true };
    }
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

/* ── Simple devices: one move each (banner-builder.md §7) ── */

/** Sarvam's spectrum, end to end: indigo → lilac → peach → orange [sampled: indigo glow + sun gradients]. */
const SPECTRUM = "linear-gradient(90deg in oklab, #3333cc 0%, #7c71d0 26%, #c2abcc 48%, #fabea3 70%, #fa9b43 86%, #e6651b 100%)";
/** A colour on the brand spectrum, t = 0 (indigo) → 1 (orange). Stops from SPECTRUM, mixed linearly in sRGB. */
const SPECTRUM_STOPS: [number, string][] = [[0, "#3333cc"], [0.26, "#7c71d0"], [0.48, "#b394c6"], [0.7, "#f2a07f"], [0.86, "#fa9b43"], [1, "#e6651b"]];
function spectrumAt(t: number) {
  const i = Math.max(0, SPECTRUM_STOPS.findIndex(([o]) => o >= t) - 1), [o0, a] = SPECTRUM_STOPS[i], [o1, b] = SPECTRUM_STOPS[Math.min(i + 1, SPECTRUM_STOPS.length - 1)];
  const u = o1 === o0 ? 0 : (t - o0) / (o1 - o0), h = (c: string) => [1, 3, 5].map((j) => parseInt(c.slice(j, j + 2), 16));
  return "#" + h(a).map((v, j) => Math.round(v + (h(b)[j] - v) * u).toString(16).padStart(2, "0")).join("");
}
/** Mix two hex colours (t = 0 → a, 1 → b). */
const mixHex = (a: string, b: string, t: number) => { const h = (c: string) => [1, 3, 5].map((j) => parseInt(c.slice(j, j + 2), 16)); return "#" + h(a).map((v, j) => Math.round(v + (h(b)[j] - v) * t).toString(16).padStart(2, "0")).join(""); };
/** Spectrum line: one thin, hard-edged strip of the brand spectrum across a calm canvas, like light through a prism.
 *  The top-right corner holds a rosette built the way Sarvam's logomark is built: ONE element repeated around a centre
 *  (identical shape, identical line: 4.5px Meta / 3.5px LinkedIn, even rotation), each copy one hue of the spectrum, cropped by the corner. */
type Rosette = NonNullable<BannerSpec["rosette"]>;
export type Ornament = "lotus" | "star" | "quatrefoil" | "ogee" | "arch";
function spectrumDevice(spec: BannerSpec, F: Frame, _id: string, land: boolean): DeviceOut {
  const h = land ? 8 : 12, y = F.H - F.M - h;
  if (spec.ornament) return ornamentDevice(spec, F, _id, land, y, h);
  const kind = spec.rosette ?? "circles";
  const R = land ? F.H * 0.38 : F.W * 0.36;                     // rosette radius (the whole rosette spans 2R)
  const cx = F.W - (land ? F.H * 0.16 : F.W * 0.14), cy = land ? F.H * 0.16 : F.W * 0.14;
  const ROSETTE_N: Record<Rosette, number> = { circles: 12, lobes: 12, lens: 8, orbits: 6, rings: 6 };
  const n = ROSETTE_N[kind];
  const els = Array.from({ length: n }, (_, i) => {
    // hue by direction, mirror-symmetric: copies facing into the canvas (lower-left) are indigo, copies facing the corner (upper-right) orange
    const a = (360 / n) * i, rad = (a * Math.PI) / 180;
    const c = spectrumAt(kind === "rings" ? i / (n - 1) : (1 - Math.cos(((a - 135) * Math.PI) / 180)) / 2);
    switch (kind) {
      case "circles": {
        // the logomark's construction: equal circles whose centres sit on a ring, each passing through the centre
        const r = R / 2;
        return <circle key={i} cx={cx + Math.cos(rad) * r} cy={cy + Math.sin(rad) * r} r={r} stroke={c} />;
      }
      case "lens": {
        // vesica petals: equal lenses from the centre outward (a lotus drawn with two arcs each)
        // bigger than the line rosettes (the lotus is the hero of the corner); 8 broad petals
        const L = R * (land ? 1.22 : 1.32), w = L * 0.36, d = `M0 0 Q${w} ${-L / 2} 0 ${-L} Q${-w} ${-L / 2} 0 0 Z`;
        if (!spec.rosetteSolid) return <path key={i} d={d} transform={`translate(${cx} ${cy}) rotate(${a})`} stroke={c} />;
        // solid: each petal filled base → tip, from a pale tint of its hue to the full hue; a canvas-coloured edge keeps overlaps crisp
        return (
          <g key={i}>
            <defs><linearGradient id={`${_id}-pt${i}`} x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor={mixHex(c, "#ffffff", 0.7)} /><stop offset="0.55" stopColor={mixHex(c, "#ffffff", 0.2)} /><stop offset="1" stopColor={c} /></linearGradient></defs>
            <path d={d} transform={`translate(${cx} ${cy}) rotate(${a})`} fill={`url(#${_id}-pt${i})`} stroke="#fcfcfc" strokeWidth={land ? 2 : 2.5} />
          </g>
        );
      }
      case "orbits":
        // equal ellipses sharing the centre, each turned by 180/n: a calm spirograph
        return <ellipse key={i} cx={cx} cy={cy} rx={R} ry={R * 0.36} transform={`rotate(${(180 / n) * i} ${cx} ${cy})`} stroke={c} />;
      case "rings":
        // concentric circles at an even step, hue stepping outward through the spectrum
        return <circle key={i} cx={cx} cy={cy} r={R * (0.28 + (0.72 * i) / (n - 1))} stroke={c} />;
      default: {
        // lobes: equal rounded squares set out on a ring and turned to face the centre (the logomark's petals)
        const sd = R * 0.62, px = cx + Math.cos(rad) * R * 0.5, py = cy + Math.sin(rad) * R * 0.5;
        return <rect key={i} x={px - sd / 2} y={py - sd / 2} width={sd} height={sd} rx={sd * 0.3} transform={`rotate(${a + 45} ${px} ${py})`} stroke={c} />;
      }
    }
  });
  const layer = (
    <>
      <svg width={F.W} height={F.H} style={{ position: "absolute", inset: 0 }} aria-hidden>
        <g fill="none" strokeWidth={land ? 3.5 : 4.5} strokeLinejoin="round" strokeLinecap="round">{els}</g>
      </svg>
      <div aria-hidden style={{ position: "absolute", left: 0, right: 0, top: y, height: h, background: SPECTRUM }} />
    </>
  );
  return { layer, open: { x: 0, y: 0, w: F.W, h: y }, lightInside: true };
}

/** Ornament (spectrum device): ONE solid shape from the brand geometry, filled with the spectrum, placed by `place`.
 *  Lotus petals are each filled base → tip (pale tint → full hue); solid shapes get a spectrum fill + a pale centre. */
function ornamentDevice(spec: BannerSpec, F: Frame, id: string, land: boolean, stripY: number, stripH: number): DeviceOut {
  const k = (s: string) => `${id}-${s}`;
  const kind = spec.ornament!, place = spec.place ?? "corner", white = spec.ornamentTone === "white";
  const dark = DARK_BG.has(spec.background), edge = spec.background === "plain" ? "#fcfcfc" : dark ? "#13121e" : "#ffffff";
  // Geometry per placement. R = the ornament's reach from its centre.
  let cx: number, cy: number, R: number;
  const solid = kind !== "lotus";
  // Landscape rearranges "rise": the ornament stands at the right on the strip, the text takes the left column.
  if (place === "rise") { cx = land ? F.W * 0.77 : F.W / 2; cy = stripY - (land ? 14 : 28); R = land ? F.H * 0.5 : F.W * 0.46; }
  else if (place === "corner" && solid) {
    // solid shapes stay whole (a cropped medallion reads as a blob): top-right, inside the side padding
    R = land ? F.H * 0.36 : F.W * 0.26; cx = F.W - F.M * 1.5 - R; cy = land ? F.H * 0.44 : F.M + R * 1.05;
  }
  else if (place === "center") { if (land) { cx = F.W * 0.79; cy = F.H * 0.47; R = F.H * 0.38; } else { cx = F.W / 2; cy = F.H * 0.33; R = F.W * 0.29; } }
  else { R = (land ? F.H * 0.38 : F.W * 0.36) * (land ? 1.22 : 1.32) * (place === "small" ? 0.5 : 1); cx = F.W - (land ? F.H * 0.16 : F.W * 0.14); cy = land ? F.H * 0.16 : F.W * 0.14; }
  // Hue by direction: corner → indigo toward the canvas, orange toward the corner; elsewhere left (indigo) → right (orange).
  const hueAt = (dx: number, dy: number) => place === "corner" || place === "small" ? (1 + (dx - dy) / Math.SQRT2) / 2 : (1 + dx) / 2;
  const fillOf = (c: string) => (white ? "#ffffff" : c);
  let els: ReactNode, solidTop: number | undefined;
  if (kind === "lotus") {
    const n = Math.max(1, spec.petals ?? 8);
    const fan = place === "rise";                          // rising: an upward fan of petals; otherwise a full flower
    const L = R, w = L * (n === 1 ? 0.42 : 0.36);
    const d = `M0 0 Q${w} ${-L / 2} 0 ${-L} Q${-w} ${-L / 2} 0 0 Z`;
    els = Array.from({ length: n }, (_, i) => {
      const a = fan ? (n === 1 ? 0 : -72 + (144 * i) / (n - 1)) : (360 / n) * i;
      const r = (a * Math.PI) / 180, c = spectrumAt(hueAt(Math.sin(r), -Math.cos(r)));
      if (n === 1 && !white) return (
        <g key={i}>
          <defs><linearGradient id={k(`p${i}`)} x1="0" y1="1" x2="0" y2="0">{SPECTRUM_STOPS.map(([o, cc]) => <stop key={o} offset={o} stopColor={cc} />)}</linearGradient>
            <radialGradient id={k(`q${i}`)} cx="0.5" cy="0.6" r="0.5"><stop offset="0" stopColor="#ffffff" stopOpacity="0.45" /><stop offset="1" stopColor="#ffffff" stopOpacity="0" /></radialGradient></defs>
          <path d={d} transform={`translate(${cx} ${cy}) rotate(${a})`} fill={`url(#${k(`p${i}`)})`} />
          <path d={d} transform={`translate(${cx} ${cy}) rotate(${a})`} fill={`url(#${k(`q${i}`)})`} />
        </g>
      );
      return (
        <g key={i}>
          <defs><linearGradient id={k(`p${i}`)} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor={white ? "#ffffff" : mixHex(c, "#ffffff", 0.7)} stopOpacity={white ? 0.55 : 1} />
            <stop offset="0.55" stopColor={fillOf(mixHex(c, "#ffffff", 0.2))} stopOpacity={white ? 0.75 : 1} />
            <stop offset="1" stopColor={fillOf(c)} stopOpacity={white ? 0.95 : 1} /></linearGradient></defs>
          <path d={d} transform={`translate(${cx} ${cy}) rotate(${a})`} fill={`url(#${k(`p${i}`)})`} stroke={white ? "none" : edge} strokeWidth={land ? 2 : 2.5} />
        </g>
      );
    });
  } else {
    // solid shapes: medallions sit centred on (cx, cy); the arch stands on the strip when rising
    const g = tight(kind === "arch"
      ? gatewayPath({ ...GATEWAY_PRESETS["Domed door"], bottom: "flat", notch: 0, frame: 0, waist: 0, aspect: 1.25 })
      : medallionPath({ ...MEDALLION_PRESETS[kind === "star" ? "Eight-point star" : kind === "quatrefoil" ? "Quatrefoil" : "Ogee cross"], aspect: 1, frame: 0 }));
    const size = R * (kind === "arch" ? 1.45 : 1.7), s = size / Math.max(g.width, g.height), w = g.width * s, hh = g.height * s;
    const oy = kind === "arch" && place === "rise" ? cy - hh : cy - hh / 2;
    const d = fitPath(g, s, cx - w / 2, oy);
    solidTop = oy;
    const [x1, y1, x2, y2] = place === "corner" || place === "small" ? [cx - w / 2, cy + hh / 2, cx + w / 2, cy - hh / 2] : [cx - w / 2, cy, cx + w / 2, cy];
    els = (
      <>
        <defs>
          <linearGradient id={k("sf")} gradientUnits="userSpaceOnUse" x1={x1} y1={y1} x2={x2} y2={y2}>
            {white ? <><stop offset="0" stopColor="#ffffff" stopOpacity="0.7" /><stop offset="1" stopColor="#ffffff" stopOpacity="0.95" /></>
              : SPECTRUM_STOPS.map(([o, c]) => <stop key={o} offset={o} stopColor={c} />)}
          </linearGradient>
          <radialGradient id={k("sl")} gradientUnits="userSpaceOnUse" cx={cx} cy={oy + hh / 2} r={Math.max(w, hh) * 0.5}>
            <stop offset="0" stopColor="#ffffff" stopOpacity={white ? 0 : 0.6} /><stop offset="0.7" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path d={d} fill={`url(#${k("sf")})`} />
        <path d={d} fill={`url(#${k("sl")})`} />
      </>
    );
  }
  // Text region: whatever the ornament leaves free (measured from the shape's real top for solid shapes).
  const shapeTop = solidTop ?? cy - R;
  const top = place === "center" && !land ? cy + R + 40 : 0;
  const bottom = place === "rise" && !land ? shapeTop - 32 : stripY;
  const sideText = land && (place === "center" || place === "rise" || (place === "corner" && solid));
  const open: Rect = sideText ? { x: 0, y: 0, w: F.W * (place === "rise" ? 0.5 : 0.54), h: stripY } : { x: 0, y: top, w: F.W, h: bottom - top };
  const layer = (
    <>
      <svg width={F.W} height={F.H} style={{ position: "absolute", inset: 0 }} aria-hidden>
        <defs><clipPath id={k("clip")}><rect x={0} y={0} width={F.W} height={stripY} /></clipPath></defs>
        <g clipPath={`url(#${k("clip")})`}>{els}</g>
      </svg>
      {/* a bottom horizon replaces the strip (the horizon is the colour moment; a strip on it would sink) */}
      {spec.horizon !== "bottom" && <div aria-hidden style={{ position: "absolute", left: 0, right: 0, top: stripY, height: stripH, background: SPECTRUM }} />}
    </>
  );
  const centred = !land && (place === "rise" || place === "center");
  return { layer, open, lightInside: !DARK_BG.has(spec.background), textAlign: centred ? "center" : "left", textJustify: centred ? "center" : sideText ? "center" : "flex-end" };
}

/** Studio divider in the spectrum: the preset's lines and petals, one gradient left (indigo) → right (orange). */
function SpectrumDivider({ name, width, id, dark }: { name: string; width: number; id: string; dark: boolean }) {
  const P = DIVIDER_PRESETS[name] ?? DIVIDER_PRESETS["Lotus rule"];
  const g = `${id}-dv`;
  const html = dividerPaths(P).join("").replaceAll("currentColor", `url(#${g})`);
  return (
    <svg data-qa="divider" viewBox="0 30 400 55" width={width} height={(width * 55) / 400} fill="none" stroke={`url(#${g})`} strokeWidth={(3 * 400) / width}
      strokeLinecap="round" strokeLinejoin="round" style={{ display: "block", overflow: "visible" }} aria-hidden>
      <defs><linearGradient id={g} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="400" y2="0">
        {SPECTRUM_STOPS.map(([o, c]) => <stop key={o} offset={o} stopColor={dark && o < 0.3 ? mixHex(c, "#ffffff", 0.35) : c} />)}
      </linearGradient></defs>
      <g dangerouslySetInnerHTML={{ __html: html }} />
    </svg>
  );
}

/** Horizon: a soft band of the Sun gradient rising from one edge to about half the frame.
 *  Flat (a wide ellipse, ~2.6× the frame width, so the arc is almost a line), blended in OKLab with few stops, and calmer
 *  than the hero: each Sun stop [sampled] is mixed ~35% toward white. Bottom = a sunrise; top = mirrored. */
const HORIZON_STOPS = "#f6a96e 0%, #f3b98a 22%, #e9c8b8 40%, #d8d6ee 58%, #e3e9fb 74%, rgb(239 244 254 / 0.6) 86%, rgb(239 244 254 / 0) 100%";
function Horizon({ W, H, edge }: { W: number; H: number; edge: "top" | "bottom" }) {
  const h = H * 0.55, at = edge === "bottom" ? "50% 100%" : "50% 0%";
  return (
    <div aria-hidden style={{ position: "absolute", left: 0, right: 0, height: h, [edge]: 0, pointerEvents: "none",
      background: `radial-gradient(ellipse ${Math.round((W * 2.6) / 2)}px ${Math.round(h)}px at ${at} in oklab, ${HORIZON_STOPS})` }} />
  );
}

/* ── Subject-led devices (banner-builder.md §5) ── */

/** Mask for a ring line on the TRUE offset of a shape: a thin band at distance `off` outside the outline (even on points and curves). */
function OffsetLine({ id, d, off, lw, color, opacity }: { id: string; d: string; off: number; lw: number; color: string; opacity: number }) {
  return (
    <>
      <mask id={id} maskUnits="userSpaceOnUse" x="-4000" y="-4000" width="8000" height="8000">
        <path d={d} fill="none" stroke="#fff" strokeWidth={2 * off + lw} strokeLinejoin="round" />
        <path d={d} fill="none" stroke="#000" strokeWidth={Math.max(0, 2 * off - lw)} strokeLinejoin="round" />
        <path d={d} fill="#000" />
      </mask>
      <rect x="-4000" y="-4000" width="8000" height="8000" fill={color} opacity={opacity} mask={`url(#${id})`} />
    </>
  );
}

/** Emblem: the subject as ONE object. A frosted, bevelled medallion with the icon engraved into it, and echo rings on
 *  true offsets (the mandala idea: layers building toward a whole). Same materials as the /components emblem cards. */
function emblemDevice(spec: BannerSpec, F: Frame, id: string, g: Geom, pal: Pal): DeviceOut {
  const k = (s: string) => `${s}-${id}`, u = (s: string) => `url(#${k(s)})`;
  const dark = DARK_BG.has(spec.background);
  const size = Math.min(F.W, F.H) * 0.56, s = size / Math.max(g.width, g.height);
  const w = g.width * s, h = g.height * s, cx = F.W / 2, cy = F.H / 2;
  const d = fitPath(g, s, cx - w / 2, cy - h / 2);
  const ring = dark ? "#ffffff" : pal.shadow;
  const Icon = EMBLEM_ICONS[spec.icon ?? "sparkle"];
  const ic = size * 0.36;
  const layer = (
    <svg width={F.W} height={F.H} style={{ position: "absolute", inset: 0, overflow: "visible" }} aria-hidden>
      <defs>
        <linearGradient id={k("body")} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffffff" stopOpacity="0.98" /><stop offset="0.6" stopColor="#ffffff" stopOpacity="0.9" /><stop offset="1" stopColor={pal.rim} stopOpacity="0.82" /></linearGradient>
        <radialGradient id={k("sheen")} cx="0.36" cy="0.22" r="0.6"><stop offset="0" stopColor="#ffffff" stopOpacity="0.95" /><stop offset="1" stopColor="#ffffff" stopOpacity="0" /></radialGradient>
        <radialGradient id={k("halo")} cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor={dark ? pal.rim : "#ffffff"} stopOpacity="0.4" /><stop offset="1" stopColor={dark ? pal.rim : "#ffffff"} stopOpacity="0" /></radialGradient>
        <clipPath id={k("clip")}><path d={d} /></clipPath>
        <filter id={k("float")} x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy={size * 0.05} stdDeviation={size * 0.05} floodColor={pal.shadow} floodOpacity="0.32" />
          <feDropShadow dx="0" dy={size * 0.008} stdDeviation={size * 0.006} floodColor={pal.shadow} floodOpacity="0.28" />
        </filter>
        <filter id={k("bevel")} x="-10%" y="-10%" width="120%" height="120%">
          <feOffset dy={size * 0.012} in="SourceAlpha" result="dn" /><feComposite in="SourceAlpha" in2="dn" operator="out" result="topEdge" />
          <feGaussianBlur in="topEdge" stdDeviation={size * 0.003} result="topB" /><feFlood floodColor="#ffffff" /><feComposite in2="topB" operator="in" result="hi" />
          <feOffset dy={-size * 0.02} in="SourceAlpha" result="up" /><feComposite in="SourceAlpha" in2="up" operator="out" result="botEdge" />
          <feGaussianBlur in="botEdge" stdDeviation={size * 0.014} result="botB" /><feFlood floodColor={pal.shadow} floodOpacity="0.4" /><feComposite in2="botB" operator="in" result="lo" />
          <feComposite in="lo" in2="SourceAlpha" operator="in" result="loIn" />
          <feMerge><feMergeNode in="SourceGraphic" /><feMergeNode in="loIn" /><feMergeNode in="hi" /></feMerge>
        </filter>
        <mask id={k("frame")} maskUnits="userSpaceOnUse" x="-4000" y="-4000" width="8000" height="8000"><path d={d} fill="#fff" /><path d={d} fill="none" stroke="#000" strokeWidth={size * 0.06} strokeLinejoin="round" /></mask>
      </defs>
      <circle cx={cx} cy={cy} r={size * 0.95} fill={u("halo")} />
      {[0.08, 0.17, 0.27, 0.38].map((o, i) => <OffsetLine key={o} id={k(`r${i}`)} d={d} off={size * o} lw={1.5} color={ring} opacity={0.55 - i * 0.12} />)}
      <g filter={u("float")}><path d={d} fill={u("body")} filter={u("bevel")} /></g>
      <g clipPath={u("clip")}><ellipse cx={cx - w * 0.12} cy={cy - h * 0.32} rx={w * 0.45} ry={h * 0.32} fill={u("sheen")} opacity="0.7" /></g>
      {/* inset frame: a tinted groove just inside the edge, then the crisp rim */}
      <path d={d} fill="none" stroke={pal.shadow} strokeOpacity="0.2" strokeWidth={size * 0.064} strokeLinejoin="round" mask={u("frame")} />
      <path d={d} fill="none" stroke="#ffffff" strokeWidth={1.5} />
      {/* engraved icon: white highlight just below, then the ink line */}
      <Icon x={cx - ic / 2} y={cy - ic / 2 + size * 0.006} width={ic} height={ic} color="#ffffff" strokeWidth={1.5} opacity={0.95} />
      <Icon x={cx - ic / 2} y={cy - ic / 2} width={ic} height={ic} color={pal.core} strokeWidth={1.5} />
    </svg>
  );
  return { layer, open: { x: 0, y: 0, w: F.W, h: F.H }, lightInside: false };
}

/** Arch window: the gateway as a window onto the real product (brand-findings: "gateway as mask/frame").
 *  A recessed arch with a light interior and one frozen product moment seen through it. */
function archWindowDevice(spec: BannerSpec, F: Frame, id: string, pal: Pal): DeviceOut {
  const k = (s: string) => `${s}-${id}`, u = (s: string) => `url(#${k(s)})`;
  const preset = GATEWAY_PRESETS[spec.shape ?? "Mihrab"] ?? GATEWAY_PRESETS["Mihrab"];
  const g = gatewayPath({ ...preset, aspect: 1.25, bottom: "flat", notch: 0, frame: 0, waist: 0 });
  // Standing on the bottom edge, like a doorway; clear of the frame sides by ≥ 1.5·M.
  const s = Math.min((F.W - F.M * 3) / g.width, (F.H * 0.9) / g.height), w = g.width * s, h = g.height * s;
  const x = (F.W - w) / 2, y = F.H - h + 2;
  const d = fitPath(g, s, x, y);
  const C = spec.card === "research" ? MockResearch : spec.card === "review" ? MockReview : MockPlan;
  const ms = (w * 0.8) / 380;                                   // the mock fills 80% of the arch width (uniform scale)
  const my = y + h * 0.3;
  const dark = DARK_BG.has(spec.background);
  return {
    layer: (
      <>
        <svg width={F.W} height={F.H} style={{ position: "absolute", inset: 0, overflow: "visible" }} aria-hidden>
          <defs>
            <linearGradient id={k("in")} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset="0.55" stopColor={pal.rim} /><stop offset="1" stopColor={pal.edge} /></linearGradient>
          </defs>
          {[0.035, 0.075].map((o, i) => <OffsetLine key={o} id={k(`o${i}`)} d={d} off={w * o} lw={1.5} color={dark ? "#ffffff" : pal.shadow} opacity={0.5 - i * 0.2} />)}
          <path d={d} fill={u("in")} />
        </svg>
        {/* optional: one frozen product moment seen through the arch (card); without it the arch is a lit, empty doorway */}
        {spec.card && <div aria-hidden style={{ position: "absolute", inset: 0, clipPath: `path("${d}")` }}>
          <div style={{ position: "absolute", left: x + w / 2 - 190, top: my, width: 380, transform: `scale(${ms})`, transformOrigin: "top center", filter: `drop-shadow(0 18px 30px ${pal.shadow}33)` }}><C freeze={2} /></div>
        </div>}
        <svg width={F.W} height={F.H} style={{ position: "absolute", inset: 0, overflow: "visible" }} aria-hidden>
          <defs>
            <clipPath id={k("clip")}><path d={d} /></clipPath>
            <filter id={k("soft")} x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation={w * 0.018} /></filter>
          </defs>
          {/* recess: a soft inner shadow along the arch edge, then the crisp rim */}
          <g clipPath={u("clip")}><path d={d} fill="none" stroke={pal.shadow} strokeOpacity="0.35" strokeWidth={w * 0.05} filter={u("soft")} /></g>
          <path d={d} fill="none" stroke="#ffffff" strokeWidth={1.5} />
        </svg>
      </>
    ),
    open: { x: 0, y: 0, w: F.W, h: F.H }, lightInside: false,
  };
}

/** "Sarvam" (wholeness) in nine Indian scripts, set in rings like a mandala. [addition] Transliterations: have a native
 *  reader check each script before publishing. Fonts: Noto Sans per script (src/app/banners/layout.tsx). */
export const SCRIPT_WORDS: { word: string; font: string }[] = [
  { word: "सर्वम्", font: "Noto Sans Devanagari" }, { word: "সর্বম্", font: "Noto Sans Bengali" }, { word: "சர்வம்", font: "Noto Sans Tamil" },
  { word: "సర్వం", font: "Noto Sans Telugu" }, { word: "ಸರ್ವಂ", font: "Noto Sans Kannada" }, { word: "സർവം", font: "Noto Sans Malayalam" },
  { word: "સર્વમ્", font: "Noto Sans Gujarati" }, { word: "ਸਰਵਮ", font: "Noto Sans Gurmukhi" }, { word: "ସର୍ବମ୍", font: "Noto Sans Oriya" },
];

/** Script mandala: rings of "Sarvam" in every script around a glowing centre. Portrait: the headline sits in the centre.
 *  Landscape (split): the centre holds the logomark, the text sits left. */
function scriptMandalaDevice(spec: BannerSpec, F: Frame, id: string, beside: boolean): DeviceOut {
  const k = (s: string) => `${s}-${id}`, u = (s: string) => `url(#${k(s)})`;
  const G = GLOW[spec.background], dark = DARK_BG.has(spec.background);
  const R = beside ? Math.min(F.W * 0.5 - F.M * 0.5, F.H * 0.62) : (F.W - F.M * 3) / 2;
  const cx = F.W / 2, cy = F.H / 2;
  const fs = R * 0.075, ink = dark ? "#ffffff" : PAL[spec.background].shadow;
  const rings = [
    { r: R - fs * 0.9, n: 18, op: 0.42 },
    { r: R * 0.79 - fs * 0.6, n: 13, op: 0.62 },
  ];
  const disc = R * 0.6;
  const words = rings.flatMap(({ r, n, op }, ri) => Array.from({ length: n }, (_, i) => {
    const a = (360 / n) * i + (ri ? 360 / n / 2 : 0);
    const S = SCRIPT_WORDS[(i + ri * 4) % SCRIPT_WORDS.length];
    return <text key={`${ri}-${i}`} transform={`rotate(${a} ${cx} ${cy}) translate(${cx} ${cy - r})`} textAnchor="middle" dominantBaseline="central"
      style={{ fontFamily: `"${S.font}", var(--font-text)`, fontSize: fs, fontWeight: 500 }} fill={ink} opacity={op}>{S.word}</text>;
  }));
  // Dots between words on the outer ring, circles between rings: the mandala's construction lines.
  const n0 = rings[0].n;
  const dots = Array.from({ length: n0 }, (_, i) => { const a = ((360 / n0) * (i + 0.5) * Math.PI) / 180; return <circle key={i} cx={cx + Math.sin(a) * rings[0].r} cy={cy - Math.cos(a) * rings[0].r} r={fs * 0.09} fill={ink} opacity={0.5} />; });
  const lines = [R, R * 0.79 + fs * 0.25, (R * 0.79 + disc) / 2 + fs * 0.6].map((r, i) => <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={ink} strokeOpacity={0.3 - i * 0.05} strokeWidth={1.5} />);
  const layer = (
    <svg width={F.W} height={F.H} style={{ position: "absolute", inset: 0, overflow: "visible" }} aria-hidden>
      <defs>
        <radialGradient id={k("disc")} cx="0.5" cy="0.45" r="0.6"><stop offset="0" stopColor={G.top} /><stop offset="1" stopColor={G.bottom} /></radialGradient>
        <clipPath id={k("clip")}><circle cx={cx} cy={cy} r={disc} /></clipPath>
        <filter id={k("soft")} x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation={disc * 0.06} /></filter>
      </defs>
      {lines}{words}{dots}
      <circle cx={cx} cy={cy} r={disc} fill={u("disc")} />
      <g clipPath={u("clip")}><circle cx={cx} cy={cy} r={disc} fill="none" stroke={G.glow} strokeOpacity={0.85} strokeWidth={disc * 0.16} filter={u("soft")} /></g>
      <circle cx={cx} cy={cy} r={disc} fill="none" stroke={G.glow} strokeOpacity={0.9} strokeWidth={1.5} />
    </svg>
  );
  // Text box: the largest rectangle inside the disc, inset from its glow band.
  const fit = (r: number): Rect => { const rr = disc * 0.86, hh = (2 * rr) / Math.sqrt(1 + r * r), ww = hh * r; return { x: cx - ww / 2, y: cy - hh / 2, w: ww, h: hh }; };
  const r0 = textAspectFor(spec, "portrait");
  const centre = beside
    // eslint-disable-next-line @next/next/no-img-element
    ? <img data-qa="mark" src={`/brand/sarvam-logomark-${LIGHT_INSIDE.has(spec.background) ? "black" : "white"}.svg`} alt="Sarvam" style={{ position: "absolute", left: cx - disc * 0.45, top: cy - disc * 0.45, width: disc * 0.9, height: disc * 0.9 }} />
    : null;
  return { layer: <>{layer}{centre}</>, open: fit(r0), lightInside: LIGHT_INSIDE.has(spec.background), fit };
}

function Mark({ tone, width, style }: { tone: "black" | "white"; width: number; style?: CSSProperties }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/brand/sarvam-wordmark-${tone}.svg`} alt="Sarvam" style={{ width, height: "auto", display: "block", ...style }} />;
}

/** Wordmark, or the partner lockup "sarvam · PARTNER" (logo.md §4: wordmark only, centred dot, matched weight). */
function Lockup({ tone, width, partner, logomark, style }: { tone: "black" | "white"; width: number; partner?: string; logomark?: boolean; style?: CSSProperties }) {
  const color = tone === "white" ? "#ffffff" : "#141414";
  if (logomark && !partner) {
    // Official logomark, alone. Height ≈ 0.55 × the wordmark width rule, so its presence matches.
    // eslint-disable-next-line @next/next/no-img-element
    return <div data-qa="mark" style={{ display: "flex", ...style }}><img src={`/brand/sarvam-logomark-${tone}.svg`} alt="Sarvam" style={{ height: width * 0.55, width: "auto", display: "block" }} /></div>;
  }
  return (
    <div data-qa="mark" style={{ display: "flex", alignItems: "center", gap: width * 0.12, ...style }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/brand/sarvam-wordmark-${tone}.svg`} alt="Sarvam" style={{ width, height: "auto", display: "block" }} />
      {partner && <>
        <span style={{ width: width * 0.04, height: width * 0.04, borderRadius: "50%", background: color, opacity: 0.8 }} />
        <span style={{ fontFamily: "var(--font-text)", fontWeight: 700, fontSize: width * 0.2, letterSpacing: "0.04em", textTransform: "uppercase", color: tone === "white" ? "#ffffff" : "var(--color-sr-indigo-700)", lineHeight: 1 }}>{partner}</span>
      </>}
    </div>
  );
}

/** Product moment inside the device opening, scaled to fit (never stretched). */
function CardSlot({ kind, area }: { kind: "plan" | "research" | "review"; area: { w: number; h: number } }) {
  const C = kind === "research" ? MockResearch : kind === "review" ? MockReview : MockPlan;
  // Floats over the shape: ~62% of the area width, never taller than 78% of it (uniform scale).
  const s = Math.min((area.w * 0.62) / 380, (area.h * 0.78) / 340);
  return (
    <div style={{ position: "absolute", left: area.w / 2 - 190, top: area.h / 2 - 170, width: 380, transform: `scale(${s})`, transformOrigin: "center", filter: "drop-shadow(0 18px 32px rgb(17 17 91 / 0.22))" }}>
      <C freeze={2} />
    </div>
  );
}

const SECONDARY_FILL: Record<Treatment, TextFill> = { white: "white", gold: "goldMute", indigo: "indigo", ink: "ink" };

function BannerImpl({ spec, format, id }: { spec: BannerSpec; format: BannerFormat; id: string }) {
  const F = FORMATS[format], land = format === "landscape";
  // Layout rearranges per format: split needs width (portrait/square → stacked); stacked needs height (landscape → split).
  // Text-free devices sit beside the text; the script mandala holds the text on portrait and sits beside it on landscape.
  const req: Layout = EDITORIAL.has(spec.device) ? "editorial" : BESIDE.has(spec.device) ? "split" : spec.device === "script-mandala" ? (land ? "split" : "centered") : spec.layout ?? "centered";
  const layout: Layout = req === "split" && !land ? "stacked" : req === "stacked" && land ? "split" : req;
  const centreMark = spec.device === "script-mandala" && layout !== "centered";   // the logomark already sits in the mandala's centre
  const markW = land ? 96 : 124, markSpace = !centreMark && (spec.mark === "top" || spec.mark === "inside") ? (land ? 52 : 72) : 0;
  const editorial = layout === "editorial";
  const dev = layout === "centered" || editorial ? { x: 0, y: 0, w: F.W, h: F.H } : layout === "split" ? { x: F.W * 0.47, y: 0, w: F.W * 0.53, h: F.H } : { x: 0, y: F.H * 0.44, w: F.W, h: F.H * 0.56 };
  const D = renderDevice(spec, { W: dev.w, H: dev.h, M: F.M }, id, layout !== "centered", format);
  // Editorial: one left column (≥ 1.5·M from the sides), anchored to the bottom of the space the device leaves.
  const edBottom = Math.min(D.open.y + D.open.h, F.H - F.M) - (spec.device === "spectrum" && D.open.y + D.open.h >= F.H - F.M * 2 ? (land ? 44 : 64) : 0);
  const edTop = Math.max(F.M + markSpace + 24, D.open.y), edLeft = Math.max(F.M * 1.5, D.open.x), edRight = Math.min(F.W - F.M * 1.5, D.open.x + D.open.w);
  let open: Rect = editorial ? { x: edLeft, y: edTop, w: edRight - edLeft, h: edBottom - edTop }
    : layout === "centered" ? D.open
    // Split: an editorial column from the top (gradients lighten toward the bottom, so the text stays on the deep part).
    : layout === "split" ? { x: F.M, y: F.M + markSpace + (markSpace ? 12 : 0), w: F.W * 0.47 - F.M - 16, h: F.H - F.M * 2 - markSpace - (markSpace ? 12 : 0) }
    : { x: F.M, y: F.M + markSpace, w: F.W - F.M * 2, h: F.H * 0.44 - F.M - markSpace - 8 };
  const layer = <div style={{ position: "absolute", left: dev.x, top: dev.y, width: dev.w, height: dev.h }}>{D.layer}{spec.card && layout !== "centered" && spec.device !== "arch-window" && <CardSlot kind={spec.card} area={{ w: dev.w, h: dev.h }} />}</div>;
  const lightInside = layout === "centered" ? D.lightInside : !DARK_BG.has(spec.background);
  const align: "center" | "left" = editorial ? D.textAlign ?? "left" : layout === "split" ? "left" : "center";
  const onLight = lightInside || spec.treatment === "ink" || spec.treatment === "indigo";
  const num = !!spec.primaryIsNumber, sans = spec.titleStyle === "sans";
  // Headlines dominate, as in Sarvam's posts (~15–18% of the frame height per line); the fit loop shrinks them only when needed.
  const base = land ? { p: num ? 170 : sans ? 92 : 100, s: num ? 32 : 26, gap: layout === "split" ? 22 : 18 } : format === "square" ? { p: num ? 250 : sans ? 116 : 124, s: num ? 46 : 34, gap: 26 } : { p: num ? 270 : sans ? 124 : 132, s: num ? 50 : 36, gap: 30 };
  // Fit: shrink type until the block fits the opening (width via wrapping, height via measured lines). Never below 60%.
  if (editorial) { base.p = Math.round(base.p * 1.3); base.s = Math.round(base.s * 1.1); }
  const pFont = sans ? "text" : "display", pWeight = sans ? 600 : 400;
  const dividerW = land ? 300 : 440;
  const blockH = (k: number) => {
    const ps = base.p * k, ss = Math.max(base.s * k, land ? 20 : 28);   // the supporting line never drops below its floor, so measure it at the floor
    const cw = ps * charW(pFont, pWeight, spec.primary);
    const plines = balanceLines(spec.primary, Math.max(4, Math.floor(open.w / cw)));
    const pl = Math.max(...plines.map((l) => l.length)) * cw > open.w * 0.98 || plines.length > 3 ? 99 : plines.length;   // too wide, or more than 3 lines → too big
    const sl = spec.secondary ? balanceLines(spec.secondary, Math.max(6, Math.floor((open.w * 0.9) / (ss * charW(num ? "display" : "text", 400, spec.secondary))))).length : 0;
    const markH = spec.mark === "inside" && layout === "centered" ? (spec.logo === "logomark" ? markW * 0.55 : land ? 16 : 20) + base.gap * 0.7 : 0;
    const divH = spec.divider ? dividerW * (55 / 400) + base.gap : 0;
    return markH + pl * ps * 1.2 + divH + (sl ? base.gap + sl * ss * 1.45 : 0);
  };
  // Fixed steps (100 / 86 / 74 / 64 / 55 / 48 % of the base): the largest that fits. Same hierarchy on every banner.
  const STEPS = [1, 0.86, 0.74, 0.64, 0.55, 0.48];
  const stepFor = () => STEPS.findIndex((s) => blockH(s) <= open.h * 0.92);
  let best = stepFor();
  // The default box is wide (one or two lines read best). If the stack only fits small or not at all,
  // try taller boxes inside the same shape and keep the one that lets the type sit largest.
  if (layout === "centered" && D.fit && best !== 0) {
    const first = open, base0 = textAspectFor(spec, format);
    for (const r of [0.85, 0.72, 0.6].map((m) => base0 * m)) {
      const prev = open; open = D.fit(r);
      const i = stepFor();
      if (i !== -1 && (best === -1 || i < best)) best = i; else open = prev;
    }
    if (best === -1) open = first;
  }
  const k = best === -1 ? STEPS[STEPS.length - 1] : STEPS[best];
  const S = { p: Math.round(base.p * k), s: Math.round(Math.max(base.s * k, land ? 20 : 28)), gap: base.gap };
  const primary = (
    <StyledText data-qa="text" id={`${id}-p`} text={spec.primary} width={open.w} size={S.p} fill={spec.treatment} align={align}
      font={sans ? "text" : "display"} weight={sans ? 600 : 400} tracking={num ? -0.05 : sans ? -0.035 : -0.04} leading={sans ? 1.06 : 1.04} />
  );
  // Secondary: a number gets an elegant serif label; a headline gets a calm sans line.
  const secondary = spec.secondary && (num
    ? <StyledText data-qa="text" id={`${id}-s`} text={spec.secondary} width={open.w * 0.9} align={align} size={S.s} fill={onLight ? (spec.secondaryPlace === "above" ? SECONDARY_FILL[spec.treatment] : "ink") : "white"} tracking={-0.02} leading={1.15} />
    : <p data-qa="text" style={{ fontFamily: "var(--font-text)", fontSize: S.s * (land ? 1 : 0.94), lineHeight: 1.38, color: onLight ? "var(--color-tx-secondary)" : "rgb(255 255 255 / 0.92)", margin: 0, maxWidth: open.w * 0.92, textWrap: "balance", textAlign: align }}>{spec.secondary}</p>);
  const markTone = DARK_BG.has(spec.background) ? "white" : "black";
  return (
    <div data-banner={format} style={{ position: "relative", width: F.W, height: F.H, overflow: "hidden", background: spec.background === "plain" ? "var(--color-sf)" : `var(--gradient-${spec.background})` }}>
      {spec.horizon && <Horizon W={F.W} H={F.H} edge={spec.horizon} />}
      {layer}
      {/* Seamless grain: one pre-generated noise image (1200×1350, decoded once, no live filter) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/grain.png" alt="" aria-hidden width={1200} height={1350} style={{ position: "absolute", left: 0, top: 0, mixBlendMode: "overlay", pointerEvents: "none", maxWidth: "none" }} />
      {!centreMark && (spec.mark === "top" || (spec.mark === "inside" && layout !== "centered")) && (
        <Lockup logomark={spec.logo === "logomark"} tone={layout === "centered" || editorial ? markTone : onLight ? "black" : "white"} width={markW} partner={spec.partner}
          style={{ position: "absolute", top: F.M, ...(align === "left" ? { left: editorial ? F.M * 1.5 : F.M } : { left: 0, right: 0, justifyContent: "center" }) }} />
      )}
      {spec.mark === "bottom" && <Lockup logomark={spec.logo === "logomark"} tone={markTone} width={markW} partner={spec.partner} style={{ position: "absolute", bottom: land ? 36 : F.M, left: 0, right: 0, justifyContent: "center" }} />}
      <div data-qa="open" style={{ position: "absolute", left: open.x, top: open.y, width: open.w, height: open.h, display: "flex", flexDirection: "column", alignItems: align === "left" ? "flex-start" : "center", justifyContent: editorial ? D.textJustify ?? "flex-end" : layout === "split" ? "flex-start" : "center", gap: S.gap, textAlign: align }}>
        {spec.mark === "inside" && layout === "centered" && <Lockup logomark={spec.logo === "logomark"} tone={onLight ? "black" : "white"} width={markW} partner={spec.partner} style={{ marginBottom: S.gap * 0.7, opacity: onLight ? 0.9 : 1 }} />}
        {spec.divider && <SpectrumDivider name={spec.divider} width={dividerW} id={id} dark={DARK_BG.has(spec.background)} />}
        {spec.secondaryPlace === "above" && secondary}
        {primary}
        {spec.secondaryPlace !== "above" && secondary}
      </div>
    </div>
  );
}

/** Six on-system alternatives for the same copy: different layouts, devices and grounds, with contrast-safe treatments. */
export function variationsOf(spec: BannerSpec): BannerSpec[] {
  const num = !!spec.primaryIsNumber;
  const dark = (bg: Background, light: Treatment = "white"): Treatment => (DARK_BG.has(bg) ? (num ? "gold" : light) : num ? "indigo" : "ink");
  const base = { primary: spec.primary, primaryIsNumber: spec.primaryIsNumber, secondary: spec.secondary, secondaryPlace: spec.secondaryPlace, partner: spec.partner, card: spec.card };
  const v = (o: Partial<BannerSpec> & { background: Background; device: Device }): BannerSpec =>
    ({ ...base, layout: "centered", mark: "inside", titleStyle: spec.titleStyle, treatment: dark(o.background), ...o } as BannerSpec);
  return [
    v({ background: "saffron-rose", device: "medallion-glow", shape: "Onion lantern", titleStyle: num ? "serif" : "sans" }),
    v({ background: "olive", device: "medallion-glow", shape: "Scalloped medallion" }),
    v({ background: "dusk", device: "gateway-echo", shape: "Mihrab", titleStyle: "serif" }),
    v({ background: "lavender-dusk", device: "medallion-glow", shape: "Ogee cross", titleStyle: "serif", treatment: num ? "indigo" : "ink" }),
    v({ background: "night", device: "medallion-glow", shape: "Quatrefoil", mark: "bottom", titleStyle: "serif" }),
    v({ background: "plain", device: "gloss", layout: "split", titleStyle: "serif", treatment: num ? "indigo" : "ink" }),
  ];
}

/** Memoised: a banner re-renders only when its spec (by value), format or id changes. */
export const Banner = memo(BannerImpl, (a, b) => a.format === b.format && a.id === b.id && JSON.stringify(a.spec) === JSON.stringify(b.spec));
