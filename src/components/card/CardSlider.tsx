import Link from "next/link";
import React from "react";

interface CardSliderProps {
  title: string;
  logo: string;
  category: string;
  state: string;
  city: string;
  post_code: string;
  slug: string;
}

const formatUrlPart = (text: string): string =>
  text.toLowerCase().replace(/\s+/g, "-").replace(/'/g, "");

const CardSlider = ({
  category,
  title,
  logo,
  city,
  post_code,
  state,
  slug,
}: CardSliderProps) => {
  const formattedCategory = formatUrlPart(category);
  const formattedState = formatUrlPart(state);
  const formattedCity = formatUrlPart(city);
  const formattedPostCode = formatUrlPart(post_code);
  const formattedSlug = slug;

  return (
    <div>
      <Link
        href={`/${formattedCategory}/${formattedState}/${formattedCity}/${formattedSlug}`}
        prefetch={false}
        className="h-[181px] w-full bg-white p-4 block">
        <img
          src={logo}
          alt={title}
          width={300}
          height={300}
          className="w-full h-full object-contain"
        />
      </Link>
      <div className="mt-3">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-xs">
          {city}, {state}
        </p>
      </div>
    </div>
  );
};

export default CardSlider;
