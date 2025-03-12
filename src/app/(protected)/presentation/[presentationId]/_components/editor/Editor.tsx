"use client"
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { LayoutSlides } from '@/lib/types'
import { cn } from '@/lib/utils'
import { useSlideStore } from '@/store/useSlideStore'
import React, { useEffect, useRef, useState } from 'react'
import { useDrop } from 'react-dnd'
import { v4 as uuidv4 } from 'uuid';
import DraggableSlide from './DraggableSlide'

type Props = {
  isEditable: boolean
}

type DropZoneProps = {
  index: number;
  onDrop: (
    item: {
      type: string;
      layoutType: string;
      component: LayoutSlides;
      index?: number;
    },
    dropIndex: number
  ) => void
  isEditable: boolean
}

export const DropZone: React.FC<DropZoneProps> = ({
  index,
  onDrop,
  isEditable
}) => {

  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: ['SLIDE', 'layout'],
    drop: (item: {
      type: string
      layoutType: string
      component: LayoutSlides
      index?: number
    }) => {
      onDrop(item, index)
    },
    canDrop: () => isEditable,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  })

  if (!isEditable) return null

  return (
    <div className={cn(
      'h-4 my-2 rounded-md transition-all duration-200',
      isOver && canDrop ? 'border-green-200 bg-green-100' : 'border-gray-300',
      canDrop ? 'border-blue-300' : 'border-gray-300'
    )}>
      {isOver && canDrop && (
        <div className='h0full flex items-center justify-center text-green-600'>
          Drop Here
        </div>
      )}
    </div>
  )
}

const Editor = ({ isEditable }: Props) => {
  const {
    getOrderSlides,
    currentSlide,
    removeSlide,
    addSlideAtIndex,
    reorderSlides,
    slides,
    project
  } = useSlideStore()

  const orderedSlides = getOrderSlides()
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])
  const [loading, setLoading] = useState(true)

  const moveSlide = (dragIndex: number, hoverIndex: number) => {
    if (isEditable) {
      reorderSlides(dragIndex, hoverIndex)
    }
  }



  const handleDrop = (item: { type: string, layoutType: string, component: LayoutSlides, index?: number }, dropIndex: number) => {
    if (!isEditable) return
    if (item.type === 'layout') {
      addSlideAtIndex({
        ...item.component,
        id: uuidv4(),
        slideOrder: dropIndex
      },
        dropIndex
      )
    } else if (item.type === 'SLIDE' && item.index !== undefined) {
      moveSlide(item.index, dropIndex)
    }
  }



  const handleDelete = (id: string) => {
    if (isEditable) {
      console.log('Deleting', id)
      removeSlide(id)
    }
  }

  useEffect(() => {
    if (slideRefs.current[currentSlide]) {
      slideRefs.current[currentSlide].scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }
  }, [currentSlide])

  useEffect(() => {
    if(typeof window !== 'undefined') setLoading(false)
  },[])

  return (
    <div className='flex-1 flex flex-col h-full max-w-3xl mx-auto px-4 mb-20'>
      {
        loading ? (
          <div className='w-full px-4 flex flex-col space-y-6'>
            <Skeleton className='h-52 w-full' />
            <Skeleton className='h-52 w-full' />
            <Skeleton className='h-52 w-full' />

          </div>
        ) : (
          <ScrollArea className='flex-1 mt-8'>
            <div className='px-4 pb-4 space-y-4 pt-2'>
              {isEditable && <DropZone index={0} onDrop={handleDrop} isEditable={isEditable} />}
              {orderedSlides.map((slide, index) => (
                <React.Fragment
                  key={slide.id || index}
                >
                  <DraggableSlide
                    slide={slide}
                    index={index}
                    moveSlide={moveSlide}
                    handleDelete={handleDelete}
                    isEditable={isEditable}
                  />
                </React.Fragment>
              ))}
            </div>
          </ScrollArea>
        )
      }
    </div>
  )
}

export default Editor