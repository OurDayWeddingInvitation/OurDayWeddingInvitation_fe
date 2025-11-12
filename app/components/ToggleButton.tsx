"use client";

import React, { useState } from "react";

const ToggleButton = () => {
  const [checked, setChecked] = useState(false);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setChecked(!checked);
      }}
      className={`relative w-12 h-6 rounded-full transition-colors duration-200 cursor-pointer shadow-[0px_5px_4px_rgba(0,0,0,0.08)]
        ${checked ? "bg-[#D4C6B7]" : "bg-[#CACACA]"}`}
    >
      <span
        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-200
          ${checked ? "translate-x-0" : "translate-x-6"}`}
      />
    </button>
  );
};

export default ToggleButton;
