// Brand marks for real integrations. Data + sources: ./brand-marks.ts.
// colored: the official colours (the brand's own SVG file when we have one); otherwise mono in currentColor.
import { BRAND_MARKS } from "./brand-marks";

export function BrandMark({ name, size = 24, title, colored }: { name: string; size?: number; title?: string; colored?: boolean }) {
  const m = BRAND_MARKS[name];
  if (!m) return null;
  const vh = m.vh ?? m.vb, w = Math.round((size * m.vb) / vh);
  if (colored && m.file) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={m.file} width={w} height={size} alt={title ?? ""} aria-hidden={title ? undefined : true} style={{ display: "block", flexShrink: 0 }} />;
  }
  return (
    <svg viewBox={`0 0 ${m.vb} ${vh}`} width={w} height={size} fill={colored ? m.color : "currentColor"} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true} style={{ display: "block", flexShrink: 0 }}>
      {m.d.map((d, i) => <path key={i} d={d} fill={colored && m.parts ? m.parts[i] : undefined} fillRule="evenodd" />)}
    </svg>
  );
}
export const hasMark = (name: string) => name in BRAND_MARKS;

/** A logo lockup for strips: the official mark + the name, both in one mono tone. No chip, no colour. */
export function LogoLockup({ name }: { name: string }) {
  const m = BRAND_MARKS[name];
  // a wordmark logo (e.g. Canva) already says the name: show it alone
  if (m?.vh) return <span className="cw-logo"><BrandMark name={name} size={22} title={name} /></span>;
  return <span className="cw-logo">{hasMark(name) && <BrandMark name={name} size={22} />}<span>{name}</span></span>;
}
