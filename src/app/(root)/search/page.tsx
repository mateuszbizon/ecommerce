import ProductGrid from '@/components/ProductGrid'
import { searchProductsByName } from '@/sanity/lib/products/searchProductsByName'
import React from 'react'

type Props = {
    searchParams: Promise<{ query: string }>
}

async function page({ searchParams }: Props) {
    const query = (await searchParams).query
    const products = await searchProductsByName(query)

  return (
    <div className='flex flex-col items-center min-h-screen bg-gray-100 p-4'>
        <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-4xl'>
            {products.length ? (
                <>
                    <h1 className='text-3xl font-bold mb-6 text-center'>Search results for {query}</h1>
                    <ProductGrid products={products} />
                </>
            ) : (
                <>
                    <h1 className='text-3xl font-bold mb-6 text-center'>No products found for {query}</h1>
                    <p className='text-gray-600 text-center'>
                        Try searching with different keywords
                    </p>
                </>
            )}
        </div>
        {/* {products.length ? (
            <div className='flex flex-col items-center min-h-screen bg-gray-100 p-4'>
                <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-4xl'>
                    <h1 className='text-3xl font-bold mb-6 text-center'>Search results for {query}</h1>
                    <ProductGrid products={products} />
                </div>
            </div>
        ) : (
            <div className='flex flex-col items-center min-h-screen bg-gray-100 p-4'>
                <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-4xl'>
                    <h1 className='text-3xl font-bold mb-6 text-center'>No products found for {query}</h1>
                    <p className='text-gray-600 text-center'>
                        Try searching with different keywords
                    </p>
                </div>
            </div>
        )} */}
    </div>
  )
}

export default page