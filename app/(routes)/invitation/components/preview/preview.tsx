"use client";

import { useMessageStore } from "@/app/store/invitationMessageStore";
import { useCounterStore } from "@/app/store/sectionFirstStore";
import Mockup from "../../../../assets/images/mockup.png";
import { useColorFontStore } from "@/app/store/useColorFontStore";
import MainImage from "./mainImage/MainImage";
import Gallery from "./Gallery";
import AccountInfo from "./AccountInfo";
import Image from "next/image";
import ScrollVideoPage from "@/app/components/test";
import { useRef } from "react";

const Preview = () => {
  const { title, description } = useCounterStore();
  const { message } = useMessageStore();
  const { themeColor, fontSize, fontStyle } = useColorFontStore();
  const parentRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="overflow-auto">
      <div className="relative h-[760px] overflow-auto">
        {/* <Image src={Mockup} alt="미리보기목업" className="absolute left-0 top-0 w-full overflow-hidden border" /> */}
        <div
          ref={parentRef}
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
          <ScrollVideoPage parentRef={parentRef} />
          <div className="h-[300px]"></div>
          <div dangerouslySetInnerHTML={{ __html: message }}></div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
