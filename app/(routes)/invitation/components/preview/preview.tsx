"use client";

import React from "react";
import { useCounterStore } from "@/app/store/sectionFirstStore";
import Image from "next/image";
import Mockup from "../../../../assets/images/mockup.png";

const Preview = () => {
  const { title, description } = useCounterStore();
  return (
    <div className="h-full flex relative">
      <Image src={Mockup} alt="미리보기목업" className="w-full object-contain" />
      <div className="absolute top-50 left-20">
        <p>{title}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Preview;
