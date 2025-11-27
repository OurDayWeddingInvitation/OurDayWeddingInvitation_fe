import { create } from "zustand";

type ColorFontProp = {
  fontSize: number;
  fontStyle: string;
  themeColor: string;
  pointColor: string;
  setFontSize: (size: number) => void;
  setFontStyle: (style: string) => void;
  setThemeColor: (color: string) => void;
  setPointColor: (color: string) => void;
};

export const useColorFontStore = create<ColorFontProp>((set) => ({
  fontSize: 14,
  fontStyle: "Nanum Myeongjo",
  themeColor: "#fff6fb",
  pointColor: "#d28bb3",
  setFontSize: (size) => {
    set({ fontSize: size });
  },
  setFontStyle: (style) => {
    set({ fontStyle: style });
  },
  setThemeColor: (color) => {
    set({ themeColor: color });
  },
  setPointColor: (color) => {
    set({ pointColor: color });
  }
}));
