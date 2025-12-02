"use client";

import React, { useState } from "react";
import CheckButton from "@/app/components/CheckButton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useImageUpload } from "@/app/lib/hooks/useImageUpload";
import ImageAddButton from "@/app/components/ImageAddButton";
import MainStyle1 from "@/app/assets/images/main-style-1.svg";
import MainStyle2 from "@/app/assets/images/main-style-2.svg";
import MainStyle3 from "@/app/assets/images/main-style-3.svg";
import Image from "next/image";
import { useMainStyleStore } from "@/app/store/useMainStyleStore";
// import { useCompressImageUpload } from "@/app/lib/hooks/use-compressed-image";

type mainStyleItem = {
  title: string;
  url: string;
};

const MainImageSection = () => {
  const thumbnail = useImageUpload("main");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  // const { getFileToUpload } = useCompressImageUpload();
  const mainStyleArr = [
    { title: "mainStyle1", url: MainStyle1 },
    { title: "mainStyle2", url: MainStyle2 },
    { title: "mainStyle3", url: MainStyle3 }
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

  return (
    <div>
      <h3 className="text-[15px] py-3.5">대문 사진</h3>
      <div className="flex gap-2.5">
        <input
          type="file"
          id="openImg"
          accept="image/*"
          onChange={(e) => thumbnail.handleImageUpload(e.target.files?.[0] ?? null)}
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
