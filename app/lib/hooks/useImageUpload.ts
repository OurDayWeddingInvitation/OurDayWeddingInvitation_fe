import { useMainImageStore } from "@/app/store/useMainImageStore";
import { useRef, useState } from "react";

export const useImageUpload = (kind: string) => {
  const [preview, setPreview] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [opacity, setOpacity] = useState<number>(0.5);
  const inputRef = useRef<HTMLInputElement>(null);
  const { updateMainImageInfo, resetMainImageInfo } = useMainImageStore();

  const handleImageUpload = (file: File | null) => {
    if (!file) return;

    const url = URL.createObjectURL(file);

    if (kind === "main") {
      updateMainImageInfo({
        originalUrl: url,
      });
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
    if (kind === "main") {
      resetMainImageInfo();
    }
    setPreview(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return {
    preview,
    loading,
    opacity,
    inputRef,
    handleImageUpload,
    handleImageRemove,
  };
};
