import BlogBreadcrumb from "@/components/blog/BlogBreadcrumb";
import BlogHeading from "@/components/blog/BlogHeading";
import BlogSidebar from "@/components/blog/BlogSidebar";
import BlogContent from "@/components/blog/BlogContent";

import { blogs } from "@/data/blog";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params;

  const blog = blogs.find((blog) => blog.slug === slug);

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <main>
      <div className="container xl:max-w-[1340px] mx-auto px-5 pt-6 pb-10">
        <BlogBreadcrumb category={blog.category} title={blog.title} />
        <BlogHeading
          title={blog.title}
          date={blog.date}
          category={blog.category}
          comments={blog.comments}
        />

        <div className="mt-5">
          <img
            src={blog?.image}
            alt={blog?.alt || blog?.title}
            className="w-full h-[555px] object-cover rounded-2xl"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-40 mt-15">
          <BlogContent id={blog._id} />

          <BlogSidebar blogs={blogs} category={blog.category} id={blog._id} slug={blog.slug} />
        </div>
      </div>
    </main>
  );
};

export default BlogPostPage;
