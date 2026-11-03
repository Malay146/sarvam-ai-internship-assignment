import { chromium } from "playwright";
const out = process.argv[2];
const specs = {
  "02-knowledge-fabric": ["landscape", { background: "olive", device: "medallion-glow", shape: "Onion lantern", treatment: "white", mark: "inside", titleStyle: "sans", primary: "Knowledge Fabric for Agents" }],
  "12-sarvam-30b": ["landscape", { background: "saffron-rose", device: "medallion-carved", shape: "Onion lantern", treatment: "white", mark: "none", titleStyle: "sans", primary: "Sarvam 30B" }],
  "07-supernova": ["square", { background: "lavender-dusk", device: "cloud", treatment: "ink", mark: "inside", partner: "Supernova", titleStyle: "serif", primary: "How Supernova built a voice-first English tutor with Sarvam" }],
  "10-startup-program": ["landscape", { layout: "split", background: "plain", device: "gloss", treatment: "ink", mark: "inside", titleStyle: "serif", primary: "Startup Program", secondary: "Everything you need to build", secondaryPlace: "below" }],
};
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1400, height: 1400 }, reducedMotion: "reduce" });
for (const [n, [f, spec]] of Object.entries(specs)) {
  await p.goto(`http://localhost:3000/banners/render?f=${f}&id=r${n}&b=${Buffer.from(JSON.stringify(spec)).toString("base64url")}`, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(250);
  await (await p.$("#banner > *")).screenshot({ path: `${out}-${n}.png` });
}
await b.close();
