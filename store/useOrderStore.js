"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useOrderStore = create()(
  persist(
    (set, get) => ({
      orders: [
        // Mock past order for demonstration
        {
          id: "WRO-827412",
          date: "2024-03-28",
          total: 125,
          status: "Delivered",
          items: [
            { id: "1", name: "Premium Cotton T-Shirt", price: 45, quantity: 1, image: "/cat-oversized-tshirts.png" },
            { id: "9", name: "Knit Polo Sweater", price: 80, quantity: 1, image: "/cat-full-sleeve.png" }
          ]
        }
      ],

      // Actions
      addOrder: (order) => {
        set((state) => ({
          orders: [order, ...state.orders]
        }));
      },

      clearOrders: () => set({ orders: [] }),
    }),
    {
      name: "wearo-orders", // localStorage key
    }
  )
);
