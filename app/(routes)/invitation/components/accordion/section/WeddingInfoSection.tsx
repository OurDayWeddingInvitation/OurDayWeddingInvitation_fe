import React, { useState } from "react";
import { Check } from "lucide-react";
import { familyOptionsMale, familyOptionsFemale } from "@/app/lib/constants";
import SelectBox from "@/app/components/SelectBox";

const WeddingInfoSection = () => {
  const [clickIdx, setClickIdx] = useState(0);

  const inputStyle = "outline-0 flex-1 border-[#E0E0E0] border placeholder:text-center rounded-sm text-sm py-1.5 px-1";
  const fieldGroup = "flex flex-col gap-2.5 w-full";
  const fieldStyle = "flex flex-wrap items-center";
  const labelStyle = "w-1/6 min-w-[50px]";

  const parents = ["아버지", "어머니"];
  const label = ["신랑", "신부"];

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
                <SelectBox style={`${inputStyle} relative flex justify-around cursor-pointer`} selectOption={selectFamilyOption} title={roleKind} />
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
            {label.map((role, roleIdx) => (
              <button
                key={roleIdx}
                className={`${clickIdx === roleIdx ? "bg-[#D2BEA9]" : "bg-[#FFFFFF]"} ${clickIdx === roleIdx ? "text-[#FFFFFF]" : "text-[#9C9C9C]"} ${
                  clickIdx === roleIdx ? "border-[#D2BEA9]" : "border-[#E0E0E0]"
                } border px-4.5 py-1.5 max-w-[150px] rounded-sm cursor-pointer w-[150px]`}
                onClick={() => {
                  setClickIdx(roleIdx);
                }}
              >
                {role} 이름 먼저
              </button>
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
          <SelectBox style={`${inputStyle} relative flex justify-around cursor-pointer`} selectOption={[]} title={"2025"} />
        </div>
        <div className={fieldStyle}>
          <div className={labelStyle}>예식 시간</div>
          <SelectBox style={`${inputStyle} relative flex justify-around cursor-pointer`} selectOption={[]} title={"오전(AM)"} />
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
