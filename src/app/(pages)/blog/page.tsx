import BlogCard from "@/components/blog/BlogCard";
import { blogs } from "@/data/blog";

const BlogPage = () => {
  return (
    <main>
      <div className="container xl:max-w-[1340px] mx-auto px-5 pt-5 pb-10">
        <h1 className="heading-secondary font-poppins font-bold">Blogs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default BlogPage;
