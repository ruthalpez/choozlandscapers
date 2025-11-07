// app/sitemap.ts
import axios from "axios";
import type { MetadataRoute } from "next";
export const runtime = "nodejs"; // ensures Node runtime for axios
export const revalidate = 86400; // regenerate every 24h
export const dynamic = "force-static";
export const contentType = "application/xml";

/** =========================
 *  STATE NAME → ABBREVIATION MAP
 *  ========================= */
const STATE_ABBREVIATIONS: Record<string, string> = {
  alabama: "al",
  alaska: "ak",
  arizona: "az",
  arkansas: "ar",
  california: "ca",
  colorado: "co",
  connecticut: "ct",
  delaware: "de",
  florida: "fl",
  georgia: "ga",
  hawaii: "hi",
  idaho: "id",
  illinois: "il",
  indiana: "in",
  iowa: "ia",
  kansas: "ks",
  kentucky: "ky",
  louisiana: "la",
  maine: "me",
  maryland: "md",
  massachusetts: "ma",
  michigan: "mi",
  minnesota: "mn",
  mississippi: "ms",
  missouri: "mo",
  montana: "mt",
  nebraska: "ne",
  nevada: "nv",
  "new hampshire": "nh",
  "new jersey": "nj",
  "new mexico": "nm",
  "new york": "ny",
  "north carolina": "nc",
  "north dakota": "nd",
  ohio: "oh",
  oklahoma: "ok",
  oregon: "or",
  pennsylvania: "pa",
  "rhode island": "ri",
  "south carolina": "sc",
  "south dakota": "sd",
  tennessee: "tn",
  texas: "tx",
  utah: "ut",
  vermont: "vt",
  virginia: "va",
  washington: "wa",
  "west virginia": "wv",
  wisconsin: "wi",
  wyoming: "wy",
};

/** =========================
 *  ENV / API CONFIG
 *  ========================= */
const API_BASE_URL = "https://chooz.api.choozbetter.com";

// Fail fast in all environments if API URL is not configured
if (!API_BASE_URL) {
  throw new Error(
    "API_BASE_URL (or NEXT_PUBLIC_API_URL) is not configured for sitemap generation.",
  );
}

// Normalize base URL (no trailing slash)
const NORMALIZED_API_BASE = API_BASE_URL.replace(/\/+$/, "");
const API_URL = `${NORMALIZED_API_BASE}/api/landscapers`;

// Base site URL
const BASE_URL = "https://choozlandscapers.com";

/** =========================
 *  HELPERS
 *  ========================= */
const slugify = (s: string) =>
  (s || "").toLowerCase().trim().replace(/\s+/g, "-");

const isIndexable = (c: any) => {
  const inactive =
    String(c?.status || "").toLowerCase() === "inactive" ||
    c?.hidden === true ||
    c?.deleted === true ||
    c?.blocked === true;
  return !inactive;
};

/** =========================
 *  FETCH: ALL CONTRACTORS (PAGINATED)
 *  ========================= */
async function getAllContractorsFromDB() {
  const all: any[] = [];
  let page = 1;
  const limit = 200;
  let guard = 0;

  while (true) {
    // Guard against infinite loops if API doesn't return paging info
    guard++;
    if (guard > 10000) throw new Error("Paging guard tripped.");

    const resp = await axios.get(API_URL, {
      params: { page, limit },
      timeout: 30000,
    });

    const data = resp?.data;
    const rows: any[] = data?.data ?? [];

    if (!Array.isArray(rows)) {
      throw new Error(`Invalid API shape at page ${page}`);
    }

    all.push(...rows);

    // Continue if server provided totalPages and there are more
    const totalPages = Number(data?.totalPages ?? 0);
    const hasMoreByTotalPages =
      Number.isFinite(totalPages) && totalPages > 0 && page < totalPages;

    // Or continue if page still returns a "full" page (common fallback if no totalPages)
    const hasMoreByCount = rows.length === limit;

    if (hasMoreByTotalPages || hasMoreByCount) {
      page++;
      // brief pause to be gentle to API
      // biome-ignore lint/suspicious/noExplicitAny: small local delay util
      await new Promise<any>((r) => setTimeout(r, 100));
      continue;
    }
    break;
  }

  if (all.length === 0) {
    throw new Error("No contractors fetched for sitemap (check API/env).");
  }

  return all;
}

