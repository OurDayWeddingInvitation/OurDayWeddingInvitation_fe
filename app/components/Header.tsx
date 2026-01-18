"use client";

import Image from "next/image";
import SaveTemporaryIcon from "../assets/images/save-temporary.png";
import { loadingStore } from "../store/useLoadingStore";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useWeddingIdStore } from "../store/useWeddingIdStore";
import { clientFetchApi } from "../lib/fetches/client";
import Link from "next/link";
import { useWeddingTitleStore } from "../store/useWeddingTitleStore";
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
  const [isEditing, setIsEditing] = useState(false);
  const weddingId = useWeddingIdStore((s) => s.weddingId);
  const weddingInfoTitle = useWeddingTitleStore((s) => s.weddingInfoTitle);
  const setWeddingTitle = useWeddingTitleStore((s) => s.setWeddingInfoTitle);

  const handleSave = async () => {
    if (!weddingInfoTitle.trim()) {
      setIsEditing(false);
      return;
    }

    await clientFetchApi({
      endPoint: `/weddings/${weddingId}/title`,
      method: "PATCH",
      body: {
        title: weddingInfoTitle,
      },
    });

    setIsEditing(false);
  };

  return (
    <header className="bg-[#FFFFFF] h-17.5 fixed w-full z-9999 border-b-[#CACACA] border-b">
      <div className="max-w-[1200px] flex justify-between items-center m-auto px-2.5 h-full">
        <div className="flex gap-3 items-center">
          {/* 로고 */}
          <Link href="/dashboard" className="font-black text-3xl">
            OurDay
          </Link>
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
        {showTitle && (
          <div className="absolute left-[50%] transform -translate-x-1/2 flex justify-center">
            <div className="relative inline-block">
              {isEditing ? (
                <input
                  autoFocus
                  value={weddingInfoTitle}
                  onChange={(e) => setWeddingTitle(e.target.value)}
                  onBlur={handleSave}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSave();
                      setIsEditing(false);
                    }
                  }}
                  className="font-medium text-center border-b border-gray-300 focus:outline-none"
                />
              ) : (
                <>
                  {weddingInfoTitle && (
                    <div>
                      <div className="font-medium">{weddingInfoTitle}</div>
                      <Pencil
                        size={15}
                        className="absolute -top-2 -right-6 cursor-pointer opacity-70 hover:opacity-100"
                        onClick={() => setIsEditing(true)}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
        {/* 버튼 */}
        {showButton && (
          <div className="flex gap-3">
            <button className="text-sm w-25 h-9 text-[#FFFFFF] bg-[#CACACA] rounded-lg  cursor-pointer shadow-[2px_4px_6px_rgba(0,0,0,0.08)]">
              임시 저장
            </button>
            <button className="text-sm w-25 h-9 text-[#FFFFFF] bg-[#D4C6B7] rounded-lg  cursor-pointer shadow-[2px_4px_6px_rgba(0,0,0,0.08)]">
              적용 하기
            </button>
            <button className="text-sm w-25 h-9 text-[#433F3B] border-[#D4C6B7] border rounded-lg cursor-pointer shadow-[2px_4px_6px_rgba(0,0,0,0.08)]">
              링크 보기
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
