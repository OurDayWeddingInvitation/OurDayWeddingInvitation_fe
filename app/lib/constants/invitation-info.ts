export const hoursOptions = Array.from({ length: 12 }, (_, i) => `${i + 1}시`);
export const minutesOptions = Array.from(
  { length: 12 },
  (_, i) => `${String(i * 5).padStart(2, "0")}분`
);
export const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);
export const timeOfDayOptions = ["오전(AM)", "오후(PM)", "낮(PM)", "저녁(PM)"];

export const TEXT_EDITOR_COLORS = [
  // ⚫️ Grayscale
  "#000000",
  "#1F2937",
  "#4B5563",
  "#6B7280",
  "#9CA3AF",
  "#D1D5DB",
  "#FFFFFF",

  // 🔴 Reds
  "#7F1D1D",
  "#B91C1C",
  "#DC2626",
  "#EF4444",
  "#F87171",
  "#FCA5A5",
  "#FEE2E2",

  // 🟠 Oranges
  "#7C2D12",
  "#C2410C",
  "#EA580C",
  "#F97316",
  "#FB923C",
  "#FDBA74",
  "#FFEDD5",

  // 🟡 Yellows
  "#78350F",
  "#B45309",
  "#D97706",
  "#F59E0B",
  "#FBBF24",
  "#FCD34D",
  "#FEF3C7",

  // 🟢 Greens
  "#064E3B",
  "#047857",
  "#10B981",
  "#34D399",
  "#6EE7B7",
  "#A7F3D0",
  "#ECFDF5",

  // 🔵 Blues
  "#1E3A8A",
  "#1D4ED8",
  "#2563EB",
  "#3B82F6",
  "#60A5FA",
  "#93C5FD",
  "#DBEAFE",

  // 🟣 Purples
  "#4C1D95",
  "#6D28D9",
  "#7C3AED",
  "#8B5CF6",
  "#A78BFA",
  "#C4B5FD",
  "#EDE9FE",
];

export const TEXT_ALIGN_VALUES = [
  { value: "left", label: "왼쪽 정렬" },
  { value: "center", label: "가운데 정렬" },
  { value: "right", label: "오른쪽 정렬" },
];
