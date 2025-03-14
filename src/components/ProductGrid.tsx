"use client"

import { Product } from '@/sanity/types'
import { AnimatePresence, motion } from "framer-motion"
import React from 'react'
import ProductThumb from './ProductThumb'

type ProductGridProps = {
    products: Product[]
}

function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
        {products.map((product) => (
            <AnimatePresence key={product._id}>
                <motion.div
                    layout
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className=''
                >
                    <ProductThumb product={product} />
                </motion.div>
            </AnimatePresence>
        ))}
    </div>
  )
}

export default ProductGrid