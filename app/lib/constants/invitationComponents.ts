import InvitationMessageSection from "@/app/(routes)/invitation/components/accordion/section/InvitationMessageSection";
import ColorFontSection from "@/app/(routes)/invitation/components/accordion/section/ColorFontSection";
import MainImageSection from "@/app/(routes)/invitation/components/accordion/section/MainImageSection";
import ShareThumbnailSection from "@/app/(routes)/invitation/components/accordion/section/ShareThumbnailSection";
import WeddingInfoSection from "@/app/(routes)/invitation/components/accordion/section/WeddingInfoSection";
import CoupleIntroSection from "@/app/(routes)/invitation/components/accordion/section/CoupleIntroSection";
import GallerySection from "@/app/(routes)/invitation/components/accordion/section/GallerySection";
import AccountInfoSection from "@/app/(routes)/invitation/components/accordion/section/AccountInfoSection";
import LocationInfoSection from "@/app/(routes)/invitation/components/accordion/section/LocationInfoSection";
import ParentsIntroSection from "@/app/(routes)/invitation/components/accordion/section/ParentsIntroSection";
import LoadingScreenSection from "@/app/(routes)/invitation/components/accordion/section/LoadingScreenSection";
import FlipImageSection from "@/app/(routes)/invitation/components/accordion/section/FlipImageSection";

export const sectionComponents: Record<string, React.FC> = {
  main: MainImageSection,
  weddingInfo: WeddingInfoSection,
  invitationMessage: InvitationMessageSection,
  shareLink: ShareThumbnailSection,
  themeFont: ColorFontSection,
  coupleIntro: CoupleIntroSection,
  gallery: GallerySection,
  accountInfo: AccountInfoSection,
  locationInfo: LocationInfoSection,
  parentsIntro: ParentsIntroSection,
  loadingScreen: LoadingScreenSection,
  flipbook: FlipImageSection,
};
