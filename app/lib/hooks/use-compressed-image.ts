import { useCallback } from "react";
import imageCompression from "browser-image-compression";

/**
 * useCompressedImageUpload
 * ------------------------------------------
 * 이미지 업로드 시 압축 후 FormData로 반환하는 훅
 *
 * 내부 로직:
 * - 이미지 압축 (최대 1MB, 1920px) 후 FormData 생성
 *
 * getFileToUpload 파라미터:
 * @param imgTarget - File 객체
 * @param formEl - HTMLFormElement (input 포함한 form)
 *
 * 반환값:
 * - 압축된 이미지
 * - 실패 시 null 반환
 */
export const useCompressImageUpload = () => {
  const getCompressedImage = useCallback(async (imgTarget: File) => {
    // 파일 형식 체크 (JPEG, PNG, WEBP)
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(imgTarget.type)) {
      alert("유효하지 않은 파일 형식입니다.");
      return null;
    }

    // 용량 체크 (30MB 이하)
    const maxSize = 30 * 1024 * 1024; // 30MB
    if (imgTarget.size > maxSize) {
      alert("파일 크기는 30MB 이하여야 합니다.");
      return null;
    }

    try {
      const compressedFile = await imageCompression(imgTarget, {
        maxSizeMB: 2,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      });

      return compressedFile;
    } catch (error) {
      console.log("[getFileToUpload] 이미지 업로드 처리 중 오류 발생: ", error);
      return imgTarget;
    }
  }, []);

  return { getCompressedImage };
};
