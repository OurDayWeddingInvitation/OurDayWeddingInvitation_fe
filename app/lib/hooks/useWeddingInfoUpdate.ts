import { useEffect } from "react";
import { useDebounce } from "@/app/lib/hooks/use-debounce";
import { clientFetchApi } from "@/app/lib/fetches/client";

export function useWeddingUpdate({ localState, storeState, updateStoreField, sectionId, weddingId }) {
  const debounced = useDebounce(localState, 500);

  useEffect(() => {
    if (!storeState || !debounced) return;

    const updated = {};
    for (const key in debounced) {
      if (debounced[key] !== storeState[key]) {
        updated[key] = debounced[key];
      }
    }

    // 변경 없음
    if (Object.keys(updated).length === 0) return;

    // zustand 업데이트
    for (const key in updated) {
      updateStoreField(key, updated[key]);
    }

    // API 업데이트
    async function updateApi() {
      await clientFetchApi({
        endPoint: `/weddings/update`,
        method: "PATCH",
        body: {
          weddingId,
          sectionId, // weddingInfo 또는 familyInfo
          updated
        }
      });
    }

    updateApi();
  }, [debounced]);
}
