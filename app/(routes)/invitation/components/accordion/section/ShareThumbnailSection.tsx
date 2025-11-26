import React, { useRef, useState } from "react";
import ImageAddButton from "@/app/components/ImageAddButton";
import Image from "next/image";
import KaKaoPreview from "@/app/assets/images/thumbnail.svg";
import LinkPreview from "@/app/assets/images/thumbnail.svg";
import { CircleX } from "lucide-react";
import { usePreviewModalStore } from "@/app/store/usePreviewModalStore";

const ShareThumbnailSection = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [opacity, setOpacity] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const shareThumbnailInfo = [
    { title: "카카오톡 공유 썸네일", info: "카카오톡으로 공유시 보이는 대표 사진입니다. (세로 사이즈 권장)", previewImage: KaKaoPreview },
    { title: "링크 공유 썸네일", info: "URL 주소로 공유시 보이는 대표 사진입니다. (가로 사이즈 권장)", previewImage: LinkPreview }
  ];

  const { openIndex, openModal, closeModal } = usePreviewModalStore();

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    const imageUrl = URL.createObjectURL(file);

    if (!file) return;

    setPreviewImage(imageUrl);
    setLoading(true);
    setOpacity(0.5);

    setTimeout(() => {
      setLoading(false);
      setOpacity(1);
    }, 2000);
  };

  const handleImageRemove = () => {
    setPreviewImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      {shareThumbnailInfo.map((share, idx) => (
        <div key={idx}>
          <div className="pt-8">
            <div className="flex gap-2 items-center">
              <div className="text-[15px]">{share.title}</div>
              <button
                className="border-[#D4C6B7] border text-[10px] px-2.5 py-1 rounded-sm cursor-pointer"
                onClick={() => {
                  openModal(idx);
                }}
              >
                미리 보기
              </button>
            </div>
            <p className="text-[12px] text-[#CACACA] leading-6.5 pb-8">{share.info}</p>
            <input type="file" id={`openImg${idx}`} accept="image/*" onChange={handleImageUpload} className="hidden" ref={fileInputRef} />
            <ImageAddButton
              previewImage={previewImage}
              loading={loading}
              opacity={opacity}
              handleImageRemove={handleImageRemove}
              id={`openImg${idx}`}
            />
          </div>

          <div className={`${idx === openIndex ? "block" : "hidden"} fixed h-full left-0 top-0 bg-[#433f3b80] z-9999 w-full`}>
            <div className="z-99999 absolute left-[50%] top-[50%] translate-[-50%]">
              <CircleX className="float-right mb-1.5 cursor-pointer" color="#5F5F5F" size={28} onClick={closeModal} />
              <div>
                <Image src={KaKaoPreview} alt="미리보기" className="w-full" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShareThumbnailSection;
