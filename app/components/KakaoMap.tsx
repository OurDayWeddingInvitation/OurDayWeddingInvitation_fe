import Script from "next/script";
import { useEffect, useRef, useState } from "react";

export default function KakaoMap({ lat, lon, isOpen }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef(null);
  const markerInstance = useRef(null);
  const [sdkLoaded, setSdkLoaded] = useState(false);

  const initMap = () => {
    if (!window.kakao || !window.kakao.maps) return;

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
    if (!sdkLoaded) return;
    if (!mapRef.current) return;

    setTimeout(() => {
      initMap();
    }, 50);
  }, [sdkLoaded, isOpen]);

  useEffect(() => {
    if (window.kakao?.maps) {
      setTimeout(() => setSdkLoaded(true), 0);
    }
  }, []);

  return (
    <>
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false&libraries=services`}
        onLoad={() => {
          window.kakao.maps.load(() => {
            setSdkLoaded(true);
          });
        }}
        strategy="afterInteractive"
      />

      <div ref={mapRef} className="w-full h-[359px]" />
    </>
  );
}
