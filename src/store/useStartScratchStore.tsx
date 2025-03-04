import { OutlineCard } from '@/lib/types'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface OutlineStore {
    outlines: OutlineCard[]
    addOutline: (outline: OutlineCard) => void
    addMultipleOutlines: (outlines: OutlineCard[]) => void
    resetOutlines: () => void
}

export const useScratchStore = create<OutlineStore>()(
    devtools(
        persist(
            (set) => ({
                outlines: [],
                addOutline: (outline: OutlineCard) => set((state) => ({
                    outlines: [...state.outlines, outline]
                })),
                addMultipleOutlines: (outlines: OutlineCard[]) => set(() => ({
                    outlines: [...outlines]
                })),
                resetOutlines: () => set({ outlines: [] }),
            }), {
            name: 'scratch'
        }
        )

    )
)