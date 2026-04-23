"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useAddressStore } from "@/store/useAddressStore";
import { useOrderStore } from "@/store/useOrderStore";

export default function StoreInitializer() {
  const { status } = useSession();
  const isInitialLoad = useRef(true);
  const syncTimeout = useRef(null);

  // 1. Initial Data Fetch (Hydration)
  useEffect(() => {
    if (status === "authenticated") {
      const fetchUserData = async () => {
        try {
          const res = await fetch("/api/user/sync");
          if (!res.ok) return;
          const data = await res.json();

          // Hydrate stores
          if (data.cart) useCartStore.getState().setCart(data.cart);
          if (data.wishlist) useWishlistStore.getState().setWishlist(data.wishlist);
          if (data.addresses) useAddressStore.getState().setAddresses(data.addresses);
          if (data.orders) useOrderStore.getState().setOrders(data.orders);

          isInitialLoad.current = false;
        } catch (error) {
          console.error("Failed to hydrate stores from API:", error);
          isInitialLoad.current = false; // allow syncing even if fetch fails to avoid locking
        }
      };

      fetchUserData();
    } else if (status === "unauthenticated") {
      // If user logs out or is unauthenticated, they shouldn't sync
      isInitialLoad.current = false;
    }
  }, [status]);


  return null; // This is a logic-only component
}
