"use client";

import { useMessageStore } from "@/app/store/useInvitaionMessageStore";
import Highlight from "@tiptap/extension-highlight";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import TextAlign from "@tiptap/extension-text-align";
import { Color, TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./toolbar/Toolbar";
import { DEFAULT_INVITATION_TEXT } from "./toolbar/toolbarConfig";
import { useWeddingUpdate } from "@/app/lib/hooks/useWeddingInfoUpdate";
import { useInvitationMessageStoreTest } from "@/app/store/useInvitationMessageStoreTest";
import { useState } from "react";
import { InvitationMessageSectionType } from "@/app/lib/fetches/invitation/type";

const TextEditor = () => {
  // const { setInvitationMessage } = useMessageStore();
  const invitationMessage = useInvitationMessageStoreTest((s) => s.invitationMessage);
  const updateField = useInvitationMessageStoreTest((s) => s.updateInvitationMessageField);
  const [localInfo, setLocalInfo] = useState<InvitationMessageSectionType>(() => invitationMessage);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        underline: false,
        horizontalRule: false
      }),
      Underline,
      TextStyle,
      HorizontalRule,
      Color,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({
        types: ["paragraph", "bulletList", "orderedList", "listItem"],
        alignments: ["left", "center", "right"],
        defaultAlignment: "center"
      })
    ],
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none p-4 min-h-50 focus:outline-none text-black bg-[#eee]"
      }
    },
    content: localInfo.message,
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,

    // 초기 문구 저장
    onCreate({ editor }) {
      // setInvitationMessage(editor.getHTML());
      setLocalInfo((prev) => ({
        ...prev,
        message: editor.getHTML()
      }));
    },

    // 문구 수정되는 경우 저장
    onUpdate({ editor }) {
      // setInvitationMessage(editor.getHTML());
      setLocalInfo((prev) => ({
        ...prev,
        message: editor.getHTML()
      }));
    }
  });

  useWeddingUpdate({
    localState: localInfo,
    storeState: invitationMessage,
    updateStoreField: updateField,
    sectionId: "invitationMessage",
    weddingId: "8c00934e-f7e6-4f33-a91b-40adce0c9acf"
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
