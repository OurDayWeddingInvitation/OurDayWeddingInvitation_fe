import React from "react";
import { useWeddingInfoStore } from "@/app/store/useWeddingInfoStore";
import FamilyWeddingInfoCoupleCard from "@/app/components/common/FamilyWeddingCoupleCard";

const FamilyWeddingInfo = () => {
  const weddingInfo = useWeddingInfoStore((s) => s.weddingInfo);
  const groomName = `${weddingInfo?.groomLastName ?? ""}${
    weddingInfo?.groomFirstName ?? ""
  }`;
  const brideName = `${weddingInfo?.brideLastName ?? ""}${
    weddingInfo?.brideFirstName ?? ""
  }`;
  const isGroomFirst = weddingInfo?.nameOrderType === "G";

  const groomBlock = (
    <FamilyWeddingInfoCoupleCard
      type="groom"
      weddingInfo={weddingInfo}
      childName={groomName}
    />
  );

  const brideBlock = (
    <FamilyWeddingInfoCoupleCard
      type="bride"
      weddingInfo={weddingInfo}
      childName={brideName}
    />
  );

  return (
    <div className="pt-10">
      <div className="mx-auto flex flex-col gap-3.5 items-center">
        {isGroomFirst ? (
          <>
            {groomBlock}
            {brideBlock}
          </>
        ) : (
          <>
            {brideBlock}
            {groomBlock}
          </>
        )}
      </div>
    </div>
  );
};

export default FamilyWeddingInfo;
