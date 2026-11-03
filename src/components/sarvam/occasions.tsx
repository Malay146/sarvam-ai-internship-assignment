// Occasion banners: one brief → Launch / Campaign / Milestone / Funding art in any format.
// Spec: design-system/recipes/banner-brief.md. Built only from tokens, studio shapes and our components.
import type { CSSProperties, ReactNode } from "react";
import { GATEWAY_PRESETS, MEDALLION_PRESETS, gatewayPath, glossSVG, medallionPath, type GatewayParams } from "@/lib/shapes";
import { MockPlan, MockResearch, MockReview } from "./mocks";
import { StyledText } from "./StyledText";
import { FORMATS, type BannerFormat } from "./banners";

export type Occasion = "launch" | "campaign" | "milestone" | "funding";
export type StackPalette = "saffron" | "dusk" | "indigo" | "olive" | "night";
export type Brief = {
  occasion: Occasion;
  palette?: StackPalette;
  eyebrow?: string;      // small line above the headline ("Introducing", "Indus Cowork", "Announcing Series B")
  title: string;         // headline / product name ("\n" forces a break)
  sub?: string;          // one supporting line
  stat?: string;         // milestone number or funding amount ("100+", "$300 Million")
  mock?: "plan" | "research" | "review";   // campaign: which product moment leads
};

/* Layer palettes: each band is filled core → edge (radial), so nested bands read as carved steps. Brand ramps only. */
const STACK: Record<StackPalette, { ground: string; core: string; mid: string; edge: string; shadow: string; rim: string }> = {
  saffron: { ground: "sr-gradient-saffron-rose", core: "#a13060", mid: "#c4706e", edge: "#f1c480", shadow: "#611c35", rim: "#ffe8b7" },
  dusk: { ground: "sr-gradient-dusk", core: "#1c273e", mid: "#4a649c", edge: "#c8bfcc", shadow: "#11115b", rim: "#e8effc" },
  indigo: { ground: "sr-gradient-indigo-glow", core: "#3333cc", mid: "#7c71d0", edge: "#e2b6b7", shadow: "#11115b", rim: "#f9d5e1" },
  olive: { ground: "sr-gradient-olive", core: "#486523", mid: "#72842a", edge: "#c2a12d", shadow: "#263d0e", rim: "#ffe8b7" },
  night: { ground: "sr-gradient-night", core: "#13121e", mid: "#30344a", edge: "#899bd2", shadow: "#000000", rim: "#d2dff9" },
};

type Geom = { d: string; width: number; height: number };
/** Map an absolute-command path (M/L/C/Q/Z) into canvas pixels: x·s + tx, y·s + ty. */
const place = (d: string, s: number, tx: number, ty: number) => { let i = 0; return d.replace(/-?\d+(\.\d+)?/g, (m) => String(+((i++ % 2 === 0 ? +m * s + tx : +m * s + ty).toFixed(2)))); };

/** Carved stack: nested copies of one shape as filled layers (outer → inner). Each layer casts a soft shadow
 *  onto the one behind and carries a crisp rim highlight. The innermost can be lit ("glow") or a cream window. */
