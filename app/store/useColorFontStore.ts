import { create } from "zustand";

type ColorFontProp = {
  themeColor: string;
  pointColor: string;
  setThemeColor: (color: string) => void;
  setPointColor: (color: string) => void;
};

export const useColorFontStore = create<ColorFontProp>((set) => ({
  themeColor: "#f9f6f4",
  pointColor: "#d2bea9",
  setThemeColor: (color) => {
    set({ themeColor: color });
  },
  setPointColor: (color) => {
    set({ pointColor: color });
  }
}));
