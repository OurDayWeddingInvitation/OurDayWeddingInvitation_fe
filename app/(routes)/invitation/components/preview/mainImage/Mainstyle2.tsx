"use client";

import { WeddingInfoSectionType } from "@/app/lib/fetches/invitation/type";
import { getImagePath } from "@/app/lib/utils/functions";
import { useMainImageStore } from "@/app/store/useMainImageStore";
import { useEffect, useState } from "react";

const Mainstyle2 = ({
  weddingInfo,
}: {
  weddingInfo?: WeddingInfoSectionType;
}) => {
  const mainImageInfo = useMainImageStore((s) => s.mainImageInfo);

  const [weddingDayOfWeek, setWeddingDayOfWeek] = useState<string>("");

  const groomName = `${weddingInfo?.groomLastName ?? ""}${
    weddingInfo?.groomFirstName ?? ""
  }`;
  const brideName = `${weddingInfo?.brideLastName ?? ""}${
    weddingInfo?.brideFirstName ?? ""
  }`;
  const orderedNames =
    weddingInfo?.nameOrderType === "G"
      ? `${groomName} ♥ ${brideName}`
      : `${brideName} ♥ ${groomName}`;

  useEffect(() => {
    if (
      !weddingInfo?.weddingYear ||
      !weddingInfo?.weddingMonth ||
      weddingInfo?.weddingDay
    ) {
      setWeddingDayOfWeek("월요일");
    }

    const date = new Date(
      Date.UTC(
        Number(weddingInfo?.weddingYear),
        Number(weddingInfo?.weddingMonth) - 1,
        Number(weddingInfo?.weddingDay)
      )
    );

    // 날짜 유효성 검증
    if (
      date.getUTCFullYear() !== Number(weddingInfo?.weddingYear) ||
      date.getUTCMonth() !== Number(weddingInfo?.weddingMonth) - 1 ||
      date.getUTCDate() !== Number(weddingInfo?.weddingDay)
    ) {
      //에러 팝업 노출 필요
      throw new Error("유효하지 않은 날짜입니다.");
    }

    const days: Array<string> = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ];

    setWeddingDayOfWeek(days[date.getUTCDay()]);
  }, [
    weddingInfo?.weddingYear,
    weddingInfo?.weddingMonth,
    weddingInfo?.weddingDay,
  ]);

  return (
    <div
      className="
    h-screen box-border overflow-hidden
    bg-[#FFFFFF] pt-[46px]
    text-[#5E5852]
    flex flex-col
  "
      style={{ fontFamily: "NanumMyeongjo" }}
    >
      <div className="text-center text-[20px]">
        <span className="font-extrabold">{orderedNames}</span>
        <div className="text-center text-[14px] pt-[30px]">
          <p>
            {`${weddingInfo?.weddingYear}년 ${weddingInfo?.weddingMonth}월
          ${weddingInfo?.weddingDay}일 ${weddingDayOfWeek}
          ${weddingInfo?.weddingTimePeriod}
          ${weddingInfo?.weddingHour}시 ${weddingInfo?.weddingMinute}분`}
          </p>
          <p>
            {weddingInfo?.weddingHallName}, {weddingInfo?.weddingHallFloor}
          </p>
        </div>
      </div>

      {/* 이미지 영역 */}
      <div className="flex-1 min-h-0 overflow-hidden flex items-center justify-center">
        {mainImageInfo ? (
          <img
            src={
              mainImageInfo.editedUrl
                ? getImagePath(mainImageInfo.editedUrl)
                : getImagePath(mainImageInfo.originalUrl)
            }
            alt="메인 이미지"
            className="max-w-full max-h-full object-contain"
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
              WebkitMaskSize: "contain",
            }}
          />
        ) : (
          <div className="w-full h-full bg-[#D9D9D9]" />
        )}
      </div>
    </div>
  );
};

export default Mainstyle2;
