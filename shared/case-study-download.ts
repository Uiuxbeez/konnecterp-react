export function caseStudyDownloadForm(card: { restrictDownload?: boolean; downloadFormSlug?: string }): string | null {
  // Match the admin toggle's enabled-by-default behavior for older cards.
  // A missing form selection must never silently bypass an enabled restriction.
  return card.restrictDownload === false ? null : card.downloadFormSlug?.trim() || "demo-request";
}
