// store/menuSettingStore.ts
import { create } from "zustand";
import { SectionSettingItem } from "../lib/fetches/invitation/type";

interface MenuSettingStore {
  menuSetting: SectionSettingItem[] | null;
  setMenuSetting: (settings: SectionSettingItem[]) => void;
  updateMenuSetting(sectionKey: string, partial: Partial<SectionSettingItem>);
  resetMenuSetting: () => void;
}

export const useMenuSettingStore = create<MenuSettingStore>((set) => ({
  menuSetting: null,

  // API 최초 값을 전체로 세팅
  setMenuSetting: (data) => set({ menuSetting: data }),
  updateMenuSetting: (sectionKey, partial) =>
    set((state) => ({
      menuSetting: state.menuSetting.map((item) =>
        item.sectionKey === sectionKey ? { ...item, ...partial } : item
      ),
    })),
  // 초기화 (선택)
  resetMenuSetting: () => set({ menuSetting: null }),
}));
