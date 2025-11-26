import React, { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { SelectOption } from "../lib/constants";

interface SelectBoxProps {
  style: string;
  selectOption: SelectOption[];
  initialValue: string | number;
  onChange: (val: string | number) => void;
}

const SelectBox = ({ style, selectOption, initialValue, onChange }: SelectBoxProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string | number>(initialValue);
  const selectBoxRef = useRef<HTMLDivElement | null>(null);

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
      <div className={style} onClick={() => setOpen(!open)}>
        {value}
        <ChevronDown size={18} color="#9C9C9C" />
      </div>

      {open && (
        <ul
          className="absolute top-full left-0 w-full bg-[#E3E3E1] rounded mt-1  scrollbar-hide z-50 h-40  overflow-scroll [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {selectOption.map((opt, idx) => {
            const label = opt.label;
            const selectValue = opt.value;
            return (
              <li
                key={idx}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-1"
                value={selectValue}
                onClick={() => {
                  setValue(label);
                  onChange(selectValue);
                  setOpen(false);
                }}
              >
                <Check size={16} className={value === selectValue ? "opacity-100" : "opacity-0"} />
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
