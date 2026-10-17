import { useState } from "react";
import {
  Download, RotateCcw, Save, Plus, Trash2, Eye, Image as ImageIcon,
  Film, Users, Layout, Type, Link2, LogOut, Lock, Upload,
} from "lucide-react";
import { baseMedia, baseSite, baseUi, loadOverrides, saveOverrides, resetOverrides, type Overrides } from "../lib/content";
import { buildPortfolioTs } from "./exporter";
import { cn } from "../utils/cn";

/* ------------------------------------------------------------------
   ADMIN — a no-server content editor. Edits live in localStorage and
   preview instantly on the site. "Export" downloads a fresh
   portfolio.ts to make changes permanent for everyone.
------------------------------------------------------------------- */

const PASS_KEY = "shadi-admin-ok";
const PASSWORD = "shadi"; // ← change this password in src/admin/Admin.tsx

type Tab = "site" | "hero" | "photography" | "video" | "social" | "logos" | "ads" | "text";

const TABS: { id: Tab; label: string; icon: any }[] = [
  { id: "site", label: "Contact & Links", icon: Link2 },
  { id: "hero", label: "Hero Video", icon: Film },
  { id: "photography", label: "Photography", icon: ImageIcon },
  { id: "video", label: "Videos", icon: Film },
  { id: "social", label: "Social / Clients", icon: Users },
  { id: "logos", label: "Client Logos", icon: Layout },
  { id: "ads", label: "Ad Campaigns", icon: ImageIcon },
  { id: "text", label: "About Text", icon: Type },
];

const clone = <T,>(x: T): T => JSON.parse(JSON.stringify(x));

