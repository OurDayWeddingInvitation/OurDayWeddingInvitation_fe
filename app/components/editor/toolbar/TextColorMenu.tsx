import { Editor } from "@tiptap/react";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { TEXT_EDITOR_COLORS } from "./toolbarConfig";

const TextColorMenu = ({ editor }: { editor: Editor }) => {
  const paletteRef = useRef<HTMLDivElement>(null);
  const [showPalette, setShowPalette] = useState<boolean>(false);

  // 현재 선택된 컬러 가져오기
  const currentColor = editor.getAttributes("textStyle")?.color ?? "#000000";

  // 바깥 클릭 시 팔레트 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        paletteRef.current &&
        !paletteRef.current.contains(event.target as Node)
      ) {
        setShowPalette(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={paletteRef}>
      {/* 컬러 미리보기 버튼 */}
      <button
        onClick={() => setShowPalette((prev) => !prev)}
        className="flex items-center gap-1 p-2 rounded hover:bg-gray-100"
        title="글자 색상 선택"
      >
        {/* 색상 미리보기 */}
        <span
          className="w-4 h-4 rounded border border-[#E0E0E0]"
          style={{ backgroundColor: currentColor }}
        />
        <ChevronDown className="w-4 h-4 text-gray-600" />
      </button>

      {/* 색상 팔레트 */}
      {showPalette && (
        <div className="absolute z-10 mt-1 left-0 bg-white border border-[#E0E0E0] rounded-sm shadow p-2  w-max min-w-32">
          <div className="grid grid-cols-8 gap-2">
            {TEXT_EDITOR_COLORS.map((color) => (
              <button
                key={color}
                className="w-5 h-5 rounded border border-[#E0E0E0] hover:scale-110 transition"
                style={{ backgroundColor: color }}
                onClick={() => {
                  editor.chain().focus().setColor(color).run();
                  setShowPalette(false);
                }}
                title={color}
              />
            ))}
          </div>

          <button
            type="button"
            className="w-full mt-2 text-xs flex items-center justify-center rounded-sm bg-gray-100 hover:bg-gray-200 transition-colors py-1.5"
            onClick={() => {
              editor.chain().focus().setColor(null).run();
              setShowPalette(false);
            }}
          >
            색상 제거하기
          </button>
        </div>
      )}
    </div>
  );
};

export default TextColorMenu;
