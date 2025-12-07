import { ImageUploadParams } from "@/app/types/media";

/**
 * 이미지 업로드
 * @param {number} weddingId
 * @param {File} file
 * @param {string} imageType
 * @param {number} displayOrder
 * @returns
 */
export const uploadImages = async ({
  weddingId,
  file,
  imageType,
  displayOrder,
}: ImageUploadParams) => {
  const form = new FormData();

  form.append("weddingId", String(weddingId));
  form.append("file", file, file.name);
  form.append("imageType", imageType);
  form.append("displayOrder", String(displayOrder));

  const res = await fetch("/api/media/upload", {
    method: "POST",
    body: form,
  });

  return res.json();
};
