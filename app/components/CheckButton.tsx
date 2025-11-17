import React, { useState } from "react";
import { Check } from "lucide-react";

const CheckButton = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick((prev) => !prev);
  };
  return (
    <div className="relative  p-2">
      <div onClick={handleClick} className={`${click ? "bg-[#433F3B]" : "bg-[#FFFFFF]"} absolute rounded-full p-0.5`}>
        <Check color={click ? "#FFFFFF" : "#433F3B"} />
      </div>
    </div>
  );
};

export default CheckButton;
