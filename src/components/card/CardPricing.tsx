"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { FaArrowRight, FaCheck } from "react-icons/fa";

import BadgeVerified from "@/images/badge/chooz_landscrapers_verified_landscrapers.png";
import BadgeBestAward from "@/images/badge/chooz_landscrapers_best_landscrapers.png";
import BadgeTopAward from "@/images/badge/chooz_landscrapers_top_landscrapers.png";

import FormPricing from "../FormPricing";
import ImageBox from "../ImageBox";

interface CardPricingProps {
  title: string;
  description: string;
  price: string;
  pricingList: string[];
  discountPrice?: string;
  Form?: React.FC;
}

const CardPricing = ({
  title,
  description,
  price,
  pricingList,
  discountPrice,
  Form,
}: CardPricingProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 px-4 py-8 sm:p-[40px] sm:rounded-[10px] bg-white text-black w-full max-w-[650px] space-y-4">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <ImageBox
          image={BadgeVerified.src}
          alt="Chooz Landscapers Verified Badge 2025 – green hexagon certification badge for verified landscaping professionals, awarded by Chooz directory."
          imageClassSize="w-[70px] h-[70px]"
        />
        <div className="flex-1 border-t-2 border-black border-dashed" />
        <ImageBox
          image={BadgeTopAward.src}
          alt="2025 Chooz Landscapers Best Landscaper Award badge with gold and blue hexagon design and ribbon banner"
          imageClassSize="w-[80px] h-[80px]"
        />
        <div className="flex-1 border-t-2 border-black border-dashed" />
        <ImageBox
          image={BadgeBestAward.src}
          alt="Chooz Landscapers 2025 Best Landscaper Award badge in gold and blue, showcasing top-rated landscaping company recognition"
          imageClassSize="w-[80px] h-[80px]"
        />
      </div>

      <h2 className="text-[36px] font-bold leading-11 text-center sm:text-left">
        {title}
      </h2>

      <p className="text-[20px]">{description}</p>

      <h3 className="text-[45px] font-bold my-8">
        {price}{" "}
        {discountPrice && (
          <span className="text-gray-400 relative">
            {discountPrice}{" "}
            <span className="absolute top-1/2 left-0 -translate-y-1/2 w-[90%] h-[6px] bg-black"></span>
          </span>
        )}
        <span className="text-[24px]">/month</span>
      </h3>

      <hr className="my-6 border-gray-200" />

      <ul className="space-y-4 mb-12">
        {pricingList.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <FaCheck className="text-[var(--clr-icon-check-dark)] mt-1 w-[20px] h-[20px]" />
            <span className="w-[calc(100%-20px-0.25rem)]">{item}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => setIsOpen(true)}
        className="cursor-pointer flex items-center gap-3 border-2 border-[var(--clr-primary)] bg-white text-black px-6 py-3 rounded-xl font-semibold">
        <span>Get Started</span> <FaArrowRight />
      </button>

      <FormPricing isOpen={isOpen} setIsOpen={setIsOpen} Form={Form} />
    </div>
  );
};

export default CardPricing;
