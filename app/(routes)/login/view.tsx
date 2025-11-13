import Header from "@/app/components/Header";
import NaverIcon from "@/app/assets/icons/naver.svg";
import Image from "next/image";

export default function LoginView() {
  //page쪽에서 받은 데이터로 zustand세팅 쫙해야함
  return (
    <>
      <Header showButton={false} showSaveText={false} showTitle={false} />
      <div className="flex w-full h-screen items-center justify-center overflow-hidden">
        <div className="flex items-center justify-center w-60 h-[52px] bg-[#03C75A] rounded-[5px] cursor-pointer gap-2">
          <Image src={NaverIcon} alt="naver" width={24} height={24} />
          <p className="font-bold text-base text-white">네이버 로그인</p>
        </div>
      </div>
    </>
  );
}
