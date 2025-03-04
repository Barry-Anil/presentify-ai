"use server"

import { client } from "@/lib/prisma";
import { onAuthenticateUser } from "./user";
import { error } from "console";
import { OutlineCard } from "@/lib/types";

export const getAllProjects = async () => {
    try {
        const checkUser = await onAuthenticateUser();
        if (checkUser.status !== 200 || !checkUser.user) {
            return { status: 403, error: "⛔👨 User Not Authenticated" }
        }

        const projects = await client.project.findMany({
            where: {
                userId: checkUser.user.id,
                isDeleted: false,
            },
            orderBy: {
                updatedAt: 'desc',
            }
        })
        if (projects.length === 0) {
            return { status: 404, error: "⛔🚧 No Projects Found" }
        }

        return { status: 200, data: projects }

    } catch (error) {
        console.log('🛑 Error', error)
        return { status: 500, error: "⛔🛰️ An Internal Server Error." }
    }
}

export const getRecentProjects = async () => {
    try {
        const checkUser = await onAuthenticateUser();
        if (checkUser.status !== 200 || !checkUser.user) {
            return { status: 403, error: "⛔👨 User Not Authenticated" }
        }

        const projects = await client.project.findMany({
            where: {
                userId: checkUser.user.id,
                isDeleted: false,
            },
            orderBy: {
                updatedAt: 'desc',
            },
            take: 5
        })

        if (projects.length === 0) {
            return {
                status: 404,
                error: "No recent projects available"
            }
        }
        return { status: 200, data: projects }
    } catch (error) {
        console.log('🛑 Error', error)
        return { status: 500, error: "⛔🛰️ An Internal Server Error." }
    }
}

export const recoverProject = async (projectId: string) => {
    try {
        const checkUser = await onAuthenticateUser();
        if (checkUser.status !== 200 || !checkUser.user) {
            return { status: 403, error: "⛔👨 User Not Authenticated" }
        }

        const updatedProjects = await client.project.update({
            where: {
                id: projectId,
            },
            data: {
                isDeleted: false,
            },
        })

        if (!updatedProjects) {
            return { status: 500, error: 'Failed to recover project.' }
        }

        return { status: 200, data: updatedProjects }

    } catch (error) {
        console.log('🛑 Error', error)
        return { status: 500, error: "⛔🛰️ An Internal Server Error." }
    }
}

export const deleteProjects = async (projectId: string) => {
    try {
        const checkUser = await onAuthenticateUser();
        if (checkUser.status !== 200 || !checkUser.user) {
            return { status: 403, error: "⛔👨 User Not Authenticated" }
        }
        const deletedProjects = await client.project.update({
            where: {
                id: projectId,
            },
            data: {
                isDeleted: true,
            },

        })

        if (!deletedProjects) {
            return { status: 500, error: 'Failed to recover project.' }
        }

        return { status: 200, data: deletedProjects }
    } catch (error) {
        console.log('🛑 Error', error)
        return { status: 500, error: "⛔🛰️ An Internal Server Error." }
    }
}


export const createProject = async (title: string, outlines: OutlineCard[]) => {
    try {
        if (!title || !outlines || outlines.length === 0) {
            return {
                status: 400,
                error: 'Title and outlines are required.'
            }
        }
        const allOutlines = outlines.map((outline) => outline.title)

        const checkUser = await onAuthenticateUser()
        if (checkUser.status !== 200 || !checkUser.user) {
            return { status: 403, error: 'User not authenticated' }
        }

        const project = await client.project.create({
            data: {
                title,
                outlines: allOutlines,
                createdAt: new Date(),
                updatedAt: new Date(),
                userId: checkUser.user.id
            },
        })
        if (!project) {
            return { status: 500, error: 'Failed to create project.' }
        }

        return { status: 200, data: project }

    } catch (error) {
        console.log('🛑 Error', error)
        return { status: 500, error: "⛔🛰️ An Internal Server Error." }
    }
}