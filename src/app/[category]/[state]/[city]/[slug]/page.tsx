// app/[category]/[state]/[city]/[slug]/page.tsx

import { toTitleCase, toUSPS, buildContractorUrl } from "@/utils/formatters";
import CompanyProfilePage from "@/components/CompanyProfilePage";
import { generateSchema } from "./schema";
import { notFound } from "next/navigation";
import { getContractorCached } from "./data";

export const runtime = "nodejs";
export const revalidate = 86400; // ISR: 24h, adjust as needed
export const dynamic = "force-static";

const ORIGIN = "https://choozlandscapers.com";

type RouteParams = {
  category: string;
  state: string;
  city: string;
  slug: string;
};

export async function generateMetadata(props: {
  params: Promise<RouteParams>;
}) {
  try {
    const { category, state, city, slug } = await props.params; // ✅ await first
    if (!category || !state || !city || !slug) notFound();

    const contractor = await getContractorCached(category, state, city, slug);
    if (!contractor) notFound();

    const inactiveOrHidden =
      contractor.status === "inactive" ||
      contractor.hidden === true ||
      contractor.deleted === true ||
      contractor.blocked === true;

    // Prefer 404 for non-indexable profiles to avoid crawl waste
    if (inactiveOrHidden) notFound();

    const cityName = toTitleCase(city);
    const stateCode = toUSPS(state);

    const safeCategory = typeof category === "string" ? category : "";
    const categoryName = toTitleCase(safeCategory.replace(/-/g, " "));

    const contractorName =
      contractor?.title ||
      contractor?.name ||
      contractor?.company_name ||
      "Professional Painter";

    const title = contractor?.seo_title?.trim()
      ? contractor.seo_title
      : `${contractorName} | ${categoryName} in ${cityName}, ${stateCode}`;

    const description = contractor?.seo_description?.trim()
      ? contractor.seo_description
      : `${contractorName} provides professional ${safeCategory.replace(
          /-/g,
          " ",
        )} services in ${cityName}, ${stateCode}. Licensed, insured, and highly rated painting contractor. Get free quotes and read customer reviews.`;

    const path = buildContractorUrl({ category, state, city, slug });
    const canonical = path.startsWith("http") ? path : `${ORIGIN}${path}`;

    const ogImage =
      contractor?.company_logo ||
      contractor?.images?.[0]?.url ||
      contractor?.images?.[0] ||
      contractor?.logo?.[0]?.url ||
      "/default-og-image.jpg";
    const ogImageAbs = ogImage.startsWith("http")
      ? ogImage
      : `${ORIGIN}${ogImage}`;

    return {
      title,
      description,
      robots:
        contractor.claimed || contractor.not_claimed
          ? "index, follow"
          : "noindex, nofollow",
      keywords: `${contractorName}, ${categoryName}, ${cityName} ${stateCode}, painting contractor, house painter, commercial painting`,
      alternates: { canonical },
      openGraph: {
        title,
        description,
        url: canonical,
        siteName: "choozlandscapers",
        type: "website",
        locale: "en_US",
        images: [
          {
            url: ogImageAbs,
            width: 1200,
            height: 630,
            alt: `${contractorName} - ${categoryName} in ${cityName}, ${stateCode}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImageAbs],
      },
      other: {
        "geo.region": stateCode,
        "geo.placename": cityName,
        "business.contact_data.locality": cityName,
        "business.contact_data.region": stateCode,
      },
    };
  } catch {
    return {
      title: "choozlandscapers - Professional Painting Contractors",
      description: "Find professional painting contractors in your area.",
      robots: { index: true, follow: true },
    };
  }
}

const Page = async (props: { params: Promise<RouteParams> }) => {
  const { category, state, city, slug } = await props.params;
  if (!category || !state || !city || !slug) notFound();

  const contractor = await getContractorCached(category, state, city, slug);
  if (!contractor) notFound();

  // Hard 404 for non-indexable profiles
  if (
    contractor.status === "inactive" ||
    contractor.hidden === true ||
    contractor.deleted === true ||
    contractor.blocked === true
  ) {
    notFound();
  }

  const completeSchema = generateSchema(contractor, {
    category,
    state,
    city,
    slug,
    post_code: contractor.post_code,
  });

  return (
    <>
      {/* Server-rendered JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(completeSchema) }}
      />
      <main>
        <CompanyProfilePage />
      </main>
    </>
  );
};

export default Page;
