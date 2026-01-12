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
      fatherName={familyInfo?.groomFatherName}
      motherName={familyInfo?.groomMotherName}
      fatherDeceased={familyInfo?.groomFatherDeceased}
      motherDeceased={familyInfo?.groomMotherDeceased}
      groomMotherDeceased={familyInfo?.groomMotherDeceased}
      brideMotherDeceased={familyInfo?.brideMotherDeceased}
      role="아들"
      childName={groomName}
    />
  );

  const brideBlock = (
    <FamilyWeddingInfoCoupleCard
      fatherName={familyInfo?.brideFatherName}
      motherName={familyInfo?.brideMotherName}
      fatherDeceased={familyInfo?.brideFatherDeceased}
      motherDeceased={familyInfo?.brideMotherDeceased}
      groomMotherDeceased={familyInfo?.groomMotherDeceased}
      brideMotherDeceased={familyInfo?.brideMotherDeceased}
      role="딸"
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
