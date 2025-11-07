"use client";

import { useState } from "react";
import { Contractor } from "@/type/contractor";
import ImageModalSlider from "../ImageModalSlider";
import Image from "next/image";
import { Play } from "lucide-react";

import { useDevice } from "@/hooks/useDevice";
import { Label } from "../ui/label";

interface ContractorGalleryProps {
  contractor: Contractor;
  setIsScoreOpen: (open: boolean) => void;
}

const fallbackImageLogo =
  "https://imagedelivery.net/6JkaVsfAvbV7M0nIAmm2-g/8b4ebca8-c7e5-43a2-7c4b-891ee1a0bd00/public";
const fallbackImage =
  "https://imagedelivery.net/6JkaVsfAvbV7M0nIAmm2-g/6c9c85be-bb9f-469f-7fad-7172060b6200/public";

const ContractorGallery = ({
  contractor,
  setIsScoreOpen,
}: ContractorGalleryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const { isTablet } = useDevice();

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
    <>
      <div className="grid grid-cols-2 gap-8 md:gap-6 lg:grid-cols-4 relative">
        <Image
          src={
            (Array.isArray(contractor.logo) && contractor.logo[0]?.url) ||
            fallbackImageLogo
          }
          alt={
            (Array.isArray(contractor.logo) && contractor.logo[0]?.alt) ||
            "White Chooz Landscapers logo placeholder"
          }
          width={400}
          height={400}
          priority
          onClick={() => openModal(0)}
          className={`cursor-pointer col-span-2 row-span-2 w-full h-[246px]  rounded-xl ${
            contractor.logo[0]?.url ? "object-contain" : "object-cover"
          }`}
        />

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

        {/* Gallery Images */}
        {displayedGalleryImages.map((img, idx) => (
          <Image
            key={idx}
            src={img}
            alt={
              "White Chooz Landscapers logo with blue background placeholder for paintig company logos"
            }
            width={200}
            height={200}
            priority
            onClick={() => openModal(idx + 1)}
            className="w-full border border-[#efecf3] rounded-xl h-[115px] object-cover cursor-pointer"
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
    </>
  );
};

export default ContractorGallery;
