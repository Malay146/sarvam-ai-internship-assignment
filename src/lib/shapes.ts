// Parametric generators for Sarvam's gateway shapes, line motifs and scroll dividers.
// Pure functions → SVG path strings. Used by /studio and by <GatewayFrame>.
// Spec: design-system/imagery.md (gateway + motif rules).

type P = [number, number];
type Seg = { t: "L"; to: P } | { t: "C"; c1: P; c2: P; to: P } | { t: "Q"; c: P; to: P };
const f = (n: number) => +n.toFixed(2);

/* ───────────── Gateway shapes ───────────── */
export type GatewayParams = {
  aspect: number;        // height / width (0.8 – 1.5)
  top: "ogee" | "round" | "point" | "flat";
  bottom: "mirror" | "flat" | "round";
  shoulder: number;      // 0.15 – 0.4: where the top cap ends (fraction of height)
  lobes: number;         // 0 – 4 scallops down each side
  lobeDepth: number;     // -8 … 8: + bulges out (scallop), − cuts in (cusp)
  waist: number;         // 0 – 10: side inset from the bounding box
  notch: number;         // 0 – 8: stepped corner notch at the shoulder
  crown: number;         // 0 – 10: extra height of the ogee point / finial
  dome?: number;         // 0.35 – 1: width of the top cap relative to the body (< 1 = dome on a ledge)
  frame?: number;        // 0 = none, 2 – 8 = inner frame line inset by this much
};

export const GATEWAY_PRESETS: Record<string, GatewayParams> = {
  "Onion arch": { aspect: 1.25, top: "ogee", bottom: "flat", shoulder: 0.32, lobes: 0, lobeDepth: 0, waist: 2, notch: 0, crown: 6 },
  "Jharokha": { aspect: 1.1, top: "ogee", bottom: "mirror", shoulder: 0.26, lobes: 1, lobeDepth: 5, waist: 4, notch: 0, crown: 4 },
  "Cusped window": { aspect: 1.2, top: "round", bottom: "flat", shoulder: 0.3, lobes: 2, lobeDepth: -4, waist: 2, notch: 0, crown: 0 },
  "Medallion": { aspect: 1.0, top: "ogee", bottom: "mirror", shoulder: 0.22, lobes: 2, lobeDepth: 4, waist: 6, notch: 0, crown: 3 },
  "Stepped gate": { aspect: 1.15, top: "point", bottom: "mirror", shoulder: 0.25, lobes: 1, lobeDepth: 3, waist: 4, notch: 5, crown: 2 },
  "Lantern": { aspect: 1.4, top: "ogee", bottom: "mirror", shoulder: 0.3, lobes: 0, lobeDepth: 0, waist: 0, notch: 0, crown: 8 },
  "Domed door": { aspect: 1.45, top: "ogee", bottom: "flat", shoulder: 0.42, lobes: 0, lobeDepth: 0, waist: 6, notch: 0, crown: 4, dome: 0.78, frame: 3 },
  "Mihrab": { aspect: 1.5, top: "ogee", bottom: "flat", shoulder: 0.3, lobes: 0, lobeDepth: 0, waist: 4, notch: 0, crown: 6, dome: 0.62, frame: 3 },
  "Quatrefoil": { aspect: 1.0, top: "round", bottom: "mirror", shoulder: 0.22, lobes: 1, lobeDepth: 6, waist: 12, notch: 0, crown: 0, dome: 0.42, frame: 3 },
  "Framed jharokha": { aspect: 1.3, top: "ogee", bottom: "mirror", shoulder: 0.28, lobes: 1, lobeDepth: 2.5, waist: 4, notch: 3, crown: 6, dome: 0.85, frame: 3 },
  "Lobed medallion": { aspect: 1.05, top: "ogee", bottom: "mirror", shoulder: 0.3, lobes: 1, lobeDepth: 5, waist: 8, notch: 0, crown: 7, dome: 1, frame: 3 },
  "Tall door": { aspect: 1.7, top: "round", bottom: "flat", shoulder: 0.14, lobes: 0, lobeDepth: 0, waist: 8, notch: 0, crown: 0, dome: 1, frame: 3 },
};

/** Right half of the outline, from top centre (50, 0) to bottom centre (50, H), in a 100-wide box. */
function gatewayRightHalf(p: GatewayParams): { start: P; segs: Seg[]; H: number } {
  const H = 100 * p.aspect;
  const sx = 100 - p.waist;                 // side x
  const capY = H * p.shoulder;              // y where the top cap meets the side
  const crown = p.crown;
  const segs: Seg[] = [];
  const start: P = [50, 0];

  // Top cap: (50,0) → (capX, capY), then a ledge out to the side if the dome is narrower than the body.
  const dome = Math.min(1, Math.max(0.3, p.dome ?? 1));
  const bodyX = sx;
  {
  const sx = 50 + (bodyX - 50) * dome;   // cap end x (shadows the side x inside this block)
  if (p.top === "ogee") {
    // Onion / ogee: a concave flare out of the finial, then a convex shoulder down to the side.
    const w = sx - 50, k = 1 + crown / 10;           // crown sharpens the finial
    const mx = 50 + w * 0.5, my = capY * 0.5;
    segs.push({ t: "C", c1: [50 + w * 0.06, capY * 0.3 * k], c2: [50 + w * 0.22, my], to: [mx, my] });
    segs.push({ t: "C", c1: [50 + w * 0.82, my], c2: [sx, capY * 0.68], to: [sx, capY] });
  } else if (p.top === "round") {
    const k = 0.5523;
    segs.push({ t: "C", c1: [50 + (sx - 50) * k, 0], c2: [sx, capY - capY * k], to: [sx, capY] });
  } else if (p.top === "point") {
    segs.push({ t: "C", c1: [50 + (sx - 50) * 0.3, capY * 0.12], c2: [sx - 2, capY * 0.5], to: [sx, capY] });
  } else {
    segs.push({ t: "L", to: [50 + (sx - 50) * 0.45, 0] });
    segs.push({ t: "L", to: [50 + (sx - 50) * 0.45, capY * 0.45] });
    segs.push({ t: "L", to: [sx, capY * 0.45] });
    segs.push({ t: "L", to: [sx, capY] });
  }
  if (dome < 1) segs.push({ t: "L", to: [bodyX, capY] });
  }

  // Stepped notch at the upper shoulder
  const n = p.notch;
  let y0 = capY;
  if (n > 0) { segs.push({ t: "L", to: [sx - n, capY] }, { t: "L", to: [sx - n, capY + n] }, { t: "L", to: [sx, capY + n] }); y0 = capY + n; }

  // Side with lobes: y0 → y1
  const bottomCap = p.bottom === "mirror" ? capY : p.bottom === "round" ? H * 0.22 : 0;
  const y1 = H - bottomCap - (p.bottom === "mirror" && n > 0 ? n : 0);
  const L = Math.max(0, Math.round(p.lobes));
  if (L === 0) segs.push({ t: "L", to: [sx, y1] });
  else {
    const step = (y1 - y0) / L;
    for (let i = 0; i < L; i++) {
      const ya = y0 + step * i, yb = ya + step;
      segs.push({ t: "C", c1: [sx + p.lobeDepth * 2.7, ya + step * 0.02], c2: [sx + p.lobeDepth * 2.7, yb - step * 0.02], to: [sx, yb] });
    }
  }
  if (p.bottom === "mirror" && n > 0) segs.push({ t: "L", to: [sx - n, y1] }, { t: "L", to: [sx - n, y1 + n] }, { t: "L", to: [sx, y1 + n] });

  // Bottom
  if (p.bottom === "flat") segs.push({ t: "L", to: [50, H] });
  else if (p.bottom === "round") { const k = 0.5523, by = H - bottomCap; segs.push({ t: "C", c1: [sx, by + bottomCap * k], c2: [50 + (sx - 50) * k, H], to: [50, H] }); }
  else {
    // mirror the top cap vertically
    const top = gatewayRightHalf({ ...p, bottom: "flat", notch: 0, lobes: 0 }).segs;
    const capSegs = top.slice(0, (p.top === "ogee" ? 2 : p.top === "flat" ? 4 : 1) + (dome < 1 ? 1 : 0));
    const mir = reverseSegs([50, 0], capSegs).map((s) => mapSeg(s, ([x, y]) => [x, H - y]));
    segs.push(...mir);
  }
  return { start, segs, H };
}

