import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { VideoItem } from "../data/portfolio";
import { EASE } from "../lib/motion";
import { SmartVideo } from "./SmartVideo";

/* ------------------------------------------------------------------
   VideoModal — inline player for local mp4, YouTube or Vimeo items.
------------------------------------------------------------------- */

export function VideoModal({ item, onClose }: { item: VideoItem | null; onClose: () => void }) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-void/95 p-4 backdrop-blur-xl md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={onClose}
            className="absolute top-4 end-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 transition hover:border-white/40 hover:bg-white/10"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video w-full bg-black">
              {item.type === "video" && (
                <SmartVideo src={item.src} poster={item.poster} autoPlay controls className="h-full w-full" />
              )}
              {item.type === "youtube" && (
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${item.id}?autoplay=1&rel=0`}
                  title="YouTube player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
              {item.type === "vimeo" && (
                <iframe
                  className="h-full w-full"
                  src={`https://player.vimeo.com/video/${item.id}?autoplay=1`}
                  title="Vimeo player"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
