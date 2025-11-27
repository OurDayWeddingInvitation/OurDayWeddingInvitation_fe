import InvitationMessage from "@/app/(routes)/invitation/components/accordion/section/InvitationMessage";
import ColorFontSection from "@/app/(routes)/invitation/components/accordion/section/ColorFontSection";
import MainImageSection from "@/app/(routes)/invitation/components/accordion/section/MainImageSection";
import ShareThumbnailSection from "@/app/(routes)/invitation/components/accordion/section/ShareThumbnailSection";
import WeddingInfoSection from "@/app/(routes)/invitation/components/accordion/section/WeddingInfoSection";
import CoupleIntroSection from "@/app/(routes)/invitation/components/accordion/section/CoupleIntroSection";
import GallerySection from "@/app/(routes)/invitation/components/accordion/section/GallerySection";

export const sectionComponents: Record<string, React.FC> = {
  mainImage: MainImageSection,
  weddingInfo: WeddingInfoSection,
  invitationText: InvitationMessage,
  shareThumbnail: ShareThumbnailSection,
  colorFont: ColorFontSection,
  coupleIntro: CoupleIntroSection,
  gallery: GallerySection
};
