import React from "react";
import BlackRibbon from "@/app/assets/icons/black-ribbon.svg";
import Image from "next/image";
import { WeddingInfoSectionType } from "@/app/lib/fetches/invitation/type";

type Props = {
  type: "groom" | "bride";
  weddingInfo: WeddingInfoSectionType;
  childName: string;
};

const FamilyWeddingCoupleCard = ({ type, weddingInfo, childName }: Props) => {
  const isGroom = type === "groom";

  const fatherName = isGroom
    ? weddingInfo?.groomFatherName
    : weddingInfo?.brideFatherName;

  const motherName = isGroom
    ? weddingInfo?.groomMotherName
    : weddingInfo?.brideMotherName;

  const fatherDeceased = isGroom
    ? weddingInfo?.groomFatherDeceased
    : weddingInfo?.brideFatherDeceased;

  const motherDeceased = isGroom
    ? weddingInfo?.groomMotherDeceased
    : weddingInfo?.brideMotherDeceased;

  const showMotherRibbon =
    weddingInfo?.groomMotherDeceased || weddingInfo?.brideMotherDeceased;
  const groomRankName = weddingInfo?.groomRankName ?? "아들";
  const brideRankName = weddingInfo?.brideRankName ?? "딸";

  return (
    <div className="grid grid-cols-[auto_32px_1fr] gap-x-2 whitespace-nowrap">
      <span className="flex">
        {fatherDeceased && <Image src={BlackRibbon} alt="고인" width={14} />}
        <span>{fatherName}</span>
        {fatherName && motherName && <span className="mx-1">·</span>}

        {motherDeceased && <Image src={BlackRibbon} alt="고인" width={14} />}

        {(fatherName || motherName) && <span>{motherName}의</span>}
      </span>

      <span className="text-center">
        {isGroom ? groomRankName : brideRankName}
      </span>
      <span className="font-bold">{childName}</span>
    </div>
  );
};
export default FamilyWeddingCoupleCard;
