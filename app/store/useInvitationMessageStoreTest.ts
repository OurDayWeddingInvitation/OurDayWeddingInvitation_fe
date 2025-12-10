// store/invitationMessageStore.ts
import { create } from "zustand";
import { InvitationMessageSectionType } from "../lib/fetches/invitation/type";

interface InvitationMessageStore {
  invitationMessage: InvitationMessageSectionType | null;
  setInvitationMessage: (data: InvitationMessageSectionType) => void;
  updateInvitationMessageField: <K extends keyof InvitationMessageSectionType>(key: K, value: InvitationMessageSectionType[K]) => void;
  resetInvitationMessage: () => void;
}

export const useInvitationMessageStoreTest = create<InvitationMessageStore>((set) => ({
  invitationMessage: null,

  // API 최초 값을 전체로 세팅
  setInvitationMessage: (data) => set({ invitationMessage: data }),

  // 특정 필드만 변경
  updateInvitationMessageField: (key, value) =>
    set((state) => ({
      invitationMessage: state.invitationMessage
        ? {
            ...state.invitationMessage,
            [key]: value
          }
        : state.invitationMessage // null이면 그대로
    })),

  // 초기화 (선택)
  resetInvitationMessage: () => set({ invitationMessage: null })
}));
