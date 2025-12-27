import { PixelCrop } from "react-image-crop";

// const createImage = (url: string): Promise<HTMLImageElement> => {
//   return new Promise((resolve, reject) => {
//     const image = new Image();
//     image.onload = () => resolve(image);
//     image.onerror = reject;
//     image.crossOrigin = "anonymous";
//     image.src = url;
//   });
// };

export async function getCroppedImg(image: HTMLImageElement, crop: PixelCrop): Promise<Blob> {
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  canvas.width = crop.width;
  canvas.height = crop.height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context 없음");
  }

  ctx.drawImage(image, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, crop.width, crop.height);
  console.log(ctx, "ctx");

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      console.log(blob);
      if (!blob) {
        throw new Error("Blob 생성 실패");
      }
      resolve(blob);
    }, "image/jpeg");
  });
}
