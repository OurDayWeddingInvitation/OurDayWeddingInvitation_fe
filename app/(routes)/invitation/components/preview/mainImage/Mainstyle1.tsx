"use client";

import { WeddingInfoSectionType } from "@/app/lib/fetches/invitation/type";
import { getImagePath } from "@/app/lib/utils/functions";
import { useMainImageStore } from "@/app/store/useMainImageStore";
import { useEffect, useState } from "react";

const Mainstyle1 = ({
  weddingInfo,
}: {
  weddingInfo?: WeddingInfoSectionType;
}) => {
  const mainImageInfo = useMainImageStore((s) => s.mainImageInfo);

  const [weddingDayOfWeek, setWeddingDayOfWeek] = useState<string>("");
  const [weddingDayOfWeekEng, setWeddingDayOfWeekEng] = useState<string>("");

  const groomName = `${weddingInfo?.groomLastName ?? ""}${
    weddingInfo?.groomFirstName ?? ""
  }`;
  const brideName = `${weddingInfo?.brideLastName ?? ""}${
    weddingInfo?.brideFirstName ?? ""
  }`;
  const orderedNames =
    weddingInfo?.nameOrderType === "G"
      ? `${groomName} • ${brideName}`
      : `${brideName} • ${groomName}`;

  const imageUrl = mainImageInfo.editedUrl
    ? getImagePath(mainImageInfo.editedUrl)
    : getImagePath(mainImageInfo.originalUrl);
  const cacheVer = new Date(mainImageInfo.updatedAt).getTime();

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

    const daysEng: Array<string> = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ];

    setWeddingDayOfWeek(days[date.getUTCDay()]);
    setWeddingDayOfWeekEng(daysEng[date.getUTCDay()]);
  }, [
    weddingInfo?.weddingYear,
    weddingInfo?.weddingMonth,
    weddingInfo?.weddingDay,
  ]);

  return (
    <div
      className="
    h-screen box-border overflow-hidden
    bg-[#FFFFFF] px-[22px] py-[60px]
    text-[#5E5852]
    flex flex-col
  "
      style={{ fontFamily: "NanumMyeongjo" }}
    >
      {/* 상단 날짜 */}
      <div className="text-center text-[24px] font-extrabold shrink-0">
        <span>
          {weddingInfo?.weddingYear} / {weddingInfo?.weddingMonth} /
          {weddingInfo?.weddingDay}
        </span>
        <div className="text-[14px] font-bold tracking-[2.8px]">
          {weddingDayOfWeekEng}
        </div>
      </div>

      {/* 이미지 영역 */}
      <div className="flex-1 min-h-0 overflow-hidden py-[22px] flex items-center justify-center">
        {mainImageInfo ? (
          <img
            src={`${imageUrl}?v=${cacheVer}`}
            alt="메인 이미지"
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <div className="w-full h-full bg-[#D9D9D9]" />
        )}
      </div>

      {/* 하단 텍스트 */}
      <div className="text-center shrink-0">
        <div className="text-[20px] font-extrabold pb-[30px]">
          {orderedNames}
        </div>
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
  );
};

export default Mainstyle1;
