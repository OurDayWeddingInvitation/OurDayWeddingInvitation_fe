"use client";

import { WeddingInfoSectionType } from "@/app/lib/fetches/invitation/type";
import { getImagePath } from "@/app/lib/utils/functions";
import { useMainImageStore } from "@/app/store/useMainImageStore";

const Mainstyle3 = ({
  weddingInfo,
}: {
  weddingInfo?: WeddingInfoSectionType;
}) => {
  const mainImageInfo = useMainImageStore((s) => s.mainImageInfo);
  const groomName = `${weddingInfo?.groomLastName ?? ""}${
    weddingInfo?.groomFirstName ?? ""
  }`;
  const brideName = `${weddingInfo?.brideLastName ?? ""}${
    weddingInfo?.brideFirstName ?? ""
  }`;
  const isGroomFirst = weddingInfo?.nameOrderType === "G";

  const imageUrl = mainImageInfo?.editedUrl
    ? getImagePath(mainImageInfo?.editedUrl)
    : getImagePath(mainImageInfo?.originalUrl);
  const cacheVer = new Date(mainImageInfo?.updatedAt).getTime();

  return (
    <div className="box-border overflow-hiddentext-[#FFFFFF]">
      <div
        className="relative flex flex-col h-full text-center text-[14px]"
        style={{ fontFamily: "GreatVibes" }}
      >
        {mainImageInfo ? (
          <img
            src={`${imageUrl}?v=${cacheVer}`}
            alt="메인 이미지"
            className="h-[760px] object-cover"
          />
        ) : (
          <div className="bg-[#D9D9D9] h-[760px]"></div>
        )}
        <div className="absolute flex justify-between w-full h-full left-0 top-0 px-3.5 pt-[27px] ">
          <span>{isGroomFirst ? groomName : brideName}</span>
          <span>Wedding Day</span>
          <span>{isGroomFirst ? brideName : groomName}</span>
        </div>

        {/* 하단 오버레이 텍스트 */}
        <div className="absolute left-0 bottom-[73px] w-full px-2.5 text-center">
          <div className="text-[36px]">The Beginning of Forever</div>

          <p className="text-[11px]" style={{ fontFamily: "Noto Sans KR" }}>
            <span className="block">
              IN THE STORY WRITTEN BY TIME AND MEMORY,
            </span>
            <span className="block">
              WE ARE GRATEFUL FOR THE CHAPTERS THAT LED US HERE,
            </span>
            <span className="block">
              AND BEGIN THE NEXT WITH LOVE OF FOREVER.
            </span>
          </p>

          <span className="text-[20px]">
            {weddingInfo?.weddingYear} . {weddingInfo?.weddingMonth} .{" "}
            {weddingInfo?.weddingDay}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Mainstyle3;
