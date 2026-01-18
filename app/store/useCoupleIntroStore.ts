import { create } from "zustand";
import { CoupleIntroSectionType } from "../lib/fetches/invitation/type";
import { ImageDetailItem } from "../lib/fetches/media/type";

type CoupleImageType = "groomImage" | "brideImage";

type CoupleIntroProp = {
  coupleIntroInfo: CoupleIntroSectionType | null;
  coupleImageInfo: {
    groomImage: ImageDetailItem | null;
    brideImage: ImageDetailItem | null;
  };

  setCoupleIntroInfo: (data: CoupleIntroSectionType) => void;
  setCoupleImageInfo: (
    data: Partial<{
      groomImage: ImageDetailItem | null;
      brideImage: ImageDetailItem | null;
    }>
  ) => void;

  updateCoupleIntroInfo: <K extends keyof CoupleIntroSectionType>(
    key: K,
    value: CoupleIntroSectionType[K]
  ) => void;
  updateCoupleImageInfo: (
    partial: Partial<{
      groomImage: ImageDetailItem | null;
      brideImage: ImageDetailItem | null;
    }>
  ) => void;

  removeCoupleImage: (key: CoupleImageType) => void;
};

export const useCoupleIntroStore = create<CoupleIntroProp>((set) => ({
  coupleIntroInfo: null,
  coupleImageInfo: {
    groomImage: null,
    brideImage: null,
  },

  setCoupleIntroInfo: (data) => set({ coupleIntroInfo: data }),
  setCoupleImageInfo: (data) =>
    set({
      coupleImageInfo: {
        groomImage: data.groomImage ?? null,
        brideImage: data.brideImage ?? null,
      },
    }),

  updateCoupleIntroInfo: (key, value) =>
    set((state) => ({
      coupleIntroInfo: {
        ...(state.coupleIntroInfo ?? {}),
        [key]: value,
      },
    })),
  updateCoupleImageInfo: (partial) =>
    set((state) => ({
      coupleImageInfo: {
        ...(state.coupleImageInfo ?? { groomImage: null, brideImage: null }),
        ...partial, // 변경 값 덮어쓰기
      },
    })),

  removeCoupleImage: (key) =>
    set((state) => ({
      coupleImageInfo: {
        ...(state.coupleImageInfo ?? { groomImage: null, brideImage: null }),
        [key]: null,
      },
    })),
}));
