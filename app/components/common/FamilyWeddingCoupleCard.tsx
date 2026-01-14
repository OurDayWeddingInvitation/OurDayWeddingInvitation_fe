import React from "react";
import Ribbon from "@/app/assets/icons/ribbon.svg";
import Image from "next/image";

type Props = {
  type: "groom" | "bride";
  familyInfo: any;
  childName: string;
};

const FamilyWeddingCoupleCard = ({ type, familyInfo, childName }: Props) => {
  const isGroom = type === "groom";

  const fatherName = isGroom
    ? familyInfo?.groomFatherName
    : familyInfo?.brideFatherName;

  const motherName = isGroom
    ? familyInfo?.groomMotherName
    : familyInfo?.brideMotherName;

  const fatherDeceased = isGroom
    ? familyInfo?.groomFatherDeceased
    : familyInfo?.brideFatherDeceased;

  const motherDeceased = isGroom
    ? familyInfo?.groomMotherDeceased
    : familyInfo?.brideMotherDeceased;

  const showMotherRibbon =
    familyInfo?.groomMotherDeceased || familyInfo?.brideMotherDeceased;

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
