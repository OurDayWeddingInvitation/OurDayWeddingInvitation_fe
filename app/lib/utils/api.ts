import { clientFetchApi } from "../fetches/client";
import { ImageDeleteType, ImageUploadType } from "../fetches/invitation/type";

/**
 * 이미지 업로드
 * @param {string} weddingId
 * @param {File} file
 * @param {string} imageType
 * @param {number} displayOrder
 * @returns
 */
export const uploadImage = async ({
  weddingId,
  file,
  imageType,
  displayOrder,
}: ImageUploadType) => {
  const form = new FormData();

  form.append("weddingId", weddingId);
  form.append("file", file, file.name);
  form.append("imageType", imageType);
  form.append("displayOrder", String(displayOrder));

  const res = await fetch("/api/media/upload", {
    method: "POST",
    body: form,
  });

  return res.json();
};

/**
 * 이미지 삭제
 * @param {string} weddingId
 * @param {number} mediaId
 * @returns
 */
export const deleteImage = async ({ weddingId, mediaId }: ImageDeleteType) => {
  const res = await clientFetchApi({
    endPoint: "/media/delete",
    method: "DELETE",
    body: {
      weddingId,
      mediaId,
    },
  });

  return res.json();
};
