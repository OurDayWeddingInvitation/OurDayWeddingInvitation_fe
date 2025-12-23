import React from "react";
import ImageAddButton from "@/app/components/ImageAddButton";
import { useImageUpload } from "@/app/lib/hooks/useImageUpload";
import { useWeddingIdStore } from "@/app/store/useWeddingIdStore";
import { deleteImage } from "@/app/lib/utils/api";
import ImageAddBtnIcon from "@/app/assets/images/image-add-btn.svg";
import Image from "next/image";

const GallerySection = () => {
  const { weddingId } = useWeddingIdStore();
  const gallery = useImageUpload({
    kind: "gallery",
    maxCount: 50
  });

  const inputStyle = "outline-0 flex-1 border-[#E0E0E0] border placeholder:text-center rounded-sm text-sm py-1.5 px-1";

  const handleImageRemove = async (idx) => {
    gallery.handleImageRemove(idx);

    await deleteImage({
      weddingId: weddingId
      // mediaId: mainImageInfo.mediaId
    });
  };

  return (
    <div>
      <div className="flex flex-col gap-2.5 w-full">
        <div className="flex flex-wrap items-center">
          <div className="w-1/6 min-w-[50px]">제목</div>
          <input type="text" placeholder="우리의 소중한 순간" className={`${inputStyle} min-w-20 max-w-[230px]`} id="galleryTitle" />
        </div>
        <div>
          <div className="w-1/6 min-w-[50px] pb-1.5">갤러리</div>
          <p className="pb-5 text-[#CACACA]">최대 50장까지 업로드 할 수 있습니다.</p>
          <div className="border-[#D9D9D9] border rounded-[10px] w-full p-4 mb-5 grid grid-cols-5 gap-5 min-h-[295px]">
            {gallery.previews.map((item, idx) => (
              <ImageAddButton
                key={item.preview}
                previewImage={item.preview}
                loading={item.loading}
                opacity={item.opacity}
                id={`gallery-${idx}`}
                onImageRemove={() => handleImageRemove(idx)}
              />
            ))}
            <label htmlFor="galleryInput" className="w-[124px] h-[124px] cursor-pointer">
              <Image src={ImageAddBtnIcon} alt="추가" />
            </label>
            <input
              id="galleryInput"
              type="file"
              accept="image/*"
              className="hidden"
              multiple
              onChange={(e) => {
                gallery.handleMultipleUpload(e.target.files);
                // 같은 파일 선택 가능
                e.target.value = "";
              }}
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
