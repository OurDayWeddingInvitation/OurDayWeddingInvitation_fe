import { create } from "zustand";
import { DEFAULT_INVITATION_TEXT } from "../components/editor/toolbar/toolbarConfig";

type messageProp = {
  invitationTitle: string;
  invitationMessage: string;
  setInvitatinoTitle: (value: string) => void;
  setInvitationMessage: (value: string) => void;
};

export const useMessageStore = create<messageProp>((set) => ({
  invitationTitle: "소중한 분들을 초대합니다",
  invitationMessage: DEFAULT_INVITATION_TEXT,
  setInvitatinoTitle: (value) => set({ invitationTitle: value }),
  setInvitationMessage: (value) => set({ invitationMessage: value })
}));
