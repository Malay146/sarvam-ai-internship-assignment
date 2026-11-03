// Emblem art, built only from our own assets (imagery.md §2.4):
//   1. one of our named gradients + grain + a soft centre light
//   2. "echo rings": the emblem's own shape repeated outward in fading layers, each with a soft glow
//      (the mandala idea: each layer reveals more, coherent only as a whole)
//   3. a crisp white emblem (gateway / medallion / flower from /studio) with a subtle inner shadow
//   4. a stroke icon cut into the emblem in the surface's accessible shade
// Pure SVG, server-rendered, no animation. Every card uses the same emblem box, so siblings match.
import type { ComponentType, SVGProps } from "react";
import {
  FLOWER_PRESETS, GATEWAY_PRESETS, MEDALLION_PRESETS, flowerPath, gatewayPath, medallionPath,
} from "@/lib/shapes";

type IconC = ComponentType<SVGProps<SVGSVGElement> & { strokeWidth?: number }>;
export type EmblemSurface = "lavender" | "dawn" | "leaf" | "indigo" | "dusk";
export type EmblemShape = { family: "gateway" | "medallion" | "flower"; preset: string };

// Stops come from tokens.css (tints, dawn, indigo glow, dusk). `ink` = icon shade (≥ 3:1 on white), `rim` = inner shadow.
// Ground = our named gradients exactly as sampled from Sarvam (tokens.css), with their real directions.
// ink = icon shade (≥ 3:1 on white) · rim = tinted inner shadow · ring = echo-ring colour · light = centre glow
type Stop = [number, string];
const SURF: Record<EmblemSurface, { dir: [number, number, number, number]; stops: Stop[]; light: string; ink: string; rim: string; ring: string }> = {
  lavender: { dir: [0, 0, 1, 1], stops: [[0, "#e6ecfd"], [0.5, "#d5dffc"], [1, "#b8c9fa"]], light: "#ffffff", ink: "#3333cc", rim: "#4250d5", ring: "#ffffff" },             // --gradient-tint-indigo (135°)
  leaf: { dir: [0, 0, 0, 1], stops: [[0, "#d8efde"], [0.5, "#b6dcc6"], [1, "#bcd1ee"]], light: "#ffffff", ink: "#496d21", rim: "#496d21", ring: "#ffffff" },                // --gradient-tint-green (180°)
  dawn: { dir: [0, 0, 0, 1], stops: [[0, "#e2680d"], [0.3, "#fa8622"], [0.55, "#fba850"], [0.8, "#e1c0a3"], [1, "#cecedf"]], light: "#fff8e6", ink: "#a5460f", rim: "#a5460f", ring: "#fff0cf" },  // --gradient-dawn, middle → bottom
  indigo: { dir: [0, 0, 0, 1], stops: [[0, "#3838ce"], [0.25, "#554dc9"], [0.5, "#8a79ca"], [0.65, "#bca0c4"], [0.75, "#e2b6b7"], [1, "#f6c0ac"]], light: "#d2dff9", ink: "#3333cc", rim: "#11115b", ring: "#d2dff9" },  // --gradient-indigo-glow
  dusk: { dir: [0, 0, 0, 1], stops: [[0, "#181a1c"], [0.25, "#202f50"], [0.5, "#6079b0"], [0.7, "#b8beda"], [0.85, "#e0b292"], [1, "#f89536"]], light: "#e8effc", ink: "#1f2f55", rim: "#11115b", ring: "#e8effc" },  // --gradient-dusk
};

function geomFor(s: EmblemShape) {
  if (s.family === "gateway") return gatewayPath(GATEWAY_PRESETS[s.preset] ?? GATEWAY_PRESETS["Domed door"]);
  if (s.family === "flower") return flowerPath(FLOWER_PRESETS[s.preset] ?? FLOWER_PRESETS["Rosette"]);
  return medallionPath(MEDALLION_PRESETS[s.preset] ?? MEDALLION_PRESETS["Ogee cross"]);
}

