import { cn } from "../utils/cn";

/* ------------------------------------------------------------------
   LOGO WATERMARK — the camera/lens mark used as a subtle decorative accent
   behind sections. Very low opacity, rotated, non-interactive.
   Position/size/rotation are controlled per-use via className.
------------------------------------------------------------------- */

export function LogoWatermark({
  className = "",
  rotate = 0,
  opacity = 0.05,
}: {
  className?: string;
  rotate?: number;
  opacity?: number;
}) {
  return (
    <img
      src={new URL("assets/brand/logo-mark.png", window.location.href).href}
      alt=""
      aria-hidden="true"
      draggable={false}
      style={{ transform: `rotate(${rotate}deg)`, opacity }}
      className={cn(
        "pointer-events-none absolute select-none blur-[0.3px] [mask-image:radial-gradient(circle,black,transparent_78%)]",
        className
      )}
    />
  );
}
