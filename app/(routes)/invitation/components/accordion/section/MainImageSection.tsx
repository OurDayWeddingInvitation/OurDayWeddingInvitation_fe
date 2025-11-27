"use client";

import React, { useState } from "react";
import CheckButton from "@/app/components/CheckButton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useImageUpload } from "@/app/lib/hooks/useImageUpload";
import ImageAddButton from "@/app/components/ImageAddButton";

const MainImageSection = () => {
  const thumbnail = useImageUpload();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handleClick = (idx: number) => {
    setSelectedIdx((prev) => (prev === idx ? null : idx));
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
        {Array.from({ length: 3 }).map((_, idx) => (
          <SwiperSlide
            className="h-[231px] bg-[#EEEEEE] cursor-pointer"
            onClick={() => {
              handleClick(idx);
            }}
            key={idx}
          >
            {thumbnail.preview && <img src={thumbnail.preview} alt="대문사진" className="w-full h-full object-cover" />}
            <CheckButton
              isChecked={selectedIdx === idx}
              onClick={(e: Event) => {
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
