"use server"

import { client } from "@/lib/prisma";
import { onAuthenticateUser } from "./user";
import { OutlineCard } from "@/lib/types";
import { JsonValue } from "@prisma/client/runtime/library";

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


export const getProjectId = async(projectId: string) => {
    try {
        const checkUser = await onAuthenticateUser();
        if (checkUser.status !== 200 || !checkUser.user) {
            return { status: 403, error: "⛔👨 User Not Authenticated" }
        }

        const project = await client.project.findUnique({
            where: {
                id: projectId,
            },
        })

        if(!project){
            return { status: 500, error: 'Failed to find project.' }
        }

        return { status: 200, data: project }

    } catch (error) {
        console.log('🛑 Error', error)
        return { status: 500, error: "⛔🛰️ An Internal Server Error." }
    }
}

export const updateSlides = async (projectId: string, slides: JsonValue) => {
    try {
        if(!projectId || !slides){
            return { status: 400, error: "⛔ Project Id or Slides not found." }
        }

        const updateProject = await client.project.update({
            where: {
                id: projectId,
            },
            data: {
                slides,
            },
        })

        if(!updateProject){
            return { status: 500, error: 'Failed to update slides.' }
        }

        return { status: 200, data: updateProject }

    } catch (error) {
        console.log('🛑 Error', error)
        return { status: 500, error: "⛔🛰️ An Internal Server Error." }
    }
}


export const updateTheme = async (projectId: string, theme: string) => {
    try {
        if(!projectId || !theme){
            return {status: 400, error: 'Project ID and slides are required.'}
        }

        const updatedProject = await client.project.update({
            where: {
                id: projectId,
            },
            data: {
                themeName: theme,
            },
        })

        if(!updatedProject){
            return { status: 500, error: 'Failed to update slides.' }
        }

        return { status: 200, data: updatedProject }

    } catch (error) {
        console.log('🛑 Error', error)
        return { status: 500, error: "⛔🛰️ An Internal Server Error." }
    }
}


export const deletedAllProjects = async(projectIds: string[]) => {
    try{

        if(!Array.isArray(projectIds) || projectIds.length === 0){
            return {status: 400, error: 'No Project IDs found.'}
        }

        const checkUser = await onAuthenticateUser()
        if (checkUser.status !== 200 || !checkUser.user) {
            return { status: 403, error: 'User not authenticated' }
        }

        const userId = checkUser.user.id

        const projectsToDelete = await client.project.findMany({
            where: {
                id: {
                    in: projectIds,
                },
                userId: userId,
            }
        })

        if(projectsToDelete.length === 0){
            return {status: 404, error: 'No projects found for the given IDs.'}
        }

        const deletedProjects = await client.project.deleteMany({
            where: {
                id: {
                    in: projectsToDelete.map((project) => project.id),
                },
            }
        })

        return {
            status: 200,
            message: `${deletedProjects.count} projects deleted successfully.`,
        }

    } catch(error){
        console.log('🛑 Error', error)
        return { status: 500, error: "⛔🛰️ An Internal Server Error." }
    }
}


export const getDeletedProjects = async() => {
    try{
        const checkUser = await onAuthenticateUser()
        if (checkUser.status !== 200 || !checkUser.user) {
            return { status: 403, error: 'User not authenticated' }
        }

        const userId = checkUser.user.id

        const deletedProjects = await client.project.findMany({
            where: {
                userId: userId,
                isDeleted: true,
            },
            orderBy: {
                updatedAt: 'desc'
            }
        })

        if(deletedProjects.length === 0){
            return {status: 400, message: 'No deleted projects found.', data: []}
        }

        return {
            status: 200,
            data: deletedProjects,
        }
    } catch (error) {
        console.log('🛑 Error', error)
        return { status: 500, error: "⛔🛰️ An Internal Server Error." }
    }
}