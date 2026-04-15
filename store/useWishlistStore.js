"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWishlistStore = create()(
  persist(
    (set, get) => ({
      wishlist: [],

      // Actions
      toggleWishlist: (product) => {
        const currentWishlist = get().wishlist;
        const exists = currentWishlist.some((item) => item.id === product.id);

        if (exists) {
          set({
            wishlist: currentWishlist.filter((item) => item.id !== product.id),
          });
        } else {
          set({ wishlist: [...currentWishlist, product] });
        }
      },

      isInWishlist: (productId) => {
        return get().wishlist.some((item) => item.id === productId);
      },

      clearWishlist: () => set({ wishlist: [] }),

      // Computed
      get totalItems() {
        return get().wishlist.length;
      },
    }),
    {
      name: "wearo-wishlist", // localStorage key
    }
  )
);
