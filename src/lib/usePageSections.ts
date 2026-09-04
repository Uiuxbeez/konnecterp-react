import { useEffect, useState } from "react";
import { SECTION_DEFS, type SectionType } from "@shared/sections";
import { apiUrl } from "./api-base";

export interface PageSection {
  id: number;
  type: SectionType;
  name: string;
  content: Record<string, unknown>;
}

export interface PageInfo {
  slug: string;
  title: string;
  template?: string;
  path?: string;
  metaTitle?: string;
  metaDescription?: string;
}

const FALLBACK_SECTIONS: PageSection[] = SECTION_DEFS.map((def, i) => ({
  id: -(i + 1),
  type: def.type,
  name: def.name,
  content: def.defaultContent,
}));

function isPreview() {
  return typeof window !== "undefined" && new URLSearchParams(window.location.search).get("preview") === "1";
}

type PageSectionsResult = { page: PageInfo | null; sections: PageSection[] };

const PAGE_CACHE_TTL_MS = 60_000;
const pageCache = new Map<string, { expiresAt: number; data: PageSectionsResult }>();
const pageRequests = new Map<string, Promise<PageSectionsResult>>();

function mapPageSections(data: any) {
  const rows = data.sections;
  const mapped: PageSection[] = rows
    .filter((s: any) => isPreview() || s.enabled !== false)
    .sort((a: any, b: any) => (a.position ?? 0) - (b.position ?? 0))
    .map((s: any) => ({
      id: s.id,
      type: s.type as SectionType,
      name: s.name,
      content: (isPreview() ? s.content : s.content) ?? {},
    }));

  return { page: data.page ?? null, sections: mapped.length > 0 ? mapped : FALLBACK_SECTIONS };
}

// Fetches the CMS-managed sections for a page. In preview mode (admin's draft
// preview iframe) it reads the authenticated draft endpoint; otherwise it reads
// the public published endpoint. Falls back to the hardcoded defaults (mirroring
// the original static homepage copy) if the API is unreachable, so the site
// never breaks if the backend/DB isn't running.
export function usePageSections(slug: string) {
  const [sections, setSections] = useState<PageSection[] | null>(null);
  const [page, setPage] = useState<PageInfo | null>(null);
  const [loading, setLoading] = useState(true);
  // True only when the API affirmatively said this page doesn't exist (HTTP 404) —
  // as opposed to the API being unreachable, which falls back to defaults instead
  // so the site never breaks if the backend/DB is down.
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let is404 = false;
    setLoading(true);
    setSections(null);
    setPage(null);
    setNotFound(false);
    const preview = isPreview();
    const cacheKey = `${preview ? "preview" : "public"}:${slug}`;
    const cached = preview ? null : pageCache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) {
      setSections(cached.data.sections);
      setPage(cached.data.page);
      setLoading(false);
      return () => {
        cancelled = true;
      };
    }

    const url = apiUrl(preview ? `/api/admin/pages/${slug}/sections` : `/api/public/pages/${slug}`);
    const request = preview
      ? null
      : pageRequests.get(cacheKey);
    const nextRequest = request ?? fetch(url, { credentials: "include" })
      .then((res) => {
        if (res.status === 404) {
          is404 = true;
          if (!cancelled) setNotFound(true);
          throw new Error("Page not found");
        }
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        return res.json();
      })
      .then((data) => {
        const result = mapPageSections(data);
        if (!preview) pageCache.set(cacheKey, { expiresAt: Date.now() + PAGE_CACHE_TTL_MS, data: result });
        return result;
      })
      .finally(() => {
        if (!preview) pageRequests.delete(cacheKey);
      });

    if (!preview && !request) pageRequests.set(cacheKey, nextRequest);

    nextRequest
      .then((data) => {
        if (cancelled) return;
        setSections(data.sections);
        setPage(data.page);
      })
      .catch(() => {
        if (!cancelled && !is404) setSections(FALLBACK_SECTIONS);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const byType = (type: SectionType): Record<string, unknown> => {
    const fallback = SECTION_DEFS.find((d) => d.type === type)?.defaultContent ?? {};
    const match = sections?.find((s) => s.type === type);
    return { ...fallback, ...(match?.content ?? {}) };
  };

  return { sections: sections ?? (loading ? [] : FALLBACK_SECTIONS), page, loading, notFound, byType };
}
