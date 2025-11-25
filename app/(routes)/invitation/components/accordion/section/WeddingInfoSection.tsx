import React, { useState } from "react";
import { Check } from "lucide-react";
import { familyOptionsMale, familyOptionsFemale, hoursOptions, minutesOptions, monthOptions, timeOfDayOptions } from "@/app/lib/constants";
import SelectBox from "@/app/components/SelectBox";
import { getCurrentYear, getFourYears, getEndDay, getDaysOption } from "@/app/lib/utils/date-format";
import SectionDefaultButton from "@/app/components/SectionDefaultButton";
import { useSectionDefaultButtonStore } from "@/app/store/useSectionDefaultButtonStore";

type dateType = {
  year: number;
  month: string;
  day: string;
};
type timeType = {
  timeOfDay: string;
  hour: string;
  min: string;
};

const WeddingInfoSection = () => {
  const [date, setDate] = useState<dateType>({
    year: getCurrentYear(),
    month: "1",
    day: "1"
  });
  const [time, setTime] = useState<timeType>({
    timeOfDay: "오전(AM)",
    hour: "1시",
    min: "00분"
  });
  const { nameOrder, setNameOrder } = useSectionDefaultButtonStore();

  const inputStyle = "outline-0 flex-1 border-[#E0E0E0] border placeholder:text-center rounded-sm text-sm py-1.5 px-1";
  const fieldGroup = "flex flex-col gap-2.5 w-full";
  const fieldStyle = "flex flex-wrap items-center";
  const labelStyle = "w-1/6 min-w-[50px]";
  const selectStyle = `${inputStyle} relative flex justify-around cursor-pointer`;

  const parents = ["아버지", "어머니"];
  const label = ["신랑", "신부"];

  const endDay = getEndDay(date.year, Number(date.month)); //월 끝 날짜

  return (
    <div className="flex flex-col gap-9 w-full pt-4">
      {/* 신랑 / 신부 예식 기본 정보 */}
      {label.map((role, roleIdx) => {
        const selectFamilyOption = roleIdx === 0 ? familyOptionsMale : familyOptionsFemale;
        const roleKind = roleIdx === 0 ? "아들" : "딸";
        return (
          <div className={fieldGroup} key={roleIdx}>
            <div className={fieldStyle}>
              <div className={labelStyle}>{role}</div>
              <div className="flex flex-1 gap-2.5 items-center flex-wrap">
                <input type="text" placeholder="성" className={`${inputStyle} min-w-[50px] max-w-[70px]`} id="lastName" />
                <input type="text" placeholder="이름" className={`${inputStyle} min-w-20 max-w-[150px]`} id="firstName" />
                <SelectBox
                  style={`${inputStyle} relative flex justify-around cursor-pointer`}
                  selectOption={selectFamilyOption}
                  initialValue={roleKind}
                  onChange={() => {}}
                />
              </div>
            </div>

            {parents.map((name, parentIdx) => {
              const checkId = `check-${roleIdx}-${parentIdx}`;
              return (
                <div className={fieldStyle} key={parentIdx}>
                  <div className={labelStyle}>{name}</div>
                  <div className="flex flex-1 gap-2.5 items-center flex-wrap">
                    <input type="text" placeholder="성함" className={`${inputStyle} min-w-20 max-w-[230px]`} />
                    <input type="checkbox" id={checkId} className="peer absolute opacity-0 w-5 h-5" />
                    <label
                      htmlFor={checkId}
                      className="w-5 h-5 border border-[#E0E0E0] rounded-sm flex items-center justify-center peer-checked:bg-[#433F3B] cursor-pointer"
                    >
                      <Check className="peer-checked:block text-white" />
                    </label>
                    <span>故</span>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
      <div className="border-t border-[#E0E0E0]"></div>
      {/* 순서 */}
      <div className={fieldStyle}>
        <div className={labelStyle}>순서</div>
        <div className="font-light">
          <div className="flex gap-2.5 items-baseline py-[5px]">
            {label.map((role, idx) => (
              <SectionDefaultButton
                key={idx}
                title={`${role} 이름 먼저`}
                size={"text-[16px]"}
                clickIdx={nameOrder}
                idx={idx}
                onClick={() => setNameOrder(idx)}
                kind="nameOrder"
              />
            ))}
          </div>
          <p className="text-[#CACACA] text-[12px] leading-[26px]">청첩장 전체에 신랑 측 정보가 먼저 표기됩니다.</p>
        </div>
      </div>
      <div className="border-t border-[#E0E0E0]"></div>
      {/* 예식 일자 / 시간*/}
      <div className={fieldGroup}>
        <div className={fieldStyle}>
          <div className={labelStyle}>예식 일자</div>
          <div className="flex flex-1 gap-2.5 items-center flex-wrap">
            <SelectBox
              style={selectStyle}
              selectOption={getFourYears()}
              initialValue={date.year}
              onChange={(val: number) => setDate((prev) => ({ ...prev, year: val }))}
            />
            <SelectBox
              style={selectStyle}
              selectOption={monthOptions}
              initialValue={date.month}
              onChange={(val: string) => setDate((prev) => ({ ...prev, month: val }))}
            />
            <SelectBox
              style={selectStyle}
              selectOption={getDaysOption(endDay)}
              initialValue={date.day}
              onChange={(val: string) => setDate((prev) => ({ ...prev, day: val }))}
            />
          </div>
        </div>
        <div className={fieldStyle}>
          <div className={labelStyle}>예식 시간</div>
          <div className="flex flex-1 gap-2.5 items-center flex-wrap">
            <SelectBox
              style={selectStyle}
              selectOption={timeOfDayOptions}
              initialValue={time.timeOfDay}
              onChange={(val: string) => setTime((prev) => ({ ...prev, timeOfDay: val }))}
            />
            <SelectBox
              style={selectStyle}
              selectOption={hoursOptions}
              initialValue={time.hour}
              onChange={(val: string) => setTime((prev) => ({ ...prev, hour: val }))}
            />
            <SelectBox
              style={selectStyle}
              selectOption={minutesOptions}
              initialValue={time.min}
              onChange={(val: string) => setTime((prev) => ({ ...prev, min: val }))}
            />
          </div>
        </div>

        {/* 예식장 명 / 층과 홀*/}
      </div>
      <div className="border-t border-[#E0E0E0]"></div>
      <div className={fieldGroup}>
        <div className={fieldStyle}>
          <div className={labelStyle}>예식장명</div>
          <input type="text" placeholder="예식장명" className={`${inputStyle} min-w-20 max-w-[230px]`} />
        </div>
        <div className={fieldStyle}>
          <div className={labelStyle}>층과 홀</div>
          <input type="text" placeholder="층과 홀" className={`${inputStyle} min-w-20 max-w-[230px]`} />
        </div>
      </div>
    </div>
  );
};

export default WeddingInfoSection;
