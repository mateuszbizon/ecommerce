import { defineQuery } from "next-sanity";
import { client } from "../client";

export async function getProductBySlug(productSlug: string) {
    const productBySlugQuery = defineQuery(`
        *[_type == "product" && slug.current == $slug][0]    
    `)

    try {
        const product = await client.fetch(productBySlugQuery, { slug: productSlug })

        return product || null
    } catch (error) {
        console.error("Error fetching product:", error)
        return null
    }
}