"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useOrderStore = create()(
  persist(
    (set, get) => ({
      orders: [],

      setOrders: (orders) => set({ orders }),

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
