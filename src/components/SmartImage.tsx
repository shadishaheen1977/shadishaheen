import { useState } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "../utils/cn";
import { assetUrl } from "../utils/assetUrl";

/* ------------------------------------------------------------------
   SmartImage — renders an image from the data file. If the path is
   missing / 404s, it shows a styled placeholder (with the path, so
   you instantly see which file to add) instead of breaking layout.
------------------------------------------------------------------- */

export function SmartImage({
  src,
  alt = "",
  className,
  imgClassName,
  eager = false,
}: {
  src?: string | null;
  alt?: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
}) {
  const [broken, setBroken] = useState(false);

  if (!src || broken) {
    return (
      <div
        className={cn(
          "relative grid place-items-center overflow-hidden bg-panel-2",
          "border border-dashed border-white/15",
          className
        )}
        aria-label={alt || "Missing image"}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-grape/15 via-transparent to-azure/10" />
        <div className="relative flex flex-col items-center gap-2 px-4 text-center">
          <ImageOff className="h-6 w-6 text-white/40" />
          <p className="max-w-[220px] truncate font-mono text-[10px] tracking-wide text-white/40" dir="ltr">
            {src || "no src"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden bg-panel-2", className)}>
      <img
        src={assetUrl(src)}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        draggable={false}
        onError={() => setBroken(true)}
        className={cn("h-full w-full object-cover", imgClassName)}
      />
    </div>
  );
}
