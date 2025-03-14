import { defineQuery } from "next-sanity";
import { client } from "../client";

export async function getProductById(productId: string) {
    const getProductByIdQuery = defineQuery(`
        *[_type == "product" && _id == $id][0]    
    `)

    try {
        const product = await client.fetch(getProductByIdQuery, { id: productId })

        return product || null
    } catch (error) {
        console.error("Error fetching product by id: ", error)
        return null
    }
}