import ImageAddButton from "@/app/components/ImageAddButton";
import { ParentsIntroSectionType } from "@/app/lib/fetches/invitation/type";
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
import { useParentsIntroStore } from "@/app/store/useParentsIntroStore";
import { useWeddingIdStore } from "@/app/store/useWeddingIdStore";
import { useRef, useState } from "react";

const ParentsIntroSection = () => {
  const weddingId = useWeddingIdStore((s) => s.weddingId);
  const parentsIntroInfo = useParentsIntroStore((s) => s.parentsIntroInfo);
  const parentsImageInfo = useParentsIntroStore((s) => s.parentsImageInfo);
  const updateParentsIntroInfo = useParentsIntroStore(
    (s) => s.updateParentsIntroInfo
  );
  const updateParentsImageInfo = useParentsIntroStore(
    (s) => s.updateParentsImageInfo
  );
  const removeParentsImage = useParentsIntroStore((s) => s.removeParentsImage);

  const groomParentsImgHook = useImagePreview({ maxCount: 1 });
  const brideParentsImgHook = useImagePreview({ maxCount: 1 });

  const { getCompressedImage } = useCompressImageUpload();

  const [localParentsIntroInfo, setLocalParentsIntroInfo] =
    useState<ParentsIntroSectionType>(() => parentsIntroInfo);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const inputStyle =
    "outline-0 flex-1 border-[#E0E0E0] border rounded-sm text-sm py-1.5 px-1 ";
  const fieldGroup = "flex flex-col gap-2.5 w-full";
  const fieldStyle = "flex flex-wrap items-center";
  const labelStyle = "w-1/6 min-w-[50px]";

  const parentsData = [
    { role: "groomParents", label: "신랑", hook: groomParentsImgHook },
    { role: "brideParents", label: "신부", hook: brideParentsImgHook },
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

      const imageType =
        role === "groomParents" ? "groomParentsImage" : "brideParentsImage";

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
      updateParentsImageInfo({
        [imageType]: res.data,
      });

      // 미리보기 제거
      hook.removePreviewItem(localItem.id);
    } catch (error) {
      console.error("Error uploading parents image");
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

    const imageType =
      role === "groomParents" ? "groomParentsImage" : "brideParentsImage";

    try {
      // 실제 업로드 호출 (서버 전송)
      const res = await withMinTime(
        uploadCroppedImage({
          weddingId,
          mediaId: parentsImageInfo?.[imageType]?.mediaId,
          file: file,
        }),
        1500
      );

      // store 상태 업데이트
      updateParentsImageInfo({
        [imageType]: res.data,
      });

      // 미리보기 제거
      hook.removePreviewItem(localItem.id);
    } catch (error) {
      console.error("Error modifying parents image");
    }
  };

  // 이미지 제거
  const handleImageRemove = async (
    role: string,
    hook: ReturnType<typeof useImagePreview>
  ) => {
    try {
      const imageType =
        role === "groomParents" ? "groomParentsImage" : "brideParentsImage";

      // 미리보기 제거
      if (hook.singlePreview) {
        hook.removePreviewItem(hook.singlePreview.id);
      }

      await deleteImage({
        weddingId: weddingId,
        mediaId: parentsImageInfo?.[imageType]?.mediaId,
      });

      // store 상태 초기화
      removeParentsImage(imageType);

      // file Input 초기화
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error removing parents image");
    }
  };

  // 제목, 부모님 소개글 저장
  useWeddingUpdate({
    localState: localParentsIntroInfo,
    storeState: parentsIntroInfo,
    updateStoreField: updateParentsIntroInfo,
    sectionId: "parentsIntro",
    weddingId: weddingId,
  });

  return (
    <div>
      <div className={fieldGroup}>
        <div className={fieldStyle}>
          <div className={labelStyle}>제목</div>
          <input
            type="text"
            className={`${inputStyle} max-w-[275px]`}
            value={localParentsIntroInfo?.title}
            placeholder="제목을 작성 해주세요.(공백포함 15자 이내)"
            maxLength={15}
            onChange={(e) => {
              setLocalParentsIntroInfo((prev) => ({
                ...prev,
                title: e.target.value,
              }));
            }}
          />
        </div>
        <div className={`${fieldStyle} pb-3`}>
          <div className={labelStyle}>소개글</div>
          <div className="flex gap-2 flex-1 items-end">
            <textarea
              className={`${inputStyle} m-h-[69px] resize-none max-w-[275px]`}
              value={localParentsIntroInfo?.message}
              placeholder="소개글을 작성해주세요.(공백포함 100자 이내)"
              maxLength={100}
              onChange={(e) => {
                setLocalParentsIntroInfo((prev) => ({
                  ...prev,
                  message: e.target.value,
                }));
              }}
            />
            <a href="" className="text-[#CACACA] underline text-[12px]">
              문구 예시 보러가기
            </a>
          </div>
        </div>
        <div>
          {parentsData.map((data, idx) => {
            const { role, label, hook } = data;
            const { singlePreview } = hook;

            const imageType =
              role === "groomParents"
                ? "groomParentsImage"
                : "brideParentsImage";
            const parentsImageUrl = parentsImageInfo?.[imageType]
              ? getImagePath(
                  parentsImageInfo?.[imageType]?.editedUrl ??
                    parentsImageInfo?.[imageType]?.originalUrl
                )
              : singlePreview?.previewUrl;

            return (
              <div key={idx}>
                <div className="pb-1.5">{label}측 부모님 사진</div>
                <p className="text-[12px] text-[#CACACA] pb-7">
                  사진은 최대 30MB까지 업로드 가능합니다.
                </p>
                <div className="flex">
                  <input
                    type="file"
                    id={`parentsImg${idx}`}
                    accept="image/*"
                    onChange={(e) => handleImageUpload(role, hook, e)}
                    className="hidden"
                  />
                  <div className={`${idx === 0 && "pb-[38px]"}`}>
                    <ImageAddButton
                      previewImage={parentsImageUrl}
                      loading={singlePreview?.isLoading}
                      opacity={singlePreview?.isLoading ? 0.5 : 1}
                      onImageRemove={() => handleImageRemove(role, hook)}
                      onCropConfirm={(blob) =>
                        handleImageModify(role, hook, blob)
                      }
                      id={`parentsImg${idx}`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ParentsIntroSection;
