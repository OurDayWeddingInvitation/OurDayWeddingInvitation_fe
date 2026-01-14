import { useCallback, useEffect, useRef, useState } from "react";

const PREVIEW_LOADING_MS = 1500;

type PreviewItem = {
  id: number; // 리스트 렌더링용 고유 ID
  file: File; // 원본 파일 (서버 전송용)
  previewUrl: string; // 미리보기 URL
  isLoading: boolean; // 개별 로딩 상태 (1.5초간 true)
};

type Props = {
  maxCount?: number; // 1이면 단일, >1이면 다중
};

export const useImagePreview = ({ maxCount = 1 }: Props) => {
  const [items, setItems] = useState<PreviewItem[]>([]);

  // 메모리 누수 방지를 위한 URL 추적 Ref
  const previewUrlsRef = useRef<Set<string>>(new Set());

  const generateId = () => {
    return Date.now() + Math.random();
  };

  /**
   * 미리보기 설정
   * @param input 파일 또는 파일 배열
   */
  const setPreview = useCallback(
    (input: File | File[]) => {
      const files = Array.isArray(input) ? input : [input];

      if (!files.length) return [];

      if (maxCount > 1 && items.length + files.length > maxCount) {
        alert(`최대 ${maxCount}장까지 업로드 가능합니다.`);
      }

      // 개수 제한 체크
      const isSingleMode = maxCount === 1;
      const currentCount = isSingleMode ? 0 : items.length;
      const availableSlots = maxCount - currentCount;

      if (availableSlots <= 0 && !isSingleMode) {
        return [];
      }

      const targetFiles = isSingleMode
        ? [files[0]]
        : files.slice(0, availableSlots);

      // 미리보기 아이템 생성
      const newItems: PreviewItem[] = targetFiles.map((file) => {
        const url = URL.createObjectURL(file);

        previewUrlsRef.current.add(url);

        return {
          id: generateId(),
          file,
          previewUrl: url,
          isLoading: true, // 로딩 시작
        };
      });

      // 상태 업데이트
      setItems((prev) => {
        if (isSingleMode) {
          // 기존 것 정리 (단일 모드)
          prev.forEach(cleanupItem);
          return newItems;
        }
        return [...prev, ...newItems];
      });

      // 로딩 종료
      setTimeout(() => {
        setItems((prev) =>
          prev.map((item) => {
            const isTarget = newItems.some((n) => n.id === item.id);
            return isTarget ? { ...item, isLoading: false } : item;
          })
        );
      }, PREVIEW_LOADING_MS);

      // 컴포넌트에서 즉시 사용할 수 있도록 반환
      return newItems;
    },
    [items.length, maxCount]
  );

  /**
   * 단일 아이템 삭제
   */
  const removePreviewItem = useCallback((id: number) => {
    setItems((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target) cleanupItem(target);
      return prev.filter((item) => item.id !== id);
    });
  }, []);

  /**
   * 여러 아이템 일괄 삭제
   */
  const removePreviewItems = useCallback((ids: number[]) => {
    setItems((prev) => {
      prev.forEach((item) => {
        if (ids.includes(item.id)) cleanupItem(item);
      });

      return prev.filter((item) => !ids.includes(item.id));
    });
  }, []);

  /**
   * 모든 이미지 미리보기 삭제
   */
  const clearPreviewAll = useCallback(() => {
    setItems((prev) => {
      // 모든 아이템의 메모리 해제 (브라우저 성능 보호)
      prev.forEach(cleanupItem);

      // Ref에 저장된 URL Set도 싹 비우기
      previewUrlsRef.current.clear();

      // 빈 배열 반환 (상태 초기화)
      return [];
    });
  }, []);

  /**
   * 내부 헬퍼: 메모리 해제
   */
  const cleanupItem = (item: PreviewItem) => {
    if (previewUrlsRef.current.has(item.previewUrl)) {
      URL.revokeObjectURL(item.previewUrl);
      previewUrlsRef.current.delete(item.previewUrl);
    }
  };

  useEffect(() => {
    return () => {
      previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  return {
    multiplePreview: items, // 다중 이미지 미리보기
    singlePreview: items[0], // 단일 이미지 미리보기

    setPreview, // 미리 보기 설정
    removePreviewItem, // 단일 아이템 삭제
    removePreviewItems, // 여러 아이템 일괄 삭제
    clearPreviewAll, // 모든 이미지 미리보기 삭제
  };
};
