import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const saleType = defineType({
    name: 'sale',
    title: 'Sales',
    type: 'document',
    icon: TagIcon,
    fields: [
        defineField({
            name: "title",
            title: "Sale Title",
            type: "string",
            validation: (rule) => rule.required()
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
            validation: (rule) => rule.required()
        }),
        defineField({
            name: "discountAmount",
            title: "Discount Amount",
            type: "number",
        }),
        defineField({
            name: "couponCode",
            title: "Coupon Code",
            type: "string",
        }),
        defineField({
            name: "validFrom",
            title: "Valid From",
            type: "datetime",
        }),
        defineField({
            name: "validUntil",
            title: "Valid Until",
            type: "datetime",
        }),
        defineField({
            name: "isActive",
            title: "Is Active",
            type: "boolean",
            initialValue: true
        }),
    ],
})