function mapSeg(s: Seg, m: (p: P) => P): Seg {
  if (s.t === "L") return { t: "L", to: m(s.to) };
  if (s.t === "Q") return { t: "Q", c: m(s.c), to: m(s.to) };
  return { t: "C", c1: m(s.c1), c2: m(s.c2), to: m(s.to) };
}
/** Reverse a segment chain that starts at `start`. Returns segments that end at `start`. */
function reverseSegs(start: P, segs: Seg[]): Seg[] {
  const pts: P[] = [start, ...segs.map((s) => s.to)];
  const out: Seg[] = [];
  for (let i = segs.length - 1; i >= 0; i--) {
    const s = segs[i], to = pts[i];
    if (s.t === "L") out.push({ t: "L", to });
    else if (s.t === "Q") out.push({ t: "Q", c: s.c, to });
    else out.push({ t: "C", c1: s.c2, c2: s.c1, to });
  }
  return out;
}
const segD = (s: Seg) => s.t === "L" ? `L${f(s.to[0])} ${f(s.to[1])}` : s.t === "Q" ? `Q${f(s.c[0])} ${f(s.c[1])} ${f(s.to[0])} ${f(s.to[1])}` : `C${f(s.c1[0])} ${f(s.c1[1])} ${f(s.c2[0])} ${f(s.c2[1])} ${f(s.to[0])} ${f(s.to[1])}`;

/** Full symmetric gateway path in a 100 × (100·aspect) viewBox. */
export function gatewayPath(p: GatewayParams): { d: string; width: number; height: number } {
  const { start, segs, H } = gatewayRightHalf(p);
  const left = reverseSegs(start, segs).map((s) => mapSeg(s, ([x, y]) => [100 - x, y]));
  const d = `M${start[0]} ${start[1]} ${segs.map(segD).join(" ")} ${left.map(segD).join(" ")} Z`;
  return { d, width: 100, height: f(H) };
}

/** Any path normalised to 0–1 for clip-path (clipPathUnits="objectBoundingBox"). */
export function normalisePath(geom: { d: string; width: number; height: number }): string {
  let i = 0;
  return geom.d.replace(/-?\d+(\.\d+)?/g, (m) => String(f((i++ % 2 === 0 ? +m / geom.width : +m / geom.height) * 10000) / 10000));
}
/** Same path normalised to 0–1 for clip-path (clipPathUnits="objectBoundingBox"). */
export function gatewayClipPath(p: GatewayParams): string {
  const { d, height } = gatewayPath(p);
  return d.replace(/-?\d+(\.\d+)?/g, (() => { let i = 0; return (m: string) => String(f((i++ % 2 === 0 ? +m / 100 : +m / height) * 1000) / 1000); })());
}

/** Full SVG for a gateway: solid silhouette or 1.5px line, with an optional inner frame line
 *  (an exact inset, drawn with masked strokes so it works on any background). `uid` keeps mask ids unique. */
export function gatewaySVG(p: GatewayParams, render: "solid" | "line", uid = "g"): string {
  return shapeSVG(gatewayPath(p), p.frame ?? 0, render, uid);
}
/** Render any closed shape {d, width, height} as solid or line, with an optional inset frame line. */
export function shapeSVG(geom: { d: string; width: number; height: number }, gap: number, render: "solid" | "line", uid = "g"): string {
  const { d, width, height } = geom;
  const lw = 1.5;
  const vb = `-2 -2 ${width + 4} ${f(height + 4)}`;
  const id = `m-${uid}`;
  if (render === "solid") {
    const mask = gap > 0
      ? `<defs><mask id="${id}" maskUnits="userSpaceOnUse" x="-2" y="-2" width="${width + 4}" height="${f(height + 4)}"><path d="${d}" fill="#fff"/><path d="${d}" fill="none" stroke="#000" stroke-width="${f(2 * (gap + lw / 2))}"/><path d="${d}" fill="none" stroke="#fff" stroke-width="${f(2 * (gap - lw / 2))}"/></mask></defs>`
      : "";
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}">${mask}<path d="${d}" fill="currentColor"${gap > 0 ? ` mask="url(#${id})"` : ""}/></svg>`;
  }
  const inner = gap > 0
    ? `<defs><mask id="${id}" maskUnits="userSpaceOnUse" x="-2" y="-2" width="${width + 4}" height="${f(height + 4)}"><path d="${d}" fill="#fff"/><path d="${d}" fill="none" stroke="#000" stroke-width="${f(2 * (gap - lw / 2))}"/></mask></defs><path d="${d}" fill="none" stroke="currentColor" stroke-width="${f(2 * (gap + lw / 2))}" mask="url(#${id})"/>`
    : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" fill="none">${inner}<path d="${d}" stroke="currentColor" stroke-width="${lw}" stroke-linejoin="round"/></svg>`;
}

