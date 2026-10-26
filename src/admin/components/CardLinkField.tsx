import { useEffect, useState } from "react";
import { type CardLink, cardLinkHref } from "@shared/card-link";
import { adminApi, type AdminPage } from "../lib/admin-api";
import { Input } from "@/components/ui/input";

const selectClass = "h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm";

export function CardLinkField({ value, onChange }: { value?: CardLink; onChange: (value: CardLink) => void }) {
  const link = value || {};
  const [pages, setPages] = useState<AdminPage[]>([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    let active = true;
    adminApi.listPages().then(({ pages }) => { if (active) setPages(pages); })
      .catch(() => { if (active) setError(true); });
    return () => { active = false; };
  }, []);
  return (
    <div className="space-y-3">
      <select aria-label="Card link type" className={selectClass} value={link.type || "default"}
        onChange={(e) => onChange({ type: e.target.value as CardLink["type"], href: "", target: e.target.value === "external" ? "_blank" : "_self" })}>
        <option value="default">Use section button action</option>
        <option value="internal">Internal link</option>
        <option value="external">External link</option>
      </select>
      {link.type === "internal" && (
        <>
          <select aria-label="Internal page" className={selectClass} value={pages.some((page) => page.path === link.href) ? link.href : ""}
            onChange={(e) => onChange({ ...link, href: e.target.value })}>
            <option value="">Select a page or enter a path below</option>
            {pages.map((page) => <option key={page.id} value={page.path}>{page.title} ({page.path})</option>)}
          </select>
          {error && <p className="text-xs text-amber-700">Pages could not load. Enter the internal path below.</p>}
        </>
      )}
      {(link.type === "internal" || link.type === "external") && (
        <>
          <Input aria-label="Card link URL" value={link.href || ""} placeholder={link.type === "internal" ? "/industries/example" : "https://example.com"}
            onChange={(e) => onChange({ ...link, href: e.target.value })} />
          {!cardLinkHref(link) && <p className="text-xs text-amber-700">{link.type === "internal" ? "Enter a path starting with / (a single slash)." : "Enter a complete http:// or https:// URL."}</p>}
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" checked={link.target === "_blank"} onChange={(e) => onChange({ ...link, target: e.target.checked ? "_blank" : "_self" })} />
            Open in new tab (_blank)
          </label>
        </>
      )}
    </div>
  );
}
