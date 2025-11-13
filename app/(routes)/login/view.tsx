"use client";

import Header from "@/app/components/Header";
import NaverIcon from "@/app/assets/icons/naver.svg";
import Image from "next/image";

export default function LoginView() {
  const getNaverLoginUrl = () => {
    const clientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
    const redirectUri = encodeURIComponent(
      `http://localhost:3000/api/auth/naver/callback`
    );
    const state = crypto.randomUUID();

    return `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;
  };
  return (
    <>
      <Header showButton={false} showSaveText={false} showTitle={false} />
      <div className="flex w-full h-screen items-center justify-center overflow-hidden">
        <div
          onClick={() => {
            window.location.href = getNaverLoginUrl();
          }}
          className="flex items-center justify-center w-60 h-[52px] bg-[#03C75A] rounded-[5px] cursor-pointer gap-2"
        >
          <Image src={NaverIcon} alt="naver" width={36} height={36} />
          <p className="font-bold text-base text-white">네이버 로그인</p>
        </div>
      </div>
    </>
  );
}
