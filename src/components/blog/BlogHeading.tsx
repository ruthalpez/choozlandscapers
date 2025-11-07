import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Blog } from "@/type/blog";
import { BsCalendar } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { IoShareSocialSharp } from "react-icons/io5";

interface BlogHeadingProps {
  title?: string;
  date?: string;
  category?: string;
  comments?: number;
}

const BlogHeading = ({ title, date, category, comments }: BlogHeadingProps) => {
  return (
    <>
      <h1 className="heading-secondary font-semibold font-poppins mt-5">
        {title}
      </h1>
      <div className="flex flex-wrap items-center justify-between gap-5 mt-5">
        <div className="flex flex-wrap items-center gap-5">
          <div className="flex items-center gap-2">
            <BsCalendar />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaRegComment />
            <span>
              {comments} comment{comments === 1 ? "" : "s"}
            </span>
          </div>
          <button className="!rounded-full !py-1 button-primary">
            {category}
          </button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center justify-center gap-2">
            <IoShareSocialSharp className="text-base" />
            <span>Share</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border-gray-300">
            <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">
              Facebook
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">
              Twitter
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">
              LinkedIn
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">
              Instagram
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default BlogHeading;
