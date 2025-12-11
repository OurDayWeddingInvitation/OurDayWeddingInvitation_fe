import TextEditor from "@/app/components/editor/TextEditor";
import KakaoMap from "@/app/components/KakaoMap";
import SelectBox from "@/app/components/SelectBox";
import { trafficOption } from "@/app/lib/constants/select";
import { LocationInfoSectionType } from "@/app/lib/fetches/invitation/type";
import { useWeddingUpdate } from "@/app/lib/hooks/useWeddingInfoUpdate";
import { useLocationInfoStore } from "@/app/store/useLocationInfoStore";
import React, { useState, useEffect } from "react";

const LocationInfoSection = ({ isOpen }) => {
  const inputStyle = "outline-0 flex-1 border-[#E0E0E0] border placeholder:text-center rounded-sm text-sm py-1.5 px-1";
  const labelStyle = "w-1/7 min-w-[60px]";
  const [lat, setLat] = useState<number>(0);
  const [lon, setLon] = useState<number>(0);
  const [trafficBlocks, setTrafficBlocks] = useState([0]);
  const locationInfo = useLocationInfoStore((s) => s.locationInfo);
  const updateField = useLocationInfoStore((s) => s.updateLocationInfoField);
  const [localInfo, setLocalInfo] = useState<LocationInfoSectionType>(() => locationInfo);

  const openPost = () => {
    new window.daum.Postcode({
      oncomplete: async (data) => {
        setLocalInfo((prev) => ({
          ...prev,
          address: data.address
        }));
      }
    }).open();
  };

  useEffect(() => {
    if (!localInfo.address) return;

    const fetchPosition = async () => {
      const res = await fetch(`/api/invitation/geocode?address=${encodeURIComponent(localInfo.address)}`);
      const data = await res.json();

      if (!data.documents || data.documents.length === 0) return;

      const { x, y } = data.documents[0];
      setLat(parseFloat(y));
      setLon(parseFloat(x));
    };

    fetchPosition();
  }, [localInfo.address]);

  useWeddingUpdate({
    localState: localInfo,
    storeState: locationInfo,
    updateStoreField: updateField,
    sectionId: "locationInfo",
    weddingId: "8c00934e-f7e6-4f33-a91b-40adce0c9acf"
  });

  return (
    <div>
      <div className="flex items-center gap-2.5 pb-3">
        <div className={labelStyle}>예식장 주소</div>
        <input type="text" className={inputStyle} value={localInfo.address} onClick={openPost} readOnly />
        <input
          type="text"
          className={inputStyle}
          placeholder="(옵션) 필요 시 상세 주소 입력"
          value={localInfo.addressDetail}
          onChange={(e) =>
            setLocalInfo((prev) => ({
              ...prev,
              addressDetail: e.target.value
            }))
          }
        />
        <button className="bg-[#D2BEA9] text-[#FFFFFF] font-light px-5 py-2 rounded-sm cursor-pointer" onClick={openPost}>
          주소 검색
        </button>
      </div>

      <div className="px-4">
        <p className="text-[#CACACA] text-[12px] pb-4">주소 검색을 통해 예식장 주소를 입력해주세요.</p>
        <KakaoMap lat={lat} lon={lon} isOpen={isOpen} />
      </div>

      <div className="border-t border-[#E0E0E0]"></div>

      {trafficBlocks.map((item, idx) => {
        const trafficKey = `transport${idx + 1}Title`;
        const value = localInfo[trafficKey];
        return (
          <div className="py-9" key={idx}>
            <h3>
              <span className="text-[#D2BEA9]">#{idx + 1}</span> 교통수단
            </h3>
            <div className="flex items-center py-5">
              <div className={labelStyle}>교통수단</div>
              <SelectBox
                selectOption={trafficOption}
                initialValue={value}
                onChange={(val: string) => {
                  const key = `transport${idx + 1}Title`;
                  setLocalInfo((prev) => ({
                    ...prev,
                    [key]: val
                  }));
                }}
                kind="traffic"
              />
            </div>
            <div className="py-3">내용</div>
            <TextEditor />
          </div>
        );
      })}

      {trafficBlocks.length === 1 && (
        <div className="block text-center">
          <button
            className="bg-[#D2BEA9] text-[#FFFFFF] font-light px-5 py-2 rounded-sm cursor-pointer"
            onClick={() => {
              setTrafficBlocks((prev) => [...prev, prev.length]);
              setLocalInfo((prev) => ({
                ...prev,
                transport2Title: "지하철"
              }));
            }}
          >
            교통수단 추가
          </button>
        </div>
      )}
    </div>
  );
};

export default LocationInfoSection;
