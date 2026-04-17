"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function CartPage() {
  const { cart, removeItem, updateQuantity, subtotal } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Fix hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const shipping = subtotal > 150 ? 0 : 15;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 py-20 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-6 bg-zinc-100 dark:bg-zinc-900 rounded-full">
            <ShoppingBag size={48} className="text-zinc-400" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-zinc-500 mb-8 max-w-md mx-auto">
          Looks like you haven't added anything to your cart yet. Discover our latest collections and start shopping.
        </p>
        <Link href="/products">
          <Button size="lg" className="rounded-full px-8">
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 ">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/products" className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Shopping Cart ({cart.length})</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items List */}
        <div className="flex-2 space-y-8">
          {cart.map((item) => (
            <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-6 pb-8 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
              {/* Product Image */}
              <div className="relative w-24 h-32 sm:w-32 sm:h-40 bg-zinc-100 dark:bg-zinc-900 overflow-hidden rounded-xl shrink-0">
                {item.image ? (
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] text-zinc-400 uppercase text-center p-2">
                    No Image
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="flex flex-col flex-1">
                <div className="flex justify-between gap-4 mb-2">
                  <div>
                    <h3 className="font-semibold text-lg text-zinc-900 dark:text-white leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-sm text-zinc-500 mt-1 uppercase tracking-wider font-medium">
                      {item.brand || "Wearo"}
                    </p>
                  </div>
                  <span className="font-bold text-lg">${item.price * item.quantity}</span>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-zinc-500 mb-6">
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-zinc-900 dark:text-zinc-300">Size:</span> {item.size}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-zinc-900 dark:text-zinc-300">Color:</span>
                    <span className="capitalize">{item.color}</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-full p-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                      className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors disabled:opacity-30"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                      className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id, item.size, item.color)}
                    className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors py-2 px-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-sm font-medium"
                  >
                    <Trash2 size={16} />
                    <span className="hidden sm:inline">Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Summary */}
        <div className="flex-[1] lg:sticky lg:top-32 h-fit">
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-100 dark:border-zinc-800">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                <span>Subtotal</span>
                <span className="font-semibold text-zinc-900 dark:text-white">${subtotal}</span>
              </div>
              <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                <span>Shipping</span>
                {shipping === 0 ? (
                  <span className="font-semibold text-green-600 uppercase text-sm tracking-widest">Free</span>
                ) : (
                  <span className="font-semibold text-zinc-900 dark:text-white">${shipping}</span>
                )}
              </div>
              {shipping > 0 && (
                <p className="text-[11px] text-zinc-400">
                  Spend ${(150 - subtotal).toFixed(0)} more to get free shipping.
                </p>
              )}
            </div>

            <Separator className="mb-6 bg-zinc-200 dark:bg-zinc-800" />

            <div className="flex justify-between text-lg font-bold mb-8">
              <span>Total</span>
              <span>${total}</span>
            </div>

            <Link href="/checkout">
              <Button size="lg" className="w-full rounded-full h-14 text-base font-bold shadow-lg shadow-zinc-900/10 active:scale-[0.98] transition-transform">
                Checkout Now
              </Button>
            </Link>

            <div className="mt-6 flex flex-col gap-3">
              <div className="flex items-center gap-3 text-xs text-zinc-500">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Secure checkout with SSL Encryption
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-500">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Free returns within 30 days
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
