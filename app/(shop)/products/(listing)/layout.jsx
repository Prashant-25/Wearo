import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FilterSidebar from "@/components/FilterSidebar";

export const metadata = {
  title: "Products | Wearo",
  description: "Browse all premium clothing from Wearo.",
};

export default function ProductsLayout({ children }) {
  return (
    <div className="max-w-[1400px] relative w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <Suspense fallback={<div className="w-64 h-screen animate-pulse bg-zinc-100 dark:bg-zinc-800 rounded-2xl" />}>
        <FilterSidebar />
      </Suspense>

      {/* Main Content Area */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
