import { create } from "zustand";

interface SectionDefaultButton {
  fontIdx: number;
  fontSize: number;
  nameOrder: number;
  setFontIdx: (idx: number) => void;
  setFontSize: (idx: number) => void;
  setNameOrder: (idx: number) => void;
}

export const useSectionDefaultButtonStore = create<SectionDefaultButton>((set) => ({
  fontIdx: 0,
  fontSize: 1,
  nameOrder: 0,
  setFontIdx: (idx) => set({ fontIdx: idx }),
  setFontSize: (idx) => set({ fontSize: idx }),
  setNameOrder: (idx) => set({ nameOrder: idx })
}));
