import { useEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import { ChevronLeft, ChevronRight, MoveHorizontal, Play } from "lucide-react";
import { characters, type VideoItem, type VideoCat } from "../data/portfolio";
import { useLang } from "../lib/lang";
import { EASE, Reveal } from "../lib/motion";
import { SectionHead } from "./SectionHead";
import { SmartImage } from "./SmartImage";
import { VideoModal } from "./VideoModal";
import { LogoWatermark } from "./LogoWatermark";
import { cn } from "../utils/cn";

type VFilter = VideoCat;

/* ------------------------------------------------------------------
   VIDEO — draggable showreel rail of cinematic thumbnails.
   Local mp4 + YouTube/Vimeo open in an inline modal player.
------------------------------------------------------------------- */

export function VideoSection() {
  const { t, lang, isRtl, content } = useLang();
  const media = content.media;
  const [active, setActive] = useState<VideoItem | null>(null);
  const [filter, setFilter] = useState<VFilter>("products");

  const items: VideoItem[] = useMemo(
    () => media.video.filter((v) => v.cat === filter),
    [filter]
  );

  const VFILTERS: { key: VFilter; label: string }[] = [
    { key: "products", label: t.video.filters.products },
    { key: "restaurants", label: t.video.filters.restaurants },
    { key: "medical", label: t.video.filters.medical },
    { key: "realestate", label: t.video.filters.realestate },
    { key: "cars", label: t.video.filters.cars },
    { key: "acting", label: t.video.filters.acting },
  ];

  const trackRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [range, setRange] = useState(0);
  const [progress, setProgress] = useState(0);

  // measure how far the rail can travel (re-runs when the filter changes)
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current, strip = stripRef.current;
      if (!track || !strip) return;
      setRange(Math.max(0, strip.scrollWidth - track.clientWidth));
    };
    measure();
    // reset scroll position on filter change so the rail starts from the edge
    animate(x, 0, { duration: 0.4, ease: EASE });
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [filter, x]);

  useEffect(() => x.on("change", (v) => setProgress(range ? Math.min(1, Math.abs(v) / range) : 0)), [x, range]);

  const nudge = (dir: 1 | -1) => {
    const step = Math.min(460, (trackRef.current?.clientWidth ?? 400) * 0.8);
    const target = Math.max(-range, Math.min(0, x.get() + dir * step * -1));
    animate(x, target, { duration: 0.7, ease: EASE });
  };

  return (
    <section id="video" className="relative overflow-hidden py-24 md:py-36">
      <LogoWatermark className="-start-20 bottom-10 w-[340px] md:w-[460px]" rotate={18} opacity={0.045} />
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <SectionHead
          kicker={t.video.kicker}
          titleA={t.video.titleA}
          titleB={t.video.titleB}
          sub={t.video.sub}
          mascot={characters.video}
        />

        {/* filter pills */}
        <div className="-mx-2 mb-10 flex gap-2 overflow-x-auto px-2 py-1">
          {VFILTERS.map((f) => (
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
      </div>

      <Reveal key={filter}>
        {items.length === 0 ? (
          <div className="mx-auto flex min-h-48 max-w-[1500px] items-center px-5 text-sm text-white/50 md:px-10">
            {t.video.empty}
          </div>
        ) : (
        <>
        {/* drag rail — direction fixed to ltr internally for consistent physics */}
        <div ref={trackRef} className="film-strip overflow-hidden" dir="ltr">
          <motion.div
            ref={stripRef}
            drag="x"
            style={{ x }}
            dragConstraints={{ left: -range, right: 0 }}
            dragElastic={0.06}
            className="flex w-max cursor-grab gap-5 px-5 active:cursor-grabbing md:px-10"
          >
            {items.map((v, i) => (
              <button
                key={i}
                onClick={() => setActive(v)}
                className="group relative w-[62vw] shrink-0 text-start sm:w-[280px] md:w-[300px]"
              >
                <div className="relative aspect-[9/16] overflow-hidden rounded-md border border-white/10 transition-colors duration-300 group-hover:border-grape/70">
                  <SmartImage
                    src={v.poster}
                    alt={v.title?.[lang]}
                    className="h-full w-full"
                    imgClassName="transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-void/10 to-transparent" />
                  {/* play button */}
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="grid h-16 w-16 place-items-center rounded-full border border-white/25 bg-void/40 backdrop-blur-md transition-all duration-400 group-hover:scale-110 group-hover:border-transparent group-hover:bg-grad group-hover:text-black">
                      <Play className="h-6 w-6 fill-current text-white ms-0.5 group-hover:text-black" />
                    </span>
                  </span>
                  {/* meta */}
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
                    <span className="text-sm font-semibold text-white/90">{v.title?.[lang]}</span>
                    <span className="rounded-full bg-void/60 px-2.5 py-1 font-mono text-[10px] text-white/70 backdrop-blur" dir="ltr">
                      {v.type.toUpperCase()} · {v.duration ?? "00:00"}
                    </span>
                  </div>
                  <span className="absolute left-4 top-4 font-mono text-[10px] tracking-[0.3em] text-grape">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </button>
            ))}
          </motion.div>
        </div>

        {/* controls */}
        <div className="mx-auto mt-8 flex max-w-[1500px] items-center gap-4 px-5 md:px-10">
          <span className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 md:flex">
            <MoveHorizontal className="h-4 w-4" />
            {t.video.drag}
          </span>
          <div className="relative h-px flex-1 bg-white/12">
            <div className="absolute inset-y-0 start-0 bg-grad transition-[width] duration-150" style={{ width: `${8 + progress * 92}%` }} />
          </div>
          <div className="flex gap-2" dir="ltr">
            <button
              onClick={() => nudge(isRtl ? 1 : -1)}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition hover:border-white/40 hover:text-white rtl:-scale-x-100"
              aria-label="Previous"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => nudge(isRtl ? -1 : 1)}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition hover:border-white/40 hover:text-white rtl:-scale-x-100"
              aria-label="Next"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        </>
        )}
      </Reveal>

      <VideoModal item={active} onClose={() => setActive(null)} />
    </section>
  );
}
