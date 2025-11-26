import { create } from "zustand";

type ColorFontProp = {
  themeColor: string;
  pointColor: string;
  setThemeColor: (color: string) => void;
  setPointColor: (color: string) => void;
};

export const useColorFontStore = create<ColorFontProp>((set) => ({
  themeColor: "#fff6fb",
  pointColor: "#d28bb3",
  setThemeColor: (color) => {
    set({ themeColor: color });
  },
  setPointColor: (color) => {
    set({ pointColor: color });
  }
}));
