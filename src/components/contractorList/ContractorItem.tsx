"use client";

import { useState } from "react";
import { Contractor } from "@/type/contractor";
import ImageModalSlider from "@/components/ImageModalSlider";

import { FaLocationDot } from "react-icons/fa6";
import { HiLink } from "react-icons/hi";
import { FaPhoneAlt } from "react-icons/fa";
import { BsEnvelopeFill, BsPersonFill } from "react-icons/bs";
import Link from "next/link";
import FormContractor from "../FormContractor";
import Image from "next/image";
import { Label } from "../ui/label";

import BadgeVerified from "@/images/badge/chooz_landscrapers_verified_landscrapers.png";
import BadgeBestAward from "@/images/badge/chooz_landscrapers_top_landscrapers.png";
import BadgeTopAward from "@/images/badge/chooz_landscrapers_best_landscrapers.png";

import { useDevice } from "@/hooks/useDevice";
import { format } from "date-fns";
import { Play } from "lucide-react";
import StarRating from "../StarRating";
import Score from "../popup/Score";

const formatUrlPart = (text: string): string =>
  text.toLowerCase().replace(/\s+/g, "-").replace(/'/g, "");

const fallbackImageLogo =
  "https://imagedelivery.net/6JkaVsfAvbV7M0nIAmm2-g/8b4ebca8-c7e5-43a2-7c4b-891ee1a0bd00/public";
const fallbackImage =
  "https://imagedelivery.net/6JkaVsfAvbV7M0nIAmm2-g/6c9c85be-bb9f-469f-7fad-7172060b6200/public";

const ContractorItem = ({ contractor }: { contractor: Contractor }) => {
  const { isTablet } = useDevice();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isReadMore, setIsReadMore] = useState(false);
  const [isReadMoreReview, setIsReadMoreReview] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isScoreOpen, setIsScoreOpen] = useState(false);

  const hasCompanyImages = contractor.gallery && contractor.gallery.length > 0;
  const fallbackImages = new Array(4).fill(fallbackImage);
  const hasVideo = contractor.video && contractor.video.length > 0;

  let logoImage: string = fallbackImageLogo;

  if (typeof contractor.logo === "string") {
    logoImage = contractor.logo;
  } else if (Array.isArray(contractor.logo)) {
    logoImage = contractor.logo[0]?.url || fallbackImageLogo;
  } else if (contractor.logo && typeof contractor.logo === "object") {
    // @ts-expect-error because logo may be object with url
    logoImage = contractor.logo.url || fallbackImageLogo;
  }

  // ✅ Always strings for gallery
  const galleryImages = hasCompanyImages
    ? contractor.gallery?.map((img) =>
        typeof img === "string" ? img : img.url,
      ) ?? []
    : fallbackImages;

  // ✅ Final array: logo at index 0, gallery after
  const images = [logoImage, ...galleryImages];

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const openVideoModal = () => setIsVideoModalOpen(true);
  const closeVideoModal = () => setIsVideoModalOpen(false);

  const showPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const showNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const formattedCategory = formatUrlPart(contractor.category || "");
  const formattedState = formatUrlPart(contractor.state || "");
  const formattedCity = formatUrlPart(contractor.city || "");
  const formattedSlug = contractor.slug || "";

  const maxGalleryImages = hasVideo ? 3 : 4;
  const displayedGalleryImages = images.slice(1).slice(0, maxGalleryImages);

  let scoreColor = "";
  if (contractor.scores?.some((score) => score.score >= 94)) {
    scoreColor = "bg-linear-to-br from-[#d3b651] via-[#e2d063] to-[#d3b651]";
  } else if (
    contractor.scores?.some((score) => score.score >= 87 && score.score < 94)
  ) {
    scoreColor = "bg-linear-to-br from-[#d0cdce] via-[#eaeeed] to-[#dcdad7]";
  } else if (
    contractor.scores?.some((score) => score.score >= 80 && score.score < 87)
  ) {
    scoreColor = "bg-transparent";
  }

  return (
    <div className="mt-12 shadow-xl border border-gray-200 rounded-2xl px-3 py-6 lg:p-10">
      <div className="flex flex-col lg:flex-row items-stretch justify-between gap-10">
        <div className="w-full lg:w-[calc(90%-305px)] flex flex-col lg:flex-row justify-start gap-x-16 gap-y-8">
          {isTablet && contractor.scores?.some((score) => score.visible) && (
            <>
              <div className="w-full lg:w-[60%]">
                <h2 className="text-[32px] font-extrabold mb-2 font-poppins text-(--clr-heading-2)">
                  {contractor.title}
                </h2>
                <ul className="mb-4 space-y-2">
                  <li>
                    {contractor.google_bp && (
                      <Link
                        href={contractor.google_bp}
                        target="_blank"
                        className="flex justify-start gap-2 text-(--clr-tertiary) text-base font-bold">
                        <FaLocationDot className="text-[#2d3e53] mt-1" />
                        <span>
                          {contractor.address && <>{contractor.address}, </>}
                          {contractor.city && <>{contractor.city}, </>}
                          {contractor.state}{" "}
                          {contractor.post_code && <>{contractor.post_code}</>}
                        </span>
                      </Link>
                    )}
                  </li>
                  <li>
                    {contractor.company_phone && (
                      <Link
                        href={`tel:${contractor.company_phone}`}
                        className="flex justify-start gap-2 text-(--clr-tertiary) text-base font-bold">
                        <FaPhoneAlt className="text-[#2d3e53] mt-1" />
                        <span>{contractor.company_phone}</span>
                      </Link>
                    )}
                  </li>
                  <li>
                    {contractor.website && (
                      <Link
                        href={contractor.website}
                        target="_blank"
                        className="flex justify-start gap-2 text-(--clr-tertiary) text-base font-bold">
                        <HiLink className="text-[#2d3e53] mt-1" />
                        <span>{contractor.website}</span>
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
            </>
          )}
          <Image
            src={
              (Array.isArray(contractor.logo) && contractor.logo[0]?.url) ||
              fallbackImageLogo
            }
            alt={
              (Array.isArray(contractor.logo) && contractor.logo[0]?.alt) ||
              "White Chooz Landscapers logo placeholder"
            }
            onClick={() => openModal(0)}
            width={350}
            height={200}
            className="cursor-pointer w-full max-w-[330px] h-[181px] object-contain rounded-xl"
          />
          {!isTablet && (
            <div className="w-full lg:w-[60%]">
              <h2 className="text-[32px] font-extrabold mb-2 font-poppins text-(--clr-heading-2)">
                {contractor.title}
              </h2>
              <ul className="mb-4 space-y-2">
                <li>
                  {contractor.google_bp && (
                    <Link
                      href={contractor.google_bp}
                      target="_blank"
                      className="flex justify-start gap-2 text-(--clr-tertiary) text-base font-bold">
                      <FaLocationDot className="text-[#2d3e53] mt-1" />
                      <span>
                        {contractor.address && <>{contractor.address}, </>}
                        {contractor.city && <>{contractor.city}, </>}
                        {contractor.state}{" "}
                        {contractor.post_code && <>{contractor.post_code}</>}
                      </span>
                    </Link>
                  )}
                </li>
                <li>
                  {contractor.company_phone && (
                    <Link
                      href={`tel:${contractor.company_phone}`}
                      className="flex justify-start gap-2 text-(--clr-tertiary) text-base font-bold">
                      <FaPhoneAlt className="text-[#2d3e53] mt-1" />
                      <span>{contractor.company_phone}</span>
                    </Link>
                  )}
                </li>
                <li>
                  {contractor.website && (
                    <Link
                      href={contractor.website}
                      target="_blank"
                      className="flex justify-start gap-2 text-(--clr-tertiary) text-base font-bold">
                      <HiLink className="text-[#2d3e53] mt-1" />
                      <span>{contractor.website}</span>
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="w-full lg:w-[305px]">
          {contractor.scores?.some((score) => score.visible) && (
            <div
              onClick={() => setIsScoreOpen(true)}
              className={`${scoreColor} cursor-pointer border-2 border-[#292c78] flex items-center gap-4 mb-5 rounded-xl px-4 py-2 `}>
              {contractor.scores
                ?.filter((review) => review.visible)
                .map((score, index) => (
                  <Label
                    key={index}
                    className="cursor-pointer flex-1 flex-col justify-center gap-0 text-[32px] text-[#292c78] font-extrabold min-h-[65px]">
                    <span className="block text-[20px]">Chooz Score</span>
                    <span className="block">{score.score} / 100</span>
                  </Label>
                ))}
              {Array.isArray(contractor.awards) &&
                contractor.awards
                  .filter((award) => award.visible)
                  .map((award, index) => (
                    <div key={index}>
                      {contractor.scores?.map((score, i) => (
                        <div key={i}>
                          {score.score >= 94 && (
                            <Image
                              src={BadgeBestAward}
                              alt={`${
                                contractor.title
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
                                contractor.title
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
          )}

          <div className="flex justify-between gap-4 mt-3">
            <Link
              href={`/${formattedCategory}/${formattedState}/${formattedCity}/${formattedSlug}`}
              className="button-border w-full">
              <BsPersonFill className="text-xl" />
              Profile
            </Link>
            <button
              onClick={() => setIsOpenForm(true)}
              className="button-border w-full cursor-pointer">
              <BsEnvelopeFill className="text-xl" />
              Message
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 bg-[#f5f6f8] border border-gray-100 rounded-2xl px-3 pt-3 pb-6 md:p-5 flex flex-col lg:flex-row items-stretch justify-between gap-y-5">
        <div className="flex-1 grid grid-cols-2 gap-4 relative h-full">
          {/* Video Thumbnail */}
          {hasVideo && (
            <div
              onClick={openVideoModal}
              className="relative w-full border border-[#efecf3] rounded-xl h-[115px] bg-black cursor-pointer overflow-hidden group">
              <iframe
                src={contractor.video[0].url}
                title={contractor.video[0].title || "Company Video"}
                className="w-full h-full pointer-events-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                  <Play className="w-5 h-5 text-black ml-0.5" />
                </div>
              </div>
            </div>
          )}

          {displayedGalleryImages.map((img, idx) => (
            <Image
              key={idx}
              src={img}
              alt={`${contractor.title || "Painting Company"} gallery image`}
              onClick={() => openModal(idx + 1)}
              width={200}
              height={200}
              className="w-full h-[100px] object-cover rounded-xl cursor-pointer"
            />
          ))}

          {(hasVideo ? images.length > 4 : images.length > 5) && (
            <button
              onClick={() => {
                setCurrentIndex(5 - (hasVideo ? 1 : 0));
                setIsOpen(true);
              }}
              className="cursor-pointer absolute top-1/2 -translate-y-1/2 -right-4 w-[50px] h-[50px] shadow-sm shadow-black/50 rounded-full bg-white/50 text-black backdrop-blur grid place-content-center">
              +{images.length - 5 + (hasVideo ? 1 : 0)}
            </button>
          )}
        </div>

        <div className="hidden lg:block border border-[#e4e5e7] mx-[50px]" />

        {/* About */}
        <div className="flex-1 pt-5 about-text listing-about-text">
          {contractor.description ? (
            <>
              <div
                className={`overflow-hidden ${
                  isReadMore ? "" : "h-[185px] md:h-[165px]"
                }`}
                dangerouslySetInnerHTML={{
                  __html: contractor.description.replace(
                    /<h2[^>]*>.*?<\/h2>/gi,
                    "<h2 class='listing-about-title'>About</h2>",
                  ),
                }}></div>

              {contractor.description.split(" ").length > 20 && (
                <button
                  onClick={() => setIsReadMore(!isReadMore)}
                  className="text-blue-600 font-medium cursor-pointer text-[16px]">
                  {isReadMore ? "see less" : "see more"}
                </button>
              )}
            </>
          ) : (
            <>
              <p className="mb-4">
                {contractor.title} - Painting in {contractor.city} City,{" "}
                {contractor.state}.
              </p>
              <p>Call to request an estimate: {contractor.company_phone}</p>
            </>
          )}
        </div>

        <div className="hidden lg:block border border-[#e4e5e7] mx-[50px]" />

        {isTablet && <hr className="border-[#e4e5e7]" />}

        {/* Other Reviews & Ratings */}
        <div className="flex-1 md:pt-5 pb-5 md:pb-0 relative">
          <h3 className="heading-contractor">Other Reviews & Ratings</h3>
          <div className="space-y-5">
            <div
              className={
                "space-y-3 overflow-hidden " +
                (isReadMoreReview ? "" : "h-[77px]")
              }>
              {!contractor.google_reviews?.some((review) => review.visible) &&
                !contractor.facebook_reviews?.some(
                  (review) => review.visible,
                ) &&
                !contractor.yelp_reviews?.some((review) => review.visible) &&
                !contractor.angi_reviews?.some((review) => review.visible) &&
                !contractor.homeadvisor_reviews?.some(
                  (review) => review.visible,
                ) &&
                !contractor.bbb_reviews?.some((review) => review.visible) &&
                !contractor.google_review_url && (
                  <p>
                    Reviews will show once the painting company claims this
                    listing page.
                  </p>
                )}

              {/* Google Reviews */}
              {contractor.google_review_url && (
                <div className="flex items-center flex-wrap gap-3">
                  <a
                    href={contractor.google_review_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-(--clr-tertiary) text-base font-bold">
                    Google
                  </a>

                  <div className="flex items-center space-x-2 text-[15px]">
                    <span className="font-bold text-(--clr-secondary) text-[14px] mt-0.5">
                      {contractor.google_review_star_rating?.toFixed(1) || "5"}
                    </span>

                    <StarRating
                      rating={contractor.google_review_star_rating || 0}
                      className="text-(--clr-secondary)"
                    />

                    <span className="text-gray-700 text-[14px]">
                      ({contractor.google_review_count || 0} reviews)
                    </span>
                  </div>
                </div>
              )}

              {contractor.google_reviews
                ?.filter((review) => review.visible)
                .map((review, index) => (
                  <div
                    key={index}
                    className="flex items-center flex-wrap gap-3">
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
                ))}

              {/* Facebook Reviews */}
              {contractor.facebook_reviews
                ?.filter((review) => review.visible)
                .map((review, index) => (
                  <div
                    key={index}
                    className="flex items-center flex-wrap gap-3">
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
              {contractor.yelp_reviews
                ?.filter((review) => review.visible)
                .map((review, index) => (
                  <div
                    key={index}
                    className="flex items-center flex-wrap gap-3">
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
              {contractor.angi_reviews
                ?.filter((review) => review.visible)
                .map((review, index) => (
                  <div
                    key={index}
                    className="flex items-center flex-wrap gap-3">
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
              {contractor.homeadvisor_reviews
                ?.filter((review) => review.visible)
                .map((review, index) => (
                  <div
                    key={index}
                    className="flex items-center flex-wrap gap-3">
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
              {contractor.bbb_reviews
                ?.filter((review) => review.visible)
                .map((review, index) => (
                  <div
                    key={index}
                    className="flex items-center flex-wrap gap-3">
                    <a
                      href={review.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-(--clr-tertiary) text-base font-bold">
                      BBB Reviews
                    </a>

                    <div className="flex items-center space-x-2 text-[15px]">
                      <span className="font-bold text-(--clr-secondary) text-[14px] mt-0.5 uppercase">
                        {review.grade}
                      </span>
                      <span className="text-gray-700 text-[14px]">
                        Rating |{" "}
                      </span>
                      <span className="font-bold text-(--clr-secondary) text-[14px] mt-0.5">
                        {review.rating}
                      </span>
                      <span className="text-gray-700 text-[14px]">
                        ({review.count} reviews)
                      </span>
                    </div>
                  </div>
                ))}
            </div>

            <div>
              <button
                onClick={() => setIsReadMoreReview(!isReadMoreReview)}
                className="text-blue-600 font-medium cursor-pointer text-[16px]">
                {isReadMoreReview ? "see less" : "see more"}
              </button>
            </div>

            {contractor.google_reviews?.some((review) => review.visible) ||
            contractor.facebook_reviews?.some((review) => review.visible) ||
            contractor.yelp_reviews?.some((review) => review.visible) ||
            contractor.angi_reviews?.some((review) => review.visible) ||
            contractor.homeadvisor_reviews?.some((review) => review.visible) ||
            contractor.bbb_reviews?.some((review) => review.visible)
              ? contractor.reviews_last_checked && (
                  <p className="text-[11px] text-gray-400 absolute bottom-[-15px] left-0">
                    * Reviews Last Checked:{" "}
                    {contractor.reviews_last_checked
                      ? format(
                          new Date(contractor.reviews_last_checked),
                          "MM-dd-yyyy",
                        )
                      : ""}
                  </p>
                )
              : ""}
          </div>
        </div>
      </div>
      {/* Image Modal */}
      <ImageModalSlider
        images={images}
        currentIndex={currentIndex}
        isOpen={isOpen}
        onClose={closeModal}
        onPrev={showPrev}
        onNext={showNext}
        goToIndex={setCurrentIndex}
      />
      {/* Video Modal */}
      {isVideoModalOpen && hasVideo && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={closeVideoModal}>
          <div
            className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeVideoModal}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors">
              ✕
            </button>
            <iframe
              src={contractor.video[0].url}
              title={contractor.video[0].title || "Company Video"}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
      <FormContractor
        isOpen={isOpenForm}
        setIsOpen={setIsOpenForm}
        contractorName={contractor.title || ""}
      />
      
      <Score
        isOpen={isScoreOpen}
        setIsOpen={setIsScoreOpen}
        title={contractor.title}
        score={contractor.scores?.[0]?.score ?? undefined}
        category={formattedCategory}
        state={formattedState}
        city={formattedCity}
        slug={formattedSlug}
        platform_reviews={contractor.platform_reviews?.[0]?.score ?? undefined}
        /* if your data key is review_qa, use that; if it's review_qe, keep it consistent everywhere */
        review_qe={
          contractor.review_qe?.[0]?.score ??
          contractor.review_qe?.[0]?.score ??
          undefined
        }
        website_dp={contractor.website_dp?.[0]?.score ?? undefined}
        business_credibility={
          contractor.business_credibility?.[0]?.score ?? undefined
        }
        visit_profile={true}
      />
    </div>
  );
};

export default ContractorItem;
