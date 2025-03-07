import { defineQuery } from "next-sanity";
import { client } from "../client";

export async function getAllProducts() {
    const allProductsQuery = defineQuery(`
        *[_type == "product"]    
    `)

    try {
        const produts = await client.fetch(allProductsQuery)

        return produts || []
    } catch (error) {
        console.log("Error fetchting produts:", error)
        return []
    }
}