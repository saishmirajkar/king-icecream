export const CATEGORY_NAMES = [
  "Cones",
  "Cups",
  "Kulfi",
  "Sticks",
  "Family Packs",
  "Sundaes",
  "Sip Ups",
] as const;

export type CategoryName = (typeof CATEGORY_NAMES)[number];

export function categorySlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export function categoryFromSlug(slug: string): CategoryName | null {
  const match = CATEGORY_NAMES.find((n) => categorySlug(n) === slug);
  return match ?? null;
}
