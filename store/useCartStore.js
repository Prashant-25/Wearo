"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create()(
  persist(
    (set, get) => ({
      cart: [],

      addItem: (product, size = "M", color = "Default") => {
        const currentCart = get().cart;
        const existingItemIndex = currentCart.findIndex(
          (item) => item.id === product.id && item.size === size && item.color === color
        );

        if (existingItemIndex !== -1) {
          const updatedCart = [...currentCart];
          updatedCart[existingItemIndex].quantity += 1;
          set({ cart: updatedCart });
        } else {
          set({
            cart: [...currentCart, { ...product, quantity: 1, size, color }],
          });
        }
      },

      removeItem: (productId, size, color) => {
        set({
          cart: get().cart.filter(
            (item) => !(item.id === productId && item.size === size && item.color === color)
          ),
        });
      },

      updateQuantity: (productId, size, color, quantity) => {
        if (quantity < 1) return;

        const updatedCart = get().cart.map((item) =>
          item.id === productId && item.size === size && item.color === color
            ? { ...item, quantity }
            : item
        );
        set({ cart: updatedCart });
      },

      clearCart: () => set({ cart: [] }),

      get totalItems() {
        return get().cart.reduce((total, item) => total + item.quantity, 0);
      },

      get subtotal() {
        return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: "wearo-cart",
    }
  )
);
