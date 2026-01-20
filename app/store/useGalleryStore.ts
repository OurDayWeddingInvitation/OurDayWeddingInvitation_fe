import { create } from "zustand";
import { ImageDetailItem } from "../lib/fetches/media/type";
import { GallerySectionType } from "../lib/fetches/invitation/type";

type GalleryProp = {
  galleryImages: ImageDetailItem[] | null;
  galleryInfo: GallerySectionType | null;

  setGalleryInfo: (data: GallerySectionType) => void;
  updateGalleryInfo: <K extends keyof GallerySectionType>(
    key: K,
    value: GallerySectionType[K]
  ) => void;

  setGalleryImages: (data: ImageDetailItem[]) => void;
  addGalleryImages: (images: ImageDetailItem[]) => void;
  updateGalleryImage: (partial: Partial<ImageDetailItem>) => void;

  removeGalleryImage: (mediaId: number) => void;
  resetGalleryImages: () => void;
};

export const useGalleryStore = create<GalleryProp>((set) => ({
  galleryImages: null,
  galleryInfo: null,

  setGalleryInfo: (data) => {
    set({ galleryInfo: data });
  },

  updateGalleryInfo: (key, value) =>
    set((state) => ({
      galleryInfo: state.galleryInfo
        ? { ...state.galleryInfo, [key]: value }
        : state.galleryInfo,
    })),

  setGalleryImages: (data) => {
    set({ galleryImages: data });
  },

  addGalleryImages: (images) =>
    set((state) => ({
      galleryImages: [...(state.galleryImages ?? []), ...images],
    })),

  updateGalleryImage: (partial) =>
    set((state) => ({
      galleryImages: state.galleryImages.map((img) =>
        img.mediaId === partial.mediaId ? { ...img, ...partial } : img
      ),
    })),

  removeGalleryImage: (mediaId) =>
    set((state) => ({
      galleryImages: state.galleryImages.filter(
        (img) => img.mediaId !== mediaId
      ),
    })),

  resetGalleryImages: () => set({ galleryImages: null }),
}));
