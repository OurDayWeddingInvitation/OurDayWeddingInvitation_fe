"use client";

import { fontList, previewComponents } from "@/app/lib/constants";
import { useThemeFontStore } from "@/app/store/useThemeFontStore";
import { useMenuSettingStore } from "@/app/store/useMenuSettingInfoStore";

import AccountInfo from "./AccountInfo";
import Gallery from "./Gallery";
import InvitationMessage from "./InvitationMessage";
import LocationInfo from "./LocationInfo";
import MainImage from "./mainImage/MainImage";
import WeddingDay from "./WeddingDay";
import CoupleIntro from "./CoupleIntro";
import ParentsInfo from "./ParentsIntro";
import { FadeInSection } from "../FadeInSection";
import { useEffect } from "react";

const Preview = ({ isLink = false }: { isLink?: boolean }) => {
  // const { invitationTitle, invitationMessage } = useMessageStore();
  // constant로 fontname에 맞게 fontfamily 설정 필요
  const themeFont = useThemeFontStore((s) => s.themeFont);

  const fontKey = themeFont?.fontName;
  const fontFamily = fontList.find((font) => font.key === fontKey)?.value ?? "";
  const menuSetting = useMenuSettingStore((s) => s.menuSetting);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <FadeInSection>
        <MainImage />
      </FadeInSection>
      <FadeInSection delay={0.1}>
        <InvitationMessage />
      </FadeInSection>
      {/* <FadeInSection delay={0.1}>
        <WeddingDay />
      </FadeInSection> */}
      <FadeInSection delay={0.1}>
        <CoupleIntro />
      </FadeInSection>
      <FadeInSection delay={0.1}>
        <ParentsInfo />
      </FadeInSection>
      <FadeInSection delay={0.1}>
        <Gallery />
      </FadeInSection>
      <FadeInSection delay={0.1}>
        <AccountInfo />
      </FadeInSection>
      <FadeInSection delay={0.1}>
        <LocationInfo />
      </FadeInSection>
    </div>
  );
};

export default Preview;
