import { getImagePath } from "@/app/lib/utils/functions";
import { useMainImageStore } from "@/app/store/useMainImageStore";
import { useWeddingInfoStore } from "@/app/store/useWeddingInfoStore";
import Mainstyle1 from "./Mainstyle1";
import Mainstyle2 from "./Mainstyle2";
import Mainstyle3 from "./Mainstyle3";
import { useWeddingInfoStoreTest } from "@/app/store/useWeddingInfoStoreTest";

const MainImage = () => {
  const { mainImageInfo, mainStyleKind } = useMainImageStore();
  const weddingInfo = useWeddingInfoStoreTest((s) => s.weddingInfo);

  return (
    <div className="w-full">
      {mainStyleKind === "mainStyle1" && <Mainstyle1 wedding={weddingInfo} />}
      {mainStyleKind === "mainStyle2" && <Mainstyle2 wedding={weddingInfo} />}
      {mainStyleKind === "mainStyle3" && <Mainstyle3 wedding={weddingInfo} />}

      {!mainStyleKind && mainImageInfo && (
        <img src={getImagePath(mainImageInfo.originalUrl)} alt="메인 이미지" className="w-full object-cover h-[760px]" />
      )}
      {!mainImageInfo && !mainStyleKind && <div className="bg-[#D9D9D9] h-[760px]"></div>}
    </div>
  );
};

export default MainImage;
