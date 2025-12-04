import { create } from "zustand";

type MainStyleProp = {
  mainStyleKind: string;
  setMainStyleKind: (kind: string) => void;
};

export const useMainStyleStore = create<MainStyleProp>((set) => ({
  mainStyleKind: null,
  setMainStyleKind: (kind) => {
    set({ mainStyleKind: kind });
  }
}));
