"use client";

import { useCounterStore } from "@/app/store/sectionFirstStore";
import { useColorFontStore } from "@/app/store/useColorFontStore";
import AccountInfo from "./AccountInfo";
import Gallery from "./Gallery";
import InvitationMessage from "./InvitationMessage";
import LocationInfo from "./LocationInfo";
import MainImage from "./mainImage/MainImage";

const Preview = () => {
  const { title, description } = useCounterStore();
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
          <InvitationMessage />
        </div>
      </div>
    </div>
  );
};

export default Preview;
