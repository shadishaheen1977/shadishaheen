import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useLang } from "../lib/lang";
import { EASE, Line } from "../lib/motion";
import { SmartVideo } from "./SmartVideo";
import { Logo } from "./Logo";

/* ------------------------------------------------------------------
   HERO — "through the viewfinder".
   Full-screen showreel (desktop + mobile sources) framed by camera
   viewfinder brackets, a live REC timecode and exposure read-outs,
   with the full Shadi Shaheen logo + staggered headline.
   Video sources come from media.hero (editable in the admin panel).
------------------------------------------------------------------- */

function useTimecode() {
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setT((v) => v + 1), 1000 / 25);
    return () => window.clearInterval(id);
  }, []);
  const f = t % 25;
  const s = Math.floor(t / 25);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}:${pad(f)}`;
}

export function Hero() {
  const { t, lang, isRtl, content } = useLang();
  const media = content.media;
  const site = content.site;
  const ref = useRef<HTMLElement>(null);
  const tc = useTimecode();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative min-h-svh overflow-hidden bg-void">
      {/* ——— background video (two sources: desktop / mobile) ——— */}
      <motion.div style={{ scale: videoScale }} className="absolute inset-0">
        <div className="absolute inset-0 hidden md:block">
          <SmartVideo src={media.hero.desktopVideo} poster={media.hero.poster} className="h-full w-full" />
        </div>
        <div className="absolute inset-0 md:hidden">
          <SmartVideo src={media.hero.mobileVideo} poster={media.hero.poster} className="h-full w-full" />
        </div>
      </motion.div>

      {/* ——— grade: black with orange warmth ——— */}
      <div className="absolute inset-0 bg-void/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-void/60" />
      <div className="absolute -bottom-40 start-1/3 h-[28rem] w-[28rem] rounded-full bg-grape/20 blur-[160px]" />

      {/* ——— viewfinder frame ——— */}
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
        className="pointer-events-none absolute inset-x-4 bottom-6 top-20 md:inset-x-8 md:bottom-8 md:top-24"
        dir="ltr"
        aria-hidden
      >
        <span className="vf-corner tl" />
        <span className="vf-corner tr" />
        <span className="vf-corner bl" />
        <span className="vf-corner br" />

        {/* REC + timecode */}
        <div className="absolute left-4 top-3 flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-white/75 md:left-6 md:top-4">
          <span className="rec-dot h-2.5 w-2.5 rounded-full bg-red-500" />
          REC
          <span className="ms-2 text-white/55">{tc}</span>
        </div>

        {/* exposure read-outs */}
        <div className="absolute right-4 top-3 hidden gap-5 font-mono text-[11px] tracking-[0.2em] text-white/55 sm:flex md:right-6 md:top-4">
          <span>ISO 400</span>
          <span className="text-grape">f/2.8</span>
          <span>1/250</span>
          <span>4K · 25P</span>
        </div>

        {/* centre focus reticle */}
        <div className="absolute left-1/2 top-1/2 hidden h-16 w-16 -translate-x-1/2 -translate-y-1/2 md:block">
          <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-grape/80" />
          <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-grape/80" />
          <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-grape/80" />
          <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-grape/80" />
          <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-grape" />
        </div>

        {/* battery / bottom scale */}
        <div className="absolute bottom-3 right-4 hidden items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-white/50 md:right-6 md:bottom-4 md:flex">
          <span className="relative inline-block h-3 w-6 rounded-[2px] border border-white/50">
            <span className="absolute inset-y-[2px] left-[2px] w-[70%] bg-grape" />
          </span>
          {t.hero.reel}
        </div>
      </motion.div>

      {/* ——— main content ——— */}
      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="relative z-10 mx-auto grid min-h-svh max-w-[1500px] items-end gap-10 px-8 pb-20 pt-32 md:px-16 md:pb-20 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:pb-16"
      >
        {/* logo lockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: EASE }}
          className="order-1 lg:order-2"
        >
          <Logo className="mx-auto w-[min(88vw,560px)] [filter:drop-shadow(0_0_40px_rgba(242,138,42,0.18))] lg:ms-auto lg:me-0" />
        </motion.div>

        <div className="order-2 lg:order-1">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: EASE }}
            className="mb-5 inline-flex items-center gap-3 font-brand text-[11px] font-semibold uppercase tracking-[0.3em] text-grape"
          >
            <span className="h-px w-10 bg-grape" />
            {t.hero.kicker}
          </motion.p>

          <h1 className="font-display text-[clamp(3rem,9vw,8rem)] font-bold uppercase leading-[0.9] tracking-tight">
            <Line text={t.hero.l1} delay={0.45} immediate className="text-white" />
            <Line text={t.hero.l2} delay={0.58} immediate className="text-grad" />
            <Line text={t.hero.l3} delay={0.71} immediate className="text-stroke-thick" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.8, ease: EASE }}
            className="mt-6 max-w-lg text-sm leading-relaxed text-white/65 md:text-base"
          >
            {t.hero.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8, ease: EASE }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#photography"
              className="inline-flex items-center gap-2 rounded-full bg-grad px-6 py-3 text-xs font-bold uppercase tracking-wider text-black shadow-lg shadow-grape/25 transition hover:shadow-grape/45"
            >
              {t.nav.photography}
              <ArrowDown className="h-4 w-4" />
            </a>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white/85 transition hover:border-grape hover:text-grape"
            >
              {t.contact.cta}
              <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
            </a>
            <span className="ms-1 hidden font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 sm:inline">
              {isRtl ? "" : "— "}
              {site.location[lang]}
            </span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
