import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { type Lang } from "../data/portfolio";
import { getContent } from "./content";

/* ------------------------------------------------------------------
   Language + live-content context.
   Holds the active locale (flips <html dir> ltr/rtl) AND the merged
   content from the store, so the /admin page can preview edits live.
------------------------------------------------------------------- */

type Content = ReturnType<typeof getContent>;

type LangState = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Content["ui"]["en"];   // bilingual UI copy for the active language
  isRtl: boolean;
  content: Content;          // full live content (site + media + ui)
};

const LangContext = createContext<LangState>(null as unknown as LangState);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [content, setContent] = useState<Content>(() => getContent());
  const isRtl = lang === "ar";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
  }, [lang, isRtl]);

  // re-read content whenever the admin saves an edit
  useEffect(() => {
    const refresh = () => setContent(getContent());
    window.addEventListener("shadi-content-changed", refresh);
    window.addEventListener("storage", refresh); // sync across tabs
    return () => {
      window.removeEventListener("shadi-content-changed", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang, t: content.ui[lang], isRtl, content }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

/* convenience: live media + site */
export function useContent() {
  return useContext(LangContext).content;
}
