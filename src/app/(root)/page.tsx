import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/categories/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export default async function Home() {
    const products = await getAllProducts()
    const categories = await getAllCategories()

  return (
    <>
        <h1>Home Page</h1>
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
            <ProductsView products={products} categories={categories} />
        </div>
    </>
  );
}
