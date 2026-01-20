import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { ChevronDown, Copy } from "lucide-react";
import { useAccountInfoStoreTest } from "@/app/store/useAccountInfoStoreTest";
import { Divider } from "@/app/components/common/Divider";
import { useThemeFontStore } from "@/app/store/useThemeFontStore";
import { useWeddingInfoStore } from "@/app/store/useWeddingInfoStore";
const AccountInfo = () => {
  const themeFont = useThemeFontStore((s) => s.themeFont);
  const accountInfo = useAccountInfoStoreTest((s) => s.accountInfo);
  const weddingInfo = useWeddingInfoStore((s) => s.weddingInfo);

  const isGroomFirst = weddingInfo?.nameOrderType === "G";

  const accountGroups = [
    {
      key: "groom",
      title: "신랑측",
      titleColor: "#405A78",
      borderColor: "#D2DAE4",
      chevronColor: "#7F8EA0",
      accounts: [
        {
          label: "신랑님",
          holder: accountInfo?.groomHolder,
          bank: accountInfo?.groomBankName,
          number: accountInfo?.groomNumber,
        },
        {
          label: "아버지",
          holder: accountInfo?.groomFatherHolder,
          bank: accountInfo?.groomFatherBankName,
          number: accountInfo?.groomFatherNumber,
        },
        {
          label: "어머니",
          holder: accountInfo?.groomMotherHolder,
          bank: accountInfo?.groomMotherBankName,
          number: accountInfo?.groomMotherNumber,
        },
      ],
    },
    {
      key: "bride",
      title: "신부측",
      titleColor: "#A14D62",
      borderColor: "#D7AEB9",
      chevronColor: "#C98898",
      accounts: [
        {
          label: "신부님",
          holder: accountInfo?.brideHolder,
          bank: accountInfo?.brideBankName,
          number: accountInfo?.brideNumber,
        },
        {
          label: "아버지",
          holder: accountInfo?.brideFatherHolder,
          bank: accountInfo?.brideFatherBankName,
          number: accountInfo?.brideFatherNumber,
        },
        {
          label: "어머니",
          holder: accountInfo?.brideMotherHolder,
          bank: accountInfo?.brideMotherBankName,
          number: accountInfo?.brideMotherNumber,
        },
      ],
    },
  ];
  const orderedAccountInfo = isGroomFirst
    ? accountGroups
    : [...accountGroups].reverse();

  const handleCopy = (value: string) => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        alert("계좌번호가 복사되었습니다.😉");
      })
      .catch(() => {
        alert("계좌번호 복사에 실패했습니다.🥲");
      });
  };

  return (
    <div className="bg-[#FFFFFF] py-10">
      <div className="text-center">
        <div
          className="tracking-[4px] pb-3"
          style={{ color: themeFont?.accentColor }}
        >
          ACCOUNT
        </div>
        <p className="pb-2.5 font-bold">{accountInfo?.title}</p>
        <p className="leading-loose max-w-[270px] m-auto word-break:keep-all pb-10">
          {accountInfo?.message}
        </p>
      </div>
      <div className="flex flex-col gap-2 px-5">
        <Accordion type="multiple" className="flex flex-col gap-2">
          {orderedAccountInfo.map((group, idx) => (
            <AccordionItem
              key={idx}
              value={group.key}
              className="bg-[#FFFFFF] border rounded-[10px] py-3 px-5"
              style={{ borderColor: group.borderColor }}
            >
              <AccordionTrigger className="cursor-pointer flex justify-between w-full group">
                <div className="font-bold" style={{ color: group.titleColor }}>
                  {group.title}
                </div>
                <ChevronDown
                  className="transition-transform duration-300 group-data-[state=open]:-rotate-180"
                  color={group.chevronColor}
                />
              </AccordionTrigger>

              <AccordionContent className="py-4 flex flex-col gap-2">
                {group.accounts.map((acc, idx) => (
                  <React.Fragment key={idx}>
                    <div className="flex gap-1">
                      <h3>{acc.label}</h3>
                      <span>{acc.holder}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <p>{`${acc.bank ?? ""} ${acc.number ?? ""}`}</p>
                      <span
                        className="p-2 rounded-full shadow-[2px_4px_4px_rgba(0,0,0,0.1)] cursor-pointer"
                        onClick={() => handleCopy(acc.number ?? "")}
                      >
                        <Copy color="#CACACA" size={16} />
                      </span>
                    </div>

                    {idx !== group.accounts.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default AccountInfo;
