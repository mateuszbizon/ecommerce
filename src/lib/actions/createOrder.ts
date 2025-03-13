"use server"

import Stripe from "stripe";
import { CheckoutData } from "./createCheckoutSession";
import stripe from "../stripe";
import { backendClient } from "@/sanity/lib/backendClient";

export async function createOrder(session: Stripe.Checkout.Session) {
    const {
        id,
        amount_total,
        currency,
        metadata,
        payment_intent,
        customer,
        total_details
    } = session

    const { orderNumber, customerName, clerkUserId, customerEmail } = metadata as CheckoutData

    const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
        id,
        {
            expand: ["data.price.product"]
        }
    )

    const products = lineItemsWithProduct.data.map(item => ({
        _key: crypto.randomUUID(),
        product: {
            _type: "reference",
            _ref: (item.price?.product as Stripe.Product).metadata.id
        },
        quantity: item.quantity || 0
    }))

    const order = await backendClient.create({
        _type: "order",
        orderNumber,
        stripeCheckoutSession: id,
        stripePaymentIntentId: payment_intent,
        customerName,
        stripeCustomerId: customer,
        clerkUserId: clerkUserId,
        email: customerEmail,
        currency,
        amountDiscount: total_details?.amount_discount ? total_details.amount_discount / 100 : 0,
        products,
        totalPrice: amount_total ? amount_total / 100 : 0,
        status: "paid",
        orderDate: new Date().toISOString(),
    })

    return order
}