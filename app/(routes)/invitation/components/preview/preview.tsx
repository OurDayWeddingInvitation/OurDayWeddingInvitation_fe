"use client";

import { useMessageStore } from "@/app/store/useInvitaionMessageStore";
import { useCounterStore } from "@/app/store/sectionFirstStore";
import Mockup from "../../../../assets/images/mockup.png";
import { useColorFontStore } from "@/app/store/useColorFontStore";
import MainImage from "./mainImage/MainImage";
import Gallery from "./Gallery";
import AccountInfo from "./AccountInfo";
import LocationInfo from "./LocationInfo";

const Preview = () => {
  const { title, description } = useCounterStore();
  const { invitationTitle, invitationMessage } = useMessageStore();
  const { themeColor, fontSize, fontStyle } = useColorFontStore();

  return (
    <div>
      <div className="relative h-[760px]">
        {/* <Image src={Mockup} alt="미리보기목업" className="absolute left-0 top-0 w-full overflow-hidden border" /> */}
        <div
          className="overflow-scroll [&::-webkit-scrollbar]:hidden w-[90%] m-auto h-full z-99"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            backgroundColor: themeColor,
            fontSize: fontSize,
            fontFamily: fontStyle,
          }}
        >
          <MainImage />

          <Gallery />
          <AccountInfo />
          <LocationInfo />
          {/* 초대 문구 section */}
          {/* TODO: 초대 메세지 영역 퍼블리싱 필요 */}
          <div className="flex flex-col items-center px-5 py-7.5">
            <p className="font-[NanumMyeongjo] font-extrabold text-xs leading-[100%] tracking-[0.375rem] text-[#D28BB3] pb-2.5">
              INVITATION
            </p>
            <p className="font-[NanumMyeongjo] font-bold text-base leading-[100%] pb-10 text-center">
              {invitationTitle}
            </p>
            <div
              className="w-full"
              dangerouslySetInnerHTML={{ __html: invitationMessage }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
