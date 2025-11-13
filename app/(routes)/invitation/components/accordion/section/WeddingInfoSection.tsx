/* eslint-disable react-hooks/static-components */
import React from "react";

const WeddingInfoSection = () => {
  const inputClass = "outline-0 border-[#E0E0E0] border py-2.5 placeholder:text-center rounded-sm";
  const checkboxClass = "w-4 h-4 ";

  const PersonInput = ({ label, selectOptions }: { label: string; selectOptions: string[] }) => (
    <div className="flex items-center py-[5px] gap-4">
      <div>{label}</div>
      <div className="flex gap-2.5 items-center">
        <input type="text" placeholder="성" className={`${inputClass} w-1/6`} />
        <input type="text" placeholder="이름" className={`${inputClass} w-3/6`} />
        <select className={`${inputClass} w-2/6`}>
          {selectOptions.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </div>
    </div>
  );
  const ParentInput = ({ label }: { label: string }) => (
    <div className="flex items-center gap-4">
      <div>{label}</div>
      <div className="flex gap-2.5 items-center w-8/9">
        <input type="text" placeholder="성함" className={`${inputClass}  border`} />
        <input type="checkbox" className={checkboxClass} />
        <label>故</label>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-3">
      <PersonInput label="신랑" selectOptions={["아들"]} />
      <ParentInput label="아버지" />
      <ParentInput label="어머니" />
      <div className="border-t border-[#E0E0E0] "></div>
      <PersonInput label="신부" selectOptions={["딸"]} />
      <ParentInput label="아버지" />
      <ParentInput label="어머니" />
    </div>
  );
};

export default WeddingInfoSection;
