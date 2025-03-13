import { createOrder } from "@/lib/actions/createOrder";
import stripe from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
    const body = await req.text()
    const headersList = await headers()
    const sig = headersList.get("stripe-signature")

    if (!sig) {
        return NextResponse.json({ error: "No signature" }, { status: 400 })
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

    if (!webhookSecret) {
        console.error("Webhook secret not set")
        return NextResponse.json({ error: "Webhook secret not set" }, { status: 400 })
    }

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
    } catch (error) {
        console.error("Webhook secret verification failed")
        return NextResponse.json({ error: "Webhook secret verification failed" }, { status: 400 })
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object

        try {
            const order = await createOrder(session)
            console.log("Order created: ", order)
        } catch (error) {
            console.error("Error creating order: ", error)
            return NextResponse.json({ error: "Error creating order" }, { status: 400 })
        }
    }

    return NextResponse.json({ received: true })
}