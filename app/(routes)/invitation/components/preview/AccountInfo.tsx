import React from "react";
import { useColorFontStore } from "@/app/store/useColorFontStore";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { ChevronDown, Copy } from "lucide-react";
import { useAccountInfoStoreTest } from "@/app/store/useAccountInfoStoreTest";
import { Divider } from "@/app/components/common/Divider";

const AccountInfo = () => {
  const { pointColor } = useColorFontStore();
  const accountInfo = useAccountInfoStoreTest((s) => s.accountInfo);

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
    <div className="bg-[#FFFFFF] py-20">
      <div className="text-center">
        <div
          className="tracking-[4px] text-[12px] pb-3"
          style={{ color: pointColor }}
        >
          ACCOUNT
        </div>
        <p className="pb-2.5 font-bold">{accountInfo?.title}</p>
        <p className="text-[14px] leading-loose max-w-[270px] m-auto word-break:keep-all pb-10">
          {accountInfo?.message}
        </p>
      </div>
      {/* const isGroom = groupIdx === 0; const border = isGroom ? "#D2DAE4" :
      "#D7AEB9"; const color = isGroom ? "#7F8EA0" : "#C98898"; const fontColor
      = isGroom ? "#405A78" : "#A14D62"; */}
      <div className="flex flex-col gap-2 px-5">
        <Accordion type="multiple" className="flex flex-col gap-2">
          <AccordionItem
            value="item-0"
            className="bg-[#FFFFFF] border rounded-[10px] py-3 px-5"
            style={{ borderColor: "#D2DAE4" }}
          >
            <AccordionTrigger className="cursor-pointer flex justify-between w-full group">
              <div className="font-bold" style={{ color: "#405A78" }}>
                신랑측
              </div>
              <ChevronDown
                className="transition-transform duration-300 group-data-[state=open]:-rotate-180"
                color="#7F8EA0"
              />
            </AccordionTrigger>

            <AccordionContent className="py-4 flex flex-col gap-2">
              <div className="flex gap-1">
                <h3>신랑님</h3>
                <span>{accountInfo?.groomHolder}</span>
              </div>
              <div className="flex justify-between items-center">
                <p>{`${accountInfo?.groomBankName ?? ""} ${
                  accountInfo?.groomNumber ?? ""
                }`}</p>
                <span
                  className="p-2 rounded-full shadow-[2px_4px_4px_rgba(0,0,0,0.1)] cursor-pointer"
                  onClick={() => handleCopy(accountInfo?.groomNumber ?? "")}
                >
                  <Copy color="#CACACA" size={16} />
                </span>
              </div>
              <Divider />
              <div className="flex gap-1">
                <h3>아버지</h3>
                <span>{accountInfo?.groomFatherHolder}</span>
              </div>
              <div className="flex justify-between items-center">
                <p>{`${accountInfo?.groomFatherBankName ?? ""} ${
                  accountInfo?.groomFatherNumber ?? ""
                }`}</p>
                <span
                  className="p-2 rounded-full shadow-[2px_4px_4px_rgba(0,0,0,0.1)] cursor-pointer"
                  onClick={() =>
                    handleCopy(accountInfo?.groomFatherNumber ?? "")
                  }
                >
                  <Copy color="#CACACA" size={16} />
                </span>
              </div>
              <Divider />
              <div className="flex gap-1">
                <h3>어머니</h3>
                <span>{accountInfo?.groomMotherHolder}</span>
              </div>
              <div className="flex justify-between items-center">
                <p>{`${accountInfo?.groomMotherBankName ?? ""} ${
                  accountInfo?.groomMotherNumber ?? ""
                }`}</p>
                <span
                  className="p-2 rounded-full shadow-[2px_4px_4px_rgba(0,0,0,0.1)] cursor-pointer"
                  onClick={() =>
                    handleCopy(accountInfo?.groomMotherNumber ?? "")
                  }
                >
                  <Copy color="#CACACA" size={16} />
                </span>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="multiple" className="flex flex-col gap-2">
          <AccordionItem
            value="item-0"
            className="bg-[#FFFFFF] border rounded-[10px] py-3 px-5"
            style={{ borderColor: "#D7AEB9" }}
          >
            <AccordionTrigger className="cursor-pointer flex justify-between w-full group">
              <div className="font-bold" style={{ color: "#A14D62" }}>
                신부측
              </div>
              <ChevronDown
                className="transition-transform duration-300 group-data-[state=open]:-rotate-180"
                color="#C98898"
              />
            </AccordionTrigger>

            <AccordionContent className="py-4 flex flex-col gap-2">
              <div className="flex gap-1">
                <h3>신부님</h3>
                <span>{accountInfo?.brideHolder}</span>
              </div>
              <div className="flex justify-between items-center">
                <p>{`${accountInfo?.groomBankName ?? ""} ${
                  accountInfo?.groomNumber ?? ""
                }`}</p>
                <span
                  className="p-2 rounded-full shadow-[2px_4px_4px_rgba(0,0,0,0.1)] cursor-pointer"
                  onClick={() => handleCopy(accountInfo?.groomNumber ?? "")}
                >
                  <Copy color="#CACACA" size={16} />
                </span>
              </div>
              <Divider />
              <div className="flex gap-1">
                <h3>아버지</h3>
                <span>{accountInfo?.groomFatherHolder}</span>
              </div>
              <div className="flex justify-between items-center">
                <p>{`${accountInfo?.groomFatherBankName ?? ""} ${
                  accountInfo?.groomFatherNumber ?? ""
                }`}</p>
                <span
                  className="p-2 rounded-full shadow-[2px_4px_4px_rgba(0,0,0,0.1)] cursor-pointer"
                  onClick={() =>
                    handleCopy(accountInfo?.groomFatherNumber ?? "")
                  }
                >
                  <Copy color="#CACACA" size={16} />
                </span>
              </div>
              <Divider />
              <div className="flex gap-1">
                <h3>어머니</h3>
                <span>{accountInfo?.groomMotherHolder}</span>
              </div>
              <div className="flex justify-between items-center">
                <p>{`${accountInfo?.groomMotherBankName ?? ""} ${
                  accountInfo?.groomMotherNumber ?? ""
                }`}</p>
                <span
                  className="p-2 rounded-full shadow-[2px_4px_4px_rgba(0,0,0,0.1)] cursor-pointer"
                  onClick={() =>
                    handleCopy(accountInfo?.groomMotherNumber ?? "")
                  }
                >
                  <Copy color="#CACACA" size={16} />
                </span>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default AccountInfo;
