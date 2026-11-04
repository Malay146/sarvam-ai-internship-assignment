// Brand marks for real integrations (mono, currentColor). Data + licences: ./brand-marks.ts.
import { BRAND_MARKS } from "./brand-marks";

export function BrandMark({ name, size = 24, title, colored }: { name: string; size?: number; title?: string; colored?: boolean }) {
  const m = BRAND_MARKS[name];
  if (!m) return null;
  return (
    <svg viewBox={`0 0 ${m.vb} ${m.vb}`} width={size} height={size} fill={colored ? m.color : "currentColor"} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true} style={{ display: "block", flexShrink: 0 }}>
      {m.d.map((d, i) => <path key={i} d={d} fill={colored && m.parts ? m.parts[i] : undefined} />)}
    </svg>
  );
}
export const hasMark = (name: string) => name in BRAND_MARKS;

/** A logo lockup for strips: the official mark + the name, both in one mono tone. No chip, no colour. */
export function LogoLockup({ name }: { name: string }) {
  return <span className="cw-logo">{hasMark(name) && <BrandMark name={name} size={22} />}<span>{name}</span></span>;
}
