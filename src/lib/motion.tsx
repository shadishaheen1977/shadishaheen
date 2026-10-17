import { motion } from "framer-motion";
import type { ReactNode } from "react";

/* Shared cinematic easing + a scroll-in reveal wrapper. */

export const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 44,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* Word-by-word masked headline lines */
export function Line({ text, delay = 0, className, immediate = false }: { text: string; delay?: number; className?: string; immediate?: boolean }) {
  const play = immediate ? { animate: { y: "0%" } } : { whileInView: { y: "0%" }, viewport: { once: true } };
  return (
    <span className="block overflow-hidden pb-[0.08em] -mt-[0.08em]">
      <motion.span
        className={`block ${className ?? ""}`}
        initial={{ y: "115%" }}
        {...play}
        transition={{ duration: 1, ease: EASE, delay }}
      >
        {text}
      </motion.span>
    </span>
  );
}
