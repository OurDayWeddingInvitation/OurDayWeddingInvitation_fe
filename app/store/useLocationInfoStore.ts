// store/LocationInfoStore.ts
import { create } from "zustand";
import { LocationInfoSectionType } from "../lib/fetches/invitation/type";

interface LocationInfoStore {
  locationInfo: LocationInfoSectionType | null;
  setLocationInfo: (data: LocationInfoSectionType) => void;
  updateLocationInfoField: <K extends keyof LocationInfoSectionType>(key: K, value: LocationInfoSectionType[K]) => void;
  resetLocationInfo: () => void;
}

export const useLocationInfoStore = create<LocationInfoStore>((set) => ({
  locationInfo: null,

  // API 최초 값을 전체로 세팅
  setLocationInfo: (data) => set({ locationInfo: data }),

  // 특정 필드만 변경
  updateLocationInfoField: (key, value) =>
    set((state) => ({
      locationInfo: state.locationInfo
        ? {
            ...state.locationInfo,
            [key]: value
          }
        : state.locationInfo // null이면 그대로
    })),

  // 초기화 (선택)
  resetLocationInfo: () => set({ locationInfo: null })
}));
