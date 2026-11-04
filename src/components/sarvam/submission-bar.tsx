"use client";
// Submission page header: transparent over the hero light at the top, solid (white + hairline + blur) once scrolled,
// the same behaviour as the system's overlay nav (components.md → Nav).
import { useEffect, useState, type ReactNode } from "react";

export function SubmissionBar({ children }: { children: ReactNode }) {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 8);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return <header className="sb-bar" data-solid={solid}>{children}</header>;
}
