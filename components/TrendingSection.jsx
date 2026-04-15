"use client";

import Image from "next/image";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";

const filters = ["All", "Menswear", "Womenswear", "Accessories"];

const products = [
  {
    id: 1,
    brand: "Rick Owens",
    name: "Oversized Silk Blend Shirt",
    rating: 4.8,
    price: 2445,
    originalPrice: 3445,
    image: "/cat-full-sleeve.png",
    wishlisted: false,
    category: "Menswear",
  },
  {
    id: 2,
    brand: "Still Kelly",
    name: "Floral Midi Summer Dress",
    rating: 4.9,
    price: 2245,
    originalPrice: 3045,
    image: "/cat-anime.png",
    wishlisted: true,
    category: "Womenswear",
  },
  {
    id: 3,
    brand: "Balenciaga",
    name: "Heavyweight Cotton Hoodie",
    rating: 4.7,
    price: 1150,
    originalPrice: null,
    image: "/cat-hoodies.png",
    wishlisted: false,
    category: "Menswear",
  },
  {
    id: 4,
    brand: "Fear of God",
    name: "Relaxed Fit Cargo Joggers",
    rating: 4.9,
    price: 895,
    originalPrice: null,
    image: "/cat-joggers.png",
    wishlisted: false,
    category: "Menswear",
  },
];

export default function TrendingSection({ initialProducts = [] }) {
  const [activeFilter, setActiveFilter] = useState("All");

  // Only show the first 8 products for trending
  const products = initialProducts?.slice(0, 4);

  const filteredProducts =
    activeFilter === "All"
      ? products
      : products.filter((p) => p.category === activeFilter);

  return (
    <section className="w-full py-10 sm:py-14 bg-white dark:bg-zinc-950 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
      {/* Header with filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
          Trending Now
        </h2>
        <div className="flex items-center gap-1 sm:gap-2 bg-zinc-50 dark:bg-zinc-800 rounded-full p-2.5">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${activeFilter === filter
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-black shadow-sm"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-white/10"
                }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
