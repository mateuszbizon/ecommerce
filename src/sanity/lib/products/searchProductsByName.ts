import { defineQuery } from "next-sanity";
import { client } from "../client";

export async function searchProductsByName(productName: string) {
    const productNameQuery = defineQuery(`
        *[_type == "product" && name match $name] | order(name asc) 
    `)

    try {
        const products = await client.fetch(productNameQuery, { name: productName })

        return products || []
    } catch (error) {
        console.error("Error fetching products:", error)
        return []
    }
}