export function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(PASS_KEY) === "1");
  const [tab, setTab] = useState<Tab>("site");
  const [ov, setOv] = useState<Overrides>(() => loadOverrides());
  const [dirty, setDirty] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

  const site = { ...baseSite, ...(ov.site || {}) };
  const hero = { ...baseMedia.hero, ...(ov.media?.hero || {}) };
  const photography = ov.media?.photography || clone(baseMedia.photography);
  const video = ov.media?.video || clone(baseMedia.video);
  const social = ov.media?.social?.clients || clone(baseMedia.social.clients);
  const logos = ov.media?.clientLogos || clone(baseMedia.clientLogos);
  const ads = ov.media?.advertising || clone(baseMedia.advertising);
  const aboutEn = ov.ui?.en?.about?.body ?? baseUi.en.about.body;
  const aboutAr = ov.ui?.ar?.about?.body ?? baseUi.ar.about.body;

  function patch(next: Overrides) {
    setOv(next);
    setDirty(true);
  }
  function persist() {
    saveOverrides(ov);
    setDirty(false);
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1500);
  }
  function doReset() {
    if (!confirm("Reset ALL edits back to the original content? This cannot be undone.")) return;
    resetOverrides();
    setOv({});
    setDirty(false);
  }
  function doExport() {
    const ts = buildPortfolioTs(ov);
    const blob = new Blob([ts], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio.ts";
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!authed) {
    return (
      <div className="grid min-h-screen place-items-center bg-void text-fg">
        <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-panel/60 p-8">
          <div className="mb-6 flex items-center gap-2 text-grad">
            <Lock className="h-5 w-5" />
            <span className="font-display text-2xl uppercase">Admin</span>
          </div>
          <PasswordForm onOk={() => { sessionStorage.setItem(PASS_KEY, "1"); setAuthed(true); }} />
          <a href="#" className="mt-6 block text-center text-xs text-white/40 hover:text-white">← Back to site</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-void text-fg">
      <header className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-void/90 px-5 py-3 backdrop-blur">
        <div className="flex items-center gap-2">
          <img src="/assets/brand/logo-mark.png" alt="" className="h-7 w-auto" /><span className="font-brand text-sm font-semibold uppercase tracking-[0.18em] text-fg">Shadi <span className="text-grape">Shaheen</span></span>
          <span className="rounded-full border border-white/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/50">Admin</span>
        </div>
        <div className="flex items-center gap-2">
          {dirty && <span className="text-xs text-amber-400">Unsaved</span>}
          {savedFlash && <span className="text-xs text-emerald-400">Saved ✓</span>}
          <a href="#" className="flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs hover:border-white/40" title="Open the live site">
            <Eye className="h-3.5 w-3.5" /> View site
          </a>
          <button onClick={persist} className="flex items-center gap-1.5 rounded-full bg-grad px-4 py-1.5 text-xs font-semibold text-white">
            <Save className="h-3.5 w-3.5" /> Save &amp; preview
          </button>
          <button onClick={doExport} className="flex items-center gap-1.5 rounded-full border border-emerald-400/40 px-4 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-400/10" title="Download portfolio.ts to make changes permanent">
            <Download className="h-3.5 w-3.5" /> Export
          </button>
          <button onClick={doReset} className="flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/60 hover:border-red-400/50 hover:text-red-300">
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </button>
          <button onClick={() => { sessionStorage.removeItem(PASS_KEY); setAuthed(false); }} className="grid h-8 w-8 place-items-center rounded-full border border-white/15 text-white/60 hover:text-white" title="Log out">
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl flex-col gap-6 p-5 md:flex-row">
        <nav className="top-[64px] h-fit w-full shrink-0 space-y-1 md:sticky md:w-56">
          {TABS.map((tb) => (
            <button
              key={tb.id}
              onClick={() => setTab(tb.id)}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition",
                tab === tb.id ? "bg-grad text-black" : "text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              <tb.icon className="h-4 w-4" /> {tb.label}
            </button>
          ))}
          <p className="px-3 pt-4 text-[11px] leading-relaxed text-white/35">
            Edits save to this browser and preview live. Press <b className="text-white/60">Export</b> to download an updated <code>portfolio.ts</code> and make them permanent for everyone.
          </p>
        </nav>

        <main className="min-w-0 flex-1 space-y-6 pb-24">
          {tab === "site" && <SitePanel site={site} onChange={(s) => patch({ ...ov, site: s })} />}
          {tab === "hero" && <HeroPanel hero={hero} onChange={(h) => patch({ ...ov, media: { ...ov.media, hero: h } })} />}
          {tab === "photography" && <PhotoPanel data={photography} onChange={(d) => patch({ ...ov, media: { ...ov.media, photography: d } })} />}
          {tab === "video" && <VideoPanel data={video} onChange={(d) => patch({ ...ov, media: { ...ov.media, video: d } })} />}
          {tab === "social" && <SocialPanel data={social} onChange={(d) => patch({ ...ov, media: { ...ov.media, social: { ...ov.media?.social, clients: d } } })} />}
          {tab === "logos" && <LogosPanel data={logos} onChange={(d) => patch({ ...ov, media: { ...ov.media, clientLogos: d } })} />}
          {tab === "ads" && <AdsPanel data={ads} onChange={(d) => patch({ ...ov, media: { ...ov.media, advertising: d } })} />}
          {tab === "text" && (
            <TextPanel
              en={aboutEn} ar={aboutAr}
              onChange={(en, ar) => patch({
                ...ov,
                ui: {
                  ...ov.ui,
                  en: { ...ov.ui?.en, about: { ...(ov.ui?.en?.about || {}), body: en } },
                  ar: { ...ov.ui?.ar, about: { ...(ov.ui?.ar?.about || {}), body: ar } },
                },
              })}
            />
          )}
        </main>
      </div>
    </div>
  );
}

/* ---------------- shared field bits ---------------- */
function Field({ label, value, onChange, placeholder, mono }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; mono?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs uppercase tracking-wider text-white/45">{label}</span>
      <input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)}
        className={cn("w-full rounded-lg border border-white/12 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-grape/60", mono && "font-mono text-xs")} />
    </label>
  );
}
function Area({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs uppercase tracking-wider text-white/45">{label}</span>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={5}
        className="w-full rounded-lg border border-white/12 bg-white/5 px-3 py-2 text-sm leading-relaxed text-white outline-none focus:border-grape/60" />
    </label>
  );
}
function Card({ title, children, onRemove }: { title: string; children: any; onRemove?: () => void }) {
  return (
    <div className="rounded-xl border border-white/10 bg-panel/40 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-white/80">{title}</h4>
        {onRemove && (
          <button onClick={onRemove} className="grid h-7 w-7 place-items-center rounded-lg border border-white/12 text-white/50 hover:border-red-400/50 hover:text-red-300">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
      {children}
    </div>
  );
}
function Thumb({ src }: { src: string }) {
  if (!src) return null;
  return <img src={src} alt="" className="mb-2 h-24 w-full rounded-lg border border-white/10 object-cover" onError={(e) => ((e.target as HTMLImageElement).style.opacity = "0.2")} />;
}

/* Image input with: live preview + URL field + "upload from device".
   Uploaded files are read as data URLs (base64) so they preview and
   export without any server. Keep images reasonably sized. */
function ImageField({ label, value, onChange }: { label?: string; value: string; onChange: (v: string) => void }) {
  const [busy, setBusy] = useState(false);
  function pick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { alert("Please choose an image file."); return; }
    if (file.size > 3 * 1024 * 1024) {
      if (!confirm("This image is larger than 3MB. Big images slow the editor and bloat the export. Use it anyway?")) return;
    }
    setBusy(true);
    const reader = new FileReader();
    reader.onload = () => { onChange(String(reader.result)); setBusy(false); };
    reader.onerror = () => { alert("Could not read that file."); setBusy(false); };
    reader.readAsDataURL(file);
    e.target.value = "";
  }
  return (
    <div>
      <Thumb src={value} />
      <Field label={label || "Image URL"} value={value.startsWith("data:") ? "(uploaded from device)" : value} onChange={onChange} mono />
      <label className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/12 bg-white/5 py-2 text-xs text-white/70 transition hover:border-grape/50 hover:text-white">
        <Upload className="h-3.5 w-3.5" />
        {busy ? "Reading…" : "Upload from device"}
        <input type="file" accept="image/*" className="hidden" onChange={pick} />
      </label>
    </div>
  );
}

function PanelHead({ title, hint }: { title: string; hint: string }) {
  return (
    <div>
      <h2 className="font-display text-2xl uppercase text-fg">{title}</h2>
      <p className="mt-1 text-sm text-white/45">{hint}</p>
    </div>
  );
}

/* ---------------- SITE ---------------- */
function SitePanel({ site, onChange }: { site: any; onChange: (s: any) => void }) {
  const set = (k: string, v: any) => onChange({ ...site, [k]: v });
  return (
    <>
      <PanelHead title="Contact & Links" hint="Your email, WhatsApp and social links." />
      <Card title="Details">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Email" value={site.email} onChange={(v) => set("email", v)} />
          <Field label="WhatsApp link" value={site.whatsapp} onChange={(v) => set("whatsapp", v)} placeholder="https://wa.me/9715..." />
          <Field label="Instagram" value={site.instagram} onChange={(v) => set("instagram", v)} />
          <Field label="Behance" value={site.behance} onChange={(v) => set("behance", v)} />
          <Field label="LinkedIn" value={site.linkedin} onChange={(v) => set("linkedin", v)} />
          <Field label="Résumé URL" value={site.resumeUrl} onChange={(v) => set("resumeUrl", v)} />
          <Field label="Portfolio URL" value={site.portfolioUrl} onChange={(v) => set("portfolioUrl", v)} />
          <Field label="Location (EN)" value={site.location.en} onChange={(v) => set("location", { ...site.location, en: v })} />
          <Field label="Location (AR)" value={site.location.ar} onChange={(v) => set("location", { ...site.location, ar: v })} />
        </div>
      </Card>
    </>
  );
}

/* ---------------- HERO ---------------- */
function HeroPanel({ hero, onChange }: { hero: any; onChange: (h: any) => void }) {
  const set = (k: string, v: string) => onChange({ ...hero, [k]: v });
  return (
    <>
      <PanelHead title="Hero Video" hint="The full-screen background video at the very top." />
      <Card title="Sources">
        <Field label="Desktop video URL / path" value={hero.desktopVideo} onChange={(v) => set("desktopVideo", v)} mono />
        <div className="h-3" />
        <Field label="Mobile video URL / path" value={hero.mobileVideo} onChange={(v) => set("mobileVideo", v)} mono />
        <div className="h-4" />
        <ImageField label="Poster image" value={hero.poster} onChange={(v) => set("poster", v)} />
        <p className="mt-3 text-xs text-white/40">Videos are referenced by path (they're too big to embed). Put your file in <code>public/assets/hero/</code> and set the path to <code>/assets/hero/yourfile.mp4</code>. The poster image can be uploaded directly.</p>
      </Card>
    </>
  );
}

/* ---------------- PHOTOGRAPHY ---------------- */
function PhotoPanel({ data, onChange }: { data: Record<string, { src: string; alt?: string }[]>; onChange: (d: any) => void }) {
  const cats = Object.keys(data);
  const [cat, setCat] = useState(cats[0]);
  const list = data[cat] || [];
  const setList = (l: any[]) => onChange({ ...data, [cat]: l });
  return (
    <>
      <PanelHead title="Photography" hint="Images per category. Paste an image URL or a /assets/... path." />
      <div className="flex flex-wrap gap-2">
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={cn("rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider", cat === c ? "border-transparent bg-grad text-black" : "border-white/15 text-white/55 hover:text-white")}>{c}</button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((img, i) => (
          <Card key={i} title={`#${i + 1}`} onRemove={() => setList(list.filter((_, j) => j !== i))}>
            <ImageField value={img.src} onChange={(v) => setList(list.map((x, j) => j === i ? { ...x, src: v } : x))} />
            <div className="h-2" />
            <Field label="Alt text" value={img.alt || ""} onChange={(v) => setList(list.map((x, j) => j === i ? { ...x, alt: v } : x))} />
          </Card>
        ))}
        <button onClick={() => setList([...list, { src: "", alt: "" }])} className="flex min-h-[120px] items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 text-sm text-white/50 hover:border-grape/50 hover:text-white">
          <Plus className="h-4 w-4" /> Add image
        </button>
      </div>
    </>
  );
}

/* ---------------- VIDEO ---------------- */
function VideoPanel({ data, onChange }: { data: any[]; onChange: (d: any[]) => void }) {
  const CATS = ["products", "restaurants", "medical", "cars", "realestate", "acting"];
  const upd = (i: number, p: any) => onChange(data.map((v, j) => j === i ? { ...v, ...p } : v));
  return (
    <>
      <PanelHead title="Videos" hint="Vertical (9:16) clips grouped by category." />
      <div className="grid gap-4 sm:grid-cols-2">
        {data.map((v, i) => (
          <Card key={i} title={v.title?.en || "Video"} onRemove={() => onChange(data.filter((_, j) => j !== i))}>
            <div className="space-y-2">
              <label className="block">
                <span className="mb-1 block text-xs uppercase tracking-wider text-white/45">Category</span>
                <select value={v.cat} onChange={(e) => upd(i, { cat: e.target.value })} className="w-full rounded-lg border border-white/12 bg-white/5 px-3 py-2 text-sm text-white outline-none">
                  {CATS.map((c) => <option key={c} value={c} className="bg-void">{c}</option>)}
                </select>
              </label>
              <Field label="Video URL / path" value={v.src || ""} onChange={(val) => upd(i, { src: val })} mono />
              <ImageField label="Poster image" value={v.poster || ""} onChange={(val) => upd(i, { poster: val })} />
              <Field label="Title (EN)" value={v.title?.en || ""} onChange={(val) => upd(i, { title: { ...v.title, en: val } })} />
              <Field label="Title (AR)" value={v.title?.ar || ""} onChange={(val) => upd(i, { title: { ...v.title, ar: val } })} />
              <Field label="Duration" value={v.duration || ""} onChange={(val) => upd(i, { duration: val })} />
            </div>
          </Card>
        ))}
        <button onClick={() => onChange([...data, { type: "video", cat: "products", src: "", poster: "", title: { en: "New video", ar: "فيديو جديد" }, duration: "00:30" }])} className="flex min-h-[120px] items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 text-sm text-white/50 hover:border-grape/50 hover:text-white">
          <Plus className="h-4 w-4" /> Add video
        </button>
      </div>
    </>
  );
}

/* ---------------- SOCIAL / CLIENTS ---------------- */
function SocialPanel({ data, onChange }: { data: any[]; onChange: (d: any[]) => void }) {
  const updClient = (i: number, p: any) => onChange(data.map((c, j) => j === i ? { ...c, ...p } : c));
  return (
    <>
      <PanelHead title="Social / Clients" hint="Each client opens as a design album on the site." />
      <div className="space-y-4">
        {data.map((c, i) => (
          <Card key={i} title={c.name?.en || "Client"} onRemove={() => onChange(data.filter((_, j) => j !== i))}>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Name (EN)" value={c.name?.en || ""} onChange={(v) => updClient(i, { name: { ...c.name, en: v } })} />
              <Field label="Name (AR)" value={c.name?.ar || ""} onChange={(v) => updClient(i, { name: { ...c.name, ar: v } })} />
            </div>
            <div className="mt-3">
              <ImageField label="Cover image" value={c.cover || ""} onChange={(v) => updClient(i, { cover: v })} />
            </div>
            <div className="mt-4">
              <span className="mb-2 block text-xs uppercase tracking-wider text-white/45">Designs</span>
              <div className="grid gap-3 sm:grid-cols-3">
                {(c.designs || []).map((d: any, di: number) => (
                  <div key={di} className="rounded-lg border border-white/10 p-2">
                    <ImageField value={d.src} onChange={(v) => updClient(i, { designs: c.designs.map((x: any, j: number) => j === di ? { ...x, src: v } : x) })} />
                    <button onClick={() => updClient(i, { designs: c.designs.filter((_: any, j: number) => j !== di) })} className="mt-2 flex w-full items-center justify-center gap-1 rounded-lg border border-white/10 py-1 text-xs text-white/50 hover:text-red-300"><Trash2 className="h-3 w-3" /> Remove</button>
                  </div>
                ))}
                <button onClick={() => updClient(i, { designs: [...(c.designs || []), { src: "", alt: "" }] })} className="flex min-h-[100px] items-center justify-center gap-1.5 rounded-lg border border-dashed border-white/20 text-xs text-white/50 hover:border-grape/50 hover:text-white"><Plus className="h-3.5 w-3.5" /> Add design</button>
              </div>
            </div>
          </Card>
        ))}
        <button onClick={() => onChange([...data, { name: { en: "New Client", ar: "عميل جديد" }, cover: "", designs: [] }])} className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 py-4 text-sm text-white/50 hover:border-grape/50 hover:text-white">
          <Plus className="h-4 w-4" /> Add client
        </button>
      </div>
    </>
  );
}

/* ---------------- LOGOS ---------------- */
function LogosPanel({ data, onChange }: { data: any[]; onChange: (d: any[]) => void }) {
  return (
    <>
      <PanelHead title="Client Logos" hint="Shown in the 'Our Clients' strip. Transparent PNG/SVG works best." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((l, i) => (
          <Card key={i} title={l.name || `Logo ${i + 1}`} onRemove={() => onChange(data.filter((_, j) => j !== i))}>
            <ImageField label="Logo image" value={l.src || ""} onChange={(v) => onChange(data.map((x, j) => j === i ? { ...x, src: v } : x))} />
            <div className="h-2" />
            <Field label="Name" value={l.name || ""} onChange={(v) => onChange(data.map((x, j) => j === i ? { ...x, name: v } : x))} />
          </Card>
        ))}
        <button onClick={() => onChange([...data, { name: "New client", src: "" }])} className="flex min-h-[120px] items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 text-sm text-white/50 hover:border-grape/50 hover:text-white">
          <Plus className="h-4 w-4" /> Add logo
        </button>
      </div>
    </>
  );
}

