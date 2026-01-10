import { useEffect, useState } from "react";

type PreviewItem = {
  file: File | Blob;
  preview: string;
  loading: boolean;
  opacity: number;
  mediaId?: number;
};

export const useImageUpload = ({
  kind,
  maxCount,
}: {
  kind: string;
  maxCount?: number;
}) => {
  // 단일
  const [preview, setPreview] = useState<string | null>();
  // 여러장
  const [gallery, setGallery] = useState<PreviewItem[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [opacity, setOpacity] = useState<number>(0.5);

  const handleImageUpload = (file: File | Blob | null) => {
    if (!file) return;

    const url = URL.createObjectURL(file);

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview(url);
    setLoading(true);
    setOpacity(0.5);

    setTimeout(() => {
      setLoading(false);
      setOpacity(1);
    }, 1500);
  };

  const handleMultipleUpload = (files: File[]) => {
    if (!files) return;

    setGallery((prev) => {
      const newItems = files?.map((file) => {
        const url = URL.createObjectURL(file);
        return {
          file,
          preview: url,
          loading: true,
          opacity: 0.5,
        };
      });

      return [...prev, ...newItems];
    });

    setTimeout(() => {
      setGallery((prev) =>
        prev.map((item) => ({
          ...item,
          loading: false,
          opacity: 1,
        }))
      );
    }, 1500);
  };

  const handleImageRemove = (idx?: number) => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    if (kind === "main") {
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

  const clearPreview = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
  };

  const clearGallery = () => {
    gallery.forEach((item) => URL.revokeObjectURL(item.preview));
    setGallery([]);
  };

  /**
   * 언마운트 시 메모리 정리
   */
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      gallery.forEach((item) => {
        URL.revokeObjectURL(item.preview);
      });
    };
  }, [preview, gallery]);

  return {
    preview,
    gallery,
    loading,
    opacity,

    handleImageUpload,
    handleMultipleUpload,
    handleImageRemove,

    clearPreview,
    clearGallery,
  };
};
