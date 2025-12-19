import { fontList } from "@/app/lib/constants";
import { useInvitationMessageStore } from "@/app/store/useInvitationMessageStore";
import { useThemeFontStore } from "@/app/store/useThemeFontStore";

const InvitationMessage = () => {
  const invitationMessage = useInvitationMessageStore((s) => s.invitationMessage);
  const themeFont = useThemeFontStore((s) => s.themeFont);
  const fontKey = themeFont?.fontName;
  const fontFamily = fontList.find((font) => font.key === fontKey)?.value ?? "";
  return (
    <div className="flex flex-col items-center px-5 py-7.5">
      <p
        className="leading-[100%] tracking-[0.375rem] pb-2.5"
        style={{ fontSize: themeFont?.fontSize ?? 14, fontFamily: fontFamily ?? "", color: themeFont?.accentColor }}
      >
        INVITATION
      </p>
      <p
        className="font-bold text-base leading-[100%] pb-10 text-center"
        style={{ fontSize: themeFont?.fontSize ?? 14, fontFamily: fontFamily ?? "" }}
      >
        {invitationMessage?.title}
      </p>
      <div className="w-full" dangerouslySetInnerHTML={{ __html: invitationMessage?.message }}></div>
    </div>
  );
};

export default InvitationMessage;
