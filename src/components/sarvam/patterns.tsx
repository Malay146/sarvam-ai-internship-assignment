// Quiet pattern layer for pages: Sarvam's own geometry (the gateway, the medallion, the studio dividers), drawn as
// hairlines in one tone, never filled, never louder than ~20% opacity. Spec: imagery.md §2–3, recipes/landing-page.md §0.
// Server components (static SVG), no animation.
import { DIVIDER_PRESETS, GATEWAY_PRESETS, MEDALLION_PRESETS, dividerPaths, gatewayPath, medallionPath } from "@/lib/shapes";

/** Gateway echo: nested gateway outlines rising from the bottom edge, like a threshold opening (hero, CTA). */
export function GatewayEcho({ count = 5, shape = "Mihrab", className = "" }: { count?: number; shape?: string; className?: string }) {
  const g = gatewayPath({ ...(GATEWAY_PRESETS[shape] ?? GATEWAY_PRESETS["Mihrab"]), bottom: "flat", frame: 0, notch: 0 });
  const W = 1000, H = 600;
  return (
    <svg className={`pt-gateway ${className}`} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" aria-hidden>
      {Array.from({ length: count }, (_, i) => {
        const s = (H * (0.42 + i * 0.16)) / g.height;          // each echo is a uniform scale of the same arch
        return <path key={i} d={g.d} fill="none" stroke="currentColor" strokeWidth={1.25} vectorEffect="non-scaling-stroke"
          opacity={1 - i * 0.16} transform={`translate(${W / 2 - (g.width * s) / 2} ${H - g.height * s}) scale(${s})`} />;
      })}
    </svg>
  );
}

/** Medallion echo: one medallion outline repeated outward (true scale steps), for dark bands and quiet corners. */
export function MedallionEcho({ shape = "Scalloped medallion", rings = 4, step = 0.32, fade = 0.2, className = "" }: { shape?: string; rings?: number; step?: number; fade?: number; className?: string }) {
  const g = medallionPath({ ...(MEDALLION_PRESETS[shape] ?? MEDALLION_PRESETS["Scalloped medallion"]), aspect: 1, frame: 0 });
  const c = g.width / 2;
  return (
    <svg className={`pt-medallion ${className}`} viewBox={`${-g.width} ${-g.height} ${g.width * 3} ${g.height * 3}`} aria-hidden>
      {Array.from({ length: rings }, (_, i) => (
        <path key={i} d={g.d} fill="none" stroke="currentColor" strokeWidth={1.25} vectorEffect="non-scaling-stroke" opacity={Math.max(0.15, 1 - i * fade)}
          transform={`translate(${c} ${c}) scale(${1 + i * step}) translate(${-c} ${-c})`} />
      ))}
    </svg>
  );
}

/** Chapter mark: a small studio divider that opens a centred chapter (sits above the eyebrow). */
export function ChapterMark({ preset = "Lotus rule" }: { preset?: string }) {
  return (
    <svg className="pt-chapter" viewBox="60 40 280 40" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden
      dangerouslySetInnerHTML={{ __html: dividerPaths(DIVIDER_PRESETS[preset] ?? DIVIDER_PRESETS["Lotus rule"]).join("") }} />
  );
}
