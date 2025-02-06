import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify"; // Import DOMPurify
import { BlogDTO } from "../types/dto";
import NotFound from "./NotFound";
import axiosInstance from "../utils/auth/AxiosInstance";
import ErrorPage from "./ErrorPage";

const BlogDetail = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<BlogDTO | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [unauthorized, setUnauthorized] = useState<boolean>(false);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    console.log("Received ID:", id);
    if (!id || isNaN(Number(id))) {
      navigate("/404"); // Redirect if ID is missing or invalid
      return;
    }

    const fetchBlog = async () => {
      try {
        // API request to fetch the blog post
        const response = await axiosInstance.get<BlogDTO>(`/blogs/${id}`);

        console.log("Full API Response:", response); // Log full response to inspect

        // Check if the response is successful and data exists
        if (response.status === 200 && response.data) {
          console.log("Blog data found:", response.data); // Log blog data
          setBlog(response.data); // Successful response
        } else {
          console.log("Unexpected response status:", response.status);
          setNotFound(true); // Default case for other errors
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          console.log("Unauthorized request"); // Log unauthorized status
          setUnauthorized(true); // Unauthorized error
        }
        console.error("Error fetching blog:", error.response.status);
        setNotFound(true); // Treat any error as Not Found
      } finally {
        setLoading(false); // Reset loading state after fetching
      }
    };

    fetchBlog();
  }, [id, navigate]);

  // If unauthorized, render the error page
  if (unauthorized) {
    return (
      <ErrorPage
        errorCode={401}
        message="Unauthorized to access this blog post"
      />
    );
  }

  // If not found, render the NotFound page
  if (notFound) {
    return <NotFound />;
  }

  // Show loading state while fetching the blog
  if (loading) {
    return (
      <div className="min-h-[100vh] flex flex-col justify-center">
        <p className="text-center text-black font-bold">Loading...</p>
      </div>
    );
  }

  // Render blog details
  return (
    <div className="flex max-w-full mx-auto">
      <div className="flex flex-col min-h-[80vh] max-w-[95%] lg:max-w-[70%] mx-auto pt-20 text-black space-y-4">
        <h1 className="text-4xl font-epilogue font-extrabold pt-7 px-10">
          {blog?.data.title}
        </h1>
        <div className="mx-auto max-w-[80%]">
          <div
            className="text-lg font-mulish text-justify flex-grow"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(blog?.data.content || ""),
            }}
          />
        </div>

        <span className="text-sm font-mulish text-gray-400">
          {blog?.data.createdAt}
        </span>
      </div>
    </div>
  );
};

export default BlogDetail;
