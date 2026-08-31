import type { SectionCtx } from "@/sections/shared";

export type CmsButtonAction = "demo_modal" | "video_modal" | "link";

export function isCmsButtonVisible(value: unknown) {
  return value !== false;
}

export function runCmsButtonAction(
  action: unknown,
  href: unknown,
  ctx: Pick<SectionCtx, "openDemo" | "openVideo">,
  fallbackAction: CmsButtonAction,
) {
  const resolvedAction = typeof action === "string" && action ? (action as CmsButtonAction) : fallbackAction;

  if (resolvedAction === "video_modal") {
    ctx.openVideo();
    return;
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
