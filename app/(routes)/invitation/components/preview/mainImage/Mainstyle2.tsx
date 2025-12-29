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
  const { mainImageInfo } = useMainImageStore();

  const [weddingDayOfWeek, setWeddingDayOfWeek] = useState<string>("");

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
      className="bg-[#FFFFFF] pt-[46px] text-[#5E5852]"
      style={{ fontFamily: "NanumMyeongjo" }}
    >
      <div className="text-center text-[20px]">
        <span className="font-extrabold">
          {`${weddingInfo?.groomLastName}${weddingInfo?.groomFirstName}`} ♥
          {`${weddingInfo?.brideLastName}${weddingInfo?.brideFirstName}`}
        </span>
        <div className="text-center text-[14px] pt-[30px]">
          <p>
            {`${weddingInfo?.weddingYear}년 ${weddingInfo?.weddingMonth}월 ${weddingInfo?.weddingDay}일 ${weddingDayOfWeek} ${weddingInfo?.weddingTimePeriod} ${weddingInfo?.weddingHour}시 ${weddingInfo?.weddingMinute}분`}
          </p>
          <p>
            {weddingInfo?.weddingHallName}, {weddingInfo?.weddingHallFloor}
          </p>
        </div>
        {mainImageInfo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={getImagePath(mainImageInfo.originalUrl)}
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
              WebkitMaskSize: "cover",
            }}
          />
        ) : (
          <div className="bg-[#D9D9D9] h-[760px]"></div>
        )}
      </div>
    </div>
  );
};

export default Mainstyle2;
