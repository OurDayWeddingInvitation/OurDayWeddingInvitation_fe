"use client";

import { Editor, useEditorState } from "@tiptap/react";
import TextAlignMenu from "./TextAlignMenu";
import TextColorMenu from "./TextColorMenu";
import TextHighlightMenu from "./TextHighlightMenu";
import ToolbarButton from "./ToolbarButton";
import ToolbarGroup from "./ToolbarGroup";
import { TOOLBAR_CONFIG } from "./toolbarConfig";

type Props = {
  editor: Editor;
};

const MENU_COMPONENTS = {
  TextAlignMenu,
  TextColorMenu,
  TextHighlightMenu,
};

const Toolbar = ({ editor }: Props) => {
  const toolbarState = useEditorState({
    editor,
    selector: (ctx) => {
      const state: Record<string, { isActive: boolean; isDisabled: boolean }> =
        {};

      TOOLBAR_CONFIG.forEach((group) => {
        if (group.type === "button") {
          group.items.forEach((item) => {
            state[item.name] = {
              isActive: item.isActive(ctx.editor) ?? false,
              isDisabled: item.isDisabled(ctx.editor) ?? false,
            };
          });
        }
      });

      return state;
    },
  });

  if (!editor) return null;

  return (
    <div className="sticky top-0 z-10 flex flex-wrap gap-1 p-2 bg-[#eee] rounded-t-sm border-b border-[#E0E0E0]">
      {TOOLBAR_CONFIG.map((group, index) => (
        <ToolbarGroup key={`${group}-${index}`}>
          {group.type === "button" &&
            group.items.map((item) => {
              const Icon = item.icon;
              const state = toolbarState[item.name];

              return (
                <ToolbarButton
                  key={`${group}-${item.name}}`}
                  title={item.title}
                  active={state.isActive}
                  disabled={state.isDisabled}
                  onClick={() => item.command(editor)}
                >
                  <Icon className="w-4 h-4" strokeWidth={2.5} />
                </ToolbarButton>
              );
            })}

          {group.type === "dropdown" &&
            group.items.map((item) => {
              const Component = MENU_COMPONENTS[item.component];

              return (
                <Component key={`${group}-${item.name}`} editor={editor} />
              );
            })}
        </ToolbarGroup>
      ))}
    </div>
  );
};

export default Toolbar;
