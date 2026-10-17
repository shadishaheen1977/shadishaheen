import { ArrowUpRight, AtSign, Check, Copy, Download, Mail, MapPin, MessageCircle } from "lucide-react";

import { useState } from "react";

import { useLang } from "../lib/lang";
import { Reveal } from "../lib/motion";
import { Logo } from "./Logo";
import { assetUrl } from "../utils/assetUrl";

/* ------------------------------------------------------------------
   CONTACT / END — "You've reached the end. Or the beginning."
   Big CTA rows, socials, location and a résumé download.
------------------------------------------------------------------- */

export function ContactSection() {
  const { t, lang, content } = useLang();
  const [copied, setCopied] = useState(false);
  const site = content.site;
  const year = new Date().getFullYear();

  const socials = [
    { label: "Instagram", href: site.instagram },
    { label: "Behance", href: site.behance },
    { label: "LinkedIn", href: site.linkedin },
  ];

  return (
    <footer id="contact" className="relative overflow-hidden pt-10">
      <div className="relative mx-auto max-w-[1500px] px-5 pb-10 pt-24 md:px-10 md:pt-28">
        {/* glows */}
        <div className="pointer-events-none absolute start-0 top-24 h-80 w-80 rounded-full bg-grape/15 blur-[150px]" />

        <Reveal>
          <Logo className="mb-8 w-52 max-w-full opacity-90 md:w-64" />
        </Reveal>

        <Reveal>
          <p className="max-w-lg text-base leading-relaxed text-white/55 md:text-lg">{t.contact.sub}</p>
        </Reveal>

        <div className="mt-12 grid gap-12 md:grid-cols-[1.3fr_1fr]">
          {/* contact rows */}
          <Reveal delay={0.35}>
            <div className="divide-y divide-white/10 border-y border-white/10">
              <div className="flex flex-col gap-5 py-6 md:py-8">
                <a
                  href={`mailto:${site.email}`}
                  className="group flex items-center justify-between gap-4 transition"
                >
                  <span className="flex min-w-0 items-center gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 transition group-hover:border-transparent group-hover:bg-grad group-hover:text-black">
                      <Mail className="h-4.5 w-4.5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] uppercase tracking-[0.25em] text-white/40">{t.contact.emailLabel}</span>
                      <span className="block truncate font-display text-lg uppercase tracking-wide md:text-2xl" dir="ltr">{site.email}</span>
                    </span>
                  </span>
                  <ArrowUpRight className="h-6 w-6 shrink-0 text-white/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
                </a>
                <div className="flex flex-wrap gap-3 ps-0 md:ps-15">
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(site.email);
                        setCopied(true);
                        window.setTimeout(() => setCopied(false), 1800);
                      } catch {
                        const input = document.createElement("textarea");
                        input.value = site.email;
                        input.style.position = "fixed";
                        input.style.opacity = "0";
                        document.body.appendChild(input);
                        input.select();
                        document.execCommand("copy");
                        input.remove();
                        setCopied(true);
                        window.setTimeout(() => setCopied(false), 1800);
                      }
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white/75 transition hover:border-white/30 hover:bg-white/5 hover:text-white"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? t.contact.copied : t.contact.copyEmail}
                  </button>
                </div>
              </div>

              <a
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 py-6 transition md:py-8"
              >
                <span className="flex items-center gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition group-hover:border-transparent group-hover:bg-grad group-hover:text-black">
                    <MessageCircle className="h-4.5 w-4.5" />
                  </span>
                  <span>
                    <span className="block text-[11px] uppercase tracking-[0.25em] text-white/40">{t.contact.whatsappLabel}</span>
                    <span className="font-display text-lg uppercase tracking-wide md:text-2xl">WhatsApp</span>
                  </span>
                </span>
                <ArrowUpRight className="h-6 w-6 text-white/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
              </a>
            </div>

            {/* résumé + portfolio */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={assetUrl(site.resumeUrl)}
                download
                className="group inline-flex items-center gap-3 rounded-full bg-grad px-7 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-grape/30 transition hover:shadow-grape/50"
              >
                <Download className="h-4.5 w-4.5 transition group-hover:translate-y-0.5" />
                {t.contact.resume}
              </a>
              <a
                href={assetUrl(site.portfolioUrl)}
                download
                className="group inline-flex items-center gap-3 rounded-full border border-white/20 px-7 py-4 text-sm font-bold uppercase tracking-wider text-white/80 transition hover:border-white/40 hover:bg-white/5 hover:text-white"
              >
                <Download className="h-4.5 w-4.5 transition group-hover:translate-y-0.5" />
                {t.contact.portfolio}
              </a>
            </div>
          </Reveal>

          {/* socials + location */}
          <Reveal delay={0.45}>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">{t.contact.follow}</p>
            <div className="mt-4 divide-y divide-white/10 border-y border-white/10">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between py-4 text-white/70 transition hover:text-white"
                >
                  <span className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wider">
                    <AtSign className="h-4 w-4 text-grape-soft" />
                    {s.label}
                  </span>
                  <ArrowUpRight className="h-4.5 w-4.5 text-white/30 transition group-hover:text-white rtl:-scale-x-100" />
                </a>
              ))}
            </div>
            <p className="mt-6 flex items-center gap-2 text-sm text-white/50">
              <MapPin className="h-4 w-4 text-blush" />
              {t.contact.based}: {site.location[lang]}
            </p>
          </Reveal>
        </div>

        {/* bottom bar */}
        <div className="mt-20 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-[11px] uppercase tracking-[0.2em] text-white/35 md:flex-row">
          <span dir="ltr">© {year} {site.name} — {t.contact.rights}</span>
          <span>{t.contact.made}</span>
        </div>
      </div>
    </footer>
  );
}
