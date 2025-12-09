import Script from "next/script";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function KakaoMap({ lat, lon, isOpen }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef(null);
  const markerInstance = useRef(null);

  const initMap = () => {
    if (!mapRef.current) return;

    const center = new window.kakao.maps.LatLng(lat, lon);

    mapInstance.current = new window.kakao.maps.Map(mapRef.current, {
      center,
      level: 3,
      draggable: false
    });

    markerInstance.current = new window.kakao.maps.Marker({
      position: center,
      map: mapInstance.current
      // title: "선택 위치"
    });
  };

  useEffect(() => {
    if (mapInstance.current && markerInstance.current) {
      const newCenter = new window.kakao.maps.LatLng(lat, lon);
      mapInstance.current.setCenter(newCenter);
      markerInstance.current.setPosition(newCenter);
    }
  }, [lat, lon, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        initMap();
      }, 50);
    }
  }, [isOpen]);

  return (
    <>
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false&libraries=services`}
        onLoad={() => {
          window.kakao.maps.load(initMap);
        }}
        strategy="afterInteractive"
      />
      <div ref={mapRef} className="w-full h-[359px]" />
    </>
  );
}
