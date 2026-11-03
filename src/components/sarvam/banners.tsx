// Banner compositions, designed in real pixels on a 1080×1350 (4:5) artboard.
// One shared grid for every expression (recipes/meta-banner.md):
//   margin 72 · wordmark 200×32 at 72 from the top · display headline 96–104 · sub-line 32 · hero device in the body.
import type { CSSProperties, ReactNode } from "react";
import { GATEWAY_PRESETS, MEDALLION_PRESETS, cloudSVG, gatewayPath, medallionPath } from "@/lib/shapes";
import { MockPlan } from "./mocks";

export const GRID = { W: 1080, H: 1350, M: 72, markW: 200, markTop: 72 } as const;

const display = (size: number, color: string, extra: CSSProperties = {}): CSSProperties => ({
  fontFamily: "var(--font-display)", fontWeight: 400, fontSize: size, lineHeight: 1.06, letterSpacing: "-0.04em", color, margin: 0, textWrap: "balance", ...extra,
});
const sub = (color: string, extra: CSSProperties = {}): CSSProperties => ({ fontFamily: "var(--font-text)", fontSize: 32, lineHeight: 1.35, color, margin: "28px 0 0", ...extra });

function Wordmark({ tone, align }: { tone: "black" | "white"; align: "center" | "left" }) {
  const style: CSSProperties = { position: "absolute", top: GRID.markTop, width: GRID.markW, height: "auto", ...(align === "center" ? { left: (GRID.W - GRID.markW) / 2 } : { left: GRID.M }) };
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/brand/sarvam-wordmark-${tone}.svg`} alt="Sarvam" style={style} />;
}
const Canvas = ({ className = "", style, children }: { className?: string; style?: CSSProperties; children: ReactNode }) => (
  <div className={className} style={{ position: "relative", width: GRID.W, height: GRID.H, overflow: "hidden", ...style }}>{children}</div>
);

/** Campaign: nested gateway echoes rising from the bottom edge, headline inside the innermost arch. */
export function CampaignBanner({ title = "Meet Indus Cowork", line = "An AI teammate that finishes the work" }: { title?: string; line?: string }) {
  const g = gatewayPath(GATEWAY_PRESETS["Domed door"]);
  const base = GRID.H + 40, cx = GRID.W / 2;
  const widths = [620, 800, 980, 1160, 1340];
  const arches = widths.map((w, i) => {
    const h = (g.height / g.width) * w, sc = w / g.width;
    return <path key={w} d={g.d} transform={`translate(${cx - w / 2} ${base - h}) scale(${sc})`} fill={i === 0 ? "rgb(255 255 255 / 0.07)" : "none"} stroke="#fff" strokeOpacity={0.55 - i * 0.1} strokeWidth={1.6 / sc} />;
  });
  const innerTop = base - (g.height / g.width) * widths[0];
  return (
    <Canvas className="sr-gradient-saffron-rose">
      <svg width={GRID.W} height={GRID.H} style={{ position: "absolute", inset: 0 }} aria-hidden>{arches}</svg>
      <Wordmark tone="white" align="center" />
      <div style={{ position: "absolute", left: GRID.M, right: GRID.M, top: innerTop + 170, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h3 style={display(104, "#fff", { maxWidth: 560 })}>{title}</h3>
        <p style={sub("rgb(255 255 255 / 0.92)", { maxWidth: 520 })}>{line}</p>
      </div>
    </Canvas>
  );
}

/** Product: white ground, left-aligned claim on top, real product UI on a tint panel filling the body. */
export function ProductBanner({ eyebrow = "Indus Cowork", title = "It plans the work before it starts." }: { eyebrow?: string; title?: string }) {
  const panelTop = 500;
  return (
    <Canvas style={{ background: "var(--color-sf)" }}>
      <Wordmark tone="black" align="left" />
      <div style={{ position: "absolute", left: GRID.M, right: GRID.M, top: 196 }}>
        <p style={{ fontFamily: "var(--font-code)", fontSize: 22, letterSpacing: "0.13em", textTransform: "uppercase", color: "var(--color-accent)", margin: "0 0 24px" }}>{eyebrow}</p>
        <h3 style={display(88, "var(--color-tx)", { maxWidth: 820 })}>{title}</h3>
      </div>
      <div className="sr-tint-indigo" style={{ position: "absolute", left: GRID.M, right: GRID.M, top: panelTop, bottom: GRID.M, borderRadius: 40, display: "grid", placeItems: "center", overflow: "hidden", boxShadow: "inset 0 0 0 1px rgb(30 32 51 / 0.05)" }}>
        <div style={{ width: 380, transform: "scale(1.62)", transformOrigin: "center" }}><MockPlan /></div>
      </div>
    </Canvas>
  );
}

/** Community: soft cloud on a warm campaign gradient, centred headline on the cloud. */
export function CommunityBanner({ title = "The Sarvam Startup Program", line = "Everything you need to build" }: { title?: string; line?: string }) {
  const cloud = cloudSVG(medallionPath(MEDALLION_PRESETS["Scalloped medallion"]), "#f7efed", 0.06);
  return (
    <Canvas className="sr-gradient-lavender-dusk">
      <div aria-hidden style={{ position: "absolute", left: -60, right: -60, top: 180, height: 1080 }} dangerouslySetInnerHTML={{ __html: cloud.replace("<svg ", '<svg width="100%" height="100%" ') }} />
      <Wordmark tone="black" align="center" />
      <div style={{ position: "absolute", left: GRID.M, right: GRID.M, top: 0, bottom: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", paddingTop: 90 }}>
        <h3 style={display(96, "var(--color-tx)", { maxWidth: 720, letterSpacing: "-0.03em" })}>{title}</h3>
        <p style={sub("var(--color-tx-secondary)")}>{line}</p>
      </div>
    </Canvas>
  );
}
