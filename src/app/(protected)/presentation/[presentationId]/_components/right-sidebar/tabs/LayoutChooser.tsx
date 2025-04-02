"use client"
import { ScrollArea } from "@/components/ui/scroll-area";
import { layouts } from "@/lib/constants";
import { Layout } from "@/lib/types";
import { useSlideStore } from "@/store/useSlideStore";
import React from "react";
import { useDrag } from "react-dnd";
import LayoutPreviewItem from "./components-tab/LayoutPreviewItem";

export const DraggableLayoutItem = ({
    component,
    icon,
    name,
    type,
    layoutType
}: Layout) => {
    const { currentTheme } = useSlideStore();
    const [{isDragging}, drag] = useDrag(() => ({
        type: 'layout',
        item: {type, layoutType, component},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    return (
        <div 
            ref={drag as unknown as React.LegacyRef<HTMLDivElement>}
            style={{
                backgroundColor: currentTheme.slideBackgroundColor,
                opacity: isDragging ? 0.5 : 1
            }}
            className="border rounded-lg"
        >
            <LayoutPreviewItem
                name={name}
                Icon={icon}
                // onClick={onClick}
                // isSelected={isSelected}
                type={type}
                component={component}
            />
        </div>
    )
}

const LayoutChooser = () => {
  const { currentTheme } = useSlideStore();
  return (
    <ScrollArea
        className="h-[400px]"
        style={{
            backgroundColor: currentTheme.slideBackgroundColor
        }}
    >
        <div className='p-4'>
            {layouts.map((group) => (
                <div 
                    key={group.name}
                    className="mb-6"
                >
                    <h3 className="text-sm font-medium my-4">
                        {group.name}
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                        {group.layouts.map((layout) => (
                            <DraggableLayoutItem 
                                key={layout.layoutType}
                                {...layout}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </ScrollArea>
  )
};

export default LayoutChooser;
