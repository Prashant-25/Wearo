import ProductGrid from "@/components/ProductGrid";

async function getOversizedProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products?gender=3`, {
      next: { revalidate: 0 }
    });
    const resObj = await res.json()
    return resObj.data;
  } catch (error) {
    console.error("Fetch oversized products failed:", error);
    return [];
  }
}

export default async function OversizedProductsPage() {
  const products = await getOversizedProducts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Oversized Fits</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{products.length} Results</p>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}
