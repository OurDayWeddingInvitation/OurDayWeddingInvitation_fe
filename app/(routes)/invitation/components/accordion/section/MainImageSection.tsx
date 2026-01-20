"use client";

import MainStyle1 from "@/app/assets/images/main-style-1.svg";
import MainStyle2 from "@/app/assets/images/main-style-2.svg";
import MainStyle3 from "@/app/assets/images/main-style-3.svg";
import CheckButton from "@/app/components/CheckButton";
import ImageAddButton from "@/app/components/ImageAddButton";
import { clientFetchApi } from "@/app/lib/fetches/client";
import { useCompressImageUpload } from "@/app/lib/hooks/use-compressed-image";
import { useImagePreview } from "@/app/lib/hooks/useImagePreview";
import {
  deleteImage,
  uploadCroppedImage,
  uploadImage,
} from "@/app/lib/utils/api";
import {
  blobToFile,
  getImagePath,
  withMinTime,
} from "@/app/lib/utils/functions";
import { useMainImageStore } from "@/app/store/useMainImageStore";
import { useWeddingIdStore } from "@/app/store/useWeddingIdStore";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

type mainStyleItem = {
  title: string;
  url: string;
};

const MainImageSection = () => {
  const weddingId = useWeddingIdStore((s) => s.weddingId);
  const mainImageInfo = useMainImageStore((s) => s.mainImageInfo);
  const mainStyleKind = useMainImageStore((s) => s.mainStyleKind);
  const setMainStyleKind = useMainImageStore((s) => s.setMainStyleKind);
  const updateMainImageInfo = useMainImageStore((s) => s.updateMainImageInfo);
  const resetMainImageInfo = useMainImageStore((s) => s.resetMainImageInfo);

  const { singlePreview, setPreview, removePreviewItem } = useImagePreview({
    maxCount: 1,
  });
  const { getCompressedImage } = useCompressImageUpload();

  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const mainStyleArr = [
    { title: "1", url: MainStyle1 },
    { title: "2", url: MainStyle2 },
    { title: "3", url: MainStyle3 },
  ];

  const handleClick = async (item: mainStyleItem, idx: number) => {
    try {
      const nextIdx = selectedIdx === idx ? null : idx;
      const mainStyleKind = nextIdx === null ? "" : item.title;

      setSelectedIdx(nextIdx);
      setMainStyleKind(mainStyleKind);

      await clientFetchApi({
        endPoint: `/weddings/update`,
        method: "PATCH",
        body: {
          weddingId: weddingId,
          sectionId: "main",
          updated: { posterStyle: mainStyleKind },
        },
      });
    } catch (error) {
      console.error("Error updating main style kind");
    }
  };

  // 이미지 업로드
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    try {
      const compressedFile = await getCompressedImage(file);

      if (!compressedFile) return;

      // 미리보기 설정
      const newItems = setPreview(compressedFile);
      const localItem = newItems[0];

      // 실제 업로드 호출 (서버 전송)
      const res = await withMinTime(
        uploadImage({
          weddingId: weddingId,
          file: compressedFile,
          imageType: "mainImage",
          displayOrder: 1,
        }),
        1500,
      );

      // store 상태 업데이트
      updateMainImageInfo(res.data);

      // 미리보기 제거
      removePreviewItem(localItem.id);
    } catch (error) {
      console.error("Error uploading main image");
    }
  };

  // 이미지 수정
  const handleImageModify = async (blob: Blob) => {
    const file = blobToFile(blob);

    if (!file) return;

    // 미리보기 설정
    const newItems = setPreview(file);
    const localItem = newItems[0];

    try {
      // 실제 업로드 호출 (서버 전송)
      const res = await withMinTime(
        uploadCroppedImage({
          weddingId,
          mediaId: mainImageInfo.mediaId,
          file: file,
        }),
        1500,
      );

      // store 상태 업데이트
      updateMainImageInfo(res.data);

      // 미리보기 제거
      removePreviewItem(localItem.id);
    } catch (error) {
      console.error("Error modifying main image");
    }
  };

  // 이미지 제거
  const handleImageRemove = async () => {
    try {
      // 미리보기 제거
      if (singlePreview) {
        removePreviewItem(singlePreview.id);
      }

      await deleteImage({
        weddingId: weddingId,
        mediaId: mainImageInfo.mediaId,
      });

      // store 상태 초기화
      resetMainImageInfo();

      // file Input 초기화
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error removing main image");
    }
  };

  // 초기 selectedIdx 세팅
  useEffect(() => {
    if (!mainStyleKind) {
      setSelectedIdx(null);
      return;
    }

    const foundIndex = mainStyleArr.findIndex(
      (item) => item.title === mainStyleKind,
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
          onChange={(e) => handleImageUpload(e)}
          className="hidden"
          ref={fileInputRef}
        />
        <ImageAddButton
          previewImage={
            mainImageInfo
              ? getImagePath(
                  mainImageInfo.editedUrl ?? mainImageInfo.originalUrl,
                )
              : singlePreview?.previewUrl
          }
          originalUrl={getImagePath(mainImageInfo?.originalUrl)}
          loading={singlePreview?.isLoading}
          opacity={singlePreview?.isLoading ? 0.5 : 1}
          onImageRemove={handleImageRemove}
          id="openImg"
          onCropConfirm={(blob) => handleImageModify(blob)}
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
