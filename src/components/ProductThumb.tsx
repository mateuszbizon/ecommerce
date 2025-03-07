import { urlFor } from '@/sanity/lib/image';
import { Product } from '@/sanity/types'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

type ProductThumbProps = {
    product: Product;
}

function ProductThumb({ product }: ProductThumbProps) {
    const isOutOfStock = product.stock !== undefined && product.stock <= 0

  return (
    <Link href={`/product/${product.slug?.current}`} className={`group flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden ${isOutOfStock ? "opacity-50" : "opacity-100"}`}>
        <div className='relative aspect-square w-full overflow-hidden'>
            {product.image && (
                <Image src={urlFor(product.image).url()} alt={product.name || "product image"} fill className='object-contain transition-transform group-hover:scale-105' />
            )}
            {isOutOfStock && (
                <div className='absolute inset-0 flex justify-center items-center bg-black/50'>
                    <span className='text-white font-bold text-lg'>Out of stock</span>
                </div>
            )}
        </div>

        <div className='p-4'>
            <h2 className='text-lg font-semibold text-gray-800 truncate'>{product.name}</h2>
            <p className='mt-2 text-sm text-gray-600 line-clamp-2'>
                {product.description?.map((block) => {
                    return block._type === "block" ? block.children?.map((child) => child.text).join("") : ""
                }).join(" ") || "No description available"}
            </p>
            <p className='mt-2 text-lg font-bold text-gray-900'>
                ${product.price?.toFixed(2)}
            </p>
        </div>
    </Link>
  )
}

export default ProductThumb