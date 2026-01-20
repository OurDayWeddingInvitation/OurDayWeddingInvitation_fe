import React, { useEffect, useState } from "react";
import ImageAddBtnIcon from "@/app/assets/images/image-add-btn.svg";
import Image from "next/image";
import LoadingImg from "@/app/assets/images/preview-image-transparent.png";
import { DotLoader } from "react-spinners";
import { Pencil, X } from "lucide-react";
import { useMainImageStore } from "../store/useMainImageStore";
import { getImagePath } from "../lib/utils/functions";
import ImageCropModal from "./ImageCropModal";

type OnCropConfirm = (blob: Blob, previewUrl: string) => Promise<void>;

interface ImageAddButtonProps {
  id: string;
  previewImage?: string;
  loading: boolean;
  opacity: number;
  originalUrl?: string;
  onImageRemove?: () => void;
  onCropConfirm?: OnCropConfirm;
}

const ImageAddButton = ({
  id,
  previewImage,
  loading,
  opacity,
  originalUrl,
  onImageRemove,
  onCropConfirm,
}: ImageAddButtonProps) => {
  const [openCrop, setOpenCrop] = useState<boolean>(false);
  const [croppedPreview, setCroppedPreview] = useState<string | null>(null);
  const mainImageInfo = useMainImageStore((s) => s.mainImageInfo);

  const imageSrc = () => {
    if (croppedPreview) return croppedPreview;

    if (previewImage) return previewImage;

    if (mainImageInfo?.editedUrl) {
      return getImagePath(mainImageInfo.editedUrl);
    }

    if (mainImageInfo?.originalUrl) {
      return getImagePath(mainImageInfo.originalUrl);
    }
  };

  const onImageRemoveInternal = async () => {
    // 브라우저에 생성된 blob URL 메모리 해제
    if (croppedPreview) {
      URL.revokeObjectURL(croppedPreview);
    }
    // 크롭 미리보기 상태 초기화
    setCroppedPreview(null);
    onImageRemove();
  };

  useEffect(() => {
    if (croppedPreview) {
      URL.revokeObjectURL(croppedPreview);
      setCroppedPreview(null);
    }
  }, [previewImage]);

  return (
    <div>
      {previewImage ? (
        <div className="w-[124px] h-[124px] overflow-hidden relative">
          <div className="w-full h-full">
            <img
              src={imageSrc()}
              alt="이미지미리보기"
              className="w-full h-full object-cover"
              style={{ opacity: opacity }}
            />

            {loading && (
              <Image
                src={LoadingImg}
                alt="이미지추가버튼"
                className="cursor-pointer absolute left-0 top-0"
              />
            )}
            {!loading && (
              <div className="absolute left-0 bottom-0 flex justify-between w-full p-3">
                <div
                  className="bg-[#D4C6B7] rounded-full p-1.5 cursor-pointer"
                  onClick={() => setOpenCrop(true)}
                >
                  <Pencil color="#FFFFFF" size={22} />
                </div>

                <button
                  onClick={onImageRemoveInternal}
                  className="bg-[#D4C6B7] rounded-full p-1.5 cursor-pointer"
                >
                  <X color="#FFFFFF" size={22} />
                </button>
              </div>
            )}
          </div>
          {openCrop && (
            <ImageCropModal
              open={openCrop}
              setOpenCrop={setOpenCrop}
              onCropConfirm={onCropConfirm}
              previewImage={previewImage}
              setCroppedPreview={setCroppedPreview}
              originalUrl={originalUrl}
            />
          )}
          {loading && (
            <DotLoader
              color={"#D4C6B7"}
              loading={loading}
              size={32}
              aria-label="Loading Spinner"
              data-testid="loader"
              className="absolute! top-[50%] left-[50%] -translate-[50%]"
            />
          )}
        </div>
      ) : (
        <label htmlFor={id}>
          <Image
            src={ImageAddBtnIcon}
            alt="이미지추가버튼"
            className="cursor-pointer"
          />
        </label>
      )}
    </div>
  );
};

export default ImageAddButton;
