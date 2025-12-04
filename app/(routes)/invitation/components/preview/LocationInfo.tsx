import React from "react";
import { useColorFontStore } from "@/app/store/useColorFontStore";
import { MapPin } from "lucide-react";
import NaverMap from "@/app/assets/icons/navermap.svg";
import KakaoMap from "@/app/assets/icons/kakaomap.svg";
import Tmap from "@/app/assets/icons/tmap.svg";
import Image from "next/image";

const LocationInfo = () => {
  const { pointColor, themeColor } = useColorFontStore();
  const navigationBtn = [
    { img: NaverMap, name: "네이버지도" },
    { img: Tmap, name: "티맵" },
    { img: KakaoMap, name: "카카오맵" }
  ];
  return (
    <div className="py-10">
      <div className="text-center bg-[#FFFFFF]" style={{ backgroundColor: themeColor }}>
        <div className="tracking-[4px] text-[12px] pb-3 " style={{ color: pointColor }}>
          LOCATION
        </div>
        <span className="font-bold">오시는 길</span>
        <p className="flex justify-center py-5 gap-1">
          <MapPin color="#D28BB3" />
          <span>서울 강서구 강서로 388</span>
        </p>
        <div className="pb-5">{/* 지도 이미지 */}</div>
      </div>
      <div className="px-4">
        <div className="pb-3 flex flex-col gap-3">
          <span className="text-[14px] font-bold">내비게이션</span>
          <p>버튼을 누르면 앱에서 길안내가 시작됩니다.</p>
        </div>

        <div className="flex gap-3 justify-center border-b border-[#E0E0E0] pb-6">
          {navigationBtn.map((item, idx) => (
            <button className="flex bg-[#FFFFFF] rounded-[5px] cursor-pointer px-3 py-1 gap-1  shadow-[2px_4px_4px_rgba(0,0,0,0.1)]" key={idx}>
              <Image src={item.img} alt={item.name} />
              <span>{item.name}</span>
            </button>
          ))}
        </div>

        <div className="py-3 flex flex-col gap-2">
          <span className="text-[14px] font-bold">지하철</span>
          <div>
            <p>· 5호선 발산역 3번 출구 방향 1분 이내</p>
            <p>· 9호선 양천향교역 6번 출구 도보 10분 직진</p>
          </div>
        </div>

        <div className="pb-3 flex flex-col gap-2">
          <span className="text-[14px] font-bold">버스</span>
          <div>
            <p>지선버스 6630, 6632, 6642, 6645, 6648, 6657, 6712</p>
            <p>간선버스 601, 605, 652, 654, 661</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationInfo;
