"use client";

import React, { useEffect, useRef, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import { useDevice } from "@/hooks/useDevice";
import { cn } from "@/lib/utils";

interface ImageModalSliderProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  goToIndex?: (index: number) => void;
}

const ImageModalSlider: React.FC<ImageModalSliderProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
  goToIndex,
}) => {
  const { isMobile, isDesktop } = useDevice();

  const [count, setCount] = useState(0);
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    setCount(images.length);
  }, [images]);

  useEffect(() => {
    setCurrent(currentIndex);
  }, [currentIndex]);

  // Close on ESC / arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const distance = touchStartX.current - touchEndX.current;

      if (distance > 50) {
        // Swipe Left → Next
        onNext();
      } else if (distance < -50) {
        // Swipe Right → Prev
        onPrev();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur flex items-center justify-center"
      onClick={onClose}>
      <div
        className="px-4 w-full"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}>
        <button
          onClick={onClose}
          className="absolute top-5 right-5 hover:scale-110 transition text-white text-4xl font-bold outline-none">
          <IoCloseOutline />
        </button>
        <div className="flex justify-center items-end lg:items-center gap-4">
          {isDesktop && (
            <button
              onClick={onPrev}
              className="text-white text-3xl px-4 hover:scale-110 transition absolute left-0  outline-none">
              <BsChevronLeft />
            </button>
          )}

          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex}`}
            className="max-h-[80vh] object-contain"
          />

          {isDesktop && (
            <button
              onClick={onNext}
              className="text-white text-3xl px-4 hover:scale-110 transition absolute right-0 outline-none">
              <BsChevronRight />
            </button>
          )}

          {isMobile && count > 1 && (
            <div className="absolute bottom-5 z-50 flex justify-center gap-2">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "h-2.5 w-2.5 rounded-full transition-all cursor-pointer hover:bg-white",
                    current === index ? "bg-white w-5" : "bg-[#d2d2d260]",
                  )}
                  onClick={() => {
                    if (goToIndex) goToIndex(index);
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageModalSlider;
