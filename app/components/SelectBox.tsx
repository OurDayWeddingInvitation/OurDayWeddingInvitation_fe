import React, { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { SelectOption } from "../lib/constants";

interface SelectBoxProps {
  selectOption: SelectOption[];
  initialValue: string | number | null;
  onChange: (val: string | number) => void;
  kind?: string;
}

const SelectBox = ({ selectOption, initialValue, onChange }: SelectBoxProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const selectBoxRef = useRef<HTMLDivElement | null>(null);

  const inputStyle = "outline-0 flex-1 border-[#E0E0E0] border placeholder:text-center rounded-sm text-sm py-1.5 px-1";
  const selectStyle = `${inputStyle} relative flex justify-around cursor-pointer`;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectBoxRef.current && !selectBoxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative min-w-[100px] max-w-[100px]" ref={selectBoxRef}>
      <div className={selectStyle} onClick={() => setOpen(!open)}>
        {initialValue}
        <ChevronDown size={18} color="#9C9C9C" />
      </div>

      {open && (
        <ul
          className="absolute top-full left-0 w-full bg-[#FFFFFF] rounded mt-1 border-[#E0E0E0] border scrollbar-hide z-50  overflow-scroll [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", height: 160 }}
        >
          {selectOption.map((opt, idx) => {
            const label = opt.label;
            const selectValue = opt.value;
            return (
              <li
                key={idx}
                className="px-3 py-2 hover:bg-[#D4C6B7] hover:text-[#FFFFFF] cursor-pointer flex items-center gap-1"
                value={selectValue}
                onClick={() => {
                  onChange(selectValue);
                  setOpen(false);
                }}
              >
                <Check size={16} className={initialValue === selectValue ? "opacity-100" : "opacity-0"} />
                <span>{label}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SelectBox;
