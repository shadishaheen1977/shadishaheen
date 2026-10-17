import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ImgItem } from "../data/portfolio";
import { useLang } from "../lib/lang";
import { EASE } from "../lib/motion";
import { SmartImage } from "./SmartImage";

/* ------------------------------------------------------------------
   Full-screen image lightbox with keyboard navigation.
   Used by Photography / Content / Design / Works sections.
------------------------------------------------------------------- */

export function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: ImgItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (i: number) => void;
}) {
  const { isRtl } = useLang();
  const open = index !== null && index >= 0;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate(isRtl ? prev() : next());
      if (e.key === "ArrowLeft") onNavigate(isRtl ? next() : prev());
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, index, isRtl]);

  const next = () => ((index ?? 0) + 1) % items.length;
  const prev = () => ((index ?? 0) - 1 + items.length) % items.length;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-void/95 p-4 backdrop-blur-xl md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          {/* counter */}
          <div className="pointer-events-none absolute top-5 start-5 font-mono text-sm text-white/60" dir="ltr">
            {String((index ?? 0) + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </div>

          {/* close */}
          <button
            onClick={onClose}
            className="absolute top-4 end-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-white/40 hover:bg-white/10"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {/* image */}
          <motion.figure
            key={index}
            initial={{ opacity: 0, scale: 0.94, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="relative max-h-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <SmartImage
              src={items[index!]?.src}
              alt={items[index!]?.alt}
              eager
              className="mx-auto inline-block max-h-[80vh] w-auto max-w-full overflow-hidden rounded-xl border border-white/10"
              imgClassName="max-h-[80vh] w-auto object-contain"
            />
            {items[index!]?.alt && (
              <figcaption className="mt-3 text-center text-sm text-white/50">{items[index!]?.alt}</figcaption>
            )}
          </motion.figure>

          {/* prev / next */}
          <button
            onClick={(e) => { e.stopPropagation(); onNavigate(isRtl ? next() : prev()); }}
            className="absolute start-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/5 transition hover:border-white/40 hover:bg-white/10 md:start-8"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNavigate(isRtl ? prev() : next()); }}
            className="absolute end-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/5 transition hover:border-white/40 hover:bg-white/10 md:end-8"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
