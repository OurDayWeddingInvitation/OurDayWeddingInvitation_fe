import TextEditor from "@/app/components/editor/TextEditor";
import SelectBox from "@/app/components/SelectBox";
import React from "react";

const LocationInfoSection = () => {
  const inputStyle = "outline-0 flex-1 border-[#E0E0E0] border placeholder:text-center rounded-sm text-sm py-1.5 px-1";
  const labelStyle = "w-1/7 min-w-[60px]";
  const trafficOption = [
    { label: "지하철", value: "지하철" },
    { label: "버스", value: "버스" }
  ];
  return (
    <div>
      <div className="flex items-center gap-2.5">
        <div className={labelStyle}>예식장 주소</div>
        <input type="text" className={inputStyle} />
        <input type="text" className={inputStyle} placeholder="(옵션) 필요 시 상세 주소 입력" />
        <button className="bg-[#D2BEA9] text-[#FFFFFF] font-light px-5 py-2 rounded-sm cursor-pointer">주소 검색</button>
      </div>
      <p className="text-[#CACACA] px-4">주소 검색을 통해 예식장 주소를 입력해주세요.</p>

      <div className="border-t border-[#E0E0E0]"></div>

      <div className="py-9">
        <h3>
          <span className="text-[#D2BEA9]">#1</span> 교통수단
        </h3>
        <div className="flex items-center py-5">
          <div className={labelStyle}>교통수단</div>
          <SelectBox selectOption={trafficOption} initialValue={"지하철"} onChange={() => {}} />
        </div>
        <div className="py-3">내용</div>
        <TextEditor />
      </div>
      <div className="block text-center">
        <button className="bg-[#D2BEA9] text-[#FFFFFF] font-light px-5 py-2 rounded-sm cursor-pointer">교통수단 추가</button>
      </div>
    </div>
  );
};

export default LocationInfoSection;
