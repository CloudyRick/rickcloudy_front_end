import { useEffect, useRef, useState } from "react";
import { Blog } from "../../../types/dto";
import axiosInstance from "../../../utils/auth/AxiosInstance";
import BlogCard from "../../../components/BlogCard";

const AdminBlogList = (): JSX.Element => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const isFetched = useRef(false); // Prevents refetching

  useEffect(() => {
    if (isFetched.current) return; // Prevents re-fetching

    const fetchBlogs = async () => {
      try {
        const response = await axiosInstance.get<{
          success: boolean;
          data: Blog[];
        }>("/admin/blogs");

        if (response.data.success) {
          setBlogs(response.data.data); // Updates blogs state
        } else {
          throw new Error("Failed to fetch blogs");
        }
      } catch (err) {
        setError("Error fetching blogs");
      } finally {
        setLoading(false);
        isFetched.current = true; // Marks as fetched
      }
    };

    fetchBlogs();
  }, []);

  if (loading)
    return (
      <div className="min-h-[100vh] flex flex-col justify-center">
        <p className="text-center text-black font-bold">Loading...</p>
      </div>
    );
  if (error) return <p>{error}</p>;

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

export default AdminBlogList;
