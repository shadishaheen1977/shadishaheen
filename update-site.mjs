/* ------------------------------------------------------------------
   update-site.mjs — one command to publish your admin edits.

   What it does, in order:
   1. Finds the newest exported "portfolio.ts" in your Downloads folder
      and copies it into src/data/portfolio.ts (so your edits apply).
   2. Runs the build.
   3. Bundles the video, logos, images and PDF into ONE standalone
      HTML file:  shadi-standalone.html  (open by double-click).

   Usage:  node update-site.mjs
           (or double-click  تحديث-الموقع.bat )
------------------------------------------------------------------- */
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, copyFileSync } from "node:fs";
import { join, extname } from "node:path";
import { homedir } from "node:os";

const MIME = {
  ".mp4": "video/mp4", ".webm": "video/webm",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png",
  ".gif": "image/gif", ".webp": "image/webp", ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
};

/* ---- STEP 1: pull the newest portfolio.ts from Downloads ---- */
function findNewestExport() {
  const dl = join(homedir(), "Downloads");
  if (!existsSync(dl)) return null;
  const matches = readdirSync(dl)
    .filter((f) => /^portfolio.*\.ts$/i.test(f))
    .map((f) => ({ f, p: join(dl, f), t: statSync(join(dl, f)).mtimeMs }))
    .sort((a, b) => b.t - a.t);
  return matches.length ? matches[0] : null;
}

console.log("=========================================");
console.log("  SHADI SHAHEEN — publishing your admin edits");
console.log("=========================================\n");

const found = findNewestExport();
if (found) {
  copyFileSync(found.p, join("src", "data", "portfolio.ts"));
  console.log(`1/3  Applied edits from Downloads\\${found.f}  ✓`);
} else {
  console.log("1/3  No exported portfolio.ts found in Downloads —");
  console.log("     using the current src/data/portfolio.ts as-is.");
}

/* ---- STEP 2: build ---- */
console.log("\n2/3  Building the site…");
execSync("npm run build", { stdio: "inherit" });

/* ---- STEP 3: bundle everything into one HTML ---- */
console.log("\n3/3  Bundling into a single HTML file…");
let html = readFileSync(join("dist", "index.html"), "utf8");

function walk(dir) {
  let out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out = out.concat(walk(p));
    else out.push(p);
  }
  return out;
}

let embedded = 0;
if (existsSync(join("dist", "assets"))) {
  for (const file of walk(join("dist", "assets"))) {
    const mime = MIME[extname(file).toLowerCase()];
    if (!mime) continue;
    const webPath = "/" + file.split(/[\\/]/).slice(1).join("/");
    if (!html.includes(webPath)) continue;
    const b64 = readFileSync(file).toString("base64");
    html = html.split(webPath).join(`data:${mime};base64,${b64}`);
    embedded++;
  }
}

const out = "shadi-standalone.html";
writeFileSync(out, html);
const mb = (Buffer.byteLength(html) / 1048576).toFixed(2);

console.log(`\n=========================================`);
console.log(`  DONE ✓  (${embedded} assets embedded, ${mb} MB)`);
console.log(`=========================================`);
console.log(`\nYour file:  ${out}`);
console.log("Open it by double-click — video, logos & images all work,");
console.log("no server needed. Share it or keep it as your demo.\n");
