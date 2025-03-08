import { getProductBySlug } from '@/sanity/lib/products/getProductBySlug'
import { notFound } from 'next/navigation'
import Image from 'next/image';
import React from 'react'
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from 'next-sanity';

type Props = {
    params: Promise<{ slug: string }>
}

async function page({ params }: Props) {
    const slug = (await params).slug
    const product = await getProductBySlug(slug)

    if (!product) return notFound()

    const isOutOfStock = product.stock !== undefined && product.stock <= 0

  return (
    <div className='container mx-auto px-4 py-8'>
        <div className='grid md:grid-cols-2 gap-8'>
            <div className={`relative aspect-square overflow-hidden rounded-lg shadow-lg ${isOutOfStock ? "opacity-50" : "opacity-100"}`}>
                {product.image && (
                    <Image src={urlFor(product.image).url()} alt={product.name || "product image"} fill className='object-contain transition-transform group-hover:scale-105' />
                )}
                {isOutOfStock && (
                    <div className='absolute inset-0 flex justify-center items-center bg-black/50'>
                        <span className='text-white font-bold text-lg'>Out of stock</span>
                    </div>
                )}
            </div>

            <div className='flex flex-col justify-between'>
                <div>
                    <h1 className='text-3xl font-bold mb-4'>
                        {product.name}
                    </h1>
                    <p className='text-xl font-semibold mb-4'>
                        ${product.price?.toFixed(2)}
                    </p>
                    <div className='prose max-w-none mb-6'>
                        {Array.isArray(product.description) && (
                            <PortableText value={product.description} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default page