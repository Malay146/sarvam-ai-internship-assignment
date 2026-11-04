// Builds deliverables/1-design-system/design.md: every system file concatenated into one document
// (for tools that accept a single file, e.g. ChatGPT / Figma AI). Run after editing any .md.
import { readFileSync, writeFileSync } from "node:fs";
const D = "deliverables/1-design-system/";
const order = ["SKILL.md", "expressions.md", "tokens.md", "typography.md", "layout.md", "components.md", "imagery.md", "logo.md", "voice.md", "recipes/banner-builder.md", "recipes/meta-banner.md", "recipes/linkedin-banner.md", "recipes/landing-page.md"];
const strip = (s) => s.replace(/^---\n[\s\S]*?\n---\n/, "");
const demote = (s) => s.replace(/^(#{1,5}) /gm, "#$1 ");
let out = `# Sarvam design system: single-file edition\n\nGenerated from \`deliverables/1-design-system/\` by \`scripts/build-design-md.mjs\`. Do not edit by hand. Machine-readable tokens: \`deliverables/1-design-system/tokens.css\`.\n\n## Contents\n${order.map((f, i) => `${i + 1}. ${f}`).join("\n")}\n`;
for (const f of order) out += `\n\n---\n\n<!-- ${f} -->\n${demote(strip(readFileSync(D + f, "utf8")))}`;
writeFileSync(D + "design.md", out);
console.log(`design.md: ${out.length.toLocaleString()} chars, ${out.split("\n").length} lines`);
