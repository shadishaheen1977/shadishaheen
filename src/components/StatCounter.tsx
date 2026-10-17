import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import type { StatItem } from "../data/portfolio";
import { EASE } from "../lib/motion";

/* Animated number that counts up when it enters the viewport. */

export function StatCounter({ stat }: { stat: StatItem }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, stat.value, {
      duration: 1.8,
      ease: EASE,
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, stat.value]);

  return (
    <span ref={ref} className="font-display" dir="ltr">
      {stat.prefix}
      {val.toFixed(stat.decimals ?? 0)}
      {stat.suffix}
    </span>
  );
}
