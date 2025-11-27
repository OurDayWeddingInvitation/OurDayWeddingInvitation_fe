import React from "react";
import { ChevronRight } from "lucide-react";
import ThumbnailBtm from "@/app/assets/images/thumbnail-btm.svg";
import Image from "next/image";

const PreviewThumbnail = ({ thumbnail }) => {
  return (
    <div className="h-[603px] bg-[#afc0cf] rounded-[5px] font-medium">
      <div className="h-140 relative" style={{ fontFamily: "Pretendard" }}>
        <div className="text-[#F8F8F9] bg-[#95A3B0] text-[11px] w-[130px] py-1 px-1 rounded-full text-center absolute top-8 left-[50%] -translate-x-[50%]">
          0000년 0월 0일 월요일
        </div>

        <div className="w-[244px] h-[449px] bg-white absolute right-5 bottom-10 rounded-[10px] overflow-hidden">
          {thumbnail ? (
            <img src={thumbnail} alt="미리보기 이미지" className="w-full h-[301px] bg-[#D2D2D2] object-cover" />
          ) : (
            <div className="w-full h-[301px] bg-[#D2D2D2]"></div>
          )}
          {/* 예식 정보 */}
          <div className="bg-white p-3">
            <div className="font-semibold">김관휘 ❤️ 유나영, 결혼합니다!</div>
            <span className="text-[#767676] text-[12px] w-full block">2025.12.27(토) 오전 11:20 더베뉴지서울 1층</span>
            <span className="text-[#767676] text-[12px] w-full block">네이처홀</span>
            <div className="text-[12px] font-semibold bg-[#F1F2F4] text-center py-2 mt-1 rounded-xs">모바일 청첩장 보기</div>
            <div className="flex text-[12px] items-center justify-between mt-2">
              <div className="text-[#CACACA]">아워데이</div>
              <ChevronRight color={"#CACACA"} size={15} />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white h-[45px]">
        <Image src={ThumbnailBtm} alt="하단" />
      </div>
    </div>
  );
};

export default PreviewThumbnail;
