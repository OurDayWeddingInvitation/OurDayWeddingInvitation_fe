"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { AccordionContent, AccordionItem, AccordionTrigger, AccordionHeader } from "@radix-ui/react-accordion";
import ToggleButton from "@/app/components/ToggleButton";
import { CSS } from "@dnd-kit/utilities";
import { sectionComponents } from "@/app/lib/constants/index";
import { ChevronDown } from "lucide-react";

const AccordionMenuItem = ({ idx, menu }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: menu.id });
  const Component = sectionComponents[menu.id];
  const style = menu.movable
    ? {
        transform: CSS.Transform.toString(transform),
        transition
      }
    : {};

  return (
    <AccordionItem
      value={`item-${idx}`}
      className="flex flex-col w-full bg-white p-5  rounded-lg shadow-[0px_5px_4px_rgba(0,0,0,0.08)]"
      ref={setNodeRef}
      key={idx}
      style={style}
    >
      <AccordionHeader>
        {/* 드래그/메뉴/토글/ */}
        <AccordionTrigger asChild className="group">
          <div className="flex justify-between cursor-pointer">
            <div className="flex gap-3 cursor-pointer">
              <div
                {...attributes}
                {...listeners}
                className={`${menu.movable ? "text-gray-400 select-none cursor-grab" : "opacity-0 cursor-default"}`}
              >
                ⠿
              </div>
              <ToggleButton toggle={menu.toggle} />
              <h3 className="font-bold">{menu.label}</h3>
            </div>
            <ChevronDown className="transition-transform duration-300 group-data-[state=open]:-rotate-180" />
          </div>
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionContent className="my-3 text-balance w-full bg-white">{Component && <Component />}</AccordionContent>
    </AccordionItem>
  );
};

export default AccordionMenuItem;
