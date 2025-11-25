import React from "react";
import SectionDefaultButton from "@/app/components/SectionDefaultButton";
import { useSectionDefaultButtonStore } from "@/app/store/useSectionDefaultButtonStore";

const ColorFontSection = () => {
  const fieldGroup = "flex flex-col gap-2.5 w-full";
  const fieldStyle = "flex flex-wrap items-center";
  const labelStyle = "w-1/6 min-w-[50px]";

  const fontStyleArr = [
    { title: "작게", size: "text-[14px]" },
    { title: "보통", size: "text-[16px]" },
    { title: "크게", size: "text-[18px]" }
  ];

  const { fontIdx, fontSize, setFontIdx, setFontSize } = useSectionDefaultButtonStore();

  return (
    <div className="flex flex-col gap-5">
      {/* 글꼴 */}
      <div className={fieldGroup}>
        <div className={fieldStyle}>
          <div className={labelStyle}>글꼴</div>
          <div className="grid grid-cols-3 gap-x-[30px] gap-y-2.5">
            {Array.from({ length: 9 }).map((_, idx) => (
              <SectionDefaultButton
                title={"저희 결혼합니다"}
                key={idx}
                size={"text-[14px]"}
                clickIdx={fontIdx}
                idx={idx}
                kind={"style"}
                onClick={() => {
                  setFontIdx(idx);
                }}
              />
            ))}
          </div>
        </div>
      </div>
      {/* 글자 크기 */}
      <div className={fieldGroup}>
        <div className={fieldStyle}>
          <div className={labelStyle}>글자 크기</div>
          <div className="flex flex-1 gap-2.5 items-center flex-wrap">
            {fontStyleArr.map((item, idx) => (
              <SectionDefaultButton
                title={item.title}
                key={idx}
                size={item.size}
                clickIdx={fontSize}
                idx={idx}
                kind={"size"}
                onClick={() => {
                  setFontSize(idx);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorFontSection;
