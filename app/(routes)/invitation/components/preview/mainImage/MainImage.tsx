import React from "react";
import { useMainImageStore } from "@/app/store/useMainImageStore";
import Mainstyle1 from "./Mainstyle1";
import Mainstyle2 from "./Mainstyle2";
import Mainstyle3 from "./Mainstyle3";
import { useMainStyleStore } from "@/app/store/useMainStyleStore";
import { useWeddingInfoStore } from "@/app/store/useWeddingInfoStore";

const MainImage = () => {
  const { mainStyleKind } = useMainStyleStore();
  const { mainImage } = useMainImageStore();
  const { wedding } = useWeddingInfoStore();
  return (
    <div className="w-full">
      {mainStyleKind === "mainStyle1" && <Mainstyle1 wedding={wedding} />}
      {mainStyleKind === "mainStyle2" && <Mainstyle2 wedding={wedding} />}
      {mainStyleKind === "mainStyle3" && <Mainstyle3 wedding={wedding} />}

      {!mainStyleKind && mainImage && (
        <div className="bg-[#D9D9D9] h-[760px]">
          <img src={mainImage} alt="메인 이미지" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );
};

export default MainImage;
