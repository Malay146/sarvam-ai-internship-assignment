// Dev-only: save a banner spec into banners/briefs.json and export its PNGs (used by the builder's "Save & export").
import { execFile } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { promisify } from "node:util";

const run = promisify(execFile);
export async function POST(req: Request) {
  if (process.env.NODE_ENV !== "development") return Response.json({ error: "Saving works in local development only." }, { status: 403 });
  const entry = await req.json();
  if (!/^[a-z0-9-]{2,40}$/.test(entry?.id ?? "")) return Response.json({ error: "Use an id like my-banner (a–z, 0–9, -)." }, { status: 400 });
  const file = "banners/briefs.json";
  const list = JSON.parse(await readFile(file, "utf8")) as { id: string }[];
  const i = list.findIndex((x) => x.id === entry.id);
  if (i >= 0) list[i] = entry; else list.push(entry);
  await writeFile(file, JSON.stringify(list, null, 2) + "\n");
  const { stdout } = await run("node", ["scripts/export-banners.mjs", "http://localhost:3000", entry.id], { timeout: 120000 });
  return Response.json({ ok: true, files: stdout.trim().split("\n") });
}
