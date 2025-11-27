import React from "react";
import { SketchPicker } from "react-color";

interface ColorSelectButtonProps {
  colorArr: string[];
  selectedIdx: number;
  kind: string;
  onSelect: (color: string, idx: number, kind: string) => void;
  isPickerOpen: boolean;
  setPickerOpen: (open: boolean) => void;
  currentColor: string;
  setCurrentColor: (color: string) => void;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}

const ColorSelectButton = ({
  colorArr,
  selectedIdx,
  isPickerOpen,
  currentColor,
  setCurrentColor,
  buttonRef,
  onSelect,
  kind
}: ColorSelectButtonProps) => (
  <div className="flex flex-1 gap-2.5 items-center flex-wrap">
    {colorArr.map((color, idx) => (
      <button
        key={idx}
        className={`w-8 h-8 rounded-full cursor-pointer ${selectedIdx === idx && "border-[#666666] border-2"}`}
        style={{ background: color }}
        ref={buttonRef}
        onClick={() => onSelect(color, idx, kind)}
      >
        {isPickerOpen && idx === colorArr.length - 1 && (
          <div className="absolute">
            <SketchPicker color={currentColor} onChange={(c) => setCurrentColor(c.hex)} onChangeComplete={(c) => setCurrentColor(c.hex)} />
          </div>
        )}
      </button>
    ))}
  </div>
);

export default ColorSelectButton;
