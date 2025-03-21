import { Link } from "react-router-dom";
import { Blog } from "../types/dto";
import DOMPurify from "dompurify";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps): JSX.Element => {
  const fallbackImage = "/images/default-image.png";
  return (
    <div
      className="text-black rounded-2xl shadow-lg p-6 transition-transform transform hover:scale-105 max-w-md mx-auto 
                    max-h-[430px] flex flex-col overflow-hidden"
    >
      <img
        src={blog.images?.[0]?.imageUrl || fallbackImage}
        alt={blog.title}
        className="w-full h-48 object-cover rounded-t-2xl"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-2xl font-extrabold font-epilogue mb-2 line-clamp-2">
          {blog.title}
        </h2>
        <div
          className="text-lg font-mulish text-justify mb-4 overflow-hidden line-clamp-3"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              blog.content.slice(0, 100).replace(/(<br\s*\/?>\s*){2,}/g, " ")
            ),
          }}
        ></div>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-sm font-mulish text-gray-400 pb-3">
            {blog.createdAt}
          </span>
          <Link
            to={`/blogs/${blog.id}`}
            className="text-primary hover:underline underline-offset-2 font-semibold pb-3"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
