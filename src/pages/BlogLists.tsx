import { useEffect, useRef, useState } from "react";
import BlogCard from "../components/BlogCard";
import { Blog } from "../types/dto";
import axiosInstance from "../utils/auth/AxiosInstance";
import ErrorPage from "./ErrorPage";

const BlogsPage = (): JSX.Element => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [emptyBlog, setEmptyBlog] = useState<boolean>(false);
  const isFetched = useRef(false); // Prevents refetching

  useEffect(() => {
    if (isFetched.current) return; // Prevents re-fetching

    const fetchBlogs = async () => {
      try {
        const response = await axiosInstance.get<{
          success: boolean;
          data: Blog[];
        }>("/blogs?status=PUBLISHED");

        if (response.data.success) {
          setBlogs(response.data.data); // ✅ Updates blogs state
        } else {
          throw new Error("Failed to fetch blogs");
        }
      } catch (err: any) {
        if (err.response.status == 404) {
          setEmptyBlog(true);
        } else {
          setError("Error fetching blogs");
        }
      } finally {
        setLoading(false);
        isFetched.current = true; // ✅ Marks as fetched
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    console.log("Updated Blog State:", blogs);
  }, [blogs]);

  if (loading)
    return (
      <div className="min-h-[100vh] flex flex-col justify-center">
        <p className="text-center text-black font-bold">Loading...</p>
      </div>
    );
  if (emptyBlog)
    return (
      <ErrorPage
        errorCode={404}
        message="There is no blog yet at this time. I will update for more blog content soon. Thank you!"
      />
    );
  if (error)
    return (
      <ErrorPage
        errorCode={505}
        message="There are some technical difficulties in the backend.. Sorry :("
      />
    );

  return (
    <div className="min-h-[90vh] flex justify-center pt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-w-[90%] mx-auto">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;
