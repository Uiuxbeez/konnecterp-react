import type { SectionCtx } from "@/sections/shared";

export type CmsButtonAction = "demo_modal" | "custom_form_modal" | "video_modal" | "link" | "attachment";

export function isCmsButtonVisible(value: unknown) {
  return value !== false;
}

function normalizeFormSlug(value: unknown) {
  const raw = typeof value === "string" ? value.trim() : "";
  if (!raw) return "";
  try {
    const url = new URL(raw, window.location.origin);
    const match = url.pathname.match(/^\/forms\/([^/?#]+)/);
    if (match) return decodeURIComponent(match[1]);
  } catch {
    return raw.replace(/^\/+/, "");
  }
  return raw.replace(/^\/+/, "");
}

export function runCmsButtonAction(
  action: unknown,
  href: unknown,
  ctx: Pick<SectionCtx, "openDemo" | "openForm" | "openVideo">,
  fallbackAction: CmsButtonAction,
) {
  const resolvedAction = typeof action === "string" && action ? (action as CmsButtonAction) : fallbackAction;

  if (resolvedAction === "attachment") {
    const target = typeof href === "string" ? href.trim() : "";
    if (!target) return;
    try {
      const url = new URL(target, window.location.origin);
      if (url.protocol === "https:" || url.protocol === "http:") {
        window.open(url.href, "_blank", "noopener,noreferrer");
      }
    } catch { /* An invalid attachment URL must not trigger a demo popup. */ }
    return;
  }

  if (resolvedAction === "video_modal") {
    ctx.openVideo();
    return;
  }

  if (resolvedAction === "custom_form_modal") {
    const formSlug = normalizeFormSlug(href);
    if (formSlug && ctx.openForm) {
      ctx.openForm(formSlug);
      return;
    }
  }

  if (resolvedAction === "link") {
    const target = typeof href === "string" ? href.trim() : "";
    if (target) {
      window.location.href = target;
      return;
    }
  }

  ctx.openDemo();
}
