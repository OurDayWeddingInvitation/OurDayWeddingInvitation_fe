// store/weddingInfoStore.ts
import { create } from "zustand";

interface WeddingInfoTitleStore {
  weddingInfoTitle: string | null;
  setWeddingInfoTitle: (title: string) => void;
  resetWeddingInfoTitle: () => void;
}
export const useWeddingTitleStore = create<WeddingInfoTitleStore>((set) => ({
  weddingInfoTitle: "",

  setWeddingInfoTitle: (title) => set({ weddingInfoTitle: title }),

  resetWeddingInfoTitle: () => set({ weddingInfoTitle: "" }),
}));
