"use client";

import ToggleImg from "@/app/assets/images/toggle-icon.svg";
import Header from "@/app/components/Header";
import { InvitationDetail } from "@/app/lib/fetches/invitation/type";
import { ImageDetail } from "@/app/lib/fetches/media/type";
import { useAccountInfoStoreTest } from "@/app/store/useAccountInfoStoreTest";
import { useCoupleIntroStore } from "@/app/store/useCoupleIntroStore";
import { useGalleryStore } from "@/app/store/useGalleryStore";
import { useInvitationMessageStore } from "@/app/store/useInvitationMessageStore";
import { useLoadingScreenStore } from "@/app/store/useLoadingScreenStore";
import { useLocationInfoStore } from "@/app/store/useLocationInfoStore";
import { useMainImageStore } from "@/app/store/useMainImageStore";
import { useParentsIntroStore } from "@/app/store/useParentsIntroStore";
import { useShareThumbnailStore } from "@/app/store/useShareThumbnailStore";
import { useThemeFontStore } from "@/app/store/useThemeFontStore";
import { useWeddingIdStore } from "@/app/store/useWeddingIdStore";
import { useWeddingInfoStore } from "@/app/store/useWeddingInfoStore";
import Image from "next/image";
import { useEffect } from "react";
import Form from "../components/form/Form";
import Preview from "../components/preview/preview";
import { useMenuSettingStore } from "@/app/store/useMenuSettingInfoStore";
import { useWeddingTitleStore } from "@/app/store/useWeddingTitleStore";

export default function InvitationView({
  weddingId,
  invitationDetail,
  imageDetail,
}: {
  weddingId: string;
  invitationDetail: InvitationDetail;
  imageDetail: ImageDetail;
}) {
  const setWeddingId = useWeddingIdStore((s) => s.setWeddingId);
  const setWeddingInfoTitle = useWeddingTitleStore(
    (s) => s.setWeddingInfoTitle,
  );
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
  const setParentsIntroInfo = useParentsIntroStore(
    (s) => s.setParentsIntroInfo,
  );
  const setParentsImageInfo = useParentsIntroStore(
    (s) => s.setParentsImageInfo,
  );
  const setCoupleIntroInfo = useCoupleIntroStore((s) => s.setCoupleIntroInfo);
  const setCoupleImageInfo = useCoupleIntroStore((s) => s.setCoupleImageInfo);
  const setShareThumbnailInfo = useShareThumbnailStore(
    (s) => s.setShareThumbnailInfo,
  );
  const setMenuSetting = useMenuSettingStore((s) => s.setMenuSetting);

  useEffect(() => {
    if (weddingId) {
      setWeddingId(weddingId);
    }
    if (invitationDetail?.weddingTitle) {
      setWeddingInfoTitle(invitationDetail?.weddingTitle);
    }
    if (invitationDetail?.sections?.weddingInfo) {
      setWeddingInfo(invitationDetail?.sections?.weddingInfo);
    }
    if (invitationDetail?.sections?.main) {
      setMainStyleKind(invitationDetail?.sections?.main.posterStyle);
    }
    if (invitationDetail?.sections?.accountInfo) {
      setAccountInfo(invitationDetail?.sections?.accountInfo);
    }
    if (invitationDetail?.sections?.invitationMessage) {
      setInvitationInfo(invitationDetail?.sections?.invitationMessage);
    }
    if (invitationDetail?.sections?.themeFont) {
      setThemeFont(invitationDetail?.sections?.themeFont);
    }
    if (invitationDetail?.sections?.locationInfo) {
      setLocationInfo(invitationDetail?.sections?.locationInfo);
    }
    if (invitationDetail?.sections?.gallery) {
      setGalleryInfo(invitationDetail?.sections?.gallery);
    }
    if (invitationDetail?.sections?.loadingScreen) {
      setLoadingScreenStyle(invitationDetail?.sections?.loadingScreen);
    }
    if (invitationDetail?.sections?.parentsIntro) {
      setParentsIntroInfo(invitationDetail?.sections?.parentsIntro);
    }
    if (invitationDetail?.sections?.coupleIntro) {
      setCoupleIntroInfo(invitationDetail?.sections?.coupleIntro);
    }
    if (invitationDetail.sectionSettings) {
      setMenuSetting(invitationDetail.sectionSettings);
    }
  }, [invitationDetail]);

  useEffect(() => {
    // imageType 별로 필요한 값 저장
    if (imageDetail?.length > 0) {
      const mainImage = imageDetail
        .filter((img) => img.imageType === "mainImage")
        .at(-1);
      const galleryImage = imageDetail.filter(
        (img) => img.imageType === "galleryImage",
      );
      const groomParentsImage = imageDetail.find(
        (img) => img.imageType === "groomParentsImage",
      );
      const brideParentsImage = imageDetail.find(
        (img) => img.imageType === "brideParentsImage",
      );
      const groomImage = imageDetail.find(
        (img) => img.imageType === "groomImage",
      );
      const brideImage = imageDetail.find(
        (img) => img.imageType === "brideImage",
      );
      const kakaoImage = imageDetail.find(
        (img) => img.imageType === "kakaoThumbnailImage",
      );
      const linkImage = imageDetail.find(
        (img) => img.imageType === "linkThumbnailImage",
      );

      // 메인 이미지
      if (mainImage) {
        setMainImageInfo(mainImage);
      }
      // 갤러리 이미지
      if (galleryImage) {
        setGalleryImages(galleryImage);
      }
      // 부모님 이미지
      setParentsImageInfo({
        groomParentsImage: groomParentsImage,
        brideParentsImage: brideParentsImage,
      });
      // 신랑 신부 이미지
      setCoupleImageInfo({
        groomImage: groomImage,
        brideImage: brideImage,
      });
      // 공유 썸네일 이미지
      setShareThumbnailInfo({
        kakaoThumbnailImage: kakaoImage,
        linkThumbnailImage: linkImage,
      });
    }
  }, [imageDetail]);

  return (
    <>
      <Header showButton={true} showSaveText={true} showTitle={true} />
      <div className="max-w-300 pt-20 flex mx-auto gap-8.5 relative h-screen overflow-hidden">
        <div
          className="max-w-100 overflow-y-scroll [&::-webkit-scrollbar]:hidden w-full pb-14.5"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <Preview />
          <ul className="text-[#817E7C] text-[14px] pt-5 list-disc list-outside pl-5">
            <li>
              미리보기는 단순 참고용으로, 정확한 시안은 적용하기 버튼을 눌러
              저장 후 확인해주세요.
            </li>
          </ul>
        </div>
        <div
          className="max-w-[736px] w-full pb-14.5 overflow-y-scroll [&::-webkit-scrollbar]:hidden"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <ul className="text-[#817E7C] text-[14px] px-4 list-disc list-inside w-full">
            <li>
              <span className="bg-[#FFFFFF] rounded-[5px] p-0.5">⠿</span>
              &nbsp;모양이 있는 메뉴는 드래그하여 순서를 변경할 수 있습니다.
            </li>
            <li>
              <Image
                src={ToggleImg}
                alt="토글버튼 아이콘"
                className="inline-block align-middle"
              />
              <span className="align-middle">
                &nbsp;버튼으로 각 메뉴의 사용 여부를 설정할 수 있습니다.
              </span>
            </li>
          </ul>
          <Form />
        </div>
      </div>
    </>
  );
}
