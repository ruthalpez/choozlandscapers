import CompanyListingPage from "@/components/CompanyListingPage";
import { getByStateCity } from "@/lib/getAPI";
import Script from "next/script";

// Type definitions
interface FAQQuestion {
  name: string;
  text: string;
}

interface FAQData {
  id: number;
  faq_question_1?: string | null;
  faq_answer_1?: string | null;
  faq_question_2?: string | null;
  faq_answer_2?: string | null;
  faq_question_3?: string | null;
  faq_answer_3?: string | null;
  faq_question_4?: string | null;
  faq_answer_4?: string | null;
  faq_question_5?: string | null;
  faq_answer_5?: string | null;
  city: string;
  state: string;
  faq_locations?: Array<{
    city: string;
    state: string;
  }>;
  created_at: string;
  updated_at: string;
}

interface ContractorData {
  title: string;
  slug: string;
  seo_description?: string;
  company_phone?: string;
  company_email?: string;
  address?: string;
  city?: string;
  state?: string;
  post_code?: string;
  country?: string;
  location_latitude?: string;
  location_longitude?: string;
  website?: string;
  logo?: Array<{
    url: string;
    alt?: string;
  }>;
  scores?: Array<{
    score: string;
  }>;
  awards?: Array<{
    award: string;
  }>;
}

interface APIResponse {
  data: ContractorData[];
  total: number;
  page: number;
  totalPages: number;
  faqs: FAQData[];
}

// ----- ENHANCED METADATA (INDEXING FIXES) -----
export async function generateMetadata({ params }: any) {
  try {
    const resolvedParams = await params;
    const [state, city, category] = resolvedParams.state || [];

    if (!state || !city || !category) {
      return {
        title:
          "Find Professional Painting Contractors | choozlandscapers Directory",
        description:
          "Discover licensed and insured painting contractors in your area. Compare reviews, ratings, and get free quotes from verified professionals.",
        robots: "index, follow",
        keywords:
          "painting contractors, house landscapers, commercial landscapers, painting services",
      };
    }

    const cityName = city
      .replace(/-/g, " ")
      .trim()
      .split(" ")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    const stateCode = state.toUpperCase();
    const categoryCode = "Painting Contractors";

    // ENHANCED: More detailed and unique title
    const title = `${cityName}, ${stateCode} ${categoryCode} | Licensed Landscapers Near You`;
    const fullUrl = `https://choozlandscapers.com/${state}/${city}/${category}`;

    // ENHANCED: More comprehensive description
    const description = `Find top-rated painting contractors in ${cityName}, ${stateCode}. Browse verified local landscapers with customer reviews, licensing information, and competitive pricing. Get free estimates from trusted professionals serving ${cityName} and surrounding areas.`;

    // ENHANCED: Location-specific keywords
    const keywords = `${cityName} painting contractors, ${stateCode} landscapers, house landscapers ${cityName}, commercial painting ${cityName}, interior landscapers ${cityName}, exterior landscapers ${stateCode}`;

    const robots = { index: true, follow: true };

    return {
      title,
      description,
      keywords,
      robots,

      openGraph: {
        title,
        description,
        url: fullUrl,
        siteName: "choozlandscapers",
        type: "website",
        locale: "en_US",
        images: [
          {
            url: `https://choozlandscapers.com/images/landscapers-${state}-${city}.jpg`,
            width: 1200,
            height: 630,
            alt: `Professional ${categoryCode} serving ${cityName}, ${stateCode}`,
          },
        ],
      },

      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [
          `https://choozlandscapers.com/images/landscapers-${state}-${city}.jpg`,
        ],
      },

      alternates: {
        canonical: fullUrl,
      },

      other: {
        "geo.region": stateCode,
        "geo.placename": cityName,
        "business.contact_data.locality": cityName,
        "business.contact_data.region": stateCode,
        "DC.title": title,
        "DC.description": description,
      },
    };
  } catch (error) {
    console.error("Metadata generation error:", error);
    return {
      title: "Professional Painting Contractors Directory | choozlandscapers",
      description:
        "Find licensed painting contractors in your area with verified reviews and competitive pricing.",
      robots: { index: true, follow: true },
    };
  }
}

// Helper function to strip HTML tags and clean text
const stripHTML = (html: string): string => {
  if (!html || typeof html !== "string") return "";

  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
};

// FAQ Schema function using new FAQ structure
const generateFAQ = (faqData: FAQData[] = []) => {
  if (!faqData || faqData.length === 0) {
    return null;
  }

  const allQuestions: FAQQuestion[] = [];

  // Extract questions from each FAQ entry
  faqData.forEach((faq: FAQData) => {
    // Process each of the 5 question-answer pairs
    for (let i = 1; i <= 5; i++) {
      const question = faq[`faq_question_${i}` as keyof FAQData] as
        | string
        | null;
      const answer = faq[`faq_answer_${i}` as keyof FAQData] as string | null;

      if (question && answer) {
        const cleanAnswer = stripHTML(answer);

        // Only add if both question and answer have meaningful content
        if (cleanAnswer.length > 10) {
          allQuestions.push({
            name: question,
            text: cleanAnswer,
          });
        }
      }
    }
  });

  if (allQuestions.length === 0) {
    return null;
  }

  return {
    "@type": "FAQPage",
    mainEntity: allQuestions.map((q) => ({
      "@type": "Question",
      name: q.name,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.text,
      },
    })),
  };
};

