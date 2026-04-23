"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAddressStore = create()(
  persist(
    (set, get) => ({
      addresses: [],
      selectedAddressId: null,

      setAddresses: (addresses) => set({ addresses }),

      addAddress: async (address) => {
        const response = await fetch("/api/user/addresses", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            address,
          }),
        });
        const data = await response.json();
        set({
          addresses: [...data.addresses],
          // Auto-select if it's the first address
          selectedAddressId: data.addresses[data.addresses.length - 1].id,
        });
        return data.addresses[data.addresses.length - 1];
      },

      removeAddress: (id) => {
        const remaining = get().addresses.filter((a) => a.id !== id);
        set({
          addresses: remaining,
          selectedAddressId:
            get().selectedAddressId === id
              ? remaining.length > 0
                ? remaining[0].id
                : null
              : get().selectedAddressId,
        });
      },

      updateAddress: (id, updatedFields) => {
        set({
          addresses: get().addresses.map((a) =>
            a.id === id ? { ...a, ...updatedFields } : a
          ),
        });
      },

      selectAddress: (id) => {
        set({ selectedAddressId: id });
      },

      getSelectedAddress: () => {
        const state = get();
        return state.addresses.find((a) => a.id === state.selectedAddressId) || null;
      },

      clearAddress: () => set({ addresses: [], selectedAddressId: null }),
    }),
    {
      name: "wearo-addresses",
    }
  )
);
