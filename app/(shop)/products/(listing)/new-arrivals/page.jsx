import ProductGrid from "@/components/ProductGrid";

async function getNewArrivals() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products?new=true`, {
      next: { revalidate: 10 }
    });
    if (!res.ok) return [];
    const resObj = await res.json()
    return resObj.data;
  } catch (error) {
    console.error("Fetch new arrivals failed:", error);
    return [];
  }
}

export default async function NewArrivalsPage() {
  const products = await getNewArrivals();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">New Arrivals</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{products.length} Results</p>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}
