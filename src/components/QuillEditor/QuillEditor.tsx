import ReactQuill from "react-quill";
// import * as Emoji from 'quill-emoji';

import "react-quill/dist/quill.snow.css";
import "quill-emoji/dist/quill-emoji.css";
import { useRef, useState } from "react";
import { htmlToMarkdown, markdownToHtml } from "./Parser";


// Quill.register("modules/emoji", Emoji);

export interface EditorContentChanged {
    html: string;
    markdown: string
}

export interface EditorProps {
    value? : string,
    onChange?: (changes: EditorContentChanged) => void;
}

const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: [] }],
      [{ font: [] }],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ color: ["red", "#785412"] }],
      [{ background: ["red", "#785412"] }]
    ]
};

const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "background",
    "align",
    "size",
    "font"
];

const QuillEditor = (props: EditorProps) => {
    const [value, setValue] = useState<string>(markdownToHtml(props.value || ""));
    const reactQuillRef = useRef<ReactQuill>(null);

    const onChange = (content: string) => {
        setValue(content);

        if(props.onChange) {
            props.onChange({
                html: content,
                markdown: htmlToMarkdown(content)
            });
        }
    }

    return (
        <ReactQuill
            ref={reactQuillRef}
            theme="snow"
            placeholder="Start writing"
            modules={modules}
            formats={formats}
            value={value}
            onChange={onChange}
        />
    )
}

export default QuillEditor;