import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import TrendingSection from "@/components/TrendingSection";
import SaleBanner from "@/components/SaleBanner";

async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    const resObj = await res.json()
    if (!res.ok) return [];
    return resObj.data;
  } catch (error) {
    console.error("Home fetch failed:", error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black w-full">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <HeroSection />
        <CategorySection />
        <TrendingSection initialProducts={products} />
        <SaleBanner />
      </div>
    </main>
  );
}
