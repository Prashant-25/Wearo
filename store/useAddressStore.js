"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAddressStore = create()(
  persist(
    (set, get) => ({
      addresses: [],
      selectedAddressId: null,

      setAddresses: (addresses) => set({ addresses }),

      addAddress: (address) => {
        const newAddress = {
          ...address,
          id: `addr_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          createdAt: new Date().toISOString(),
        };
        const currentAddresses = get().addresses;
        const isFirst = currentAddresses.length === 0;
        set({
          addresses: [...currentAddresses, newAddress],
          // Auto-select if it's the first address
          selectedAddressId: isFirst ? newAddress.id : get().selectedAddressId,
        });
        return newAddress;
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