const Page = async ({ params }: any) => {
  const resolvedParams = await params;
  const [state, city, category] = resolvedParams.state || [];

  if (!state || !city || !category) {
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">
          Find Local Painting Contractors
        </h1>
        <p className="text-gray-600">
          Please specify your location to find qualified painting contractors in
          your area.
        </p>
      </main>
    );
  }

  // Fetch contractors data with error handling
  let contractors: ContractorData[] = [];
  let faqData: FAQData[] = [];
  try {
    const contractorsData: APIResponse | null = await getByStateCity(
      state,
      city,
    );
    contractors = contractorsData?.data || [];
    faqData = contractorsData?.faqs || [];
  } catch (error) {
    console.error("Failed to fetch contractors:", error);
    contractors = [];
    faqData = [];
  }

  // Generate schema for the page
  let schema: any[] | null = null;
  if (state && city && category) {
    const cityName = city
      .replace(/-/g, " ")
      .trim()
      .split(" ")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    const stateCode = state.toUpperCase();
    const categoryCode = "Painting Contractors";
    const fullUrl = `https://choozlandscapers.com/${state}/${city}/${category}`;

    // Generate FAQ schema from API data
    const faq = generateFAQ(faqData);

    // Create schema items from contractors data with data validation
    const itemListElements =
      contractors.length > 0
        ? contractors
            .filter(
              (contractor: ContractorData) =>
                contractor && contractor.title && contractor.slug,
            )
            .map((contractor: ContractorData, index: number) => {
              const localBusiness: any = {
                "@type": "LocalBusiness",
                name: contractor.title,
                url: `https://choozlandscapers.com/${state}/${city}/${category}/${contractor.slug}`,
              };

              if (contractor.seo_description) {
                localBusiness.description = contractor.seo_description;
              }

              if (contractor.company_phone) {
                localBusiness.telephone = contractor.company_phone;
              }

              if (contractor.company_email) {
                localBusiness.email = contractor.company_email;
              }

              if (contractor.address) {
                localBusiness.address = {
                  "@type": "PostalAddress",
                  ...(contractor.address && {
                    streetAddress: contractor.address,
                  }),
                  ...(contractor.city && {
                    addressLocality: contractor.city,
                  }),
                  ...(contractor.state && {
                    addressRegion: contractor.state,
                  }),
                  ...(contractor.post_code && {
                    postalCode: contractor.post_code,
                  }),
                  ...(contractor.country && {
                    addressCountry: contractor.country,
                  }),
                };
              }

              if (
                contractor.location_latitude &&
                contractor.location_longitude
              ) {
                localBusiness.geo = {
                  "@type": "GeoCoordinates",
                  latitude: parseFloat(contractor.location_latitude),
                  longitude: parseFloat(contractor.location_longitude),
                };
              }

              if (contractor.website) {
                localBusiness.sameAs = [contractor.website];
              }

              if (
                contractor.logo &&
                contractor.logo[0] &&
                contractor.logo[0].url
              ) {
                localBusiness.image = {
                  "@type": "ImageObject",
                  url: contractor.logo[0].url,
                  ...(contractor.logo[0].alt && {
                    description: contractor.logo[0].alt,
                  }),
                };
              }

              if (contractor.scores && Array.isArray(contractor.scores)) {
                const validScores = contractor.scores.filter(
                  (scoreItem: any) => scoreItem.score,
                );
                if (validScores.length > 0) {
                  const highestScore = Math.max(
                    ...validScores.map((s: any) => parseFloat(s.score)),
                  );
                  localBusiness.aggregateRating = {
                    "@type": "AggregateRating",
                    ratingValue: highestScore.toString(),
                    bestRating: "100",
                    worstRating: "1",
                    ratingCount: validScores.length, // ADD THIS
                    // OR use reviewCount if you have review data:
                    // reviewCount: contractor.reviews?.length || validScores.length
                  };
                }
              }

              if (contractor?.awards && contractor.awards.length > 0) {
                localBusiness.award = contractor.awards.map(
                  (award: any) => award.award,
                );
              }

              return {
                "@type": "ListItem",
                position: index + 1,
                item: localBusiness,
              };
            })
        : [];

    // Initialize schema array with ItemList
    const schemaItems: any[] = [
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `${cityName}, ${stateCode} ${categoryCode}`,
        description: `Directory of verified painting contractors serving ${cityName}, ${stateCode}. Find licensed and insured landscapers in your area.`,
        url: fullUrl,
        numberOfItems: itemListElements.length,
        itemListElement: itemListElements,
      },
    ];

    // Add FAQ schema if available
    if (faq) {
      schemaItems.push({
        "@context": "https://schema.org",
        ...faq,
      });
    }

    schema = schemaItems;
  }

  return (
    <>
      {schema && (
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      )}

      <main>
        <CompanyListingPage contractors={contractors} />
      </main>
    </>
  );
};

export default Page;
