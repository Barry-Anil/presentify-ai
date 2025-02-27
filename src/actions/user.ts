"use server"
import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"

export const onAuthenticateUser = async () => {
    try {
        const user = await currentUser();
        if (!user) {
            return { status: 403, error: "⛔👨 User Not Authenticated" }
        }

        const userExist = await client.user.findUnique({
            where: {
                clerkId: user.id,
            },
            include: {
                PurchasedProjects: {
                    select: {
                        id: true,
                    },
                },
            },
        })


        if (userExist) {
            return {
                status: 200,
                user: userExist
            }
        }

        const newUser = await client.user.create({
            data: {
                clerkId: user.id,
                email: user.emailAddresses[0].emailAddress,
                name: user.firstName + " " + user.lastName,
                profileImage: user.imageUrl,
            },
        })

        console.log(newUser, "new user")

        if (newUser) {
            return { status: 201, user: newUser }
        }

        return { status: 400 }

    } catch (error) {
        console.log('🛑 Error', error)
        return { status: 500, error: "An Internal Server Error." }
    }
}