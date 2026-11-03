// Banner compositions, designed in real pixels on the grids from recipes/meta-banner.md and recipes/linkedin-banner.md.
// One component per expression; each takes a format and rearranges (not crops) for it.
import type { CSSProperties, ReactNode } from "react";
import { GATEWAY_PRESETS, MEDALLION_PRESETS, cloudSVG, gatewayPath, medallionPath } from "@/lib/shapes";
import { MockPlan } from "./mocks";

export type BannerFormat = "portrait" | "square" | "landscape";
export const FORMATS: Record<BannerFormat, { W: number; H: number; M: number; mark: number; head: number; sub: number; eyebrow: number; gap: number }> = {
  portrait: { W: 1080, H: 1350, M: 72, mark: 200, head: 104, sub: 32, eyebrow: 22, gap: 28 },
  square: { W: 1080, H: 1080, M: 72, mark: 200, head: 96, sub: 32, eyebrow: 22, gap: 28 },
  landscape: { W: 1200, H: 627, M: 56, mark: 160, head: 68, sub: 24, eyebrow: 16, gap: 20 },
};
/** @deprecated kept for the /system/expressions previews */
export const GRID = { W: 1080, H: 1350, M: 72, markW: 200, markTop: 72 } as const;

const display = (size: number, color: string, extra: CSSProperties = {}): CSSProperties => ({
  fontFamily: "var(--font-display)", fontWeight: 400, fontSize: size, lineHeight: 1.06, letterSpacing: "-0.04em", color, margin: 0, textWrap: "balance", ...extra,
});
const subStyle = (size: number, gap: number, color: string, extra: CSSProperties = {}): CSSProperties => ({
  fontFamily: "var(--font-text)", fontSize: size, lineHeight: 1.38, color, margin: `${gap}px 0 0`, textWrap: "balance", ...extra,
});
function Mark({ tone, width, style }: { tone: "black" | "white"; width: number; style?: CSSProperties }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/brand/sarvam-wordmark-${tone}.svg`} alt="Sarvam" style={{ width, height: "auto", display: "block", ...style }} />;
}
const Canvas = ({ f, className = "", style, children }: { f: BannerFormat; className?: string; style?: CSSProperties; children: ReactNode }) => (
  <div className={className} data-banner={f} style={{ position: "relative", width: FORMATS[f].W, height: FORMATS[f].H, overflow: "hidden", ...style }}>{children}</div>
);

/* ── A · Campaign: nested gateways; wordmark + headline sit inside the innermost arch ── */
export function CampaignBanner({ format = "portrait", gradient = "sr-gradient-saffron-rose", title = "Meet Indus Cowork", line = "An AI teammate that finishes the work" }:
  { format?: BannerFormat; gradient?: string; title?: string; line?: string }) {
  const F = FORMATS[format];
  // Landscape uses a wider gateway so the innermost arch can hold the headline.
  const params = format === "landscape" ? { ...GATEWAY_PRESETS["Domed door"], aspect: 0.86 } : format === "square" ? { ...GATEWAY_PRESETS["Domed door"], aspect: 1.1 } : GATEWAY_PRESETS["Domed door"];
  const g = gatewayPath(params);
  const inner = format === "landscape" ? 660 : 720;
  const widths = [0, 1, 2, 3, 4].map((i) => inner + i * (format === "landscape" ? 190 : 200));
  const base = F.H + 2;
  const arches = widths.map((w, i) => {
    const h = (g.height / g.width) * w, sc = w / g.width;
    return <path key={w} d={g.d} transform={`translate(${F.W / 2 - w / 2} ${base - h}) scale(${sc})`} fill={i === 0 ? "rgb(255 255 255 / 0.08)" : "none"} stroke="#fff" strokeOpacity={0.6 - i * 0.11} strokeWidth={1.6 / sc} />;
  });
  const innerH = (g.height / g.width) * inner;
  const bodyTop = base - innerH + innerH * params.shoulder;            // where the arch's straight sides begin
  const textW = inner * (format === "landscape" ? 0.86 : 0.78);
  return (
    <Canvas f={format} className={gradient}>
      <svg width={F.W} height={F.H} style={{ position: "absolute", inset: 0 }} aria-hidden>{arches}</svg>
      <div style={{ position: "absolute", left: (F.W - textW) / 2, width: textW, top: bodyTop, bottom: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", paddingBottom: format === "landscape" ? 24 : 80 }}>
        <Mark tone="white" width={F.mark * 0.8} style={{ marginBottom: format === "landscape" ? 28 : 56 }} />
        <h3 style={display(F.head, "#fff")}>{title}</h3>
        <p style={subStyle(F.sub, F.gap, "rgb(255 255 255 / 0.94)")}>{line}</p>
      </div>
    </Canvas>
  );
}

/* ── B · Product: claim + real product UI on a tint panel ── */
export function ProductBanner({ format = "portrait", eyebrow = "Indus Cowork", title = "It plans the work before it starts.", tint = "sr-tint-indigo" }:
  { format?: BannerFormat; eyebrow?: string; title?: string; tint?: string }) {
  const F = FORMATS[format];
  const eyebrowEl = <p style={{ fontFamily: "var(--font-code)", fontSize: F.eyebrow, letterSpacing: "0.13em", textTransform: "uppercase", color: "var(--color-accent)", margin: 0 }}>{eyebrow}</p>;
  const panel = (style: CSSProperties, scale: number) => (
    <div className={tint} style={{ position: "absolute", borderRadius: format === "landscape" ? 28 : 40, display: "grid", placeItems: "center", overflow: "hidden", boxShadow: "inset 0 0 0 1px rgb(30 32 51 / 0.05)", ...style }}>
      <div style={{ width: 380, transform: `scale(${scale})`, transformOrigin: "center" }}><MockPlan freeze={2} /></div>
    </div>
  );
  if (format === "landscape") {
    return (
      <Canvas f={format} style={{ background: "var(--color-sf)" }}>
        <Mark tone="black" width={F.mark} style={{ position: "absolute", left: F.M, top: F.M }} />
        <div style={{ position: "absolute", left: F.M, width: 500, top: 0, bottom: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: 20, paddingTop: 40 }}>
          {eyebrowEl}
          <h3 style={display(F.head, "var(--color-tx)")}>{title}</h3>
        </div>
        {panel({ left: 620, right: 32, top: 32, bottom: 32 }, 1.3)}
      </Canvas>
    );
  }
  const top = format === "portrait" ? 200 : 176;
  return (
    <Canvas f={format} style={{ background: "var(--color-sf)" }}>
      <Mark tone="black" width={F.mark} style={{ position: "absolute", left: F.M, top: F.M }} />
      <div style={{ position: "absolute", left: F.M, right: F.M, top, display: "flex", flexDirection: "column", gap: 24 }}>
        {eyebrowEl}
        <h3 style={display(format === "portrait" ? 92 : 84, "var(--color-tx)", { maxWidth: 860 })}>{title}</h3>
      </div>
      {panel({ left: F.M, right: F.M, top: format === "portrait" ? 520 : 470, bottom: F.M }, format === "portrait" ? 2.05 : 1.5)}
    </Canvas>
  );
}

/* ── C · Community: soft cloud on a warm gradient, centred headline ── */
export function CommunityBanner({ format = "square", gradient = "sr-gradient-lavender-dusk", title = "Your newest colleague lives in Slack.", line = "Message an Indus Cowork teammate in Slack or Indus Chat." }:
  { format?: BannerFormat; gradient?: string; title?: string; line?: string }) {
  const F = FORMATS[format];
  // Crisper cloud so the scalloped edge reads (Sarvam's customer-story posts); centred on the text block.
  const cloud = cloudSVG(medallionPath(MEDALLION_PRESETS["Scalloped medallion"]), "#f7efed", 0.032);
  const cloudBox: CSSProperties = format === "landscape"
    ? { left: 110, right: 110, top: -20, bottom: -50 }
    : format === "portrait" ? { left: -30, right: -30, top: 250, bottom: 70 } : { left: 20, right: 20, top: 120, bottom: 0 };
  return (
    <Canvas f={format} className={gradient}>
      <div aria-hidden style={{ position: "absolute", ...cloudBox }} dangerouslySetInnerHTML={{ __html: cloud.replace("<svg ", `<svg width="100%" height="100%" ${format === "landscape" ? 'preserveAspectRatio="none" ' : ""}`).replace('preserveAspectRatio="xMidYMid meet"', format === "landscape" ? "" : 'preserveAspectRatio="xMidYMid meet"') }} />
      <Mark tone="black" width={F.mark} style={{ position: "absolute", top: F.M, left: (F.W - F.mark) / 2 }} />
      <div style={{ position: "absolute", left: F.M, right: F.M, top: 0, bottom: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", paddingTop: format === "landscape" ? 50 : 70 }}>
        <h3 style={display(format === "landscape" ? F.head : 92, "var(--color-tx)", { maxWidth: format === "landscape" ? 660 : 760, letterSpacing: "-0.03em" })}>{title}</h3>
        <p style={subStyle(F.sub, F.gap, "var(--color-tx-secondary)", { maxWidth: format === "landscape" ? 560 : 640 })}>{line}</p>
      </div>
    </Canvas>
  );
}
