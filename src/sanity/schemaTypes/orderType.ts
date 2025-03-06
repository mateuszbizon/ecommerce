import { BasketIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const orderType = defineType({
    name: 'order',
    title: 'Orders',
    type: 'document',
    icon: BasketIcon,
    fields: [
        defineField({
            name: "orderNumber",
            title: "Order number",
            type: "string",
            validation: (rule) => rule.required()
        }),
        defineField({
            name: "stripeCheckoutSession",
            title: "Stripe Checkout Session",
            type: "string"
        }),
        defineField({
            name: "stripeCustomerId",
            title: "Stripe Customer Id",
            type: "string",
            validation: (rule) => rule.required()
        }),
        defineField({
            name: "clerkUserId",
            title: "Store User Id",
            type: "string",
            validation: (rule) => rule.required()
        }),
        defineField({
            name: "customerName",
            title: "Customer Name",
            type: "string",
            validation: (rule) => rule.required()
        }),
        defineField({
            name: "email",
            title: "Customer Email",
            type: "string",
            validation: (rule) => rule.required().email()
        }),
        defineField({
            name: "stripePaymentIntentId",
            title: "Stripe Payment Intent Id",
            type: "string",
            validation: (rule) => rule.required()
        }),
        defineField({
            name: "products",
            title: "Products",
            type: "array",
            of: [
                defineArrayMember({
                    type: "object",
                    fields: [
                        defineField({
                            name: "product",
                            title: "Product Bought",
                            type: "reference",
                            to: [{ type: "product" }]
                        }),
                        defineField({
                            name: "quantity",
                            title: "Quantity Purchased",
                            type: "number",
                        }),
                    ],
                    preview: {
                        select: {
                            product: "product.name",
                            image: "product.image",
                            quantity: "quantity",
                            price: "product.price"
                        },
                        prepare(select) {
                            return {
                                title: `${select.product} x ${select.quantity}`,
                                subtitle: `${select.price * select.quantity}`,
                                media: select.image
                            }
                        }
                    }
                })
            ]
        }),
        defineField({
            name: "totalPrice",
            title: "Total Price",
            type: "number",
            validation: (rule) => rule.required().min(0)
        }),
        defineField({
            name: "currency",
            title: "Currency",
            type: "string",
            validation: (rule) => rule.required()
        }),
        defineField({
            name: "amountDiscount",
            title: "Amount Discount",
            type: "number",
            validation: (rule) => rule.min(0)
        }),
        defineField({
            name: "status",
            title: "Order status",
            type: "string",
            options: {
                list: [
                    { title: "Pending", value: "pending" },
                    { title: "Paid", value: "paid" },
                    { title: "Shipped", value: "shipped" },
                    { title: "Delivered", value: "delivered" },
                    { title: "Cancelled", value: "cancelled" },
                ]
            }
        }),
        defineField({
            name: "orderDate",
            title: "Order Date",
            type: "datetime",
            validation: (rule) => rule.required()
        }),
    ],
    preview: {
        select: {
            name: "customerName",
            amount: "totalPrice",
            currency: "currency",
            orderId: "orderNumber",
            email: "email"
        },
        prepare(select) {
            const orderIdSnippet = `${select.orderId.slice(0, 5)}...${select.orderId.slice(-5)}`

            return {
                title: `${select.name} ${orderIdSnippet}`,
                subtitle: `${select.amount} ${select.currency} ${select.email}`,
                media: BasketIcon
            }
        }
    }
})