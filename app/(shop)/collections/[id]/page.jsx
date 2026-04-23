import ProductGrid from "@/components/ProductGrid";

async function getCollectionProducts(id) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/collections/${id}`, {
            next: { revalidate: 60 }
        });

        const resObj = await res.json()
        console.log(resObj)
        return resObj;
    } catch (error) {
        console.error("Fetch products failed:", error);
        return [];
    }
}

export default async function CollectionPage({ params }) {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const products = await getCollectionProducts(id);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{products.data.name}</h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{products.data.products.length} Results</p>
            </div>
            <ProductGrid products={products.data.products} />
        </div>
    );
}
