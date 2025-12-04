import { create } from "zustand";

type AccountMember = {
  name: string;
  holder: string;
  bank: string;
  number: string;
};

type AccountGroup = {
  group: string;
  members: AccountMember[];
};

type AccountStore = {
  title: string;
  content: string;
  accounts: AccountGroup[];
  setTitle: (text: string) => void;
  setContent: (text: string) => void;
  updateMember: (groupIdx: number, memberIdx: number, field: string, value: string) => void;
};

export const useAccountInfoStore = create<AccountStore>((set) => ({
  title: "마음 전하실 곳",
  content:
    "바쁜 일정으로 참석이 어려우신 분들을 위해 소중한 마음을 전달하실 수 있도록 계좌번호를 함께 안내해드립니다.따뜻한 축복에 깊이 감사드립니다.",
  setTitle: (text) => {
    set({ title: text });
  },
  setContent: (text) => {
    set({ content: text });
  },
  accounts: [
    {
      group: "신랑",
      members: [
        { name: "신랑님", holder: "", bank: "", number: "" },
        { name: "아버님", holder: "", bank: "", number: "" },
        { name: "어머님", holder: "", bank: "", number: "" }
      ]
    },
    {
      group: "신부",
      members: [
        { name: "신부님", holder: "", bank: "", number: "" },
        { name: "아버님", holder: "", bank: "", number: "" },
        { name: "어머님", holder: "", bank: "", number: "" }
      ]
    }
  ],
  updateMember: (groupIdx, memberIdx, field, value) =>
    set((state) => {
      const updated = [...state.accounts];
      updated[groupIdx].members[memberIdx][field] = value;
      return { accounts: updated };
    })
}));
