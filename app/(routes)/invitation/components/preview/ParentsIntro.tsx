import React from "react";
import { useThemeFontStore } from "@/app/store/useThemeFontStore";
import { Heart } from "lucide-react";
import { useWeddingInfoStore } from "@/app/store/useWeddingInfoStore";

const ParentsInfo = () => {
  const themeFont = useThemeFontStore((s) => s.themeFont);
  const weddingInfo = useWeddingInfoStore((s) => s.weddingInfo);
  const groomName = weddingInfo?.groomFirstName;
  const brideName = weddingInfo?.brideFirstName;
  const isGroomFirst = weddingInfo?.nameOrderType === "G";
  const parents = [
    {
      key: "groom",
      label: "신랑",
      labelColor: "#A9BBD2",
      childName: groomName,
      father: weddingInfo?.groomFatherName,
      mother: weddingInfo?.groomMotherName,
    },
    {
      key: "bride",
      label: "신부",
      labelColor: "#e6a5da",
      childName: brideName,
      father: weddingInfo?.brideFatherName,
      mother: weddingInfo?.brideMotherName,
    },
  ];
  const orderedParents = isGroomFirst ? parents : [...parents].reverse();
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
          OUR PARENTS
        </div>
        <span className="text-[16px]">우리의 부모님</span>
        <div className="flex flex-col gap-2 items-center py-10">
          <p>저희의 시작을 사랑으로 응원해주신</p>
          <p> 양가 부모님을 소개합니다.</p>
        </div>

        <div className="flex justify-center gap-2.5">
          {orderedParents.map((p) => (
            <div key={p.key} className="flex flex-col items-center">
              {/* 이미지 자리 */}
              <div className="w-[145px] h-[145px] bg-[#D9D9D9] rounded-[10px]" />

              <div className="flex gap-2.5 justify-center items-center py-2.5 text-[12px]">
                <span style={{ color: p.labelColor }}>{p.label}</span>
                <span>{p.childName}의 부모님</span>
              </div>

              <p className="py-5 flex items-center gap-1">
                <span>{p.father}</span>
                <Heart color="#E58989" fill="#E58989" size={18} />
                <span>{p.mother}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParentsInfo;
