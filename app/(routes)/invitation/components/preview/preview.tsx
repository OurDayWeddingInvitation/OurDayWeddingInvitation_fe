"use client";

import { useMessageStore } from "@/app/store/invitationMessageStore";
import { useCounterStore } from "@/app/store/sectionFirstStore";
import Image from "next/image";
import Mockup from "../../../../assets/images/mockup.png";

const Preview = () => {
  const { title, description } = useCounterStore();
  const { message } = useMessageStore();

  return (
    <div className="h-full flex relative">
      <Image
        src={Mockup}
        alt="미리보기목업"
        className="w-full object-contain"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <p>{title}</p>
        <p>{description}</p>

        <div dangerouslySetInnerHTML={{ __html: message }} />
      </div>
    </div>
  );
};

export default Preview;
