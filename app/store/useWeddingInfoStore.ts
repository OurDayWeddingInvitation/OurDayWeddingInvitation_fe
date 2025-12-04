import { create } from "zustand";

interface ParentInfo {
  name: string;
  isDeceased: boolean;
}

interface PersonInfo {
  lastName: string;
  firstName: string;
  rank: string;
  father: ParentInfo;
  mother: ParentInfo;
}

interface WeddingDate {
  year: number;
  month: number;
  day: number;
}

interface WeddingTime {
  timeOfDay: string;
  hour: string;
  min: string;
}

interface WeddingInfo {
  groom: PersonInfo;
  bride: PersonInfo;
  nameOrder: number;
  date: WeddingDate;
  time: WeddingTime;
  hallName: string;
  hallDetail: string;
}

interface WeddingStore {
  wedding: WeddingInfo;

  setGroom: (data: Partial<PersonInfo>) => void;
  setBride: (data: Partial<PersonInfo>) => void;

  setGroomParent: (parentKey: "father" | "mother", data: Partial<ParentInfo>) => void;
  setBrideParent: (parentKey: "father" | "mother", data: Partial<ParentInfo>) => void;

  setWeddingField: (data: Partial<WeddingInfo>) => void;
  setWeddingDate: (data: Partial<WeddingDate>) => void;
  setWeddingTime: (data: Partial<WeddingTime>) => void;

  setNameOrder: (idx: number) => void;
}

export const useWeddingInfoStore = create<WeddingStore>((set) => ({
  wedding: {
    groom: {
      lastName: "",
      firstName: "",
      rank: "아들",
      father: { name: "", isDeceased: false },
      mother: { name: "", isDeceased: false }
    },

    bride: {
      lastName: "",
      firstName: "",
      rank: "딸",
      father: { name: "", isDeceased: false },
      mother: { name: "", isDeceased: false }
    },

    nameOrder: 0,

    date: {
      year: new Date().getFullYear(),
      month: 1,
      day: 1
    },

    time: {
      timeOfDay: "오전(AM)",
      hour: "1시",
      min: "00분"
    },

    hallName: "",
    hallDetail: ""
  },

  // 신랑
  setGroom: (data) =>
    set((state) => ({
      wedding: {
        ...state.wedding,
        groom: { ...state.wedding.groom, ...data }
      }
    })),

  setGroomParent: (parentKey, data) =>
    set((state) => ({
      wedding: {
        ...state.wedding,
        groom: {
          ...state.wedding.groom,
          [parentKey]: {
            ...state.wedding.groom[parentKey],
            ...data
          }
        }
      }
    })),

  // 신부
  setBride: (data) =>
    set((state) => ({
      wedding: {
        ...state.wedding,
        bride: { ...state.wedding.bride, ...data }
      }
    })),

  setBrideParent: (parentKey, data) =>
    set((state) => ({
      wedding: {
        ...state.wedding,
        bride: {
          ...state.wedding.bride,
          [parentKey]: {
            ...state.wedding.bride[parentKey],
            ...data
          }
        }
      }
    })),

  // 날짜
  setWeddingDate: (data) =>
    set((state) => ({
      wedding: {
        ...state.wedding,
        date: {
          ...state.wedding.date,
          ...data
        }
      }
    })),

  // 시간
  setWeddingTime: (data) =>
    set((state) => ({
      wedding: {
        ...state.wedding,
        time: {
          ...state.wedding.time,
          ...data
        }
      }
    })),

  setWeddingField: (data) =>
    set((state) => ({
      wedding: { ...state.wedding, ...data }
    })),

  setNameOrder: (idx) =>
    set((state) => ({
      wedding: {
        ...state.wedding,
        nameOrder: idx
      }
    }))
}));
