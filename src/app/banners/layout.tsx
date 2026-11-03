// Banner routes only: Noto Sans for the Indian scripts used by the script-mandala device (composer.tsx SCRIPT_WORDS).
// Subset with `text=` so only the glyphs of the mandala words load. Devanagari is already loaded in the root layout.
import { SCRIPT_WORDS } from "@/components/sarvam/composer";

const families = ["Bengali", "Tamil", "Telugu", "Kannada", "Malayalam", "Gujarati", "Gurmukhi", "Oriya"].map((s) => `family=Noto+Sans+${s}:wght@500`).join("&");
const text = encodeURIComponent([...new Set(SCRIPT_WORDS.map((w) => w.word).join(""))].join(""));
const HREF = `https://fonts.googleapis.com/css2?${families}&text=${text}&display=block`;

export default function BannersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="stylesheet" href={HREF} precedence="default" />
      {children}
    </>
  );
}
