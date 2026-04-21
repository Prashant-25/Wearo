import ProductGrid from "@/components/ProductGrid";

async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products`, {
      next: { revalidate: 60 } // Ensure fresh data
    });

    const resObj = await res.json()
    return resObj.data;
  } catch (error) {
    console.error("Fetch products failed:", error);
    return [];
  }
}

export default async function AllProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">All Products</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{products.length} Results</p>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}
