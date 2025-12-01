import { Bold, Italic, Minus, Underline } from "lucide-react";

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
      {
        name: "horizontalRule",
        icon: Minus,
        command: (editor) => editor.chain().focus().setHorizontalRule().run(),
        isActive: () => false,
        isDisabled: () => false,
        title: "구분선",
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
        name: "highlight",
        component: "TextHighlightMenu",
      },
      {
        name: "align",
        component: "TextAlignMenu",
      },
    ],
  },
];

export const TEXT_EDITOR_COLORS = [
  // ⚫️ Grayscale (8)
  "#000000",
  "#1C1C1C",
  "#3A3A3A",
  "#5C5C5C",
  "#7A7A7A",
  "#A3A3A3",
  "#D4D4D4",
  "#FFFFFF",

  // 🔴 Red (8)
  "#7F1D1D",
  "#991B1B",
  "#B91C1C",
  "#DC2626",
  "#EF4444",
  "#F87171",
  "#FCA5A5",
  "#FEE2E2",

  // 🌸 Pink (8)
  "#9D174D",
  "#BE185D",
  "#DB2777",
  "#EC4899",
  "#F472B6",
  "#F9A8D4",
  "#FBCFE8",
  "#FCE7F3",

  // 🟣 Purple (8)
  "#6B21A8",
  "#7C3AED",
  "#9333EA",
  "#A855F7",
  "#C084FC",
  "#D8B4FE",
  "#E9D5FF",
  "#F3E8FF",

  // 🔵 Blue (8)
  "#1D4ED8",
  "#2563EB",
  "#3B82F6",
  "#60A5FA",
  "#93C5FD",
  "#BFDBFE",
  "#DBEAFE",
  "#EFF6FF",

  // 🩵 Cyan (8)
  "#0E7490",
  "#0891B2",
  "#0EA5E9",
  "#38BDF8",
  "#7DD3FC",
  "#BAE6FD",
  "#E0F2FE",
  "#F0F9FF",

  // 🟢 Green (8)
  "#047857",
  "#059669",
  "#10B981",
  "#34D399",
  "#6EE7B7",
  "#A7F3D0",
  "#D1FAE5",
  "#ECFDF5",

  // 🟡 Yellow / Orange Mix (8)
  "#B45309",
  "#D97706",
  "#F59E0B",
  "#FBBF24",
  "#FDE047",
  "#FEF08A",
  "#FEF9C3",
  "#FFF7E8",
];

export const TEXT_ALIGN_VALUES = [
  { value: "left", label: "왼쪽 정렬" },
  { value: "center", label: "가운데 정렬" },
  { value: "right", label: "오른쪽 정렬" },
];

export const DEFAULT_INVITATION_TEXT = `
<p style="text-align:center;margin:0;">
소중한 분들을 모시고<br/>
저희 두 사람이 한마음으로<br/>
새로운 삶을 시작하려 합니다.<br/><br/>
서로를 깊이 존중하고 아끼는 마음으로<br/>
기쁨은 나누고 어려움은 함께 이겨내며<br/>
평생 사랑하겠습니다.<br/><br/>
뜻깊은 시작의 자리에<br/>
귀한 걸음으로 축복을 나눠주신다면<br/>
더없는 기쁨이겠습니다.
</p>`;
