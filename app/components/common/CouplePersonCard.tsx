import React from "react";

type PersonCardProps = {
  roleLabel: "신랑" | "신부";
  roleColor: string;
  name: string;
  imageUrl: string;
  description: string;
};

const CouplePersonCard = ({
  roleLabel,
  roleColor,
  name,
  imageUrl,
  description,
}: PersonCardProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[145px] h-[145px] rounded-[10px] overflow-hidden">
        {/* 이미지 */}
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="신랑 신부 이미지"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#D9D9D9]" />
        )}
      </div>

      <div className="flex gap-2.5 justify-center items-center py-2.5">
        <span style={{ color: roleColor }}>{roleLabel}</span>
        <span>{name}</span>
      </div>

      <div
        className="max-w-[130px] py-5 text-center"
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
    </div>
  );
};

export default CouplePersonCard;
