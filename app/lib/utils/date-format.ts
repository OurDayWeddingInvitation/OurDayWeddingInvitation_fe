export const getCurrentYear = () => {
  const curyear = new Date().getFullYear();
  return curyear;
};

export const getFourYears = () => {
  const curyear = new Date().getFullYear();
  const yearOption = Array.from({ length: 4 }, (_, idx) => ({
    label: `${curyear + idx}`,
    value: curyear + idx,
  }));
  return yearOption;
};

export const getEndDay = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

export const getDaysOption = (endDay: number) => {
  const dayOption = Array.from({ length: endDay }, (_, idx) => ({
    label: `${idx + 1}`,
    value: idx + 1,
  }));
  return dayOption;
};

const DAYS_KR = {
  short: ["일", "월", "화", "수", "목", "금", "토"], // "월"
  withParen: ["(일)", "(월)", "(화)", "(수)", "(목)", "(금)", "(토)"], // "(월)"
  full: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"], // "월요일"
};

type DayFormat = "short" | "withParen" | "full";

/**
 * 요일 문자열 반환
 * @param format - "short": 월 | "withParen": (월) | "full": 월요일
 */
export const getDayOfWeek = (
  year: string | number,
  month: string | number,
  day: string | number,
  format: DayFormat = "withParen"
): string => {
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  return DAYS_KR[format][date.getUTCDay()];
};

/**
 * 날짜 텍스트 포맷 (예: "2026.1.24 (토)")
 */
export const formatDateWithDay = (
  year: string | number,
  month: string | number,
  day: string | number,
  dayFormat: DayFormat = "withParen"
): string => {
  const dayOfWeek = getDayOfWeek(year, month, day, dayFormat);
  return `${year}.${month}.${day}\u00A0${dayOfWeek}`;
};

/**
 * 시간 텍스트 포맷 (예: "오후 02:30")
 */
export const formatTime = (
  period: string,
  hour: string,
  minute: string
): string => {
  return `${period}\u00A0${hour}:${minute}`;
};

/**
 * WeddingInfo에서 날짜 정보 추출 및 포맷
 */
export const getFormattedWeddingDate = (
  weddingInfo: {
    weddingYear?: string;
    weddingMonth?: string;
    weddingDay?: string;
  } | null
) => {
  const today = new Date();

  const year = Number(weddingInfo?.weddingYear ?? today.getFullYear());
  const month = Number(weddingInfo?.weddingMonth ?? today.getMonth() + 1);
  const day = Number(weddingInfo?.weddingDay ?? today.getDate());
  const dayOfWeek = getDayOfWeek(year, month, day);

  return {
    year,
    month,
    day,
    dayOfWeek,
    dateText: formatDateWithDay(year, month, day),
  };
};
