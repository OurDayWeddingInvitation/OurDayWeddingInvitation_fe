import React, { useState } from "react";
import ImageAddBtnIcon from "@/app/assets/images/image-add-btn.svg";
import Image from "next/image";
import CheckButton from "@/app/components/CheckButton";

const MainImageSection = () => {
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
  };
  return (
    <div>
      <h3 className="text-[15px] py-3.5">대문 사진</h3>
      <div className="flex gap-2.5">
        <input type="file" id="openingImage" accept="image/*" onChange={handleImageUpload} className="hidden" />
        <label htmlFor="openingImage">
          <Image src={ImageAddBtnIcon} alt="이미지추가버튼" className="cursor-pointer" />
        </label>
        {previewImage && (
          <div className="w-[124px] h-[124px] overflow-hidden ">
            <img src={previewImage} alt="대문사진" className="w-full h-full object-cover" />
          </div>
        )}
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
