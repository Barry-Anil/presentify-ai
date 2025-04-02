import { cn } from "@/lib/utils";
import { useSlideStore } from "@/store/useSlideStore";
import React from "react";

type ListProps = {
  items: string[];
  onChange: (newItems: string[]) => void;
  className?: string;
  isEditable?: boolean;
};

type ListItemProps = {
    item: string
    index: number
    onChange: (index: number, value: string) => void
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void
    isEditable: boolean
    fontColor: string
}

const ListItem: React.FC<ListItemProps> = ({
    item,
    index,
    onChange,
    onKeyDown,
    isEditable,
    fontColor
}) => {
    return (
        <input
            type="text"
            value={item}
            onChange={(e) => onChange(index, e.target.value)}
            onKeyDown={(e) => onKeyDown(e, index)}
            className="bg-transparent outline-none w-full py-1"
            style={{ color: fontColor }}
            readOnly={!isEditable}
        />
    )
}

const TodoList: React.FC<ListProps> = ({
  items,
  onChange,
  className,
  isEditable = true,
}) => {
  const { currentTheme } = useSlideStore();

  const handleChange = (index: number, value: string) => {
    if(isEditable){
        const newItems = [...items]
        newItems[index] = value.startsWith('[ ] ') || value.startsWith('[x] ') ? value : `[ ]  + ${value}`
        onChange(newItems)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newItems = [...items];
      newItems.splice(index + 1, 0, '[ ]')
      onChange(newItems);
      setTimeout(() => {
        const nextInput = document.querySelector(
            `li:nth-child(${index + 2}) input`
        ) as HTMLInputElement
        if(nextInput) nextInput.focus()
      }, 0)
    }
    else if(e.key === 'Backspace' && items[index] === '[ ] ' && items.length > 1) {
      e.preventDefault()
      const newItems = [...items]
      newItems.splice(index, 1)
      onChange(newItems)
    }
  }

  const toogleCheckbox = (index: number) => {
    if(isEditable){
        const newItems = [...items]
        newItems[index] = newItems[index].startsWith('[x] ') 
        ? newItems[index].replace('[x] ', '[] ')
        : newItems[index].replace('[] ', '[x] ') 
        onChange(newItems)
    }
  }

  return (
    <ul 
        className={cn(" space-y-1", className)}
        style={{ color: currentTheme.fontColor }}
    >
        {items.map((item, index) => (
            <li 
                key={index}
                className="flex items-center space-x-2"    
            >
                <input
                    type="checkbox"
                    checked={item.startsWith('[x] ')}
                    onChange={() => toogleCheckbox(index)}
                    className="form-checkbox"
                    readOnly={!isEditable}
                />
                <ListItem
                    item={item.replace(/^\[[ x]\] /, '')}
                    index={index}
                    onChange={(index, value) => 
                        handleChange(
                            index,
                            `${item.startsWith('[x] ') ? '[x] ' : '[ ] '}${value}`
                        )
                    }
                    onKeyDown={handleKeyDown}
                    isEditable={isEditable}
                    fontColor={currentTheme.fontColor}
                />
            </li>
        ))}
    </ul>
  );
};

export default TodoList;
