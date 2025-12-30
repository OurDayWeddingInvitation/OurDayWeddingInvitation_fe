import { useMainImageStore } from "@/app/store/useMainImageStore";
import { useState } from "react";
import { ImageDetailItem } from "../fetches/invitation/type";

type PreviewItem = {
  file: File;
  preview: string;
  loading: boolean;
  opacity: number;
};

export const useImageUpload = ({ kind, maxCount }: { kind: string; maxCount?: number }) => {
  // 단일
  const [preview, setPreview] = useState<string | null>();
  // 여러장
  const [gallery, setGallery] = useState<PreviewItem[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [opacity, setOpacity] = useState<number>(0.5);

  const { updateMainImageInfo, resetMainImageInfo } = useMainImageStore();

  const handleImageUpload = (file: File | null, data?: ImageDetailItem | null) => {
    if (!file) return;

    const url = URL.createObjectURL(file);

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    if (kind === "main") {
      updateMainImageInfo(data);
    }

    setPreview(url);
    setLoading(true);
    setOpacity(0.5);

    setTimeout(() => {
      setLoading(false);
      setOpacity(1);
    }, 1500);
  };

  const handleMultipleUpload = (files: FileList) => {
    if (!files) return;

    const fileArray = Array.from(files);

    setGallery((prev) => {
      const newItems = fileArray?.map((file) => {
        const url = URL.createObjectURL(file);
        return {
          file,
          preview: url,
          loading: true,
          opacity: 0.5
        };
      });

      return [...prev, ...newItems];
    });

    setTimeout(() => {
      setGallery((prev) =>
        prev.map((item) => ({
          ...item,
          loading: false,
          opacity: 1
        }))
      );
    }, 1500);
  };

  const handleImageRemove = (idx?: number) => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    if (kind === "main") {
      resetMainImageInfo();
      setPreview(null);
    } else if (kind === "gallery") {
      if (idx === undefined) return;

      setGallery((prev) => {
        URL.revokeObjectURL(prev[idx]?.preview);
        return prev.filter((_, i) => i !== idx);
      });
    } else {
      setPreview(null);
    }
  };

  return {
    preview,
    gallery,
    loading,
    opacity,
    handleImageUpload,
    handleMultipleUpload,
    handleImageRemove
  };
};
