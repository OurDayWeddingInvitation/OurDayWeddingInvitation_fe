import { getImagePath } from "@/app/lib/utils/functions";
import { useParentsIntroStore } from "@/app/store/useParentsIntroStore";
import { useThemeFontStore } from "@/app/store/useThemeFontStore";
import { useWeddingInfoStore } from "@/app/store/useWeddingInfoStore";
import { Heart } from "lucide-react";
import { FadeInSection } from "../FadeInSection";

const ParentsInfo = ({ isLink }: { isLink: boolean }) => {
  const themeFont = useThemeFontStore((s) => s.themeFont);
  const weddingInfo = useWeddingInfoStore((s) => s.weddingInfo);
  const parentsIntroInfo = useParentsIntroStore((s) => s.parentsIntroInfo);
  const parentsImageInfo = useParentsIntroStore((s) => s.parentsImageInfo);

  const parentsIntroTitle = parentsIntroInfo?.title ?? "";
  const parentsIntroInfoMessage = parentsIntroInfo?.message ?? "";

  // TODO: 이미지 경로 처리 함수로 변경 필요
  const groomParentsImageUrl = parentsImageInfo?.groomParentsImage
    ? `${getImagePath(
        parentsImageInfo?.groomParentsImage?.editedUrl ??
          parentsImageInfo?.groomParentsImage?.originalUrl
      )}?v=${new Date(
        parentsImageInfo?.groomParentsImage?.updatedAt
      ).getTime()}`
    : "";
  const brideParentsImageUrl = parentsImageInfo?.brideParentsImage
    ? `${getImagePath(
        parentsImageInfo?.brideParentsImage?.editedUrl ??
          parentsImageInfo?.brideParentsImage?.originalUrl
      )}?v=${new Date(
        parentsImageInfo?.brideParentsImage?.updatedAt
      ).getTime()}`
    : "";

  const groomName = weddingInfo?.groomFirstName;
  const brideName = weddingInfo?.brideFirstName;
  const isGroomFirst = weddingInfo?.nameOrderType === "G";
  const parents = [
    {
      key: "groom",
      label: "신랑",
      labelColor: "#A9BBD2",
      childName: groomName,
      father: weddingInfo?.groomFatherName,
      mother: weddingInfo?.groomMotherName,
      imageUrl: groomParentsImageUrl,
    },
    {
      key: "bride",
      label: "신부",
      labelColor: "#e6a5da",
      childName: brideName,
      father: weddingInfo?.brideFatherName,
      mother: weddingInfo?.brideMotherName,
      imageUrl: brideParentsImageUrl,
    },
  ];
  const orderedParents = isGroomFirst ? parents : [...parents].reverse();
  return (
    <div
      className="py-10"
      style={{ backgroundColor: themeFont?.backgroundColor ?? "" }}
    >
      <div className="flex flex-col items-center">
        <FadeInSection enabled={isLink}>
          <div
            className="tracking-[4px] pb-3"
            style={{ color: themeFont?.accentColor }}
          >
            OUR PARENTS
          </div>
        </FadeInSection>
        <FadeInSection enabled={isLink}>
          <span>{parentsIntroTitle}</span>
        </FadeInSection>
        <FadeInSection enabled={isLink}>
          <div className="flex flex-col items-center py-10 px-4">
            <p className="whitespace-pre-wrap text-center">
              {parentsIntroInfoMessage}
            </p>
          </div>
        </FadeInSection>
        <FadeInSection enabled={isLink}>
          <div className="flex justify-center gap-2.5">
            {orderedParents.map((p) => (
              <div key={p.key} className="flex flex-col items-center">
                <div className="w-[145px] h-[145px] rounded-[10px] overflow-hidden">
                  {/* 이미지 */}
                  {p.imageUrl ? (
                    <img
                      src={p.imageUrl}
                      alt="부모님 이미지"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#D9D9D9]" />
                  )}
                </div>

                <div className="flex gap-2.5 justify-center items-center py-2.5">
                  <span style={{ color: p.labelColor }}>{p.label}</span>
                  <span>{p.childName}의 부모님</span>
                </div>

                <p className="py-5 flex items-center gap-1">
                  <span>{p.father}</span>
                  <Heart color="#E58989" fill="#E58989" size={18} />
                  <span>{p.mother}</span>
                </p>
              </div>
            ))}
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};

export default ParentsInfo;
