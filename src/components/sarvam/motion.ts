"use client";
// Motion tokens + the one loop hook every animated component uses. Spec: components.md §5 (Motion).
// Values mirror tokens.css (--duration-*, --ease-*) so CSS and Motion animations feel identical.
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

export const EASE = {
  standard: [0.4, 0, 0.2, 1],
  emphasized: [0.2, 0, 0, 1],
  outQuint: [0.22, 1, 0.36, 1],
  outExpo: [0.16, 1, 0.3, 1],
} as const;

export const DUR = { instant: 0.1, fast: 0.15, normal: 0.2, moderate: 0.3, button: 0.35, slow: 0.5, entrance: 0.7 } as const;

/** Standard transitions. Use these; don't hand-roll durations. */
export const T = {
  enter: { duration: DUR.slow, ease: EASE.outQuint },          // items arriving
  state: { duration: DUR.moderate, ease: EASE.emphasized },     // a state change (icon, chip, colour)
  bar: { duration: DUR.entrance, ease: EASE.outQuint },         // progress / widths
  exit: { duration: DUR.normal, ease: EASE.standard },          // leaving
} as const;

/** Entrance preset: 8px rise + fade. The only entrance used in loops. */
export const rise = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -4 } };
export const STAGGER = 0.06;

/**
 * Loops through phases 0…n−1 with a duration (ms) per phase, then starts again.
 * - Pauses while the element is off-screen (no wasted work).
 * - With reduced motion, it holds the final phase (the finished state) and never animates.
 * Returns [ref to attach, current phase].
 */
export function useLoop<T extends Element = HTMLDivElement>(durations: number[]) {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduced = useReducedMotion();
  const last = durations.length - 1;
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (reduced || !inView) return;
    const id = setTimeout(() => setPhase((p) => (p + 1) % durations.length), durations[phase]);
    return () => clearTimeout(id);
  }, [phase, inView, reduced, durations]);
  return [ref, reduced ? last : phase] as const;
}
