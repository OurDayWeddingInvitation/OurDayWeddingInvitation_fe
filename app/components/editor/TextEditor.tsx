"use client";

import { useMessageStore } from "@/app/store/invitationMessageStore";
import Highlight from "@tiptap/extension-highlight";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
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
        horizontalRule: false,
      }),
      Underline,
      TextStyle,
      HorizontalRule,
      Color,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({
        types: ["paragraph", "bulletList", "orderedList", "listItem"],
        alignments: ["left", "center", "right"],
        defaultAlignment: "center",
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none p-4 min-h-50 focus:outline-none text-black bg-[#eee]",
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
    <div className="border w-full min-h-75 border-[#E0E0E0] rounded-sm bg-white">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TextEditor;
