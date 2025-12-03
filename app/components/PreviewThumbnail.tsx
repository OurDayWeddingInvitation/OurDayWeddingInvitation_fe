import React from "react";
import { ChevronRight } from "lucide-react";
import ThumbnailBtm from "@/app/assets/images/thumbnail-btm.svg";
import Image from "next/image";

const PreviewThumbnail = ({ thumbnail, kindIdx }) => {
  const isLink = kindIdx === 1;
  const containerHeight = kindIdx === 0 ? 560 : 400;
  const imageHeight = kindIdx === 0 ? 301 : 115;

  return (
    <div className="bg-[#afc0cf] rounded-[5px] font-medium relative" style={{ height: containerHeight }}>
      <div style={{ fontFamily: "Pretendard", height: containerHeight }}>
        <div className="text-[#F8F8F9] bg-[#95A3B0] text-[11px] w-[130px] py-1 px-1 rounded-full text-center absolute top-8 left-[50%] -translate-x-[50%]">
          0000년 0월 0일 월요일
        </div>
        <div className="absolute right-3 bottom-10">
          {isLink && (
            <div className="relative bg-[#FAE64C] rounded-[13.5px] py-2 px-3 mb-3">
              <div className="text-[#0E6CD3] text-[15px] underline">https://www.ourday.co.kr/FR3d4sq</div>
              <div
                className="absolute -right-[3px] top-[3px] w-4 h-4 bg-[#FAE64C] rotate-273"
                style={{
                  clipPath: "polygon(1px 0px, 100% 0px, 110% 100%)",
                  borderBottomLeftRadius: "10px",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "30px",
                  transform: "translate(0px,6px)"
                }}
              ></div>
            </div>
          )}

          <div className="w-[244px] bg-white rounded-[10px] overflow-hidden">
            {thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={thumbnail} alt="미리보기 이미지" className="w-full bg-[#D2D2D2] object-cover" style={{ height: imageHeight }} />
            ) : (
              <div className="w-full bg-[#D2D2D2]" style={{ height: imageHeight }}></div>
            )}
            {/* 예식 정보 */}
            <div className="bg-white p-3">
              <div className={`${thumbnail ? "opacity-100" : "opacity-0"}`}>
                <div className="font-semibold text-[14px]">김관휘 ❤️ 유나영, 결혼합니다!</div>
                <span className="text-[#767676] text-[12px] w-full block">2025.12.27(토) 오전 11:20 더베뉴지서울 1층</span>
                <span className="text-[#767676] text-[12px] w-full block">네이처홀</span>
              </div>

              {isLink ? (
                <div className="text-[#0E6CD3] text-[12px] underline">https://www.ourday.co.kr/FR3d4sq</div>
              ) : (
                <div>
                  <div className="text-[12px] font-semibold bg-[#F1F2F4] text-center py-2 mt-1 rounded-xs">모바일 청첩장 보기</div>
                  <div className="flex text-[12px] items-center justify-between mt-2">
                    <div className="text-[#CACACA]">아워데이</div>
                    <ChevronRight color={"#CACACA"} size={15} />
                  </div>
                </div>
              )}
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
