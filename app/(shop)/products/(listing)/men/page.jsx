import ProductGrid from "@/components/ProductGrid";

async function getMenProducts(searchParams) {
  try {
    const params = new URLSearchParams(searchParams);
    params.set('gender', '1');
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products?${params.toString()}`, {
      cache: 'no-store'
    });
    if (!res.ok) return [];
    const resObj = await res.json()
    return resObj.data;
  } catch (error) {
    console.error("Fetch men products failed:", error);
    return [];
  }
}

export default async function MenProductsPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const products = await getMenProducts(resolvedParams);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Men's Collection</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{products?.length || 0} Results</p>
      </div>
      <ProductGrid products={products || []} />
    </div>
  );
}
