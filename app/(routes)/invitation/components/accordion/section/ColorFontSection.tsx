import React, { useState, useRef, useEffect } from "react";
import SectionDefaultButton from "@/app/components/SectionDefaultButton";
import { useSectionDefaultButtonStore } from "@/app/store/useSectionDefaultButtonStore";
import CheckBox from "@/app/components/CheckBox";
import { useColorFontStore } from "@/app/store/useColorFontStore";
import ColorSelectButton from "@/app/components/ColorSelectButton";
import { fontList } from "@/app/lib/constants";

const ColorFontSection = () => {
  const [themeColorIdx, setThemeColorIdx] = useState<number>(0);
  const [pointColorIdx, setPointColorIdx] = useState<number>(0);
  const [pickerOpen, setPickerOpen] = useState<boolean>(false);
  const [pickerPointOpen, setPickerPointOpen] = useState<boolean>(false);
  const pickerRef = useRef<HTMLButtonElement | null>(null);
  const pickerPointRef = useRef<HTMLButtonElement | null>(null);
  const { fontIdx, fontSize, setFontIdx, setFontSizeIdx } =
    useSectionDefaultButtonStore();
  const {
    themeColor,
    pointColor,
    setFontSize,
    setFontStyle,
    setThemeColor,
    setPointColor,
  } = useColorFontStore();

  const fieldGroup = "flex flex-col gap-2.5 w-full";
  const fieldStyle = "flex flex-wrap items-center";
  const labelStyle = "w-1/6 min-w-[50px]";
  const contentStyle = "flex flex-1 gap-2.5 items-center flex-wrap";
  const fontStyleArr = [
    { title: "작게", size: 14 },
    { title: "보통", size: 16 },
    { title: "크게", size: 18 },
  ];

  const themeColorArr = [
    "#FFF6FB",
    "#ECECDE",
    "#DBE4E9",
    "conic-gradient(#ff6363, orange, #efef2b, #52f252, #3333d7, #9f44e2, violet, #f15353)",
  ];
  const pointColorArr = [
    "#D28BB3",
    "#C0C08B",
    "#7AA3B8",
    "conic-gradient(#ff6363, orange, #efef2b, #52f252, #3333d7, #9f44e2, violet, #f15353)",
  ];

  const pickerState = {
    theme: {
      colorArr: themeColorArr,
      setColorIdx: setThemeColorIdx,
      setColor: setThemeColor,
      setPickerOpen: setPickerOpen,
    },
    point: {
      colorArr: pointColorArr,
      setColorIdx: setPointColorIdx,
      setColor: setPointColor,
      setPickerOpen: setPickerPointOpen,
    },
  };

  const clickColorPicker = (item: string, idx: number, kind: string) => {
    const state = pickerState[kind];
    state.setColorIdx(idx);

    if (idx === themeColorArr.length - 1) {
      state.setPickerOpen(true);
    } else {
      state.setColor(item);
      state.setPickerOpen(false);
    }
  };

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setPickerOpen(false);
      }
      if (
        pickerPointRef.current &&
        !pickerPointRef.current.contains(e.target as Node)
      ) {
        setPickerPointOpen(false);
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
            {fontList.map((item, idx) => (
              <SectionDefaultButton
                title={"저희 결혼합니다"}
                key={idx}
                size={14}
                clickIdx={fontIdx}
                idx={idx}
                kind={"style"}
                font={item}
                onClick={() => {
                  setFontIdx(idx);
                  setFontStyle(item);
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
                  setFontSizeIdx(idx);
                  setFontSize(item.size);
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
            <ColorSelectButton
              buttonRef={pickerRef}
              colorArr={themeColorArr}
              selectedIdx={themeColorIdx}
              isPickerOpen={pickerOpen}
              setPickerOpen={setPickerOpen}
              currentColor={themeColor}
              setCurrentColor={setThemeColor}
              onSelect={clickColorPicker}
              kind={"theme"}
            />
          </div>
        </div>
      </div>
      {/* 포인트 색상 */}
      <div className={fieldGroup}>
        <div className={fieldStyle}>
          <div className={labelStyle}>포인트 색상</div>
          <div className={contentStyle}>
            <ColorSelectButton
              buttonRef={pickerPointRef}
              colorArr={pointColorArr}
              selectedIdx={pointColorIdx}
              isPickerOpen={pickerPointOpen}
              setPickerOpen={setPickerPointOpen}
              currentColor={pointColor}
              setCurrentColor={setPointColor}
              onSelect={clickColorPicker}
              kind={"point"}
            />
          </div>
        </div>
      </div>
      <div className="border-t border-[#E0E0E0]"></div>
      <div className={fieldGroup}>
        <div className={fieldStyle}>
          <div className={labelStyle}>확대 방지</div>
          <div className="flex flex-col">
            <div className={contentStyle}>
              {/* <CheckBox id={"disableZoom"} /> */}
              <p className="font-medium">청첩장 확대 방지</p>
            </div>
            <p className="text-[#CACACA] text-[12px] font-light">
              사진 확대가 부담스러우신 분은 선택해보세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorFontSection;
