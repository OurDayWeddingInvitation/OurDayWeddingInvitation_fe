export const getCurrentYear = () => {
  const curyear = new Date().getFullYear();
  return curyear;
};

export const getFourYears = () => {
  const curyear = new Date().getFullYear();
  const yearOption = Array.from({ length: 4 }, (_, idx) => ({
    label: `${curyear + idx}`,
    value: curyear + idx
  }));
  return yearOption;
};

export const getEndDay = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

export const getDaysOption = (endDay: number) => {
  const dayOption = Array.from({ length: endDay }, (_, idx) => ({
    label: `${idx + 1}`,
    value: idx + 1
  }));
  return dayOption;
};
