"use client";
import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number = 1000): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer); // 입력 중이면 clear되어 호출되지 않음
  }, [value, delay]);

  return debouncedValue;
}
