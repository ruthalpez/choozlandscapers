import Image from "next/image";
import React from "react";

interface ImageBoxProps {
  image: string;
  heading?: string;
  alt?: string;
  className?: string;
  imageClassSize?: string;
}

const ImageBox = ({
  image,
  heading,
  alt,
  className,
  imageClassSize,
}: ImageBoxProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-5 ${className}`}>
      <Image
        src={image}
        alt={alt || ""}
        width={200}
        height={200}
        className={`object-contain ${
          imageClassSize || "w-[140px] h-[140px] lg:w-[130px] lg:h-[130px]"
        }`}
      />
      {heading && (
        <h3 className="text-[22px] font-bold text-[var(--clr-heading)] text-center">
          {heading}
        </h3>
      )}
    </div>
  );
};

export default ImageBox;
