"use client";

import { fontList } from "@/app/lib/constants";
import { useThemeFontStore } from "@/app/store/useThemeFontStore";
import AccountInfo from "./AccountInfo";
import Gallery from "./Gallery";
import InvitationMessage from "./InvitationMessage";
import LocationInfo from "./LocationInfo";
import MainImage from "./mainImage/MainImage";
import { useInvitationMessageStore } from "@/app/store/useInvitationMessageStore";
import WeddingDay from "./WeddingDay";
import CoupleIntro from "./CoupleIntro";
import ParentsInfo from "./ParentsIntro";

const Preview = () => {
  // const { invitationTitle, invitationMessage } = useMessageStore();
  // constant로 fontname에 맞게 fontfamily 설정 필요
  const themeFont = useThemeFontStore((s) => s.themeFont);
  const invitationMessage = useInvitationMessageStore(
    (s) => s.invitationMessage
  );
  const fontKey = themeFont?.fontName;
  const fontFamily = fontList.find((font) => font.key === fontKey)?.value ?? "";

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
          <MainImage />
          <InvitationMessage />
          <WeddingDay />
          <CoupleIntro />
          <ParentsInfo />
          <Gallery />
          <AccountInfo />
          <LocationInfo />
        </div>
      </div>
    </div>
  );
};

export default Preview;
