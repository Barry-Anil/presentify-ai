import { Home, LucideWorkflow, Settings, Trash2Icon } from "lucide-react";

export const data = {
    user: {
        name: 'Shadcn',
        email: 'm@email.com',
        avatar: '/avatars/shadcn.jpg',
    },

    navMain: [
        {
            title: "Home",
            url: '/dashboard',
            icon: Home,
        },
        {
            title: "Templates",
            url: '/templates',
            icon: LucideWorkflow,
        },
        {
            title: "Trash",
            url: '/trash',
            icon: Trash2Icon,
        },
        {
            title: "Settings",
            url: '/settings',
            icon: Settings,
        },

    ]
}