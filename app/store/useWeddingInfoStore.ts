// store/weddingInfoStore.ts
import { create } from "zustand";
import { WeddingInfoSectionType } from "../lib/fetches/invitation/type";

interface WeddingInfoStore {
  weddingInfo: WeddingInfoSectionType | null;
  setWeddingInfo: (data: WeddingInfoSectionType) => void;
  updateWeddingInfoField: <K extends keyof WeddingInfoSectionType>(
    key: K,
    value: WeddingInfoSectionType[K]
  ) => void;
  resetWeddingInfo: () => void;
}

export const useWeddingInfoStore = create<WeddingInfoStore>((set) => ({
  weddingInfo: null,

  // API 최초 값을 전체로 세팅
  setWeddingInfo: (data) => set({ weddingInfo: data }),

  // 특정 필드만 변경
  updateWeddingInfoField: (key, value) =>
    set((state) => ({
      weddingInfo: state.weddingInfo
        ? {
            ...state.weddingInfo,
            [key]: value,
          }
        : state.weddingInfo, // null이면 그대로
    })),

  // 초기화 (선택)
  resetWeddingInfo: () => set({ weddingInfo: null }),
}));
