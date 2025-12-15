"use client";

import { InvitationMessageSectionType } from "@/app/lib/fetches/invitation/type";
import { useWeddingUpdate } from "@/app/lib/hooks/useWeddingInfoUpdate";
import { useInvitationMessageStore } from "@/app/store/useInvitationMessageStore";
import { useWeddingIdStore } from "@/app/store/useWeddingIdStore";
import Highlight from "@tiptap/extension-highlight";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import TextAlign from "@tiptap/extension-text-align";
import { Color, TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import Toolbar from "./toolbar/Toolbar";

const TextEditor = () => {
  const invitationMessage = useInvitationMessageStore(
    (s) => s.invitationMessage
  );
  const updateField = useInvitationMessageStore(
    (s) => s.updateInvitationMessage
  );
  const weddingId = useWeddingIdStore((s) => s.weddingId);

  const [message, setMessage] = useState<InvitationMessageSectionType>(
    () => invitationMessage
  );

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
          "prose prose-sm max-w-none p-4 min-h-75 h-full focus:outline-none text-black bg-[#eee]",
      },
    },
    content: message.message,
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,

    // 초기 문구 저장
    onCreate({ editor }) {
      setMessage((prev) => ({
        ...prev,
        message: editor.getHTML(),
      }));
    },

    // 문구 수정되는 경우 저장
    onUpdate({ editor }) {
      setMessage((prev) => ({
        ...prev,
        message: editor.getHTML(),
      }));
    },
  });

  useWeddingUpdate({
    localState: message,
    storeState: invitationMessage,
    updateStoreField: updateField,
    sectionId: "invitationMessage",
    weddingId: weddingId,
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
