import { OutlineCard } from '@/lib/types'
import {create} from 'zustand'
import {persist} from 'zustand/middleware'

interface CreativeAIStore{
    outlines: OutlineCard[] | [],
    currentAIPrompt: string
    addMultipleOutlines : (outlines: OutlineCard[]) => void;
    addOutline: (outline: OutlineCard) => void
    setCurrentPrompt: (prompt: string) => void
    resetOutlines: () => void
}

export const useCreativeAIStore = create<CreativeAIStore>()(
    persist((set) => ({
        outlines: [],
        currentAIPrompt: '',
        addMultipleOutlines: (outlines: OutlineCard[]) => set(() => ({
            outlines: [...outlines]
        })),
        addOutline: (outline: OutlineCard) => set((state) => ({outlines: [...state.outlines, outline]})),
        setCurrentPrompt: (prompt: string) => set(() => ({currentAIPrompt: prompt})),
        resetOutlines: () => {
            set({outlines: []})
        }
    }), {
        name: 'creative-ai'
    })
)

export default useCreativeAIStore