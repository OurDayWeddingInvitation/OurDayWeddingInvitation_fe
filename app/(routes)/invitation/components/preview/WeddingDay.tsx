import { useThemeFontStore } from "@/app/store/useThemeFontStore";
import React from "react";

const WeddingDay = () => {
  const themeFont = useThemeFontStore((s) => s.themeFont);
  return (
    <div className="py-10 bg-[#FFFFFF]">
      <div className="text-center">
        <div
          className="tracking-[4px] text-[12px] pb-3 "
          style={{
            color: themeFont?.accentColor,
          }}
        >
          WEDDING DAY
        </div>
        <p className="pb-2">2025.12.27. 토요일 오전 11:20</p>
        <span className="font-bold">더베뉴지서울 1층 네이처홀</span>
      </div>
    </div>
  );
};

export default WeddingDay;
