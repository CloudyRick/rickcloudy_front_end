import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import FormInput from "../../../components/FormInput";
import { FormInputProps } from "../../../types/propType";
import QuillEditor from "../../../components/QuillEditor/QuillEditor";
import axiosInstance from "../../../utils/auth/AxiosInstance";
import { BlogDTO, ImageDTO } from "../../../types/dto";
import { useParams } from "react-router-dom";

const inputList: FormInputProps[] = [
  {
    inputLabel: "Blog Title",
    labelFor: "title",
    inputType: "text",
    inputId: "title",
    inputName: "title",
    placeholderText: "Update your blog title",
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
      { value: "ARCHIVED", label: "Archive" },
    ],
  },
];

const UpdateBlog = () => {
  const { id } = useParams();
  const quillRef = useRef<ReactQuill | null>(null);
  const [formValues, setFormValues] = useState<Record<string, string>>({
    title: "",
    status: "DRAFT",
  });
  const [blogContent, setBlogContent] = useState<string>("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axiosInstance.get<BlogDTO>(`/blogs/${id}`);
        if (response.data.success) {
          const { title, blogStatus, content } = response.data.data;
          setFormValues({ title, blogStatus });
          setBlogContent(content);
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
      }
    };

    fetchBlog();
  }, [id]);

  const handleContentChange = (content: string) => {
    setBlogContent(content);
  };

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("files", file);

    try {
      const response = await axiosInstance.post<ImageDTO>(
        "/blogs/images",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (!response.data.success) {
        throw new Error("Image upload failed");
      }

      const res = await response.data.data[0].url;
      console.log("Image upload response: BlogCreation --- ", res);
      return res;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Error uploading image");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedBlog = { ...formValues, content: blogContent };

    try {
      const response = await axiosInstance.put<BlogDTO>(
        `/blogs/${id}`,
        updatedBlog,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        alert("Blog post updated successfully!");
      } else {
        throw new Error("Failed to update blog post");
      }
    } catch (error) {
      console.error("Error updating blog post:", error);
      alert("Failed to update blog post");
    }
  };

  return (
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
          onChange={handleInputChange}
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
      <button
        onClick={handleUpdate}
        className="mt-4 py-2 px-4 bg-green-600 text-white rounded-lg"
      >
        Update Blog Post
      </button>
    </div>
  );
};

export default UpdateBlog;
