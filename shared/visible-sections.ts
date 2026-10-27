// Apply the same visibility/order rules to authenticated drafts and published pages.
// An empty result is intentional; it must not restore default sections.
export function visibleSections<T extends { enabled?: boolean; position?: number }>(rows: T[]): T[] {
  return rows.filter((section) => section.enabled !== false)
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
}
