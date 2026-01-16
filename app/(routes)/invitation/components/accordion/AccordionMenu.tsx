"use client";

import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Accordion } from "@radix-ui/react-accordion";
import { DndContext, closestCenter, DroppableContainer } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import AccordionMenuItem from "./AccordionMenuItem";
import { invitationMenu, InvitationMenuItem } from "@/app/lib/constants";
import { clientFetchApi } from "@/app/lib/fetches/client";
import { useWeddingIdStore } from "@/app/store/useWeddingIdStore";
import { useMenuSettingStore } from "@/app/store/useMenuSettingInfoStore";

type DragEndEvent = {
  active: { id: string | number };
  over: { id: string | number } | null;
};

const AccordionMenu = () => {
  const [items, setItems] = useState<InvitationMenuItem[]>(invitationMenu);
  const [openItem, setOpenItem] = useState<string>("item-0");
  const weddingId = useWeddingIdStore((s) => s.weddingId);
  const menuSetting = useMenuSettingStore((s) => s.menuSetting);
  const setMenuSetting = useMenuSettingStore((s) => s.setMenuSetting);

  const displayItems = useMemo(() => {
    if (!menuSetting?.length) return invitationMenu;

    return invitationMenu
      .map((item) => {
        const setting = menuSetting.find((s) => s.sectionKey === item.id);

        return {
          ...item,
          isVisible: setting?.isVisible ?? item.isVisible,
          displayOrder: setting?.displayOrder ?? 0,
        };
      })
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }, [menuSetting]);

  const handleDragEnd = async ({ active, over }: DragEndEvent) => {
    if (!over) return;

    const oldIndex = displayItems.findIndex((i) => i.id === active.id);
    const newIndex = displayItems.findIndex((i) => i.id === over.id);

    const reordered = arrayMove(displayItems, oldIndex, newIndex);

    const newSettings = reordered.map((item, idx) => ({
      sectionKey: item.id,
      isVisible: item.isVisible,
      displayOrder: idx + 1,
    }));

    setMenuSetting(newSettings);

    await clientFetchApi({
      endPoint: `/weddings/${weddingId}/sections/settings`,
      method: "PATCH",
      body: { sectionSettings: newSettings },
    });
  };

  const handleOpen = (value: string) => {
    setOpenItem(value);
  };

  const customCollision = useCallback(
    (args) => {
      return closestCenter({
        ...args,
        droppableContainers: args.droppableContainers.filter(
          (c: DroppableContainer) => {
            const item = displayItems.find((i) => i.id === c.id);
            return item?.movable === true;
          }
        ),
      });
    },
    [displayItems]
  );

  console.log(displayItems, "displayItems");
  console.log(menuSetting, "menuSetting");

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full flex flex-col gap-3 pt-4"
      defaultValue="item-0"
      value={openItem}
      onValueChange={handleOpen}
    >
      <DndContext
        collisionDetection={customCollision}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      >
        <SortableContext
          items={displayItems.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          {displayItems.map((item, idx) => {
            return (
              <AccordionMenuItem
                key={item.id}
                menu={item}
                idx={idx}
                isOpen={openItem === `item-${idx}`}
              />
            );
          })}
        </SortableContext>
      </DndContext>
    </Accordion>
  );
};

export default AccordionMenu;
