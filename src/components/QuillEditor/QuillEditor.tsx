import React, { useMemo, useCallback, forwardRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface QuillEditorProps {
  value: string;
  onChange: (content: string) => void;
  onImageUpload: (file: File) => Promise<string>;
}

const QuillEditor = forwardRef<ReactQuill, QuillEditorProps>(
  ({ value, onChange, onImageUpload }, ref) => {
    const handleImageInsert = useCallback(() => {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";
      fileInput.onchange = async () => {
        const file = fileInput.files?.[0];
        if (file) {
          try {
            // Trigger the file upload
            const imageUrl = await onImageUpload(file);

            const quill = (
              ref as React.RefObject<ReactQuill>
            ).current?.getEditor();
            if (!quill) {
              console.error("Quill editor is not initialized.");
              return;
            }

            console.log("Uploading image URL: in QUILL", imageUrl);

            const range = quill?.getSelection();
            if (range) {
              quill.insertEmbed(
                range.index,
                "image",
                imageUrl // Replace with your image URL logic
              );
            }
          } catch (error) {
            console.error("Image upload failed:", error);
          }
        }
      };
      fileInput.click();
    }, []);

    const modules = useMemo(
      () => ({
        toolbar: {
          container: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ align: ["right", "center", "justify"] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            ["link", "image"],
            [{ color: ["red", "#785412"] }],
            [{ background: ["red", "#785412"] }],
            ["clean"],
          ],
          handlers: {
            image: handleImageInsert,
          },
        },
      }),
      [handleImageInsert]
    );

    return (
      <ReactQuill
        ref={ref}
        value={value}
        onChange={onChange}
        modules={modules}
        theme="snow"
      />
    );
  }
);

export default React.memo(QuillEditor);
