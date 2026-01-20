"use client";

import { InvitationDetail } from "@/app/lib/fetches/invitation/type";
import { ImageDetail } from "@/app/lib/fetches/media/type";
import { useAccountInfoStoreTest } from "@/app/store/useAccountInfoStoreTest";
import { useGalleryStore } from "@/app/store/useGalleryStore";
import { useInvitationMessageStore } from "@/app/store/useInvitationMessageStore";
import { useLoadingScreenStore } from "@/app/store/useLoadingScreenStore";
import { useLocationInfoStore } from "@/app/store/useLocationInfoStore";
import { useMainImageStore } from "@/app/store/useMainImageStore";
import { useThemeFontStore } from "@/app/store/useThemeFontStore";
import { useWeddingIdStore } from "@/app/store/useWeddingIdStore";
import { useWeddingInfoStore } from "@/app/store/useWeddingInfoStore";
import { useEffect } from "react";
import Preview from "../../invitation/components/preview/preview";
import { useMenuSettingStore } from "@/app/store/useMenuSettingInfoStore";

export default function LinkView({
  weddingId,
  invitationDetail,
  imageDetail,
}: {
  weddingId: string;
  invitationDetail: InvitationDetail;
  imageDetail: ImageDetail;
}) {
  const setWeddingId = useWeddingIdStore((s) => s.setWeddingId);
  const setWeddingInfo = useWeddingInfoStore((s) => s.setWeddingInfo);
  const setMainImageInfo = useMainImageStore((s) => s.setMainImageInfo);
  const setMainStyleKind = useMainImageStore((s) => s.setMainStyleKind);
  const setAccountInfo = useAccountInfoStoreTest((s) => s.setAccountInfo);
  const setInvitationInfo = useInvitationMessageStore(
    (s) => s.setInvitationMessage,
  );
  const setThemeFont = useThemeFontStore((s) => s.setThemeFont);
  const setLocationInfo = useLocationInfoStore((s) => s.setLocationInfo);
  const setGalleryInfo = useGalleryStore((s) => s.setGalleryInfo);
  const setGalleryImages = useGalleryStore((s) => s.setGalleryImages);
  const setLoadingScreenStyle = useLoadingScreenStore(
    (s) => s.setLoadingScreenStyle,
  );

  const setMenuSetting = useMenuSettingStore((s) => s.setMenuSetting);

  useEffect(() => {
    setWeddingId(weddingId ?? null);
    setWeddingInfo(invitationDetail?.sections?.weddingInfo ?? null);
    setMainStyleKind(invitationDetail?.sections?.main.posterStyle ?? null);
    setAccountInfo(invitationDetail?.sections?.accountInfo ?? null);
    setInvitationInfo(invitationDetail?.sections?.invitationMessage ?? null);
    setThemeFont(invitationDetail?.sections?.themeFont ?? null);
    setLocationInfo(invitationDetail?.sections?.locationInfo ?? null);
    setGalleryInfo(invitationDetail?.sections?.gallery ?? null);
    setLoadingScreenStyle(invitationDetail?.sections?.loadingScreen ?? null);
    setMenuSetting(invitationDetail.sectionSettings ?? null);
  }, [
    invitationDetail,
    setAccountInfo,
    setGalleryInfo,
    setInvitationInfo,
    setLoadingScreenStyle,
    setLocationInfo,
    setMainStyleKind,
    setMenuSetting,
    setThemeFont,
    setWeddingId,
    setWeddingInfo,
    weddingId,
  ]);

  useEffect(() => {
    // imageType 별로 필요한 값 저장
    if (imageDetail?.length > 0) {
      const mainImage = imageDetail
        .filter((img) => img.imageType === "mainImage")
        .at(-1);

      const galleryImage = imageDetail.filter(
        (img) => img.imageType === "galleryImage",
      );

      // 메인 이미지
      if (mainImage) {
        setMainImageInfo(mainImage);
      }

      // 갤러리 이미지
      if (galleryImage) {
        setGalleryImages(galleryImage);
      }
    }
  }, [imageDetail, setGalleryImages, setMainImageInfo]);

  return (
    <>
      <div className="max-w-[1200px] flex mx-auto justify-center">
        <Preview isLink={true} />
      </div>
    </>
  );
}
