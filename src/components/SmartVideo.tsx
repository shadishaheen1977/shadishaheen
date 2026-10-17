import { useState } from "react";
import { Clapperboard } from "lucide-react";
import { cn } from "../utils/cn";
import { assetUrl } from "../utils/assetUrl";

/* ------------------------------------------------------------------
   SmartVideo — looping background/inline video from the data file.
   Falls back to a poster image, then to a styled placeholder box.
------------------------------------------------------------------- */

export function SmartVideo({
  src,
  poster,
  className,
  autoPlay = true,
  controls = false,
}: {
  src?: string | null;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  controls?: boolean;
}) {
  const [broken, setBroken] = useState(false);

  // video can't play (missing file / unsupported codec) → show the poster still
  if ((!src || broken) && poster) {
    return <img src={assetUrl(poster)} alt="" draggable={false} className={cn("h-full w-full object-cover", className)} />;
  }

  if (!src || broken) {
    return (
      <div
        className={cn(
          "relative grid place-items-center overflow-hidden border border-dashed border-white/15 bg-panel-2",
          className
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-grape/15 via-transparent to-azure/10" />
        <div className="relative flex flex-col items-center gap-2 px-4 text-center">
          <Clapperboard className="h-6 w-6 text-white/40" />
          <p className="max-w-[240px] truncate font-mono text-[10px] text-white/40" dir="ltr">
            {src || "no src"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <video
      className={cn("h-full w-full object-cover", className)}
      src={assetUrl(src)}
      poster={assetUrl(poster)}
      autoPlay={autoPlay}
      muted
      loop
      playsInline
      preload={autoPlay ? "metadata" : "none"}
      controls={controls}
      onError={() => setBroken(true)}
    />
  );
}
