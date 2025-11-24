import { Bold, Italic, Underline } from "lucide-react";

export const TOOLBAR_CONFIG = [
  {
    type: "button",
    items: [
      {
        name: "bold",
        icon: Bold,
        command: (editor) => editor.chain().focus().toggleBold().run(),
        isActive: (editor) => editor.isActive("bold"),
        isDisabled: (editor) => !editor.can().chain().toggleBold().run(),
        title: "굵게",
      },
      {
        name: "italic",
        icon: Italic,
        command: (editor) => editor.chain().focus().toggleItalic().run(),
        isActive: (editor) => editor.isActive("italic"),
        isDisabled: (editor) => !editor.can().chain().toggleItalic().run(),
        title: "기울임",
      },
      {
        name: "underline",
        icon: Underline,
        command: (editor) => editor.chain().focus().toggleUnderline().run(),
        isActive: (editor) => editor.isActive("underline"),
        isDisabled: (editor) => !editor.can().chain().toggleUnderline().run(),
        title: "밑줄",
      },
    ],
  },
  {
    type: "dropdown",
    items: [
      {
        name: "color",
        component: "TextColorMenu",
      },
      {
        name: "align",
        component: "TextAlignMenu",
      },
    ],
  },
];
