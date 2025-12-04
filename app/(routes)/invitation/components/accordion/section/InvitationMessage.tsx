import { useMessageStore } from "@/app/store/useInvitaionMessageStore";
import TextEditor from "../../../../../components/editor/TextEditor";

const InvitationMessage = () => {
  const { invitationTitle, setInvitatinoTitle } = useMessageStore();

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
          value={invitationTitle}
          maxLength={50}
          onChange={(e) => {
            setInvitatinoTitle(e.target.value);
          }}
        />
      </div>

      <div className={fieldStyle}>
        <p className={labelStyle}>본문</p>
        <a
          href=""
          target="_blank"
          className="font-extralight text-xs leading-[26px] tracking-[-0.5px] underline text-[#CACACA]"
        >
          초대문구 예시 보러가기
        </a>
      </div>

      <TextEditor />
    </div>
  );
};

export default InvitationMessage;
