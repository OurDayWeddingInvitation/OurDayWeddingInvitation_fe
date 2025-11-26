import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";

export const getAlignIcon = (value: string) => {
  switch (value) {
    case "center":
      return AlignCenter;
    case "right":
      return AlignRight;
    default:
      return AlignLeft;
  }
};
