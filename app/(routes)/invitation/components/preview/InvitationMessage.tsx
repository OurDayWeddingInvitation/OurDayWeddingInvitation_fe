import { useInvitationMessageStore } from "@/app/store/useInvitationMessageStore";

const InvitationMessage = () => {
  const invitationMessage = useInvitationMessageStore(
    (s) => s.invitationMessage
  );

  return (
    <div className="flex flex-col items-center px-5 py-7.5">
      <p className="font-[NanumMyeongjo] font-extrabold text-xs leading-[100%] tracking-[0.375rem] text-[#D28BB3] pb-2.5">
        INVITATION
      </p>
      <p className="font-[NanumMyeongjo] font-bold text-base leading-[100%] pb-10 text-center">
        {invitationMessage?.title}
      </p>
      <div
        className="w-full"
        dangerouslySetInnerHTML={{ __html: invitationMessage?.message }}
      ></div>
    </div>
  );
};

export default InvitationMessage;
