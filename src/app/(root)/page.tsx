import BlackFridayBanner from "@/components/BlackFridayBanner";
import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/categories/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { Suspense } from "react";

export default async function Home() {
    const products = await getAllProducts()
    const categories = await getAllCategories()

  return (
    <>
        <Suspense fallback={<p>Loading...</p>}>
            <BlackFridayBanner />
        </Suspense>
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
            <ProductsView products={products} categories={categories} />
        </div>
    </>
  );
}
