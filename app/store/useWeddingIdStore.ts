import { create } from "zustand";

type WeddingIdProp = {
  weddingId: string;
  setWeddingId: (weddingId: string) => void;
};

export const useWeddingIdStore = create<WeddingIdProp>((set) => ({
  weddingId: "",

  setWeddingId: (id) => {
    set({ weddingId: id });
  },
}));
