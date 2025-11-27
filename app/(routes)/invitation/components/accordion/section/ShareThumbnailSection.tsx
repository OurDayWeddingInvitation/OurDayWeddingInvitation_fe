import React from "react";
import ImageAddButton from "@/app/components/ImageAddButton";
import { CircleX } from "lucide-react";
import { usePreviewModalStore } from "@/app/store/usePreviewModalStore";
import { useImageUpload } from "@/app/lib/hooks/useImageUpload";
import PreviewThumbnail from "@/app/components/PreviewThumbnail";

const ShareThumbnailSection = () => {
  const kakao = useImageUpload();
  const link = useImageUpload();
  const { openIndex, openModal, closeModal } = usePreviewModalStore();

  const shareThumbnailInfo = [
    { title: "카카오톡 공유 썸네일", info: "카카오톡으로 공유 시 보이는 대표 사진입니다. (세로 사이즈 권장)" },
    { title: "링크 공유 썸네일", info: "URL 주소로 공유 시 보이는 대표 사진입니다. (가로 사이즈 권장)" }
  ];

  return (
    <div>
      {shareThumbnailInfo.map((share, idx) => {
        const thumbnail = idx === 0 ? kakao : link;
        return (
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
              <input
                type="file"
                id={`openImg${idx}`}
                accept="image/*"
                onChange={(e) => thumbnail.handleImageUpload(e.target.files?.[0] ?? null)}
                className="hidden"
                ref={thumbnail.inputRef}
              />
              <ImageAddButton
                previewImage={thumbnail.preview}
                loading={thumbnail.loading}
                opacity={thumbnail.opacity}
                handleImageRemove={thumbnail.handleImageRemove}
                id={`openImg${idx}`}
              />
            </div>

            <div className={`${idx === openIndex ? "block" : "hidden"} fixed h-full left-0 top-0 bg-[#433f3b80] z-9999 w-full`}>
              <div className="z-99999 absolute left-[50%] top-[50%] translate-[-50%]">
                <CircleX className="float-right mb-1.5 cursor-pointer absolute right-0 -top-8" color="#5F5F5F" size={28} onClick={closeModal} />
                {/* 미리보기 창 */}
                <PreviewThumbnail thumbnail={thumbnail.preview} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShareThumbnailSection;
