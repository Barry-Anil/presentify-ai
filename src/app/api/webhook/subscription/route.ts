export const dynamic = 'force-dynamic'
import crypto from 'node:crypto'
import {client} from "@/lib/prisma"
import { NextRequest, NextResponse } from 'next/server'


export async function POST(req: NextRequest) {
    try{
        const rawBody = await req.text()
        const body = JSON.parse(rawBody)

        const { buyerUserId } = body.meta.custom_data

        if(!buyerUserId) {
            return NextResponse.json({error: 'Invalid buyerUserId or id doesnot exist'}, {status: 400})
        }

        const hmac = crypto.createHmac('sha256', process.env.LEMON_SQUEEZY_WEBHOOK_SECRET!)

        const digest = Buffer.from(hmac.update(rawBody).digest('hex'), "utf8")

        const signature = Buffer.from(req.headers.get("X-signature") || "", "utf8")

        console.log(`digest`, digest)
        console.log(`signature`, signature)


        if(!crypto.timingSafeEqual(digest, signature)){
            throw new Error('Invalid signature.')
        }

        const buyer = await client.user.update({
            where: {
                id: buyerUserId
            },
            data: {
                subscription: true
            }
        })

        if(!buyer) {
            return Response.json({
                message: 'Cannot update the subscription.',
                status: 404
            })
        }

        return Response.json({
            data: buyer,
            status: 200
        })
    }catch(error){
        console.error(error)
        return Response.json({error: 'Internal server error'}, {status: 500})
    }
}