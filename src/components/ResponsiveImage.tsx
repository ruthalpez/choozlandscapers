"use client";

import Image from "next/image";
import PaintingCompanyBuilding from "@/images/buildings/chooz_landscrapers_painting_company.png";
import PaintingCompanyBuildingMobile from "@/images/buildings/chooz_landscrapers_painting_company.png";
import { useDevice } from "@/hooks/useDevice";

export default function ResponsiveImage() {
  const { isMobile, isDesktop } = useDevice();

  if (isDesktop) {
    return (
      <Image
        src={PaintingCompanyBuilding.src}
        alt="Illustration of a painting company storefront in a city neighborhood with surrounding buildings, representing urban commercial and residential painting services"
        width={1000}
        height={1000}
        className="mx-auto w-full"
      />
    );
  }

  if (isMobile) {
    return (
      <Image
        src={PaintingCompanyBuildingMobile.src}
        alt="Illustration of a painting company storefront in a city neighborhood with surrounding buildings, representing urban commercial and residential painting services"
        width={1000}
        height={1000}
        className="mx-auto w-full"
      />
    );
  }

  return null; // Optional fallback
}
