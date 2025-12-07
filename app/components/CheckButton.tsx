import React from "react";
import { Check } from "lucide-react";

const CheckButton = ({ isChecked, onClick }) => {
  return (
    <div className="absolute left-2 top-2 cursor-pointer" onClick={onClick}>
      <div className={`${isChecked ? "bg-[#433F3B]" : "bg-[#FFFFFF]"} rounded-full p-0.5`}>
        <Check color={isChecked ? "#FFFFFF" : "#433F3B"} size={18} />
      </div>
    </div>
  );
};

export default CheckButton;
