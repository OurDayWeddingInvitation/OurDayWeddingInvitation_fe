// store/AccountInfoStore.ts
import { create } from "zustand";
import { AccountInfoSectionType } from "../lib/fetches/invitation/type";

interface AccountInfoStore {
  accountInfo: AccountInfoSectionType | null;
  setAccountInfo: (data: AccountInfoSectionType) => void;
  updateAccountInfoField: <K extends keyof AccountInfoSectionType>(key: K, value: AccountInfoSectionType[K]) => void;
  resetAccountInfo: () => void;
}

export const useAccountInfoStoreTest = create<AccountInfoStore>((set) => ({
  accountInfo: null,

  // API 최초 값을 전체로 세팅
  setAccountInfo: (data) => set({ accountInfo: data }),

  // 특정 필드만 변경
  updateAccountInfoField: (key, value) =>
    set((state) => ({
      accountInfo: state.accountInfo
        ? {
            ...state.accountInfo,
            [key]: value
          }
        : state.accountInfo // null이면 그대로
    })),

  // 초기화 (선택)
  resetAccountInfo: () => set({ accountInfo: null })
}));
