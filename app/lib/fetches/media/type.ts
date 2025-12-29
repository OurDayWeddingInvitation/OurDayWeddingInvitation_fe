export interface ImageDetailItem {
  weddingId?: string;
  mediaId?: number;
  imageType?: string;
  displayOrder?: number;
  originalUrl?: string;
  editedUrl?: string;
  fileExtension?: string;
  fileSize?: number;
  createdAt?: string;
  updatedAt?: string;
}

export type ImageDetail = ImageDetailItem[];

export interface ImageUploadType {
  weddingId?: string;
  file?: File;
  imageType?: string;
  displayOrder?: number;
}

export interface MultipleImageUploadType {
  weddingId?: string;
  files?: File[];
  imageType?: string;
}

export interface CroppedImageUploadType {
  weddingId?: string;
  file?: Blob;
  mediaId?: number;
}

export interface ImageDeleteType {
  weddingId?: string;
  mediaId?: number;
}