type Props = { id: string; shape: EmblemShape; icon?: IconC; surface?: EmblemSurface; aspect?: number; label?: string };

export function EmblemArt({ id, shape, icon: Icon, surface = "lavender", aspect = 1.6, label }: Props) {
  const P = SURF[surface];
  const H = 200, W = Math.round(H * aspect), cx = W / 2, cy = H / 2;
  const k = (s: string) => `${s}-${id}`;
  const u = (s: string) => `url(#${k(s)})`;
  const g = geomFor(shape);
  const box = 104;                                             // emblem height (of a 200-high canvas): same in every card
  const sc = box / Math.max(g.width, g.height);
  const ew = g.width * sc, eh = g.height * sc;
  const at = (scale: number) => `translate(${cx - (ew * scale) / 2} ${cy - (eh * scale) / 2}) scale(${sc * scale})`;
  const px = (n: number, scale = 1) => n / (sc * scale);       // screen px → shape units
  const echoes = [1.5, 2.1, 2.8, 3.6];
  const iconSize = box * 0.34;
  const iy = cy - iconSize / 2 + (shape.family === "gateway" ? eh * 0.08 : 0);
  const gap = 5.5;                                             // inset frame, in shape units

  return (
    <svg viewBox={`0 0 ${W} ${H}`} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true} preserveAspectRatio="xMidYMid slice" style={{ display: "block", width: "100%", height: "100%" }}>
      <defs>
        {/* ground: a named Sarvam gradient + a gentle centre light */}
        <linearGradient id={k("bg")} x1={P.dir[0]} y1={P.dir[1]} x2={P.dir[2]} y2={P.dir[3]}>{P.stops.map(([o, c]) => <stop key={o} offset={o} stopColor={c} />)}</linearGradient>
        <radialGradient id={k("light")} cx="0.5" cy="0.5" r="0.42"><stop offset="0" stopColor={P.light} stopOpacity="0.5" /><stop offset="1" stopColor={P.light} stopOpacity="0" /></radialGradient>
        {/* emblem materials */}
        <linearGradient id={k("body")} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffffff" stopOpacity="0.97" /><stop offset="0.6" stopColor="#ffffff" stopOpacity="0.86" /><stop offset="1" stopColor="#ffffff" stopOpacity="0.74" /></linearGradient>
        <linearGradient id={k("rimg")} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#ffffff" stopOpacity="0.25" /></linearGradient>
        <radialGradient id={k("sheen")} cx="0.35" cy="0.2" r="0.55"><stop offset="0" stopColor="#ffffff" stopOpacity="0.9" /><stop offset="1" stopColor="#ffffff" stopOpacity="0" /></radialGradient>
        <clipPath id={k("clip")}><path d={g.d} /></clipPath>
        <mask id={k("frame")} maskUnits="userSpaceOnUse" x="-50" y="-50" width="300" height="300"><path d={g.d} fill="#fff" /><path d={g.d} fill="none" stroke="#000" strokeWidth={2 * (gap - px(0.5))} /></mask>
        {/* filters */}
        <filter id={k("blur1")} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1" /></filter>
        <filter id={k("blur3")} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" /></filter>
        <filter id={k("blur12")} x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="12" /></filter>
        <filter id={k("float")} x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="8" stdDeviation="9" floodColor={P.rim} floodOpacity="0.22" />
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.2" floodColor={P.rim} floodOpacity="0.22" />
        </filter>
        <filter id={k("bevel")} x="-10%" y="-10%" width="120%" height="120%">
          {/* top highlight */}
          <feOffset dy="2" in="SourceAlpha" result="dn" /><feComposite in="SourceAlpha" in2="dn" operator="out" result="topEdge" />
          <feGaussianBlur in="topEdge" stdDeviation="0.6" result="topB" /><feFlood floodColor="#ffffff" floodOpacity="0.95" /><feComposite in2="topB" operator="in" result="hi" />
          {/* bottom inner shadow, tinted */}
          <feOffset dy="-3" in="SourceAlpha" result="up" /><feComposite in="SourceAlpha" in2="up" operator="out" result="botEdge" />
          <feGaussianBlur in="botEdge" stdDeviation="2.2" result="botB" /><feFlood floodColor={P.rim} floodOpacity="0.38" /><feComposite in2="botB" operator="in" result="lo" />
          <feComposite in="lo" in2="SourceAlpha" operator="in" result="loIn" />
          <feMerge><feMergeNode in="SourceGraphic" /><feMergeNode in="loIn" /><feMergeNode in="hi" /></feMerge>
        </filter>
        <filter id={k("grain")}><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /><feComponentTransfer><feFuncA type="table" tableValues="0 0.16" /></feComponentTransfer></filter>
      </defs>

      {/* 1 · ground */}
      <rect width={W} height={H} fill={u("bg")} />
      <rect width={W} height={H} fill={u("light")} />

      {/* 2 · echo rings: glow, light line, and a darker groove 1px below → embossed */}
      <g fill="none">
        {echoes.map((s, i) => (
          <g key={s} transform={at(s)}>
            <path d={g.d} stroke={P.ring} strokeWidth={px(6, s)} opacity={0.16 - i * 0.03} filter={u("blur3")} />
            <path d={g.d} stroke={P.rim} strokeWidth={px(1, s)} opacity={0.14 - i * 0.025} transform={`translate(0 ${px(1, s)})`} />
            <path d={g.d} stroke={P.ring} strokeWidth={px(1, s)} opacity={0.5 - i * 0.1} />
          </g>
        ))}
      </g>
      {/* 3 · lift: wide halo + close halo */}
      <ellipse cx={cx} cy={cy} rx={ew * 0.9} ry={eh * 0.75} fill={P.light} opacity="0.35" filter={u("blur12")} />

      {/* 4 · emblem: float shadows → frosted body with bevel → inner sheen → inset frame → crisp rim */}
      <g transform={at(1)}>
        <g filter={u("float")}><path d={g.d} fill={u("body")} filter={u("bevel")} /></g>
        <g clipPath={u("clip")}><ellipse cx={g.width * 0.38} cy={g.height * 0.18} rx={g.width * 0.45} ry={g.height * 0.32} fill={u("sheen")} opacity="0.7" /></g>
        <path d={g.d} fill="none" stroke={P.rim} strokeOpacity="0.28" strokeWidth={2 * (gap + px(0.5))} mask={u("frame")} />
        <path d={g.d} fill="none" stroke={u("rimg")} strokeWidth={px(1.25)} />
      </g>

      {/* 5 · engraved icon: a white highlight 0.8px below, then the tinted line */}
      {Icon && <>
        <Icon x={cx - iconSize / 2} y={iy + 0.8} width={iconSize} height={iconSize} color="#ffffff" strokeWidth={1.75} opacity={0.9} />
        <Icon x={cx - iconSize / 2} y={iy} width={iconSize} height={iconSize} color={P.ink} strokeWidth={1.75} />
      </>}

      {/* 6 · finish: grain */}
      <rect width={W} height={H} filter={u("grain")} style={{ mixBlendMode: "overlay" }} />
    </svg>
  );
}

/** Emblem card: emblem art on top, then label, title and one line (sibling-ready). */
export function EmblemCard({ art, eyebrow, title, desc }: { art: React.ReactNode; eyebrow: string; title: string; desc: string }) {
  return (
    <article className="sr-card sr-card--emblem" data-sibling>
      <div className="sr-card__art">{art}</div>
      <p className="sr-eyebrow sr-eyebrow--mono">{eyebrow}</p>
      <h3 className="sr-h4 sr-card__title" data-line="title">{title}</h3>
      <p className="sr-body sr-card__desc" data-line="desc">{desc}</p>
    </article>
  );
}
