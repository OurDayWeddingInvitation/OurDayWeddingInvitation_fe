"use client";

import ImageAddBtnIcon from "@/app/assets/images/image-add-btn.svg";
import TestImg from "@/app/assets/images/preview-image-transparent.png";
import CheckButton from "@/app/components/CheckButton";
import { useCompressImageUpload } from "@/app/lib/hooks/use-compressed-image";
import { Pencil, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { DotLoader } from "react-spinners";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

const MainImageSection = () => {
  const { getFileToUpload } = useCompressImageUpload();

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [opacity, setOpacity] = useState(0);
  const fileInputRef = useRef(null);

  const handleClick = (idx: number) => {
    setSelectedIdx((prev) => (prev === idx ? null : idx));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    const compressedFile = await getFileToUpload(file);

    // TODO: 파일 크기 비교용 (제거 예정)
    console.log("원본 파일 크기:", file.size / 1024 / 1024, "MB");
    console.log("압축 파일 크기:", compressedFile.size / 1024 / 1024, "MB");

    const imageUrl = URL.createObjectURL(compressedFile);

    if (!file) return;

    setPreviewImage(imageUrl);
    setLoading(true);
    setOpacity(0.5);

    setTimeout(() => {
      setLoading(false);
      setOpacity(1);
    }, 2000);
  };

  const handleImageRemove = () => {
    setPreviewImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const mainStyle = [1, 2, 3];

  return (
    <div>
      <h3 className="text-[15px] py-3.5">대문 사진</h3>
      <div className="flex gap-2.5">
        <input
          type="file"
          id="openImg"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          ref={fileInputRef}
        />
        {previewImage ? (
          <div className="relative">
            <div className="w-[124px] h-[124px] overflow-hidden relative">
              <img
                src={previewImage}
                alt="대문사진"
                className="w-full h-full object-cover"
                style={{ opacity: opacity }}
              />

              {loading && (
                <Image
                  src={TestImg}
                  alt="이미지추가버튼"
                  className="cursor-pointer absolute left-0 top-0"
                />
              )}
              {!loading && (
                <div className="absolute left-0 bottom-0 flex justify-between w-full p-3">
                  <label
                    htmlFor="openImg"
                    className="bg-[#D4C6B7] rounded-full p-1.5 cursor-pointer"
                  >
                    <Pencil color="#FFFFFF" size={22} />
                  </label>
                  <label
                    htmlFor="openImg"
                    onClick={handleImageRemove}
                    className="bg-[#D4C6B7] rounded-full p-1.5 cursor-pointer"
                  >
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
          <label htmlFor="openImg">
            <Image
              src={ImageAddBtnIcon}
              alt="이미지추가버튼"
              className="cursor-pointer"
            />
          </label>
        )}
      </div>

      <h3 className="text-[15px] py-4">대문 스타일</h3>

      <Swiper slidesPerView={4} spaceBetween={18} className="h-60">
        {mainStyle.map((_, idx) => (
          <SwiperSlide
            className="h-[231px] bg-[#EEEEEE] cursor-pointer"
            onClick={() => {
              handleClick(idx);
            }}
            key={idx}
          >
            {previewImage && (
              <img
                src={previewImage}
                alt="대문사진"
                className="w-full h-full object-cover"
              />
            )}
            <CheckButton
              isChecked={selectedIdx === idx}
              onClick={(e) => {
                e.stopPropagation();
                handleClick(idx);
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainImageSection;
