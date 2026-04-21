"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Package, ArrowRight, ShoppingBag, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

export default function CheckoutSuccessPage() {
   const [mounted, setMounted] = useState(false);
   const searchParams = useSearchParams();
   const orderId = searchParams.get("oid") || "";

   useEffect(() => {
      setMounted(true);
      // Todo add order id

   }, []);

   if (!mounted) return null;

   return (
      <div className="max-w-[1200px] mx-auto px-4 py-20 text-center">
         <div className="flex flex-col items-center max-w-2xl mx-auto">

            {/* Animated Check Icon */}
            <div className="mb-8 relative">
               <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-xl shadow-green-500/20">
                  <CheckCircle2 size={48} className="text-white" />
               </div>
               {/* Decorative elements */}
               <div className="absolute -top-2 -right-2 w-4 h-4 bg-indigo-500 rounded-full animate-ping" />
            </div>

            <h1 className="text-4xl font-black mb-4 tracking-tight">Order Confirmed!</h1>
            <p className="text-zinc-500 mb-2">Thank you for shopping with Wearo. Your order has been placed successfully.</p>
            <p className="text-sm font-bold text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-900 px-4 py-2 rounded-full mb-12">
               Order Id: {orderId}
            </p>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-12 text-left">
               <div className="p-6 border border-zinc-100 dark:border-zinc-800 rounded-3xl bg-zinc-50/50 dark:bg-zinc-900/30">
                  <div className="flex items-center gap-3 mb-4">
                     <Package size={20} className="text-indigo-500" />
                     <h3 className="font-bold">Shipping Updates</h3>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                     We'll send you an email with tracking details as soon as your premium package leaves our warehouse.
                  </p>
               </div>

               <div className="p-6 border border-zinc-100 dark:border-zinc-800 rounded-3xl bg-zinc-50/50 dark:bg-zinc-900/30">
                  <div className="flex items-center gap-3 mb-4">
                     <MapPin size={20} className="text-indigo-500" />
                     <h3 className="font-bold">Delivery Estimate</h3>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                     Expected delivery: <span className="font-bold text-zinc-900 dark:text-white">3-5 Business Days</span> via Premium Ground Shipping.
                  </p>
               </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
               <Link href="/products" className="flex-1 max-w-[240px]">
                  <Button size="lg" className="w-full rounded-full h-14 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold">
                     Continue Shopping
                  </Button>
               </Link>
               <Link href="/orders" className="flex-1 max-w-[240px]">
                  <Button size="lg" variant="outline" className="w-full rounded-full h-14 font-bold gap-2">
                     View Order Status
                     <ArrowRight size={18} />
                  </Button>
               </Link>
            </div>

            <div className="mt-16 text-zinc-400 text-sm flex items-center gap-2">
               <ShoppingBag size={14} />
               Need help? <Link href="/support" className="underline hover:text-zinc-600 transition-colors">Contact Support</Link>
            </div>

         </div>
      </div>
   );
}
