"use client";

import { useEffect, useRef, useState } from "react";

export default function VideoSection({ parentRef }: { parentRef: any }) {
  const videoSectionRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const container = videoSectionRef.current;
    const video = videoRef.current;
    const parent = parentRef.current;

    if (!container || !video || !parent) return;

    const onLoaded = () => {
      setDuration(video.duration);
      video.pause();
      video.currentTime = 0;
    };

    video.addEventListener("loadedmetadata", onLoaded);

    const onScroll = () => {
      if (duration === 0) return;

      const scrollTop = container.scrollTop;
      const maxScroll = container.scrollHeight - container.clientHeight;

      const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
      video.currentTime = duration * progress;
    };

    container.addEventListener("scroll", onScroll);

    // 🔥 내부 섹션 스크롤 끝 → 부모 스크롤로 전달
    const onWheel = (e: WheelEvent) => {
      const scrollTop = container.scrollTop;
      const maxScroll = container.scrollHeight - container.clientHeight;

      const atBottom = scrollTop >= maxScroll;
      const atTop = scrollTop <= 0;

      // 아래로 스크롤 (영상 섹션 끝 → 부모로 스크롤 이동)
      if (atBottom && e.deltaY > 0) {
        e.preventDefault();
        parent.scrollBy({ top: e.deltaY, behavior: "smooth" });
      }

      // 위로 스크롤 (영상 섹션 시작 → 부모 위로 이동)
      if (atTop && e.deltaY < 0) {
        e.preventDefault();
        parent.scrollBy({ top: e.deltaY, behavior: "smooth" });
      }
    };

    container.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      container.removeEventListener("scroll", onScroll);
      container.removeEventListener("wheel", onWheel);
    };
  }, [duration, parentRef]);

  return (
    <div
      ref={videoSectionRef}
      style={{
        height: "600px",
        overflowY: "scroll",
        position: "relative",

        /* 🔥 스크롤바 숨기기 */
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // IE
      }}
      className="[&::-webkit-scrollbar]:hidden" // Chrome/Safari
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100%",
          zIndex: 10,
          background: "black",
        }}
      >
        <video
          ref={videoRef}
          src="/testvideo.mp4"
          muted
          playsInline
          preload="auto"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* 스크롤 공간 */}
      <div style={{ height: "1200px" }} />
    </div>
  );
}
