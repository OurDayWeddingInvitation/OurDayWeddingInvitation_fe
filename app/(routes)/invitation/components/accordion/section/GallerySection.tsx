import ImageAddBtnIcon from "@/app/assets/images/image-add-btn.svg";
import ImageAddButton from "@/app/components/ImageAddButton";
import { useCompressImageUpload } from "@/app/lib/hooks/use-compressed-image";
import { useImagePreview } from "@/app/lib/hooks/useImagePreview";
import {
  deleteImage,
  deleteImageByType,
  uploadCroppedImage,
  uploadMultipleImages,
} from "@/app/lib/utils/api";
import {
  blobToFile,
  getImagePath,
  withMinTime,
} from "@/app/lib/utils/functions";
import { useGalleryStore } from "@/app/store/useGalleryStore";
import { useWeddingIdStore } from "@/app/store/useWeddingIdStore";
import Image from "next/image";
import React, { useRef, useState } from "react";

const GallerySection = () => {
  const weddingId = useWeddingIdStore((s) => s.weddingId);
  const galleryImages = useGalleryStore((s) => s.galleryImages);
  const addGalleryImages = useGalleryStore((s) => s.addGalleryImages);
  const updateGalleryImage = useGalleryStore((s) => s.updateGalleryImage);
  const removeGalleryImage = useGalleryStore((s) => s.removeGalleryImage);
  const resetGalleryImages = useGalleryStore((s) => s.resetGalleryImages);

  const { getCompressedImage } = useCompressImageUpload();
  const {
    multiplePreview,
    setPreview,
    removePreviewItem,
    removePreviewItems,
    clearPreviewAll,
  } = useImagePreview({
    maxCount: 50,
  });

  const [loadingImageId, setLoadingImageId] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const inputStyle =
    "outline-0 flex-1 border-[#E0E0E0] border placeholder:text-center rounded-sm text-sm py-1.5 px-1";

  // 해당 이미지가 로딩중인지 확인
  const isImageLoading = (id: number) => loadingImageId === id;

  // 이미지 업로드
  const handleMultipleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);

    try {
      // 이미지 용량 리사이징
      const compressedFiles = await Promise.all(
        fileArray.map(async (file) => getCompressedImage(file))
      );

      // undefined 필터링
      const validFiles = compressedFiles.filter(
        (f): f is File => f !== undefined && f !== null
      );

      if (validFiles.length === 0) return;

      // 미리보기 추가
      const localItems = setPreview(validFiles);

      // 서버 업로드
      const res = await withMinTime(
        uploadMultipleImages({
          weddingId,
          files: validFiles,
          imageType: "galleryImage",
        }),
        1500
      );

      // 상태 업데이트
      addGalleryImages(res.data);

      // 로컬 미리보기 제거
      removePreviewItems(localItems.map((item) => item.id));

      // 같은 파일 선택 가능
      e.target.value = "";
    } catch (error) {
      console.error("Error uploading gallery images", error);
    }
  };

  // 이미지 수정
  const handleImageModify = async (mediaId: number, blob: Blob) => {
    const file = blobToFile(blob);

    if (!file) return;

    try {
      // 로딩 상태 설정
      setLoadingImageId(mediaId);

      // 실제 업로드 호출 (서버 전송)
      const res = await withMinTime(
        uploadCroppedImage({
          weddingId,
          mediaId,
          file,
        }),
        1500
      );

      // 상태 업데이트
      updateGalleryImage(res.data);

      // 로딩 상태 해제
      setLoadingImageId(null);
    } catch (error) {
      console.error("Error modifying gallery image");
    }
  };

  // 이미지 제거
  const handleImageRemove = async (localId: number, mediaId: number) => {
    try {
      // 미리보기 제거
      if (localId) {
        removePreviewItem(localId);
      }

      // 서버 이미지 제거
      await deleteImage({
        weddingId: weddingId,
        mediaId: mediaId,
      });

      // store 이미지 제거
      removeGalleryImage(mediaId);
    } catch (error) {
      console.error("Error removing gallery image");
    }
  };

  // 이미지 모두 제거
  const handleAllImageRemove = async () => {
    try {
      // 미리보기 모두 제거
      clearPreviewAll();

      // 서버 이미지 모두 제거 (galleryImage type)
      await deleteImageByType({
        weddingId: weddingId,
        imageType: "galleryImage",
      });

      resetGalleryImages();

      // file Input 초기화
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error removing all gallery images");
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-2.5 w-full">
        <div className="flex flex-wrap items-center">
          <div className="w-1/6 min-w-[50px]">제목</div>
          <input
            ref={fileInputRef}
            type="text"
            placeholder="우리의 소중한 순간"
            className={`${inputStyle} min-w-20 max-w-[230px]`}
            id="galleryTitle"
          />
        </div>
        <div>
          <div className="w-1/6 min-w-[50px] pb-1.5">갤러리</div>
          <div className="flex items-center justify-between pb-4">
            <p className=" text-[#CACACA] text-[12px]">
              최대 50장까지 업로드 할 수 있습니다.
            </p>
            <button
              className="border-[#D4C6B7] border rounded-sm text-[10px] px-2 py-1"
              onClick={handleAllImageRemove}
            >
              전체 삭제
            </button>
          </div>
          <div className="border-[#D9D9D9] border rounded-[10px] w-full p-4 mb-5 grid grid-cols-5 gap-5 min-h-[295px]">
            {/* 서버에 저장된 이미지 */}
            {galleryImages?.map((img, idx) => (
              <ImageAddButton
                key={`server-${img.mediaId}`}
                previewImage={
                  img.editedUrl
                    ? getImagePath(img.editedUrl)
                    : getImagePath(img.originalUrl)
                }
                loading={isImageLoading(img.mediaId)}
                opacity={isImageLoading(img.mediaId) ? 0.5 : 1}
                id={`server-gallery-${idx}`}
                onImageRemove={() => handleImageRemove(idx, img.mediaId)}
                onCropConfirm={(blob) => handleImageModify(img.mediaId, blob)}
              />
            ))}

            {/* 로컬 미리보기 이미지 */}
            {multiplePreview.map((img, idx) => (
              <ImageAddButton
                key={`local-gallery-${idx}`}
                previewImage={img.previewUrl}
                loading={img.isLoading}
                opacity={img.isLoading ? 0.5 : 1}
                id={`local-gallery-${idx}`}
              />
            ))}
            <label
              htmlFor="galleryInput"
              className="w-[124px] h-[124px] cursor-pointer"
            >
              <Image src={ImageAddBtnIcon} alt="추가" />
            </label>
            <input
              id="galleryInput"
              type="file"
              accept="image/*"
              className="hidden"
              multiple
              onChange={(e) => handleMultipleImageUpload(e)}
            />
          </div>
          <div className="border-[#E0E0E0] border-t w-full"></div>
          <ul className="text-[12px] text-[#CACACA] flex flex-col gap-2 pt-5 list-disc list-inside font-light">
            <li>사진은 1장당 최대 30MB까지 업로드 가능합니다.</li>
            <li>사진이 9장 이상인 경우 더보기 버튼이 보여집니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
