"use client"
import { JsonValue } from '@prisma/client/runtime/library'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { itemVariants, themes } from '@/lib/constants'
import { useSlideStore } from '@/store/useSlideStore'
import ThumbnailPreview from './thumbnail-preview'
import { timeAgo } from '@/lib/utils'
import AlertDialogBox from '../alert-dialog'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { deleteProjects, recoverProject } from '@/actions/project'

type Props = {
    projectId: string
    title: string
    createdAt: string
    isDeleted?: boolean
    slideData: JsonValue
    src?: string
    themeName: string
}

const ProjectCard = ({ projectId, title, createdAt, isDeleted, slideData, src,  themeName }: Props) => {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const { setSlides } = useSlideStore()

    const handleNavigation = () => {
        setSlides(JSON.parse(JSON.stringify(slideData)))
        router.push(`/presentation/${projectId}`)
    }

    const theme = themes.find(theme => theme.name === themeName) || themes[0]

    const handleRecover = async () => {
        setLoading(true)
        if (!projectId) {
            setLoading(false)
            toast.error('Error', {
                description: "Project not found!"
            })
            return
        }
        try {
            const res = await recoverProject(projectId)
            if (res.status !== 200) {
                toast.error('Oppse!', {
                    description: res.error || 'Something went wrong'
                })
                return
            }
            setOpen(false)
            router.refresh()
            toast.success('Success', {
                description: "Project recovered successfully!"
            })
        } catch (error) {
            console.log(error)
            toast.error('Oppse!', {
                description: "Something went wwrong. Please contact support."
            })
        }
    }

    const handleDelete = async () => {
        setLoading(true)
        if (!projectId) {
            setLoading(false)
            toast.error('Error', {
                description: "Project not found!"
            })
            return
        }
        try {
            const res = await deleteProjects(projectId)
            if (res.status !== 200) {
                toast.error('Oppse!', {
                    description: res.error || 'Something went wrong'
                })
                return
            }
            setOpen(false)
            router.refresh()
            toast.success('Success', {
                description: "Project deleted successfully!"
            })
        } catch (error) {
            console.log(error)
            toast.error('Oppse!', {
                description: "Something went wwrong. Please contact support."
            })
        }
    }

    return (
        <motion.div
            variants={itemVariants}
            className={`group w-full flex flex-col gap--y-3 rounded-xl p-3 transitioncolors ${!isDeleted && 'hover:bg-muted/50'}`}
        >
            <div
                className='relative aspect-[16/10] overflow-hidden rounded-lg cursor-pointer'
                onClick={handleNavigation}
            >
                <ThumbnailPreview
                    theme={theme}
                    slide={JSON.parse(JSON.stringify(slideData))?.[0]}
                    src={src || ''}
                />

            </div>
            <div className='w-full'>
                <div className='space-y-1'>
                    <h3 className='font-semibold text-base text-primary-10 line-clamp-1'>
                        {title}
                    </h3>
                    <div className='flex w-full justify-between items-center gap-2'>
                        <p
                            className='text-sm text-muted-foreground'
                            suppressHydrationWarning
                        >
                            {timeAgo(createdAt)}
                        </p>
                        {isDeleted ? (
                            <AlertDialogBox
                                description='This will recover your project and restore your data.'
                                className='bg-green-500 text-white dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700'
                                loading={loading}
                                open={open}
                                onClick={handleRecover}
                                handleOpen={() => setOpen(!open)}
                            >
                                <Button
                                    variant={"ghost"}
                                    size={"sm"}
                                    className='bg-background-80 dark:hover:bg-background-90'
                                    disabled={loading}
                                >
                                    Recover
                                </Button>
                            </AlertDialogBox>
                        ) : (
                            <AlertDialogBox
                                description='This will delete your project and send to trash.'
                                className='bg-red-500 text-white dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700'
                                loading={loading}
                                open={open}
                                onClick={handleDelete}
                                handleOpen={() => setOpen(!open)}
                            >
                                <Button
                                    variant={"ghost"}
                                    size={"sm"}
                                    className='bg-background-80 dark:hover:bg-background-90'
                                    disabled={loading}
                                >
                                    Delete
                                </Button>
                            </AlertDialogBox>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default ProjectCard