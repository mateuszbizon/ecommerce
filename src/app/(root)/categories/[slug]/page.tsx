import ProductsView from '@/components/ProductsView'
import { getAllCategories } from '@/sanity/lib/categories/getAllCategories'
import { getProductsByCategory } from '@/sanity/lib/products/getProductsByCategory'
import React from 'react'

type Props = {
    params: Promise<{ slug: string }>
}

async function page({ params }: Props) {
    const slug = (await params).slug
    const products = await getProductsByCategory(slug)
    const categories = await getAllCategories()

  return (
    <div className='flex flex-col items-center min-h-screen bg-gray-100 p-4'>
        <div className='bg-white p-8 rounded-lg shadow-md  w-full max-w-4xl'>
            <h1 className='text-3xl font-bold mb-6 text-center'>
                {slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}{" "}
                Collection
            </h1>
            <ProductsView products={products} categories={categories} />
        </div>
    </div>
  )
}

export default page