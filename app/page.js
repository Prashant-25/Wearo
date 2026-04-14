import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import TrendingSection from "@/components/TrendingSection";
import SaleBanner from "@/components/SaleBanner";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black w-full">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <HeroSection />
        <CategorySection />
        <TrendingSection />
        <SaleBanner />
      </div>
    </main>
  );
}
