import { useMainImageStore } from "@/app/store/useMainImageStore";
import { useState } from "react";
import { ImageDetailItem } from "../fetches/invitation/type";

export const useImageUpload = (kind: string) => {
  const [preview, setPreview] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [opacity, setOpacity] = useState<number>(0.5);
  const { updateMainImageInfo, resetMainImageInfo } = useMainImageStore();

  const handleImageUpload = (file: File | null, data?: ImageDetailItem | null) => {
    if (!file) return;

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    const url = URL.createObjectURL(file);

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

  const handleImageRemove = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    if (kind === "main") {
      resetMainImageInfo();
    }
    setPreview(null);
  };

  return {
    preview,
    loading,
    opacity,
    handleImageUpload,
    handleImageRemove
  };
};
