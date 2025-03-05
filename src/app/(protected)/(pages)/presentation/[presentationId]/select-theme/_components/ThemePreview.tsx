"use client"

import { useSlideStore } from "@/store/useSlideStore"
import { redirect, useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useAnimation } from "framer-motion"
import { Theme } from "@/lib/types"
import { Button } from "@/components/ui/button"

type Props = {}

const ThemePreview = (props: Props) => {
    const router = useRouter()
    const params = useParams()
    const {currentTheme, project, setCurrentTheme} = useSlideStore()
    const controls = useAnimation()
    const [selectedTheme, setSelectedTheme] = useState<Theme>(currentTheme)

    useEffect(() => {
        if(project?.slides){
            redirect(`/presentation/${params.presentationId}`)
        }
        
    },[project])

    useEffect(() => {
        controls.start('visible')
    }, [controls, selectedTheme])

    const leftCardContent = (
        <div className='space-y-4 '>
            <div 
                className="rounded-xl p-6"
                style={{backgroundColor: selectedTheme.accentColor + '10'}}
            >
                <h3
                    className="text-xl font-semibold mb-4"
                    style={{color: selectedTheme.accentColor}}
                >
                    Quick Start Guide
                </h3>
                <ol
                    className="list-decimal list-inside spac-y-2"
                    style={{color: selectedTheme.accentColor}}
                >
                    <li>Create a them</li>
                    <li>Customize colors and fonts</li>
                    <li>Add your content</li>
                    <li>Previeww and Publish</li>
                </ol>
            </div>
            <Button
                className="w-full h-12 text-lg font-medium"
                style={{
                    backgroundColor: selectedTheme.accentColor,
                    color: selectedTheme.accentColor
                }}
            >
                Get Started
            </Button>
        </div>
    )

    const mainContent = (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                    className="rounded-xl p-6"
                    style={{backgroundColor: selectedTheme.accentColor + '10'}}
                >
                    <p style={{color: selectedTheme.accentColor}}>
                        This is a smart layout: it acts as a text box.
                    </p>
                </div>
                <div
                    className="rounded-xl p-6"
                    style={{backgroundColor: selectedTheme.accentColor + '10'}}
                >
                    <p style={{color: selectedTheme.accentColor}}>
                        You can get these by typing /smary
                    </p>
                </div>
            </div>
            <div className="flex flex-wrap gap-4">
                <Button
                    className="h-12 px-6 text-lg font-medium"
                    style={{
                        backgroundColor: selectedTheme.accentColor,
                        color: selectedTheme.fontColor,
                    }}
                >
                    Primary Button
                </Button>
                <Button
                    variant={'outline'}
                    className="h-12 px-6 text-lg font-medium"
                    style={{
                        backgroundColor: selectedTheme.accentColor,
                        color: selectedTheme.fontColor,
                    }}
                >
                    secondary Button
                </Button>
            </div>
        </div>
    )

    const rightCardContent = (
        <div>
            
        </div>
    )
}

export default ThemePreview