import React from "react";
import InvitationMessage from "@/app/(routes)/invitation/components/preview/InvitationMessage";
import LocationInfo from "@/app/(routes)/invitation/components/preview/LocationInfo";
import MainImage from "@/app/(routes)/invitation/components/preview/mainImage/MainImage";
import WeddingDay from "@/app/(routes)/invitation/components/preview/WeddingDay";
import CoupleIntro from "@/app/(routes)/invitation/components/preview/CoupleIntro";
import ParentsInfo from "@/app/(routes)/invitation/components/preview/ParentsIntro";
import Gallery from "@/app/(routes)/invitation/components/preview/Gallery";
import AccountInfo from "@/app/(routes)/invitation/components/preview/AccountInfo";

export const previewComponents: Record<string, React.FC> = {
  main: MainImage,
  invitationMessage: InvitationMessage,
  weddingInfo: null,
  coupleIntro: CoupleIntro,
  parentsIntro: ParentsInfo,
  gallery: Gallery,
  accountInfo: AccountInfo,
  locationInfo: LocationInfo,
  loadingScreen: null,
  shareLink: null,
  flipbook: null,
};
