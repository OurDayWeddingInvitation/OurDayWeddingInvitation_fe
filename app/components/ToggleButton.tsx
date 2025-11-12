"use client";

import React, { useState } from "react";

const ToggleButton = ({ toggle }) => {
  const [checked, setChecked] = useState(toggle);

  const handleToggleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setChecked((prev: boolean) => (toggle ? true : !prev));
  };

  return (
    <button
      onClick={handleToggleClick}
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
