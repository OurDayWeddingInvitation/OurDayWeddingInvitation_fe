"use client";

import React, { useState, useCallback } from "react";
import { Accordion } from "@radix-ui/react-accordion";
import { DndContext, closestCenter, DroppableContainer } from "@dnd-kit/core";
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
  const [openItem, setOpenItem] = useState<string>("item-0");

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    const activeIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);

    const activeItem = items.find((item) => item.id === active.id);
    const newItem = items.find((item) => item.id === over.id);

    if (!activeItem?.movable || !newItem?.movable) {
      return;
    }

    setItems((items) => arrayMove(items, activeIndex, newIndex));
  };

  const handleOpen = (value: string) => {
    setOpenItem(value);
  };

  const customCollision = useCallback(
    (args) => {
      return closestCenter({
        ...args,
        droppableContainers: args.droppableContainers.filter((c: DroppableContainer) => {
          const item = items.find((i) => i.id === c.id);
          return item?.movable === true;
        })
      });
    },
    [items]
  );

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full flex flex-col gap-3 pt-4"
      defaultValue="item-0"
      value={openItem}
      onValueChange={handleOpen}
    >
      <DndContext collisionDetection={customCollision} onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis, restrictToParentElement]}>
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          {items.map((item, idx) => {
            return <AccordionMenuItem key={item.id} menu={item} idx={idx} isOpen={openItem === `item-${idx}`} />;
          })}
        </SortableContext>
      </DndContext>
    </Accordion>
  );
};

export default AccordionMenu;