/** Tile any SVG glyph into a repeating pattern (jaali-style). Returns a full SVG string. */
export function patternSVG(glyph: string, opts: { cols: number; gap: number; stagger: boolean; width?: number; height?: number }): string {
  const W = opts.width ?? 480, H = opts.height ?? 480;
  const vb = /viewBox="([^"]+)"/.exec(glyph)?.[1].split(/\s+/).map(Number) ?? [0, 0, 100, 100];
  const inner = glyph.replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "");
  const ratio = vb[3] / vb[2];
  const cell = W / opts.cols, size = cell - opts.gap, h = size * ratio, rowH = h + opts.gap;
  const rows = Math.ceil(H / rowH) + 1;
  const attrs = /<svg([^>]*)>/.exec(glyph)?.[1].replace(/xmlns="[^"]*"|viewBox="[^"]*"/g, "") ?? "";
  let out = "";
  for (let r = -1; r < rows; r++) for (let c = -1; c <= opts.cols; c++) {
    const x = c * cell + (opts.stagger && r % 2 ? cell / 2 : 0) + opts.gap / 2, y = r * rowH + opts.gap / 2;
    out += `<svg x="${f(x)}" y="${f(y)}" width="${f(size)}" height="${f(h)}" viewBox="${vb.join(" ")}"${attrs}>${inner.replace(/id="m-/g, `id="m-${r}-${c}-`).replace(/url\(#m-/g, `url(#m-${r}-${c}-`)}</svg>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">${out}</svg>`;
}

/* ───────────── Medallions (N-fold: features on every side) ───────────── */
export type MedallionParams = {
  fold: number;                 // 4, 6, 8 (or 5, 12)
  feature: "ogee" | "lobe" | "point" | "scallop" | "step" | "flat";   // on each side's midpoint
  depth: number;                // 0 – 24: how far the feature reaches out
  width: number;                // 0.3 – 1: how much of the side the feature spans
  vertex: "none" | "lobe" | "point" | "notch";   // secondary feature at each corner
  vertexDepth: number;          // 0 – 12
  base: "circle" | "polygon";
  aspect: number;               // 0.8 – 1.4 vertical stretch
  frame?: number;               // inner frame inset (0 = none)
};
export const MEDALLION_PRESETS: Record<string, MedallionParams> = {
  "Ogee cross": { fold: 4, feature: "ogee", depth: 14, width: 0.7, vertex: "notch", vertexDepth: 5, base: "polygon", aspect: 1, frame: 3 },
  "Quatrefoil": { fold: 4, feature: "lobe", depth: 14, width: 0.75, vertex: "none", vertexDepth: 0, base: "polygon", aspect: 1, frame: 3 },
  "Eight-point star": { fold: 8, feature: "point", depth: 12, width: 1, vertex: "none", vertexDepth: 0, base: "circle", aspect: 1, frame: 3 },
  "Six-fold lotus": { fold: 6, feature: "ogee", depth: 10, width: 0.9, vertex: "lobe", vertexDepth: 3, base: "circle", aspect: 1, frame: 3 },
  "Scalloped medallion": { fold: 8, feature: "scallop", depth: 7, width: 1, vertex: "point", vertexDepth: 3, base: "circle", aspect: 1.1, frame: 3 },
  "Stepped star": { fold: 8, feature: "step", depth: 9, width: 0.8, vertex: "none", vertexDepth: 0, base: "polygon", aspect: 1, frame: 3 },
  "Lantern medallion": { fold: 4, feature: "ogee", depth: 16, width: 0.55, vertex: "lobe", vertexDepth: 6, base: "circle", aspect: 1.2, frame: 3 },
};

function profile(feature: MedallionParams["feature"], t: number): number {
  // t ∈ [−1, 1] across the feature; returns 0 – 1 outward offset.
  const a = Math.abs(t);
  if (a >= 1) return 0;
  switch (feature) {
    case "ogee": { const s = 1 - a; return 0.55 * s ** 3 + 0.45 * (1 + Math.cos(Math.PI * a)) / 2 * s; }
    case "lobe": return Math.sqrt(Math.max(0, 1 - a * a));
    case "point": return 1 - a;
    case "scallop": return Math.cos((Math.PI / 2) * a);
    case "step": return a < 0.45 ? 1 : a < 0.75 ? 0.55 : 0.2;
    default: return 0;
  }
}

/** N-fold medallion outline, centred in a 100 × (100·aspect) box. */
export function medallionPath(p: MedallionParams): { d: string; width: number; height: number } {
  const N = Math.max(3, Math.round(p.fold));
  const R = 50 - p.depth - 2;                  // base radius leaves room for the features
  const sector = (Math.PI * 2) / N;
  const samples = 48;
  const pts: string[] = [];
  for (let k = 0; k < N; k++) {
    const thetaC = -Math.PI / 2 + k * sector;  // first feature points straight up
    for (let i = 0; i < samples; i++) {
      const t = -1 + (2 * i) / samples;        // −1 … 1 across the sector
      const th = thetaC + (t * sector) / 2;
      // base: circle, or straight polygon chord between the two corners
      const rBase = p.base === "circle" ? R : (R * Math.cos(sector / 2)) / Math.cos(th - thetaC);
      const main = p.depth * profile(p.feature, t / p.width);
      const tv = (1 - Math.abs(t)) * 2;        // 0 at corners → use for vertex features
      const vf = p.vertex === "none" ? 0 : p.vertex === "lobe" ? Math.sqrt(Math.max(0, 1 - (tv / 0.35) ** 2)) : p.vertex === "point" ? Math.max(0, 1 - tv / 0.3) : -Math.max(0, 1 - tv / 0.25);
      const r = rBase + main + p.vertexDepth * vf;
      pts.push(`${f(50 + r * Math.cos(th))} ${f((50 + r * Math.sin(th)) * p.aspect)}`);
    }
  }
  return { d: `M${pts.join(" L")} Z`, width: 100, height: f(100 * p.aspect) };
}
export function medallionSVG(p: MedallionParams, render: "solid" | "line", uid = "md"): string {
  return shapeSVG(medallionPath(p), p.frame ?? 0, render, uid);
}
export function randomMedallion(r: () => number): MedallionParams {
  const pick = <T,>(a: T[]) => a[Math.floor(r() * a.length)];
  const feature = pick(["ogee", "ogee", "lobe", "point", "scallop", "step"] as const);
  return {
    fold: pick([4, 4, 6, 8, 8]), feature, depth: f(6 + r() * 12), width: f(feature === "point" ? 1 : 0.5 + r() * 0.5),
    vertex: pick(["none", "none", "lobe", "point", "notch"] as const), vertexDepth: f(2 + r() * 5), base: pick(["circle", "polygon"] as const),
    aspect: r() < 0.7 ? 1 : f(1.05 + r() * 0.2), frame: r() < 0.7 ? 3 : 0,
  };
}

/* ───────────── Flowers (solid floral silhouettes, gateway-style) ───────────── */
export type FlowerParams = {
  petals: number;        // 5 – 16
  shape: "round" | "pointed" | "notched" | "lotus";
  depth: number;         // 0.15 – 0.6 petal length (fraction of radius)
  layers: number;        // 1 – 3 inner petal layers (drawn as cut lines)
  centre: number;        // 0 – 0.35 centre disc radius (cut ring)
  frame?: number;        // inset outline line (0 = none)
};
export const FLOWER_PRESETS: Record<string, FlowerParams> = {
  "Lotus": { petals: 8, shape: "lotus", depth: 0.45, layers: 2, centre: 0.14, frame: 0 },
  "Marigold": { petals: 16, shape: "notched", depth: 0.25, layers: 3, centre: 0.16, frame: 0 },
  "Rosette": { petals: 12, shape: "round", depth: 0.22, layers: 2, centre: 0.2, frame: 3 },
  "Star jasmine": { petals: 5, shape: "pointed", depth: 0.5, layers: 1, centre: 0.12, frame: 3 },
  "Kamal": { petals: 10, shape: "pointed", depth: 0.38, layers: 2, centre: 0.18, frame: 0 },
  "Chakra flower": { petals: 6, shape: "round", depth: 0.4, layers: 2, centre: 0.22, frame: 3 },
};
function petalR(shape: FlowerParams["shape"], phase: number): number {
  // phase ∈ [0,1) across one petal; returns 0 – 1 (1 = petal tip).
  const x = Math.abs(phase * 2 - 1);           // 1 at the gaps, 0 at the tip
  switch (shape) {
    case "round": return Math.sqrt(Math.max(0, 1 - x * x));
    case "pointed": return (1 - x) ** 0.8 * Math.sqrt(Math.max(0, 1 - x * x)) ** 0.4;
    case "lotus": return (1 - x) ** 1.4 * 0.6 + Math.sqrt(Math.max(0, 1 - x * x)) * 0.4;
    case "notched": { const base = Math.sqrt(Math.max(0, 1 - x * x)); return base - (x < 0.18 ? (0.18 - x) * 1.6 : 0); }
  }
}
function flowerOutline(n: number, shape: FlowerParams["shape"], R: number, depth: number, rot = 0): string {
  const pts: string[] = [], samples = n * 40, r0 = R * (1 - depth);
  for (let i = 0; i < samples; i++) {
    const t = i / samples, th = -Math.PI / 2 + t * Math.PI * 2 + rot;
    const r = r0 + (R - r0) * petalR(shape, (t * n + 0.5) % 1);
    pts.push(`${f(50 + r * Math.cos(th))} ${f(50 + r * Math.sin(th))}`);
  }
  return `M${pts.join(" L")} Z`;
}
/** Flower SVG (viewBox 100×100). Solid: silhouette with inner layers and centre cut as 1.5px lines. Line: all outlines. */
export function flowerSVG(p: FlowerParams, render: "solid" | "line", uid = "fl"): string {
  const R = 48, n = Math.round(p.petals), lw = 1.5;
  const outer = flowerOutline(n, p.shape, R, p.depth);
  const inner: string[] = [];
  for (let k = 1; k < p.layers; k++) inner.push(flowerOutline(n, p.shape, R * (1 - 0.3 * k), p.depth * (1 - 0.1 * k), (Math.PI / n) * k));
  const cr = p.centre * R;
  const id = `m-${uid}`;
  const frame = p.frame ? `<path d="${outer}" fill="none" stroke="${render === "solid" ? "#000" : "currentColor"}" stroke-width="${f(2 * (p.frame + lw / 2))}"/><path d="${outer}" fill="none" stroke="${render === "solid" ? "#fff" : "none"}" stroke-width="${f(2 * (p.frame - lw / 2))}"/>` : "";
  if (render === "solid") {
    const cuts = inner.map((d) => `<path d="${d}" fill="none" stroke="#000" stroke-width="${lw}"/>`).join("") + (cr > 1 ? `<circle cx="50" cy="50" r="${f(cr)}" fill="none" stroke="#000" stroke-width="${lw}"/>` : "");
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><mask id="${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><path d="${outer}" fill="#fff"/>${frame}${cuts}</mask></defs><path d="${outer}" fill="currentColor" mask="url(#${id})"/></svg>`;
  }
  const lines = [outer, ...inner].map((d) => `<path d="${d}"/>`).join("") + (cr > 1 ? `<circle cx="50" cy="50" r="${f(cr)}"/>` : "");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="${lw}" stroke-linejoin="round">${lines}</svg>`;
}
export function flowerPath(p: FlowerParams): { d: string; width: number; height: number } {
  return { d: flowerOutline(Math.round(p.petals), p.shape, 48, p.depth), width: 100, height: 100 };
}
export function randomFlower(r: () => number): FlowerParams {
  const pick = <T,>(a: T[]) => a[Math.floor(r() * a.length)];
  return { petals: pick([5, 6, 8, 8, 10, 12, 16]), shape: pick(["round", "pointed", "notched", "lotus"] as const), depth: f(0.2 + r() * 0.35), layers: 1 + Math.floor(r() * 3), centre: f(0.1 + r() * 0.15), frame: r() < 0.4 ? 3 : 0 };
}

/* ───────────── Glow render (soft emboss on a tinted card) ───────────── */
// Palettes use brand ramps only (tokens.css). bg = card gradient top→bottom, rim = glow top→bottom.
export const GLOW_PALETTES = {
  lavender: { bg: ["#d2dff9", "#b8c9fa", "#c9d1f7"], rim: ["#e380a8", "#81a0e9"], sheen: "#ffffff" },
  rose: { bg: ["#db715c", "#e8908a", "#efabc5"], rim: ["#ffffff", "#fceaf0"], sheen: "#ffffff" },
  leaf: { bg: ["#acd587", "#c8e4b0", "#e3f1d8"], rim: ["#ffffff", "#efabc5"], sheen: "#ffffff" },
  marigold: { bg: ["#ffcb79", "#ffe8b7", "#fff8e6"], rim: ["#ee7944", "#ffffff"], sheen: "#ffffff" },
  dusk: { bg: ["#1f2f55", "#5f78af", "#ddac88"], rim: ["#f59970", "#a7c0f1"], sheen: "#ffffff" },
} as const;
export type GlowPalette = keyof typeof GLOW_PALETTES;

/** Shape as a soft glowing rim on a tinted card. viewBox 0 0 160 160 (card) or tight around the shape (no bg). */
export function glowSVG(geom: { d: string; width: number; height: number }, palette: GlowPalette, uid = "gl", withCard = true, style: "soft" | "crisp" = "crisp", aspect = 1, fill = 0.62): string {
  const P = GLOW_PALETTES[palette], id = (k: string) => `${k}-${uid}`;
  // Canvas matches the container's aspect (width / height) so nothing is cropped;
  // the shape fits a box of `fill` × the canvas height, centred, so sibling shapes read at the same size.
  const W = 160 * Math.max(1, aspect), size = 160 / Math.min(1, aspect), Hc = W / aspect;
  const box = Hc * fill, scale = Math.min(box / geom.width, box / geom.height);
  const tx = (W - geom.width * scale) / 2, ty = (Hc - geom.height * scale) / 2;
  const stops = (c: readonly string[]) => c.map((col, i) => `<stop offset="${f(i / (c.length - 1))}" stop-color="${col}"/>`).join("");
  const defs = `<defs>
    <linearGradient id="${id("bg")}" x1="0" y1="0" x2="0" y2="1">${stops(P.bg)}</linearGradient>
    <linearGradient id="${id("rim")}" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">${stops(P.rim)}</linearGradient>
    <linearGradient id="${id("sheen")}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P.sheen}" stop-opacity="0.38"/><stop offset="0.6" stop-color="${P.sheen}" stop-opacity="0.08"/><stop offset="1" stop-color="${P.sheen}" stop-opacity="0.22"/></linearGradient>
    <filter id="${id("blur")}" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="${f(2.4 / scale)}"/></filter>
    <filter id="${id("blur2")}" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="${f(0.7 / scale)}"/></filter>
    <clipPath id="${id("in")}"><path d="${geom.d}"/></clipPath>
    <filter id="${id("grain")}"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="table" tableValues="0 0.16"/></feComponentTransfer></filter>
  </defs>`;
  const crisp = `<g transform="translate(${f(tx)} ${f(ty)}) scale(${f(scale)})">
    <path d="${geom.d}" fill="url(#${id("sheen")})"/>
    <path d="${geom.d}" fill="none" stroke="url(#${id("rim")})" stroke-width="${f(4 / scale)}" filter="url(#${id("blur2")})" opacity="0.35"/>
    <path d="${geom.d}" fill="none" stroke="url(#${id("rim")})" stroke-width="${f(1.6 / scale)}"/>
    <g clip-path="url(#${id("in")})"><path d="${geom.d}" fill="none" stroke="#ffffff" stroke-width="${f(2.4 / scale)}" opacity="0.7"/></g>
  </g>`;
  const shape = style === "crisp" ? crisp : `<g transform="translate(${f(tx)} ${f(ty)}) scale(${f(scale)})">
    <path d="${geom.d}" fill="url(#${id("sheen")})"/>
    <path d="${geom.d}" fill="none" stroke="url(#${id("rim")})" stroke-width="${f(7 / scale)}" filter="url(#${id("blur")})" opacity="0.95"/>
    <g clip-path="url(#${id("in")})"><path d="${geom.d}" fill="none" stroke="url(#${id("rim")})" stroke-width="${f(10 / scale)}" filter="url(#${id("blur")})" opacity="0.45"/></g>
    <path d="${geom.d}" fill="none" stroke="#ffffff" stroke-width="${f(1.2 / scale)}" filter="url(#${id("blur2")})" opacity="0.75"/>
  </g>`;
  const card = withCard ? `<rect width="${f(W)}" height="${f(Hc)}" fill="url(#${id("bg")})"/>` : "";
  void size;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${f(W)} ${f(Hc)}">${defs}${card}${shape}<rect width="${f(W)}" height="${f(Hc)}" filter="url(#${id("grain")})" style="mix-blend-mode:overlay"/></svg>`;
}

