import { InvitationMessageSectionType } from "@/app/lib/fetches/invitation/type";
import { useWeddingUpdate } from "@/app/lib/hooks/useWeddingInfoUpdate";
import { useInvitationMessageStore } from "@/app/store/useInvitationMessageStore";
import { useWeddingIdStore } from "@/app/store/useWeddingIdStore";
import { useState } from "react";
import TextEditor from "../../../../../components/editor/TextEditor";

const InvitationMessageSection = () => {
  const invitationInfo = useInvitationMessageStore((s) => s.invitationMessage);
  const updateField = useInvitationMessageStore(
    (s) => s.updateInvitationMessage
  );
  const weddingId = useWeddingIdStore((s) => s.weddingId);

  const [localInvitationInfo, setLocalInvitationInfo] =
    useState<InvitationMessageSectionType>(() => invitationInfo);

  useWeddingUpdate({
    localState: localInvitationInfo,
    storeState: invitationInfo,
    updateStoreField: updateField,
    sectionId: "invitationMessage",
    weddingId: weddingId,
  });

  const groupStyle = "flex flex-col gap-2.5 w-full pt-4";
  const fieldStyle = "flex flex-wrap items-center";
  const labelStyle = "w-1/6 min-w-[50px]";
  const inputStyle =
    "outline-0 flex-1 border-[#E0E0E0] border placeholder:text-center rounded-sm text-sm py-1.5 px-1";

  return (
    <div className={groupStyle}>
      <div className={fieldStyle}>
        <p className={labelStyle}>제목</p>
        <input
          type="text"
          placeholder="초대문구의 제목을 입력해주세요 (최대 50자)"
          className={`${inputStyle} min-w-[50px] max-w-[230px]`}
          value={localInvitationInfo.title}
          maxLength={50}
          onChange={(e) => {
            setLocalInvitationInfo((prev) => ({
              ...prev,
              title: e.target.value,
            }));
          }}
        />
      </div>

      <div className={fieldStyle}>
        <p className={labelStyle}>본문</p>
        <a
          href="https://spangle-produce-63a.notion.site/2ec3207f54ac80a4b084e8851fea6c6c?pvs=143"
          target="_blank"
          className="font-extralight text-xs leading-[26px] tracking-[-0.5px] underline text-[#CACACA]"
        >
          초대문구 예시 보러가기
        </a>
      </div>

      <TextEditor
        message={localInvitationInfo.message}
        onUpdateMessage={(message) => {
          setLocalInvitationInfo((prev) => ({ ...prev, message: message }));
        }}
      />
    </div>
  );
};

export default InvitationMessageSection;
