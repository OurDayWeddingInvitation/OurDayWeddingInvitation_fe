import ImageAddButton from "@/app/components/ImageAddButton";
import PreviewThumbnail from "@/app/components/PreviewThumbnail";
import { useCompressImageUpload } from "@/app/lib/hooks/use-compressed-image";
import { useImagePreview } from "@/app/lib/hooks/useImagePreview";
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
import { usePreviewModalStore } from "@/app/store/usePreviewModalStore";
import { useShareThumbnailStore } from "@/app/store/useShareThumbnailStore";
import { useWeddingIdStore } from "@/app/store/useWeddingIdStore";
import { useWeddingInfoStore } from "@/app/store/useWeddingInfoStore";
import { CircleX } from "lucide-react";
import { useRef } from "react";

const ShareThumbnailSection = () => {
  const weddingId = useWeddingIdStore((s) => s.weddingId);
  const weddingInfo = useWeddingInfoStore((s) => s.weddingInfo);
  const shareThumbnailInfo = useShareThumbnailStore(
    (s) => s.shareThumbnailInfo
  );
  const updateShareThumbnailInfo = useShareThumbnailStore(
    (s) => s.updateShareThumbnailInfo
  );
  const removeShareThumbnail = useShareThumbnailStore(
    (s) => s.removeShareThumbnail
  );

  const kakaoImgHook = useImagePreview({ maxCount: 1 });
  const linkImgHook = useImagePreview({ maxCount: 1 });

  const { openIndex, openModal, closeModal } = usePreviewModalStore();
  const { getCompressedImage } = useCompressImageUpload();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const shareThumbnailData = [
    {
      role: "kakaoImage",
      title: "카카오톡 공유 썸네일",
      info: "카카오톡으로 공유 시 보이는 대표 사진입니다. (세로 사이즈 권장)",
      hook: kakaoImgHook,
    },
    {
      role: "linkImage",
      title: "링크 공유 썸네일",
      info: "URL 주소로 공유 시 보이는 대표 사진입니다. (가로 사이즈 권장)",
      hook: linkImgHook,
    },
  ];

  console.log(weddingInfo);

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
        role === "kakaoImage" ? "kakaoThumbnailImage" : "linkThumbnailImage";

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
      updateShareThumbnailInfo({
        [imageType]: res.data,
      });

      // 미리보기 제거
      hook.removePreviewItem(localItem.id);
    } catch (error) {
      console.error("Error uploading share thumbnail image");
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
      role === "kakaoImage" ? "kakaoThumbnailImage" : "linkThumbnailImage";

    try {
      // 실제 업로드 호출 (서버 전송)
      const res = await withMinTime(
        uploadCroppedImage({
          weddingId,
          mediaId: shareThumbnailInfo?.[imageType]?.mediaId,
          file: file,
        }),
        1500
      );

      // store 상태 업데이트
      updateShareThumbnailInfo({
        [imageType]: res.data,
      });

      // 미리보기 제거
      hook.removePreviewItem(localItem.id);
    } catch (error) {
      console.error("Error modifying share thumbnail image");
    }
  };

  // 이미지 제거
  const handleImageRemove = async (
    role: string,
    hook: ReturnType<typeof useImagePreview>
  ) => {
    try {
      const imageType =
        role === "kakaoImage" ? "kakaoThumbnailImage" : "linkThumbnailImage";

      // 미리보기 제거
      if (hook.singlePreview) {
        hook.removePreviewItem(hook.singlePreview.id);
      }

      await deleteImage({
        weddingId: weddingId,
        mediaId: shareThumbnailInfo?.[imageType]?.mediaId,
      });

      // store 상태 초기화
      removeShareThumbnail(imageType);

      // file Input 초기화
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error removing share thumbnail image");
    }
  };

  return (
    <div>
      {shareThumbnailData.map((data, idx) => {
        const { role, title, info, hook } = data;
        const { singlePreview } = hook;

        const imageType =
          role === "kakaoImage" ? "kakaoThumbnailImage" : "linkThumbnailImage";
        const shareImageUrl = shareThumbnailInfo?.[imageType]
          ? getImagePath(
              shareThumbnailInfo?.[imageType]?.editedUrl ??
                shareThumbnailInfo?.[imageType]?.originalUrl
            )
          : singlePreview?.previewUrl;

        return (
          <div key={idx}>
            <div className="pt-8">
              <div className="flex gap-2 items-center">
                <div className="text-[15px]">{title}</div>
                <button
                  className="border-[#D4C6B7] border text-[10px] px-2.5 py-1 rounded-sm cursor-pointer"
                  onClick={() => {
                    openModal(idx);
                  }}
                >
                  미리 보기
                </button>
              </div>
              <p className="text-[12px] text-[#CACACA] leading-6.5 pb-8">
                {info}
              </p>
              <div className="flex">
                <input
                  type="file"
                  id={`openImg${idx}`}
                  accept="image/*"
                  onChange={(e) => handleImageUpload(data.role, hook, e)}
                  className="hidden"
                />
                <ImageAddButton
                  previewImage={shareImageUrl}
                  loading={singlePreview?.isLoading}
                  opacity={singlePreview?.isLoading ? 0.5 : 1}
                  onImageRemove={() => handleImageRemove(data.role, hook)}
                  onCropConfirm={(blob) =>
                    handleImageModify(data.role, hook, blob)
                  }
                  id={`openImg${idx}`}
                />
              </div>
            </div>

            <div
              className={`${
                idx === openIndex ? "block" : "hidden"
              } fixed h-full left-0 top-0 bg-[#433f3b80] z-9999 w-full`}
            >
              <div className="z-99999 absolute left-[50%] top-[50%] translate-[-50%]">
                <CircleX
                  className="float-right mb-1.5 cursor-pointer absolute right-0 -top-8"
                  color="#5F5F5F"
                  size={28}
                  onClick={closeModal}
                />
                {/* 미리보기 창 */}
                <PreviewThumbnail thumbnail={shareImageUrl} kindIdx={idx} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShareThumbnailSection;
