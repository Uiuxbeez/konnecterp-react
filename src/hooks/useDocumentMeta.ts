import { useEffect } from 'react';

const DEFAULT_TITLE = 'KonnectERP - One ERP Platform. Endless Business Possibilities.';
const DEFAULT_DESCRIPTION = 'KonnectERP is a cloud ERP platform that helps you manage finance, inventory, sales, HR, manufacturing, and operations from a single intelligent platform.';

function canonicalUrl() {
  const { origin, pathname } = window.location;
  const cleanPath = pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/';
  return `${origin}${cleanPath}`;
}

function ensureMeta(selector: string, attrs: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    Object.entries(attrs).forEach(([key, value]) => element?.setAttribute(key, value));
    document.head.appendChild(element);
  }
  return element;
}

function ensureCanonical() {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  return element;
}

// Sets title, description, social preview tags, and the canonical URL for the
// currently mounted SPA route.
export function useDocumentMeta(title?: string, description?: string) {
  useEffect(() => {
    const nextTitle = title?.trim() || DEFAULT_TITLE;
    const nextDescription = description?.trim() || DEFAULT_DESCRIPTION;
    const nextCanonical = canonicalUrl();

    document.title = nextTitle;
    ensureMeta('meta[name="description"]', { name: 'description' }).setAttribute('content', nextDescription);
    ensureMeta('meta[property="og:title"]', { property: 'og:title' }).setAttribute('content', nextTitle);
    ensureMeta('meta[property="og:description"]', { property: 'og:description' }).setAttribute('content', nextDescription);
    ensureMeta('meta[property="og:url"]', { property: 'og:url' }).setAttribute('content', nextCanonical);
    ensureMeta('meta[property="og:type"]', { property: 'og:type' }).setAttribute('content', 'website');
    ensureMeta('meta[name="twitter:title"]', { name: 'twitter:title' }).setAttribute('content', nextTitle);
    ensureMeta('meta[name="twitter:description"]', { name: 'twitter:description' }).setAttribute('content', nextDescription);
    ensureCanonical().setAttribute('href', nextCanonical);

    return () => {
      const fallbackCanonical = canonicalUrl();
      document.title = DEFAULT_TITLE;
      ensureMeta('meta[name="description"]', { name: 'description' }).setAttribute('content', DEFAULT_DESCRIPTION);
      ensureMeta('meta[property="og:title"]', { property: 'og:title' }).setAttribute('content', DEFAULT_TITLE);
      ensureMeta('meta[property="og:description"]', { property: 'og:description' }).setAttribute('content', DEFAULT_DESCRIPTION);
      ensureMeta('meta[property="og:url"]', { property: 'og:url' }).setAttribute('content', fallbackCanonical);
      ensureMeta('meta[name="twitter:title"]', { name: 'twitter:title' }).setAttribute('content', DEFAULT_TITLE);
      ensureMeta('meta[name="twitter:description"]', { name: 'twitter:description' }).setAttribute('content', DEFAULT_DESCRIPTION);
      ensureCanonical().setAttribute('href', fallbackCanonical);
    };
  }, [title, description]);
}
