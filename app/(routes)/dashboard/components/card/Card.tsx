"use client";

import LetterImg from "@/app/assets/images/letter.png";
import { clientFetchApi } from "@/app/lib/fetches/client";
import { Invitation } from "@/app/lib/fetches/invitation/type";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Card({ invitation }: { invitation?: Invitation }) {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-1">
      <p className="pl-3 text-sm text-[#CACACA]">
        {invitation?.weddingTitle ?? "이름생성 전"}
      </p>
      <div className="relative flex flex-col items-center justify-end w-62.5 h-100 overflow-hidden bg-white rounded-2xl border border-[#C8C8C8] pb-6 shadow-[2px_4px_4px_0px_#0000001A]">
        {!invitation ? (
          <>
            <Image
              src={LetterImg}
              alt="letter"
              className="w-16.5 h-auto object-contain pt-34 pb-[3.688rem]"
            />

            <p className="text-xs font-medium text-center text-[#817E7C] pb-5">
              아직 비어있는 우리의 청첩장을
              <br />
              간편하게 완성시켜보세요
            </p>
          </>
        ) : (
          invitation?.mainImageUrl && (
            <Image
              src={invitation.mainImageUrl}
              alt="main image"
              fill
              className="object-cover"
            />
          )
        )}

        <button
          className="flex items-center justify-center w-49 h-10 bg-[#D4C6B7] rounded-sm font-semibold text-sm text-[#433F3B] active:scale-95 cursor-pointer focus:outline-none z-999"
          onClick={async () => {
            router.push(`/invitation/${invitation.weddingId}`);
          }}
        >
          청첩장 꾸미기
        </button>
      </div>
    </div>
  );
}
