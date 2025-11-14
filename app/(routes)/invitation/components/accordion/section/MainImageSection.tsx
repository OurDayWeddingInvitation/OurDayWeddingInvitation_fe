import React from "react";
import ImageAddBtnIcon from "@/app/assets/images/image-add-btn.svg";
import Image from "next/image";
import CheckButton from "@/app/components/CheckButton";

const MainImageSection = () => {
  const handleImageUpload = () => {};
  return (
    <div>
      <h3 className="text-[15px] py-3.5">대문 사진</h3>
      <div className="">
        <input type="file" id="openingImage" accept="image/*" onChange={handleImageUpload} />
        <label htmlFor="openingImage">
          <Image src={ImageAddBtnIcon} alt="이미지추가버튼" className="cursor-pointer" />
        </label>
      </div>

      <h3 className="text-[15px] py-4">대문 스타일</h3>
      <div className="flex gap-[18px]">
        <div className="bg-[#EEEEEE] h-60 flex-1 cursor-pointer">
          <CheckButton />
        </div>
        <div className="bg-[#EEEEEE] h-60 flex-1 cursor-pointer">
          <CheckButton />
        </div>
        <div className="bg-[#EEEEEE] h-60 flex-1 cursor-pointer">
          <CheckButton />
        </div>
        <div className="bg-[#EEEEEE] h-60 flex-1 cursor-pointer">
          <CheckButton />
        </div>
      </div>
    </div>
  );
};

export default MainImageSection;
