import TextEditor from "@/app/components/editor/TextEditor";
import ImageAddButton from "@/app/components/ImageAddButton";
import { CoupleIntroSectionType } from "@/app/lib/fetches/invitation/type";
import { useCompressImageUpload } from "@/app/lib/hooks/use-compressed-image";
import { useImagePreview } from "@/app/lib/hooks/useImagePreview";
import { useWeddingUpdate } from "@/app/lib/hooks/useWeddingInfoUpdate";
import {
  deleteImage,
  uploadCroppedImage,
  uploadImage,
} from "@/app/lib/utils/api";
import {
  blobToFile,
  getImagePath,
  withMinTime,
} from "@/app/lib/utils/functions";
import { useCoupleIntroStore } from "@/app/store/useCoupleIntroStore";
import { useWeddingIdStore } from "@/app/store/useWeddingIdStore";
import { useRef, useState } from "react";

const CoupleIntroSection = () => {
  const weddingId = useWeddingIdStore((s) => s.weddingId);
  const coupleIntroInfo = useCoupleIntroStore((s) => s.coupleIntroInfo);
  const coupleImageInfo = useCoupleIntroStore((s) => s.coupleImageInfo);
  const updateCoupleIntroInfo = useCoupleIntroStore(
    (s) => s.updateCoupleIntroInfo
  );
  const updateCoupleImageInfo = useCoupleIntroStore(
    (s) => s.updateCoupleImageInfo
  );
  const removeCoupleImage = useCoupleIntroStore((s) => s.removeCoupleImage);

  const groomImgHook = useImagePreview({ maxCount: 1 });
  const brideImgHook = useImagePreview({ maxCount: 1 });

  const { getCompressedImage } = useCompressImageUpload();

  const [localCoupleIntroInfo, setLocalCoupleIntroInfo] =
    useState<CoupleIntroSectionType>(() => coupleIntroInfo);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const fieldGroup = "flex flex-col gap-2.5 w-full";
  const fieldStyle = "flex flex-wrap items-center";
  const inputStyle =
    "outline-0 flex-1 border-[#E0E0E0] border placeholder:text-center rounded-sm text-sm py-1.5 px-1";

  const coupleData = [
    { role: "groomIntro", label: "신랑", hook: groomImgHook },
    { role: "brideIntro", label: "신부", hook: brideImgHook },
  ];

  // 이미지 업로드
  const handleImageUpload = async (
    role: string,
    hook: ReturnType<typeof useImagePreview>,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressedFile = await getCompressedImage(file);
      if (!compressedFile) return;

      const imageType = role === "groomIntro" ? "groomImage" : "brideImage";

      // 미리보기 설정
      const newItems = hook.setPreview(compressedFile);
      const localItem = newItems[0];

      // 실제 업로드 호출 (서버 전송)
      const res = await withMinTime(
        uploadImage({
          weddingId: weddingId,
          file: compressedFile,
          imageType: imageType,
          displayOrder: 1,
        }),
        1500
      );

      // store 상태 업데이트
      updateCoupleImageInfo({
        [imageType]: res.data,
      });

      // 미리보기 제거
      hook.removePreviewItem(localItem.id);
    } catch (error) {
      console.error("Error uploading couple image");
    }
  };

  // 이미지 수정
  const handleImageModify = async (
    role: string,
    hook: ReturnType<typeof useImagePreview>,
    blob: Blob
  ) => {
    const file = blobToFile(blob);

    if (!file) return;

    // 미리보기 설정
    const newItems = hook.setPreview(file);
    const localItem = newItems[0];

    const imageType = role === "groomIntro" ? "groomImage" : "brideImage";

    try {
      // 실제 업로드 호출 (서버 전송)
      const res = await withMinTime(
        uploadCroppedImage({
          weddingId,
          mediaId: coupleImageInfo?.[imageType]?.mediaId,
          file: file,
        }),
        1500
      );

      // store 상태 업데이트
      updateCoupleImageInfo({
        [imageType]: res.data,
      });

      // 미리보기 제거
      hook.removePreviewItem(localItem.id);
    } catch (error) {
      console.error("Error modifying couple image");
    }
  };

  // 이미지 제거
  const handleImageRemove = async (
    role: string,
    hook: ReturnType<typeof useImagePreview>
  ) => {
    try {
      const imageType = role === "groomIntro" ? "groomImage" : "brideImage";

      // 미리보기 제거
      if (hook.singlePreview) {
        hook.removePreviewItem(hook.singlePreview.id);
      }

      await deleteImage({
        weddingId: weddingId,
        mediaId: coupleImageInfo?.[imageType]?.mediaId,
      });

      // store 상태 초기화
      removeCoupleImage(imageType);

      // file Input 초기화
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error removing couple image");
    }
  };

  // 제목, 신랑, 신부 소개글 저장
  useWeddingUpdate({
    localState: localCoupleIntroInfo,
    storeState: coupleIntroInfo,
    updateStoreField: updateCoupleIntroInfo,
    sectionId: "coupleIntro",
    weddingId: weddingId,
  });

  return (
    <div>
      <div className={fieldGroup}>
        <div className={fieldStyle}>
          <div className="w-1/6 min-w-[50px]">제목</div>
          <input
            type="text"
            value={localCoupleIntroInfo?.title}
            placeholder="제목을 작성 해주세요.(공백포함 15자 이내)"
            className={`${inputStyle} min-w-20 max-w-[275px]`}
            maxLength={15}
            onChange={(e) => {
              setLocalCoupleIntroInfo((prev) => ({
                ...prev,
                title: e.target.value,
              }));
            }}
          />
        </div>
        {coupleData.map((data, idx) => {
          const { role, label, hook } = data;
          const { singlePreview } = hook;

          const imageType = role === "groomIntro" ? "groomImage" : "brideImage";
          const coupleImageUrl = coupleImageInfo?.[imageType]
            ? getImagePath(
                coupleImageInfo?.[imageType]?.editedUrl ??
                  coupleImageInfo?.[imageType]?.originalUrl
              )
            : singlePreview?.previewUrl;

          return (
            <div key={idx}>
              <div>
                <div className="w-1/6 min-w-[50px] pb-1.5">{label}님 사진</div>
                <p className="text-[12px] text-[#CACACA] pb-7">
                  사진은 최대 30MB까지 업로드 가능합니다.
                </p>
                <div className="flex">
                  <input
                    type="file"
                    id={`coupleImg${idx}`}
                    accept="image/*"
                    onChange={(e) => handleImageUpload(role, hook, e)}
                    className="hidden"
                  />
                  <ImageAddButton
                    previewImage={coupleImageUrl}
                    loading={singlePreview?.isLoading}
                    opacity={singlePreview?.isLoading ? 0.5 : 1}
                    onImageRemove={() => handleImageRemove(role, hook)}
                    onCropConfirm={(blob) =>
                      handleImageModify(role, hook, blob)
                    }
                    id={`coupleImg${idx}`}
                  />
                </div>
              </div>
              <div className="py-8">
                <div className="w-1/6 min-w-[50px] pb-6">{label}님 소개글</div>
                <TextEditor
                  message={localCoupleIntroInfo?.[role]}
                  onUpdateMessage={(message) => {
                    setLocalCoupleIntroInfo((prev) => ({
                      ...prev,
                      [role]: message,
                    }));
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CoupleIntroSection;
