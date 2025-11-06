// store/useCounterStore.ts
import { create } from "zustand";

type SectionFirst = {
  title: string;
  description: string;
  updateTitle: (value: string) => void;
  updateDescription: (value: string) => void;
};

export const useCounterStore = create<SectionFirst>((set) => ({
  title: "",
  description: "",
  updateTitle: (value) => set({ title: value }),
  updateDescription: (value) => set({ description: value }),
}));
