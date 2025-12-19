import { create } from "zustand";

type LoadingState = {
  loading: boolean;
  updateLoading: (value: boolean) => void;
};

export const loadingStore = create<LoadingState>((set) => ({
  loading: false,
  updateLoading: (value) => set({ loading: value }),
}));
