import { useEffect, useState } from "react";
import { assetUrl } from "../utils/assetUrl";

/* ------------------------------------------------------------------
   LOGO — brand mark.
   variant="mark"  → camera + lens symbol only, swaps with the theme
                     used in the navbar and as section watermarks.
   variant="full"  → symbol + wordmark, swaps with the theme:
                       dark theme  → white lettering
                       light theme → dark lettering
                     used beside About and in the Contact footer.
   Replace the files in /assets/brand/ to change the logo.
------------------------------------------------------------------- */

export function Logo({
  variant = "full",
  className = "",
  alt = "Shadi Shaheen — Photography & Videography",
}: {
  variant?: "mark" | "full";
  className?: string;
  alt?: string;
}) {
  const [light, setLight] = useState(
    () => typeof document !== "undefined" && document.documentElement.classList.contains("light")
  );

  useEffect(() => {
    const el = document.documentElement;
    const update = () => setLight(el.classList.contains("light"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  let src: string;
  if (variant === "mark") {
    src = light ? "/assets/brand/logo-mark-dark.png" : "/assets/brand/logo-mark.png";
  } else {
    src = light ? "/assets/brand/logo-full-dark.png" : "/assets/brand/logo-full-white.png";
  }

  return <img src={assetUrl(src)} alt={alt} className={className} draggable={false} />;
}
