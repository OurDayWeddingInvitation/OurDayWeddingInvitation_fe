import Header from "@/app/components/Header";
import { ContentBase } from "@/app/types/content";
import Card from "./components/card/Card";

export default function DashboardView() {
  //page쪽에서 받은 데이터로 zustand세팅 쫙해야함

  // TODO: API 연동 후 useState에 저장해서 사용
  const MOCK_CONTENT_DATA: ContentBase = {
    weddingId: 1,
    weddingTitle: "누군가의 청첩장",
    mainImageUrl: "/test-img.png",
  };

  return (
    <>
      <Header />
      <div className="flex flex-row max-w-[1200px] mx-auto h-dvh justify-center items-center pt-17.5 select-none">
        <Card content={MOCK_CONTENT_DATA} />
      </div>
    </>
  );
}
