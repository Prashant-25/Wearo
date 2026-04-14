"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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

export default function TrendingSection() {
  const [activeFilter, setActiveFilter] = useState("All");

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

function ProductCard({ product }) {
  const [wishlisted, setWishlisted] = useState(product.wishlisted);

  return (
    <div className="group bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Image area */}
      <div className="relative aspect-square bg-zinc-50 dark:bg-zinc-800/50 m-3 rounded-2xl flex items-center justify-center overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Wishlist button */}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-zinc-800 shadow-sm hover:shadow-md transition-all duration-200"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={wishlisted ? "#f97316" : "none"}
            stroke={wishlisted ? "#f97316" : "currentColor"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-zinc-400"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>
      </div>

      {/* Product info */}
      <div className="px-4 pb-4 pt-3">
        {/* Brand + Rating */}
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-semibold text-zinc-900 dark:text-white">
            {product.brand}
          </span>
          <div className="flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="#facc15"
              stroke="#facc15"
              strokeWidth="1"
              aria-hidden="true"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span>{product.rating}</span>
          </div>
        </div>

        {/* Product name */}
        <p className="text-sm text-zinc-400 dark:text-zinc-500 mb-3 leading-snug">
          {product.name}
        </p>

        {/* Price + Action */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-zinc-900 dark:text-white">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-zinc-400 line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <Link
            href={`/products/${product.id}`}
            aria-label={`View ${product.name}`}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black hover:scale-110 transition-transform duration-200 shadow-sm"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17 17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
