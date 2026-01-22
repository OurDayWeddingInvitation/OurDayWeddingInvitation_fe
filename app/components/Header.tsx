"use client";

import { Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import logoImage from "../assets/images/logo.png";
import SaveTemporaryIcon from "../assets/images/save-temporary.png";
import { clientFetchApi } from "../lib/fetches/client";
import { useAccountInfoStoreTest } from "../store/useAccountInfoStoreTest";
import { useCoupleIntroStore } from "../store/useCoupleIntroStore";
import { useGalleryStore } from "../store/useGalleryStore";
import { useInvitationMessageStore } from "../store/useInvitationMessageStore";
import { useLoadingScreenStore } from "../store/useLoadingScreenStore";
import { loadingStore } from "../store/useLoadingStore";
import { useLocationInfoStore } from "../store/useLocationInfoStore";
import { useMainImageStore } from "../store/useMainImageStore";
import { useMenuSettingStore } from "../store/useMenuSettingInfoStore";
import { useParentsIntroStore } from "../store/useParentsIntroStore";
import { useThemeFontStore } from "../store/useThemeFontStore";
import { useWeddingIdStore } from "../store/useWeddingIdStore";
import { useWeddingInfoStore } from "../store/useWeddingInfoStore";
import { useWeddingTitleStore } from "../store/useWeddingTitleStore";
import { FadeSpinner } from "./common/Spinner";

type Props = {
  showTitle?: boolean;
  showButton?: boolean;
  showSaveText?: boolean;
  showLogout?: boolean;
};

export default function Header({
  showTitle = false,
  showButton = false,
  showSaveText = false,
  showLogout = false,
}: Props) {
  const router = useRouter();

  const loadingState = loadingStore((s) => s.loading);
  const loadingStateUpdate = loadingStore((s) => s.updateLoading);
  const [isEditing, setIsEditing] = useState(false);
  const weddingId = useWeddingIdStore((s) => s.weddingId);
  const weddingInfoTitle = useWeddingTitleStore((s) => s.weddingInfoTitle);
  const setWeddingTitle = useWeddingTitleStore((s) => s.setWeddingInfoTitle);
  const mainStyleKind = useMainImageStore.getState().mainStyleKind;
  const weddingInfo = useWeddingInfoStore.getState().weddingInfo;
  const invitationInfo = useInvitationMessageStore.getState().invitationMessage;
  const coupleIntroInfo = useCoupleIntroStore.getState().coupleIntroInfo;
  const parentsIntroInfo = useParentsIntroStore.getState().parentsIntroInfo;
  const accountInfo = useAccountInfoStoreTest.getState().accountInfo;
  const locationInfo = useLocationInfoStore.getState().locationInfo;
  const themeFont = useThemeFontStore.getState().themeFont;
  const loadingScreen = useLoadingScreenStore.getState().loadingScreenStyle;
  const galleryInfo = useGalleryStore.getState().galleryInfo;
  const menuSettingInfo = useMenuSettingStore.getState().menuSetting;

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

  const handleSaveButton = async () => {
    await clientFetchApi({
      endPoint: `/weddings/apply`,
      method: "POST",
      body: {
        weddingId,
      },
    });
  };

  const handleLogout = async () => {
    await clientFetchApi({
      endPoint: `/auth/logout`,
      method: "POST",
    });

    router.push("/login");
  };

  const handleTempSave = async () => {
    if (loadingState) return;

    try {
      loadingStateUpdate(true);

      const requestBody = {
        sections: {
          main: mainStyleKind,
          weddingInfo: weddingInfo,
          invitationMessage: invitationInfo,
          coupleIntro: coupleIntroInfo,
          parentsIntro: parentsIntroInfo,
          accountInfo: accountInfo,
          locationInfo: locationInfo,
          themeFont: themeFont,
          loadingScreen: loadingScreen,
          galleryInfo: galleryInfo,
          menuSetting: menuSettingInfo,
        },
      };

      await clientFetchApi({
        endPoint: `/weddings/${weddingId}`,
        method: "PUT",
        body: requestBody,
      });

      setTimeout(() => {
        loadingStateUpdate(false);
      }, 1000);
    } catch (error) {
      console.error("임시 저장 중 오류 발생");
    } finally {
      loadingStateUpdate(false);
    }
  };

  return (
    <header className="bg-[#FFFFFF] h-17.5 fixed w-full z-9999 border-b-[#CACACA] border-b">
      <div className="max-w-[1200px] flex justify-between items-center m-auto px-2.5 h-full">
        <div className="flex gap-3 items-center">
          {/* 로고 */}
          <Link href="/dashboard">
            <Image src={logoImage} className="w-[7.063rem] h-12.5" alt="로고" />
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
                <>
                  <input
                    autoFocus
                    value={weddingInfoTitle}
                    onChange={(e) => setWeddingTitle(e.target.value)}
                    onBlur={handleSave}
                    size={40}
                    maxLength={20}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSave();
                      }
                    }}
                    className="font-medium text-center border-b border-gray-300 focus:outline-none"
                  />
                </>
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
            <button
              className="text-sm w-25 h-9 text-[#FFFFFF] bg-[#CACACA] rounded-lg  cursor-pointer shadow-[2px_4px_6px_rgba(0,0,0,0.08)]"
              onClick={handleTempSave}
            >
              임시 저장
            </button>
            <button
              className="font-medium text-sm w-25 h-9 text-[#FFFFFF] bg-[#D4C6B7] rounded-lg  cursor-pointer shadow-[2px_4px_6px_rgba(0,0,0,0.08)]"
              onClick={() => handleSaveButton()}
            >
              적용 하기
            </button>
            <button
              className="font-medium text-sm w-25 h-9 border-[#D4C6B7] border rounded-lg cursor-pointer shadow-[2px_4px_6px_rgba(0,0,0,0.08)]"
              onClick={() => {
                window.open(
                  `/link/${weddingId}`,
                  "_blank",
                  "noopener,noreferrer"
                );
              }}
            >
              링크 보기
            </button>
          </div>
        )}

        {showLogout && (
          <button
            className="text-sm font-medium text-black font-[Escoredream] cursor-pointer"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        )}
      </div>
    </header>
  );
}
