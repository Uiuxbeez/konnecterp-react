
// Existing explicit empty alt text is meaningful for decorative images.
export function imageAlt(content: object, key: string, fallback = ""): string {
  const values = content as Record<string, unknown>;
  const value = values[`${key}Alt`] ?? values.alt;
  return typeof value === "string" ? value : fallback;
}
