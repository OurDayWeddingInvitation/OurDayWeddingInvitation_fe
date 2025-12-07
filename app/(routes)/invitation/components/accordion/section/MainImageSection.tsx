"use client";

import MainStyle1 from "@/app/assets/images/main-style-1.svg";
import MainStyle2 from "@/app/assets/images/main-style-2.svg";
import MainStyle3 from "@/app/assets/images/main-style-3.svg";
import CheckButton from "@/app/components/CheckButton";
import ImageAddButton from "@/app/components/ImageAddButton";
import { useCompressImageUpload } from "@/app/lib/hooks/use-compressed-image";
import { useImageUpload } from "@/app/lib/hooks/useImageUpload";
import { uploadImages } from "@/app/lib/utils/api";
import { useMainStyleStore } from "@/app/store/useMainStyleStore";
import Image from "next/image";
import React, { useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

type mainStyleItem = {
  title: string;
  url: string;
};

const MainImageSection = () => {
  const thumbnail = useImageUpload("main");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const { getCompressedImage } = useCompressImageUpload();

  const mainStyleArr = [
    { title: "mainStyle1", url: MainStyle1 },
    { title: "mainStyle2", url: MainStyle2 },
    { title: "mainStyle3", url: MainStyle3 },
  ];
  const { setMainStyleKind } = useMainStyleStore();

  const handleClick = (item: mainStyleItem, idx: number) => {
    setSelectedIdx((prev) => {
      if (prev === idx) {
        setMainStyleKind(null);
        return null;
      } else {
        setMainStyleKind(item.title);
        return idx;
      }
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const compressedFile = await getCompressedImage(file);

    if (!compressedFile) return;

    // 1) 미리보기는 훅에서 처리
    thumbnail.handleImageUpload(file);

    // 2) 실제 업로드 호출 (서버 전송)
    const res = await uploadImages(1, compressedFile, "mainImage", 1);
    console.log("서버 업로드 결과:", res);
  };

  return (
    <div>
      <h3 className="text-[15px] py-3.5">대문 사진</h3>
      <div className="flex gap-2.5">
        <input
          type="file"
          id="openImg"
          accept="image/*"
          onChange={(e) => handleImageChange(e)}
          className="hidden"
        />
        <ImageAddButton
          previewImage={thumbnail.preview}
          loading={thumbnail.loading}
          opacity={thumbnail.opacity}
          handleImageRemove={thumbnail.handleImageRemove}
          id="openImg"
        />
      </div>

      <h3 className="text-[15px] py-4">대문 스타일</h3>

      <Swiper slidesPerView={4} spaceBetween={18} className="h-60">
        {mainStyleArr.map((item, idx) => (
          <SwiperSlide
            className="cursor-pointer object-cover"
            onClick={() => {
              handleClick(item, idx);
            }}
            key={idx}
          >
            <Image src={item.url} alt="대문스타일" className="h-full" />
            <CheckButton
              isChecked={selectedIdx === idx}
              onClick={(e: Event) => {
                e.stopPropagation();
                handleClick(item, idx);
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainImageSection;
