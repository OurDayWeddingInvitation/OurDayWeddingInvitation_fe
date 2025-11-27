import { create } from "zustand";

interface SectionDefaultButton {
  fontIdx: number;
  fontSize: number;
  nameOrder: number;
  setFontIdx: (idx: number) => void;
  setFontSizeIdx: (idx: number) => void;
  setNameOrder: (idx: number) => void;
}

export const useSectionDefaultButtonStore = create<SectionDefaultButton>((set) => ({
  fontIdx: 0,
  fontSize: 0,
  nameOrder: 0,
  setFontIdx: (idx) => set({ fontIdx: idx }),
  setFontSizeIdx: (idx) => set({ fontSize: idx }),
  setNameOrder: (idx) => set({ nameOrder: idx })
}));
