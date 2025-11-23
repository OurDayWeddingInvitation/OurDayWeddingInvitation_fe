"use client";

import { TextStyle, Color } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./ToolBar";

const TextEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit, Underline, TextStyle, Color],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none p-4 min-h-50 focus:outline-none text-black",
      },
    },
    content: "<p>Hello World! 🌎️</p>",
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div className="border w-125 min-h-75 border-[#E0E0E0] rounded-sm bg-white">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TextEditor;
