import { CouponCode } from "@/constants/couponCodes";
import { defineQuery } from "next-sanity";
import { client } from "../client";

export async function getActiveSaleByCouponCode(couponCode: CouponCode) {
    const activeSaleByCouponCodeQuery = defineQuery(`
        *[_type == "sale" && isActive == true && couponCode == $couponCode] | order(validFrom desc)[0]  
    `)

    try {
        const activeSale = await client.fetch(activeSaleByCouponCodeQuery, { couponCode })

        return activeSale || null
    } catch (error) {
        console.error("Error fetching sale:", error)
        return null
    }
}