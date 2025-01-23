import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import FormInput from "../../../components/FormInput";
import { FormInputProps } from "../../../types/propType";
import QuillEditor from "../../../components/QuillEditor/QuillEditor";

const inputList: FormInputProps[] = [
  {
    inputLabel: "Blog Title",
    labelFor: "title",
    inputType: "text",
    inputId: "title",
    inputName: "title",
    placeholderText: "Insert your blog title",
    required: true,
  },
  {
    inputLabel: "Status",
    labelFor: "status",
    inputType: "select",
    inputId: "status",
    inputName: "status",
    required: true,
    placeholderText: "Select blog status",
    options: [
      { value: "DRAFT", label: "Draft" },
      { value: "PUBLISHED", label: "Publish" },
      { value: "ARCHIEVED", label: "Archieve" },
    ],
  },
];

const BlogCreation = () => {
  const quillRef = useRef<ReactQuill | null>(null); // Reference to the Quill instance
  const [formValues, setFormValues] = useState<Record<string, string>>({
    title: "",
    status: "DRAFT",
  });
  const [blogContent, setBlogContent] = useState<string>("");
  const [authorId, setAuthorId] = useState<number>(121212415);

  const handleContentChange = (content: string) => {
    setBlogContent(content); // Only update if content changes
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  // Function to upload the image to your server or cloud storage (S3, for example)
  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("files", file);

    try {
      const response = await fetch("http://localhost:8088/blogs/images", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Image upload failed");
      }
      const res = await response.json();
      console.log("Image upload response:", res);
      return res.data[0].url; // Assuming the server returns the uploaded image URL
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Error uploading image");
    }
  };

  // Prepare form data for submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthorId(1);
    // Extract all image URLs from the blog content
    const parser = new DOMParser();
    const doc = parser.parseFromString(blogContent, "text/html");
    const imgElements = doc.querySelectorAll("img");
    const imgUrls = Array.from(imgElements).map((img) => img.src);
    // Prepare the content and files
    const formData = new FormData();
    const blogPost = {
      ...formValues,
      authorId: authorId,
      content: blogContent, // Updated content, with inserted image URLs
    };

    // Append content as JSON string
    formData.append("blogPost", JSON.stringify(blogPost));

    // Append image URLs as a separate field
    formData.append("imageUrl", JSON.stringify(imgUrls));

    try {
      // Step 1: Upload content and images
      const response = await fetch("http://localhost:8088/blogs", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorBody = await response.json(); // Try to read the response body as JSON
        console.error("Error response:", errorBody); // Log the error details
        throw new Error("Failed to create blog post ");
      }

      // Step 2: Get image URLs and insert into content
      const responseData = await response.json();
      console.log("API Response ", responseData);

      alert("Blog post created successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create blog post");
    }
  };

  return (
    <>
      <div className="w-full max-w-[70%] mx-auto pt-16 lg:pt-24 min-h-[80vh]">
        {inputList.map((input: FormInputProps) => (
          <FormInput
            key={input.inputId}
            inputLabel={input.inputLabel}
            labelFor={input.labelFor}
            options={input.options}
            inputType={input.inputType}
            inputId={input.inputId}
            inputName={input.inputName}
            placeholderText={input.placeholderText}
            required={input.required}
            onChange={handleInputChange} // Same handler for all inputs
          />
        ))}
        <div>
          <label htmlFor="blogContent">Blog Content</label>
          <QuillEditor
            ref={quillRef}
            value={blogContent}
            onChange={handleContentChange}
            onImageUpload={handleImageUpload}
          />
        </div>
        <div>{blogContent}</div>
        <button
          onClick={handleSubmit}
          className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg"
        >
          Submit Blog Post
        </button>
      </div>
    </>
  );
};

export default BlogCreation;
