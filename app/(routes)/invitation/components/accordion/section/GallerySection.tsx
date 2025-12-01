import React from "react";

const GallerySection = () => {
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
        <div className={fieldStyle}>
          <div className="w-1/6 min-w-[50px]">갤러리</div>
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
