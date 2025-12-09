// store/weddingInfoStore.ts
import { create } from "zustand";
import { FamilyInfoSectionType } from "../lib/fetches/invitation/type";

interface FamilyInfoStore {
  familyInfo: FamilyInfoSectionType | null;
  setFamilyInfo: (data: FamilyInfoSectionType) => void;
  updateFamilyInfoField: <K extends keyof FamilyInfoSectionType>(key: K, value: FamilyInfoSectionType[K]) => void;
  resetFamilyInfo: () => void;
}

export const useFamilyInfoStore = create<FamilyInfoStore>((set) => ({
  familyInfo: null,

  // API 최초 값을 전체로 세팅
  setFamilyInfo: (data) => set({ familyInfo: data }),

  // 특정 필드만 변경
  updateFamilyInfoField: (key, value) =>
    set((state) => ({
      familyInfo: state.familyInfo
        ? {
            ...state.familyInfo,
            [key]: value
          }
        : state.familyInfo // null이면 그대로
    })),

  // 초기화 (선택)
  resetFamilyInfo: () => set({ familyInfo: null })
}));
