import type { SectionCtx } from "@/sections/shared";

export type CmsButtonAction = "demo_modal" | "custom_form_modal" | "video_modal" | "link";

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
