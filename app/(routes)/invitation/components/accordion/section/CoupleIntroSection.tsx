import TextEditor from "@/app/components/editor/TextEditor";
import ImageAddButton from "@/app/components/ImageAddButton";
import { useImageUpload } from "@/app/lib/hooks/useImageUpload";
import React from "react";

const CoupleIntroSection = () => {
  const fieldGroup = "flex flex-col gap-2.5 w-full";
  const fieldStyle = "flex flex-wrap items-center";
  const inputStyle = "outline-0 flex-1 border-[#E0E0E0] border placeholder:text-center rounded-sm text-sm py-1.5 px-1";
  const couple = ["신랑", "신부"];
  const groom = useImageUpload("");
  const bride = useImageUpload("");

  return (
    <div>
      <div className={fieldGroup}>
        <div className={fieldStyle}>
          <div className="w-1/6 min-w-[50px]">제목</div>
          <input type="text" placeholder="제목을 작성 해주세요.(공백포함 15자 이내)" className={`${inputStyle} min-w-20 max-w-[275px]`} id="" />
        </div>
        {couple.map((item, idx) => {
          const thumbnail = idx === 0 ? groom : bride;
          return (
            <div key={idx}>
              <div>
                <div className="w-1/6 min-w-[50px] pb-1.5">{item}님 사진</div>
                <p className="text-[12px] text-[#CACACA] pb-7">사진은 최대 30MB까지 업로드 가능합니다.</p>
                <input
                  type="file"
                  id={`coupleImg${idx}`}
                  accept="image/*"
                  onChange={(e) => thumbnail.handleImageUpload(e.target.files?.[0] ?? null)}
                  className="hidden"
                />
                <ImageAddButton
                  previewImage={thumbnail.preview}
                  loading={thumbnail.loading}
                  opacity={thumbnail.opacity}
                  onImageRemove={thumbnail.handleImageRemove}
                  id={`coupleImg${idx}`}
                />
              </div>
              <div className="py-8">
                <div className="w-1/6 min-w-[50px] pb-6">{item}님 소개글</div>
                <TextEditor />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CoupleIntroSection;
