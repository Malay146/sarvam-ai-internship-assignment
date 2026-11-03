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
