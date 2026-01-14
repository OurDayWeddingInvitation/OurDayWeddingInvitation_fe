import {
  CroppedImageUploadType,
  DeleteImageByTypeParams,
  ImageDeleteType,
  ImageUploadType,
  MultipleImageUploadType,
} from "../fetches/media/type";

/**
 * 단일 이미지 업로드
 * @param {string} weddingId - wedding id
 * @param {File} file - 업로드할 단일 이미지 파일
 * @param {string} imageType - 이미지 타입
 * @param {number} displayOrder - 이미지 순서
 * @returns 업로드된 이미지 정보
 */
export const uploadImage = async ({
  weddingId,
  file,
  imageType,
  displayOrder,
}: ImageUploadType) => {
  const form = new FormData();

  form.append("file", file, file.name);
  form.append("imageType", imageType);
  form.append("displayOrder", String(displayOrder));

  const res = await fetch(`/api/media/upload?weddingId=${weddingId}`, {
    method: "POST",
    body: form,
  });

  return res.json();
};

/**
 * 여러 이미지 업로드
 * @param {string} weddingId - wedding id
 * @param {File[]} files - 업로드할 이미지 파일들
 * @param {string} imageType - 이미지 타입
 * @returns 업로드된 이미지 정보
 */
export const uploadMultipleImages = async ({
  weddingId,
  files,
  imageType,
}: MultipleImageUploadType) => {
  const form = new FormData();

  files?.forEach((file) => {
    form.append("files", file, file.name);
  });
  form.append("imageType", imageType);

  const res = await fetch(`/api/media/upload?weddingId=${weddingId}`, {
    method: "POST",
    body: form,
  });

  return res.json();
};

/**
 * 이미지 삭제
 * @param {string} weddingId - wedding id
 * @param {number} mediaId - 이미지 id
 * @returns 삭제 결과
 */
export const deleteImage = async ({ weddingId, mediaId }: ImageDeleteType) => {
  const res = await fetch(
    `/api/media/delete?weddingId=${weddingId}&mediaId=${mediaId}`,
    {
      method: "DELETE",
    }
  );

  return res.json();
};

/**
 * 이미지 크롭 후 업로드
 */
export const uploadCroppedImage = async ({
  weddingId,
  mediaId,
  file,
}: CroppedImageUploadType) => {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch(
    `/api/media/cropped?weddingId=${weddingId}&mediaId=${mediaId}`,
    {
      method: "PUT",
      body: form,
    }
  );

  return res.json();
};

export const deleteImageByType = async ({
  weddingId,
  imageType,
}: DeleteImageByTypeParams) => {
  const res = await fetch(`/api/media/delete-by-type?weddingId=${weddingId}`, {
    method: "DELETE",
    body: JSON.stringify({ imageType }),
  });

  return res.json();
};
