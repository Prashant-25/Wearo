"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Package, ChevronRight, Clock, CheckCircle2, Truck, HelpCircle } from "lucide-react";
import { useOrderStore } from "@/store/useOrderStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function OrdersPage() {
  const { orders } = useOrderStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (orders.length === 0) {
    return (
      <div className="max-w-[1000px] mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6">
          <Package size={32} className="text-zinc-400" />
        </div>
        <h1 className="text-2xl font-bold mb-3">No orders yet</h1>
        <p className="text-zinc-500 mb-8 max-w-sm mx-auto">
          When you place an order, it will appear here. Find something you love and start your collection.
        </p>
        <Link href="/products">
          <Button variant="outline" className="rounded-full px-8">
            Go Shopping
          </Button>
        </Link>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered": return "bg-green-500/10 text-green-600 dark:bg-green-500/20";
      case "Shipped": return "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20";
      case "Processing": return "bg-orange-500/10 text-orange-600 dark:bg-orange-500/20";
      default: return "bg-zinc-100 text-zinc-600 dark:bg-zinc-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered": return <CheckCircle2 size={14} />;
      case "Shipped": return <Truck size={14} />;
      case "Processing": return <Clock size={14} />;
      default: return null;
    }
  };

  return (
    <div className="max-w-[1400px] w-full mx-auto px-4 py-10 md:py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">My Orders</h1>
          <p className="text-zinc-500">Track and manage your recent purchases</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <HelpCircle size={16} />
          <span>Need help with an order?</span>
        </div>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl overflow-hidden hover:shadow-md transition-shadow">
            {/* Order Header */}
            <div className="px-6 py-4 bg-zinc-50/50 dark:bg-zinc-800/30 border-b border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest mb-0.5">Order Placed</p>
                  <p className="text-sm font-semibold">{order.date}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest mb-0.5">Total</p>
                  <p className="text-sm font-semibold">₹{order.total}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest mb-0.5">Order ID</p>
                  <p className="text-sm font-semibold">{order.id}</p>
                </div>
              </div>

              <Badge className={`rounded-full gap-1.5 px-3 py-1 border-none font-bold text-[11px] uppercase tracking-wider ${getStatusColor(order.status)}`}>
                {getStatusIcon(order.status)}
                {order.status}
              </Badge>
            </div>

            {/* Order Items */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-8 flex flex-col gap-4">
                  {order.items.map((item, idx) => (
                    <div key={`${item.id}-${idx}`} className="flex gap-4">
                      <div className="relative w-16 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-xl overflow-hidden shrink-0 border border-zinc-100 dark:border-zinc-800">
                        {item.images?.[0] ? (
                          <Image src={item.images?.[0]} alt={item.product} fill className="object-cover" />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-[10px] text-zinc-400">IMG</div>
                        )}
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="text-sm font-bold leading-tight">{item.name}</h4>
                        <p className="text-xs text-zinc-500 mt-1">Qty: {item.quantity} · ₹{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3">
                  <Button variant="outline" className="w-full rounded-full text-xs font-bold h-10">
                    Track Shipment
                  </Button>
                  <Button className="w-full rounded-full text-xs font-bold h-10">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
