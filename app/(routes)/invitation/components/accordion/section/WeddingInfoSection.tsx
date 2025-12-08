import React, { useEffect, useState } from "react";
import {
  familyOptionsMale,
  familyOptionsFemale,
  hoursOptions,
  minutesOptions,
  monthOptions,
  timeOfDayOptions,
} from "@/app/lib/constants";
import SelectBox from "@/app/components/SelectBox";
import {
  getFourYears,
  getEndDay,
  getDaysOption,
} from "@/app/lib/utils/date-format";
import SectionDefaultButton from "@/app/components/SectionDefaultButton";
import { useSectionDefaultButtonStore } from "@/app/store/useSectionDefaultButtonStore";
import CheckBox from "@/app/components/CheckBox";
import { useWeddingInfoStore } from "@/app/store/useWeddingInfoStore";
import { useWeddingInfoStoreTest } from "@/app/store/useWeddingInfoStoreTest";
import { useDebounce } from "@/app/lib/hooks/use-debounce";
import { clientFetchApi } from "@/app/lib/fetches/client";
import { WeddingInfoSectionType } from "@/app/lib/fetches/invitation/type";

const WeddingInfoSection = () => {
  const { nameOrder, setNameOrder } = useSectionDefaultButtonStore();
  const {
    wedding,
    setGroom,
    setBride,
    setGroomParent,
    setBrideParent,
    setWeddingDate,
    setWeddingTime,
  } = useWeddingInfoStore();

  const inputStyle =
    "outline-0 flex-1 border-[#E0E0E0] border placeholder:text-center rounded-sm text-sm py-1.5 px-1";
  const fieldGroup = "flex flex-col gap-2.5 w-full";
  const fieldStyle = "flex flex-wrap items-center";
  const labelStyle = "w-1/6 min-w-[50px]";

  const parents = ["아버지", "어머니"];
  const label = ["신랑", "신부"];

  const endDay = getEndDay(wedding.date.year, Number(wedding.date.month)); //월 끝 날짜

  const weddingInfo = useWeddingInfoStoreTest((s) => s.weddingInfo);
  const updateField = useWeddingInfoStoreTest((s) => s.updateWeddingInfoField);

  const [localInfo, setLocalInfo] = useState<WeddingInfoSectionType>(
    () => weddingInfo
  );

  const debouncedInfo = useDebounce(localInfo, 500);

  useEffect(() => {
    if (!weddingInfo) return;
    if (!debouncedInfo) return;

    const updated: Partial<typeof debouncedInfo> = {};
    for (const key in debouncedInfo) {
      if (debouncedInfo[key] !== weddingInfo[key]) {
        updated[key] = debouncedInfo[key];
      }
    }

    if (Object.keys(updated).length === 0) return;

    for (const key in updated) {
      updateField(key as keyof typeof updated, updated[key]);
    }

    // API 호출
    async function updateApi() {
      await clientFetchApi({
        endPoint: `/weddings/update`,
        method: "PATCH",
        body: {
          weddingId: 2,
          sectionId: "weddingInfo",
          updated: updated,
        },
      });
    }

    updateApi();
  }, [debouncedInfo]);

  return (
    <div className="flex flex-col gap-9 w-full pt-4">
      {/* 신랑 / 신부 예식 기본 정보 */}
      {label.map((role, roleIdx) => {
        const isGroom = roleIdx === 0;
        const selectFamilyOption = isGroom
          ? familyOptionsMale
          : familyOptionsFemale;
        const setPerson = isGroom ? setGroom : setBride;
        const person = isGroom ? wedding.groom : wedding.bride;

        return (
          <div className={fieldGroup} key={roleIdx}>
            <div className={fieldStyle}>
              <div className={labelStyle}>{role}</div>
              <div className="flex flex-1 gap-2.5 items-center flex-wrap">
                <input
                  type="text"
                  placeholder="성"
                  className={`${inputStyle} min-w-[50px] max-w-[70px]`}
                  value={person.lastName}
                  id="lastName"
                  onChange={(e) => {
                    setPerson({
                      lastName: e.target.value,
                    });
                  }}
                />
                <input
                  type="text"
                  placeholder="이름"
                  className={`${inputStyle} min-w-20 max-w-[150px]`}
                  value={person.firstName}
                  id="firstName"
                  onChange={(e) => {
                    setPerson({
                      firstName: e.target.value,
                    });
                  }}
                />
                <SelectBox
                  selectOption={selectFamilyOption}
                  initialValue={person.rank}
                  onChange={(val: string) => setPerson({ rank: val })}
                />
              </div>
            </div>

            {/* 부모님 입력 필드 */}
            {parents.map((name, parentIdx) => {
              const checkId = `check-${roleIdx}-${parentIdx}`;
              const setParentsInfo = isGroom ? setGroomParent : setBrideParent;
              const parentsKey = parentIdx === 0 ? "father" : "mother";
              return (
                <div className={fieldStyle} key={parentIdx}>
                  <div className={labelStyle}>{name}</div>
                  <div className="flex flex-1 gap-2.5 items-center flex-wrap">
                    <input
                      type="text"
                      placeholder="성함"
                      className={`${inputStyle} min-w-20 max-w-[230px]`}
                      onChange={(e) =>
                        setParentsInfo(parentsKey, { name: e.target.value })
                      }
                    />
                    <CheckBox id={checkId} />
                    <span className="font-medium">故</span>
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
                size={16}
                clickIdx={nameOrder}
                idx={idx}
                onClick={() => setNameOrder(idx)}
                kind="nameOrder"
              />
            ))}
          </div>
          <p className="text-[#CACACA] text-[12px] leading-[26px]">
            청첩장 전체에 신랑 측 정보가 먼저 표기됩니다.
          </p>
        </div>
      </div>
      <div className="border-t border-[#E0E0E0]"></div>
      {/* 예식 일자 / 시간*/}
      <div className={fieldGroup}>
        <div className={fieldStyle}>
          <div className={labelStyle}>예식 일자</div>
          <div className="flex flex-1 gap-2.5 items-center flex-wrap">
            <SelectBox
              selectOption={getFourYears()}
              initialValue={wedding.date.year}
              onChange={(val: number) => setWeddingDate({ year: val })}
            />
            <SelectBox
              selectOption={monthOptions}
              initialValue={wedding.date.month}
              onChange={(val: number) => setWeddingDate({ month: val })}
            />
            <SelectBox
              selectOption={getDaysOption(endDay)}
              initialValue={wedding.date.day}
              onChange={(val: number) => setWeddingDate({ day: val })}
            />
          </div>
        </div>
        <div className={fieldStyle}>
          <div className={labelStyle}>예식 시간</div>
          <div className="flex flex-1 gap-2.5 items-center flex-wrap">
            <SelectBox
              selectOption={timeOfDayOptions}
              initialValue={wedding.time.timeOfDay}
              onChange={(val: string) => setWeddingTime({ timeOfDay: val })}
            />
            <SelectBox
              selectOption={hoursOptions}
              initialValue={wedding.time.hour}
              onChange={(val: string) => setWeddingTime({ hour: val })}
            />
            <SelectBox
              selectOption={minutesOptions}
              initialValue={wedding.time.min}
              onChange={(val: string) => setWeddingTime({ min: val })}
            />
          </div>
        </div>

        {/* 예식장 명 / 층과 홀*/}
      </div>
      <div className="border-t border-[#E0E0E0]"></div>
      <div className={fieldGroup}>
        <div className={fieldStyle}>
          <div className={labelStyle}>예식장명</div>
          <input
            type="text"
            placeholder="예식장명"
            className={`${inputStyle} min-w-20 max-w-[230px]`}
            value={localInfo.weddingHallName}
            onChange={(e) =>
              setLocalInfo((prev) => ({
                ...prev,
                weddingHallName: e.target.value,
              }))
            }
          />
        </div>
        <div className={fieldStyle}>
          <div className={labelStyle}>층과 홀</div>
          <input
            type="text"
            placeholder="층과 홀"
            className={`${inputStyle} min-w-20 max-w-[230px]`}
            value={localInfo.weddingHallFloor}
            onChange={(e) =>
              setLocalInfo((prev) => ({
                ...prev,
                weddingHallFloor: e.target.value,
              }))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default WeddingInfoSection;
