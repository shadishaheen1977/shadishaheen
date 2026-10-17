/* ------------------------------------------------------------------
   CONTENT STORE
   Merges the built-in data (portfolio.ts) with admin edits saved in
   localStorage. The site reads content through here so the /admin
   page can preview changes live. Nothing here touches a server — the
   admin exports a fresh portfolio.ts to make changes permanent.
------------------------------------------------------------------- */
import {
  site as baseSite,
  media as baseMedia,
  ui as baseUi,
} from "../data/portfolio";

const KEY = "shadi-admin-overrides-v1";

export type Overrides = {
  site?: Partial<typeof baseSite>;
  media?: {
    hero?: Partial<typeof baseMedia.hero>;
    photography?: Record<string, { src: string; alt?: string }[]>;
    video?: typeof baseMedia.video;
    social?: { stats?: typeof baseMedia.social.stats; clients?: typeof baseMedia.social.clients };
    clientLogos?: typeof baseMedia.clientLogos;
    advertising?: typeof baseMedia.advertising;
  };
  ui?: {
    en?: Record<string, any>;
    ar?: Record<string, any>;
  };
};

/* deep-merge plain objects (arrays are replaced wholesale) */
function merge<T>(base: T, over: any): T {
  if (over === undefined || over === null) return base;
  if (Array.isArray(base) || Array.isArray(over)) return over as T;
  if (typeof base === "object" && typeof over === "object") {
    const out: any = { ...base };
    for (const k of Object.keys(over)) out[k] = merge((base as any)[k], over[k]);
    return out;
  }
  return over as T;
}

export function loadOverrides(): Overrides {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Overrides) : {};
  } catch {
    return {};
  }
}

export function saveOverrides(o: Overrides) {
  localStorage.setItem(KEY, JSON.stringify(o));
  window.dispatchEvent(new Event("shadi-content-changed"));
}

export function resetOverrides() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("shadi-content-changed"));
}

/* the merged, live content the site should render */
export function getContent() {
  const o = loadOverrides();
  return {
    site: merge(baseSite, o.site),
    media: merge(baseMedia, o.media),
    ui: merge(baseUi, o.ui),
  };
}

export { baseSite, baseMedia, baseUi };
