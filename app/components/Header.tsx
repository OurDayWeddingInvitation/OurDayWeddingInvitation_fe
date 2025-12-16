"use client";

import Image from "next/image";
import SaveTemporaryIcon from "../assets/images/save-temporary.png";
import { loadingStore } from "../store/useLoadingStore";

type Props = {
  showTitle?: boolean;
  showButton?: boolean;
  showSaveText?: boolean;
};

export default function Header({
  showTitle = false,
  showButton = false,
  showSaveText = false,
}: Props) {
  const loadingState = loadingStore((s) => s.loading);

  return (
    <header className="bg-[#FFFFFF] h-17.5 fixed w-full z-9999">
      <div className="max-w-[1200px] flex justify-between items-center m-auto px-2.5 h-full">
        <div className="flex gap-3 items-center">
          {/* 로고 */}
          <div className="font-black text-3xl">OurDay</div>
          {showSaveText && (
            <>
              <Image
                src={SaveTemporaryIcon}
                alt="임시저장아이콘"
                className="h-full"
              />
              <div className="text-[#CACACA]">
                {loadingState ? "임시저장중" : "임시저장 완료"}
              </div>
            </>
          )}
        </div>

        {/* 청첩장 제목 */}
        {showTitle && <div className="font-medium text-xl">나영의 청첩장</div>}

        {/* 버튼 */}
        {showButton && (
          <div className="flex gap-3">
            <button className="font-medium text-sm w-25 h-9 text-[#FFFFFF] bg-[#D4C6B7] rounded-lg  cursor-pointer shadow-[2px_4px_6px_rgba(0,0,0,0.08)]">
              적용 하기
            </button>
            <button className="font-medium text-sm w-25 h-9 border-[#D4C6B7] border rounded-lg cursor-pointer shadow-[2px_4px_6px_rgba(0,0,0,0.08)]">
              링크 보기
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
