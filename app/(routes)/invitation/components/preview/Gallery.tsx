import React from "react";
import { useColorFontStore } from "@/app/store/useColorFontStore";

const Gallery = () => {
  const { pointColor } = useColorFontStore();
  return (
    <div className="text-center">
      <div style={{ color: pointColor }}>GALLERY</div>
      <p>우리의 소중한 순간</p>
      <button className="rounded-full px-3 py-1 text-[#FFFFFF]" style={{ backgroundColor: pointColor }}>
        더보기
      </button>
    </div>
  );
};

export default Gallery;
