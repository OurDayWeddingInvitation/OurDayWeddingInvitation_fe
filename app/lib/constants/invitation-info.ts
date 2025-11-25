export const hoursOptions = Array.from({ length: 12 }, (_, i) => `${i + 1}시`);
export const minutesOptions = Array.from(
  { length: 12 },
  (_, i) => `${String(i * 5).padStart(2, "0")}분`
);
export const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);
export const timeOfDayOptions = ["오전(AM)", "오후(PM)", "낮(PM)", "저녁(PM)"];