function LayerStack({ id, geom, W, H, cx, anchorY, innerW, step, count, palette, anchor = "bottom", inner = "glow" }: {
  id: string; geom: Geom; W: number; H: number; cx: number; anchorY: number; innerW: number; step: number; count: number;
  palette: StackPalette; anchor?: "bottom" | "center"; inner?: "glow" | "window";
}) {
  const P = STACK[palette];
  const k = (s: string) => `${s}-${id}`;
  const layers = Array.from({ length: count }, (_, i) => count - 1 - i).map((i) => {
    const w = innerW + i * step, h = (geom.height / geom.width) * w, sc = w / geom.width;
    const x = cx - w / 2, y = anchor === "bottom" ? anchorY - h : anchorY - h / 2;
    return { i, w, h, sc, x, y };
  });
  return (
    <svg width={W} height={H} style={{ position: "absolute", inset: 0 }} aria-hidden>
      <defs>
        {layers.map((L) => (
          <radialGradient key={L.i} id={k(`g${L.i}`)} gradientUnits="userSpaceOnUse" cx={cx} cy={anchor === "bottom" ? anchorY : anchorY} r={Math.max(L.w, L.h) * (anchor === "bottom" ? 0.95 : 0.6)}>
            <stop offset="0" stopColor={P.core} /><stop offset="0.6" stopColor={P.mid} /><stop offset="1" stopColor={P.edge} />
          </radialGradient>
        ))}
        <radialGradient id={k("lit")} gradientUnits="objectBoundingBox" cx="0.5" cy={anchor === "bottom" ? 0.62 : 0.5} r="0.6">
          <stop offset="0" stopColor="#fff" stopOpacity={inner === "window" ? 1 : 0.22} /><stop offset="1" stopColor={inner === "window" ? "#f4e7c5" : "#fff"} stopOpacity={inner === "window" ? 1 : 0} />
        </radialGradient>
        <filter id={k("cast")} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="14" floodColor={P.shadow} floodOpacity="0.42" />
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor={P.shadow} floodOpacity="0.25" />
        </filter>
        <filter id={k("innerWin")} x="-10%" y="-10%" width="120%" height="120%">
          <feOffset dy="6" in="SourceAlpha" result="o" /><feGaussianBlur in="o" stdDeviation="9" result="b" />
          <feComposite in="b" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="in" />
          <feFlood floodColor={P.shadow} floodOpacity="0.4" /><feComposite in2="in" operator="in" result="t" />
          <feMerge><feMergeNode in="SourceGraphic" /><feMergeNode in="t" /></feMerge>
        </filter>
      </defs>
      {layers.map((L) => {
        const d = place(geom.d, L.sc, L.x, L.y);
        return (
          <g key={L.i}>
            <path d={d} fill={`url(#${k(`g${L.i}`)})`} filter={`url(#${k("cast")})`} />
            <path d={d} fill="none" stroke={P.rim} strokeOpacity={0.55} strokeWidth={1.25} />
            {L.i === 0 && <path d={d} fill={`url(#${k("lit")})`} filter={inner === "window" ? `url(#${k("innerWin")})` : undefined} />}
          </g>
        );
      })}
    </svg>
  );
}