/* ───────────── Gloss render (polished 3D-look fill) ───────────── */
// From Sarvam's social art (Startup Program, Fintech Fest): radial body light centre → coloured edge,
// a top-left highlight, a tinted inner shadow, a rim light and a soft coloured drop shadow. Brand ramps only.
export const GLOSS_PALETTES = {
  // top → bottom fill, the inner-edge hue (inner shadow), and the centre light. Brand ramps only.
  periwinkle: { top: "#e8effc", bottom: "#81a0e9", edge: "#e380a8", light: "#ffffff" },
  indigo: { top: "#6a88e2", bottom: "#3333cc", edge: "#212191", light: "#a7c0f1" },
  leaf: { top: "#6ea335", bottom: "#fff0cf", edge: "#496d21", light: "#e3f1d8" },
  saffron: { top: "#ee7944", bottom: "#ffcb79", edge: "#a5460f", light: "#fff0cf" },
  rose: { top: "#f9d5e1", bottom: "#d4508e", edge: "#9d2055", light: "#fceaf0" },
} as const;
export type GlossPalette = keyof typeof GLOSS_PALETTES;

/** Mesh shape (Sarvam's Startup Program / Kaze art): a crisp flat silhouette filled with a two-tone gradient,
 *  an inner shadow in a contrasting hue along the edge, and a soft centre light. No drop shadow, no highlight blob. */
