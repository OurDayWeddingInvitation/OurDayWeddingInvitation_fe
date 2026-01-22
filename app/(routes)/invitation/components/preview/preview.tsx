"use client";

import { fontList, previewComponents } from "@/app/lib/constants";
import { useThemeFontStore } from "@/app/store/useThemeFontStore";
import { useMenuSettingStore } from "@/app/store/useMenuSettingInfoStore";

import { FadeInSection } from "../FadeInSection";
import { useEffect } from "react";
import { useLoadingScreenStore } from "@/app/store/useLoadingScreenStore";
import IntroLoader1 from "./introLoader/IntroLoader1";
import IntroLoader2 from "./introLoader/IntroLoader2";

const Preview = ({ isLink = false }: { isLink?: boolean }) => {
  // const { invitationTitle, invitationMessage } = useMessageStore();
  // constant로 fontname에 맞게 fontfamily 설정 필요
  const themeFont = useThemeFontStore((s) => s.themeFont);
  const fontKey = themeFont?.fontName;
  const fontFamily = fontList.find((font) => font.key === fontKey)?.value ?? "";
  const menuSetting = useMenuSettingStore((s) => s.menuSetting);
  const introLoader = useLoadingScreenStore((s) => s.loadingScreenStyle);
  const zoomPrevent = themeFont?.zoomPreventYn;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const meta = document.querySelector(
      'meta[name="viewport"]',
    ) as HTMLMetaElement;

    if (!meta) return;

    if (zoomPrevent) {
      meta.setAttribute(
        "content",
        "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
      );
    } else {
      meta.setAttribute("content", "width=device-width, initial-scale=1");
    }
  }, [zoomPrevent]);

  return !isLink ? (
    <div>
      <div className="relative h-[720px] overflow-scroll [&::-webkit-scrollbar]:hidden z-99">
        {/* <Image src={Mockup} alt="미리보기목업" className="absolute left-0 top-0 w-full overflow-hidden border" /> */}
        <div
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
  ) : (
    <div
      className="max-w-[480px] w-full"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        backgroundColor: themeFont?.backgroundColor ?? "",
        fontSize: themeFont?.fontSize ?? 14,
        fontFamily: fontFamily ?? "",
      }}
    >
      {introLoader?.design === "1" ? <IntroLoader1 /> : <IntroLoader2 />}
      {(menuSetting || [])
        .filter((item) => item.isVisible)
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .map((item) => {
          const Component = previewComponents[item.sectionKey];
          if (!Component) return null;
          return (
            <FadeInSection key={item.sectionKey}>
              <Component />
            </FadeInSection>
          );
        })}
    </div>
  );
};

export default Preview;
