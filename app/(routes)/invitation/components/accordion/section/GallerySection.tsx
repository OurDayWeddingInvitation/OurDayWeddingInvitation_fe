import React from "react";
import ImageAddButton from "@/app/components/ImageAddButton";
import { useImageUpload } from "@/app/lib/hooks/useImageUpload";

const GallerySection = () => {
  const thumbnail = useImageUpload("");
  const fieldGroup = "flex flex-col gap-2.5 w-full";
  const fieldStyle = "flex flex-wrap items-center";
  const inputStyle = "outline-0 flex-1 border-[#E0E0E0] border placeholder:text-center rounded-sm text-sm py-1.5 px-1";
  return (
    <div>
      <div className={fieldGroup}>
        <div className={fieldStyle}>
          <div className="w-1/6 min-w-[50px]">제목</div>
          <input type="text" placeholder="우리의 소중한 순간" className={`${inputStyle} min-w-20 max-w-[230px]`} id="galleryTitle" />
        </div>
        <div>
          <div className="w-1/6 min-w-[50px] pb-1.5">갤러리</div>
          <p className="pb-5 text-[#CACACA]">최대 50장까지 업로드 할 수 있습니다.</p>
          <div className="border-[#D9D9D9] border rounded-[10px] w-full h-[291px] p-4 mb-5">
            <input
              type="file"
              id="openImg"
              accept="image/*"
              onChange={(e) => thumbnail.handleImageUpload(e.target.files?.[0] ?? null)}
              className="hidden"
            />
            {/* <ImageAddButton previewImage={thumbnail} /> */}
          </div>
          <div className="border-[#E0E0E0] border-t w-full"></div>
          <ul className="text-[12px] text-[#CACACA] flex flex-col gap-3 pt-5 list-disc list-inside ">
            <li>사진은 1장당 최대 30MB까지 업로드 가능합니다.</li>
            <li>사진이 9장 이상인 경우 더보기 버튼이 보여집니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