/** =========================
 *  STATE/CITY LOCATION PAGES
 *  ========================= */
async function getAllStateCityCombinations() {
  const allContractors = await getAllContractorsFromDB();
  const locationSet = new Set<string>();
  const locations: Array<{
    state: string;
    city: string;
    originalState: string;
    originalCity: string;
  }> = [];

  for (const c of allContractors) {
    if (c?.state && c?.city) {
      const stateKey = slugify(c.state);
      const abbr =
        STATE_ABBREVIATIONS[stateKey] || stateKey.slice(0, 2).toLowerCase(); // fallback
      const key = `${abbr}-${slugify(c.city)}`;
      if (!locationSet.has(key)) {
        locationSet.add(key);
        locations.push({
          state: abbr,
          city: slugify(c.city),
          originalState: c.state,
          originalCity: c.city,
        });
      }
    }

    if (Array.isArray(c?.service_area)) {
      for (const area of c.service_area) {
        if (area?.state && area?.city) {
          const stateKey = slugify(area.state);
          const abbr =
            STATE_ABBREVIATIONS[stateKey] || stateKey.slice(0, 2).toLowerCase();
          const key = `${abbr}-${slugify(area.city)}`;
          if (!locationSet.has(key)) {
            locationSet.add(key);
            locations.push({
              state: abbr,
              city: slugify(area.city),
              originalState: area.state,
              originalCity: area.city,
            });
          }
        }
      }
    }
  }

  return locations;
}

/** =========================
 *  CONTRACTOR PROFILE PAGES
 *  ========================= */
async function getAllContractorPages() {
  const allContractors = await getAllContractorsFromDB();

  const pages: Array<{
    state: string;
    city: string;
    slug: string;
    updated_at?: string;
  }> = [];

  for (const c of allContractors) {
    if (!isIndexable(c)) continue;

    const isClaimedOrNotClaimed =
      c?.claimed === true || c?.not_claimed === true;
    if (!isClaimedOrNotClaimed) continue;

    if (c?.state && c?.city && c?.slug) {
      pages.push({
        state: slugify(c.state),
        city: slugify(c.city),
        slug: c.slug,
        updated_at: c.updated_at,
      });
    }
  }

  if (pages.length === 0) {
    // This should not happen if contractors exist and are indexable
    throw new Error(
      "No indexable contractor pages produced for sitemap (check data flags/fields).",
    );
  }

  return pages;
}

/** =========================
 *  MAIN SITEMAP
 *  ========================= */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1) Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/claim-painting-contractor`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/form-survey`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/free-directory-listing-offer`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/score-methodology`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // 2) Dynamic routes (locations + contractors)
  const locationRoutes: MetadataRoute.Sitemap = [];
  const contractorRoutes: MetadataRoute.Sitemap = [];

  // Generate
  const [locations, contractors] = await Promise.all([
    getAllStateCityCombinations(),
    getAllContractorPages(),
  ]);

  // Location hub pages
  // IMPORTANT: make sure this route actually exists in your app:
  // /{state}/{city}/painting-contractors
  for (const loc of locations) {
    locationRoutes.push({
      url: `${BASE_URL}/${loc.state}/${loc.city}/painting-contractors`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }

  // Contractor profile pages (forced category segment)
  for (const c of contractors) {
    contractorRoutes.push({
      url: `${BASE_URL}/painting-contractor/${c.state}/${c.city}/${c.slug}`,
      lastModified: c.updated_at ? new Date(c.updated_at) : new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // Optional sanity log (server logs)
  if (contractorRoutes.length < 100) {
    console.warn(
      `[sitemap] Low contractor URL count: ${contractorRoutes.length}. Check API pagination/data flags.`,
    );
  }

  return [...staticRoutes, ...locationRoutes, ...contractorRoutes];
}