export function glossSVG(geom: { d: string; width: number; height: number }, palette: GlossPalette, uid = "gs"): string {
  const P = GLOSS_PALETTES[palette], id = (k: string) => `${k}-${uid}`, pad = 2, e = Math.min(geom.width, geom.height);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-pad} ${-pad} ${f(geom.width + pad * 2)} ${f(geom.height + pad * 2)}">
  <defs>
    <linearGradient id="${id("fill")}" x1="0" y1="0" x2="0.15" y2="1"><stop offset="0" stop-color="${P.top}"/><stop offset="1" stop-color="${P.bottom}"/></linearGradient>
    <radialGradient id="${id("light")}" cx="0.5" cy="0.45" r="0.42"><stop offset="0" stop-color="${P.light}" stop-opacity="0.55"/><stop offset="1" stop-color="${P.light}" stop-opacity="0"/></radialGradient>
    <clipPath id="${id("clip")}"><path d="${geom.d}"/></clipPath>
    <filter id="${id("edge")}" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="${f(e * 0.07)}"/></filter>
  </defs>
  <path d="${geom.d}" fill="url(#${id("fill")})"/>
  <g clip-path="url(#${id("clip")})">
    <ellipse cx="${f(geom.width / 2)}" cy="${f(geom.height * 0.45)}" rx="${f(geom.width * 0.42)}" ry="${f(geom.height * 0.38)}" fill="url(#${id("light")})"/>
    <path d="${geom.d}" fill="none" stroke="${P.edge}" stroke-opacity="0.55" stroke-width="${f(e * 0.2)}" filter="url(#${id("edge")})"/>
  </g>
