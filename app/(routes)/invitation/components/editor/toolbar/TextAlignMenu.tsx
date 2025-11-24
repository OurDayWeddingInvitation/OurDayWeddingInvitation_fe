import { TEXT_ALIGN_VALUES } from "@/app/lib/constants/invitation-info";
import { getAlignIcon } from "@/app/lib/utils/functions";
import { Editor } from "@tiptap/react";
import { AlignCenter, AlignLeft, AlignRight, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const TextAlignMenu = ({ editor }: { editor: Editor }) => {
  const alignRef = useRef<HTMLDivElement>(null);
  const [showAlign, setShowAlign] = useState(false);

  // 현재 정렬 상태
  const currentAlign = editor.getAttributes("paragraph")?.textAlign ?? "left";
  const CurrentIcon = getAlignIcon(currentAlign);

  // 바깥 클릭 시 정렬 창 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        alignRef.current &&
        !alignRef.current.contains(event.target as Node)
      ) {
        setShowAlign(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={alignRef}>
      <button
        onClick={() => setShowAlign((prev) => !prev)}
        className="flex items-center gap-1 p-2 rounded hover:bg-gray-100"
        title="글자 정렬 선택"
      >
        <CurrentIcon className="w-4 h-4 text-gray-700" />
        <ChevronDown className="w-4 h-4 text-gray-600" />
      </button>

      {showAlign && (
        <div className="absolute z-10 mt-1 left-0 bg-white border border-[#E0E0E0] rounded-sm shadow p-2  w-max min-w-32">
          <div className="grid grid-cols-3 gap-2">
            {TEXT_ALIGN_VALUES.map(({ value, label }) => {
              const Icon = getAlignIcon(value);

              return (
                <button
                  key={value}
                  onClick={() => {
                    editor.chain().focus().setTextAlign(value).run();
                    setShowAlign(false);
                  }}
                  title={label}
                  className={`flex items-center justify-center w-8 h-8 rounded transition 
                ${
                  currentAlign === value
                    ? "bg-gray-200"
                    : "hover:bg-gray-100 border border-transparent"
                }`}
                >
                  <Icon className="w-4 h-4 text-gray-700" />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TextAlignMenu;
