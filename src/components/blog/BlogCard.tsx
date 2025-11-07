import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Blog } from "@/type/blog";

const BlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <article className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <Link href={`/blog/${blog._id}`}>
        <div className="relative h-48 w-full">
          <Image
            src={blog.image || "/placeholder.svg"}
            alt={blog.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-blue-100 text-blue-800">
              {blog.category}
            </span>
            <span className="text-xs text-gray-500">{blog.date}</span>
          </div>
          <h2 className="text-xl font-bold mb-2 line-clamp-2">{blog.title}</h2>
          <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-2">
              <span className="text-xs font-medium">
                {blog.author.charAt(0)}
              </span>
            </div>
            <span className="text-sm font-medium">{blog.author}</span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;
