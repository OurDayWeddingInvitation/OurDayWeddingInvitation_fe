import { create } from "zustand";
import { InvitationMessageSectionType } from "../lib/fetches/invitation/type";

type messageProp = {
  invitationMessage: InvitationMessageSectionType | null;
  setInvitationMessage: (data: InvitationMessageSectionType) => void;
  updateInvitationMessage: <K extends keyof InvitationMessageSectionType>(
    key: K,
    value: InvitationMessageSectionType[K]
  ) => void;
};

export const useInvitationMessageStore = create<messageProp>((set) => ({
  invitationMessage: null,
  setInvitationMessage: (data) => set({ invitationMessage: data }),
  updateInvitationMessage: (key, value) =>
    set((state) => ({
      invitationMessage: state.invitationMessage
        ? { ...state.invitationMessage, [key]: value }
        : state.invitationMessage,
    })),
}));
