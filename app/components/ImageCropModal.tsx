import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { getCroppedImg } from "../lib/utils/cropImage";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "./ImageCropModal.style.css";

const ImageCropModal = ({
  open,
  setOpenCrop,
  onCropConfirm,
  previewImage,
  originalUrl,
  setCroppedPreview,
}) => {
  const [crop, setCrop] = useState<Crop>();
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

  useEffect(() => {
    if (!open) {
      setCrop(undefined);
      setCompletedCrop(null);
    }
  }, [open]);

  return (
    <div>
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] max-h-[700px] translate-[-50%] z-9999 flex flex-col rounded-t-md overflow-hidden justify-center ">
        {/* 헤더 */}
        <div className="z-20 py-3 flex items-center justify-end px-3 bg-white rounded-t-sm border-[#dbdbdb] border ">
          <X
            color="#b3b3b3"
            className="cursor-pointer"
            size={28}
            onClick={() => setOpenCrop(false)}
          />
        </div>
        <div className="crop-bg flex flex-1 overflow-hidden justify-center">
          <div className="w-[80%]">
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => {
                setCompletedCrop(c);
              }}
              aspect={89 / 179}
              ruleOfThirds
            >
              <img
                src={originalUrl}
                className="max-h-full max-w-full w-full h-full block object-cover"
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
                    y: Math.round((rect.height - cropHeight) / 2),
                  });
                }}
              />
            </ReactCrop>
          </div>
        </div>
        {/* 푸터 */}
        <div className="z-20 py-3 flex items-center justify-end px-4 bg-white rounded-b-sm border-[#dbdbdb] border">
          <button
            onClick={handleCropConfirm}
            className="bg-[#D4C6B7] text-[13px] cursor-pointer py-1 px-2 rounded-sm text-white"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropModal;
