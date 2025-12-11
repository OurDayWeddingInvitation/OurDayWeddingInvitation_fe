import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";

export const getAlignIcon = (value: string) => {
  switch (value) {
    case "center":
      return AlignCenter;
    case "right":
      return AlignRight;
    default:
      return AlignLeft;
  }
};

/**
 * 서버에서 내려온 이미지 경로나 로컬에서 생성된 blob URL을
 * 브라우저에서 바로 사용할 수 있는 최종 이미지 URL로 변환해주는 유틸 함수.
 * @param {string} path - 이미지 경로
 * @returns {string} 최종 이미지 URL
 */
export const getImagePath = (path: string) => {
  if (!path) return "";
  if (path.startsWith("blob:")) return path;
  return `${process.env.NEXT_PUBLIC_WEB_URL}${path}`;
};
