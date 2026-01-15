import React from "react";

type PersonCardProps = {
  roleLabel: "신랑" | "신부";
  roleColor: string;
  name: string;
  description: string;
};

const CouplePersonCard = ({
  roleLabel,
  roleColor,
  name,
  description,
}: PersonCardProps) => {
  return (
    <div className="flex flex-col items-center">
      {/* 이미지 */}
      <div className="w-[145px] h-[145px] bg-[#D9D9D9] rounded-[10px]" />

      <div className="flex gap-2.5 justify-center items-center py-2.5">
        <span className="text-[12px]" style={{ color: roleColor }}>
          {roleLabel}
        </span>
        <span>{name}</span>
      </div>

      <p className="max-w-[110px] py-5 text-center">{description}</p>
    </div>
  );
};

export default CouplePersonCard;
