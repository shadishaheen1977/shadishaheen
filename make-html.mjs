/* ------------------------------------------------------------------
   make-html.mjs — builds the site and bundles EVERYTHING (video,
   logos, images, PDF) into ONE standalone HTML file you can open by
   double-click. Output: shadi-standalone.html in the project root.

   Usage:  node make-html.mjs
------------------------------------------------------------------- */
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const MIME = {
  ".mp4": "video/mp4", ".webm": "video/webm",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png",
  ".gif": "image/gif", ".webp": "image/webp", ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
};

console.log("1/3  Building the site (npm run build)…");
execSync("npm run build", { stdio: "inherit" });

const distDir = "dist";
let html = readFileSync(join(distDir, "index.html"), "utf8");

// walk dist/assets and collect every file
function walk(dir) {
  let out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out = out.concat(walk(p));
    else out.push(p);
  }
  return out;
}

console.log("2/3  Embedding assets…");
let embedded = 0;
if (existsSync(join(distDir, "assets"))) {
  for (const file of walk(join(distDir, "assets"))) {
    const ext = extname(file).toLowerCase();
    const mime = MIME[ext];
    if (!mime) continue;
    // web path the html uses, e.g. /assets/hero/reel.mp4
    const webPath = "/" + file.split(/[\\/]/).slice(1).join("/"); // drop "dist"
    if (!html.includes(webPath)) continue;
    const b64 = readFileSync(file).toString("base64");
    html = html.split(webPath).join(`data:${mime};base64,${b64}`);
    embedded++;
    console.log("   embedded:", webPath);
  }
}

const out = "shadi-standalone.html";
writeFileSync(out, html);
const mb = (Buffer.byteLength(html) / 1048576).toFixed(2);
console.log(`3/3  Done ✓  ${embedded} assets embedded → ${out} (${mb} MB)`);
console.log("\nOpen shadi-standalone.html by double-click — everything works, no server needed.");
