import React from "react";
import { useWeddingInfoStore } from "@/app/store/useWeddingInfoStore";
import { useFamilyInfoStore } from "@/app/store/useFamilyInfoStore";
import FamilyWeddingInfoCoupleCard from "@/app/components/common/FamilyWeddingCoupleCard";

const FamilyWeddingInfo = () => {
  const weddingInfo = useWeddingInfoStore((s) => s.weddingInfo);
  const familyInfo = useFamilyInfoStore((s) => s.familyInfo);
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
      familyInfo={familyInfo}
      childName={groomName}
    />
  );

  const brideBlock = (
    <FamilyWeddingInfoCoupleCard
      type="bride"
      familyInfo={familyInfo}
      childName={brideName}
    />
  );

  return (
    <div>
      <div className="py-10">
        <div className="mx-auto flex flex-col gap-3.5">
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
    </div>
  );
};

export default FamilyWeddingInfo;
