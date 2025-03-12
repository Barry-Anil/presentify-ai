import { ContentItem } from '@/lib/types'
import { cn } from '@/lib/utils'
import { useSlideStore } from '@/store/useSlideStore'
import React from 'react'
import { useDrop } from 'react-dnd'
import {v4 as uuidv4} from 'uuid'

type Props = {
    index : number
    parentId: string
    slideId: string
}

const DropZone = ({index, parentId, slideId}: Props) => {

    const {addComponentInSlide} = useSlideStore()

    const [{isOver, canDrop}, drop] = useDrop({
        accept: 'CONTENT_ITEM',
        drop: (item: {
            type: string
            componentType: string
            label: string
            component: ContentItem
        }) => {
            if(item.type === 'component'){
                addComponentInSlide(
                    slideId,
                    {...item.component,
                         id: uuidv4(),
                    },
                    parentId,
                    index    
                )
            }
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
        })
    })

  return (
    <div 
        ref={drop as unknown as React.RefObject<HTMLDivElement>}
        className={cn('h-3 w-full transition-all duration-200',
            '',
            isOver && canDrop ? 'border-blue-200 bg-blue-100' : 'border-gray-300',
            'hover:border-blue-300'
        )}
    >
        {isOver && canDrop && (
            <div className='h-full w-full flex text-sm items-center justify-center text-green-600'>
                Drop Here
            </div>
        )}
    </div>
  )
}

export default DropZone