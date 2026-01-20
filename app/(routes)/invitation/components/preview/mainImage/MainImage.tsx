import { getImagePath } from "@/app/lib/utils/functions";
import { useMainImageStore } from "@/app/store/useMainImageStore";
import { useWeddingInfoStore } from "@/app/store/useWeddingInfoStore";
import Mainstyle1 from "./Mainstyle1";
import Mainstyle2 from "./Mainstyle2";
import Mainstyle3 from "./Mainstyle3";
import { useEffect } from "react";

const MainImage = () => {
  const mainImageInfo = useMainImageStore((s) => s.mainImageInfo);
  const mainStyleKind = useMainImageStore((s) => s.mainStyleKind);
  const weddingInfo = useWeddingInfoStore((s) => s.weddingInfo);

  useEffect(() => {
    console.log(mainStyleKind);
  });

  return (
    <div className="w-full">
      {mainStyleKind === "1" && <Mainstyle1 weddingInfo={weddingInfo} />}
      {mainStyleKind === "2" && <Mainstyle2 weddingInfo={weddingInfo} />}
      {mainStyleKind === "3" && <Mainstyle3 weddingInfo={weddingInfo} />}
      {/* {!mainStyleKind && mainImageInfo && (
        <img
          src={
            mainImageInfo.editedUrl
              ? getImagePath(mainImageInfo.editedUrl)
              : getImagePath(mainImageInfo.originalUrl)
          }
          alt="메인 이미지"
          className="w-full h-[760px]"
        />
      )}
      {!mainImageInfo && !mainStyleKind && (
        <div className="bg-[#D9D9D9] h-[760px]"></div>
      )} */}
    </div>
  );
};

export default MainImage;