</svg>`;
}

/* ───────────── Soft cloud (blurred scalloped glow for text grounds) ───────────── */
export function cloudSVG(geom: { d: string; width: number; height: number }, color = "#f7efed", softness = 0.07): string {
  const pad = Math.max(geom.width, geom.height) * 0.3, blur = Math.max(geom.width, geom.height) * softness;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${f(-pad)} ${f(-pad)} ${f(geom.width + pad * 2)} ${f(geom.height + pad * 2)}" preserveAspectRatio="xMidYMid meet">
  <defs><filter id="cloudblur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${f(blur)}"/></filter></defs>
  <path d="${geom.d}" fill="${color}" filter="url(#cloudblur)"/>
</svg>`;
}

/* ───────────── Line motifs (radial) ───────────── */
export type MotifParams = {
  petals: number;        // 4 – 16
  rings: number;         // 1 – 3
  petal: "lens" | "drop" | "heart" | "leaf";
  width: number;         // 0.2 – 0.8 petal width
  inner: number;         // 0 – 0.4 inner radius
  centre: "dot" | "ring" | "none";
  twist: number;         // 0 – 1: offset alternate rings by half a step
};
export const MOTIF_PRESETS: Record<string, MotifParams> = {
  "Lotus": { petals: 8, rings: 2, petal: "lens", width: 0.45, inner: 0.12, centre: "dot", twist: 1 },
  "Marigold": { petals: 14, rings: 3, petal: "drop", width: 0.35, inner: 0.1, centre: "ring", twist: 1 },
  "Jaali star": { petals: 8, rings: 1, petal: "leaf", width: 0.5, inner: 0.25, centre: "ring", twist: 0 },
  "Fan": { petals: 6, rings: 1, petal: "heart", width: 0.6, inner: 0.15, centre: "dot", twist: 0 },
};

function petalPath(kind: MotifParams["petal"], r0: number, r1: number, w: number): string {
  // Petal pointing up from (0,-r0) to (0,-r1), centred on x = 0; w = half-width.
  const m = (r0 + r1) / 2;
  if (kind === "lens") return `M0 ${-r0} Q${w} ${-m} 0 ${-r1} Q${-w} ${-m} 0 ${-r0} Z`;
  if (kind === "drop") return `M0 ${-r0} C${w * 1.4} ${-r0 - (r1 - r0) * 0.25} ${w * 0.4} ${-r1 + (r1 - r0) * 0.15} 0 ${-r1} C${-w * 0.4} ${-r1 + (r1 - r0) * 0.15} ${-w * 1.4} ${-r0 - (r1 - r0) * 0.25} 0 ${-r0} Z`;
  if (kind === "leaf") return `M0 ${-r0} L${w} ${-m} L0 ${-r1} L${-w} ${-m} Z`;
  // heart / scallop: two lobes at the tip
  return `M0 ${-r0} C${w * 1.6} ${-r0 - (r1 - r0) * 0.4} ${w * 1.2} ${-r1} ${w * 0.45} ${-r1} C${w * 0.15} ${-r1} 0 ${-r1 + (r1 - r0) * 0.15} 0 ${-r1 + (r1 - r0) * 0.2} C0 ${-r1 + (r1 - r0) * 0.15} ${-w * 0.15} ${-r1} ${-w * 0.45} ${-r1} C${-w * 1.2} ${-r1} ${-w * 1.6} ${-r0 - (r1 - r0) * 0.4} 0 ${-r0} Z`;
}

/** Radial motif, viewBox -50 -50 100 100. Returns stroke-only path data. */
export function motifPaths(p: MotifParams): string[] {
  const out: string[] = [];
  const R = 46, inner = p.inner * R;
  const ringW = (R - inner) / p.rings;
  for (let k = 0; k < p.rings; k++) {
    const r0 = inner + ringW * k * 0.75, r1 = Math.min(R, r0 + ringW * 1.15);
    const w = (r1 - r0) * p.width * (1 - k * 0.12);
    const off = p.twist && k % 2 ? 180 / p.petals : 0;
    const base = petalPath(p.petal, r0, r1, w);
    for (let i = 0; i < p.petals; i++) out.push(`<path d="${base}" transform="rotate(${f(off + (360 / p.petals) * i)})"/>`);
  }
  if (p.centre === "dot") out.push(`<circle r="${f(Math.max(1.5, inner * 0.35))}"/>`);
  if (p.centre === "ring" && inner > 2) out.push(`<circle r="${f(inner * 0.7)}"/>`);
  return out;
}

