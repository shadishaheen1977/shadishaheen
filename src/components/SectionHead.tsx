import { Reveal } from "../lib/motion";
import { SmartImage } from "./SmartImage";

/* ------------------------------------------------------------------
   SectionHead — chapter opener used by every section.
   Kicker "01 — Stills" is split into a big outlined orange number
   + an orange lens-rule label, then the two-tone display title.
   (Optional mascot image still supported via `characters`.)
------------------------------------------------------------------- */

export function SectionHead({
  kicker,
  titleA,
  titleB,
  sub,
  mascot,
}: {
  kicker: string;
  titleA: string;
  titleB: string;
  sub?: string;
  mascot?: string | null;
}) {
  const [num, ...rest] = kicker.split("—");
  const label = rest.join("—").trim();
  const hasNum = !!label;

  return (
    <div className="relative mb-12 md:mb-16">
      {mascot && (
        <SmartImage
          src={mascot}
          alt=""
          className="pointer-events-none absolute -top-10 end-0 z-0 w-24 bg-transparent md:-top-16 md:w-40"
          imgClassName="object-contain mix-blend-screen animate-float [filter:drop-shadow(0_0_40px_rgba(242,138,42,0.35))]"
        />
      )}

      <div className="grid items-end gap-4 md:grid-cols-[auto_1fr] md:gap-10">
        {hasNum && (
          <Reveal>
            <span className="text-stroke-orange font-display block text-[5.5rem] font-bold leading-[0.8] md:text-[9rem]" dir="ltr">
              {num.trim()}
            </span>
          </Reveal>
        )}

        <div className="min-w-0">
          <Reveal delay={0.05}>
            <div className="flex items-center gap-4">
              <span className="font-brand text-[11px] font-semibold uppercase tracking-[0.32em] text-grape">
                {hasNum ? label : kicker}
              </span>
              <span className="lens-rule flex-1 max-w-[260px]" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="display-xl font-display mt-3 font-bold uppercase">
              <span className="text-white">{titleA}</span>{" "}
              <span className="text-grad">{titleB}</span>
            </h2>
          </Reveal>
        </div>
      </div>

      {sub && (
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-2xl border-s-2 border-grape/60 ps-4 text-base leading-relaxed text-white/60 md:text-lg">
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}
