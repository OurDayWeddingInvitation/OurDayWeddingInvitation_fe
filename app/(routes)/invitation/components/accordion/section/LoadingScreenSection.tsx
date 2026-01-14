import LoadingStyle1 from "@/app/assets/images/loading1.svg";
import LoadingStyle2 from "@/app/assets/images/loading2.svg";
import CheckButton from "@/app/components/CheckButton";
import { clientFetchApi } from "@/app/lib/fetches/client";
import { useLoadingScreenStore } from "@/app/store/useLoadingScreenStore";
import { useWeddingIdStore } from "@/app/store/useWeddingIdStore";
import Image from "next/image";
import { useEffect, useState } from "react";

type LoadingStyleItem = {
  title: string;
  url: string;
};

const LoadingScreenSection = () => {
  const weddingId = useWeddingIdStore((s) => s.weddingId);
  const loadingScreenStyle = useLoadingScreenStore((s) => s.loadingScreenStyle);
  const setLoadingScreenStyle = useLoadingScreenStore(
    (s) => s.setLoadingScreenStyle
  );

  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const loadingStyleArr = [
    { title: "type1", url: LoadingStyle1 },
    { title: "type2", url: LoadingStyle2 },
  ];

  // 로딩 스타일 선택 핸들러
  const handleClick = async (item: LoadingStyleItem, idx: number) => {
    try {
      const nextIdx = selectedIdx === idx ? null : idx;

      setSelectedIdx(nextIdx);
      setLoadingScreenStyle({ design: item.title });

      await clientFetchApi({
        endPoint: `/weddings/update`,
        method: "PATCH",
        body: {
          weddingId: weddingId,
          sectionId: "loadingScreen",
          updated: { design: item.title },
        },
      });
    } catch (error) {
      console.error("Error updating loading screen style");
    }
  };

  // 초기 selectedIdx 세팅
  useEffect(() => {
    if (!loadingScreenStyle) {
      setSelectedIdx(null);
      return;
    }

    const foundIndex = loadingStyleArr.findIndex(
      (item) => item.title === loadingScreenStyle.design
    );

    if (foundIndex !== -1) {
      setSelectedIdx(foundIndex);
    }
  }, [loadingScreenStyle]);

  return (
    <div>
      <h3 className="text-[15px] py-3.5">로딩 스타일</h3>
      <div className="flex gap-[18px]">
        {loadingStyleArr.map((item, idx) => (
          <div
            key={idx}
            className="relative cursor-pointer"
            onClick={() => handleClick(item, idx)}
          >
            <Image src={item.url} alt="로딩스타일" />
            <CheckButton
              isChecked={selectedIdx === idx}
              onClick={(e: Event) => {
                e.stopPropagation();
                handleClick(item, idx);
              }}
            />
          </div>
        ))}
      </div>
      <div className="border-t border-[#E0E0E0] my-[30px]"></div>
      <ul className="text-[12px] text-[#CACACA] list-disc list-inside">
        <li>
          로딩 화면은 미리보기 화면에서 보이지 않습니다. 적용하기 후 링크에서
          직접 확인해주세요.
        </li>
      </ul>
    </div>
  );
};

export default LoadingScreenSection;
