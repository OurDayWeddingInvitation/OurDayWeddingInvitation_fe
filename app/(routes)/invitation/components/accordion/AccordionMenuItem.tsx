"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { AccordionContent, AccordionItem, AccordionTrigger, AccordionHeader } from "@radix-ui/react-accordion";
import ToggleButton from "@/app/components/ToggleButton";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import DownArrowIcon from "@/app/assets/images/arrow-down.png";

const AccordionMenuItem = ({ idx, menu }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: menu.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <AccordionItem
      value={`item-${idx}`}
      className="flex flex-col w-full bg-white p-4 rounded-lg shadow-[0px_5px_4px_rgba(0,0,0,0.08)]"
      ref={setNodeRef}
      key={idx}
      style={style}
    >
      <AccordionHeader>
        {/* 드래그/메뉴/토글/ */}
        <AccordionTrigger asChild className="group">
          <div className="flex justify-between cursor-pointer">
            <div className="flex gap-3 cursor-pointer">
              {menu.movable && (
                <div {...attributes} {...listeners} className="text-gray-400 select-none cursor-grab">
                  ⠿
                </div>
              )}
              <ToggleButton />
              <h3 className="font-bold">{menu.label}</h3>
            </div>
            <Image src={DownArrowIcon} alt="열기아이콘" className="transition-transform duration-300 group-data-[state=open]:-rotate-180" />
          </div>
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionContent className="my-3 text-balance w-full bg-white">테스트 입니당</AccordionContent>
    </AccordionItem>
  );
};

export default AccordionMenuItem;
