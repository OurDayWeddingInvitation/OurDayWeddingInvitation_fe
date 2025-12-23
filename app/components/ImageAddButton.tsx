import React, { useState } from "react";
import ImageAddBtnIcon from "@/app/assets/images/image-add-btn.svg";
import Image from "next/image";
import LoadingImg from "@/app/assets/images/preview-image-transparent.png";
import { DotLoader } from "react-spinners";
import { Check, CircleX, Pencil, X } from "lucide-react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../lib/utils/cropImage";
import { Area } from "react-easy-crop";

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
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1.2);
  const [openCrop, setOpenCrop] = useState<boolean>(false);
  const [croppedPreview, setCroppedPreview] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropConfirm = async () => {
    if (!croppedAreaPixels) return;

    const blob = await getCroppedImg(previewImage, croppedAreaPixels);
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
            <div className="fixed w-[50%] h-[70%] left-[50%] top-[50%] translate-[-50%] z-9999 flex flex-col rounded-t-md overflow-hidden">
              <div className="absolute inset-0 z-10">
                <Cropper
                  image={previewImage}
                  crop={crop}
                  zoom={zoom}
                  aspect={316 / 716}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  showGrid={true}
                />
              </div>
              <div className="absolute top-0 left-0 right-0 z-20 h-14 flex items-center justify-end px-3 bg-white rounded-t-sm border-[#dbdbdb] border">
                <X color="#b3b3b3" className="cursor-pointer" size={28} onClick={() => setOpenCrop(false)} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 z-20 h-14 flex items-center justify-end px-4 bg-white rounded-b-sm border-[#dbdbdb] border">
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
