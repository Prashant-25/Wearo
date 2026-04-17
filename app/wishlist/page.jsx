"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, ArrowLeft, ShoppingBag } from "lucide-react";
import { useWishlistStore } from "@/store/useWishlistStore";
import { Button } from "@/components/ui/button";
import ProductGrid from "@/components/ProductGrid";

export default function WishlistPage() {
  const { wishlist } = useWishlistStore();
  const [mounted, setMounted] = useState(false);

  // Fix hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (wishlist.length === 0) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 py-20 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-6 bg-zinc-100 dark:bg-zinc-900 rounded-full">
            <Heart size={48} className="text-zinc-400" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4">Your wishlist is empty</h1>
        <p className="text-zinc-500 mb-8 max-w-md mx-auto">
          Save items that you like to your wishlist so you can find them easily later and stay updated on price drops.
        </p>
        <Link href="/products">
          <Button size="lg" variant="outline" className="rounded-full px-8">
            Explore Collection
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <Link href="/products" className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Wishlist</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              You have {wishlist.length} saved {wishlist.length === 1 ? 'item' : 'items'}
            </p>
          </div>
        </div>

        <Link href="/cart">
          <Button variant="ghost" className="rounded-full gap-2">
            <ShoppingBag size={18} />
            View Cart
          </Button>
        </Link>
      </div>

      <ProductGrid products={wishlist} />

      <div className="mt-20 py-10 border-t border-zinc-100 dark:border-zinc-800 text-center">
        <p className="text-zinc-400 text-sm mb-4">Want to see more?</p>
        <Link href="/products/new-arrivals">
          <Button variant="link" className="text-zinc-900 dark:text-white font-bold decoration-2 underline-offset-4">
            Check New Arrivals
          </Button>
        </Link>
      </div>
    </div>
  );
}
