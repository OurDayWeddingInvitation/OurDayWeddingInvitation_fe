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
    try {
      const compressedFile = await imageCompression(imgTarget, {
        maxSizeMB: 2,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      });

      return compressedFile;
    } catch (error) {
      console.log("[getFileToUpload] 이미지 업로드 처리 중 오류 발생: ", error);

      return null;
    }
  }, []);

  return { getCompressedImage };
};
