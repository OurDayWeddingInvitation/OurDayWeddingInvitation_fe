import React from "react";

type DividerProps = {
  colorClassName?: string;
  marginYClassName?: string;
  thicknessPx?: number;
  className?: string;
};

export function Divider({
  colorClassName = "bg-[#E5E5E5]",
  marginYClassName = "my-3",
  thicknessPx = 1,
  className = "",
}: DividerProps) {
  return (
    <div
      aria-hidden="true"
      className={[
        "w-full shrink-0",
        colorClassName,
        marginYClassName,
        className,
      ].join(" ")}
      style={{ height: thicknessPx }}
    />
  );
}
