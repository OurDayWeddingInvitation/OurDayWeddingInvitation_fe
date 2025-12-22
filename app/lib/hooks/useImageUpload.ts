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
  const [previews, setPreviews] = useState<PreviewItem[]>([]);

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
    } else if (kind === "gallery") {
      if (previews.length >= maxCount) {
        alert("최대 50장까지 업로드 할 수 있습니다.");
      }
      setPreviews((prev) => [...prev, { file, preview: url, loading: true, opacity: 0.5 }]);
      setTimeout(() => {
        setPreviews((prev) => prev.map((item) => (item.preview === url ? { ...item, loading: false, opacity: 1 } : item)));
      }, 1500);
    }
    setPreview(url);
    setLoading(true);
    setOpacity(0.5);

    setTimeout(() => {
      setLoading(false);
      setOpacity(1);
    }, 1500);
  };

  const handleImageRemove = (idx?: number) => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    if (kind === "main") {
      resetMainImageInfo();
    } else if (kind === "gallery") {
      if (idx === undefined) return;

      setPreviews((prev) => {
        URL.revokeObjectURL(prev[idx]?.preview);
        return prev.filter((_, i) => i !== idx);
      });
    } else {
      setPreview(null);
    }
  };

  return {
    preview,
    previews,
    loading,
    opacity,
    handleImageUpload,
    handleImageRemove
  };
};
