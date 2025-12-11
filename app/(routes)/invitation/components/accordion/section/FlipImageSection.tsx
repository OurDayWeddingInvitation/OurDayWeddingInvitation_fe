import ColorPickerButton from "@/app/components/ColorPickerButton";
import React, { useEffect, useRef, useState } from "react";

const FlipImageSection = () => {
  const inputStyle = "outline-0 flex-1 border-[#E0E0E0] border rounded-sm text-sm py-1.5 px-1 ";
  const titlePickerRef = useRef<HTMLButtonElement | null>(null);
  const contentPickerRef = useRef<HTMLButtonElement | null>(null);
  const [titleColor, setTitleColor] = useState<string>("#000");
  const [contentColor, setContentColor] = useState<string>("#000");
  const [titlePickerOpen, setTitlePickerOpen] = useState<boolean>(false);
  const [contentPickerOpen, setContentPickerOpen] = useState<boolean>(false);

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (titlePickerRef.current && !titlePickerRef.current.contains(e.target as Node)) {
        setTitlePickerOpen(false);
      }
      if (contentPickerRef.current && !contentPickerRef.current.contains(e.target as Node)) {
        setContentPickerOpen(false);
      }
    };
    document.addEventListener("click", clickOutside);
    return () => document.removeEventListener("click", clickOutside);
  }, []);

  const clickTitlePicker = () => {
    setTitlePickerOpen(true);
  };

  const clickContentPicker = () => {
    setContentPickerOpen(true);
  };

  return (
    <div>
      <div className="flex flex-col gap-2.5">
        <div className="flex flex-wrap items-center">
          <div className="w-1/6 min-w-[50px]">제목</div>
          <div className="flex gap-2">
            <input type="text" className={`${inputStyle} max-w-[275px]`} defaultValue={"Our Love Moment"} />
            <div>
              <ColorPickerButton
                color="conic-gradient(#ff6363, orange, #efef2b, #52f252, #3333d7, #9f44e2, violet, #f15353)"
                buttonRef={titlePickerRef}
                isPickerOpen={titlePickerOpen}
                currentColor={titleColor}
                setCurrentColor={setTitleColor}
                onClick={clickTitlePicker}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center pb-3">
          <div className="w-1/6 min-w-[50px]">소개글</div>
          <div className="flex gap-2 flex-1 items-end">
            <textarea
              className={`${inputStyle} m-h-[69px] resize-none max-w-[275px]`}
              defaultValue={"스크롤을 내리면 우리 두 사람의 특별한 이야기가 펼쳐져요."}
              onChange={(e) => {}}
            />
            <div>
              <ColorPickerButton
                color="conic-gradient(#ff6363, orange, #efef2b, #52f252, #3333d7, #9f44e2, violet, #f15353)"
                buttonRef={contentPickerRef}
                isPickerOpen={contentPickerOpen}
                currentColor={contentColor}
                setCurrentColor={setContentColor}
                onClick={clickContentPicker}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex gap-3 pt-[17px]">
          <h3>플립북 영상 올리기</h3>
          <button className="text-[10px] border px-2 py-1 border-[#D4C6B7] rounded-sm">업로드</button>
        </div>
        <p className="text-[12px] text-[#CACACA] pb-[17px] pt-2">영상을 올리면 자동으로 연속 사진으로 변환됩니다.(5초 이하의 짧은 영상만 가능)</p>

        <div className="border-[#D9D9D9] border rounded-[10px] w-full h-[291px] p-4 mb-5">
          <input
            type="file"
            id="openImg"
            accept="image/*"
            // onChange={(e) => thumbnail.handleImageUpload(e.target.files?.[0] ?? null)}
            className="hidden"
          />
          {/* <ImageAddButton previewImage={thumbnail} /> */}
        </div>
        <p className="text-[12px] pb-[30px] text-[#CACACA]">영상이 없을 경우 원하는 연속 사진을 직접 올려 플립북을 만들 수 있어요.</p>
        <div className="border-[#E0E0E0] border-t w-full"></div>
        <div className="text-[#CACACA] text-[12px] mt-[30px]">
          <ul className="list-disc list-inside">
            <li>플립북 이미지란?</li>
          </ul>
          <p>짧은 영상을 여러 장의 연속 사진으로 변환해, 스크롤을 내릴 때 사진이 움직이는 것처럼 보이게 하는 기능입니다.</p>
          <p>플립북 이미지를 추가해 나만의 특별한 청첩장을 완성시켜 보세요.</p>
        </div>
      </div>
    </div>
  );
};

export default FlipImageSection;
