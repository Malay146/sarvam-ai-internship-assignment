"use client";
// FAQ accordion (P12), animated with Motion. Spec: deliverables/1-design-system/components.md → Faq.
// Open: height eases 0 → auto while the answer fades in, rises 8px and un-blurs, slightly behind the height.
// Close: the answer fades out quickly first, then the height collapses, so text never gets clipped mid-fade.
import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "@/components/icons";
import { DUR, EASE } from "./motion";

const ICON_STROKE = 1.5;

export function Faq({ items, defaultOpen = 0 }: { items: { q: string; a: string }[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<Set<number>>(() => new Set(defaultOpen == null ? [] : [defaultOpen]));
  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  return (
    <div className="sr-faq">
      {items.map((it, i) => (
        <FaqItem key={it.q} q={it.q} a={it.a} isOpen={open.has(i)} onToggle={() => toggle(i)} />
      ))}
    </div>
  );
}

function FaqItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  const id = useId();
  const reduced = useReducedMotion();
  const panelId = `${id}-panel`;
  const btnId = `${id}-btn`;

  const height = reduced
    ? { duration: 0 }
    : isOpen
      ? { duration: DUR.slow, ease: EASE.outQuint }          // open: long, soft landing
      : { duration: DUR.moderate, ease: EASE.emphasized, delay: 0.05 }; // close: quicker, waits for the text to fade

  return (
    <div className="sr-faq__item" data-open={isOpen || undefined}>
      <h3 className="sr-faq__h">
        <button id={btnId} type="button" className="sr-faq__q" aria-expanded={isOpen} aria-controls={panelId} onClick={onToggle}>
          <span>{q}</span>
          <motion.span
            className="sr-faq__icon"
            aria-hidden
            initial={false}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={reduced ? { duration: 0 } : { duration: DUR.slow, ease: EASE.outQuint }}
          >
            <ChevronDown strokeWidth={ICON_STROKE} />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="panel"
            id={panelId}
            role="region"
            aria-labelledby={btnId}
            className="sr-faq__panel"
            initial={{ height: 0 }}
            animate={{ height: "auto", transition: height }}
            exit={{ height: 0, transition: height }}
          >
            <motion.div
              className="sr-faq__a"
              initial={reduced ? false : { opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)", transition: reduced ? { duration: 0 } : { duration: DUR.slow, ease: EASE.outQuint, delay: 0.08 } }}
              exit={reduced ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -4, filter: "blur(2px)", transition: { duration: DUR.fast, ease: EASE.standard } }}
            >
              <p className="sr-body">{a}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
