"use client";
// Interactive pieces of the Sarvam component library.
import { useEffect, useRef, useState, type ReactNode } from "react";

/** Adds `is-in` to its wrapper once it scrolls into view (used to start entrance animations). */
export function InView({ children, className = "", threshold = 0.35 }: { children: ReactNode; className?: string; threshold?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }, { threshold });
    io.observe(el); return () => io.disconnect();
  }, [threshold]);
  return <div ref={ref} className={`${className}${inView ? " is-in" : ""}`}>{children}</div>;
}

/** Nav frame: overlay mode is transparent at the top and turns solid once scrolled.
 *  Mirrors sarvam.ai: solid after 8px, back to transparent below 2px (hysteresis, no flicker). */
export function NavFrame({ overlay = false, className = "", children }: { overlay?: boolean; className?: string; children: ReactNode }) {
  const [solid, setSolid] = useState(!overlay);
  useEffect(() => {
    if (!overlay) return;
    const on = () => setSolid((s) => (s ? window.scrollY > 2 : window.scrollY > 8));
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [overlay]);
  return <nav className={`sr-nav${overlay ? " sr-nav--overlay" : ""} ${className}`} data-solid={solid} aria-label="Main">{children}</nav>;
}

/** Fixed-size artboard (e.g. a 1080×1350 banner) scaled to fit its container width.
 *  Design happens in real banner pixels; the preview is an exact scaled copy (no reflow). */
export function Artboard({ width, height, children, className = "", label }: { width: number; height: number; children: ReactNode; className?: string; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / width));
    ro.observe(el); return () => ro.disconnect();
  }, [width]);
  return (
    <div ref={ref} className={`sr-artboard ${className}`} style={{ aspectRatio: `${width} / ${height}` }} role={label ? "img" : undefined} aria-label={label}>
      <div className="sr-artboard__canvas" style={{ width, height, transform: `scale(${scale})`, visibility: scale ? "visible" : "hidden" }}>{children}</div>
    </div>
  );
}
