import React from "react";
import { Check } from "lucide-react";
const CheckBox = ({ id }) => {
  return (
    <div>
      <input type="checkbox" id={id} className="peer absolute opacity-0 w-5 h-5 cursor-pointer" />
      <label htmlFor={id} className="w-5 h-5 border border-[#E0E0E0] rounded-sm flex items-center justify-center peer-checked:bg-[#433F3B]">
        <Check className="peer-checked:block text-white" />
      </label>
    </div>
  );
};

export default CheckBox;
