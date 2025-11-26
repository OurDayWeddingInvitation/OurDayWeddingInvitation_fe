import React from "react";

interface SectionDefaultButtonProps {
  title: string;
  size: string;
  clickIdx: number;
  idx: number;
  onClick: () => void;
  kind: string;
}

const SectionDefaultButton = ({ title, size, clickIdx, idx, onClick, kind }: SectionDefaultButtonProps) => {
  const isActive = clickIdx === idx;
  const baseStyle = "cursor-pointer border rounded-sm h-[34px] px-[20px] w-full";
  const activeStyle = "border-[#D2BEA9] bg-[#D2BEA9] text-white";
  const inactiveStyle = "border-[#E0E0E0] bg-white text-[#9C9C9C] font-light";
  const kindWidth = kind === "size" ? "min-w-[120px] max-w-[180px]" : "min-w-[90px] max-w-[150px]";

  return (
    <button className={`${baseStyle} ${kindWidth} ${size} ${isActive ? activeStyle : inactiveStyle}`} onClick={onClick}>
      {title}
    </button>
  );
};

export default SectionDefaultButton;
