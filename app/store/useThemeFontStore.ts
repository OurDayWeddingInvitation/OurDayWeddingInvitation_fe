// store/ThemeFontStore.ts
import { create } from "zustand";
import { ThemeFontSectionType } from "../lib/fetches/invitation/type";

interface ThemeFontStore {
  themeFont: ThemeFontSectionType | null;
  setThemeFont: (data: ThemeFontSectionType) => void;
  updateThemeFontField: <K extends keyof ThemeFontSectionType>(key: K, value: ThemeFontSectionType[K]) => void;
  resetThemeFont: () => void;
}

export const useThemeFontStore = create<ThemeFontStore>((set) => ({
  themeFont: null,

  // API 최초 값을 전체로 세팅
  setThemeFont: (data) => set({ themeFont: data }),

  // 특정 필드만 변경
  updateThemeFontField: (key, value) =>
    set((state) => ({
      themeFont: state.themeFont
        ? {
            ...state.themeFont,
            [key]: value
          }
        : state.themeFont // null이면 그대로
    })),

  // 초기화 (선택)
  resetThemeFont: () => set({ themeFont: null })
}));
