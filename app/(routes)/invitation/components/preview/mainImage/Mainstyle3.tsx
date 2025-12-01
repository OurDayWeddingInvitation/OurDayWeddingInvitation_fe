import React from "react";
import { useMainImageStore } from "@/app/store/useMainImageStore";

const Mainstyle3 = () => {
  const { mainImage } = useMainImageStore();
  return (
    <div className="text-[#FFFFFF]">
      <div className="text-center text-[14px] relative" style={{ fontFamily: "GreatVibes" }}>
        {mainImage !== "" && <img src={mainImage} alt="메인 이미지" className="h-[760px] object-cover" />}
        <div className="absolute flex justify-between w-full h-full left-0 top-0 px-3.5 pt-[27px]">
          <span>김관휘</span>
          <span>Wedding Day</span>
          <span>유나영</span>
        </div>
        <div className="absolute left-0 bottom-[73px] text-center w-full px-2.5">
          <div className="text-[36px]">The Beginning of Forever</div>
          <p className="text-[11px]" style={{ fontFamily: "Noto Sans KR" }}>
            <span>IN THE STORY WRITTEN BY TIME AND MEMORY,</span>
            <span>WE ARE GRATEFUL FOR THE CHAPTERS THAT LED US HERE,</span>
            <span>AND BEGIN THE NEXT WITH LOVE OF FOREVER.</span>
          </p>
          <span className="text-[20px]">2025 . 12 . 27</span>
        </div>
      </div>
    </div>
  );
};

export default Mainstyle3;
