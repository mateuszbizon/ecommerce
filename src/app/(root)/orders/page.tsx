import { formatCurrency } from '@/lib/formatCurrency'
import { urlFor } from '@/sanity/lib/image'
import { getUserOrders } from '@/sanity/lib/orders/getUserOrders'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

async function page() {
    const { userId } = await auth()

    if (!userId) return redirect("/")

    const orders = await getUserOrders(userId)

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4'>
        <div className='bg-white p-4 sm:p-8 rounded-xl shadow-lg w-full max-w-4xl'>
            <h1 className='text-4xl font-bold text-gray-900 tracking-tight mb-8'>
                My orders
            </h1>

            {orders.length == 0 ? (
                <p className='text-center text-gray-600'>
                    You have not orders yet
                </p>
            ) : (
                <div className='space-y-6 sm:space-y-8'>
                    {orders.map(order => (
                        <div key={order._id} className='bg-white border-b border-gray-200 rounded-lg shadow-sm overflow-hidden'>
                            <div className='p-4 sm:p-6 border-b border-gray-200'>
                                <div className='flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-4'>
                                    <div>
                                        <p className='text-sm text-gray-600 mb-1 font-bold'>
                                            Order number
                                        </p>
                                        <p className='text-sm text-green-600 break-all font-mono'>
                                            {order.orderNumber}
                                        </p>
                                    </div>
                                    <div className='sm:text-right'>
                                        <p className='text-sm text-gray-600 mb-1'>
                                            Order date
                                        </p>
                                        <p className='font-medium'>
                                            {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : "N/A"}
                                        </p>
                                    </div>
                                </div>

                                <div className='flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center'>
                                    <div className='flex items-center'>
                                        <span className='text-sm mr-2'>
                                            Status:
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-sm ${order.status === "paid" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className='sm:text-right'>
                                        <p className='text-sm text-gray-600 mb-1'>
                                            Total amount:
                                        </p>
                                        <p className='text-lg font-bold'>
                                            {formatCurrency(order.totalPrice || 0, order.currency)}
                                        </p>
                                    </div>
                                </div>

                                {order.amountDiscount ? (
                                    <div className='mt-4 p-3 sm:p-4 bg-red-50 rounded-lg'>
                                        <p className='text-red-600 font-medium mb-1 text-sm sm:text-base'>
                                            Discount applied:{" "}
                                            {formatCurrency(order.amountDiscount, order.currency)}
                                        </p>
                                        <p className='text-sm text-gray-600'>
                                            Original subtotal:{" "}
                                            {formatCurrency((order.totalPrice || 0) + order.amountDiscount, order.currency)}
                                        </p>
                                    </div>
                                ) : null}
                            </div>

                            <div className='px-4 py-3 sm:px-6 sm:py-4'>
                                <p className='text-sm font-semibold text-gray-600 mb-3 sm:mb-4'>
                                    Order items
                                </p>
                                <div className='space-y-3 sm:space-y-4'>
                                    {order.products?.map(product => (
                                        <div key={product.product?._id} className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-2 border-b last:border-b-0'>
                                            <div className='flex items-center gap-3 sm:gap-4'>
                                                {product.product?.image && (
                                                    <div className='relative size-14 sm:size-16 shrink-0 rounded-md overflow-hidden'>
                                                        <Image src={urlFor(product.product.image).url()} alt={product.product.name || "Product name"} fill className='object-cover' />
                                                    </div>
                                                )}
                                                <div>
                                                    <p className='font-medium text-sm sm:text-base'>
                                                        {product.product?.name}
                                                    </p>
                                                    <p className='text-sm text-gray-600'>
                                                        Quantity: {product.quantity || "N/A"}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className='font-medium text-right'>
                                                {product.product?.price && product.quantity ? (
                                                    formatCurrency(product.product.price * product.quantity, order.currency)
                                                ) : "N/A"}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
  )
}

export default page