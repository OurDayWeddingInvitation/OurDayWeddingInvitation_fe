import { create } from "zustand";

type MainImageProp = {
  mainImage: string;
  mainStyleKind: string;

  setMainImage: (src: string) => void;
  setMainStyleKind: (kind: string) => void;
};

export const useMainImageStore = create<MainImageProp>((set) => ({
  mainImage: "",
  mainStyleKind: "",

  setMainImage: (src) => {
    set({ mainImage: src });
  },
  setMainStyleKind: (kind) => {
    set({ mainStyleKind: kind });
  },
}));
