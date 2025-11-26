import React, { useState, useRef, useEffect } from "react";
import SectionDefaultButton from "@/app/components/SectionDefaultButton";
import { useSectionDefaultButtonStore } from "@/app/store/useSectionDefaultButtonStore";
import CheckBox from "@/app/components/CheckBox";
import { SketchPicker } from "react-color";
import { useColorFontStore } from "@/app/store/useColorFontStore";

const ColorFontSection = () => {
  const [themeColorIdx, setThemeColorIdx] = useState<number>(0);
  const [pointColorIdx, setPointColorIdx] = useState<number>(0);
  const [pickerOpen, setPickerOpen] = useState<boolean>(false);
  const [color, setColor] = useState<string>("#0000");
  const pickerRef = useRef<HTMLButtonElement | null>(null);

  const fieldGroup = "flex flex-col gap-2.5 w-full";
  const fieldStyle = "flex flex-wrap items-center";
  const labelStyle = "w-1/6 min-w-[50px]";
  const contentStyle = "flex flex-1 gap-2.5 items-center flex-wrap";

  const fontStyleArr = [
    { title: "작게", size: "text-[14px]" },
    { title: "보통", size: "text-[16px]" },
    { title: "크게", size: "text-[18px]" }
  ];

  const themeColorArr = ["#FFF6FB", "#ECECDE", "#DBE4E9", "conic-gradient(#ff6363, orange, #efef2b, #52f252, #3333d7, #9f44e2, violet, #f15353)"];
  const pointColorArr = ["#D28BB3", "#C0C08B", "#7AA3B8", "conic-gradient(#ff6363, orange, #efef2b, #52f252, #3333d7, #9f44e2, violet, #f15353)"];

  const { fontIdx, fontSize, setFontIdx, setFontSize } = useSectionDefaultButtonStore();
  const { themeColor, pointColor, setThemeColor } = useColorFontStore();

  const clickColorPicker = (item: string, idx: number) => {
    setThemeColorIdx(idx);
    if (idx === themeColorArr.length - 1) {
      setPickerOpen(true);
    } else {
      setThemeColor(item);
    }
  };

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setPickerOpen(false);
      }
    };
    document.addEventListener("click", clickOutside);
    return () => document.removeEventListener("click", clickOutside);
  }, []);

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
          <div className={contentStyle}>
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
      <div className="border-t border-[#E0E0E0]"></div>
      {/* 테마 색상 */}
      <div className={fieldGroup}>
        <div className={fieldStyle}>
          <div className={labelStyle}>테마 색상</div>
          <div className={contentStyle}>
            {themeColorArr.map((item, idx) => (
              <button
                className={`w-8 h-8 rounded-full cursor-pointer ${themeColorIdx === idx && "border-[#CACACA] border"}`}
                style={{ background: item }}
                key={idx}
                ref={pickerRef}
                onClick={() => clickColorPicker(item, idx)}
              >
                {pickerOpen && idx === themeColorArr.length - 1 && (
                  <div className="absolute">
                    <SketchPicker
                      color={themeColor}
                      onChange={(c) => setThemeColor(c.hex)}
                      onChangeComplete={(c) => {
                        setThemeColor(c.hex);
                      }}
                    />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* 포인트 색상 */}
      <div className={fieldGroup}>
        <div className={fieldStyle}>
          <div className={labelStyle}>포인트 색상</div>
          <div className={contentStyle}>
            {pointColorArr.map((item, idx) => (
              <button
                className={`w-8 h-8 rounded-full cursor-pointer ${pointColorIdx === idx && "border-[#CACACA] border"}`}
                style={{ background: item }}
                key={idx}
                onClick={() => setPointColorIdx(idx)}
              >
                {pickerOpen && idx === themeColorArr.length - 1 && (
                  <div className="absolute">
                    <SketchPicker
                      color={color}
                      onChange={(c) => setColor(c.hex)}
                      onChangeComplete={(c) => {
                        setColor(c.hex);
                      }}
                    />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-[#E0E0E0]"></div>
      <div className={fieldGroup}>
        <div className={fieldStyle}>
          <div className={labelStyle}>확대 방지</div>
          <div className="flex flex-col">
            <div className={contentStyle}>
              <CheckBox id={"disableZoom"} />
              <p className="font-medium">청첩장 확대 방지</p>
            </div>
            <p className="text-[#CACACA] text-[12px] font-light">사진 확대가 부담스러우신 분은 선택해보세요.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorFontSection;
