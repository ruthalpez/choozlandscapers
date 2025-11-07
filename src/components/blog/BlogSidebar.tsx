import { Blog } from "@/type/blog";
import BlogCardList from "./BlogCardList";

interface BlogSidebarProps {
  blogs: Blog[];
  category: string;
  id: string;
  slug?: string;
}

const BlogSidebar = ({ blogs, category, id, slug }: BlogSidebarProps) => {
  const relatedBlogs = blogs.filter(
    (b) => b.category === category && b._id !== id,
  );

  return (
    <div className="w-full lg:w-1/4 flex flex-col gap-5">
      {relatedBlogs.length > 0 ? (
        relatedBlogs.map((relatedBlog) => (
          <BlogCardList
            key={relatedBlog._id}
            title={relatedBlog.title}
            date={relatedBlog.date}
            image={relatedBlog.image}
            slug={relatedBlog.slug}
          />
        ))
      ) : (
        <p>No related blog found.</p>
      )}
    </div>
  );
};

export default BlogSidebar;
