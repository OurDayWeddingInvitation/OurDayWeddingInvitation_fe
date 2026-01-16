import React from "react";
import Ribbon from "@/app/assets/icons/ribbon.svg";
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

  return (
    <div className="grid grid-cols-[130px_32px_1fr] gap-x-2">
      <span className="flex">
        <Image
          src={Ribbon}
          alt="고인"
          width={14}
          style={{ opacity: fatherDeceased ? 1 : 0 }}
        />
        <span>{fatherName}</span>
        <span>·</span>

        {showMotherRibbon && (
          <Image
            src={Ribbon}
            alt="고인"
            width={14}
            style={{ opacity: motherDeceased ? 1 : 0 }}
          />
        )}

        <span>{motherName}의</span>
      </span>

      <span className="text-center">{isGroom ? "아들" : "딸"}</span>
      <span className="font-bold">{childName}</span>
    </div>
  );
};
export default FamilyWeddingCoupleCard;
