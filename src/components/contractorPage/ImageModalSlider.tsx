"use client";

import React, { useEffect } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";

interface ImageModalSliderProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const ImageModalSlider: React.FC<ImageModalSliderProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
}) => {
  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur flex items-center justify-center"
      onClick={onClose}>
      <div className="px-4 w-full" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-5 right-5 hover:scale-110 transition text-white text-4xl font-bold outline-none">
          <IoCloseOutline />
        </button>
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={onPrev}
            className="text-white text-3xl px-4 hover:scale-110 transition absolute left-20 outline-none">
            <BsChevronLeft />
          </button>
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex}`}
            className="max-h-[80vh] object-contain"
          />
          <button
            onClick={onNext}
            className="text-white text-3xl px-4 hover:scale-110 transition absolute right-20 outline-none">
            <BsChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageModalSlider;
