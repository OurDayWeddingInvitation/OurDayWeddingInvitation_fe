import React from "react";
import Image from "next/image";
import Ribbon from "@/app/assets/icons/ribbon.svg";
import { useWeddingInfoStore } from "@/app/store/useWeddingInfoStore";
import { useFamilyInfoStore } from "@/app/store/useFamilyInfoStore";
const FamilyWeddingInfo = () => {
  const weddingInfo = useWeddingInfoStore((s) => s.weddingInfo);
  const familyInfo = useFamilyInfoStore((s) => s.familyInfo);
  const groomName = `${weddingInfo?.groomLastName ?? ""}${
    weddingInfo?.groomFirstName ?? ""
  }`;
  const brideName = `${weddingInfo?.brideLastName ?? ""}${
    weddingInfo?.brideFirstName ?? ""
  }`;
  return (
    <div>
      {" "}
      <div className="py-10">
        <div className="mx-auto flex flex-col gap-3.5">
          {/* 아들 */}
          <div className="grid grid-cols-[130px_32px_1fr] gap-x-2">
            <span className="flex">
              <Image
                src={Ribbon}
                alt="고인"
                width={14}
                style={{
                  opacity: familyInfo?.groomFatherDeceased ? 1 : 0,
                }}
              />
              <span>{familyInfo?.groomFatherName}</span>
              <span>·</span>
              {(familyInfo?.groomMotherDeceased ||
                familyInfo?.brideMotherDeceased) && (
                <Image
                  src={Ribbon}
                  alt="고인"
                  width={14}
                  style={{
                    opacity: familyInfo?.groomMotherDeceased ? 1 : 0,
                  }}
                />
              )}

              <span>{familyInfo?.groomMotherName}의</span>
            </span>
            <span className="text-center">아들</span>
            <span className="font-bold">{groomName}</span>
          </div>

          {/* 딸 */}
          <div className="grid grid-cols-[130px_32px_1fr] gap-x-2">
            <span className="flex">
              <Image
                src={Ribbon}
                alt="고인"
                width={14}
                style={{
                  opacity: familyInfo?.brideFatherDeceased ? 1 : 0,
                }}
              />
              <span>{familyInfo?.brideFatherName}</span>
              <span>·</span>
              {(familyInfo?.groomMotherDeceased ||
                familyInfo?.brideMotherDeceased) && (
                <Image
                  src={Ribbon}
                  alt="고인"
                  width={14}
                  style={{
                    opacity: familyInfo?.brideMotherDeceased ? 1 : 0,
                  }}
                />
              )}
              <span>{familyInfo?.brideMotherName}의</span>
            </span>
            <span className="text-center">딸</span>
            <span className="font-bold">{brideName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyWeddingInfo;
