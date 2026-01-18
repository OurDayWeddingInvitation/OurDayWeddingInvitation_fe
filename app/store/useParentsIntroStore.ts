import { create } from "zustand";
import { ParentsIntroSectionType } from "../lib/fetches/invitation/type";
import { ImageDetailItem } from "../lib/fetches/media/type";

type ParentsImageType = "groomParentsImage" | "brideParentsImage";

type ParentsIntroProp = {
  parentsIntroInfo: ParentsIntroSectionType | null;
  parentsImageInfo: {
    groomParentsImage: ImageDetailItem | null;
    brideParentsImage: ImageDetailItem | null;
  };

  setParentsIntroInfo: (data: Partial<ParentsIntroSectionType>) => void;
  setParentsImageInfo: (
    data: Partial<{
      groomParentsImage: ImageDetailItem | null;
      brideParentsImage: ImageDetailItem | null;
    }>
  ) => void;

  updateParentsIntroInfo: <K extends keyof ParentsIntroSectionType>(
    key: K,
    value: ParentsIntroSectionType[K]
  ) => void;
  updateParentsImageInfo: (
    partial: Partial<{
      groomParentsImage: ImageDetailItem | null;
      brideParentsImage: ImageDetailItem | null;
    }>
  ) => void;

  removeParentsImage: (key: ParentsImageType) => void;
};

export const useParentsIntroStore = create<ParentsIntroProp>((set) => ({
  parentsIntroInfo: null,
  parentsImageInfo: {
    groomParentsImage: null,
    brideParentsImage: null,
  },

  setParentsIntroInfo: (data) => set({ parentsIntroInfo: data }),
  setParentsImageInfo: (data) =>
    set({
      parentsImageInfo: {
        groomParentsImage: data.groomParentsImage ?? null,
        brideParentsImage: data.brideParentsImage ?? null,
      },
    }),

  updateParentsIntroInfo: (key, value) =>
    set((state) => ({
      parentsIntroInfo: {
        ...(state.parentsIntroInfo ?? {}),
        [key]: value,
      },
    })),
  updateParentsImageInfo: (partial) =>
    set((state) => ({
      parentsImageInfo: {
        ...(state.parentsImageInfo ?? {
          groomParentsImage: null,
          brideParentsImage: null,
        }),
        ...partial, // 변경 값 덮어쓰기
      },
    })),

  removeParentsImage: (key) =>
    set((state) => ({
      parentsImageInfo: {
        ...(state.parentsImageInfo ?? {
          groomParentsImage: null,
          brideParentsImage: null,
        }),
        [key]: null,
      },
    })),
}));
