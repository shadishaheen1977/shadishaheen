import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";

import { useLang } from "../lib/lang";
import { EASE } from "../lib/motion";
import { cn } from "../utils/cn";
import { Logo } from "./Logo";

/* ------------------------------------------------------------------
   Fixed navigation — glass on scroll, EN/ع toggle, full-screen
   staggered menu on mobile.
------------------------------------------------------------------- */

const LINKS: { key: string; href: string }[] = [
  { key: "photography", href: "#photography" },
  { key: "video", href: "#video" },
  { key: "about", href: "#about" },
  { key: "contact", href: "#contact" },
];

export function Navbar() {
  const { lang, setLang, t, content } = useLang();
  const site = content.site;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") return "dark";
    return (localStorage.getItem("theme") as "dark" | "light") || "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
        className={cn(
          "fixed inset-x-0 top-0 z-[100] transition-all duration-500",
          scrolled ? "border-b border-white/8 bg-void/70 backdrop-blur-xl" : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-5 md:h-20 md:px-10">
          {/* logo */}
          <a href="#top" className="group flex items-center gap-2.5" aria-label={site.name}>
            <Logo variant="mark" className="h-8 w-auto md:h-9" />
            <span className="flex flex-col leading-none" dir="ltr">
              <span className="whitespace-nowrap font-brand text-[11px] font-semibold uppercase tracking-[0.14em] text-fg sm:text-[13px] sm:tracking-[0.18em] md:text-sm">
                Shadi <span className="text-grape">Shaheen</span>
              </span>
              <span className="mt-1 hidden font-script text-[13px] text-ash sm:block md:text-sm">Photography &amp; Videography</span>
            </span>
          </a>

          {/* desktop links */}
          <nav className="hidden items-center gap-6 xl:flex">
            {LINKS.map((l) => (
              <a
                key={l.key}
                href={l.href}
                className="relative text-[13px] font-medium text-white/60 transition hover:text-grape after:absolute after:-bottom-1.5 after:start-0 after:h-px after:w-0 after:bg-grape after:transition-all hover:after:w-full"
              >
                {(t.nav as Record<string, string>)[l.key]}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            {/* theme toggle */}
            <button
              onClick={() => setTheme((th) => (th === "dark" ? "light" : "dark"))}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              className="grid h-9 w-9 place-items-center rounded-full border border-line text-fg/70 transition hover:border-fg/40 hover:text-fg"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* language toggle */}
            <div className="flex overflow-hidden rounded-full border border-line text-xs font-semibold">
              <button
                onClick={() => setLang("en")}
                className={cn("px-3 py-1.5 transition", lang === "en" ? "bg-grad text-black" : "text-fg/50 hover:text-fg")}
              >
                EN
              </button>
              <button
                onClick={() => setLang("ar")}
                className={cn("px-3 py-1.5 transition", lang === "ar" ? "bg-grad text-black" : "text-fg/50 hover:text-fg")}
              >
                ع
              </button>
            </div>

            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-1.5 rounded-full bg-grad px-4 py-2 text-xs font-bold text-black transition hover:opacity-90 md:inline-flex"
            >
              {t.contact.cta}
              <ArrowUpRight className="h-3.5 w-3.5 rtl:-scale-x-100" />
            </a>

            {/* mobile burger */}
            <button
              onClick={() => setOpen(true)}
              aria-label={t.nav.menu}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white xl:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[110] flex flex-col bg-void/95 backdrop-blur-2xl"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <div className="flex h-16 items-center justify-between px-5">
              <div className="flex items-center gap-2.5">
                <Logo variant="mark" className="h-8 w-auto" />
                <span className="font-brand text-[13px] font-semibold uppercase leading-none tracking-[0.18em] text-fg" dir="ltr">
                  Shadi <span className="text-grape">Shaheen</span>
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label={t.nav.close}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-1 px-8">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.key}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.12 + i * 0.05, duration: 0.6, ease: EASE }}
                  className="group flex items-center justify-between border-b border-white/8 py-3"
                >
                  <span className="font-display text-4xl uppercase text-white/85 transition group-hover:text-grad sm:text-5xl">
                    {(t.nav as Record<string, string>)[l.key]}
                  </span>
                  <ArrowUpRight className="h-6 w-6 text-white/30 transition group-hover:text-white rtl:-scale-x-100" />
                </motion.a>
              ))}
            </nav>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="px-8 pb-10 font-mono text-xs uppercase tracking-[0.3em] text-white/40"
            >
              {t.nav.slogan}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
