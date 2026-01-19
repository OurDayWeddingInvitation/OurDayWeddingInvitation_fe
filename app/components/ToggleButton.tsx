import React, { useState } from "react";
import { useMenuSettingStore } from "../store/useMenuSettingInfoStore";

const ToggleButton = ({ toggle, isVisble, id }) => {
  const [toolVisible, setToolVisible] = useState<boolean>(false);
  const menuSetting = useMenuSettingStore((s) => s.menuSetting);
  const updateMenuSetting = useMenuSettingStore((s) => s.updateMenuSetting);
  const isVisible =
    menuSetting?.find((item) => item.sectionKey === id)?.isVisible ?? isVisble;

  const handleToggleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setToolVisible(true);
    setTimeout(() => {
      setToolVisible(false);
    }, 1200);
    updateMenuSetting(id, { isVisible: toggle ? true : !isVisible });
  };

  return (
    <div className="shrink-0">
      <div className="relative flex items-center justify-center h-6">
        <button
          onClick={handleToggleClick}
          className={`relative w-10 h-6 rounded-full transition-colors duration-200 cursor-pointer shadow-[0px_5px_4px_rgba(0,0,0,0.08)]
        ${isVisible ? "bg-[#D4C6B7]" : "bg-[#B5B5B5]"}`}
        >
          <span
            className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-200
          ${isVisible ? "translate-x-0" : "-translate-x-4"}`}
          />
        </button>
        {toggle && (
          <div
            className={`absolute bg-[#1A1A1A] text-white rounded-lg p-2 text-[12px] transition-opacity duration-600 ${
              toolVisible ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            필수 항목은 해제할 수 없어요
            <div className="absolute -top-2 left-3 w-0 h-0 border-l-8 border-r-8 border-b-[13.856px] border-l-transparent border-r-transparent border-b-[#1A1A1A]"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToggleButton;
