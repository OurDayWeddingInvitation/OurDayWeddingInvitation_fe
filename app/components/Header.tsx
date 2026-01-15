"use client";

import Image from "next/image";
import SaveTemporaryIcon from "../assets/images/save-temporary.png";
import { loadingStore } from "../store/useLoadingStore";
import Spinner from "@/app/assets/images/loader.svg";
import { FadeSpinner } from "./common/Spinner";

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
          <div className="font-black text-3xl">OurDay</div>
          {showSaveText && (
            <div className="flex items-center gap-2">
              {loadingState ? (
                <>
                  <div className="h-6 w-6">
                    <FadeSpinner />
                  </div>
                  <div className="text-sm text-[#CACACA]">임시저장중</div>
                </>
              ) : (
                <>
                  <Image
                    key="save-done"
                    src={SaveTemporaryIcon}
                    alt="임시저장 완료"
                    className="h-6 w-6 animate-[save-pop_0.5s_ease-out]"
                  />
                  <div className="text-sm text-[#CACACA]">임시저장 완료</div>
                </>
              )}
            </div>
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
