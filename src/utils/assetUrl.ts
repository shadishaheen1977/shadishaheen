/** Resolve local public assets at the current site root, including GitHub Pages project URLs. */
export function assetUrl(path?: string | null): string | undefined {
  if (!path) return undefined;
  if (!path.startsWith("/assets/")) return path;
  if (typeof window === "undefined") return path;
  return new URL(path.slice(1), window.location.href).href;
}
