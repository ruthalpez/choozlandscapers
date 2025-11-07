const isDev = process.env.NODE_ENV === "development";

const RAW =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.API_BASE_URL ||
  "https://chooz.api.choozbetter.com";
const API_BASE = RAW.replace(/\/+$/, "");
const API_ROOT = `${API_BASE}/api/landscapers`;

// Small query-string helper
function qs(params?: Record<string, any>) {
  if (!params) return "";
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === "") return;
    sp.set(k, String(v));
  });
  const s = sp.toString();
  return s ? `?${s}` : "";
}

function norm(s: string) {
  return (s || "").toString().trim().toLowerCase();
}

// Generic GET using fetch; if you must support browsers, this still works (CORS must allow)
async function apiGet<T = any>(
  path: string,
  params?: Record<string, any>,
  init?: RequestInit,
): Promise<T | null> {
  const url = `${API_ROOT}${path}${qs(params)}`;
  try {
    const res = await fetch(url, {
      ...init,
      // ⬇️ make sure signal flows through
      signal: init?.signal,
      headers: {
        Accept: "application/json",
        ...(init?.headers || {}),
      },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch (err: any) {
    if (err?.name !== "AbortError") {
      console.error("API Error:", { url, err });
    }
    return null;
  }
}

/**
 * GET /{category}/{state}/{city}/{slug}
 * Returns API shape { data: {...} } (preferred) or raw object
 */
export const getByCategoryStateCitySlug = async (
  category: string,
  state: string,
  city: string,
  slug: string,
  signal?: AbortSignal,
) => {
  const json = await apiGet<any>(
    `/${encodeURIComponent(norm(category))}/${encodeURIComponent(
      norm(state),
    )}/${encodeURIComponent(norm(city))}/${encodeURIComponent(norm(slug))}`,
    undefined,
    // When called from server during SSR/ISR, we can pass revalidate hints:
    { next: { revalidate: 86400 } as any, signal },
  );
  // Keep previous return contract: { data } | null
  if (!json) return null;
  return json;
};

/**
 * GET /{state}/{city}/painting-contractors
 * Supports ?page=&sortByRating=&service=
 */
export const getByStateCity = async (
  state: string,
  city: string,
  page?: number,
  sortByRating?: string,
  serviceFilter?: string,
  signal?: AbortSignal,
) => {
  const params: Record<string, any> = {};
  if (page && page > 0) params.page = page;
  if (sortByRating) params.sortByRating = sortByRating;
  if (serviceFilter && serviceFilter !== "all" && serviceFilter.trim()) {
    params.service = serviceFilter;
  }

  const json = await apiGet<any>(
    `/${encodeURIComponent(norm(state))}/${encodeURIComponent(
      norm(city),
    )}/painting-contractors`,
    params,
    { next: { revalidate: 3600 } as any, signal },
  );
  return json; // keep { data, ... } shape as your code expects
};

export const getZipCodesByStateCity = async (state: string, city: string) => {
  const json = await apiGet<any>(
    `/${encodeURIComponent(norm(state))}/${encodeURIComponent(
      norm(city),
    )}/painting-contractors`,
    { zipCode: "" },
    { next: { revalidate: 86400 } as any },
  );
  return json;
};

export const getAllData = async () => {
  const json = await apiGet<any>("/", undefined, {
    next: { revalidate: 3600 } as any,
  });
  return json;
};

// Optional helper; keep same signatures to avoid breaking imports
export const preloadData = async (
  state: string,
  city: string,
  commonParams?: { sortByRating?: string; serviceFilter?: string },
) => {
  // Fire-and-forget on server; on client it will just trigger parallel fetches
  await Promise.allSettled([
    getByStateCity(
      state,
      city,
      1,
      commonParams?.sortByRating,
      commonParams?.serviceFilter,
    ),
    getZipCodesByStateCity(state, city),
  ]);
};

// No-op stubs to keep existing calls compiling (you can wire to a Map if you still need it)
export const clearCache = (_pattern?: string) => {};
export const getCacheStats = () => ({ size: 0, keys: [] as string[] });
