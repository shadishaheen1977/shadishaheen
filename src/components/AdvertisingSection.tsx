import { TrendingUp } from "lucide-react";
import { characters } from "../data/portfolio";
import { useLang } from "../lib/lang";
import { Reveal } from "../lib/motion";
import { SectionHead } from "./SectionHead";
import { SmartImage } from "./SmartImage";

/* ------------------------------------------------------------------
   ADVERTISING — campaign cards with their performance numbers.
------------------------------------------------------------------- */

export function AdvertisingSection() {
  const { t, lang, content } = useLang();
  const media = content.media;

  return (
    <section id="advertising" className="relative mx-auto max-w-[1500px] px-5 py-24 md:px-10 md:py-36">
      <SectionHead
        kicker={t.ads.kicker}
        titleA={t.ads.titleA}
        titleB={t.ads.titleB}
        sub={t.ads.sub}
        mascot={characters.advertising}
      />

      <div className="grid gap-5 md:grid-cols-3 md:gap-6">
        {media.advertising.map((c, i) => (
          <Reveal key={c.title.en} delay={i * 0.1}>
            <article className="group relative overflow-hidden rounded-md border border-white/10 transition-colors duration-300 hover:border-grape/60">
              <SmartImage
                src={c.cover}
                alt={c.title.en}
                className="aspect-[4/5] w-full sm:aspect-[4/3] md:aspect-[3/4]"
                imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-void/35 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-grape px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-black">
                  <TrendingUp className="h-3 w-3" />
                  {t.ads.kicker.split("—")[1]?.trim() ?? "Ads"}
                </span>
                <h3 className="font-display text-xl uppercase leading-tight text-white md:text-2xl">
                  {c.title[lang]}
                </h3>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {c.metrics.map((m) => (
                    <div key={m.label.en} className="rounded-xl border border-white/12 bg-void/50 p-2.5 backdrop-blur-md">
                      <p className="text-[10px] uppercase tracking-wide text-white/45">{m.label[lang]}</p>
                      <p className="mt-0.5 font-display text-base font-bold text-grape md:text-lg" dir="ltr">{m.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
