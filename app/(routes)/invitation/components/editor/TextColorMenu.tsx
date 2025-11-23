import { Editor } from "@tiptap/react";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const COLORS = [
  "#000000", // 검정
  "#ef4444", // 빨강
  "#3b82f6", // 파랑
  "#10b981", // 초록
  "#6b7280", // 회색
];

const TextColorMenu = ({ editor }: { editor: Editor }) => {
  const [showPalette, setShowPalette] = useState(false);
  const paletteRef = useRef<HTMLDivElement>(null);

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
    <div className="relative inline-block" ref={paletteRef}>
      {/* 컬러 미리보기 버튼 */}
      <button
        onClick={() => setShowPalette((prev) => !prev)}
        className="flex items-center gap-1 p-2 rounded hover:bg-gray-100"
        title="글자 색상 선택"
      >
        {/* 색상 미리보기 동그라미 */}
        <span
          className="w-4 h-4 rounded border"
          style={{ backgroundColor: currentColor }}
        />
        <ChevronDown className="w-4 h-4 text-gray-600" />
      </button>

      {/* 색상 팔레트 */}
      {showPalette && (
        <div className="absolute z-10 mt-1 left-0 bg-white border rounded shadow p-2 flex gap-2">
          {COLORS.map((color) => (
            <button
              key={color}
              className="w-5 h-5 rounded border hover:scale-110 transition"
              style={{ backgroundColor: color }}
              onClick={() => {
                editor.chain().focus().setColor(color).run();
                setShowPalette(false);
              }}
              title={color}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TextColorMenu;
