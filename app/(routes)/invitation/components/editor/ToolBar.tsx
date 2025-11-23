"use client";

import { Editor, useEditorState } from "@tiptap/react";
import { Bold, Italic, Underline } from "lucide-react";
import TextAlignMenu from "./menu/TextAlignMenu";
import TextColorMenu from "./menu/TextColorMenu";

type ToolbarProps = {
  editor: Editor;
};

const Toolbar = ({ editor }: ToolbarProps) => {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive("bold"),
      canBold: ctx.editor.can().chain().toggleBold().run(),
      isItalic: ctx.editor.isActive("italic"),
      canItalic: ctx.editor.can().chain().toggleItalic().run(),
      isUnderline: ctx.editor.isActive("underline"),
      canUnderline: ctx.editor.can().chain().toggleUnderline().run(),
    }),
  });

  const buttonBase =
    "w-8 h-8 flex items-center justify-center rounded text-sm hover:bg-gray-100 disabled:opacity-30 disabled:pointer-events-none";

  const groupClass = "flex flex-wrap gap-1 items-center";
  const barClass =
    "sticky top-0 z-10 flex flex-wrap gap-3 p-2 bg-white rounded-t-sm border-b border-[#E0E0E0]";
  const iconClass = "w-4 h-4";

  return (
    <div className={barClass}>
      <div className={groupClass}>
        <button
          className={`${buttonBase} ${
            editorState.isBold ? "bg-gray-200" : "bg-white"
          }`}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
        >
          <Bold
            strokeWidth={2.5}
            className={`${iconClass} ${
              editorState.isBold ? "text-black" : "text-[rgba(36,39,46,0.78)]"
            }`}
          />
        </button>
        <button
          className={`${buttonBase} ${
            editorState.isItalic ? "bg-gray-200" : "bg-white"
          }`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
        >
          <Italic
            strokeWidth={2.5}
            className={`${iconClass} ${
              editorState.isItalic ? "text-black" : "text-[rgba(36,39,46,0.78)]"
            }`}
          />
        </button>
        <button
          className={`${buttonBase} ${
            editorState.isUnderline ? "bg-gray-200" : "bg-white"
          }`}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editorState.canUnderline}
        >
          <Underline
            strokeWidth={2.5}
            className={`${iconClass} ${
              editorState.isUnderline
                ? "text-black"
                : "text-[rgba(36,39,46,0.78)]"
            }`}
          />
        </button>

        <TextColorMenu editor={editor} />
        <TextAlignMenu editor={editor} />
      </div>
    </div>
  );
};

export default Toolbar;
