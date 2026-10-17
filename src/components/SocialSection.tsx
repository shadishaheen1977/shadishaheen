import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Images } from "lucide-react";
import { characters, type ImgItem } from "../data/portfolio";
import { useLang } from "../lib/lang";
import { EASE, Reveal } from "../lib/motion";
import { SectionHead } from "./SectionHead";
import { SmartImage } from "./SmartImage";
import { StatCounter } from "./StatCounter";
import { Lightbox } from "./Lightbox";
import { LogoWatermark } from "./LogoWatermark";
import { cn } from "../utils/cn";

/* ------------------------------------------------------------------
   SOCIAL — growth stats + a list of client "albums". Each client
   opens like a photo album of their social-media designs, with a
   high-res lightbox. Data lives in `media.social.clients`.
------------------------------------------------------------------- */

export function SocialSection() {
  const { t, lang, content } = useLang();
  const media = content.media;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const clients = media.social.clients;
  const openClient = openIndex !== null ? clients[openIndex] : null;
  const albumItems: ImgItem[] = openClient ? openClient.designs : [];

  return (
    <section id="social" className="relative mx-auto max-w-[1500px] overflow-hidden px-5 py-24 md:px-10 md:py-36">
      <LogoWatermark className="-end-24 top-1/3 w-[400px] md:w-[560px]" rotate={-20} opacity={0.04} />
      <SectionHead
        kicker={t.social.kicker}
        titleA={t.social.titleA}
        titleB={t.social.titleB}
        sub={t.social.sub}
        mascot={characters.social}
      />

      {/* growth stats */}
      <div className="mb-14 grid grid-cols-2 gap-4 md:grid-cols-4">
        {media.social.stats.map((s, i) => (
          <Reveal key={s.label.en} delay={i * 0.08}>
            <div className="glass group relative overflow-hidden rounded-md border-t-2 !border-t-grape p-5 transition-colors duration-300 hover:border-grape/50 md:p-7">
              <div className="absolute -end-8 -top-8 h-24 w-24 rounded-full bg-grape/15 blur-2xl transition group-hover:bg-blush/25" />
              <p className="text-grad font-display text-5xl font-bold md:text-6xl">
                <StatCounter stat={s} />
              </p>
              <p className="mt-3 text-xs leading-snug text-white/55 md:text-sm">{s.label[lang]}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* clients header */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/45">
          {t.social.clientsTitle}
        </span>
        <span className="hidden text-xs text-white/40 sm:block">{t.social.pickHint}</span>
      </div>

      {/* client albums */}
      <div className="space-y-4">
        {clients.map((client, i) => {
          const isOpen = openIndex === i;
          return (
            <Reveal key={client.name.en} delay={Math.min(i * 0.05, 0.3)}>
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-panel/40">
                {/* client row (click to toggle album) */}
                <button
                  onClick={() => { setOpenIndex(isOpen ? null : i); setLightbox(null); }}
                  className="group flex w-full items-center gap-4 p-3 text-start transition hover:bg-white/[0.03] md:p-4"
                >
                  {/* cover thumbnail */}
                  <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-white/10 md:h-20 md:w-20">
                    <SmartImage
                      src={client.cover}
                      alt={client.name[lang]}
                      className="h-full w-full"
                      imgClassName="transition-transform duration-500 group-hover:scale-110"
                    />
                  </span>

                  {/* name + count */}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-display text-lg uppercase tracking-wide md:text-2xl">
                      {client.name[lang]}
                    </span>
                    <span className="mt-0.5 flex items-center gap-1.5 text-xs text-white/45">
                      <Images className="h-3.5 w-3.5" />
                      {client.designs.length} {t.social.designsLabel}
                    </span>
                  </span>

                  {/* view all / chevron */}
                  <span className="flex items-center gap-2">
                    <span className="hidden rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/70 transition group-hover:border-transparent group-hover:bg-grad group-hover:text-black sm:inline-block">
                      {isOpen ? t.social.viewLess : t.social.viewAll}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 shrink-0 text-white/40 transition-transform duration-300",
                        isOpen && "rotate-180 text-white"
                      )}
                    />
                  </span>
                </button>

                {/* album (opens like a photo album) */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-2 gap-3 border-t border-white/8 p-3 sm:grid-cols-3 md:grid-cols-4 md:p-4">
                        {client.designs.map((d, di) => (
                          <button
                            key={d.src}
                            onClick={() => setLightbox(di)}
                            className="group relative block overflow-hidden rounded-xl border border-white/8"
                          >
                            <SmartImage
                              src={d.src}
                              alt={d.alt}
                              className="aspect-square w-full"
                              imgClassName="transition-transform duration-500 group-hover:scale-105"
                            />
                            <span className="absolute inset-0 bg-void/0 transition group-hover:bg-void/20" />
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Lightbox items={albumItems} index={lightbox} onClose={() => setLightbox(null)} onNavigate={setLightbox} />
    </section>
  );
}
