import React from "react";
import { useMainImageStore } from "@/app/store/useMainImageStore";

const Mainstyle2 = () => {
  const { mainImage } = useMainImageStore();
  return (
    <div className="bg-[#FFFFFF] pt-[46px] text-[#5E5852]" style={{ fontFamily: "NanumMyeongjo" }}>
      <div className="text-center text-[20px]">
        <span className="font-extrabold">김관휘 ♥ 유나영</span>
        <div className="text-center text-[14px] pt-[30px]">
          <p>2025년 12월 27일 토요일 오전 11시 20분</p>
          <p>더베뉴지서울 1층, 네이처홀</p>
        </div>
        {mainImage !== "" && (
          <img
            src={mainImage}
            alt="메인 이미지"
            className="h-[760px] object-cover"
            style={{
              WebkitMaskImage: `linear-gradient(
      180deg,
      transparent 0%,
      rgba(0,0,0,0.25) 10%,
      rgba(0,0,0,1) 20%,
      rgba(0,0,0,1) 80%,
      rgba(0,0,0,0.25) 90%,
      transparent 100%
    )`,
              maskImage: `linear-gradient(
      180deg,
      transparent 0%,
      rgba(0,0,0,0.25) 10%,
      rgba(0,0,0,1) 20%,
      rgba(0,0,0,1) 80%,
      rgba(0,0,0,0.25) 90%,
      transparent 100%
    )`,
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskSize: "cover"
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Mainstyle2;
