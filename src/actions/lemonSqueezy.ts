"use server"
import lemonSqueezyClient from "@/lib/axios"

export const buySubscription = async (buyUserId: string) => {
    try {
        const res = await lemonSqueezyClient(process.env.LEMON_SQUEEZY_API_KEY).post('/checkouts', {
            data: {
                type: 'checkouts',
                attributes: {
                    checkout_data: {
                        custom: {
                            buyerUserId: buyUserId,
                        },
                    },
                    product_options: {
                        redirect_url: `${process.env.NEXT_PUBLIC_HOST_URL}/dashboard`,
                    },
                },
                relationships: {
                    store: {
                        data: {
                            type: 'stores',
                            id: process.env.LEMON_SQUEEZY_STORE_ID,
                        },
                    },
                    variant: {
                        data: {
                            type: 'variants',
                            id: process.env.LEMON_SQUEEZY_VARIANT_ID,
                        },
                    },
                },
            },
        })
        
        const checkoutUrl = res.data.data.attributes.url
        return {url: checkoutUrl, status: 200}
    } catch (error) {
        console.log('🛑 Error', error)
        return {status: 500, error: 'Failed to create checkout.'}
    }    
}


export const sellerSubscription = async (sellerUserId: string, buyerId: string, projectId: string) => {
    try {
        const res = await lemonSqueezyClient(process.env.LEMON_SQUEEZY_API_KEY).post('/checkouts', {
            data: {
                type: 'checkouts',
                attributes: {
                    checkout_data: {
                        custom: {
                            sellerUserId: sellerUserId,
                            buyerId: buyerId,
                            projectId: projectId
                        },
                    },
                    product_options: {
                        redirect_url: `${process.env.NEXT_PUBLIC_HOST_URL}/dashboard`,
                    },
                },
                relationships: {
                    store: {
                        data: {
                            type: 'stores',
                            id: process.env.LEMON_SQUEEZY_STORE_ID,
                        },
                    },
                    variant: {
                        data: {
                            type: 'variants',
                            id: process.env.LEMON_SQUEEZY_SELLER_VARIANT_ID,
                        },
                    },
                },
            },
        })
        
        const checkoutUrl = res.data.data.attributes.url
        return {url: checkoutUrl, status: 200}
    } catch (error) {
        console.log('🛑 Error', error)
        return {status: 500, error: 'Failed to create seller checkout.'}
    }
}