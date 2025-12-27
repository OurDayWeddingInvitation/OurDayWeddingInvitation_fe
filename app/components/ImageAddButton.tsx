import React, { useEffect, useRef, useState } from "react";
import ImageAddBtnIcon from "@/app/assets/images/image-add-btn.svg";
import Image from "next/image";
import LoadingImg from "@/app/assets/images/preview-image-transparent.png";
import { DotLoader } from "react-spinners";
import { Pencil, X } from "lucide-react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../lib/utils/cropImage";
import { Area } from "react-easy-crop";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { centerCrop, makeAspectCrop } from "react-image-crop";
import "./ImageCrop.style.css";

type OnCropConfirm = (blob: Blob, previewUrl: string) => Promise<void>;

interface ImageAddButtonProps {
  previewImage?: string;
  loading: boolean;
  opacity: number;
  onImageRemove: () => void;
  id: string;
  onCropConfirm?: OnCropConfirm;
}

const ImageAddButton = ({ previewImage, loading, opacity, onImageRemove, id, onCropConfirm }: ImageAddButtonProps) => {
  const [crop, setCrop] = useState<Crop>();
  const [openCrop, setOpenCrop] = useState<boolean>(false);
  const [croppedPreview, setCroppedPreview] = useState<string | null>(null);
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleCropConfirm = async () => {
    const blob = await getCroppedImg(imgRef.current, completedCrop);
    const croppedUrl = URL.createObjectURL(blob);

    setCroppedPreview(croppedUrl);
    setOpenCrop(false);

    if (onCropConfirm) {
      onCropConfirm(blob, croppedUrl);
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
    setCrop(undefined);
    setCompletedCrop(null);

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
            <img src={croppedPreview ?? previewImage} alt="이미지미리보기" className="w-full h-full object-cover" style={{ opacity: opacity }} />

            {loading && <Image src={LoadingImg} alt="이미지추가버튼" className="cursor-pointer absolute left-0 top-0" />}
            {!loading && (
              <div className="absolute left-0 bottom-0 flex justify-between w-full p-3">
                <div className="bg-[#D4C6B7] rounded-full p-1.5 cursor-pointer" onClick={() => setOpenCrop(true)}>
                  <Pencil color="#FFFFFF" size={22} />
                </div>

                <label htmlFor={id} onClick={onImageRemoveInternal} className="bg-[#D4C6B7] rounded-full p-1.5 cursor-pointer">
                  <X color="#FFFFFF" size={22} />
                </label>
              </div>
            )}
          </div>
          {openCrop && (
            <div className="fixed w-[50%] h-[70vh] left-[50%] top-[50%] translate-[-50%] z-9999 flex flex-col rounded-t-md overflow-hidden justify-center">
              {/* 헤더 */}
              <div className="z-20 py-3 flex items-center justify-end px-3 bg-white rounded-t-sm border-[#dbdbdb] border">
                <X color="#b3b3b3" className="cursor-pointer" size={28} onClick={() => setOpenCrop(false)} />
              </div>
              <div className="crop-bg flex overflow-hidden justify-center">
                <ReactCrop
                  className=""
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  onComplete={(c) => {
                    setCompletedCrop(c);
                  }}
                  aspect={89 / 179}
                  ruleOfThirds
                >
                  <img
                    src={previewImage}
                    className="w-full h-full object-contain"
                    ref={imgRef}
                    crossOrigin="anonymous"
                    onLoad={(e) => {
                      if (crop?.width && crop?.height) return;

                      const rect = e.currentTarget.getBoundingClientRect();
                      const cropWidth = rect.height * 0.5;
                      const cropHeight = rect.height;

                      setCrop({
                        unit: "px",
                        width: cropWidth,
                        height: cropHeight,
                        x: Math.round((rect.width - cropWidth) / 2),
                        y: Math.round((rect.height - cropHeight) / 2)
                      });
                    }}
                  />
                </ReactCrop>
              </div>
              {/* 푸터 */}
              <div className="z-20 py-3 flex items-center justify-end px-4 bg-white rounded-b-sm border-[#dbdbdb] border">
                <button onClick={handleCropConfirm} className="bg-[#D4C6B7] text-[13px] cursor-pointer py-1 px-2 rounded-sm text-white">
                  확인
                </button>
              </div>
            </div>
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
          <Image src={ImageAddBtnIcon} alt="이미지추가버튼" className="cursor-pointer" />
        </label>
      )}
    </div>
  );
};

export default ImageAddButton;
