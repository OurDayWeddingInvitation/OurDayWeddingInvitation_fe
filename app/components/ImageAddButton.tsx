import React from "react";
import ImageAddBtnIcon from "@/app/assets/images/image-add-btn.svg";
import Image from "next/image";
import TestImg from "@/app/assets/images/preview-image-transparent.png";
import { DotLoader } from "react-spinners";
import { Pencil, X } from "lucide-react";

const ImageAddButton = ({ previewImage, loading, opacity, handleImageRemove, id }) => {
  return (
    <div>
      {previewImage ? (
        <div className="w-[124px] h-[124px] overflow-hidden relative">
          <div className="w-full h-full ">
            <img src={previewImage} alt="이미지미리보기" className="w-full h-full object-cover" style={{ opacity: opacity }} />

            {loading && <Image src={TestImg} alt="이미지추가버튼" className="cursor-pointer absolute left-0 top-0" />}
            {!loading && (
              <div className="absolute left-0 bottom-0 flex justify-between w-full p-3">
                <label htmlFor={id} className="bg-[#D4C6B7] rounded-full p-1.5 cursor-pointer">
                  <Pencil color="#FFFFFF" size={22} />
                </label>
                <label htmlFor={id} onClick={handleImageRemove} className="bg-[#D4C6B7] rounded-full p-1.5 cursor-pointer">
                  <X color="#FFFFFF" size={22} />
                </label>
              </div>
            )}
          </div>
          {loading && (
            <DotLoader
              color={"#D4C6B7"}
              loading={loading}
              size={32}
              aria-label="Loading Spinner"
              data-testid="loader"
              className="absolute! top-[50%] left-[50%] -translate-[50%] "
            />
          )}
        </div>
      ) : (
        <label htmlFor={id}>
          <Image src={ImageAddBtnIcon} alt="이미지추가버튼" className="cursor-pointer" />
        </label>
      )}
    </div>
  );
};

export default ImageAddButton;
