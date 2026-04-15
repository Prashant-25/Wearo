import ProductGrid from "@/components/ProductGrid";

async function getWomenProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products?gender=2`, {
      next: { revalidate: 0 }
    });
    const resObj = await res.json()
    return resObj.data;
  } catch (error) {
    console.error("Fetch women products failed:", error);
    return [];
  }
}

export default async function WomenProductsPage() {
  const products = await getWomenProducts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Women's Collection</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{products.length} Results</p>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}
