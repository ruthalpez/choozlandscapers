import Image from "next/image";
import Link from "next/link";
import { BsCalendar } from "react-icons/bs";

interface BlogCardListProps {
  title: string;
  date: string;
  image: string;
  slug?: string;
}

const BlogCardList = ({ title, date, image, slug }: BlogCardListProps) => {
  return (
    <div className="flex flex-row gap-5">
      <Link href={`/blog/${slug}`} prefetch={false} className="md:w-[78px]">
        <Image
          src={image}
          alt={title}
          width={100}
          height={100}
          className="w-[78px] h-[78px] object-cover rounded-lg"
        />
      </Link>
      <div className="flex flex-col justify-center gap-2 w-[70%]">
        <Link
          href={`/blog/${slug}`}
          prefetch={false}
          className="flex items-center gap-2 text-xs text-[#6e737e]">
          <BsCalendar />
          <span>{date}</span>
        </Link>
        <Link
          href={`/blog/${slug}`}
          prefetch={false}
          className="text-base font-bold line-clamp-2">
          {title}
        </Link>
      </div>
    </div>
  );
};

export default BlogCardList;
