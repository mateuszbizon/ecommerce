"use client"

import { ClerkLoaded, SignedIn, SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import Form from "next/form"
import { PackageIcon, TrolleyIcon } from '@sanity/icons'
import useBasketStore from '@/store/basket'

function Header() {
    const { user } = useUser()
    // const itemCount = useBasketStore((state) => {
    //     return state.items.reduce((total, item) => total + item.quantity, 0)
    // })
    const { getAllItemsQuantity } = useBasketStore()

  return (
    <header className='flex flex-wrap justify-between items-center px-4 py-2'>
        <div className='flex flex-wrap justify-between items-center w-full'>
            <Link href={"/"} className='text-2xl font-bold text-blue-500 hover:opacity-50 mx-auto sm:mx-0'>
                Shop
            </Link>

            <Form action={"/search"} className='w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0'>
                <input type="text" name='query' className='bg-gray-100 text-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 border w-full max-w-4xl' placeholder='Search for products' />

            </Form>

            <div className='flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none'>
                <Link href={"/basket"} className='flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded'>
                    <TrolleyIcon className='size-6' />
                    <span>My Basket</span>
                    <div className='absolute -top-2 -right-2 flex justify-center items-center size-5 rounded-full bg-red-500 text-white text-xs'>
                        <span>{getAllItemsQuantity()}</span>
                    </div>
                </Link>

                <ClerkLoaded>
                    <SignedIn>
                        <Link href={"/orders"} className='flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded'>
                            <PackageIcon className='size-6' />
                            <span>My Orders</span>
                        </Link>
                    </SignedIn>
                    {user ? (
                        <div className='flex items-center space-x-2'>
                            <UserButton />

                            <div className='hidden sm:block text-xs'>
                                <p className='text-gray-400'>Welcome Back</p>
                                <p className='font-bold'>{user.fullName}!</p>
                            </div>
                        </div>
                    ) : (
                        <SignInButton mode='modal' />
                    )}
                </ClerkLoaded>
            </div>
        </div>
    </header>
  )
}

export default Header