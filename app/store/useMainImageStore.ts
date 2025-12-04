import { create } from "zustand";

type MainImageProp = {
  mainImage: string;
  setMainImage: (src: string) => void;
};

export const useMainImageStore = create<MainImageProp>((set) => ({
  mainImage: "",
  setMainImage: (src) => {
    set({ mainImage: src });
  }
}));
