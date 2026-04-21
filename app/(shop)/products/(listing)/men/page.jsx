import ProductGrid from "@/components/ProductGrid";

async function getMenProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products?gender=1`, {
      next: { revalidate: 10 }
    });
    if (!res.ok) return [];
    const resObj = await res.json()
    return resObj.data;
  } catch (error) {
    console.error("Fetch men products failed:", error);
    return [];
  }
}

export default async function MenProductsPage() {
  const products = await getMenProducts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Men's Collection</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{products.length} Results</p>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}
