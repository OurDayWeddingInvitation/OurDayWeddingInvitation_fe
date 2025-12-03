"use client";

import { useMessageStore } from "@/app/store/invitationMessageStore";
import { useCounterStore } from "@/app/store/sectionFirstStore";
import Mockup from "../../../../assets/images/mockup.png";
import { useColorFontStore } from "@/app/store/useColorFontStore";
import MainImage from "./mainImage/MainImage";
import Gallery from "./Gallery";
import AccountInfo from "./AccountInfo";

const Preview = () => {
  const { title, description } = useCounterStore();
  const { message } = useMessageStore();
  const { themeColor, fontSize, fontStyle } = useColorFontStore();

  return (
    <div>
      <div className="relative h-[760px]">
        {/* <Image src={Mockup} alt="미리보기목업" className="absolute left-0 top-0 w-full overflow-hidden border" /> */}
        <div
          className="overflow-scroll [&::-webkit-scrollbar]:hidden w-[90%] m-auto h-full z-99"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", backgroundColor: themeColor, fontSize: fontSize, fontFamily: fontStyle }}
        >
          <MainImage />
          <Gallery />
          <AccountInfo />
          <div dangerouslySetInnerHTML={{ __html: message }}></div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
