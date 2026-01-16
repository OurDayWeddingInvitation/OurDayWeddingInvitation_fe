import { create } from "zustand";
import { ShareLinkSection } from "../lib/fetches/invitation/type";
import { ImageDetailItem } from "../lib/fetches/media/type";

type ShareThumbnailType = "kakaoThumbnailImage" | "linkThumbnailImage";

type ShareThumbnailProp = {
  shareThumbnailInfo: {
    kakaoThumbnailImage: ImageDetailItem | null;
    linkThumbnailImage: ImageDetailItem | null;
  };

  setShareThumbnailInfo: (
    data: Partial<{
      kakaoThumbnailImage: ImageDetailItem | null;
      linkThumbnailImage: ImageDetailItem | null;
    }>
  ) => void;

  updateShareThumbnailInfo: (
    partial: Partial<{
      kakaoImage: ImageDetailItem | null;
      linkImage: ImageDetailItem | null;
    }>
  ) => void;

  removeShareThumbnail: (key: ShareThumbnailType) => void;
};

export const useShareThumbnailStore = create<ShareThumbnailProp>((set) => ({
  shareThumbnailInfo: {
    kakaoThumbnailImage: null,
    linkThumbnailImage: null,
  },

  setShareThumbnailInfo: (data) =>
    set({
      shareThumbnailInfo: {
        kakaoThumbnailImage: data.kakaoThumbnailImage ?? null,
        linkThumbnailImage: data.linkThumbnailImage ?? null,
      },
    }),

  updateShareThumbnailInfo: (partial) =>
    set((state) => ({
      shareThumbnailInfo: {
        ...(state.shareThumbnailInfo ?? {
          kakaoThumbnailImage: null,
          linkThumbnailImage: null,
        }),
        ...partial, // 변경 값 덮어쓰기
      },
    })),

  removeShareThumbnail: (key) =>
    set((state) => ({
      shareThumbnailInfo: {
        ...(state.shareThumbnailInfo ?? {
          kakaoThumbnailImage: null,
          linkThumbnailImage: null,
        }),
        [key]: null,
      },
    })),
}));
