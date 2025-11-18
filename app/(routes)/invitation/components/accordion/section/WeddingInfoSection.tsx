import React from "react";
import { Check, ChevronDown } from "lucide-react";

const WeddingInfoSection = () => {
  const inputStyle = "outline-0 flex-1 border-[#E0E0E0] border placeholder:text-center rounded-sm text-sm py-1.5 px-1";
  const fieldStyle = "flex flex-wrap items-center";
  const labelStyle = "w-1/6 min-w-[50px]";

  const parents = ["아버지", "어머니"];
  const label = ["신랑", "신부"];

  return (
    <div className="flex flex-col gap-9 w-full pt-4">
      {label.map((role, roleIdx) => (
        <div className="flex flex-col gap-2.5 w-full" key={roleIdx}>
          <div className={fieldStyle}>
            <div className={labelStyle}>{role}</div>
            <div className="flex flex-1 gap-2.5 items-center flex-wrap">
              <input type="text" placeholder="성" className={`${inputStyle} min-w-[50px] max-w-[70px]`} />
              <input type="text" placeholder="이름" className={`${inputStyle} min-w-20 max-w-[150px]`} />
              <label className={`${inputStyle} min-w-[60px] max-w-[100px] flex justify-evenly`}>
                {role === "신랑" ? "아들" : "딸"}
                <ChevronDown color="#9C9C9C" size={19} />
              </label>
              <select className="hidden">
                <option>아들</option>
              </select>
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
      ))}
      <div className="border-t border-[#E0E0E0]"></div>
    </div>
  );
};

export default WeddingInfoSection;
