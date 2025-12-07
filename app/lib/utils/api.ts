/**
 * 이미지 업로드
 * @param file
 * @param imageType
 * @param displayOrder
 * @returns
 */
export const uploadImages = async (
  weddingId: number,
  file: File,
  imageType: string,
  displayOrder: number
) => {
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
