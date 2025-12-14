"use client";

import MainStyle1 from "@/app/assets/images/main-style-1.svg";
import MainStyle2 from "@/app/assets/images/main-style-2.svg";
import MainStyle3 from "@/app/assets/images/main-style-3.svg";
import CheckButton from "@/app/components/CheckButton";
import ImageAddButton from "@/app/components/ImageAddButton";
import { clientFetchApi } from "@/app/lib/fetches/client";
import { useCompressImageUpload } from "@/app/lib/hooks/use-compressed-image";
import { useImageUpload } from "@/app/lib/hooks/useImageUpload";
import { deleteImage, uploadImage } from "@/app/lib/utils/api";
import { getImagePath } from "@/app/lib/utils/functions";
import { useMainImageStore } from "@/app/store/useMainImageStore";
import { useWeddingIdStore } from "@/app/store/useWeddingIdStore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

type mainStyleItem = {
  title: string;
  url: string;
};

const MainImageSection = () => {
  const thumbnail = useImageUpload("main");
  const { getCompressedImage } = useCompressImageUpload();
  const { weddingId } = useWeddingIdStore();
  const { mainImageInfo, mainStyleKind, setMainStyleKind } =
    useMainImageStore();

  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const mainStyleArr = [
    { title: "mainStyle1", url: MainStyle1 },
    { title: "mainStyle2", url: MainStyle2 },
    { title: "mainStyle3", url: MainStyle3 },
  ];

  const handleClick = async (item: mainStyleItem, idx: number) => {
    const nextIdx = selectedIdx === idx ? null : idx;

    setSelectedIdx(nextIdx);
    setMainStyleKind(nextIdx === null ? "" : item.title);

    await clientFetchApi({
      endPoint: `/weddings/update`,
      method: "PATCH",
      body: {
        weddingId: weddingId,
        sectionId: "main",
        updated: { posterStyle: item.title },
      },
    });
  };

  // 이미지 업로드
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const compressedFile = await getCompressedImage(file);

    if (!compressedFile) return;

    // 1) 이미지 이미 있는 경우 삭제
    if (mainImageInfo && mainImageInfo.mediaId) {
      await deleteImage({
        weddingId: weddingId,
        mediaId: mainImageInfo.mediaId,
      });
    }

    // 2) 실제 업로드 호출 (서버 전송)
    const res = await uploadImage({
      weddingId: weddingId,
      file: compressedFile,
      imageType: "mainImage",
      displayOrder: 1,
    });

    // 3) 미리보기는 훅에서 처리
    thumbnail.handleImageUpload(file, res.data);
  };

  // 이미지 수정
  const handleImageModify = async () => {
    console.log("수정 버튼 클릭");
  };

  // 이미지 제거
  const handleImageRemove = async () => {
    thumbnail.handleImageRemove();

    await deleteImage({
      weddingId: weddingId,
      mediaId: mainImageInfo.mediaId,
    });
  };

  // 초기 selectedIdx 세팅
  useEffect(() => {
    if (!mainStyleKind) {
      setSelectedIdx(null);
      return;
    }

    const foundIndex = mainStyleArr.findIndex(
      (item) => item.title === mainStyleKind
    );

    if (foundIndex !== -1) {
      setSelectedIdx(foundIndex);
    }
  }, [mainStyleKind]);

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
          previewImage={
            mainImageInfo
              ? getImagePath(mainImageInfo.originalUrl)
              : thumbnail.preview
          }
          loading={thumbnail.loading}
          opacity={thumbnail.opacity}
          onModify={handleImageModify}
          onRemove={handleImageRemove}
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
