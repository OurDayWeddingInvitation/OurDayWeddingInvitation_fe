import { create } from "zustand";
import { ImageDetailItem } from "../lib/fetches/invitation/type";

type MainImageProp = {
  mainImageInfo: ImageDetailItem | null;
  mainStyleKind: string;

  setMainImageInfo: (data: ImageDetailItem) => void;
  setMainStyleKind: (kind: string) => void;

  updateMainImageInfo: (data: ImageDetailItem) => void;

  resetMainImageInfo: () => void;
};

export const useMainImageStore = create<MainImageProp>((set) => ({
  mainImageInfo: null,
  mainStyleKind: "",

  setMainImageInfo: (data) => {
    set({ mainImageInfo: data });
  },

  setMainStyleKind: (kind) => {
    set({ mainStyleKind: kind });
  },

  updateMainImageInfo: (data) =>
    set((state) => ({
      mainImageInfo: state.mainImageInfo
        ? { ...state.mainImageInfo, ...data }
        : { ...data },
    })),

  resetMainImageInfo: () => set({ mainImageInfo: null }),
}));
