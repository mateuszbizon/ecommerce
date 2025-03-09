import { defineQuery } from "next-sanity";
import { client } from "../client";

export async function getProductsByCategory(category: string) {
    const productsByCategoryQuery = defineQuery(`
        *[_type == "product" && references(*[_type == "category" && slug.current == $category]._id)]    
    `)

    try {
        const products = await client.fetch(productsByCategoryQuery, { category })

        return products || []
    } catch (error) {
        console.error("Error fetching products:", error)
        return []
    }
}