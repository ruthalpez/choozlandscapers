import React from "react";
import Image from "next/image";
import Link from "next/link";

interface CardBlogProps {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  slug?: string;
}

const CardBlog = ({
  title,
  excerpt,
  date,
  author,
  image,
  slug,
}: CardBlogProps) => {
  return (
    <div className="w-full space-y-3 md:px-4">
      <Link href={`/blog/${slug}`} className="overflow-hidden rounded-xl block">
        <Image
          src={image}
          alt={title}
          width={300}
          height={300}
          className="w-full h-[180px] object-cover hover:scale-105 hover:shadow-md transition-all duration-300"
        />
      </Link>
      <p className="text-xs font-bold uppercase mt-5">
        <span>{author}</span> <span>{date}</span>
      </p>
      <Link href={`/blog/${slug}`} className="block">
        <h4 className="text-[23px] font-medium leading-6 font-poppins">
          {title}
        </h4>
      </Link>
      <p className="text-base leading-5 line-clamp-3">{excerpt}</p>
    </div>
  );
};

export default CardBlog;
