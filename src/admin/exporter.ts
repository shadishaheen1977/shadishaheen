import rawSource from "../data/portfolio.ts?raw";
import { baseSite, baseMedia, baseUi, type Overrides } from "../lib/content";

/* ------------------------------------------------------------------
   EXPORTER
   Produces a SELF-CONTAINED portfolio.ts — the full original file with
   the admin's edits already merged in. No portfolio.base.ts, no extra
   imports, nothing to rename. You just drop it in as
   src/data/portfolio.ts and redeploy.
------------------------------------------------------------------- */

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

/* strip empty {src:""} rows the editor may have left behind */
function clean(v: any): any {
  if (Array.isArray(v)) {
    return v
      .map(clean)
      .filter((x) => !(x && typeof x === "object" && "src" in x && !x.src && Object.keys(x).length <= 2));
  }
  if (v && typeof v === "object") {
    const o: any = {};
    for (const k of Object.keys(v)) o[k] = clean(v[k]);
    return o;
  }
  return v;
}

/* JS literal printer */
function lit(v: any, indent = 0): string {
  const pad = "  ".repeat(indent);
  const pad1 = "  ".repeat(indent + 1);
  if (v === null) return "null";
  if (typeof v === "string") return JSON.stringify(v);
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  if (Array.isArray(v)) {
    if (!v.length) return "[]";
    return "[\n" + v.map((x) => pad1 + lit(x, indent + 1)).join(",\n") + "\n" + pad + "]";
  }
  const keys = Object.keys(v);
  if (!keys.length) return "{}";
  return "{\n" + keys.map((k) => {
    const key = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(k) ? k : JSON.stringify(k);
    return pad1 + key + ": " + lit(v[k], indent + 1);
  }).join(",\n") + "\n" + pad + "}";
}

/* replace `export const NAME = <literal>` (with optional cast) */
function replaceExport(src: string, name: string, valueLiteral: string): string {
  const start = src.indexOf(`export const ${name} =`);
  if (start === -1) return src;
  let i = src.indexOf("=", start) + 1;
  let depth = 0, inStr: string | null = null, end = -1;
  for (let j = i; j < src.length; j++) {
    const ch = src[j];
    if (inStr) { if (ch === "\\") { j++; continue; } if (ch === inStr) inStr = null; continue; }
    if (ch === '"' || ch === "'" || ch === "`") { inStr = ch; continue; }
    if ("{[(".includes(ch)) depth++;
    else if (")]}".includes(ch)) depth--;
    else if (ch === ";" && depth === 0) { end = j; break; }
  }
  if (end === -1) return src;
  return src.slice(0, start) + `export const ${name} = ${valueLiteral};` + src.slice(end + 1);
}

export function buildPortfolioTs(ov: Overrides): string {
  let src = rawSource as string;

  const site = clean(merge(baseSite, ov.site));
  const media = clean(merge(baseMedia, ov.media));
  const ui = clean(merge(baseUi, ov.ui));

  src = replaceExport(src, "site", lit(site));
  src = replaceExport(src, "media", lit(media));
  src = replaceExport(src, "ui", lit(ui));

  const header =
    "/* ------------------------------------------------------------------\n" +
    "   portfolio.ts — exported from the SHADI SHAHEEN admin panel.\n" +
    "   Self-contained: just save as src/data/portfolio.ts and redeploy.\n" +
    "   (No portfolio.base.ts needed — nothing to rename.)\n" +
    "------------------------------------------------------------------- */\n\n";

  return header + src;
}
