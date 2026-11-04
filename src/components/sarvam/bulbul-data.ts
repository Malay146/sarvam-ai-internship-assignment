// Bulbul V4 Flash page data, shared by the server page and the client sections.
// Facts: design-system/voice.md §5 (Bulbul fact sheet). Speaker IDs are from Sarvam's voices guide (docs.sarvam.ai).
// Sample lines: the Bengali, Indian English, booking and playground lines are Sarvam's own samples; the rest are
// illustrative UI text written for this page (short, everyday, nothing claimed).
import { FLOWER_PRESETS, MEDALLION_PRESETS, flowerPath, glowSVG, medallionPath, type GlowPalette } from "@/lib/shapes";

export type Tone = "indigo" | "orange" | "green" | "rose" | "neutral";

/** Each voice gets one studio shape (our own geometry) as its avatar: voices have no faces, so no stock photos. */
export type Voice = {
  id: string; name: string; style: string; lang: string; code: string; tone: Tone; line: string; seed: number; avatar: string;
};

const PALETTE: Record<Tone, GlowPalette> = { indigo: "lavender", orange: "marigold", green: "leaf", rose: "rose", neutral: "dusk" };
const flower = (k: string, tone: Tone, uid: string) => glowSVG(flowerPath(FLOWER_PRESETS[k]), PALETTE[tone], uid);
const medal = (k: string, tone: Tone, uid: string) => glowSVG(medallionPath(MEDALLION_PRESETS[k]), PALETTE[tone], uid);

export const VOICES: Voice[] = [
  { id: "ishita_enhi_companion", name: "Ishita", style: "Companion", lang: "Hinglish", code: "hi-IN", tone: "indigo", seed: 11,
    line: "नमस्ते! यह Bulbul V4 है। कोई भी line लिखिए, किसी भी भाषा में, और Generate दबाकर तुरंत सुनिए।", avatar: flower("Lotus", "indigo", "v-ishita") },
  { id: "sophia_en_conversational", name: "Sophia", style: "Conversational", lang: "Indian English", code: "en-IN", tone: "rose", seed: 23,
    line: "What ra Sudeep? You said five minutes, and it has been forty!", avatar: flower("Rosette", "rose", "v-sophia") },
  { id: "sanchita_hi_assistant", name: "Sanchita", style: "Assistant", lang: "Hindi", code: "hi-IN", tone: "green", seed: 37,
    line: "नमस्ते! आज आपकी तीन meetings हैं, पहली सुबह दस बजे।", avatar: medal("Quatrefoil", "green", "v-sanchita") },
  { id: "aparna_hi_customer", name: "Aparna", style: "Customer care", lang: "Hindi", code: "hi-IN", tone: "orange", seed: 41,
    line: "हाँ जी, umm… एक second, आपकी booking details check कर रही हूँ… हाँ, मिल गई।", avatar: flower("Marigold", "orange", "v-aparna") },
  { id: "arnab_bn_conversation", name: "Arnab", style: "Conversational", lang: "Bengali", code: "bn-IN", tone: "neutral", seed: 53,
    line: "ধুর বাবা, এই জ্যামে আর পারা যায় না!", avatar: medal("Scalloped medallion", "neutral", "v-arnab") },
  { id: "ashwin_en_sports", name: "Ashwin", style: "Sports", lang: "Indian English", code: "en-IN", tone: "orange", seed: 67,
    line: "He charges down the track, and that is gone all the way for six!", avatar: medal("Eight-point star", "orange", "v-ashwin") },
  { id: "anand_hi_documentary", name: "Anand", style: "Documentary", lang: "Hindi", code: "hi-IN", tone: "indigo", seed: 79,
    line: "हिमालय की चोटियों पर, सुबह धीरे-धीरे उतरती है।", avatar: medal("Six-fold lotus", "indigo", "v-anand") },
  { id: "gokul_ta_narration", name: "Gokul", style: "Narration", lang: "Tamil", code: "ta-IN", tone: "green", seed: 97,
    line: "ஒரு காலத்தில், ஒரு சிறிய கிராமத்தில் ஒரு புத்திசாலி பெண் வாழ்ந்தாள்.", avatar: flower("Kamal", "green", "v-gokul") },
];

/** The eleven languages, with a greeting in each script (the greeting is what a reader recognises first). */
export const LANGS: { name: string; code: string; hello: string }[] = [
  { name: "Hindi", code: "hi-IN", hello: "नमस्ते" },
  { name: "Bengali", code: "bn-IN", hello: "নমস্কার" },
  { name: "Tamil", code: "ta-IN", hello: "வணக்கம்" },
  { name: "Telugu", code: "te-IN", hello: "నమస్కారం" },
  { name: "Marathi", code: "mr-IN", hello: "नमस्कार" },
  { name: "Gujarati", code: "gu-IN", hello: "નમસ્તે" },
  { name: "Kannada", code: "kn-IN", hello: "ನಮಸ್ಕಾರ" },
  { name: "Malayalam", code: "ml-IN", hello: "നമസ്കാരം" },
  { name: "Punjabi", code: "pa-IN", hello: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ" },
  { name: "Odia", code: "od-IN", hello: "ନମସ୍କାର" },
  { name: "Indian English", code: "en-IN", hello: "Hello" },
];

/** Deterministic waveform: speech-like phrases (bursts with short pauses), shaped by a delivery profile. */
export type WaveProfile = "speech" | "calm" | "energy" | "duet" | "bilingual";
export function waveBars(seed: number, n: number, profile: WaveProfile = "speech"): { h: number; seg: 0 | 1 }[] {
  let s = seed >>> 0;
  const r = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  const out: { h: number; seg: 0 | 1 }[] = [];
  const amp = profile === "calm" ? 0.55 : profile === "energy" ? 1 : 0.8;
  const gapEvery = profile === "energy" ? 22 : profile === "calm" ? 9 : 13;
  let seg: 0 | 1 = 0;
  for (let i = 0; i < n; i++) {
    const pos = i % gapEvery;
    const inGap = pos >= gapEvery - (profile === "calm" ? 3 : 2);
    if ((profile === "duet" || profile === "bilingual") && pos === 0 && i > 0 && r() > 0.35) seg = seg === 0 ? 1 : 0;
    const phrase = Math.sin((Math.PI * pos) / gapEvery);             // each phrase rises and falls
    const h = inGap ? 0.08 + r() * 0.06 : Math.max(0.12, Math.min(1, amp * (0.35 + 0.65 * phrase) * (0.55 + r() * 0.45)));
    out.push({ h, seg });
  }
  return out;
}
