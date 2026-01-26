import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { useWeddingIdStore } from "../store/useWeddingIdStore";

export default function KakaoMap({
  lat,
  lon,
  isOpen,
}: {
  lat: number;
  lon: number;
  isOpen?: boolean;
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef(null);
  const markerInstance = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const weddingId = useWeddingIdStore((s) => s.weddingId);

  // SDK 상태를 강제로 체크하는 로직
  useEffect(() => {
    const checkInterval = setInterval(() => {
      if (window.kakao && window.kakao.maps && window.kakao.maps.LatLng) {
        // LatLng이 존재하면 load 콜백을 한 번 더 실행해서 확실히 초기화
        window.kakao.maps.load(() => {
          setIsReady(true);
          clearInterval(checkInterval);
        });
      }
    }, 100);

    return () => clearInterval(checkInterval);
  }, []);

  useEffect(() => {
    if (!isReady || !isOpen || !mapRef.current) return;

    const timeoutId = setTimeout(() => {
      const center = new window.kakao.maps.LatLng(lat, lon);

      if (!mapInstance.current) {
        // 지도 첫 생성
        const map = new window.kakao.maps.Map(mapRef.current, {
          center,
          level: 3,
        });
        map.setDraggable(false);
        map.setZoomable(false);

        const marker = new window.kakao.maps.Marker({
          position: center,
          map: map,
        });
        mapInstance.current = map;
        markerInstance.current = marker;
      } else {
        // 이미 있으면 위치만 조정
        mapInstance.current.relayout();
        mapInstance.current.setCenter(center);
        markerInstance.current.setPosition(center);
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [isReady, isOpen, lat, lon, weddingId]);

  return (
    <>
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`}
        strategy="afterInteractive"
        onLoad={() => {
          window.kakao.maps.load(() => setIsReady(true));
        }}
      />

      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "359px",
          // display: isOpen ? "block" : "none",
        }}
      />
    </>
  );
}