/* ---------------- ADS ---------------- */
function AdsPanel({ data, onChange }: { data: any[]; onChange: (d: any[]) => void }) {
  const upd = (i: number, p: any) => onChange(data.map((a, j) => j === i ? { ...a, ...p } : a));

  const setTitle = (i: number, key: "en" | "ar", v: string) =>
    upd(i, { title: { ...(data[i].title || { en: "", ar: "" }), [key]: v } });

  const setMetric = (i: number, mi: number, patch: any) => {
    const metrics = (data[i].metrics || []).map((m: any, k: number) => (k === mi ? { ...m, ...patch } : m));
    upd(i, { metrics });
  };
  const setMetricLabel = (i: number, mi: number, key: "en" | "ar", v: string) => {
    const m = data[i].metrics[mi];
    setMetric(i, mi, { label: { ...(m.label || { en: "", ar: "" }), [key]: v } });
  };
  const addMetric = (i: number) =>
    upd(i, { metrics: [...(data[i].metrics || []), { label: { en: "", ar: "" }, value: "0" }] });
  const removeMetric = (i: number, mi: number) =>
    upd(i, { metrics: (data[i].metrics || []).filter((_: any, k: number) => k !== mi) });

  return (
    <>
      <PanelHead title="Ad Campaigns" hint="Campaign image, title and the performance numbers shown on each card." />
      <div className="space-y-4">
        {data.map((a, i) => (
          <Card key={i} title={a.title?.en || a.alt || `Campaign ${i + 1}`} onRemove={() => onChange(data.filter((_, j) => j !== i))}>
            <ImageField value={a.cover || a.src || ""} onChange={(v) => upd(i, { cover: v })} />
            <div className="h-3" />
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Title (EN)" value={a.title?.en || ""} onChange={(v) => setTitle(i, "en", v)} />
              <Field label="Title (AR)" value={a.title?.ar || ""} onChange={(v) => setTitle(i, "ar", v)} />
            </div>

            <p className="mt-4 mb-2 text-[11px] uppercase tracking-wider text-white/40">Numbers</p>
            <div className="space-y-2">
              {(a.metrics || []).map((m: any, mi: number) => (
                <div key={mi} className="grid items-end gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-2.5 sm:grid-cols-[1fr_1fr_1fr_auto]">
                  <Field label="Label (EN)" value={m.label?.en || ""} onChange={(v) => setMetricLabel(i, mi, "en", v)} />
                  <Field label="Label (AR)" value={m.label?.ar || ""} onChange={(v) => setMetricLabel(i, mi, "ar", v)} />
                  <Field label="Value" value={m.value ?? ""} onChange={(v) => setMetric(i, mi, { value: v })} placeholder="0" />
                  <button
                    onClick={() => removeMetric(i, mi)}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 text-white/50 hover:border-red-400/50 hover:text-red-300"
                    title="Remove number"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addMetric(i)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-white/20 px-3 py-1.5 text-xs text-white/50 hover:border-grape/50 hover:text-white"
              >
                <Plus className="h-3.5 w-3.5" /> Add number
              </button>
            </div>
          </Card>
        ))}
        <button
          onClick={() => onChange([...data, { cover: "", title: { en: "", ar: "" }, metrics: [{ label: { en: "", ar: "" }, value: "0" }] }])}
          className="flex min-h-[80px] w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 text-sm text-white/50 hover:border-grape/50 hover:text-white"
        >
          <Plus className="h-4 w-4" /> Add campaign
        </button>
      </div>
    </>
  );
}

/* ---------------- ABOUT TEXT ---------------- */
function TextPanel({ en, ar, onChange }: { en: string; ar: string; onChange: (en: string, ar: string) => void }) {
  return (
    <>
      <PanelHead title="About Text" hint="Your bio in English and Arabic." />
      <Card title="About — English"><Area label="Body (EN)" value={en} onChange={(v) => onChange(v, ar)} /></Card>
      <Card title="About — Arabic"><Area label="Body (AR)" value={ar} onChange={(v) => onChange(en, v)} /></Card>
    </>
  );
}

/* ---------------- password ---------------- */
function PasswordForm({ onOk }: { onOk: () => void }) {
  const [val, setVal] = useState("");
  const [err, setErr] = useState(false);
  return (
    <form onSubmit={(e) => { e.preventDefault(); if (val === PASSWORD) onOk(); else setErr(true); }}>
      <input type="password" autoFocus value={val} onChange={(e) => { setVal(e.target.value); setErr(false); }} placeholder="Password"
        className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-grape/60" />
      {err && <p className="mt-2 text-xs text-red-400">Wrong password.</p>}
      <button className="mt-4 w-full rounded-lg bg-grad py-2.5 text-sm font-semibold text-white">Enter</button>
    </form>
  );
}
