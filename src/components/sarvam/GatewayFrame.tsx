// Gateway / medallion shape used as a window onto a surface, image or product UI.
// Spec: deliverables/1-design-system/imagery.md §2. Shapes come from src/lib/shapes.ts (also editable in /studio).
import type { CSSProperties, ReactNode } from "react";
import { GATEWAY_PRESETS, MEDALLION_PRESETS, gatewayPath, medallionPath, normalisePath, shapeSVG, type GatewayParams, type MedallionParams } from "@/lib/shapes";

type Props = {
  /** Preset name from GATEWAY_PRESETS / MEDALLION_PRESETS, or explicit params. */
  shape?: string | GatewayParams | MedallionParams;
  /** Surface class from tokens.css (e.g. "sr-gradient-dusk", "sr-tint-indigo"). Ignored if children are given. */
  surface?: string;
  /** Draw the inset frame line on top (white on dark surfaces, indigo-950 on light ones). */
  frameInk?: "light" | "dark";
  width?: CSSProperties["width"];
  children?: ReactNode;
  id: string;
  label?: string;
};

export function GatewayFrame({ shape = "Domed door", surface = "sr-gradient-dusk", frameInk, width = "100%", children, id, label }: Props) {
  const isMedallion = typeof shape === "string" ? shape in MEDALLION_PRESETS : "fold" in shape;
  const params = typeof shape === "string" ? (isMedallion ? MEDALLION_PRESETS[shape] : GATEWAY_PRESETS[shape]) : shape;
  const geom = isMedallion ? medallionPath(params as MedallionParams) : gatewayPath(params as GatewayParams);
  const clipId = `gw-${id}`;
  const frame = frameInk ? shapeSVG(geom, (params as GatewayParams).frame || 3, "line", id).replace(/<path d="[^"]+" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"\/><\/svg>$/, "</svg>") : "";
  return (
    <div role={label ? "img" : undefined} aria-label={label} style={{ position: "relative", width, aspectRatio: `${geom.width} / ${geom.height}` }}>
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
        <defs><clipPath id={clipId} clipPathUnits="objectBoundingBox"><path d={normalisePath(geom)} /></clipPath></defs>
      </svg>
      <div className={children ? undefined : surface} style={{ position: "absolute", inset: 0, clipPath: `url(#${clipId})` }}>{children}</div>
      {frame && (
        <div aria-hidden style={{ position: "absolute", inset: 0, color: frameInk === "light" ? "rgb(255 255 255 / 0.8)" : "var(--color-sr-indigo-950)" }}
          dangerouslySetInnerHTML={{ __html: frame.replace("<svg ", '<svg style="position:absolute;inset:0;width:100%;height:100%" preserveAspectRatio="none" ') }} />
      )}
    </div>
  );
}
