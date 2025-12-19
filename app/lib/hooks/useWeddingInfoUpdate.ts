import { useEffect, useRef } from "react";
import { useDebounce } from "@/app/lib/hooks/use-debounce";
import { clientFetchApi } from "@/app/lib/fetches/client";
import { loadingStore } from "@/app/store/useLoadingStore";

export function useWeddingUpdate({
  localState,
  storeState,
  updateStoreField,
  sectionId,
  weddingId,
}) {
  const debounced = useDebounce(localState, 500);
  const loadingState = loadingStore();

  useEffect(() => {
    if (!storeState) return;
    loadingState.updateLoading(true);
  }, [localState]);

  useEffect(() => {
    if (!storeState || !debounced) {
      loadingState.updateLoading(false);
      return;
    }

    const updated: Record<string, any> = {};

    for (const key in debounced) {
      if (debounced[key] !== storeState[key]) {
        updated[key] = debounced[key];
      }
    }

    if (Object.keys(updated).length === 0) {
      loadingState.updateLoading(false);
      return;
    }

    for (const key in updated) {
      updateStoreField(key, updated[key]);
    }

    (async () => {
      await clientFetchApi({
        endPoint: `/weddings/update`,
        method: "PATCH",
        body: {
          weddingId,
          sectionId,
          updated,
        },
      });

      loadingState.updateLoading(false);
    })();
  }, [debounced]);
}
