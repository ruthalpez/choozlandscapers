import Image from "next/image";
import React from "react";

interface CardProfileProps {
  name: string;
  image: string;
  position: string;
}

const CardProfile = ({ name, image, position }: CardProfileProps) => {
  return (
    <div className="bg-white text-black rounded-2xl py-10 px-5 text-center space-y-6 w-full max-w-[370px]">
      <Image
        src={image}
        alt={name}
        width={150}
        height={150}
        priority
        className="w-[150px] h-[150px] object-cover mx-auto"
      />
      <h2 className="text-[30px] font-medium font-poppins leading-5">{name}</h2>
      <p className="text-[23px]">{position}</p>
    </div>
  );
};

export default CardProfile;
