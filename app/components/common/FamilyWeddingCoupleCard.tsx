import React from "react";
import Ribbon from "@/app/assets/icons/ribbon.svg";
import Image from "next/image";

type ChildInfoProps = {
  fatherName?: string;
  motherName?: string;
  fatherDeceased?: boolean;
  motherDeceased?: boolean;
  role: "아들" | "딸";
  childName: string;
  groomMotherDeceased?: boolean;
  brideMotherDeceased?: boolean;
};
const FamilyWeddingCoupleCard = ({
  fatherName,
  motherName,
  fatherDeceased,
  motherDeceased,
  role,
  childName,
  groomMotherDeceased,
  brideMotherDeceased,
}: ChildInfoProps) => {
  return (
    <div className="grid grid-cols-[130px_32px_1fr] gap-x-2">
      <span className="flex">
        <Image
          src={Ribbon}
          alt="고인"
          width={14}
          style={{
            opacity: fatherDeceased ? 1 : 0,
          }}
        />
        <span>{fatherName}</span>
        <span>·</span>
        {(groomMotherDeceased || brideMotherDeceased) && (
          <Image
            src={Ribbon}
            alt="고인"
            width={14}
            style={{
              opacity: motherDeceased ? 1 : 0,
            }}
          />
        )}

        <span>{motherName}의</span>
      </span>
      <span className="text-center">{role}</span>
      <span className="font-bold">{childName}</span>
    </div>
  );
};

export default FamilyWeddingCoupleCard;
