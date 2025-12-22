import React, { useState } from "react";
import { familyOptionsMale, familyOptionsFemale, hoursOptions, minutesOptions, monthOptions, timeOfDayOptions } from "@/app/lib/constants";
import SelectBox from "@/app/components/SelectBox";
import { getFourYears, getEndDay, getDaysOption } from "@/app/lib/utils/date-format";
import SectionDefaultButton from "@/app/components/SectionDefaultButton";
import CheckBox from "@/app/components/CheckBox";
import { useWeddingInfoStore } from "@/app/store/useWeddingInfoStore";
import { WeddingInfoSectionType } from "@/app/lib/fetches/invitation/type";
import { FamilyInfoSectionType } from "@/app/lib/fetches/invitation/type";
import { useFamilyInfoStore } from "@/app/store/useFamilyInfoStore";
import { useWeddingUpdate } from "@/app/lib/hooks/useWeddingInfoUpdate";
import { useWeddingIdStore } from "@/app/store/useWeddingIdStore";

const WeddingInfoSection = () => {
  const [selectNameIdx, setSelectNameIdx] = useState(0);

  const inputStyle = "outline-0 flex-1 border-[#E0E0E0] border placeholder:text-center rounded-sm text-sm py-1.5 px-1";
  const fieldGroup = "flex flex-col gap-2.5 w-full";
  const fieldStyle = "flex flex-wrap items-center";
  const labelStyle = "w-1/6 min-w-[50px]";

  const parents = ["아버지", "어머니"];
  const label = ["신랑", "신부"];

  const weddingInfo = useWeddingInfoStore((s) => s.weddingInfo);
  const updateField = useWeddingInfoStore((s) => s.updateWeddingInfoField);
  const familyInfo = useFamilyInfoStore((s) => s.familyInfo);
  const updateFamilyField = useFamilyInfoStore((s) => s.updateFamilyInfoField);
  const { weddingId } = useWeddingIdStore();

  const [localInfo, setLocalInfo] = useState<WeddingInfoSectionType>(() => weddingInfo);
  const [localFamilyInfo, setLocalFamilyInfo] = useState<FamilyInfoSectionType>(() => familyInfo);

  const endDay = getEndDay(Number(localInfo.weddingYear), Number(localInfo.weddingMonth)); //월 끝 날짜

  useWeddingUpdate({
    localState: localInfo,
    storeState: weddingInfo,
    updateStoreField: updateField,
    sectionId: "weddingInfo",
    weddingId: weddingId
  });

  useWeddingUpdate({
    localState: localFamilyInfo,
    storeState: familyInfo,
    updateStoreField: updateFamilyField,
    sectionId: "familyInfo",
    weddingId: weddingId
  });

  return (
    <div className="flex flex-col gap-9 w-full pt-4">
      {/* 신랑 / 신부 예식 기본 정보 */}
      {label.map((role, roleIdx) => {
        const isGroom = roleIdx === 0;
        const selectFamilyOption = isGroom ? familyOptionsMale : familyOptionsFemale;

        return (
          <div className={fieldGroup} key={roleIdx}>
            <div className={fieldStyle}>
              <div className={labelStyle}>{role}</div>
              <div className="flex flex-1 gap-2.5 items-center flex-wrap">
                <input
                  type="text"
                  placeholder="성"
                  className={`${inputStyle} min-w-[50px] max-w-[70px]`}
                  value={isGroom ? localInfo.groomLastName : localInfo.brideLastName}
                  id="lastName"
                  onChange={(e) => {
                    const key = isGroom ? "groomLastName" : "brideLastName";
                    setLocalInfo((prev) => ({
                      ...prev,
                      [key]: e.target.value
                    }));
                  }}
                />
                <input
                  type="text"
                  placeholder="이름"
                  className={`${inputStyle} min-w-20 max-w-[150px]`}
                  value={isGroom ? localInfo.groomFirstName : localInfo.brideFirstName}
                  id="firstName"
                  onChange={(e) => {
                    const key = isGroom ? "groomFirstName" : "brideFirstName";
                    setLocalInfo((prev) => ({
                      ...prev,
                      [key]: e.target.value
                    }));
                  }}
                />
                <SelectBox
                  selectOption={selectFamilyOption}
                  initialValue={isGroom ? localFamilyInfo.groomRankName : localFamilyInfo.brideRankName}
                  onChange={(val: string) => {
                    const key = isGroom ? "groomRankName" : "brideRankName";
                    setLocalFamilyInfo((prev) => ({
                      ...prev,
                      [key]: val
                    }));
                  }}
                />
              </div>
            </div>

            {/* 부모님 입력 필드 */}
            {parents.map((name, parentIdx) => {
              const checkId = `check-${roleIdx}-${parentIdx}`;
              const roles = ["groom", "bride"];
              const parentsMap = ["Father", "Mother"];
              const parentsKey = `${roles[roleIdx]}${parentsMap[parentIdx]}Name`;
              const isDeceasedKey = `${roles[roleIdx]}${parentsMap[parentIdx]}Deceased`;

              return (
                <div className={fieldStyle} key={parentIdx}>
                  <div className={labelStyle}>{name}</div>
                  <div className="flex flex-1 gap-2.5 items-center flex-wrap">
                    <input
                      type="text"
                      placeholder="성함"
                      className={`${inputStyle} min-w-20 max-w-[230px]`}
                      value={isGroom ? localFamilyInfo[parentsKey] : localFamilyInfo[parentsKey]}
                      onChange={(e) => {
                        setLocalFamilyInfo((prev) => ({
                          ...prev,
                          [parentsKey]: e.target.value
                        }));
                      }}
                    />
                    <CheckBox
                      id={checkId}
                      defaultChecked={localFamilyInfo[isDeceasedKey] ?? false}
                      onChange={(checked) => {
                        setLocalFamilyInfo((prev) => ({
                          ...prev,
                          [isDeceasedKey]: checked
                        }));
                      }}
                    />
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
                clickIdx={selectNameIdx}
                idx={idx}
                onClick={() => {
                  const value = idx === 0 ? "G" : "B";
                  setSelectNameIdx(idx);
                  setLocalInfo((prev) => ({
                    ...prev,
                    nameOrderType: value
                  }));
                }}
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
              selectOption={getFourYears()}
              initialValue={Number(localInfo.weddingYear)}
              onChange={(val: number) => {
                setLocalInfo((prev) => ({
                  ...prev,
                  weddingYear: String(val)
                }));
              }}
            />
            <SelectBox
              selectOption={monthOptions}
              initialValue={Number(localInfo.weddingMonth)}
              onChange={(val: number) => {
                setLocalInfo((prev) => ({
                  ...prev,
                  weddingMonth: String(val)
                }));
              }}
            />
            <SelectBox
              selectOption={getDaysOption(endDay)}
              initialValue={Number(localInfo.weddingDay)}
              onChange={(val: number) => {
                setLocalInfo((prev) => ({
                  ...prev,
                  weddingDay: String(val)
                }));
              }}
            />
          </div>
        </div>
        <div className={fieldStyle}>
          <div className={labelStyle}>예식 시간</div>
          <div className="flex flex-1 gap-2.5 items-center flex-wrap">
            <SelectBox
              selectOption={timeOfDayOptions}
              initialValue={localInfo.weddingTimePeriod}
              onChange={(val: string) =>
                setLocalInfo((prev) => ({
                  ...prev,
                  weddingTimePeriod: val
                }))
              }
            />
            <SelectBox
              selectOption={hoursOptions}
              initialValue={localInfo.weddingHour}
              onChange={(val: string) =>
                setLocalInfo((prev) => ({
                  ...prev,
                  weddingHour: val
                }))
              }
            />
            <SelectBox
              selectOption={minutesOptions}
              initialValue={localInfo.weddingMinute}
              onChange={(val: string) =>
                setLocalInfo((prev) => ({
                  ...prev,
                  weddingMinute: val
                }))
              }
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
                weddingHallName: e.target.value
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
                weddingHallFloor: e.target.value
              }))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default WeddingInfoSection;
