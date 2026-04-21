"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { XCircle, RefreshCw, ArrowLeft, Headphones, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentFailedPage() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  const errorMessage = searchParams.get("reason") || "Something went wrong during payment processing.";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-20 text-center">
      <div className="flex flex-col items-center max-w-2xl mx-auto">

        {/* Animated X Icon */}
        <div className="mb-8 relative">
          <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center shadow-xl shadow-red-500/20 animate-in zoom-in duration-500">
            <XCircle size={48} className="text-white" />
          </div>
          {/* Decorative pulse element */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-400 rounded-full animate-ping" />
        </div>

        <h1 className="text-4xl font-black mb-4 tracking-tight">Payment Failed</h1>
        <p className="text-zinc-500 mb-2 max-w-md">
          Your payment could not be processed. Don't worry — no money has been deducted from your account.
        </p>
        <p className="text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 px-4 py-2 rounded-full mb-12 flex items-center gap-2">
          <AlertTriangle size={14} />
          {errorMessage}
        </p>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-12 text-left">
          <div className="p-6 border border-zinc-100 dark:border-zinc-800 rounded-3xl bg-zinc-50/50 dark:bg-zinc-900/30">
            <div className="flex items-center gap-3 mb-4">
              <RefreshCw size={20} className="text-amber-500" />
              <h3 className="font-bold">What can you try?</h3>
            </div>
            <ul className="text-sm text-zinc-500 leading-relaxed space-y-2">
              <li>• Check if your card details are correct</li>
              <li>• Ensure sufficient balance in your account</li>
              <li>• Try a different payment method (UPI, wallet, etc.)</li>
              <li>• Disable any VPN or ad-blocker and retry</li>
            </ul>
          </div>

          <div className="p-6 border border-zinc-100 dark:border-zinc-800 rounded-3xl bg-zinc-50/50 dark:bg-zinc-900/30">
            <div className="flex items-center gap-3 mb-4">
              <Headphones size={20} className="text-indigo-500" />
              <h3 className="font-bold">Still facing issues?</h3>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed">
              If money was deducted but the order wasn't placed, it will be refunded within <span className="font-bold text-zinc-900 dark:text-white">5-7 business days</span>. Contact us for faster resolution.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Button asChild size="lg" className="w-full rounded-full h-14">
            <Link href="/cart">
              <RefreshCw size={18} />
              Retry Payment
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/products">
              <ArrowLeft size={18} />
              Back to Shop
            </Link>
          </Button>
        </div>

        <div className="mt-16 text-zinc-400 text-sm flex items-center gap-2">
          <Headphones size={14} />
          Need help? <Link href="/support" className="underline hover:text-zinc-600 transition-colors">Contact Support</Link>
        </div>

      </div>
    </div>
  );
}