/* ───────────── Dividers (horizontal ornaments) ───────────── */
// viewBox 0 0 400 100 · centre x = 200 · baseline y = 70. Lines are 1.5 stroke; petals and beads are filled.
export type DividerFamily = "scroll" | "twin" | "lotus" | "beads" | "gateway" | "vine";
export type DividerParams = {
  family: DividerFamily;
  petals: number;     // 2 – 6 (scroll, lotus, vine leaves per side)
  spread: number;     // 30 – 90 fan angle (degrees)
  line: number;       // 0.2 – 1 baseline length
  turns: number;      // 0.8 – 2 spiral turns
  size: number;       // 0.7 – 1.3 ornament scale
};
export const DIVIDER_PRESETS: Record<string, DividerParams> = {
  "Scroll fan": { family: "scroll", petals: 4, spread: 78, line: 0.85, turns: 1.4, size: 1 },
  "Twin scroll": { family: "twin", petals: 3, spread: 60, line: 1, turns: 1.3, size: 0.9 },
  "Lotus rule": { family: "lotus", petals: 5, spread: 80, line: 0.9, turns: 1, size: 1 },
  "Bead rule": { family: "beads", petals: 3, spread: 0, line: 1, turns: 1, size: 1 },
  "Gateway rule": { family: "gateway", petals: 0, spread: 0, line: 1, turns: 1, size: 1 },
  "Vine": { family: "vine", petals: 4, spread: 50, line: 0.9, turns: 1, size: 1 },
};

const BASE_Y = 70;
/** Soft teardrop petal: narrow at the base, widening smoothly into a fully round tip (one closed curve, filled). */
function clubPetal(bx: number, by: number, angDeg: number, len: number, tip: number, base = 0.9): string {
  const a = (angDeg * Math.PI) / 180, ux = Math.cos(a), uy = Math.sin(a), nx = -uy, ny = ux;
  const L = len - tip, k = 0.5523;
  const at = (d: number, off: number) => `${f(bx + ux * d + nx * off)} ${f(by + uy * d + ny * off)}`;
  return `<path fill="currentColor" stroke="none" d="M${at(0, base)} `
    + `C${at(L * 0.45, base + (tip - base) * 0.2)} ${at(L - tip * 1.1, tip)} ${at(L, tip)} `          // side swells into the tip
    + `C${at(L + tip * k, tip)} ${at(L + tip, tip * k)} ${at(L + tip, 0)} `                          // round tip, upper quarter
    + `C${at(L + tip, -tip * k)} ${at(L + tip * k, -tip)} ${at(L, -tip)} `                           // round tip, lower quarter
    + `C${at(L - tip * 1.1, -tip)} ${at(L * 0.45, -base - (tip - base) * 0.2)} ${at(0, -base)} `
    + `C${at(-base * 0.6, -base)} ${at(-base * 0.6, base)} ${at(0, base)} Z"/>`;                       // rounded base
}
/** Front-view lotus emblem (filled): a fan of soft teardrop petals over a small bowl. viewBox 0 0 100 100. */
export function lotusEmblemPaths(): string[] {
  const out: string[] = [];
  const bx = 50, by = 66;
  const petals = [[-90, 46, 9.5], [-122, 40, 8.5], [-58, 40, 8.5], [-152, 34, 7], [-28, 34, 7]] as const;
  for (const [deg, len, tip] of petals) out.push(clubPetal(bx, by, deg, len, tip, 2.2));
  out.push(`<path fill="currentColor" stroke="none" d="M36 72 Q50 66 64 72 Q60 84 50 86 Q40 84 36 72 Z"/>`);
  return out;
}

/** Spiral from the bottom of its circle, curling over the top towards `dir` (+1 right, −1 left). */
function spiral(cx: number, cy: number, rs: number, turns: number, dir: 1 | -1): string[] {
  const pts: string[] = [];
  const total = Math.PI * 2 * turns, steps = 120;
  for (let i = 0; i <= steps; i++) {
    const u = i / steps, th = Math.PI / 2 + total * u, r = rs * (1 - 0.82 * u);
    // dir = +1: arrive moving left, curl over the top to the right (outer side)
    pts.push(`${f(cx - dir * -r * Math.cos(th) * -1)} ${f(cy + r * Math.sin(th))}`);
  }
  return pts;
}
function dot(x: number, y: number, r: number) { return `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="currentColor" stroke="none"/>`; }
function diamond(x: number, y: number, r: number) { return `<path fill="currentColor" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" d="M${f(x)} ${f(y - r)} L${f(x + r * 0.7)} ${f(y)} L${f(x)} ${f(y + r)} L${f(x - r * 0.7)} ${f(y)} Z"/>`; }

