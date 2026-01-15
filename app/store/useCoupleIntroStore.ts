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

  updateCoupleIntroInfo: (partial: Partial<CoupleIntroSectionType>) => void;
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

  updateCoupleIntroInfo: (partial) =>
    set((state) => ({
      coupleIntroInfo: {
        ...(state.coupleIntroInfo ?? {}), // 기존 값 없으면 빈 객체
        ...partial, // 변경 값 덮어쓰기
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
