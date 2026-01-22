"use client";

import { useEffect } from "react";
import { useThemeFontStore } from "@/app/store/useThemeFontStore";

export default function ClientZoomController() {
  const zoomPrevent = useThemeFontStore((s) => s.themeFont?.zoomPreventYn);

  useEffect(() => {
    const html = document.documentElement;

    if (zoomPrevent) {
      html.setAttribute("data-zoom-prevent", "true");
    } else {
      html.removeAttribute("data-zoom-prevent");
    }
  }, [zoomPrevent]);

  useEffect(() => {
    if (!zoomPrevent) return;

    let lastTouchEnd = 0;
    const handler = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };

    document.addEventListener("touchend", handler, { passive: false });
    return () => {
      document.removeEventListener("touchend", handler);
    };
  }, [zoomPrevent]);

  return null;
}
