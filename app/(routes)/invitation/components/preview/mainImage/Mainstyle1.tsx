"use client";

import { WeddingInfoSectionType } from "@/app/lib/fetches/invitation/type";
import { getImagePath } from "@/app/lib/utils/functions";
import { useMainImageStore } from "@/app/store/useMainImageStore";
import { useEffect, useState } from "react";

const Mainstyle1 = ({ weddingInfo }: { weddingInfo?: WeddingInfoSectionType }) => {
  const { mainImageInfo } = useMainImageStore();

  const [weddingDayOfWeek, setWeddingDayOfWeek] = useState<string>("");
  const [weddingDayOfWeekEng, setWeddingDayOfWeekEng] = useState<string>("");

  useEffect(() => {
    if (!weddingInfo?.weddingYear || !weddingInfo?.weddingMonth || weddingInfo?.weddingDay) {
      setWeddingDayOfWeek("월요일");
    }

    const date = new Date(Date.UTC(Number(weddingInfo?.weddingYear), Number(weddingInfo?.weddingMonth) - 1, Number(weddingInfo?.weddingDay)));

    // 날짜 유효성 검증
    if (
      date.getUTCFullYear() !== Number(weddingInfo?.weddingYear) ||
      date.getUTCMonth() !== Number(weddingInfo?.weddingMonth) - 1 ||
      date.getUTCDate() !== Number(weddingInfo?.weddingDay)
    ) {
      //에러 팝업 노출 필요
      throw new Error("유효하지 않은 날짜입니다.");
    }

    const days: Array<string> = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

    const daysEng: Array<string> = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

    setWeddingDayOfWeek(days[date.getUTCDay()]);
    setWeddingDayOfWeekEng(daysEng[date.getUTCDay()]);
  }, [weddingInfo?.weddingYear, weddingInfo?.weddingMonth, weddingInfo?.weddingDay]);

  return (
    <div className="bg-[#FFFFFF] px-[22px] py-[60px] text-[#5E5852]" style={{ fontFamily: "NanumMyeongjo" }}>
      <div className="text-center text-[24px] font-extrabold">
        <span>
          {weddingInfo?.weddingYear} / {weddingInfo?.weddingMonth} /{weddingInfo?.weddingDay}
        </span>
        <div className="text-[14px] font-bold tracking-[2.8px]">{weddingDayOfWeekEng}</div>
        {mainImageInfo ? (
          <img src={getImagePath(mainImageInfo.originalUrl)} alt="메인 이미지2" className="py-[22px] h-[760px] object-cover" />
        ) : (
          <div className="bg-[#D9D9D9] h-[760px]"></div>
        )}
      </div>
      <div className="text-center">
        <div className="text-[20px] font-extrabold pb-[30px]">
          {`${weddingInfo?.groomLastName ?? ""}${weddingInfo?.groomFirstName ?? ""} • ${weddingInfo?.brideLastName ?? ""}${
            weddingInfo?.brideFirstName ?? ""
          }`}
        </div>
        <p>
          {`${weddingInfo?.weddingYear}년 ${weddingInfo?.weddingMonth}월 ${weddingInfo?.weddingDay}일 ${weddingDayOfWeek} ${weddingInfo?.weddingTimePeriod} ${weddingInfo?.weddingHour}시 ${weddingInfo?.weddingMinute}분`}
        </p>
        <p>
          {weddingInfo?.weddingHallName}, {weddingInfo?.weddingHallFloor}
        </p>
      </div>
    </div>
  );
};

export default Mainstyle1;
