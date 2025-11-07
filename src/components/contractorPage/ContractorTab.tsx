"use client";

import React, { useState } from "react";
import { Contractor } from "@/type/contractor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IoIosNotifications } from "react-icons/io";
import { FaImage } from "react-icons/fa";
import ImageModalSlider from "../ImageModalSlider";

const ContractorTab = ({ contractor }: { contractor: Contractor }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    contractor.company_logo,
    ...(contractor.company_images || []),
  ];

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const showPrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const showNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <>
      <Tabs defaultValue="description" className="mt-10">
        <TabsList className="mb-5">
          <TabsTrigger value="description">
            <IoIosNotifications className="text-xl" />
            <span>Description</span>
          </TabsTrigger>
          <TabsTrigger value="photos">
            <FaImage className="text-xl" />
            <span>Photos</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description">
          <p className="mb-4">
            {contractor.title} - Painting in {contractor.city} City,{" "}
            {contractor.state}.
          </p>
          <p>Call to request an estimate: {contractor.company_phone}</p>
          {contractor.description && (
            <p className="mt-8">{contractor.description}</p>
          )}
        </TabsContent>
        <TabsContent value="photos">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 relative">
            {images.slice(0, 6).map((img, idx) => (
              <img
                key={img}
                src={img}
                alt={contractor.title}
                onClick={() => openModal(idx)}
                className="w-full border border-[#efecf3] rounded-xl h-[170px] object-cover cursor-pointer"
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <ImageModalSlider
        images={images.filter((img) => img !== undefined) as string[]}
        currentIndex={currentImageIndex}
        isOpen={isModalOpen}
        onClose={closeModal}
        onPrev={showPrev}
        onNext={showNext}
        goToIndex={setCurrentImageIndex}
      />
    </>
  );
};

export default ContractorTab;
