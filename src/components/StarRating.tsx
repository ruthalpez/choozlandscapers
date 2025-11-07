"use client";
import React, { useId } from "react";

type StarRatingProps = {
  rating: number; // e.g. 0..5 (float)
  size?: number; // px
  className?: string;
};

export default function StarRating({
  rating,
  size = 16,
  className = "",
}: StarRatingProps) {
  const uid = useId(); // unique per render tree

  // Clamp once
  const safeRating = Math.max(0, Math.min(5, Number(rating) || 0));

  return (
    <div
      className={`flex gap-1 ${className}`}
      aria-label={`Rating: ${safeRating} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => {
        // how full is this star?
        let fillPercent = 0;
        if (safeRating >= star) {
          fillPercent = 100;
        } else if (safeRating + 1 > star) {
          fillPercent = (safeRating - (star - 1)) * 100;
        }
        fillPercent = Math.max(0, Math.min(100, fillPercent));

        const gradientId = `star-gradient-${uid}-${star}`;

        return (
          <svg
            key={star}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            className="stroke-current"
            aria-hidden="true">
            <defs>
              {/* Left-to-right fill with a hard cutoff */}
              <linearGradient id={gradientId} x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="currentColor" />
                <stop offset={`${fillPercent}%`} stopColor="currentColor" />
                <stop offset={`${fillPercent}%`} stopColor="transparent" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>

            {/* Base star (unfilled portion) */}
            <path
              className="text-white"
              fill="currentColor"
              d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.782 1.4 8.168L12 18.896l-7.334 3.864 1.4-8.168L.132 9.21l8.2-1.192z"
            />

            {/* Overlay star with partial fill */}
            <g className="text-(--clr-secondary)">
              <path
                fill={`url(#${gradientId})`}
                d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.782 1.4 8.168L12 18.896l-7.334 3.864 1.4-8.168L.132 9.21l8.2-1.192z"
              />
            </g>
          </svg>
        );
      })}
    </div>
  );
}
