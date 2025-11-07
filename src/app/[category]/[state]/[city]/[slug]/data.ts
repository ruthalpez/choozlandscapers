// app/[category]/[state]/[city]/[slug]/data.ts
import "server-only";
import { cache } from "react";

export const runtime = "nodejs";

// Prefer a single, trusted base
const RAW =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.API_BASE_URL ||
  "https://chooz.api.choozbetter.com";
const API_BASE = RAW.replace(/\/+$/, "");
const API_ROOT = `${API_BASE}/api/landscapers`;

// Normalize incoming params (lowercase, hyphen)
function norm(s: string) {
  return (s || "").toString().trim().toLowerCase();
}

// Use Next.js fetch caching/ISR so bots get a fast, stable 200 HTML
async function fetchContractor(
  category: string,
  state: string,
  city: string,
  slug: string,
) {
  const u =
    `${API_ROOT}/${encodeURIComponent(norm(category))}` +
    `/${encodeURIComponent(norm(state))}` +
    `/${encodeURIComponent(norm(city))}` +
    `/${encodeURIComponent(norm(slug))}`;

  const res = await fetch(u, {
    // Revalidate from the edge/cache every 24h; tune as you like
    next: { revalidate: 86400 },
  });

  if (!res.ok) {
    // 404 -> return null so page can notFound(); other codes also null
    return null;
  }

  // Expect API shape: { data: {...} } or raw object; support both
  const json = await res.json().catch(() => null);
  if (!json) return null;

  // If your API returns { data }, prefer that; else assume json is the record
  return json.data ?? json;
}

export const getContractorCached = cache(
  async (category: string, state: string, city: string, slug: string) => {
    if (!category || !state || !city || !slug) return null;
    try {
      const record = await fetchContractor(category, state, city, slug);
      return record ?? null;
    } catch {
      return null;
    }
  },
);
