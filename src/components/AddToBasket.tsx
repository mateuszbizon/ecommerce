"use client"

import React from 'react'
import { Button } from './ui/button'
import useBasketStore from '@/store/basket'
import { Product } from '@/sanity/types'

type AddToBasketProps = {
    product: Product
}

function AddToBasket({ product }: AddToBasketProps) {
    const { addItem, removeItem, getItemCount } = useBasketStore()
    const itemCount = getItemCount(product._id)
    const isOutOfStock = product.stock !== undefined && product.stock <= 0

  return (
    <div className='flex items-center justify-center space-x-2'>
        <Button 
            onClick={() => removeItem(product._id)}
            className={`size-8 rounded-full ${itemCount == 0 ? "bg-gray-100 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"}`} 
            disabled={itemCount == 0 || isOutOfStock}
        >
            <span className={`text-xl font-bold ${itemCount == 0 ? "text-gray-400" : "text-gray-600"}`}>
                -
            </span>
        </Button>

        <span className='w-8 text-center font-semibold'>
            {itemCount}
        </span>

        <Button 
            onClick={() => addItem(product)}
            className={`size-8 rounded-full ${isOutOfStock ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`} 
            disabled={isOutOfStock}
        >
            <span className={`text-xl font-bold text-white`}>
                +
            </span>
        </Button>
    </div>
  )
}

export default AddToBasket