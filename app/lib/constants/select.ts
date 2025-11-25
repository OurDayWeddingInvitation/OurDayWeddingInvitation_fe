export type SelectOption = {
  label: string;
  value: string | number;
};

export const familyOptionsMale: SelectOption[] = [
  { label: "아들", value: "아들" },
  { label: "장남", value: "장남" },
  { label: "차남", value: "차남" },
  { label: "삼남", value: "삼남" },
  { label: "사남", value: "사남" },
  { label: "막내", value: "막내" },
  { label: "외동", value: "외동" },
  { label: "독자", value: "독자" },
  { label: "독남", value: "독남" },
  { label: "조카", value: "조카" },
  { label: "손자", value: "손자" },
  { label: "형제", value: "형제" },
  { label: "동생", value: "동생" }
];

export const familyOptionsFemale: SelectOption[] = [
  { label: "딸", value: "딸" },
  { label: "장녀", value: "장녀" },
  { label: "차녀", value: "차녀" },
  { label: "삼녀", value: "삼녀" },
  { label: "사녀", value: "사녀" },
  { label: "막내", value: "막내" },
  { label: "외동", value: "외동" },
  { label: "독녀", value: "독녀" },
  { label: "조카", value: "조카" },
  { label: "손녀", value: "손녀" },
  { label: "자매", value: "자매" },
  { label: "동생", value: "동생" }
];
