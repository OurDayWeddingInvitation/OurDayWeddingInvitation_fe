import { fontList } from "@/app/lib/constants";
import { useInvitationMessageStore } from "@/app/store/useInvitationMessageStore";
import { useThemeFontStore } from "@/app/store/useThemeFontStore";
import FamilyWeddingInfo from "@/app/components/common/FamilyWeddingInfo";
import WeddingDay from "./WeddingDay";
import { FadeInSection } from "../FadeInSection";

const InvitationMessage = ({ isLink }: { isLink: boolean }) => {
  const invitationInfo = useInvitationMessageStore((s) => s.invitationMessage);
  const themeFont = useThemeFontStore((s) => s.themeFont);
  const fontKey = themeFont?.fontName;
  const fontFamily =
    fontList?.find((font) => font.key === fontKey)?.value ?? "";

  return (
    <>
      <div className="flex flex-col items-center px-5 py-10">
        <FadeInSection enabled={isLink}>
          <p
            className="leading-[100%] tracking-[0.375rem] pb-2.5"
            style={{
              fontSize: themeFont?.fontSize ?? 14,
              fontFamily: fontFamily ?? "",
              color: themeFont?.accentColor,
            }}
          >
            INVITATION
          </p>
        </FadeInSection>
        <FadeInSection enabled={isLink}>
          <p
            className="font-bold text-base leading-[100%] pb-10 text-center"
            style={{
              fontSize: themeFont?.fontSize ?? 14,
              fontFamily: fontFamily ?? "",
            }}
          >
            {invitationInfo?.title}
          </p>
        </FadeInSection>
        <FadeInSection enabled={isLink}>
          <div
            className="w-full"
            dangerouslySetInnerHTML={{ __html: invitationInfo?.message }}
          ></div>
        </FadeInSection>
        {/* 신랑 신부 정보 */}
        <FadeInSection enabled={isLink}>
          <FamilyWeddingInfo />
        </FadeInSection>
      </div>
      <FadeInSection enabled={isLink}>
        <WeddingDay />
      </FadeInSection>
    </>
  );
};

export default InvitationMessage;
