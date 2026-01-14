import { create } from "zustand";
import { LoadingScreenSectionType } from "../lib/fetches/invitation/type";

type LoadingScreenProp = {
  loadingScreenStyle: LoadingScreenSectionType | null;
  setLoadingScreenStyle: (data: LoadingScreenSectionType | null) => void;
};

export const useLoadingScreenStore = create<LoadingScreenProp>((set) => ({
  loadingScreenStyle: null,
  setLoadingScreenStyle: (data) => set({ loadingScreenStyle: data }),
}));
