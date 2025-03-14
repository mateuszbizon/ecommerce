"use server"

import { BasketItem } from "@/store/basket"
import stripe from "../stripe"
import { urlFor } from "@/sanity/lib/image"

export type CheckoutData = {
    orderNumber: string
    customerName: string
    customerEmail: string
    clerkUserId: string
}

export type GroupedBasketItem = {
    product: BasketItem["product"]
    quantity: number
}

export async function createCheckoutSession(items: GroupedBasketItem[], data: CheckoutData) {
    try {
        const itemsWithoutPrice = items.filter(item => !item.product.price)

        if (itemsWithoutPrice.length > 0) {
            throw new Error("Some items don't have a price")
        }

        const customers = await stripe.customers.list({
            email: data.customerEmail,
            limit: 1
        })

        let customerId: string | undefined

        if (customers.data.length > 0) {
            customerId = customers.data[0].id
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: [
                "blik",
                "card"
            ],
            customer: customerId,
            customer_creation: customerId ? undefined : "always",
            customer_email: !customerId ? data.customerEmail : undefined,
            metadata: data,
            mode: "payment",
            allow_promotion_codes: true,
            success_url: `${process.env.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${data.orderNumber}`,
            cancel_url: `${process.env.BASE_URL}/basket`,
            line_items: items.map(item => ({
                quantity: item.quantity,
                price_data: {
                    currency: "pln",
                    unit_amount: Math.round(item.product.price! * 100),
                    product_data: {
                        name: item.product.name || "Product without name",
                        description: `Product Id: ${item.product._id}`,
                        metadata: {
                            id: item.product._id
                        },
                        images: item.product.image ? [urlFor(item.product.image).url()] : undefined
                    }
                }
            }))
        })

        return session.url
    } catch (error) {
        console.error("Error creating checkout: ", error)
        throw error
    }
}