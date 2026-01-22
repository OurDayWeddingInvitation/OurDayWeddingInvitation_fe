"use client";

import { useEffect } from "react";
import { useThemeFontStore } from "@/app/store/useThemeFontStore";

export default function ClientZoomController() {
  const zoomPrevent = useThemeFontStore((s) => s.themeFont?.zoomPreventYn);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (zoomPrevent) {
      html.style.touchAction = "pan-x pan-y";
      body.style.touchAction = "pan-x pan-y";
    } else {
      html.style.touchAction = "auto";
      body.style.touchAction = "auto";
    }

    return () => {
      html.style.touchAction = "auto";
      body.style.touchAction = "auto";
    };
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
