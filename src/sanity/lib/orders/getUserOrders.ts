import { defineQuery } from "next-sanity";
import { client } from "../client";

export async function getUserOrders(userId: string) {
    const getUserOrdersQuery = defineQuery(`
        *[_type == "order" && clerkUserId == $userId] {
            ...,
            products[]{
                ...,
                product->
            }
        }    
    `)

    try {
        const orders = await client.fetch(getUserOrdersQuery, { userId })

        return orders || []
    } catch (error) {
        console.log("Error fetching user orders: ", error)
        return []
    }
}