import React from "react";
import { useMainImageStore } from "@/app/store/useMainImageStore";

const Mainstyle3 = ({ wedding }) => {
  const { mainImage } = useMainImageStore();
  const { date, groom, bride } = wedding;
  const year = date.year;
  const month = date.month;
  const day = date.day;
  const groomName = groom.lastName + groom.firstName;
  const brideName = bride.lastName + bride.firstName;

  return (
    <div className="text-[#FFFFFF]">
      <div className="text-center text-[14px] relative" style={{ fontFamily: "GreatVibes" }}>
        {mainImage !== "" ? (
          <img src={mainImage} alt="메인 이미지" className="h-[760px] object-cover" />
        ) : (
          <div className="bg-[#D9D9D9] h-[760px]"></div>
        )}
        <div className="absolute flex justify-between w-full h-full left-0 top-0 px-3.5 pt-[27px] ">
          <span>{groomName}</span>
          <span>Wedding Day</span>
          <span>{brideName}</span>
        </div>
        <div className="absolute left-0 bottom-[73px] text-center w-full px-2.5 z-9">
          <div className="text-[36px]">The Beginning of Forever</div>
          <p className="text-[11px]" style={{ fontFamily: "Noto Sans KR" }}>
            <span>IN THE STORY WRITTEN BY TIME AND MEMORY,</span>
            <span>WE ARE GRATEFUL FOR THE CHAPTERS THAT LED US HERE,</span>
            <span>AND BEGIN THE NEXT WITH LOVE OF FOREVER.</span>
          </p>
          <span className="text-[20px]">
            {year} . {month} . {day}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Mainstyle3;
