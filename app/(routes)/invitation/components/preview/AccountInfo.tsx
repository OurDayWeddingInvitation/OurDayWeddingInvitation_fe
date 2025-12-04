import React from "react";
import { useColorFontStore } from "@/app/store/useColorFontStore";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import { useWeddingInfoStore } from "@/app/store/useWeddingInfoStore";
import { ChevronDown, Copy } from "lucide-react";

const AccountInfo = () => {
  const { pointColor } = useColorFontStore();
  const { wedding } = useWeddingInfoStore();
  const groomName = wedding.groom.lastName + wedding.groom.firstName;
  const brideName = wedding.bride.lastName + wedding.bride.firstName;

  const couple = ["신랑", "신부"];
  const text = "국민은행 12345678910";

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  return (
    <div className="bg-[#FFFFFF] py-20">
      <div className="text-center">
        <div className="tracking-[4px] text-[12px] pb-3" style={{ color: pointColor }}>
          ACCOUNT
        </div>
        <p className="pb-2.5 font-bold">마음 전하실 곳</p>
        <p className="text-[14px] leading-loose max-w-[270px] m-auto word-break:keep-all pb-10">
          바쁜 일정으로 참석이 어려우신 분들을 위해 소중한 마을을 전달하실 수 있도록 계좌번호를 함께 안내드립니다. 따뜻한 축복에 깊이 감사드립니다.
        </p>
      </div>

      <div className="px-[23px]">
        <Accordion type="multiple" className="flex flex-col gap-2">
          {couple.map((item, idx) => {
            const isGroom = idx === 0;
            const border = isGroom ? "#D2DAE4" : "#D7AEB9";
            const color = isGroom ? "#7F8EA0" : "#C98898";
            return (
              <AccordionItem value={`item-${idx}`} key={idx} className="bg-[#FFFFFF] border rounded-[10px] py-3 px-5" style={{ borderColor: border }}>
                <AccordionTrigger className="cursor-pointer flex justify-between w-full">
                  <div>{item}측</div>
                  <ChevronDown className="transition-transform duration-300 group-data-[state=open]:-rotate-180" color={color} />
                </AccordionTrigger>
                <AccordionContent className="py-4 flex flex-col gap-2">
                  <div className="flex gap-1">
                    <h3>{item}</h3>
                    <span>{isGroom ? groomName : brideName}</span>
                  </div>
                  <div className="flex justify-between">
                    <p>{text}</p>
                    <span className=" p-2 rounded-full shadow-[2px_4px_4px_rgba(0,0,0,0.1)] cursor-pointer">
                      <Copy color="#CACACA" size={16} />
                    </span>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};

export default AccountInfo;
