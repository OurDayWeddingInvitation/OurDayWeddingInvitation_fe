import React, { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import NaverMap from "@/app/assets/icons/navermap.svg";
import KakaoIconMap from "@/app/assets/icons/kakaomap.svg";
import Tmap from "@/app/assets/icons/tmap.svg";
import Image from "next/image";
import { useThemeFontStore } from "@/app/store/useThemeFontStore";
import { useLocationInfoStore } from "@/app/store/useLocationInfoStore";
import KakaoMap from "@/app/components/KakaoMap";
import { FadeInSection } from "../FadeInSection";

const LocationInfo = ({ isLink }: { isLink: boolean }) => {
  const themeFont = useThemeFontStore((s) => s.themeFont);
  const locationInfo = useLocationInfoStore((s) => s.locationInfo);
  const [lat, setLat] = useState<number>(0);
  const [lon, setLon] = useState<number>(0);

  const navigationBtn = [
    { img: NaverMap, name: "네이버지도" },
    { img: Tmap, name: "티맵" },
    { img: KakaoIconMap, name: "카카오맵" },
  ];

  useEffect(() => {
    if (!locationInfo?.address) return;

    const fetchPosition = async () => {
      const res = await fetch(
        `/api/invitation/geocode?address=${encodeURIComponent(
          locationInfo?.address,
        )}`,
      );
      const data = await res.json();

      if (!data.documents || data.documents.length === 0) return;

      const { x, y } = data.documents[0];
      setLat(parseFloat(y));
      setLon(parseFloat(x));
    };

    fetchPosition();
  }, [locationInfo?.address]);

  return (
    <div className="py-10 bg-[#FFFFFF]">
      <div className="text-center">
        <FadeInSection enabled={isLink}>
          <div
            className="tracking-[4px] pb-3"
            style={{ color: themeFont?.accentColor }}
          >
            LOCATION
          </div>
        </FadeInSection>
        <FadeInSection enabled={isLink}>
          <span className="font-bold">오시는 길</span>
          <p className="flex justify-center py-5 gap-1">
            <MapPin style={{ color: themeFont?.accentColor }} />
            <span>{locationInfo?.address}</span>
          </p>
        </FadeInSection>
        <FadeInSection enabled={isLink}>
          <div className="pb-5">
            <KakaoMap lat={lat} lon={lon} isOpen={true} />
          </div>
        </FadeInSection>
      </div>
      <div className="px-3">
        <FadeInSection enabled={isLink}>
          <div className="pb-3 flex flex-col gap-3">
            <span className="font-bold">내비게이션</span>
            <p>버튼을 누르면 앱에서 길안내가 시작됩니다.</p>
          </div>

          <div className="flex gap-3 justify-center border-b border-[#E0E0E0] pb-6">
            {navigationBtn.map((item, idx) => (
              <button
                className="flex bg-[#FFFFFF] rounded-[5px] cursor-pointer px-3 py-1 gap-1 shadow-[2px_4px_4px_rgba(0,0,0,0.1)]"
                key={idx}
              >
                <Image src={item.img} alt={item.name} />
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </FadeInSection>
        <FadeInSection enabled={isLink}>
          <div className="py-3 flex flex-col gap-2">
            <span className="font-bold">지하철</span>
            <div>
              <p>· 5호선 발산역 3번 출구 방향 1분 이내</p>
              <p>· 9호선 양천향교역 6번 출구 도보 10분 직진</p>
            </div>
          </div>
        </FadeInSection>
        <FadeInSection enabled={isLink}>
          <div className="pb-3 flex flex-col gap-2">
            <span className="font-bold">버스</span>
            <div>
              <p>지선버스 6630, 6632, 6642, 6645, 6648, 6657, 6712</p>
              <p>간선버스 601, 605, 652, 654, 661</p>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};

export default LocationInfo;
