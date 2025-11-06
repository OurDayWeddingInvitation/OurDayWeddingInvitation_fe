"use client";

import { useCounterStore } from "@/app/store/sectionFirstStore";

export default function PreView() {
  const { title, description } = useCounterStore();
  return (
    <div className="flex flex-1 h-[600px] justify-center items-center">
      <div className="w-[200px] h-[350px] bg-white rounded-2xl border-2 shadow-2xl p-2">
        <p>{title}</p>
        <p>{description}</p>
      </div>
    </div>
  );
}
