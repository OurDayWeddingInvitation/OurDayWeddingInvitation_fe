import React from "react";
import { useMainImageStore } from "@/app/store/useMainImageStore";

const Mainstyle1 = () => {
  const { mainImage } = useMainImageStore();
  return (
    <div className="bg-[#FFFFFF] px-[22px] py-[60px] text-[#5E5852]" style={{ fontFamily: "NanumMyeongjo" }}>
      <div className="text-center text-[24px] font-extrabold">
        <span>2025 / 12 / 27</span>
        <div className="text-[14px] font-bold tracking-[2.8px]">SATURDAY</div>
        {mainImage !== "" && <img src={mainImage} alt="메인 이미지" className="py-[22px] h-[760px] object-cover" />}
      </div>
      <div className="text-center">
        <div className="text-[20px] font-extrabold pb-[30px]">김관휘 • 유나영</div>
        <p>2025년 12월 27일 토요일 오전 11시 20분</p>
        <p>더베뉴지서울 1층, 네이처홀</p>
      </div>
    </div>
  );
};

export default Mainstyle1;
