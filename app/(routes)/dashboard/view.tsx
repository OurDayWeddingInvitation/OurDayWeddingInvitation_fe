import Header from "@/app/components/Header";
import Card from "./components/card/Card";

export default function DashboardView() {
  //page쪽에서 받은 데이터로 zustand세팅 쫙해야함
  return (
    <>
      <Header />
      <div className="flex flex-row max-w-[1200px] mx-auto h-dvh justify-center items-center pt-17.5 select-none">
        <Card />
      </div>
    </>
  );
}
