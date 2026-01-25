import CouplePersonCard from "@/app/components/common/CouplePersonCard";
import { getImagePath } from "@/app/lib/utils/functions";
import { useCoupleIntroStore } from "@/app/store/useCoupleIntroStore";
import { useThemeFontStore } from "@/app/store/useThemeFontStore";
import { useWeddingInfoStore } from "@/app/store/useWeddingInfoStore";
import React from "react";
import { FadeInSection } from "../FadeInSection";

const CoupleIntro = ({ isLink }: { isLink: boolean }) => {
  const themeFont = useThemeFontStore((s) => s.themeFont);
  const weddingInfo = useWeddingInfoStore((s) => s.weddingInfo);
  const coupleIntroInfo = useCoupleIntroStore((s) => s.coupleIntroInfo);
  const coupleImageInfo = useCoupleIntroStore((s) => s.coupleImageInfo);

  const groomName = `${weddingInfo?.groomLastName ?? ""}${
    weddingInfo?.groomFirstName ?? ""
  }`;
  const brideName = `${weddingInfo?.brideLastName ?? ""}${
    weddingInfo?.brideFirstName ?? ""
  }`;
  const isGroomFirst = weddingInfo?.nameOrderType === "G";

  const coupleIntroTitle = coupleIntroInfo?.title ?? "";

  // TODO: 이미지 경로 처리 함수로 변경 필요
  const groomImageUrl = coupleImageInfo?.groomImage
    ? `${getImagePath(
        coupleImageInfo?.groomImage?.editedUrl ??
          coupleImageInfo?.groomImage?.originalUrl,
      )}?v=${new Date(coupleImageInfo?.groomImage?.updatedAt).getTime()}`
    : "";
  const brideImageUrl = coupleImageInfo?.brideImage
    ? `${getImagePath(
        coupleImageInfo?.brideImage?.editedUrl ??
          coupleImageInfo?.brideImage?.originalUrl,
      )}?v=${new Date(coupleImageInfo?.brideImage?.updatedAt).getTime()}`
    : "";

  const groomDescription = coupleIntroInfo?.groomIntro ?? "";
  const brideDescription = coupleIntroInfo?.brideIntro ?? "";

  const groomCard = (
    <CouplePersonCard
      roleLabel="신랑"
      roleColor="#A9BBD2"
      name={groomName}
      imageUrl={groomImageUrl}
      description={groomDescription}
    />
  );

  const brideCard = (
    <CouplePersonCard
      roleLabel="신부"
      roleColor="#E6A5DA"
      name={brideName}
      imageUrl={brideImageUrl}
      description={brideDescription}
    />
  );
  const cards = isGroomFirst ? [groomCard, brideCard] : [brideCard, groomCard];

  return (
    <div
      className="py-10"
      style={{ backgroundColor: themeFont?.backgroundColor ?? "" }}
    >
      <div className="flex flex-col items-center">
        <FadeInSection enabled={isLink}>
          <div
            className="tracking-[4px] pb-3"
            style={{ color: themeFont?.accentColor }}
          >
            {isGroomFirst ? "GROOM & BRIDE" : "BRIDE & GROOM"}
          </div>
        </FadeInSection>
        <FadeInSection enabled={isLink}>
          <span>{coupleIntroTitle}</span>
        </FadeInSection>
        <FadeInSection enabled={isLink}>
          <div className="flex pt-10 gap-2.5 justify-center">
            {cards.map((card, idx) => (
              <React.Fragment key={idx}>{card}</React.Fragment>
            ))}
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};

export default CoupleIntro;
