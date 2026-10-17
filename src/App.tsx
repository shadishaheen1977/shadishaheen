import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { LanguageProvider } from "./lib/lang";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Photography } from "./components/Photography";
import { VideoSection } from "./components/VideoSection";
import { AboutSection } from "./components/AboutSection";
import { ContactSection } from "./components/ContactSection";
import { Admin } from "./admin/Admin";

/* ------------------------------------------------------------------
   SHADI SHAHEEN — single-page photography & videography portfolio.
   Scroll-driven composition:
   hero → photography → video → about → contact/end.
   All content (media, characters, copy) lives in src/data/portfolio.ts
------------------------------------------------------------------- */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.3 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[130] h-[3px] origin-left bg-grad rtl:origin-right"
    />
  );
}

function Page() {
  return (
    <div className="noise relative min-h-screen bg-void text-fg transition-colors duration-500">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Photography />
        <VideoSection />
        <AboutSection />
      </main>
      <ContactSection />
    </div>
  );
}

function useHashRoute() {
  const [hash, setHash] = useState(() => (typeof window !== "undefined" ? window.location.hash : ""));
  useEffect(() => {
    const on = () => setHash(window.location.hash);
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return hash;
}

export default function App() {
  const hash = useHashRoute();
  const isAdmin = hash.replace(/^#\/?/, "").toLowerCase().startsWith("admin");

  return (
    <LanguageProvider>
      {isAdmin ? <Admin /> : <Page />}
    </LanguageProvider>
  );
}
