export const normalizeCity = (city: string = "") =>
  city
    .toLowerCase()
    .replace(/[']/g, "") // Remove hyphens and apostrophes
    .replace(/\s+/g, "") // Remove spaces
    .trim();
