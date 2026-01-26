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
  const openNaverMap = () => {
    const address = locationInfo?.address;
    if (!address) return;

    const url = `https://map.naver.com/v5/search/${encodeURIComponent(
      address,
    )}`;
    window.open(url);
  };

  const openKakaoMap = () => {
    const address = locationInfo?.address;
    if (!address) return;

    const url = `https://map.kakao.com/?q=${encodeURIComponent(address)}`;

    window.open(url);
  };

  const openTmap = () => {
    const address = locationInfo?.address;
    if (!address) return;

    const encodedAddr = encodeURIComponent(address);

    const appUrl = `tmap://search?name=${encodedAddr}`;

    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      window.location.href = appUrl;

      setTimeout(() => {
        window.open(`https://www.tmap.co.kr/`, "_blank");
      }, 2000);
    } else {
      window.open(`https://www.tmap.co.kr/`, "_blank");
    }
  };
  const navigationBtn = [
    {
      img: NaverMap,
      name: "네이버지도",
      onClick: openNaverMap,
    },
    {
      img: Tmap,
      name: "티맵",
      onClick: openTmap,
    },
    {
      img: KakaoIconMap,
      name: "카카오맵",
      onClick: openKakaoMap,
    },
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
  }, [locationInfo?.address, lat, lon]);

  const transports = Array.from({ length: 5 }, (_, i) => {
    const idx = i + 1;
    return {
      title:
        locationInfo?.[`transport${idx}Title` as keyof typeof locationInfo],
      message:
        locationInfo?.[`transport${idx}Message` as keyof typeof locationInfo],
    };
  }).filter((t) => t.title || t.message);

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
            <KakaoMap lat={lat} lon={lon} isOpen={true} key={`${lat}-${lon}`} />
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
                onClick={item.onClick}
                className="flex bg-[#FFFFFF] rounded-[5px] cursor-pointer px-3 py-1 gap-1 shadow-[2px_4px_4px_rgba(0,0,0,0.1)]"
                key={idx}
              >
                <Image src={item.img} alt={item.name} />
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </FadeInSection>
        {transports.map((t, idx) => (
          <FadeInSection enabled={isLink} key={idx}>
            <div className="py-3 flex flex-col gap-2">
              {t.title && <span className="font-bold">{t.title}</span>}
              {t.message && (
                <div dangerouslySetInnerHTML={{ __html: t.message }} />
              )}
            </div>
          </FadeInSection>
        ))}
      </div>
    </div>
  );
};

export default LocationInfo;
