"use client";

import React from "react";
import { useCounterStore } from "@/app/store/sectionFirstStore";
import Image from "next/image";
import Mockup from "../../../../assets/images/mockup.png";

const Preview = () => {
  const { title, description } = useCounterStore();
  return (
    <div className="flex items-center">
      <div className=" h-auto py-8">
        <Image src={Mockup} alt="미리보기목업" className="w-full h-auto object-contain" />
        <p>{title}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Preview;
