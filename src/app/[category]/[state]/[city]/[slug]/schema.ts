import { ServiceArea } from "@/type/contractor";
import { toTitleCase, toUSPS, buildContractorUrl } from "@/utils/formatters";

export const generateSchema = (contractor: any, p: any) => {
  // Debug function to log data extraction (remove in production)
  const debugLog = (label: string, data: any) => {
    if (
      typeof window !== "undefined" &&
      process.env.NODE_ENV === "development"
    ) {
      console.log(`[Schema Debug] ${label}:`, data);
    }
  };

  const cityName = toTitleCase(p.city);
  const stateCode = toUSPS(p.state);
  const categoryName = toTitleCase(p.category.replace("-", " "));
  const contractorUrl = buildContractorUrl(p);
  const websiteId = "https://choozlandscapers.com/#website";
  const orgId = "https://choozlandscapers.com/#org";

  // Helper function to format dates
  const formatDate = (date: string) => {
    if (!date) return new Date().toISOString();
    return new Date(date).toISOString();
  };

  // Build simplified service catalog with better error handling
  const getAllServices = () => {
    debugLog("Raw contractor.services", contractor?.services);

    if (
      !contractor?.services ||
      !Array.isArray(contractor.services) ||
      contractor.services.length === 0
    ) {
      debugLog(
        "No services found, using defaults",
        "Using fallback service list",
      );
      return [
        "Interior Painting",
        "Exterior Painting",
        "Cabinet Painting",
        "Commercial Painting",
        "Surface Preparation",
        "Color Consultation",
      ];
    }

    const services: string[] = [];

    try {
      contractor.services.forEach((service: any, serviceIndex: number) => {
        debugLog(`Processing service ${serviceIndex}`, service);

        if (service.ServiceHeading) {
          services.push(service.ServiceHeading);
        }

        if (service.ServiceList && Array.isArray(service.ServiceList)) {
          service.ServiceList.forEach((item: any, itemIndex: number) => {
            debugLog(`Processing ServiceList item ${itemIndex}`, item);

            if (typeof item === "string") {
              services.push(item);
            } else if (item && typeof item === "object") {
              if (item.ServiceListHeader) {
                services.push(item.ServiceListHeader);
              }
              if (
                item.ServiceListItems &&
                Array.isArray(item.ServiceListItems)
              ) {
                services.push(...item.ServiceListItems);
              }
            }
          });
        }
      });
    } catch (error) {
      debugLog("Error processing services", error);
      return [
        "Interior Painting",
        "Exterior Painting",
        "Cabinet Painting",
        "Commercial Painting",
      ];
    }

    // Remove duplicates and empty strings
    const uniqueServices = [
      ...new Set(services.filter((s) => s && s.trim().length > 0)),
    ];
    debugLog("Final processed services", uniqueServices);

    return uniqueServices.length > 0
      ? uniqueServices
      : [
          "Interior Painting",
          "Exterior Painting",
          "Cabinet Painting",
          "Commercial Painting",
        ];
  };

  const allServices = getAllServices();
  debugLog("Extracted Services", allServices);

  const serviceOfferings = {
    "@type": "OfferCatalog",
    name: "Painting Services",
    itemListElement: allServices.map((service: string) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        serviceType: service,
      },
    })),
  };
  debugLog("Service Offerings Schema", serviceOfferings);
  debugLog("Know About Services", allServices.slice(0, 20));

  // Ensure we have valid services for the business entity
  const businessServices =
    allServices.length > 0
      ? allServices
      : ["Interior Painting", "Exterior Painting", "Commercial Painting"];

  debugLog("Final Business Services", businessServices);
  debugLog("Business Services Length", businessServices.length);

  // Service areas with proper Place schema
  const serviceAreaPlaces =
    contractor?.service_area?.length > 0
      ? contractor.service_area
          .map((area: any) => {
            const aCity = toTitleCase(area?.city || "");
            const aState = toUSPS(area?.state || "");
            const zip = area?.zip || undefined;

            if (!aCity || !aState) return null;

            return {
              "@type": "City",
              name: aCity,
              address: {
                "@type": "PostalAddress",
                addressLocality: aCity,
                addressRegion: aState,
                postalCode: zip,
                addressCountry: "US",
              },
            };
          })
          .filter(Boolean)
      : [
          {
            "@type": "City",
            name: cityName,
            address: {
              "@type": "PostalAddress",
              addressLocality: cityName,
              addressRegion: stateCode,
              postalCode: contractor?.post_code || p.post_code,
              addressCountry: "US",
            },
          },
        ];

  // Extract Chooz score
  const choozScore = contractor?.scores?.[0]?.score
    ? Number(contractor.scores[0].score)
    : null;

  const platformReviewsScore = contractor?.platform_reviews?.[0]?.score
    ? Number(contractor.platform_reviews[0].score)
    : null;

  const reviewQeScore = contractor?.review_qe?.[0]?.score
    ? Number(contractor.review_qe[0].score)
    : null;

  const websiteDpScore = contractor?.website_dp?.[0]?.score
    ? Number(contractor.website_dp[0].score)
    : null;

  const businessCredibilityScore = contractor?.business_credibility?.[0]?.score
    ? Number(contractor.business_credibility[0].score)
    : null;

  // Additional properties without invalid valueReference
  const additionalProperties = [
    {
      "@type": "PropertyValue",
      name: "Profile Last Updated",
      identifier: "profileLastUpdated",
      value: formatDate(contractor?.updated_at),
    },
    choozScore && {
      "@type": "PropertyValue",
      name: "Scores",
      identifier: "scores",
      value: choozScore,
      unitText: "score/100",
      description:
        "Composite score based on external ratings, recency, velocity, and profile completeness",
    },
    platformReviewsScore && {
      "@type": "PropertyValue",
      name: "Platform Reviews",
      identifier: "platformReviews",
      value: platformReviewsScore,
      unitText: "score/100",
      description: "Score based on platform review ratings and engagement",
    },
    reviewQeScore && {
      "@type": "PropertyValue",
      name: "Review Quality & Engagement",
      identifier: "reviewQe",
      value: reviewQeScore,
      unitText: "score/100",
      description: "Score based on review quality and engagement metrics",
    },
    websiteDpScore && {
      "@type": "PropertyValue",
      name: "Website & Digital Presence",
      identifier: "websiteDp",
      value: websiteDpScore,
      unitText: "score/100",
      description: "Score based on website quality and digital presence",
    },
    businessCredibilityScore && {
      "@type": "PropertyValue",
      name: "Business Credibility",
      identifier: "businessCredibility",
      value: businessCredibilityScore,
      unitText: "score/100",
      description:
        "Score based on business credentials and credibility factors",
    },
    contractor?.reviews_last_checked && {
      "@type": "PropertyValue",
      name: "Reviews Last Checked",
      identifier: "reviewsLastChecked",
      value: formatDate(contractor.reviews_last_checked),
    },
  ].filter(Boolean);

  // Clean description by removing HTML tags for schema
  const cleanDescription = contractor?.description
    ? contractor.description
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim()
    : contractor?.seo_description ||
      `Professional ${categoryName.toLowerCase()} services in ${cityName}, ${stateCode}. Licensed, insured, and highly rated.`;

  // Prune empty values
  const prune = (obj: any): any =>
    JSON.parse(
      JSON.stringify(obj, (_, v) =>
        v === "" || v === null || v === undefined ? undefined : v,
      ),
    );

  // Create the LocalBusiness entity that will be the mainEntity
  const localBusinessEntity = prune({
    "@type": "LocalBusiness",
    "@id": `${contractorUrl}#business`,
    name: contractor?.title || `${cityName} ${categoryName}`,
    description: cleanDescription,
    telephone: contractor?.company_phone,
    email: contractor?.company_email,
    priceRange: "$",
    address: {
      "@type": "PostalAddress",
      streetAddress: contractor?.address,
      addressLocality: cityName,
      addressRegion: stateCode,
      postalCode: contractor?.post_code || p.post_code,
      addressCountry: "US",
    },
    url: contractor?.website,
    knowsAbout: businessServices,
    hasOfferCatalog: serviceOfferings,
    areaServed: serviceAreaPlaces,
    award: contractor?.awards?.map((award: any) => award.award),
    makesOffer: businessServices.slice(0, 10).map((service: string) => ({
      "@type": "Offer",
      name: service,
      itemOffered: {
        "@type": "Service",
        serviceType: service,
        name: service,
        description: `Professional ${service.toLowerCase()} services in ${cityName}, ${stateCode}`,
      },
      areaServed: serviceAreaPlaces.slice(0, 3),
      availability: "https://schema.org/InStock",
    })),
  });

  // Fixed schema with proper mainEntity structure
  const simplifiedSchema = prune({
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${contractorUrl}#profile`,
    url: contractorUrl,
    name: `${
      contractor?.title || `${cityName} ${categoryName}`
    } – Painter in ${cityName}, ${stateCode}`,
    description: cleanDescription,
    datePublished: formatDate(contractor?.created_at),
    dateModified: formatDate(contractor?.updated_at),
    additionalProperty: additionalProperties,
    // Fixed: Use mainEntity instead of about
    mainEntity: localBusinessEntity,
    isPartOf: {
      "@type": "WebSite",
      "@id": websiteId,
      name: "Chooz Landscapers Directory",
      url: "https://choozlandscapers.com",
    },
    publisher: {
      "@type": "Organization",
      "@id": orgId,
      name: "Chooz Landscapers",
      url: "https://choozlandscapers.com",
    },
  });

  return simplifiedSchema;
};
