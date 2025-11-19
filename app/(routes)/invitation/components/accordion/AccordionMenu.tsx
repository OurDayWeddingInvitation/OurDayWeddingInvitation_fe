"use client";

import React, { useState } from "react";
import { Accordion } from "@radix-ui/react-accordion";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { restrictToVerticalAxis, restrictToParentElement } from "@dnd-kit/modifiers";
import AccordionMenuItem from "./AccordionMenuItem";
import { invitationMenu, InvitationMenuItem } from "@/app/lib/constants";

type DragEndEvent = {
  active: { id: string | number };
  over: { id: string | number } | null;
};

const AccordionMenu = () => {
  const [items, setItems] = useState<InvitationMenuItem[]>(invitationMenu);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over.id && over.id !== "main" && over.id !== "parentsInfo" && over.id !== "basicInfo") {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      setItems((items) => arrayMove(items, oldIndex, newIndex));
      console.log(active, over, newIndex);
    }
  };

  return (
    <Accordion type="single" collapsible className="w-full flex flex-col gap-3" defaultValue="item-0">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis, restrictToParentElement]}>
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          {items.map((item, idx) => (
            <AccordionMenuItem key={item.id} menu={item} idx={idx} />
          ))}
        </SortableContext>
      </DndContext>
    </Accordion>
  );
};

export default AccordionMenu;
