"use client";

import Header from "@/app/components/Header";
import Image from "next/image";
import ToggleImg from "@/app/assets/images/toggle-icon.svg";
import Preview from "../components/preview/preview";
import Form from "../components/form/Form";
import { InvitationDetail } from "@/app/lib/fetches/invitation/type";
import { useWeddingInfoStoreTest } from "@/app/store/useWeddingInfoStoreTest";
import { useEffect } from "react";
import { useFamilyInfoStore } from "@/app/store/useFamilyInfoStore";
import { useAccountInfoStoreTest } from "@/app/store/useAccountInfoStoreTest";
import { useInvitationMessageStoreTest } from "@/app/store/useInvitationMessageStoreTest";

export default function InvitationView({
  invitationDetail,
}: {
  invitationDetail: InvitationDetail;
}) {
  const setWeddingInfo = useWeddingInfoStoreTest((s) => s.setWeddingInfo);
  const setFamilyInfo = useFamilyInfoStore((s) => s.setFamilyInfo);
  const setAccountInfo = useAccountInfoStoreTest((s) => s.setAccountInfo);
  const setInvitationMessage = useInvitationMessageStoreTest(
    (s) => s.setInvitationMessage
  );

  useEffect(() => {
    if (invitationDetail?.sections?.weddingInfo) {
      setWeddingInfo(invitationDetail?.sections?.weddingInfo);
    }
    if (invitationDetail?.sections?.familyInfo) {
      setFamilyInfo(invitationDetail?.sections?.familyInfo);
    }
    if (invitationDetail?.sections?.accountInfo) {
      setAccountInfo(invitationDetail?.sections?.accountInfo);
    }
    if (invitationDetail?.sections?.invitationMessage) {
      setInvitationMessage(invitationDetail?.sections?.invitationMessage);
    }
  }, [invitationDetail]);

  return (
    <>
      <Header showButton={true} showSaveText={true} showTitle={true} />
      <div className="max-w-[1200px] py-27 flex mx-auto items-start gap-[52px] relative">
        <div className="max-w-[400px] fixed w-full">
          <Preview />
          <ul className="py-[26px] text-[#817E7C] text-[14px]  list-disc ">
            <li>
              미리보기는 단순 참고용으로, 정확한 시안은 적용하기 버튼을 눌러
              저장 후 확인해주세요.
            </li>
          </ul>
        </div>
        <div className="flex-1 max-w-[736px] absolute right-0 w-full pb-[50px]">
          <ul className="text-[#817E7C] text-[14px] px-4 list-disc list-inside w-full">
            <li>
              <span className="bg-[#FFFFFF] rounded-[5px] p-0.5">⠿</span>
              &nbsp;모양이 있는 메뉴는 드래그하여 순서를 변경할 수 있습니다.
            </li>
            <li>
              <Image
                src={ToggleImg}
                alt="토글버튼 아이콘"
                className="inline-block align-middle"
              />
              <span className="align-middle">
                &nbsp;버튼으로 각 메뉴의 사용 여부를 설정할 수 있습니다.
              </span>
            </li>
          </ul>
          <Form />
        </div>
      </div>
    </>
  );
}
