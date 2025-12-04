import { useAccountInfoStore } from "@/app/store/useAccountInfoStore";
import React from "react";

const AccountInfoSection = () => {
  const { title, content, setTitle, setContent, updateMember } = useAccountInfoStore();
  console.log(title, content);
  // const title = "마음 전하실 곳";
  // const content =
  //   "바쁜 일정으로 참석이 어려우신 분들을 위해 소중한 마음을 전달하실 수 있도록 계좌번호를 함께 안내해드립니다.따뜻한 축복에 깊이 감사드립니다.";

  const inputStyle = "outline-0 flex-1 border-[#E0E0E0] border placeholder:text-center rounded-sm text-sm py-1.5 px-1 ";
  const fieldGroup = "flex flex-col gap-2.5 w-full";
  const fieldStyle = "flex flex-wrap items-center";
  const labelStyle = "w-1/6 min-w-[50px]";

  const accountKind = [
    {
      group: "신랑님",
      members: ["신랑님", "아버님", "어머님"]
    },
    {
      group: "신부님",
      members: ["신부님", "아버님", "어머님"]
    }
  ];

  return (
    <div>
      <div className={fieldGroup}>
        <div className={fieldStyle}>
          <div className={labelStyle}>제목</div>
          <input type="text" className={`${inputStyle} max-w-[275px]`} defaultValue={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className={`${fieldStyle} pb-6`}>
          <div className={labelStyle}>소개글</div>
          <textarea
            className={`${inputStyle} h-[104px] resize-none max-w-[275px]`}
            defaultValue={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="border-b border-[#E0E0E0]"></div>
        <ul className="list-disc list-inside pb-2.5">
          <li className="text-[12px] text-[#CACACA]">
            작성하신 정보는 모바일 청첩장에 그대로 반영됩니다. 오기재 하신 사항이 없는지 다시 한 번 확인해주세요.
          </li>
        </ul>
      </div>

      {accountKind.map((groupItem, groupIdx) => (
        <div className={fieldGroup} key={groupIdx}>
          {groupItem.members.map((item, memberIdx) => (
            <div key={memberIdx} className="pb-4">
              <div className="pb-4">{item} 계좌</div>
              <div className="flex flex-col gap-2">
                <div className={fieldStyle}>
                  <div className={`${labelStyle} pl-[35px]`}>예금주</div>
                  <input
                    type="text"
                    className={`${inputStyle} max-w-[150px]`}
                    placeholder="예금주명"
                    onChange={(e) => updateMember(groupIdx, memberIdx, "holder", e.target.value)}
                  />
                </div>
                <div className={fieldStyle}>
                  <div className={`${labelStyle} pl-[35px]`}>계좌정보</div>
                  <div className="flex flex-1 gap-2.5">
                    <input
                      type="text"
                      className={`${inputStyle} max-w-[150px]`}
                      placeholder="은행"
                      onChange={(e) => updateMember(groupIdx, memberIdx, "bank", e.target.value)}
                    />
                    <input
                      type="text"
                      className={`${inputStyle} max-w-[407px]`}
                      placeholder="계좌번호"
                      onChange={(e) => updateMember(groupIdx, memberIdx, "number", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {groupIdx === 0 && memberIdx === 2 && (
                <div className="pt-6">
                  <div className="border-b border-[#E0E0E0]"></div>
                  <ul className="list-disc list-inside pb-2.5 pt-3">
                    <li className="text-[12px] text-[#CACACA]">
                      작성하신 정보는 모바일 청첩장에 그대로 반영됩니다. 오기재 하신 사항이 없는지 다시 한 번 확인해주세요.
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AccountInfoSection;
