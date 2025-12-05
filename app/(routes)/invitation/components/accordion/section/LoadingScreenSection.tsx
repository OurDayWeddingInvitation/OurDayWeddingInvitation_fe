import React, { useState } from "react";
import LoadingStyle1 from "@/app/assets/images/loading1.svg";
import LoadingStyle2 from "@/app/assets/images/loading2.svg";
import Image from "next/image";
import CheckButton from "@/app/components/CheckButton";

const LoadingScreenSection = () => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const loadingStyleArr = [
    { title: "loadingStyle1", url: LoadingStyle1 },
    { title: "loadingStyle2", url: LoadingStyle2 }
  ];
  return (
    <div>
      <h3 className="text-[15px] py-3.5">로딩 스타일</h3>
      <div className="flex gap-[18px]">
        {loadingStyleArr.map((item, idx) => (
          <div key={idx} className="relative cursor-pointer">
            <Image src={item.url} alt="로딩스타일" />
            <CheckButton
              isChecked={selectedIdx === idx}
              onClick={(e: Event) => {
                e.stopPropagation();
              }}
            />
          </div>
        ))}
      </div>
      <div className="border-t border-[#E0E0E0] my-[30px]"></div>
      <ul className="text-[12px] text-[#CACACA] list-disc list-inside">
        <li>로딩 화면은 미리보기 화면에서 보이지 않습니다. 적용하기 후 링크에서 직접 확인해주세요.</li>
      </ul>
    </div>
  );
};

export default LoadingScreenSection;
