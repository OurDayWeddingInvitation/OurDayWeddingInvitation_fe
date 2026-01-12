import React from "react";
import { useThemeFontStore } from "@/app/store/useThemeFontStore";
import { useWeddingInfoStore } from "@/app/store/useWeddingInfoStore";
import CouplePersonCard from "@/app/components/common/CouplePersonCard";

const CoupleIntro = () => {
  const themeFont = useThemeFontStore((s) => s.themeFont);
  const weddingInfo = useWeddingInfoStore((s) => s.weddingInfo);
  const groomName = `${weddingInfo?.groomLastName ?? ""}${
    weddingInfo?.groomFirstName ?? ""
  }`;
  const brideName = `${weddingInfo?.brideLastName ?? ""}${
    weddingInfo?.brideFirstName ?? ""
  }`;
  const isGroomFirst = weddingInfo?.nameOrderType === "G";

  const groomCard = (
    <CouplePersonCard
      roleLabel="신랑"
      roleColor="#A9BBD2"
      name={groomName}
      description="나무같은 남편이 되겠습니다"
    />
  );

  const brideCard = (
    <CouplePersonCard
      roleLabel="신부"
      roleColor="#E6A5DA"
      name={brideName}
      description="나무같은 아내가 되겠습니다"
    />
  );
  const cards = isGroomFirst ? [groomCard, brideCard] : [brideCard, groomCard];

  return (
    <div
      className="py-10"
      style={{ backgroundColor: themeFont?.backgroundColor ?? "" }}
    >
      <div className="flex flex-col items-center">
        <div
          className="tracking-[4px] text-[12px] pb-3"
          style={{ color: themeFont?.accentColor }}
        >
          {isGroomFirst ? "GROOM & BRIDE" : "BRIDE & GROOM"}
        </div>
        <span className="text-[16px]">
          {isGroomFirst ? "신랑 & 신부" : "신부 & 신랑"}을 소개합니다
        </span>
        <div className="flex pt-10 gap-2.5 justify-center">
          {cards.map((card, idx) => (
            <React.Fragment key={idx}>{card}</React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoupleIntro;
