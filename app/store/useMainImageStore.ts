import { create } from "zustand";
import { ImageDetailItem } from "../lib/fetches/media/type";

type MainImageProp = {
  mainImageInfo: ImageDetailItem | null;
  mainStyleKind: string;

  setMainImageInfo: (data: ImageDetailItem) => void;
  setMainStyleKind: (kind: string) => void;

  updateMainImageInfo: (partial: Partial<ImageDetailItem>) => void;

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

  updateMainImageInfo: (partial) =>
    set((state) => ({
      mainImageInfo: {
        ...(state.mainImageInfo ?? {}), // 기존 값 없으면 빈 객체
        ...partial, // 변경 값 덮어쓰기
      },
    })),

  resetMainImageInfo: () => set({ mainImageInfo: null }),
}));
