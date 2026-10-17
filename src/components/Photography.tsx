import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Expand } from "lucide-react";
import { characters, type ImgItem } from "../data/portfolio";
import { useLang } from "../lib/lang";
import { EASE } from "../lib/motion";
import { SectionHead } from "./SectionHead";
import { SmartImage } from "./SmartImage";
import { Lightbox } from "./Lightbox";
import { LogoWatermark } from "./LogoWatermark";
import { cn } from "../utils/cn";

/* ------------------------------------------------------------------
   PHOTOGRAPHY — filterable masonry gallery (restaurants / products /
   cars & apartments) with a high-res lightbox. All items come from
   `media.photography` in the data file.
------------------------------------------------------------------- */

type Filter = "restaurants" | "cars" | "medical" | "realestate" | "products";

export function Photography() {
  const { t, content } = useLang();
  const media = content.media;
  const [filter, setFilter] = useState<Filter>("restaurants");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const items: ImgItem[] = useMemo(
    () => media.photography[filter].map((img) => ({ ...img, cat: filter })),
    [filter]
  );

  const FILTERS: { key: Filter; label: string }[] = [
    { key: "restaurants", label: t.photo.filters.restaurants },
    { key: "cars", label: t.photo.filters.cars },
    { key: "medical", label: t.photo.filters.medical },
    { key: "realestate", label: t.photo.filters.realestate },
    { key: "products", label: t.photo.filters.products },
  ];

  return (
    <section id="photography" className="relative mx-auto max-w-[1500px] overflow-hidden px-5 py-24 md:px-10 md:py-36">
      <LogoWatermark className="-end-16 -top-10 w-[380px] md:w-[520px]" rotate={-12} opacity={0.05} />
      <SectionHead
        kicker={t.photo.kicker}
        titleA={t.photo.titleA}
        titleB={t.photo.titleB}
        sub={t.photo.sub}
        mascot={characters.photography}
      />

      {/* filter pills (sticky under the nav) */}
      <div className="sticky top-16 z-40 -mx-2 mb-10 flex gap-2 overflow-x-auto bg-void/80 px-2 py-3 backdrop-blur-lg md:top-20">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300",
              filter === f.key
                ? "border-transparent bg-grad text-black shadow-lg shadow-grape/30"
                : "border-white/15 text-white/55 hover:border-white/40 hover:text-white"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* masonry grid — keyed by filter for a fresh stagger on change */}
      <motion.div key={filter} className="masonry">
        {items.map((img, i) => (
          <motion.button
            key={img.src}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: Math.min(i * 0.05, 0.6) }}
            onClick={() => setLightbox(i)}
            className="group relative block w-full overflow-hidden rounded-md border border-white/8 text-start transition-colors duration-300 hover:border-grape/70"
          >
            <SmartImage
              src={img.src}
              alt={img.alt}
              className="w-full"
              imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
            <span className="pointer-events-none absolute start-3 top-3 z-10 rounded-sm bg-void/60 px-1.5 py-0.5 font-mono text-[10px] tracking-[0.2em] text-grape backdrop-blur" dir="ltr">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
            <span className="absolute bottom-3 start-3 end-3 flex items-center justify-between gap-2 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100 translate-y-2">
              <span className="truncate text-xs text-white/80">{img.alt}</span>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-grape text-black">
                <Expand className="h-3.5 w-3.5" />
              </span>
            </span>
          </motion.button>
        ))}
      </motion.div>

      <Lightbox items={items} index={lightbox} onClose={() => setLightbox(null)} onNavigate={setLightbox} />
    </section>
  );
}
