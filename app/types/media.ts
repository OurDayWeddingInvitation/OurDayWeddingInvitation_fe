export interface ImageBase {
  weddingId: number;
  mediaId: number;
  imageType: string;
  displayOrder: number;
  originalUrl: string;
  editedUrl: string;
  fileExtension: string;
  fileSize: number;
  createdAt: string;
  updatedAt: string;
}

export interface ImageUploadParams {
  weddingId: number;
  file: File;
  imageType: string;
  displayOrder: number;
}
