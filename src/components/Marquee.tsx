import { Aperture } from "lucide-react";
import { useLang } from "../lib/lang";

/* ------------------------------------------------------------------
   MARQUEE — orange ribbon of services between the hero and the
   first section. Words come from `ui.<lang>.marquee` in the data file.
------------------------------------------------------------------- */

export function Marquee() {
  const { t } = useLang();
  const words = [...t.marquee, ...t.marquee, ...t.marquee];

  return (
    <div className="relative z-10 -rotate-[1.2deg] overflow-hidden border-y border-black/20 bg-grad py-3.5 md:py-4" dir="ltr" aria-hidden>
      <div className="flex w-max animate-marquee items-center">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {words.map((w, i) => (
              <span key={`${k}-${i}`} className="flex items-center">
                <span className="px-6 font-display text-2xl font-bold uppercase tracking-wide text-black md:text-4xl">{w}</span>
                <Aperture className="h-5 w-5 text-black/70 md:h-6 md:w-6" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
