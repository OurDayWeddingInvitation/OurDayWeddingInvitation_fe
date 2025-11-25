// store/usePreviewModalStore.ts
import { create } from "zustand";

type PreviewModalState = {
  openIndex: number | null;
  openModal: (index: number) => void;
  closeModal: () => void;
};

export const usePreviewModalStore = create<PreviewModalState>((set) => ({
  openIndex: null,
  openModal: (idx) => {
    document.body.style.overflow = "hidden";
    document.body.style.position = "relative";
    set({ openIndex: idx });
  },
  closeModal: () => {
    document.body.style.overflow = "unset";
    set({ openIndex: null });
  }
}));
