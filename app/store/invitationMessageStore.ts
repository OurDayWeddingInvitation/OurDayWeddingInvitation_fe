import { create } from "zustand";
import { DEFAULT_INVITATION_TEXT } from "../components/editor/toolbar/toolbarConfig";

type messageProp = {
  title: string;
  message: string;
  updateTitle: (value: string) => void;
  updateMessage: (value: string) => void;
};

export const useMessageStore = create<messageProp>((set) => ({
  title: "",
  message: DEFAULT_INVITATION_TEXT,
  updateTitle: (value) => set({ title: value }),
  updateMessage: (value) => set({ message: value }),
}));
