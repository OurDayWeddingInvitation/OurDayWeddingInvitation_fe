"use client";

import { fontList, previewComponents } from "@/app/lib/constants";
import { useThemeFontStore } from "@/app/store/useThemeFontStore";
import { useMenuSettingStore } from "@/app/store/useMenuSettingInfoStore";

const Preview = () => {
  // constant로 fontname에 맞게 fontfamily 설정 필요
  const themeFont = useThemeFontStore((s) => s.themeFont);
  const fontKey = themeFont?.fontName;
  const fontFamily = fontList.find((font) => font.key === fontKey)?.value ?? "";
  const menuSetting = useMenuSettingStore((s) => s.menuSetting);

  return (
    <div>
      <div className="relative h-[720px]">
        {/* <Image src={Mockup} alt="미리보기목업" className="absolute left-0 top-0 w-full overflow-hidden border" /> */}
        <div
          className="overflow-scroll [&::-webkit-scrollbar]:hidden h-full z-99"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            backgroundColor: themeFont?.backgroundColor ?? "",
            fontSize: themeFont?.fontSize ?? 14,
            fontFamily: fontFamily ?? "",
          }}
        >
          {(menuSetting || [])
            .filter((item) => item.isVisible)
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map((item) => {
              const Component = previewComponents[item.sectionKey];
              if (!Component) return null;
              return <Component key={item.sectionKey} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Preview;
