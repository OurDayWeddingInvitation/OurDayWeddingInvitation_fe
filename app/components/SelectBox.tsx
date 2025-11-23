import React, { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

const SelectBox = ({ style, selectOption, intialValue, onChange }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(intialValue);
  const selectBoxRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectBoxRef.current && !selectBoxRef.current.contains(e.target)) {
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
        <ul className="absolute top-full left-0 w-full bg-[#E3E3E1] rounded mt-1  scrollbar-hide z-50 h-40 overflow-y-scroll">
          {selectOption.map((opt: string, idx: number) => (
            <li
              key={idx}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-1"
              value={opt}
              onClick={() => {
                setValue(opt);
                onChange(opt);
                setOpen(false);
              }}
            >
              <Check size={16} className={value === opt ? "opacity-100" : "opacity-0"} />
              <span>{opt}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectBox;
