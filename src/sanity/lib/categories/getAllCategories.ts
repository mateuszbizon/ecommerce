import { defineQuery } from "next-sanity";
import { client } from "../client";

export async function getAllCategories() {
    const allCategoriesQuery = defineQuery(`
        *[_type == "category"]    
    `)

    try {
        const categories = await client.fetch(allCategoriesQuery)

        return categories || []
    } catch (error) {
        console.log("Error fetching categories:", error)
        return []
    }
}