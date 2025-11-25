export const hoursOptions = Array.from({ length: 12 }, (_, i) => ({
  label: `${i + 1}시`,
  value: i + 1
}));
export const minutesOptions = Array.from({ length: 12 }, (_, i) => ({
  label: `${String(i * 5).padStart(2, "0")}분`,
  value: i * 5
}));
export const monthOptions = Array.from({ length: 12 }, (_, i) => ({
  label: `${i + 1}`,
  value: i + 1
}));
export const timeOfDayOptions = [
  { label: "오전(AM)", value: "오전(AM)" },
  { label: "오후(PM)", value: "오후(PM)" },
  { label: "낮(PM)", value: "낮(PM)" },
  { label: "저녁(PM)", value: "저녁(PM)" }
];
