"use client";

import { useCounterStore } from "@/app/store/sectionFirstStore";

export default function Form() {
  const { title, description, updateTitle, updateDescription } =
    useCounterStore();

  return (
    <div className="flex-2 h-[600px] p-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-700">제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => updateTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          className="border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* 설명 입력 */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-700">설명</label>
        <textarea
          value={description}
          onChange={(e) => updateDescription(e.target.value)}
          placeholder="설명을 입력하세요"
          rows={4}
          className="border border-gray-300 rounded px-3 py-2 "
        />
      </div>
    </div>
  );
}