/* Shared pieces */
function Mark({ tone, width, style }: { tone: "black" | "white"; width: number; style?: CSSProperties }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/brand/sarvam-wordmark-${tone}.svg`} alt="Sarvam" style={{ width, height: "auto", display: "block", ...style }} />;
}
const markW = (f: BannerFormat) => (f === "landscape" ? 96 : 124);                      // minimal, like Sarvam's posts
const Canvas = ({ f, className = "", style, children }: { f: BannerFormat; className?: string; style?: CSSProperties; children: ReactNode }) => (
  <div className={className} data-banner={f} style={{ position: "relative", width: FORMATS[f].W, height: FORMATS[f].H, overflow: "hidden", ...style }}>{children}</div>
);
const Pill = ({ children, tone }: { children: ReactNode; tone: "light" | "dark" }) => (
  <span style={{ display: "inline-flex", alignItems: "center", height: 40, padding: "0 18px", borderRadius: 999, fontFamily: "var(--font-code)", fontSize: 17, letterSpacing: "0.14em", textTransform: "uppercase",
    color: tone === "light" ? "#fff" : "var(--color-sr-indigo-800)", background: tone === "light" ? "rgb(255 255 255 / 0.14)" : "rgb(255 255 255 / 0.7)",
    boxShadow: tone === "light" ? "inset 0 1px 0 rgb(255 255 255 / 0.45), inset 0 0 0 1px rgb(255 255 255 / 0.28)" : "inset 0 0 0 1px var(--color-sr-indigo-100)" }}>{children}</span>
);
const subP = (size: number, color: string, extra: CSSProperties = {}): CSSProperties => ({ fontFamily: "var(--font-text)", fontSize: size, lineHeight: 1.38, color, margin: 0, textWrap: "balance", ...extra });

/* ── Launch: carved gateway stack, the product name inside the lit doorway ── */
function Launch({ b, f, id }: { b: Brief; f: BannerFormat; id: string }) {
  const F = FORMATS[f]; const pal = b.palette ?? "saffron";
  const base: GatewayParams = GATEWAY_PRESETS["Domed door"];
  const params = { ...base, aspect: f === "landscape" ? 0.9 : f === "square" ? 1.12 : 1.42, frame: 0 };
  const g = gatewayPath(params);
  const innerW = f === "landscape" ? 640 : 680, step = f === "landscape" ? 150 : 150;
  const innerH = (g.height / g.width) * innerW, bodyTop = F.H - innerH + innerH * params.shoulder;
  const textW = innerW * 0.8, size = f === "landscape" ? 72 : f === "square" ? 104 : 112;
  return (
    <Canvas f={f} className={STACK[pal].ground}>
      <LayerStack id={id} geom={g} W={F.W} H={F.H} cx={F.W / 2} anchorY={F.H + 4} innerW={innerW} step={step} count={4} palette={pal} />
      <div style={{ position: "absolute", left: (F.W - textW) / 2, width: textW, top: bodyTop, bottom: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: f === "landscape" ? 18 : 28, textAlign: "center", paddingBottom: f === "landscape" ? 20 : 70 }}>
        <Mark tone="white" width={markW(f)} />
        {b.eyebrow && <Pill tone="light">{b.eyebrow}</Pill>}
        <StyledText id={`${id}-t`} text={b.title} width={textW} size={size} fill="white" />
        {b.sub && <p style={subP(F.sub, "rgb(255 255 255 / 0.92)", { maxWidth: textW })}>{b.sub}</p>}
      </div>
    </Canvas>
  );
}

/* ── Campaign: two-tone headline + a stack of real product moments + gloss shapes ── */
function Campaign({ b, f, id }: { b: Brief; f: BannerFormat; id: string }) {
  const F = FORMATS[f];
  const Front = b.mock === "research" ? MockResearch : b.mock === "review" ? MockReview : MockPlan;
  const Back = b.mock === "research" ? MockReview : b.mock === "review" ? MockPlan : MockResearch;
  const gBig = glossSVG(medallionPath(MEDALLION_PRESETS["Scalloped medallion"]), "periwinkle", `${id}-gb`);
  const land = f === "landscape";
  const scale = land ? 1.08 : f === "square" ? 1.32 : 1.62;
  const stackCx = land ? 905 : F.W / 2, stackTop = land ? 120 : f === "square" ? 470 : 600;
  const cardW = 380 * scale;
  const svgBox = (html: string, style: CSSProperties) => <div aria-hidden style={{ position: "absolute", ...style }} dangerouslySetInnerHTML={{ __html: html.replace("<svg ", '<svg width="100%" height="100%" ') }} />;
  return (
    <Canvas f={f} className="sr-gradient-lavender-dusk">
      {svgBox(gBig, land ? { left: 770, top: 20, width: 380, height: 380 } : { left: stackCx + cardW * 0.08, top: stackTop - 210 * (scale / 1.6), width: 520 * (scale / 1.6), height: 520 * (scale / 1.6) })}
      {/* back card */}
      <div style={{ position: "absolute", width: 380, left: stackCx - 190 + 64 * scale, top: stackTop - 54 * scale, transform: `scale(${scale * 0.9})`, transformOrigin: "top center", opacity: 0.94, filter: "saturate(0.9)" }}><Back freeze={3} /></div>
      {/* front card */}
      <div style={{ position: "absolute", width: 380, left: stackCx - 190, top: stackTop, transform: `scale(${scale})`, transformOrigin: "top center", filter: "drop-shadow(0 24px 40px rgb(17 17 91 / 0.22))" }}><Front freeze={2} /></div>
      <Mark tone="black" width={markW(f)} style={{ position: "absolute", left: F.M, top: F.M }} />
      <div style={{ position: "absolute", left: F.M, top: land ? 0 : f === "square" ? 150 : 180, bottom: land ? 0 : undefined, width: land ? 520 : F.W - F.M * 2, display: "flex", flexDirection: "column", justifyContent: land ? "center" : "flex-start", gap: land ? 18 : 24 }}>
        {b.eyebrow && <p style={{ fontFamily: "var(--font-code)", fontSize: F.eyebrow, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-sr-indigo-800)", margin: 0 }}>{b.eyebrow}</p>}
        <StyledText id={`${id}-t`} text={b.title} width={land ? 520 : 900} size={land ? 64 : f === "square" ? 88 : 100} fill="indigo" align="left" />
        {b.sub && <p style={subP(F.sub, "var(--color-tx-secondary)", { maxWidth: land ? 460 : 760 })}>{b.sub}</p>}
      </div>
    </Canvas>
  );
}

/* ── Milestone: a gold number at the centre of a carved medallion stack ── */
function Milestone({ b, f, id }: { b: Brief; f: BannerFormat; id: string }) {
  const F = FORMATS[f]; const pal = b.palette ?? "night"; const land = f === "landscape";
  const g = medallionPath(MEDALLION_PRESETS["Scalloped medallion"]);
  const cy = land ? F.H / 2 + 6 : F.H / 2 + 20;
  const innerW = land ? 440 : f === "square" ? 600 : 640;
  return (
    <Canvas f={f} className={STACK[pal].ground}>
      <LayerStack id={id} geom={g} W={F.W} H={F.H} cx={F.W / 2} anchorY={cy} innerW={innerW} step={land ? 150 : 170} count={4} palette={pal} anchor="center" />
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: land ? 10 : 18, paddingTop: land ? 12 : 40 }}>
        {b.eyebrow && <p style={{ fontFamily: "var(--font-code)", fontSize: F.eyebrow, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgb(255 255 255 / 0.78)", margin: 0 }}>{b.eyebrow}</p>}
        <StyledText id={`${id}-n`} text={b.stat ?? ""} width={innerW} size={land ? 170 : f === "square" ? 250 : 270} fill="gold" tracking={-0.05} />
        <StyledText id={`${id}-t`} text={b.title} width={innerW * 0.82} size={land ? 32 : 48} fill="white" tracking={-0.02} leading={1.15} />
      </div>
      <Mark tone="white" width={markW(f)} style={{ position: "absolute", left: (F.W - markW(f)) / 2, bottom: land ? 40 : F.M }} />
    </Canvas>
  );
}

/* ── Funding: a carved cusped gateway opening onto warm light; gold amount ── */
function Funding({ b, f, id }: { b: Brief; f: BannerFormat; id: string }) {
  const F = FORMATS[f]; const pal = b.palette ?? "olive"; const land = f === "landscape";
  const params: GatewayParams = { ...GATEWAY_PRESETS["Framed jharokha"], bottom: "flat", aspect: land ? 0.86 : f === "square" ? 1.1 : 1.36, frame: 0, notch: 0 };
  const g = gatewayPath(params);
  const innerW = land ? 700 : 760;
  const innerH = (g.height / g.width) * innerW, top = F.H - innerH, bodyTop = top + innerH * params.shoulder;
  const textW = innerW * 0.82;
  return (
    <Canvas f={f} className={STACK[pal].ground}>
      <LayerStack id={id} geom={g} W={F.W} H={F.H} cx={F.W / 2} anchorY={F.H + 4} innerW={innerW} step={land ? 110 : 130} count={3} palette={pal} inner="window" />
      <div style={{ position: "absolute", left: (F.W - textW) / 2, width: textW, top: bodyTop, bottom: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: land ? 8 : 14, textAlign: "center", paddingBottom: land ? 30 : 90 }}>
        <Mark tone="black" width={markW(f) * 0.9} style={{ marginBottom: land ? 10 : 22, opacity: 0.85 }} />
        {b.eyebrow && <StyledText id={`${id}-e`} text={b.eyebrow} width={textW} size={land ? 34 : 48} fill="goldMute" tracking={-0.02} />}
        <StyledText id={`${id}-n`} text={b.stat ?? b.title} width={textW} size={land ? 92 : f === "square" ? 128 : 140} fill="gold" tracking={-0.04} />
        {b.sub && <p style={subP(F.sub, "var(--color-tx-secondary)", { maxWidth: textW * 0.9, marginTop: land ? 8 : 16 })}>{b.sub}</p>}
      </div>
    </Canvas>
  );
}

export function OccasionBanner({ brief, format, id }: { brief: Brief; format: BannerFormat; id: string }) {
  const T = { launch: Launch, campaign: Campaign, milestone: Milestone, funding: Funding }[brief.occasion];
  return <T b={brief} f={format} id={id} />;
}

/** Starter briefs per occasion (also the defaults in /banners/make). */
export const EXAMPLES: Record<Occasion, Brief> = {
  launch: { occasion: "launch", palette: "saffron", eyebrow: "Introducing", title: "Indus Cowork", sub: "An AI teammate that finishes the work" },
  campaign: { occasion: "campaign", eyebrow: "Indus Cowork", title: "It plans the work before it starts.", sub: "Your request becomes a to-do list it works through, step by step.", mock: "plan" },
  milestone: { occasion: "milestone", palette: "night", eyebrow: "Indus Cowork", stat: "100+", title: "apps your teammates can work in" },
  funding: { occasion: "funding", palette: "olive", eyebrow: "Announcing Series B", stat: "$300 Million", title: "Series B", sub: "To build AI for all from India" },
};
