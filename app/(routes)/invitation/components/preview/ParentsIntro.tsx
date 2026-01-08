import React from "react";
import { useThemeFontStore } from "@/app/store/useThemeFontStore";
import { Heart } from "lucide-react";
import { useWeddingInfoStore } from "@/app/store/useWeddingInfoStore";
import { useFamilyInfoStore } from "@/app/store/useFamilyInfoStore";

const ParentsInfo = () => {
  const themeFont = useThemeFontStore((s) => s.themeFont);
  const familyInfo = useFamilyInfoStore((s) => s.familyInfo);
  const weddingInfo = useWeddingInfoStore((s) => s.weddingInfo);
  const groomName = weddingInfo?.groomFirstName;
  const brideName = weddingInfo?.brideFirstName;
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
          OUR PARENTS
        </div>
        <span className="text-[16px]">우리의 부모님</span>
        <div className="flex flex-col gap-2 items-center py-10">
          <p>저희의 시작을 사랑으로 응원해주신</p>
          <p> 양가 부모님을 소개합니다.</p>
        </div>

        <div className="flex justify-center gap-2.5">
          <div className="flex flex-col items-center">
            {/* 이미지 들어갈 곳 */}
            <div className="w-[145px] h-[145px] bg-[#D9D9D9] rounded-[10px]"></div>
            <div className="flex gap-2.5 justify-center items-center py-2.5 text-[12px]">
              <span className="text-[#A9BBD2]">신랑</span>
              <span>{groomName}의 부모님</span>
            </div>
            <p className="py-5 flex items-center">
              <span>{familyInfo?.groomFatherName}</span>
              <Heart color="#E58989" fill="#E58989" size={18} />
              <span>{familyInfo?.groomMotherName}</span>
            </p>
          </div>
          <div className="flex flex-col items-center">
            {/* 이미지 들어갈 곳 */}
            <div className="w-[145px] h-[145px] bg-[#D9D9D9] rounded-[10px]"></div>
            <div className="flex gap-2.5 justify-center items-center py-2.5 text-[12px]">
              <span className="text-[#A9BBD2]">신부</span>
              <span>{brideName}의 부모님</span>
            </div>
            <p className="py-5 flex items-center">
              <span>{familyInfo?.brideFatherName}</span>
              <Heart color="#E58989" fill="#E58989" size={18} />
              <span>{familyInfo?.brideMotherName}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentsInfo;
