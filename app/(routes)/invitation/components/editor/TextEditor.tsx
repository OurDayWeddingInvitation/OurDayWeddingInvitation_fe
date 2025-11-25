"use client";

import { useMessageStore } from "@/app/store/invitationMessageStore";
import TextAlign from "@tiptap/extension-text-align";
import { Color, TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./toolbar/Toolbar";
import { DEFAULT_INVITATION_TEXT } from "./toolbar/toolbarConfig";

const TextEditor = () => {
  const { updateMessage } = useMessageStore();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        underline: false,
      }),
      Underline,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ["paragraph"],
        alignments: ["left", "center", "right"],
        defaultAlignment: "center",
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none p-4 min-h-50 focus:outline-none text-black",
      },
    },
    content: DEFAULT_INVITATION_TEXT,
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,

    // 초기 문구 저장
    onCreate({ editor }) {
      updateMessage(editor.getHTML());
    },

    // 문구 수정되는 경우 저장
    onUpdate({ editor }) {
      updateMessage(editor.getHTML());
    },
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
