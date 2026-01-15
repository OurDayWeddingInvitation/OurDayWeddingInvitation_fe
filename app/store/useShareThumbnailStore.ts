import { create } from "zustand";
import { ShareLinkSection } from "../lib/fetches/invitation/type";
import { ImageDetailItem } from "../lib/fetches/media/type";

type ShareThumbnailType = "kakaoThumbnailImage" | "linkThumbnailImage";

type ShareThumbnailProp = {
  shareLinkInfo: ShareLinkSection | null;
  shareThumbnailInfo: {
    kakaoThumbnailImage: ImageDetailItem | null;
    linkThumbnailImage: ImageDetailItem | null;
  };

  setShareLinkInfo: (data: ShareLinkSection) => void;
  setShareThumbnailInfo: (
    data: Partial<{
      kakaoThumbnailImage: ImageDetailItem | null;
      linkThumbnailImage: ImageDetailItem | null;
    }>
  ) => void;

  updateShareLinkInfo: (partial: Partial<ShareLinkSection>) => void;
  updateShareThumbnailInfo: (
    partial: Partial<{
      kakaoImage: ImageDetailItem | null;
      linkImage: ImageDetailItem | null;
    }>
  ) => void;

  removeShareThumbnail: (key: ShareThumbnailType) => void;
};

export const useShareThumbnailStore = create<ShareThumbnailProp>((set) => ({
  shareLinkInfo: null,
  shareThumbnailInfo: {
    kakaoThumbnailImage: null,
    linkThumbnailImage: null,
  },

  setShareLinkInfo: (data) => set({ shareLinkInfo: data }),
  setShareThumbnailInfo: (data) =>
    set({
      shareThumbnailInfo: {
        kakaoThumbnailImage: data.kakaoThumbnailImage ?? null,
        linkThumbnailImage: data.linkThumbnailImage ?? null,
      },
    }),

  updateShareLinkInfo: (partial) =>
    set((state) => ({
      shareLinkInfo: {
        ...(state.shareLinkInfo ?? {}), // 기존 값 없으면 빈 객체
        ...partial, // 변경 값 덮어쓰기
      },
    })),
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
