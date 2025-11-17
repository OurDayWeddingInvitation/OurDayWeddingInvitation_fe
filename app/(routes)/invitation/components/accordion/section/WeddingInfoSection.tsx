import React from "react";

const WeddingInfoSection = () => {
  const inputStyle = "outline-0 flex-1 border-[#E0E0E0] border px-2 py-1 placeholder:text-center rounded-sm text-sm";
  const fieldStyle = "flex flex-wrap items-center py-1";
  const labelStyle = "w-1/6 min-w-[50px]";

  const parents = ["아버지", "어머니"];
  const label = ["신랑", "신부"];

  return (
    <div className="flex flex-col gap-9 w-full pt-4">
      {label.map((role, idx) => (
        <div className="flex flex-col gap-2.5 w-full" key={idx}>
          <div className={fieldStyle}>
            <div className={labelStyle}>{role}</div>
            <div className="flex flex-1 gap-2.5 items-center flex-wrap">
              <input type="text" placeholder="성" className={`${inputStyle} min-w-[50px] max-w-[70px]`} />
              <input type="text" placeholder="이름" className={`${inputStyle} min-w-20 max-w-[150px]`} />
              <select className={`${inputStyle} min-w-[60px] max-w-[100px]`}>
                <option>아들</option>
              </select>
            </div>
          </div>

          {parents.map((name, idx) => (
            <div className={fieldStyle} key={idx}>
              <div className={labelStyle}>{name}</div>
              <div className="flex flex-1 gap-2.5 items-center flex-wrap">
                <input type="text" placeholder="성함" className={`${inputStyle} min-w-20 max-w-[230px]`} />
                <input type="checkbox" className="w-4 h-4 shrink-0" />
                <label>故</label>
              </div>
            </div>
          ))}
        </div>
      ))}
      <div className="border-t border-[#E0E0E0]"></div>
    </div>
  );
};

export default WeddingInfoSection;
