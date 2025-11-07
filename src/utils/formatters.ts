export type RouteParams = {
  category: string;
  state: string;
  city: string;
  slug: string;
};

export const toTitleCase = (s: string) =>
  s
    .replace(/[-_]/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");

export const toUSPS = (s: string) => (s || "").toUpperCase().slice(0, 2);

export const buildContractorUrl = ({
  category,
  state,
  city,
  slug,
}: RouteParams): string => {
  return `https://choozlandscapers.com/${category}/${state}/${city}/${slug}`;
};
