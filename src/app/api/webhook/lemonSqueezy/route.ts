export const dynamic = 'force-dynamic'
import crypto from 'node:crypto'
import {client} from "@/lib/prisma"
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        const rawBody = await req.text()
        const body = JSON.parse(rawBody)

        const { sellerUserId, buyerId, projectId } = body.meta.custom_data

        if(!sellerUserId) {
            return NextResponse.json({error: 'Invalid sellerUserId or id does not exist'}, {status: 400})
        }

        const hmac = crypto.createHmac('sha256', process.env.LEMON_SQUEEZY_WEBHOOK_SECRET!)

        const digest = Buffer.from(hmac.update(rawBody).digest('hex'), "utf8")

        const signature = Buffer.from(req.headers.get("X-signature") || "", "utf8")

        console.log(`digest`, digest)
        console.log(`signature`, signature)

        if(!crypto.timingSafeEqual(digest, signature)){
            throw new Error('Invalid signature.')
        }

        // Update seller subscription status using the existing subscription field
        // since sellerSubscription isn't recognized by the Prisma client yet
        const seller = await client.user.update({
            where: {
                id: sellerUserId
            },
            data: {
                subscription: true // Use existing field as a temporary solution
            }
        })

        if(!seller) {
            return Response.json({
                message: 'Cannot update the seller subscription.',
                status: 404
            })
        }

        // Project relationship update
        // Since we can't use sellerId/buyerId directly yet, we'll use the many-to-many relationships
        if(buyerId && projectId) {
            // Connect the project to the purchaser
            await client.project.update({
                where: {
                    id: projectId
                },
                data: {
                    Purchasers: {
                        connect: {
                            id: buyerId
                        }
                    }
                }
            })
        }

        return Response.json({
            data: seller,
            status: 200
        })
    } catch(error) {
        console.error(error)
        return Response.json({error: 'Internal server error'}, {status: 500})
    }
}