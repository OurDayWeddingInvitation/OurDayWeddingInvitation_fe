"use client";
import { useColorFontStore } from "@/app/store/useColorFontStore";
import { useMessageStore } from "@/app/store/invitationMessageStore";
import { useCounterStore } from "@/app/store/sectionFirstStore";
import Image from "next/image";
import Mockup from "../../../../assets/images/mockup.png";

const Preview = () => {
  const { title, description } = useCounterStore();
  const { message } = useMessageStore();
  const { themeColor, fontSize, fontStyle } = useColorFontStore();

  return (
    <div className="h-full flex relative">
      <Image src={Mockup} alt="미리보기목업" className="w-full object-contain rounded-[75px] overflow-hidden " style={{ background: themeColor }} />

      <div className="absolute inset-0 flex items-center justify-center">
        <p>{title}</p>
        <p>{description}</p>

        <div dangerouslySetInnerHTML={{ __html: message }} style={{ fontSize: fontSize, fontFamily: fontStyle }} />
      </div>
    </div>
  );
};

export default Preview;
