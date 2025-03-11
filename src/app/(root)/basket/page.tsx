"use client"

import AddToBasket from '@/components/AddToBasket'
import { urlFor } from '@/sanity/lib/image'
import useBasketStore from '@/store/basket'
import { SignInButton, useAuth, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function page() {
    const { getGroupedItems, getTotalPrice } = useBasketStore()
    const { isSignedIn } = useAuth()
    const { user } = useUser()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    if (getGroupedItems().length == 0) {
        return (
            <div className='container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]'>
                <h1 className='font-bold text-2xl mb-6 text-gray-800'>
                    Your basket
                </h1>
                <p className='text-gray-600 text-lg'>
                    Your basket is empty
                </p>
            </div>
        )
    }

    async function handleCheckout() {
        if (!isSignedIn) return

        setIsLoading(true)
    }

  return (
    <div className='container mx-auto p-4 max-w-6xl'>
        <h1 className='font-bold text-2xl mb-6 text-gray-800'>
            Your basket
        </h1>
        <div className='flex flex-col lg:flex-row gap-8'>
            <div className='flex-grow'>
                {getGroupedItems().map((item) => (
                    <div key={item.product._id} className='mb-4 p-4 border rounded flex items-center justify-between'>
                        <div 
                            className='flex items-center cursor-pointer flex-1 min-w-0' 
                            onClick={() => router.push(`/product/${item.product.slug?.current}`)}
                        >
                            <div className='size-20 sm:size-24 shrink-0 mr-4'>
                                {item.product.image && (
                                    <Image src={urlFor(item.product.image).url()} alt={item.product.name || "product name"} width={96} height={96} className='size-full rounded object-cover' />
                                )}
                            </div>
                            <div className='min-w-0'>
                                <h2 className='text-lg sm:text-xl font-semibold line-clamp-1'>
                                    {item.product.name}
                                </h2>
                                <p className='text-sm sm:text-base'>
                                    Price: $
                                    {((item.product.price || 0) * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        </div>

                        <div className='flex items-center ml-4 shrink-0'>
                            <AddToBasket product={item.product} />
                        </div>
                    </div>
                ))}
            </div>

            <div className='w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-6 border rounded order-first lg:order-last fixed left-0 bottom-0 lg:left-auto'>
                <h3 className='text-xl font-semibold'>
                    Order summary
                </h3>
                <div className='mt-4 space-y-2'>
                    <p className='flex justify-between'>
                        <span>
                            Items:
                        </span>
                        <span>
                            {getGroupedItems().reduce((total, item) => total + item.quantity, 0)}
                        </span>
                    </p>
                    <p className='flex justify-between text-2xl font-bold border-t pt-2'>
                        <span>Total:</span>
                        <span>
                            ${getTotalPrice().toFixed(2)}
                        </span>
                    </p>
                </div>

                {isSignedIn ? (
                    <button 
                        className='mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400'
                        onClick={handleCheckout}
                    >
                        {isLoading ? "Processing" : "Checkout"}
                    </button>
                ) : (
                    <SignInButton mode='modal'>
                        <button className='mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
                            Sign in to checkout
                        </button>
                    </SignInButton>
                )}
            </div>

            <div className='h-64 lg:h-0'>
                
            </div>
        </div>
    </div>
  )
}

export default page