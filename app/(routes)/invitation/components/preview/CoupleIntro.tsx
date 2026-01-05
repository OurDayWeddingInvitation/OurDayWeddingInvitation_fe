import { useThemeFontStore } from "@/app/store/useThemeFontStore";
import { useWeddingInfoStore } from "@/app/store/useWeddingInfoStore";
import React from "react";

const CoupleIntro = () => {
  const themeFont = useThemeFontStore((s) => s.themeFont);
  const weddingInfo = useWeddingInfoStore((s) => s.weddingInfo);
  const groomName = weddingInfo?.groomLastName + weddingInfo?.groomFirstName;
  const brideName = weddingInfo?.brideLastName + weddingInfo?.brideFirstName;
  return (
    <div
      className="py-10"
      style={{ backgroundColor: themeFont?.backgroundColor ?? "" }}
    >
      <div className="flex flex-col items-center">
        <div
          className="tracking-[4px] text-[12px] pb-3"
          style={{ color: themeFont?.accentColor }}
        >
          GROOM & Bride
        </div>
        <span className="text-[16px]">신랑 & 신부를 소개합니다</span>
        <div className="flex pt-10 gap-2.5 justify-center">
          <div className="flex flex-col items-center">
            {/* 이미지 들어갈 곳 */}
            <div className="w-[145px] h-[145px] bg-[#D9D9D9] rounded-[10px]"></div>
            <div className="flex gap-2.5 justify-center items-center py-2.5">
              <span className="text-[#A9BBD2] text-[12px]">신랑</span>
              <span>{groomName}</span>
            </div>
            <p className="max-w-[110px] py-5 text-center">
              나무같은 남편이 되겠습니다
            </p>
          </div>
          <div className="flex flex-col items-center">
            {/* 이미지 들어갈 곳 */}
            <div className="w-[145px] h-[145px] bg-[#D9D9D9] rounded-[10px]"></div>
            <div className="flex gap-2.5 justify-center items-center py-2.5">
              <span className="text-[#E6A5DA] text-[12px]">신부</span>
              <span>{brideName}</span>
            </div>
            <p className="max-w-[110px] py-5 text-center">
              나무같은 남편이 되겠습니다
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoupleIntro;
