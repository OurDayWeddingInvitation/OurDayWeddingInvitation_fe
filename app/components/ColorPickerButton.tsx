import React from "react";
import { SketchPicker } from "react-color";

interface ColorSelectButtonProps {
  color: string;
  isPickerOpen: boolean;
  currentColor: string;
  onClick: () => void;
  setCurrentColor?: (color: string) => void;
  buttonRef?: React.RefObject<HTMLButtonElement>;
}

const ColorPickerButton = ({ color, isPickerOpen, currentColor, setCurrentColor, buttonRef, onClick }: ColorSelectButtonProps) => (
  <button className="w-8 h-8 rounded-full cursor-pointer" style={{ background: color }} onClick={onClick} ref={buttonRef}>
    {isPickerOpen && (
      <div className="absolute z-50">
        <SketchPicker color={currentColor} onChange={(c) => setCurrentColor?.(c.hex)} onChangeComplete={(c) => setCurrentColor?.(c.hex)} />
      </div>
    )}
  </button>
);

export default ColorPickerButton;
