"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { format, isValid, parseISO } from "date-fns";
// Components
import { FaqAccordion } from "@/components/FaqAccordion";
import ContractorGallery from "@/components/contractorPage/ContractorGallery";
import ContractorHeading from "@/components/contractorPage/ContractorHeading";
import ContractorSidebar from "@/components/contractorPage/ContractorSidebar";
// Hooks
import { useDevice } from "@/hooks/useDevice";
import { Contractor } from "@/type/contractor";
import axios from "axios";
import Score from "./popup/Score";

// Types
interface FAQ {
  visible: boolean;
  content: string;
}
interface RouteParams {
  category: string;
  state: string;
  city: string;
  slug: string;
}

const formatUrlPart = (text: string): string =>
  text.toLowerCase().replace(/\s+/g, "-").replace(/'/g, "");

// Utilities
const formatDate = (dateString: string | null | undefined): string | null => {
  if (!dateString) return null;
  try {
    const date = parseISO(dateString);
    return isValid(date) ? format(date, "MM-dd-yyyy") : null;
  } catch {
    return null;
  }
};

const validateRouteParams = (
  params: Partial<RouteParams>,
): params is RouteParams =>
  Boolean(params.category && params.state && params.city && params.slug);

// Claim banner
const ClaimListingBanner = ({ isMobile }: { isMobile: boolean }) => (
  <Link
    href="/free-directory-listing-offer"
    prefetch={false}
    className={`min-h-[60px] w-full bg-[#ffff00] text-black flex items-center justify-center ${
      isMobile ? "my-4" : "mt-4"
    }`}>
    <p className="font-roboto text-[20px] text-center py-3 px-5">
      Is this your painting company?{" "}
      <span className="underline ml-3">Claim your listing</span>
    </p>
  </Link>
);

const DescriptionSection = ({
  painter,
  formattedDescriptionDate,
}: {
  painter: any;
  formattedDescriptionDate: string | null;
}) => (
  <div className="mt-20">
    {formattedDescriptionDate && (
      <p className="text-[15px] font-bold text-gray-500">
        Updated: {formattedDescriptionDate}
      </p>
    )}
    <div className="about-text">
      {painter.description ? (
        <div
          className="mt-6 space-y-4 max-w-none"
          dangerouslySetInnerHTML={{ __html: painter.description }}
        />
      ) : (
        <div className="mt-6 space-y-4">
          <p className="mb-6">
            {painter.title} – Painting in {painter.city}, {painter.state}.
          </p>
          <p>
            Call to request an estimate:{" "}
            {painter.company_phone || "Contact for estimate"}
          </p>
        </div>
      )}
    </div>
  </div>
);

const QuestionAnswerSection = ({
  painter,
  formattedQADate,
}: {
  painter: any;
  formattedQADate: string | null;
}) => {
  if (!painter.question_answer) return null;
  return (
    <>
      <div className="border-b border-[#bdbdbd] my-14" />
      <div className="space-y-2">
        {formattedQADate && (
          <p className="text-[15px] font-bold text-gray-500">
            Updated: {formattedQADate}
          </p>
        )}
        <div className="about-text">
          <div
            className="space-y-4 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: painter.question_answer }}
          />
        </div>
      </div>
    </>
  );
};

const FAQSection = ({ painter }: { painter: any }) => {
  const visibleFAQs = useMemo(() => {
    if (!Array.isArray(painter.faq)) return [];
    return painter.faq.filter((f: FAQ) => f && f.visible);
  }, [painter.faq]);

  if (visibleFAQs.length === 0) return null;

  const faqItems = visibleFAQs.map((f: FAQ, i: number) => ({
    id: `faq-${i}`,
    content: f.content || "",
  }));

  return (
    <div className="mt-12 about-text">
      <FaqAccordion items={faqItems} companyName={painter.title || ""} />
    </div>
  );
};

const CompanyProfilePage = () => {
  const router = useRouter();
  const params = useParams() as Partial<RouteParams>;
  const { isMobile } = useDevice();
  const [isScoreOpen, setIsScoreOpen] = useState(false);
  const [painter, setPainter] = useState<Contractor | null>(null);
  const [loading, setLoading] = useState(true);

  const routeParams = useMemo(
    () => (validateRouteParams(params) ? params : null),
    [params],
  );

  useEffect(() => {
    const fetchProfileData = async () => {
      // Wait until we have complete params
      if (!routeParams) return;

      // Safeguard against encoding issues (especially city names)
      const { category, state, city, slug } = routeParams;
      const uCategory = encodeURIComponent(category);
      const uState = encodeURIComponent(state);
      const uCity = encodeURIComponent(city);
      const uSlug = encodeURIComponent(slug);

      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://chooz.api.choozbetter.com/api/landscapers/${uCategory}/${uState}/${uCity}/${uSlug}`,
          { validateStatus: () => true }, // handle status manually
        );

        if (!data) {
          router.replace("/404");
          return;
        }

        // If the API uses HTTP status codes, prefer checking them:
        if (data?.status === 404 || data?.error === "Not Found") {
          router.replace("/404");
          return;
        }

        // Some APIs put payload in data.data
        setPainter(data.data ?? data);
      } catch {
        // Network or unexpected error — choose your preferred UX:
        router.replace("/404");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [routeParams, router]);

  // Derived values (only when painter exists)
  const { formattedDescriptionDate, formattedQADate } = useMemo(() => {
    if (!painter)
      return { formattedDescriptionDate: null, formattedQADate: null };
    return {
      formattedDescriptionDate: formatDate(painter.date_last_updated_about),
      formattedQADate: formatDate(painter.date_last_updated_qa),
    };
  }, [painter?.date_last_updated_about, painter?.date_last_updated_qa]);

  // Show the claim banner if the listing is unclaimed AND not explicitly marked as "not_claimed=false"
  const shouldShowClaimBanner = !!(
    painter &&
    !painter.claimed &&
    !painter.not_claimed
  );

  useEffect(() => {
    if (!painter) return; // wait until data is available

    // slight delay to ensure dangerouslySetInnerHTML content is in the DOM
    const timer = setTimeout(() => {
      const paragraphs = document.querySelectorAll("p");

      paragraphs.forEach((p) => {
        if (p.textContent?.includes("Review Snippet Sources:")) {
          p.classList.add("review-snippet");
        }
      });
    }, 100); // 100ms small delay works well

    return () => clearTimeout(timer);
  }, [painter]); // 👈 depend on painter

  // Render flow
  if (!routeParams) {
    // Missing/invalid params — route to 404 in client
    router.replace("/404");
    return null;
  }

  if (painter && !painter.claimed && !painter.not_claimed) {
    router.replace("/404");
    return null;
  }

  if (loading) {
    return (
      <div className="container xl:max-w-[1340px] mx-auto px-5 md:pt-10 md:pb-20 py-5">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-2/3 bg-gray-200 rounded" />
          <div className="h-96 w-full bg-gray-200 rounded" />
          <div className="h-6 w-1/2 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (!painter) {
    // After loading, still no data — treat as 404
    router.replace("/404");
    return null;
  }

  const formattedCategory = formatUrlPart(painter.category || "");
  const formattedState = formatUrlPart(painter.state || "");
  const formattedCity = formatUrlPart(painter.city || "");
  const formattedSlug = painter.slug || "";

  // Main render
  return (
    <div className="container xl:max-w-[1340px] mx-auto px-5 pt-10 md:pb-20">
      <div className="flex items-start flex-col lg:flex-row justify-between gap-10 lg:gap-16 sm:mt-5">
        <div className="w-full">
          <ContractorHeading contractor={painter} />

          {isMobile && shouldShowClaimBanner && (
            <ClaimListingBanner isMobile={true} />
          )}

          <ContractorGallery
            contractor={painter}
            setIsScoreOpen={setIsScoreOpen}
          />

          {!isMobile && shouldShowClaimBanner && (
            <ClaimListingBanner isMobile={false} />
          )}

          {!isMobile && (
            <>
              <DescriptionSection
                painter={painter}
                formattedDescriptionDate={formattedDescriptionDate}
              />
              <QuestionAnswerSection
                painter={painter}
                formattedQADate={formattedQADate}
              />
              <FAQSection painter={painter} />
            </>
          )}
        </div>

        <ContractorSidebar painter={painter} setIsScoreOpen={setIsScoreOpen} />

        <Score
          isOpen={isScoreOpen}
          setIsOpen={setIsScoreOpen}
          title={painter.title}
          score={painter.scores?.[0]?.score ?? undefined}
          category={formattedCategory}
          state={formattedState}
          city={formattedCity}
          slug={formattedSlug}
          platform_reviews={painter.platform_reviews?.[0]?.score ?? undefined}
          /* if your data key is review_qa, use that; if it's review_qe, keep it consistent everywhere */
          review_qe={
            painter.review_qe?.[0]?.score ??
            painter.review_qe?.[0]?.score ??
            undefined
          }
          website_dp={painter.website_dp?.[0]?.score ?? undefined}
          business_credibility={
            painter.business_credibility?.[0]?.score ?? undefined
          }
        />
      </div>
    </div>
  );
};

export default CompanyProfilePage;
