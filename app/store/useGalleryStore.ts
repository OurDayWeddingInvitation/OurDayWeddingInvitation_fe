import { create } from "zustand";
import { ImageDetailItem } from "../lib/fetches/media/type";

type GalleryProp = {
  galleryImages: ImageDetailItem[] | null;
  galleryTitle: string;

  setGalleryImages: (data: ImageDetailItem[]) => void;
  setGalleryTitle: (title: string) => void;

  addGalleryImages: (images: ImageDetailItem[]) => void;
  updateGalleryImage: (partial: Partial<ImageDetailItem>) => void;

  resetGalleryImageInfo: () => void;
};

export const useGalleryStore = create<GalleryProp>((set) => ({
  galleryImages: null,
  galleryTitle: "",

  setGalleryImages: (data) => {
    set({ galleryImages: data });
  },

  setGalleryTitle: (title) => {
    set({ galleryTitle: title });
  },

  addGalleryImages: (images) =>
    set((state) => ({
      galleryImages: [...state.galleryImages, ...images],
    })),

  updateGalleryImage: (partial) =>
    set((state) => ({
      galleryImages: state.galleryImages.map((img) =>
        img.mediaId === partial.mediaId ? { ...img, ...partial } : img
      ),
    })),

  resetGalleryImageInfo: () => set({ galleryImages: null }),
}));
