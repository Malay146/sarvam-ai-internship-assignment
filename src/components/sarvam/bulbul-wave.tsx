// Waveform + voice avatar for the Bulbul page. No hooks, so server sections can use them too.
// The wave's state comes from its parent (data-state): idle (flat) → stream (bars rise left to right) → play (bars fill
// with colour left to right, a playhead sweeps) → done. All of it is CSS on transform/colour (bulbul.css §Wave).
import type { CSSProperties } from "react";
import { waveBars, type Tone, type WaveProfile } from "./bulbul-data";

export type WaveState = "idle" | "stream" | "play" | "done" | "static";

export function Wave({ seed, n = 64, profile = "speech", state = "static", tone = "indigo", playMs = 4000, streamMs = 900, head = true, className = "" }: {
  seed: number; n?: number; profile?: WaveProfile; state?: WaveState; tone?: Tone; playMs?: number; streamMs?: number; head?: boolean; className?: string;
}) {
  const bars = waveBars(seed, n, profile);
  const style = { "--n": n, "--play-ms": `${playMs}ms`, "--stream-ms": `${streamMs}ms` } as CSSProperties;
  return (
    <div className={`bb-wave bb-tone-${tone} ${className}`} data-state={state} style={style} aria-hidden>
      {bars.map((b, i) => <span key={i} data-seg={b.seg} style={{ "--h": b.h.toFixed(3), "--i": i } as CSSProperties} />)}
      {head && <i className="bb-wave__head" />}
    </div>
  );
}

/** A voice's avatar: its studio shape on a soft glow card (our own geometry; see bulbul-data.ts). */
export function VoiceAvatar({ svg, size = 40 }: { svg: string; size?: number }) {
  return <span className="bb-ava" style={{ width: size, height: size }} aria-hidden dangerouslySetInnerHTML={{ __html: svg }} />;
}
