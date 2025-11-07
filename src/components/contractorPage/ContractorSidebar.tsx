"use client";

import { useState } from "react";
import { Contractor } from "@/type/contractor";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { HiLink } from "react-icons/hi";
import FormContractor from "../FormContractor";
import ContractorMap from "./ContractorMap";
import { useDevice } from "@/hooks/useDevice";
import Image from "next/image";
import renderServicesCatalog from "./RenderServicesCatalog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

import BadgeVerified from "@/images/badge/chooz_landscrapers_verified_landscrapers.png";
import BadgeBestAward from "@/images/badge/chooz_landscrapers_top_landscrapers.png";
import BadgeTopAward from "@/images/badge/chooz_landscrapers_best_landscrapers.png";

import { ArrowRightIcon, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { FaqAccordion } from "../FaqAccordion";
import StarRating from "../StarRating";
import { Label } from "../ui/label";

interface ContractorSidebarProps {
  painter: Contractor;
  setIsScoreOpen: (open: boolean) => void;
}

const ContractorSidebar = ({
  painter,
  setIsScoreOpen,
}: ContractorSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isTablet } = useDevice();
  const [showMore, setShowMore] = useState(false);

  const groupedServiceAreas = painter?.service_area?.reduce((acc, area) => {
    const key = `${area.city}, ${area.state}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(area.zip);
    return acc;
  }, {} as Record<string, string[]>);

  let scoreColor = "";
  if (painter.scores?.some((score) => score.score >= 94)) {
    scoreColor = "bg-linear-to-br from-[#d3b651] via-[#e2d063] to-[#d3b651]";
  } else if (
    painter.scores?.some((score) => score.score >= 87 && score.score < 94)
  ) {
    scoreColor = "bg-linear-to-br from-[#d0cdce] via-[#eaeeed] to-[#dcdad7]";
  } else if (
    painter.scores?.some((score) => score.score >= 80 && score.score < 87)
  ) {
    scoreColor = "bg-transparent";
  }

  return (
    <>
      <aside className="w-full lg:max-w-[408px] space-y-5">
        {/* Score & Awards Section */}
        {painter.scores?.some((score) => score.visible) && (
          <div
            className={`${scoreColor} border-2 border-[#292c78] w-full mb-12 md:mb-5 mt-8 md:mt-0 rounded-xl overflow-hidden`}>
            <div className="flex gap-4 px-6 py-4">
              {painter.scores
                ?.filter((review) => review.visible)
                .map((score, index) => (
                  <Label
                    key={index}
                    className="flex-1 flex-col justify-center items-start gap-0 text-[32px] text-[#292c78] font-extrabold min-h-[65px]">
                    <span className="block text-[20px]">Chooz Score</span>
                    <span className="block">{score.score} / 100</span>
                  </Label>
                ))}
              {Array.isArray(painter.awards) &&
                painter.awards
                  .filter((award) => award.visible)
                  .map((award, index) => (
                    <div key={index}>
                      {painter.scores?.map((score, i) => (
                        <div key={i}>
                          {score.score >= 94 && (
                            <Image
                              src={BadgeBestAward}
                              alt={`${
                                painter.title
                              } has been given a Chooz Landscapers ${
                                award || "Award"
                              } in gold badge in 2025`}
                              width={90}
                              height={90}
                              priority
                              className="w-[90px] h-[90px] object-contain"
                            />
                          )}
                          {score.score >= 87 && score.score < 94 && (
                            <Image
                              src={BadgeTopAward}
                              alt={`${
                                painter.title
                              } has been given a Chooz Landscapers ${
                                award || "Award"
                              } in silver badge in 2025`}
                              width={90}
                              height={90}
                              priority
                              className="w-[90px] h-[90px] object-contain"
                            />
                          )}
                          {score.score >= 80 && score.score < 87 && (
                            <Image
                              src={BadgeVerified}
                              priority
                              alt={
                                "Chooz Landscapers Certified badge in 2025 for S & M Painter & Drywall Co"
                              }
                              width={85}
                              height={85}
                              className="w-[85px] h-[85px] object-contain p-1"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
            </div>

            <div className="bg-white space-y-6 p-6">
              {painter.platform_reviews?.[0]?.score && (
                <h5 className="text-[#292c78] text-sm flex items-center justify-between gap-3 font-extrabold">
                  <span>Platform Reviews</span>
                  <a
                    href="#platform_reviews"
                    onClick={() => setIsScoreOpen(true)}
                    className="whitespace-nowrap text-white bg-[#282b77] px-2 py-1 rounded text-center min-w-[75px]">
                    {painter.platform_reviews?.[0]?.score ?? undefined} / 20
                  </a>
                </h5>
              )}
              {painter.review_qe?.[0]?.score && (
                <h5 className="text-[#292c78] text-sm flex items-center justify-between gap-3 font-extrabold">
                  <span>Review Quality & Engagement</span>
                  <a
                    href="#review_qe"
                    onClick={() => setIsScoreOpen(true)}
                    className="whitespace-nowrap text-white bg-[#282b77] px-2 py-1 rounded text-center min-w-[75px]">
                    {painter.review_qe?.[0]?.score ?? undefined} / 40
                  </a>
                </h5>
              )}
              {painter.website_dp?.[0]?.score && (
                <h5 className="text-[#292c78] text-sm flex items-center justify-between gap-3 font-extrabold">
                  <span>Website & Digital Presence</span>
                  <a
                    href="#website_dp"
                    onClick={() => setIsScoreOpen(true)}
                    className="whitespace-nowrap text-white bg-[#282b77] px-2 py-1 rounded text-center min-w-[75px]">
                    {painter.website_dp?.[0]?.score ?? undefined} / 25
                  </a>
                </h5>
              )}
              {painter.business_credibility?.[0]?.score && (
                <h5 className="text-[#292c78] text-sm flex items-center justify-between gap-3 font-extrabold">
                  <span>Business Credibility</span>
                  <a
                    href="#business_credibility"
                    onClick={() => setIsScoreOpen(true)}
                    className="whitespace-nowrap text-white bg-[#282b77] px-2 py-1 rounded text-center min-w-[75px]">
                    {painter.business_credibility?.[0]?.score ?? undefined} / 15
                  </a>
                </h5>
              )}

              <div className="pt-5 mb-2!">
                <button
                  onClick={() => setIsOpen(true)}
                  className="w-full button-gradient-orange">
                  <span>Contact This Painter</span>
                  <ChevronRight className="text-white" size={30} />
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsScoreOpen(true)}
                  className="cursor-pointer text-[#292c78] text-sm font-extrabold border-b-2">
                  scoring system
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="lg:mt-8 mb-8">
          <h2 className="heading-contractor text-[26px]!">Company Details</h2>
          <ul className="mb-4 space-y-2">
            <li>
              {painter.google_bp && (
                <Link
                  href={painter.google_bp}
                  target="_blank"
                  className="flex justify-start gap-2 text-(--clr-tertiary) text-base font-bold">
                  <FaLocationDot className="text-[#2d3e53] mt-1" />
                  <span>
                    {painter.address && <>{painter.address}, </>}
                    {painter.city && <>{painter.city}, </>}
                    {painter.state}{" "}
                    {painter.post_code && <>{painter.post_code}</>}
                  </span>
                </Link>
              )}
            </li>
            <li>
              {painter.company_phone && (
                <Link
                  href={`tel:${painter.company_phone}`}
                  className="flex justify-start gap-2 text-(--clr-tertiary) text-base font-bold">
                  <FaPhoneAlt className="text-[#2d3e53] mt-1" />
                  <span>{painter.company_phone}</span>
                </Link>
              )}
            </li>
            <li>
              {painter.website && (
                <Link
                  href={painter.website}
                  target="_blank"
                  className="flex justify-start gap-2 text-(--clr-tertiary) text-base font-bold">
                  <HiLink className="text-[#2d3e53] mt-1" />
                  <span>{painter.website}</span>
                </Link>
              )}
            </li>
          </ul>
        </div>

        {/* Contact This Painter */}
        {!painter.scores?.some((score) => score.visible) && (
          <div className="mb-12">
            <button
              onClick={() => setIsOpen(true)}
              className="w-full button-gradient-orange">
              <span>Contact This Painter</span>
              <ChevronRight className="text-white" size={30} />
            </button>
          </div>
        )}

        {/* Other Reviews & Ratings Section */}
        <div className="mt-8 mb-8">
          <hr className="mb-4 border-[#bdbdbd]" />
          <h2 className="heading-contractor">Other Reviews & Ratings</h2>

          <div className="space-y-6">
            {!painter.google_reviews?.some((review) => review.visible) &&
              !painter.facebook_reviews?.some((review) => review.visible) &&
              !painter.yelp_reviews?.some((review) => review.visible) &&
              !painter.angi_reviews?.some((review) => review.visible) &&
              !painter.homeadvisor_reviews?.some((review) => review.visible) &&
              !painter.bbb_reviews?.some((review) => review.visible) &&
              !painter.google_review_url && (
                <p>
                  Reviews will show once the painting company claims this
                  listing page.
                </p>
              )}

            {painter.google_review_url && (
              <div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={painter.google_review_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-(--clr-tertiary) text-base font-bold">
                    Google
                  </a>

                  <div className="flex items-center space-x-2 text-[15px]">
                    <span className="font-bold text-(--clr-secondary) text-[14px] mt-0.5">
                      {painter.google_review_star_rating?.toFixed(1) || "5"}
                    </span>

                    <StarRating
                      rating={painter.google_review_star_rating || 0}
                      className="text-(--clr-secondary)"
                    />

                    <span className="text-gray-700 text-[14px]">
                      ({painter.google_review_count || 0} reviews)
                    </span>
                  </div>
                </div>
                {painter.google_review_title && (
                  <p className="text-[11px] text-gray-400">
                    {painter.google_review_title}
                  </p>
                )}
              </div>
            )}
            {/* Google Reviews */}
            {painter.google_reviews
              ?.filter((review) => review.visible)
              .map((review, index) => (
                <div key={index}>
                  <div className="flex items-center flex-wrap gap-3">
                    <a
                      href={review.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-(--clr-tertiary) text-base font-bold">
                      Google
                    </a>

                    <div className="flex items-center space-x-2 text-[15px]">
                      <span className="font-bold text-(--clr-secondary) text-[14px] mt-0.5">
                        {review.rating?.toFixed(1) || "5"}
                      </span>

                      <StarRating
                        rating={review.rating || 0}
                        className="text-(--clr-secondary)"
                      />

                      <span className="text-gray-700 text-[14px]">
                        ({review.count || 0} reviews)
                      </span>
                    </div>
                  </div>
                  {review.title && (
                    <p className="text-[11px] text-gray-400">{review.title}</p>
                  )}
                </div>
              ))}

            {/* Facebook Reviews */}
            {painter.facebook_reviews
              ?.filter((review) => review.visible)
              .map((review, index) => (
                <div key={index} className="flex items-center flex-wrap gap-3">
                  <a
                    href={review.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-(--clr-tertiary) text-base font-bold">
                    Facebook
                  </a>

                  {review.recommended && (
                    <p className="mb-0! text-sm">
                      <span className="text-(--clr-secondary) font-bold">
                        {review.recommended}%
                      </span>{" "}
                      Recommended (<span>{review.count}</span> Reviews)
                    </p>
                  )}
                </div>
              ))}

            {/* Yelp Reviews */}
            {painter.yelp_reviews
              ?.filter((review) => review.visible)
              .map((review, index) => (
                <div key={index} className="flex items-center flex-wrap gap-3">
                  <a
                    href={review.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-(--clr-tertiary) text-base font-bold">
                    Yelp
                  </a>

                  <div className="flex items-center space-x-2 text-[15px]">
                    <span className="font-bold text-(--clr-secondary) text-[14px] mt-0.5">
                      {review.rating.toFixed(1) || "5"}
                    </span>

                    <StarRating
                      rating={review.rating || 0}
                      className="text-(--clr-secondary)"
                    />

                    <span className="text-gray-700 text-[14px]">
                      ({review.count} reviews)
                    </span>
                  </div>
                </div>
              ))}

            {/* Angi Reviews */}
            {painter.angi_reviews
              ?.filter((review) => review.visible)
              .map((review, index) => (
                <div key={index} className="flex items-center flex-wrap gap-3">
                  <a
                    href={review.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-(--clr-tertiary) text-base font-bold">
                    Angi
                  </a>

                  <div className="flex items-center space-x-2 text-[15px]">
                    <span className="font-bold text-(--clr-secondary) text-[14px] mt-0.5">
                      {review.rating.toFixed(1) || "5"}
                    </span>

                    <StarRating
                      rating={review.rating || 0}
                      className="text-(--clr-secondary)"
                    />

                    <span className="text-gray-700 text-[14px]">
                      ({review.count} reviews)
                    </span>
                  </div>
                </div>
              ))}

            {/* HomeAdvisor Reviews */}
            {painter.homeadvisor_reviews
              ?.filter((review) => review.visible)
              .map((review, index) => (
                <div key={index} className="flex items-center flex-wrap gap-3">
                  <a
                    href={review.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-(--clr-tertiary) text-base font-bold">
                    HomeAdvisor
                  </a>

                  <div className="flex items-center space-x-2 text-[15px]">
                    <span className="font-bold text-(--clr-secondary) text-[14px] mt-0.5">
                      {review.rating.toFixed(1) || "5"}
                    </span>

                    <StarRating
                      rating={review.rating || 0}
                      className="text-(--clr-secondary)"
                    />

                    <span className="text-gray-700 text-[14px]">
                      ({review.count} reviews)
                    </span>
                  </div>
                </div>
              ))}

            {/* BBB Reviews */}
            {painter.bbb_reviews
              ?.filter((review) => review.visible)
              .map((review, index) => (
                <div key={index} className="flex items-center flex-wrap gap-3">
                  <a
                    href={review.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-(--clr-tertiary) text-base font-bold">
                    BBB
                  </a>

                  <div className="flex items-center space-x-2 text-[15px]">
                    <span className="font-bold text-(--clr-secondary) text-[14px] mt-0.5 uppercase">
                      {review.grade}
                    </span>
                    <span className="text-gray-700 text-[14px]">
                      Rating{review.rating > 0 && " |"}
                    </span>
                    {review.rating > 0 && (
                      <>
                        <span className="font-bold text-(--clr-secondary) text-[14px] mt-0.5">
                          {review.rating.toFixed(1) || "5"}
                        </span>

                        <StarRating
                          rating={review.rating || 0}
                          className="text-(--clr-secondary)"
                        />

                        <span className="text-gray-700 text-[14px]">
                          ({review.count} reviews)
                        </span>
                      </>
                    )}
                  </div>
                </div>
              ))}

            {painter.google_reviews?.some((review) => review.visible) ||
            painter.facebook_reviews?.some((review) => review.visible) ||
            painter.yelp_reviews?.some((review) => review.visible) ||
            painter.angi_reviews?.some((review) => review.visible) ||
            painter.homeadvisor_reviews?.some((review) => review.visible) ||
            painter.bbb_reviews?.some((review) => review.visible)
              ? painter.reviews_last_checked && (
                  <p className="text-[11px] text-gray-400">
                    * Reviews Last Checked:{" "}
                    {painter.reviews_last_checked
                      ? format(
                          new Date(painter.reviews_last_checked),
                          "MM-dd-yyyy",
                        )
                      : ""}
                  </p>
                )
              : ""}
          </div>
        </div>

        {/* About Section Mobile */}
        {isTablet && (
          <div className="mt-8 mb-12 about-text">
            <hr className="mb-4 border-[#bdbdbd]" />
            {painter.date_last_updated_about && (
              <p className="text-[15px] font-bold text-gray-500 mt-8">
                Updated:{" "}
                {painter.date_last_updated_about
                  ? format(
                      new Date(painter.date_last_updated_about),
                      "MM-dd-yyyy",
                    )
                  : ""}
              </p>
            )}
            <div className="about-text">
              {painter.description ? (
                <div
                  className="mt-6 space-y-4 max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: painter.description,
                  }}
                />
              ) : (
                <>
                  <p className="mb-6">
                    {painter.title} - Painting in {painter.city} City,{" "}
                    {painter.state}.
                  </p>
                  <p>Call to request an estimate: {painter.company_phone}</p>
                </>
              )}

              {painter.question_answer && (
                <div className="border-b border-[#bdbdbd] my-14" />
              )}

              {painter.question_answer && (
                <div className=" space-y-2">
                  {painter.date_last_updated_qa && (
                    <p className="text-[15px] font-bold text-gray-500">
                      Updated:{" "}
                      {painter.date_last_updated_qa
                        ? format(
                            new Date(painter.date_last_updated_qa),
                            "MM-dd-yyyy",
                          )
                        : ""}
                    </p>
                  )}

                  <div
                    className=" space-y-4 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: painter.question_answer,
                    }}
                  />
                </div>
              )}
              {Array.isArray(painter.faq) &&
                painter.faq.some((f) => f.visible) && (
                  <div className="mt-12">
                    <FaqAccordion
                      items={painter.faq
                        .filter((f) => f.visible) // only show those marked visible
                        .map((f, i) => ({
                          id: `faq-${i}`,
                          content: f.content,
                        }))}
                      companyName={painter.title}
                    />
                  </div>
                )}
            </div>
          </div>
        )}

        {/* Services Section */}
        {renderServicesCatalog({
          contractorServices: painter.services || [],
        })}

        {/* Service Area Section */}

        <div>
          <hr className="mb-8 border-[#bdbdbd]" />
          <h2 className="heading-contractor">Service Area</h2>
          {painter.service_area?.length ? (
            <>
              <Accordion type="multiple" className="w-full">
                {(showMore
                  ? Object.entries(groupedServiceAreas || {})
                  : Object.entries(groupedServiceAreas || {}).slice(0, 4)
                ).map(([location, zips], index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="mb-2">
                    <AccordionTrigger className="text-left text-[15px] font-bold">
                      <Link
                        href={`/${location
                          .split(", ")[1]
                          .toLowerCase()}/${location
                          .split(", ")[0]
                          .toLowerCase()
                          .replace(" ", "-")}/painting-contractors`}>
                        {location}
                      </Link>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-4 text-[15px] space-y-3 flex flex-wrap gap-x-8">
                        {zips.map((zip, i) => (
                          <li key={i}>{zip}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {Object.entries(groupedServiceAreas || {}).length > 4 && (
                <button
                  type="button"
                  onClick={() => setShowMore((prev) => !prev)}
                  className="text-sm font-bold text-[#007bff] hover:text-[#0056b3] focus:outline-none cursor-pointer mt-2">
                  {showMore ? "See less" : "See all"}
                </button>
              )}
            </>
          ) : (
            <p>
              Service Area will show once the painting company claims this
              listing page.
            </p>
          )}
        </div>

        <hr className="my-10 border-[#bdbdbd]" />

        {/* Map Section  */}
        <ContractorMap painter={painter} />

        {/* Disclaimer Section */}
        <div className="mt-12">
          <hr className="mb-4 border-[#bdbdbd]" />
          <h3 className="heading-contractor">DISCLAIMER</h3>
          <p className="text-xs">
            This site is a free service to assist homeowners in connecting with
            local service contractors. All contractors are independent and this
            site does not warrant or guarantee any work performed. It is the
            responsibility of the homeowner to verify that the hired contractor
            furnishes the necessary license and insurance required for the work
            being performed.
          </p>
          {painter.claimed && (
            <p className="text-xs">
              <span className="text-red-700 text-[15px]">*</span> We post the
              date of the last review check, and we do our best to keep these
              Google review statistics, up-to-date and accurate. However, if you
              want want completely accuracy, click on Google button to go
              directly to that painting company’s review profile.
            </p>
          )}
        </div>
      </aside>

      <FormContractor
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        contractorName={painter.title || ""}
      />
    </>
  );
};

export default ContractorSidebar;
