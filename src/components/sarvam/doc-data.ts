// Document AI page data, shared by the server page and the client sections.
// Facts: deliverables/1-design-system/voice.md §5 (Document AI fact sheet). The sample document is illustrative UI text: a Hindi land
// record certificate written for this page (no real person, no real record), used to show layout, reading order,
// tables and handwriting.

export type Tone = "indigo" | "orange" | "green" | "rose" | "neutral";

/** Elements of the sample page, in reading order. Boxes are % of the page (x, y, w, h). */
export type El = { key: string; type: string; tone: Tone; box: [number, number, number, number]; md: string; snippet: string };
export const PAGE_ELEMENTS: El[] = [
  { key: "h", type: "Heading", tone: "indigo", box: [16, 5, 68, 11], md: "# भूमि अभिलेख प्रमाण पत्र", snippet: "भूमि अभिलेख प्रमाण पत्र" },
  { key: "p1", type: "Paragraph", tone: "green", box: [7, 20, 41, 19], md: "प्रमाणित किया जाता है कि नीचे दी गई भूमि का विवरण राजस्व अभिलेख के अनुसार है।", snippet: "प्रमाणित किया जाता है कि…" },
  { key: "p2", type: "Paragraph", tone: "green", box: [52, 20, 41, 19], md: "यह प्रमाण पत्र केवल सूचना हेतु जारी किया गया है।", snippet: "यह प्रमाण पत्र केवल सूचना…" },
  { key: "t", type: "Table", tone: "orange", box: [7, 43, 86, 29], md: "| खसरा सं. | क्षेत्रफल | खाताधारक |", snippet: "3 rows · 3 columns" },
  { key: "hw", type: "Handwriting", tone: "rose", box: [56, 76, 37, 12], md: "> सत्यापित — 12.03.2024", snippet: "सत्यापित — 12.03.2024" },
  { key: "f", type: "Footnote", tone: "neutral", box: [7, 91, 50, 5], md: "[^1]: क्षेत्रफल हेक्टेयर में", snippet: "क्षेत्रफल हेक्टेयर में" },
];
export const TABLE_ROWS: [string, string, string][] = [
  ["214", "0.42", "रमेश कुमार"],
  ["215", "1.10", "सुनीता देवी"],
  ["219", "0.75", "अब्दुल रहीम"],
];

/** The four places plain OCR falls short (Sarvam's list), each shown as plain OCR vs Document AI on the same page. */
export const PAINS = [
  { key: "layout", label: "Complex layouts", tone: "indigo" as Tone },
  { key: "script", label: "Indian scripts", tone: "rose" as Tone },
  { key: "table", label: "Tables", tone: "orange" as Tone },
  { key: "fix", label: "Fixing errors", tone: "green" as Tone },
];

/** Scripts of the 23 languages (English + 22), grouped, with a large sample glyph and each language's own name. */
export const SCRIPTS: { script: string; glyph: string; lang: string; langs: [string, string][] }[] = [
  { script: "Devanagari", glyph: "अ", lang: "hi", langs: [["Hindi", "हिन्दी"], ["Marathi", "मराठी"], ["Nepali", "नेपाली"], ["Konkani", "कोंकणी"], ["Maithili", "मैथिली"], ["Dogri", "डोगरी"], ["Bodo", "बर'"], ["Sanskrit", "संस्कृतम्"]] },
  { script: "Bengali–Assamese", glyph: "অ", lang: "bn", langs: [["Bengali", "বাংলা"], ["Assamese", "অসমীয়া"], ["Manipuri", "মৈতৈলোন্"]] },
  { script: "Perso-Arabic", glyph: "ا", lang: "ur", langs: [["Urdu", "اردو"], ["Kashmiri", "کٲشُر"], ["Sindhi", "سنڌي"]] },
  { script: "Tamil", glyph: "அ", lang: "ta", langs: [["Tamil", "தமிழ்"]] },
  { script: "Telugu", glyph: "అ", lang: "te", langs: [["Telugu", "తెలుగు"]] },
  { script: "Kannada", glyph: "ಅ", lang: "kn", langs: [["Kannada", "ಕನ್ನಡ"]] },
  { script: "Malayalam", glyph: "അ", lang: "ml", langs: [["Malayalam", "മലയാളം"]] },
  { script: "Gujarati", glyph: "અ", lang: "gu", langs: [["Gujarati", "ગુજરાતી"]] },
  { script: "Gurmukhi", glyph: "ਅ", lang: "pa", langs: [["Punjabi", "ਪੰਜਾਬੀ"]] },
  { script: "Odia", glyph: "ଅ", lang: "or", langs: [["Odia", "ଓଡ଼ିଆ"]] },
  { script: "Ol Chiki", glyph: "ᱚ", lang: "sat", langs: [["Santali", "ᱥᱟᱱᱛᱟᱲᱤ"]] },
  { script: "Latin", glyph: "Aa", lang: "en", langs: [["English", "English"]] },
];
