import { useState, useRef } from "react";

export const useImageUpload = () => {
  const [preview, setPreview] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [opacity, setOpacity] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (file: File | null) => {
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
    setLoading(true);
    setOpacity(0.5);

    setTimeout(() => {
      setLoading(false);
      setOpacity(1);
    }, 1500);
  };

  const handleImageRemove = () => {
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
    handleImageRemove
  };
};
