export const getCurrentYear = () => {
  const curyear = new Date().getFullYear();
  return curyear;
};

export const getFourYears = () => {
  const curyear = new Date().getFullYear();
  const yearOption = Array.from({ length: 4 }, (_, idx: number) => curyear + idx);
  return yearOption;
};

export const getEndDay = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

export const getDaysOption = (endDay) => {
  const dayOption = Array.from({ length: endDay }, (_, idx: number) => idx + 1);
  return dayOption;
};
