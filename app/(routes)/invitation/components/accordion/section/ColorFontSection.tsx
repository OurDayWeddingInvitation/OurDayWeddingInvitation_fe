import React, { useState, useRef, useEffect } from "react";
import SectionDefaultButton from "@/app/components/SectionDefaultButton";
import CheckBox from "@/app/components/CheckBox";
import ColorPickerButtonList from "@/app/components/ColorPickerButtonList";
import { fontList, fontSizeList } from "@/app/lib/constants";
import { useThemeFontStoreTest } from "@/app/store/useColorFontStoreTest";
import { ThemeFontSectionType } from "@/app/lib/fetches/invitation/type";
import { useWeddingUpdate } from "@/app/lib/hooks/useWeddingInfoUpdate";
import { useWeddingIdStore } from "@/app/store/useWeddingIdStore";

const ColorFontSection = () => {
  const [pickerOpen, setPickerOpen] = useState<boolean>(false);
  const [pickerPointOpen, setPickerPointOpen] = useState<boolean>(false);
  const pickerRef = useRef<HTMLButtonElement | null>(null);
  const pickerPointRef = useRef<HTMLButtonElement | null>(null);

  const fieldGroup = "flex flex-col gap-2.5 w-full";
  const fieldStyle = "flex flex-wrap items-center";
  const labelStyle = "w-1/6 min-w-[50px]";
  const contentStyle = "flex flex-1 gap-2.5 items-center flex-wrap";

  const { weddingId } = useWeddingIdStore();
  const themeFont = useThemeFontStoreTest((s) => s.themeFont);
  const updateField = useThemeFontStoreTest((s) => s.updateThemeFontField);

  const [localInfo, setLocalInfo] = useState<ThemeFontSectionType>(() => themeFont);

  const themeColorArr = ["#FFF6FB", "#ECECDE", "#DBE4E9", "conic-gradient(#ff6363, orange, #efef2b, #52f252, #3333d7, #9f44e2, violet, #f15353)"];
  const pointColorArr = ["#D28BB3", "#C0C08B", "#7AA3B8", "conic-gradient(#ff6363, orange, #efef2b, #52f252, #3333d7, #9f44e2, violet, #f15353)"];

  const pickerState = {
    theme: {
      colorArr: themeColorArr,
      setPickerOpen: setPickerOpen,
      key: "backgroundColor"
    },
    point: {
      colorArr: pointColorArr,
      setPickerOpen: setPickerPointOpen,
      key: "accentColor"
    }
  };

  // 테마, 포인트 색상 변경 했을 때 실행하는 함수
  const clickColorPicker = (item: string, idx: number, kind: string) => {
    const state = pickerState[kind];

    setLocalInfo((prev) => ({
      ...prev,
      [state.key]: item
    }));

    if (idx === themeColorArr.length - 1) {
      state.setPickerOpen(true);
    } else {
      state.setPickerOpen(false);
    }
  };

  // 컬러 선택 버튼 index 반환 함수
  const getColorIndex = (colorArr: string[], color?: string): number => {
    if (!color) return colorArr.length - 1;

    const idx = colorArr.indexOf(color);
    return idx !== -1 ? idx : colorArr.length - 1;
  };

  // 컬러 피커 창 외부 클릭 시 닫기
  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setPickerOpen(false);
      }
      if (pickerPointRef.current && !pickerPointRef.current.contains(e.target as Node)) {
        setPickerPointOpen(false);
      }
    };
    document.addEventListener("click", clickOutside);
    return () => document.removeEventListener("click", clickOutside);
  }, []);

  useWeddingUpdate({
    localState: localInfo,
    storeState: themeFont,
    updateStoreField: updateField,
    sectionId: "themeFont",
    weddingId: weddingId
  });

  useEffect(() => {
    setLocalInfo(themeFont);
  }, [themeFont]);

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
                clickIdx={Number(localInfo?.fontName) - 1}
                idx={idx}
                kind={"style"}
                font={item.value}
                onClick={() => {
                  setLocalInfo((prev) => ({
                    ...prev,
                    fontName: item.key
                  }));
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
            {fontSizeList.map((item, idx) => {
              const getFontSizeIndex = (size: number): number => {
                return fontSizeList.findIndex((item) => item.size === size);
              };
              return (
                <SectionDefaultButton
                  title={item.title}
                  key={idx}
                  size={item.size}
                  clickIdx={getFontSizeIndex(localInfo?.fontSize) ?? 14}
                  idx={idx}
                  kind={"size"}
                  onClick={() => {
                    setLocalInfo((prev) => ({
                      ...prev,
                      fontSize: item.size
                    }));
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="border-t border-[#E0E0E0]"></div>
      {/* 테마 색상 */}
      <div className={fieldGroup}>
        <div className={fieldStyle}>
          <div className={labelStyle}>테마 색상</div>
          <div className={contentStyle}>
            <ColorPickerButtonList
              buttonRef={pickerRef}
              colorArr={themeColorArr}
              selectedIdx={getColorIndex(themeColorArr, localInfo?.backgroundColor)}
              isPickerOpen={pickerOpen}
              setPickerOpen={setPickerOpen}
              currentColor={localInfo?.backgroundColor}
              setCurrentColor={(color) =>
                setLocalInfo((prev) => ({
                  ...prev,
                  backgroundColor: color
                }))
              }
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
            <ColorPickerButtonList
              buttonRef={pickerPointRef}
              colorArr={pointColorArr}
              selectedIdx={getColorIndex(pointColorArr, localInfo?.accentColor)}
              isPickerOpen={pickerPointOpen}
              setPickerOpen={setPickerPointOpen}
              currentColor={localInfo?.accentColor}
              setCurrentColor={(color) =>
                setLocalInfo((prev) => ({
                  ...prev,
                  accentColor: color
                }))
              }
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
              <CheckBox
                id={"disableZoom"}
                defaultChecked={localInfo?.zoomPreventYn ?? true}
                onChange={(checked: boolean) =>
                  setLocalInfo((prev) => ({
                    ...prev,
                    zoomPreventYn: checked
                  }))
                }
              />
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
