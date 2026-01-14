import { useThemeFontStore } from "@/app/store/useThemeFontStore";
import { useWeddingInfoStore } from "@/app/store/useWeddingInfoStore";
import React from "react";

const WeddingDay = () => {
  const themeFont = useThemeFontStore((s) => s.themeFont);
  const weddingInfo = useWeddingInfoStore((s) => s.weddingInfo);

  const today = new Date();

  const selectedYear = Number(weddingInfo?.weddingYear ?? today.getFullYear());
  const selectedMonth = Number(
    weddingInfo?.weddingMonth ?? today.getMonth() + 1
  );
  const selectedDay = Number(weddingInfo?.weddingDay ?? today.getDate());

  const date = new Date(
    Date.UTC(
      Number(weddingInfo?.weddingYear ?? today.getFullYear()),
      Number(weddingInfo?.weddingMonth ?? today.getMonth() + 1) - 1,
      Number(weddingInfo?.weddingDay ?? today.getDate())
    )
  );
  const days: Array<string> = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  const day = days[date.getUTCDay()];

  const WeddingCalender = () => {
    const firstDayOfWeek = new Date(
      selectedYear,
      selectedMonth - 1,
      1
    ).getDay(); // 0~6
    const lastDate = new Date(selectedYear, selectedMonth, 0).getDate(); // 말일

    const cells: (number | null)[] = [
      ...Array(firstDayOfWeek).fill(null),
      ...Array.from({ length: lastDate }, (_, i) => i + 1),
    ];

    return (
      <div className="w-[300px] border-t border-b border-gray-200 p-8">
        <div
          className="mb-3 text-center text-base font-bold"
          style={{
            color: themeFont?.accentColor,
          }}
        >
          {selectedMonth}
        </div>
        <div className="grid grid-cols-7 text-center text-xs text-[#B5B5B5] mb-3 gap-3">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
            <div key={i} style={{ color: i === 0 ? "#AF0D0D" : null }}>
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-3 text-center text-sm">
          {cells.map((day, index) =>
            day ? (
              <div
                key={index}
                className="flex h-6 items-center justify-center rounded-full"
                style={{
                  color:
                    index % 7 === 0
                      ? "#AF0D0D"
                      : selectedDay === day
                      ? "white"
                      : "#433F3B",
                  backgroundColor:
                    selectedDay === day ? themeFont?.accentColor : null,
                }}
              >
                {day}
              </div>
            ) : (
              <div key={index} />
            )
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="py-10 bg-[#FFFFFF]">
      <div className="text-center">
        <div
          className="tracking-[4px] text-[12px] pb-3 "
          style={{
            color: themeFont?.accentColor,
          }}
        >
          WEDDING DAY
        </div>
        <p className="pb-2 font-bold">
          {selectedYear}.{selectedMonth}.{selectedDay}. {day}{" "}
          {weddingInfo?.weddingTimePeriod ?? ""}{" "}
          {weddingInfo?.weddingHour ?? "00"}:
          {weddingInfo?.weddingMinute ?? "00"}
        </p>
        <span className="font-bold">
          {weddingInfo?.weddingHallName ?? ""}{" "}
          {weddingInfo?.weddingHallFloor ?? ""}
        </span>
      </div>
      <div className="flex justify-center pt-6">
        <WeddingCalender />
      </div>
    </div>
  );
};

export default WeddingDay;
