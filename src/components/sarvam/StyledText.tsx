// Display text for social art (imagery.md §7, from Sarvam's posts): gradient fill + inner shadow + top highlight + lift.
// Rendered as SVG so every effect is exact in exported PNGs. Lines: pass "\n" or let `balanceLines` split.
import type { CSSProperties } from "react";

export type TextFill = "white" | "gold" | "indigo" | "ink" | "goldMute";
const FILL: Record<TextFill, { stops: [number, string][]; inner: string; innerOp: number; hi: number; lift: string; liftOp: number; glow?: string }> = {
  // White on saturated gradients ("Sarvam 30B"): near-white fill, warm inner edge, soft glow.
  white: { stops: [[0, "#ffffff"], [1, "#fff6ee"]], inner: "#a13060", innerOp: 0.22, hi: 0, lift: "#11115b", liftOp: 0.18, glow: "#ffffff" },
  // Gold ("$300 Million"): light gold → saffron gold, bevel highlight, deep saffron inner shadow.
  gold: { stops: [[0, "#fbe3a6"], [0.45, "#f3c45f"], [1, "#d8942e"]], inner: "#a5460f", innerOp: 0.35, hi: 0.9, lift: "#682906", liftOp: 0.22 },
  // Muted gold for labels ("Announcing Series B"): grey → soft gold.
  goldMute: { stops: [[0, "#9a978f"], [1, "#c9a65a"]], inner: "#6b4c1c", innerOp: 0.15, hi: 0.6, lift: "#000000", liftOp: 0 },
  // Indigo two-tone ("Champions Program"): deep indigo top line(s) flowing into periwinkle.
  indigo: { stops: [[0, "#212191"], [0.48, "#3333cc"], [0.62, "#556adc"], [1, "#6a88e2"]], inner: "#11115b", innerOp: 0.28, hi: 0.7, lift: "#212191", liftOp: 0.12 },
  // Ink on light grounds.
  ink: { stops: [[0, "#1f1f1f"], [1, "#3d3d3d"]], inner: "#000000", innerOp: 0.2, hi: 0.5, lift: "#000000", liftOp: 0.06 },
};

/** Conservative average glyph width (em) used for wrapping and fitting. Digits are wider. */
export const charW = (font: "display" | "text", weight = 400, text = "") => (/^[\d$₹+%.,\s]+[A-Za-z ]*$/.test(text) && /\d/.test(text) ? 0.56 : font === "display" ? 0.47 : weight >= 600 ? 0.56 : 0.52);

/** Split text into n balanced lines (min max-line length) if it exceeds `maxChars` per line. "\n" forces breaks. */
export function balanceLines(text: string, maxChars: number): string[] {
  if (text.includes("\n")) return text.split("\n");
  const words = text.split(/\s+/);
  const n = Math.max(1, Math.ceil(text.length / maxChars));
  if (n === 1) return [text];
  let best: string[] = [text], bestScore = Infinity;
  const rec = (start: number, k: number, acc: string[]) => {
    if (k === 1) { const line = words.slice(start).join(" "); const all = [...acc, line]; const s = Math.max(...all.map((l) => l.length)); if (s < bestScore) { bestScore = s; best = all; } return; }
    for (let i = start + 1; i <= words.length - k + 1; i++) rec(i, k - 1, [...acc, words.slice(start, i).join(" ")]);
  };
  rec(0, Math.min(n, words.length), []);
  return best;
}

type Props = {
  id: string; text: string; width: number; size: number; fill: TextFill;
  font?: "display" | "text"; weight?: number; tracking?: number; leading?: number; align?: "center" | "left";
  maxChars?: number; style?: CSSProperties; "data-qa"?: string;
};

export function StyledText({ id, text, width, size, fill, font = "display", weight = 400, tracking = -0.04, leading = 1.04, align = "center", maxChars, style, "data-qa": qa }: Props) {
  const P = FILL[fill];
  const lines = balanceLines(text, maxChars ?? Math.floor(width / (size * charW(font, weight, text))));
  const lh = size * leading, pad = Math.ceil(size * 0.35);
  const H = Math.ceil(lh * lines.length + pad * 2);
  const k = (s: string) => `${s}-${id}`;
  const x = align === "center" ? width / 2 : 0;
  const fontFamily = font === "display" ? "var(--font-display)" : "var(--font-text)";
  const textEls = lines.map((l, i) => (
    <text key={i} x={x} y={pad + lh * i + size * 0.82} textAnchor={align === "center" ? "middle" : "start"}
      style={{ fontFamily, fontWeight: weight, fontSize: size, letterSpacing: `${tracking}em`, fontKerning: "normal" }}>{l}</text>
  ));
  return (
    <svg data-qa={qa} width={width} height={H} viewBox={`0 0 ${width} ${H}`} style={{ display: "block", overflow: "visible", margin: `${-pad * 0.55}px 0`, ...style }} role="img" aria-label={lines.join(" ")}>
      <defs>
        <linearGradient id={k("f")} gradientUnits="userSpaceOnUse" x1="0" y1={pad} x2="0" y2={H - pad}>{P.stops.map(([o, c]) => <stop key={o} offset={o} stopColor={c} />)}</linearGradient>
        <filter id={k("fx")} x="-10%" y="-20%" width="120%" height="160%" colorInterpolationFilters="sRGB">
          {/* inner shadow from the bottom edge, tinted */}
          <feOffset dy={-size * 0.03} in="SourceAlpha" result="up" /><feComposite in="SourceAlpha" in2="up" operator="out" result="edge" />
          <feGaussianBlur in="edge" stdDeviation={size * 0.018} result="eb" /><feFlood floodColor={P.inner} floodOpacity={P.innerOp} /><feComposite in2="eb" operator="in" result="inner0" />
          <feComposite in="inner0" in2="SourceAlpha" operator="in" result="inner" />
          {/* thin highlight along the top edge */}
          <feOffset dy={size * 0.014} in="SourceAlpha" result="dn" /><feComposite in="SourceAlpha" in2="dn" operator="out" result="top" />
          <feFlood floodColor="#ffffff" floodOpacity={P.hi} /><feComposite in2="top" operator="in" result="hi" />
          {/* lift shadow + optional glow behind */}
          <feGaussianBlur in="SourceAlpha" stdDeviation={size * 0.06} result="lb" /><feOffset in="lb" dy={size * 0.05} result="lbo" />
          <feFlood floodColor={P.lift} floodOpacity={P.liftOp} /><feComposite in2="lbo" operator="in" result="lift" />
          <feGaussianBlur in="SourceAlpha" stdDeviation={size * 0.18} result="gb" /><feFlood floodColor={P.glow ?? "#000"} floodOpacity={P.glow ? 0.35 : 0} /><feComposite in2="gb" operator="in" result="glow" />
          <feMerge><feMergeNode in="glow" /><feMergeNode in="lift" /><feMergeNode in="SourceGraphic" /><feMergeNode in="inner" /><feMergeNode in="hi" /></feMerge>
        </filter>
      </defs>
      <g fill={`url(#${k("f")})`} filter={`url(#${k("fx")})`}>{textEls}</g>
    </svg>
  );
}
