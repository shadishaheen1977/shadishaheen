import { characters } from "../data/portfolio";
import { useLang } from "../lib/lang";
import { Reveal } from "../lib/motion";
import { SectionHead } from "./SectionHead";
import { Logo } from "./Logo";

/* ------------------------------------------------------------------
   ABOUT — a short professional bio + brand logo. Copy lives in
   `ui.<lang>.about` in the central data file.
------------------------------------------------------------------- */

export function AboutSection() {
  const { t } = useLang();

  return (
    <section id="about" className="relative overflow-hidden py-24 md:py-36">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-[420px] max-w-4xl -translate-y-1/2 rounded-full bg-grape/12 blur-[160px]" />

      <div className="relative mx-auto max-w-[1500px] px-5 md:px-10">
        <SectionHead
          kicker={t.about.kicker}
          titleA={t.about.titleA}
          titleB={t.about.titleB}
          mascot={characters.personal}
        />

        <div className="grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
          <Reveal delay={0.1}>
            <p className="max-w-3xl text-lg leading-relaxed text-white/70 md:text-2xl md:leading-relaxed">
              {t.about.body}
            </p>
          </Reveal>

          {/* brand logo */}
          <Reveal delay={0.2}>
            <div className="relative flex justify-center rounded-md border border-white/10 bg-panel/60 p-8 md:justify-end md:p-10">
              <span className="vf-corner tl !h-6 !w-6 !border-grape" />
              <span className="vf-corner br !h-6 !w-6 !border-grape" />
              <Logo className="w-64 max-w-full md:w-80 lg:w-96" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
