"use client";

import { useColorFontStore } from "@/app/store/useColorFontStore";
import AccountInfo from "./AccountInfo";
import Gallery from "./Gallery";
import InvitationMessage from "./InvitationMessage";
import LocationInfo from "./LocationInfo";
import React from "react";
import { useInvitationMessageStore } from "@/app/store/useInvitationMessageStore";
import { useThemeFontStoreTest } from "@/app/store/useColorFontStoreTest";
import MainImage from "./mainImage/MainImage";

const Preview = () => {
  // const { invitationTitle, invitationMessage } = useMessageStore();
  // constant로 fontname에 맞게 fontfamily 설정 필요
  const themeFont = useThemeFontStoreTest((s) => s.themeFont);
  const invitationMessage = useInvitationMessageStore(
    (s) => s.invitationMessage
  );

  return (
    <div>
      <div className="relative h-[760px]">
        {/* <Image src={Mockup} alt="미리보기목업" className="absolute left-0 top-0 w-full overflow-hidden border" /> */}
        <div
          className="overflow-scroll [&::-webkit-scrollbar]:hidden w-[90%] m-auto h-full z-99"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            backgroundColor: themeFont?.backgroundColor ?? "",
            fontSize: themeFont?.fontSize ?? 14,
            fontFamily: themeFont?.fontName ?? "",
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
              {/* {invitationTitle} */}
            </p>
            <div
              className="w-full"
              dangerouslySetInnerHTML={{ __html: invitationMessage?.message }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
