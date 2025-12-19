import React from "react";
import { useThemeFontStore } from "@/app/store/useThemeFontStore";

const Gallery = () => {
  const themeFont = useThemeFontStore((s) => s.themeFont);
  return (
    <div className="text-center bg-[#FFFFFF]">
      <div className="tracking-[4px] text-[12px] pb-3 pt-[120px]" style={{ color: themeFont?.accentColor }}>
        GALLERY
      </div>
      <p className="pb-[45px]">우리의 소중한 순간</p>
      <div className="grid grid-cols-3 px-4 gap-2">
        {Array.from({ length: 9 }).map((_, idx) => (
          <div className="bg-[#D9D9D9] rounded-[10px] h-[94px]" key={idx}>
            <img src="" />
          </div>
        ))}
      </div>
      <button className="rounded-full px-3 text-[#FFFFFF] my-10 py-1 cursor-pointer" style={{ backgroundColor: themeFont?.accentColor }}>
        더보기
      </button>
    </div>
  );
};

export default Gallery;
