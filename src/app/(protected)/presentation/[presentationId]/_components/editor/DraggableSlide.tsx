import { Slide } from '@/lib/types'
import { cn } from '@/lib/utils'
import { useSlideStore } from '@/store/useSlideStore'
import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { MasterRecursiveComponent } from './MasterRecursiveComponent'
import { Popover, PopoverContent, PopoverTrigger, } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { EllipsisVertical, Trash } from 'lucide-react'

type Props = {
    slide: Slide
    index: number
    moveSlide: (dragIndex: number, hoverIndex: number) => void
    handleDelete: (id: string) => void
    isEditable: boolean
}

const DraggableSlide: React.FC<Props> = ({ slide, index, moveSlide, handleDelete, isEditable }) => {
    
    const [{isDragging}, drag] = useDrag({
        type: 'SLIDE',
        item: {
            index, 
            type: 'SLIDE',
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        canDrag: isEditable
    })
    const ref = useRef(null)
    const {
        currentSlide,
        setCurrentSlide,
        currentTheme,
        updateContentItem
    } = useSlideStore()

    const handleContentChange = (contentId: string, newContent: string | string[] | string[][]) => {
        console.log('Content Changed', slide, contentId, newContent)
       if(isEditable){
        updateContentItem(slide.id, contentId, newContent)
       }
    }
 // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, drop] = useDrop({
        accept: ['SLIDE', 'LAYOUT'],
        hover(item: { type: string, index: number }) {
            if(!ref.current || !isEditable){
                return
            }
            const dragIndex = item.index
            const hoverIndex = index

            if(item.type === 'SLIDE'){
                if(dragIndex === hoverIndex){
                    return
                }
                moveSlide(dragIndex, hoverIndex)
                item.index = hoverIndex
            }
        }
    })

    drag(drop(ref))

  return (
    <div 
        ref={ref}
        className={cn(
            'w-full rounded-lg shadow-lg relative p-0 min-h-[400px] max-h-[800px]',
            'shadow-xl transition-shadow duration-300',
            'flex flex-col',
            index === currentSlide ? 'ring-2 ring-blue-500 ring-offset-2' : '',
            slide.className,
            isDragging ? 'opacity-50' : 'opacity-100',
        )}
        style={{
            backgroundImage: currentTheme.gradientBackground,
        }}
        onClick={() => setCurrentSlide(index)}
    >
        <div className='h-full w-full flex-grow overflow-hidden'>
            <MasterRecursiveComponent
                content={slide.content}
                onContentChange={handleContentChange}
                slideId={slide.id}
                isPreview={false}
                isEditable={isEditable}
            />
            
        </div>
        {isEditable && (
                <Popover>
                   <PopoverTrigger
                    asChild
                    className='absolute top-2 left-2'
                   >
                    <Button
                        variant={'outline'}
                        size={'sm'}
                    >
                        <EllipsisVertical className='h-5 w-5' />
                        <span className='sr-only'>Slide Options</span>
                    </Button>
                   </PopoverTrigger>
                   <PopoverContent className='w-fit p-0'>
                        <div className='flex space-x-2'>
                            <Button
                                variant={'ghost'}
                                onClick={() => handleDelete(slide.id)}
                            >
                                <Trash className='h-5 w-5 text-red-500' />
                                <span className='sr-only'>Delete Slide</span>
                            </Button>
                        </div>
                   </PopoverContent>
                </Popover>
            )}
    </div>
  )
}

export default DraggableSlide