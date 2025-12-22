import { fontList } from "@/app/lib/constants";
import { useInvitationMessageStore } from "@/app/store/useInvitationMessageStore";
import { useThemeFontStore } from "@/app/store/useThemeFontStore";

const Calender = () => {
  const invitationMessage = useInvitationMessageStore(
    (s) => s.invitationMessage
  );
  const themeFont = useThemeFontStore((s) => s.themeFont);
  const fontKey = themeFont?.fontName;
  const fontFamily = fontList.find((font) => font.key === fontKey)?.value ?? "";
  return <div className="flex flex-col items-center px-5 py-7.5"></div>;
};

export default Calender;
