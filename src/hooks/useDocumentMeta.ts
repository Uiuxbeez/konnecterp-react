import { useEffect } from 'react';

const DEFAULT_TITLE = 'KonnectERP — One ERP Platform. Endless Business Possibilities.';
const DEFAULT_DESCRIPTION = 'KonnectERP is a cloud ERP platform that helps you manage finance, inventory, sales, HR, manufacturing, and operations from a single intelligent platform.';

// Sets document.title and the meta description for the currently mounted page.
// This is a client-rendered SPA (no SSR), so this covers the browser-tab/social
// preview case; search engines that execute JS will still pick it up, but true
// crawler-visible per-route SEO would need server-side rendering.
export function useDocumentMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ?? DEFAULT_TITLE;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description ?? DEFAULT_DESCRIPTION);
    return () => {
      document.title = DEFAULT_TITLE;
      if (meta) meta.setAttribute('content', DEFAULT_DESCRIPTION);
    };
  }, [title, description]);
}
