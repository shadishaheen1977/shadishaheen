
import { useLang } from "../lib/lang";
import { Reveal } from "../lib/motion";
import { SectionHead } from "./SectionHead";
import { SmartImage } from "./SmartImage";
import { LogoWatermark } from "./LogoWatermark";

/* ------------------------------------------------------------------
   OUR CLIENTS — a tidy grid of client logos.
   Logos come from `media.clientLogos` in the data file; drop your
   files in /assets/clients/ and update the paths there.
------------------------------------------------------------------- */

export function ClientsSection() {
  const { t, content } = useLang();
  const media = content.media;

  return (
    <section id="clients" className="relative mx-auto max-w-[1500px] overflow-hidden px-5 py-24 md:px-10 md:py-32">
      <LogoWatermark className="-start-16 -bottom-12 w-[300px] md:w-[420px]" rotate={10} opacity={0.05} />
      <SectionHead
        kicker={t.clients.kicker}
        titleA={t.clients.titleA}
        titleB={t.clients.titleB}
        sub={t.clients.sub}
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {media.clientLogos.map((c, i) => (
          <Reveal key={c.name} delay={Math.min(i * 0.05, 0.4)}>
            <div className="group flex h-28 items-center justify-center rounded-2xl border border-white/10 bg-panel/40 p-6 transition-colors duration-300 hover:border-grape/40 md:h-32">
              <SmartImage
                src={c.src}
                alt={c.name}
                className="h-full w-full bg-transparent"
                imgClassName="object-contain opacity-70 transition duration-300 group-hover:opacity-100"
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
