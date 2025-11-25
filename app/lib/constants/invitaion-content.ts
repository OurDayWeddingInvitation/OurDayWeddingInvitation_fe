import ColorFontSection from "@/app/(routes)/invitation/components/accordion/section/ColorFontSection";
import MainImageSection from "@/app/(routes)/invitation/components/accordion/section/MainImageSection";
import ShareThumbnailSection from "@/app/(routes)/invitation/components/accordion/section/ShareThumbnailSection";
import WeddingInfoSection from "@/app/(routes)/invitation/components/accordion/section/WeddingInfoSection";

export const sectionComponents: Record<string, React.FC> = {
  mainImage: MainImageSection,
  weddingInfo: WeddingInfoSection,
  shareThumbnail: ShareThumbnailSection,
  colorFont: ColorFontSection
};
