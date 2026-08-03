// In dev, the Vite server proxies /api and /uploads to the local Express server,
// so a relative path works. In production the frontend (Cloudflare Pages) and the
// API (Railway) are on different domains, so builds need an absolute URL baked in
// via the VITE_API_URL env var (set in the Cloudflare Pages build settings).
export const API_BASE = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');

export function apiUrl(path: string): string {
  return `${API_BASE}${path}`;
}