export function dividerPaths(p: DividerParams): string[] {
  const out: string[] = [];
  const S = p.size, Y = BASE_Y;
  const outerFor = (inner: number) => inner + 30 + 150 * p.line;
  const sides: (1 | -1)[] = [1, -1];

  if (p.family === "scroll" || p.family === "twin") {
    for (const side of sides) {
      const X = (x: number) => 200 + side * x;
      const rs = 16 * S;
      const cxs = p.family === "scroll" ? 12 * S + rs : Math.min(170 - rs, 60 + 100 * p.line);  // twin: spirals at the outer ends
      if (p.family === "scroll") {
        const outer = outerFor(cxs + 10);
        const sp = spiral(0, 0, rs, p.turns, 1).map((pt) => { const [x, y] = pt.split(" ").map(Number); return `${f(X(cxs + x))} ${f(Y - rs + y)}`; });
        out.push(`<path d="M${f(X(outer))} ${Y} L${f(X(cxs))} ${Y} L${sp.slice(1).join(" L")}"/>`);
        // calyx wedge + petal fan on the outer side of the spiral
        const bx = X(cxs + rs * 0.95), by = Y - rs * 0.12;
        // soft calyx: a rounded half-leaf sitting on the baseline under the petals
        out.push(`<path fill="currentColor" stroke="none" d="M${f(X(cxs + rs * 0.3))} ${Y} Q${f(X(cxs + rs * 0.55))} ${f(Y - rs * 0.42)} ${f(bx)} ${f(by - 1.5 * S)} Q${f(X(cxs + rs * 1.35))} ${f(Y - rs * 0.2)} ${f(X(cxs + rs * 1.7))} ${Y} Z"/>`);
        for (let i = 0; i < p.petals; i++) {
          const k = i / Math.max(1, p.petals - 1);
          const deg = -6 - p.spread * k;                    // longest petal almost flat, shortest steepest
          const len = (66 - 36 * k) * S, tip = (5.6 - 1.4 * k) * S;
          out.push(clubPetal(bx, by, side === 1 ? deg : 180 - deg, len, tip, 1.1));
        }
      } else {
        // twin: baseline from the centre to the outer spiral, which curls inwards over the top
        const sp = spiral(0, 0, rs, p.turns, 1).map((pt) => { const [x, y] = pt.split(" ").map(Number); return `${f(X(cxs - x))} ${f(Y - rs + y)}`; });
        out.push(`<path d="M${f(X(10 * S))} ${Y} L${f(X(cxs))} ${Y} L${sp.slice(1).join(" L")}"/>`);
        for (let i = 0; i < p.petals; i++) {
          const k = i / Math.max(1, p.petals - 1), deg = -10 - p.spread * k;
          out.push(clubPetal(X(cxs - rs * 1.05), Y - rs * 0.1, side === 1 ? 180 - deg : deg, (34 - 14 * k) * S, (4 - 1 * k) * S, 0.7));
        }
      }
    }
    if (p.family === "twin") out.push(diamond(200, Y, 5 * S));
  }

  if (p.family === "lotus") {
    const g = 26 * S;
    for (const side of sides) out.push(`<path d="M${f(200 + side * g)} ${Y} L${f(200 + side * outerFor(g))} ${Y}"/>`, dot(200 + side * (outerFor(g) + 5), Y, 1.8));
    const n = Math.max(3, p.petals | 1);
    for (let i = 0; i < n; i++) {
      const k = n === 1 ? 0.5 : i / (n - 1), deg = -90 - p.spread / 2 + p.spread * k;
      const centre = Math.abs(k - 0.5) < 0.01;
      out.push(clubPetal(200, Y - 2, deg, (centre ? 40 : 40 - 14 * Math.abs(k - 0.5) * 2) * S, (centre ? 5 : 4) * S, 0.8));
    }
    out.push(`<path d="M${f(200 - 16 * S)} ${Y} Q200 ${f(Y - 9 * S)} ${f(200 + 16 * S)} ${Y}" fill="currentColor" stroke="none"/>`);
  }

  if (p.family === "beads") {
    const g = 14 * S, n = Math.max(2, p.petals);
    for (const side of sides) {
      const outer = outerFor(g);
      out.push(`<path d="M${f(200 + side * g)} ${Y} L${f(200 + side * outer)} ${Y}"/>`);
      for (let i = 1; i <= n; i++) out.push(dot(200 + side * (g + ((outer - g) * i) / (n + 1)), Y, (2.6 - (i - 1) * 0.35) * S));
    }
    out.push(diamond(200, Y, 8 * S), diamond(200 - 14 * S, Y, 3.2 * S), diamond(200 + 14 * S, Y, 3.2 * S));
  }

  if (p.family === "gateway") {
    const g = 22 * S;
    const gp = gatewayPath(GATEWAY_PRESETS["Onion arch"]);
    const w = 26 * S, h = (gp.height / gp.width) * w;
    for (const side of sides) out.push(`<path d="M${f(200 + side * g)} ${Y} L${f(200 + side * outerFor(g))} ${Y}"/>`, dot(200 + side * (g + 10 * S), Y, 2.2 * S));
    out.push(`<path d="${gp.d}" fill="none" transform="translate(${f(200 - w / 2)} ${f(Y - h + 6 * S)}) scale(${f(w / 100)})" vector-effect="non-scaling-stroke"/>`);
  }

  if (p.family === "vine") {
    const g = 10 * S;
    for (const side of sides) {
      const outer = outerFor(g), amp = 6 * S, waves = Math.max(2, p.petals);
      const pts: string[] = [];
      for (let i = 0; i <= 80; i++) { const u = i / 80, x = g + (outer - g) * u; pts.push(`${f(200 + side * x)} ${f(Y - amp * Math.sin(u * Math.PI * waves) * (1 - u * 0.4))}`); }
      out.push(`<path d="M${pts.join(" L")}"/>`);
      for (let i = 0; i < waves; i++) {
        const u = (i + 0.5) / waves, x = g + (outer - g) * u, up = i % 2 === 0;
        const y = Y - amp * Math.sin(u * Math.PI * waves) * (1 - u * 0.4);
        const deg = up ? -90 + side * (90 - p.spread) * -1 : 90 - side * (90 - p.spread) * -1;
        out.push(clubPetal(200 + side * x, y, deg, 18 * S, 3.4 * S, 0.6));
      }
    }
    out.push(dot(200, Y, 3 * S));
  }
  return out;
}
export function dividerSVG(p: DividerParams): string {
  // Dividers use a 2px line (ornament weight) with round caps and joins, so every end is soft.
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 100" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${dividerPaths(p).join("")}</svg>`;
}
export function randomDivider(r: () => number): DividerParams {
  const pick = <T,>(a: T[]) => a[Math.floor(r() * a.length)];
  return { family: pick(["scroll", "scroll", "twin", "lotus", "beads", "gateway", "vine"] as const), petals: 3 + Math.floor(r() * 3), spread: f(45 + r() * 40), line: f(0.5 + r() * 0.5), turns: f(1 + r() * 0.8), size: f(0.8 + r() * 0.35) };
}

/* ───────────── Random variations (seeded) ───────────── */
export function rng(seed: number) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
export function randomGateway(r: () => number): GatewayParams {
  const pick = <T,>(a: T[]) => a[Math.floor(r() * a.length)];
  // Constrained so every variation reads as a gateway: notches only on curved tops, deep lobes only when few.
  const top = pick(["ogee", "ogee", "ogee", "round", "point"] as const);
  const lobes = Math.floor(r() * 4);
  const depth = lobes === 0 ? 0 : f((r() < 0.5 ? -1 : 1) * (2 + r() * (lobes > 2 ? 3 : 5)));
  const bottom = pick(["mirror", "mirror", "flat", "flat", "round"] as const);
  return {
    aspect: f(bottom === "flat" ? 1.3 + r() * 0.4 : 1 + r() * 0.35), top, bottom,
    shoulder: f(0.2 + r() * 0.16), lobes, lobeDepth: depth, waist: f(2 + r() * 8),
    notch: top !== "point" && lobes < 2 && r() < 0.3 ? f(2 + r() * 3) : 0, crown: f(2 + r() * 7),
    dome: r() < 0.45 ? f(0.55 + r() * 0.35) : 1, frame: r() < 0.7 ? 3 : 0,
  };
}
export function randomMotif(r: () => number): MotifParams {
  const pick = <T,>(a: T[]) => a[Math.floor(r() * a.length)];
  return { petals: pick([6, 8, 8, 10, 12, 16]), rings: 1 + Math.floor(r() * 3), petal: pick(["lens", "drop", "heart", "leaf"] as const), width: f(0.25 + r() * 0.5), inner: f(r() * 0.35), centre: pick(["dot", "ring", "none"] as const), twist: r() < 0.6 ? 1 : 0 };
}
