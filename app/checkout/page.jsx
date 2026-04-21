"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  MapPin,
  CreditCard,
  Truck,
  ShoppingBag,
  ArrowLeft,
  Lock,
  Loader2
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useOrderStore } from "@/store/useOrderStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1); // 1: Contact, 2: Shipping, 3: Payment

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // If cart is empty, redirect back to products
  if (cart.length === 0 && !isProcessing) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link href="/products">
          <Button>Back to Shopping</Button>
        </Link>
      </div>
    );
  }

  const shipping = subtotal > 150 ? 0 : 15;
  const tax = Math.round(subtotal * 0.08); // Mock tax
  const total = subtotal + shipping + tax;
  const addOrder = useOrderStore((state) => state.addOrder);

  const handlePlaceOrder = () => {
    setIsProcessing(true);

    const newOrder = {
      id: `WRO-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString().split('T')[0],
      total: total,
      status: "Processing",
      items: [...cart]
    };

    // Simulate payment processing
    setTimeout(() => {
      addOrder(newOrder);
      clearCart();
      router.push("/checkout/success");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 lg:divide-x divide-zinc-100 dark:divide-zinc-800">

        {/* Left Side: Checkout Form */}
        <div className="lg:col-span-7 px-4 sm:px-8 lg:px-12 py-10 md:py-16">
          <div className="max-w-xl mx-auto lg:mx-0">
            {/* Header / Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs text-zinc-400 mb-8 uppercase tracking-widest font-bold">
              <Link href="/cart" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Cart</Link>
              <ChevronRight size={12} />
              <span className={step === 1 ? "text-zinc-900 dark:text-white" : ""}>Information</span>
              <ChevronRight size={12} />
              <span className={step === 2 ? "text-zinc-900 dark:text-white" : ""}>Shipping</span>
              <ChevronRight size={12} />
              <span className={step === 3 ? "text-zinc-900 dark:text-white" : ""}>Payment</span>
            </div>

            {/* Step 1: Contact Information */}
            <section className={step >= 1 ? "mb-12" : "hidden"}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-sm">1</div>
                  Contact Information
                </h2>
                {step > 1 && (
                  <button onClick={() => setStep(1)} className="text-xs font-bold text-indigo-500 hover:text-indigo-600 underline">Edit</button>
                )}
              </div>

              {step === 1 ? (
                <div className="space-y-4 animate-in fade-in duration-500">
                  <Input placeholder="Email Address" type="email" className="h-12 text-base rounded-xl border-zinc-200" />
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="newsletter" className="w-4 h-4 rounded border-zinc-300" />
                    <label htmlFor="newsletter" className="text-sm text-zinc-500">Email me with news and offers</label>
                  </div>
                  <Button onClick={() => setStep(2)} className="w-full mt-4 h-12 rounded-full font-bold">Continue to Shipping</Button>
                </div>
              ) : (
                <div className="pl-11 text-sm text-zinc-500">customer@example.com</div>
              )}
            </section>

            {/* Step 2: Shipping Address */}
            <section className={step >= 2 ? "mb-12 transition-all duration-500" : "opacity-30 mb-12 pointer-events-none"}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step >= 2 ? "bg-zinc-100 dark:bg-zinc-900" : "bg-transparent border border-zinc-200"}`}>2</div>
                  Shipping Address
                </h2>
                {step > 2 && (
                  <button onClick={() => setStep(2)} className="text-xs font-bold text-indigo-500 hover:text-indigo-600 underline">Edit</button>
                )}
              </div>

              {step === 2 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-500">
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="First Name" className="h-12 rounded-xl border-zinc-200" />
                    <Input placeholder="Last Name" className="h-12 rounded-xl border-zinc-200" />
                  </div>
                  <Input placeholder="Address" className="h-12 rounded-xl border-zinc-200" />
                  <Input placeholder="Apartment, suite, etc. (optional)" className="h-12 rounded-xl border-zinc-200" />
                  <div className="grid grid-cols-3 gap-4">
                    <Input placeholder="City" className="h-12 rounded-xl border-zinc-200" />
                    <Input placeholder="State" className="h-12 rounded-xl border-zinc-200" />
                    <Input placeholder="ZIP code" className="h-12 rounded-xl border-zinc-200" />
                  </div>
                  <Input placeholder="Phone (optional)" className="h-12 rounded-xl border-zinc-200" />
                  <Button onClick={() => setStep(3)} className="w-full mt-4 h-12 rounded-full font-bold">Continue to Payment</Button>
                </div>
              )}
              {step > 2 && (
                <div className="pl-11 text-sm text-zinc-500">123 Premium St, Luxury Ave, NY 10001</div>
              )}
            </section>

            {/* Step 3: Payment Information */}
            <section className={step >= 3 ? "mb-12" : "opacity-30 pointer-events-none"}>
              <h2 className="text-xl font-bold flex items-center gap-3 mb-6">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step === 3 ? "bg-zinc-100 dark:bg-zinc-900" : "bg-transparent border border-zinc-200"}`}>3</div>
                Payment Method
              </h2>

              {step === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-500">
                  <div className="p-6 border-2 border-zinc-900 dark:border-white rounded-2xl bg-zinc-50 dark:bg-zinc-900">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-bold">Credit/Debit Card</span>
                      <div className="flex gap-2">
                        <div className="w-8 h-5 bg-blue-600 rounded" /> {/* Visa Mock icon */}
                        <div className="w-8 h-5 bg-red-600 rounded" />  {/* MC Mock icon */}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <Input placeholder="Card Number" className="h-12 border-zinc-200" />
                      <div className="grid grid-cols-2 gap-4">
                        <Input placeholder="MM / YY" className="h-12 border-zinc-200" />
                        <Input placeholder="CVV" className="h-12 border-zinc-200" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-zinc-500 px-2 pb-4">
                    <Lock size={14} className="text-green-500" />
                    Your payment is secured with industry-standard encryption.
                  </div>

                  <Button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="w-full h-14 rounded-full text-lg font-bold shadow-xl shadow-zinc-900/10 active:scale-[0.98] transition-all"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing Order...
                      </>
                    ) : (
                      `Pay $${total}`
                    )}
                  </Button>
                </div>
              )}
            </section>
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <aside className="lg:col-span-5 bg-zinc-50/50 dark:bg-zinc-900/20 px-4 sm:px-8 lg:px-12 py-10 md:py-16 h-full">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-bold mb-8 flex items-center gap-2">
              <ShoppingBag size={20} />
              Order Summary
            </h3>

            {/* Item List */}
            <div className="space-y-6 mb-10 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-4">
                  <div className="relative w-16 h-20 bg-zinc-100 dark:bg-zinc-900 rounded-lg overflow-hidden shrink-0">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-[10px] text-zinc-400">IMG</div>
                    )}
                    <div className="absolute top-[-5px] right-[-5px] w-5 h-5 bg-zinc-900 dark:bg-zinc-700 text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                      {item.quantity}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center flex-1">
                    <h4 className="text-sm font-bold leading-tight">{item.name}</h4>
                    <p className="text-xs text-zinc-500 mt-1">{item.size} / {item.color}</p>
                  </div>
                  <div className="flex items-center font-bold text-sm">
                    ${item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            <Separator className="mb-6 bg-zinc-200 dark:bg-zinc-800" />

            {/* Calculations */}
            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-zinc-500">
                <span>Subtotal</span>
                <span className="font-bold text-zinc-900 dark:text-white">${subtotal}</span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>Shipping</span>
                {shipping === 0 ? (
                  <span className="text-green-600 font-bold uppercase text-[11px] tracking-widest">Free</span>
                ) : (
                  <span className="font-bold text-zinc-900 dark:text-white">${shipping}</span>
                )}
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>Tax (Estimated)</span>
                <span className="font-bold text-zinc-900 dark:text-white">${tax}</span>
              </div>
            </div>

            <Separator className="my-6 bg-zinc-200 dark:bg-zinc-800" />

            <div className="flex justify-between text-xl font-black">
              <span>Total</span>
              <div className="flex items-baseline gap-1">
                <span className="text-xs text-zinc-400 font-normal">USD</span>
                <span>${total}</span>
              </div>
            </div>

            {/* Promo Code Mock */}
            <div className="mt-8 flex gap-2">
              <Input placeholder="Discount code" className="h-11 rounded-xl bg-white dark:bg-zinc-900" />
              <Button variant="outline" className="h-11 rounded-xl px-6 font-bold">Apply</Button>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
