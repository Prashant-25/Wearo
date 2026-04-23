"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, Loader2, ShieldCheck, MapPin, ChevronRight } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useOrderStore } from "@/store/useOrderStore";
import { useAddressStore } from "@/store/useAddressStore";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { Separator } from "@/components/ui/separator";
import AddressModal from "@/components/AddressModal";

export default function CartPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { cart, removeItem, updateQuantity, clearCart } = useCartStore();
  const addOrder = useOrderStore((state) => state.addOrder);
  const { addresses, selectedAddressId } = useAddressStore();
  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [confirmedAddress, setConfirmedAddress] = useState(null);

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  // Step 1: Open address modal when user clicks Pay
  const handlePayClick = () => {
    setShowAddressModal(true);
  };

  // Step 2: Address confirmed → proceed to Razorpay
  const handleAddressConfirmed = (address) => {
    setConfirmedAddress(address);
    startRazorpayPayment(address);
  };

  // Step 3: Create order & open Razorpay
  const startRazorpayPayment = async (address) => {
    setIsProcessing(true);
    try {
      // 1. Create a Razorpay order on the server

      const items = cart.map(item => ({
        id: item.id || item._id,
        quantity: item.quantity,
        size: item.size,
        color: item.color
      }))
      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, address }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create order");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Wearo",
        description: `Order — ${cart.length} item(s)`,
        order_id: data.orderId,
        handler: async function (response) {
          // 3. Verify payment on the server
          try {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId: data.order,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              // Save order locally and redirect
              const newOrder = {
                id: data.order,
                date: verifyData?.order?.createdAt
                  ? new Date(verifyData.order.createdAt).toISOString().split("T")[0]
                  : "",
                total: verifyData?.order?.totalPrice,
                status: verifyData?.order?.isDelivered ? "Delivered" : "Processing",
                paymentId: response.razorpay_payment_id,
                shippingAddress: address,
                items: [...cart.map((item) => ({
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity,
                  size: item.size,
                  color: item.color,
                  image: item.images?.[0]
                }))],
              };

              addOrder(newOrder);
              clearCart();
              router.push(`/checkout/success?oid=${data.order}`);
            } else {
              router.push("/checkout/failed?reason=Payment+verification+failed.+Please+contact+support.");
            }
          } catch (error) {
            console.error(error);
            router.push("/checkout/failed?reason=Payment+verification+failed.+Please+try+again.");
          }
        },
        prefill: {
          name: session?.user?.name,
          email: session?.user?.email,
          contact: "",
        },
        theme: {
          color: "#18181b",
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);
        setIsProcessing(false);
        router.push(`/checkout/failed?reason=${encodeURIComponent(response.error.description)}`);
      });
      razorpay.open();
    } catch (error) {
      console.error("Razorpay error:", error);
      setIsProcessing(false);
      router.push("/checkout/failed?reason=Something+went+wrong.+Please+try+again.");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 py-20 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-6 bg-zinc-100 dark:bg-zinc-900 rounded-full">
            <ShoppingBag size={48} className="text-zinc-400" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-zinc-500 mb-8 max-w-md mx-auto">
          Looks like you haven't added anything to your cart yet. Discover our latest collections and start shopping.
        </p>
        <Link href="/products">
          <Button size="lg" className="rounded-full px-8">
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Load Razorpay Checkout Script */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 ">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/products" className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Shopping Cart ({cart.length})</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items List */}
          <div className="flex-2 space-y-8">
            {cart.map((item) => (
              <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-6 pb-8 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
                {/* Product Image */}
                <div className="relative w-24 h-32 sm:w-32 sm:h-40 bg-zinc-100 dark:bg-zinc-900 overflow-hidden rounded-xl shrink-0">
                  {item.images?.[0] ? (
                    <Image src={item.images?.[0]} alt={item.product || "Item Image"} fill className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] text-zinc-400 uppercase text-center p-2">
                      No Image
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between gap-4 mb-2">
                    <div>
                      <h3 className="font-semibold text-lg text-zinc-900 dark:text-white leading-tight">
                        {item.name}
                      </h3>
                      <p className="text-sm text-zinc-500 mt-1 uppercase tracking-wider font-medium">
                        {item.brand || "Wearo"}
                      </p>
                    </div>
                    <span className="font-bold text-lg">₹{item.price * item.quantity}</span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-zinc-500 mb-6">
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-zinc-900 dark:text-zinc-300">Size:</span> {item.size}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-zinc-900 dark:text-zinc-300">Color:</span>
                      <span className="capitalize">{item.color}</span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-full p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                        className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors disabled:opacity-30"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                        className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id, item.size, item.color)}
                      className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors py-2 px-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-sm font-medium"
                    >
                      <Trash2 size={16} />
                      <span className="hidden sm:inline">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="flex-1 lg:sticky lg:top-32 h-fit">
            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-100 dark:border-zinc-800">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              {/* Delivery Address Preview */}
              {confirmedAddress ? (
                <button
                  type="button"
                  onClick={() => setShowAddressModal(true)}
                  className="w-full flex items-start gap-3 p-3 mb-6 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors text-left group"
                >
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-500/10 flex items-center justify-center shrink-0">
                    <MapPin size={14} className="text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-zinc-900 dark:text-white">{confirmedAddress.fullName}</p>
                    <p className="text-[11px] text-zinc-500 truncate">
                      {confirmedAddress.street}, {confirmedAddress.city} – {confirmedAddress.zipCode}
                    </p>
                  </div>
                  <ChevronRight size={14} className="text-zinc-400 group-hover:text-zinc-600 mt-2 shrink-0" />
                </button>
              ) : addresses.length > 0 ? (
                <button
                  type="button"
                  onClick={() => setShowAddressModal(true)}
                  className="w-full flex items-center gap-3 p-3 mb-6 rounded-xl border-2 border-dashed border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 transition-colors text-left"
                >
                  <MapPin size={16} className="text-zinc-400" />
                  <span className="text-sm text-zinc-500">Select delivery address</span>
                </button>
              ) : null}

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                  <span>Subtotal</span>
                  <span className="font-semibold text-zinc-900 dark:text-white">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                  <span>Shipping</span>
                  {shipping === 0 ? (
                    <span className="font-semibold text-green-600 uppercase text-sm tracking-widest">Free</span>
                  ) : (
                    <span className="font-semibold text-zinc-900 dark:text-white">₹{shipping}</span>
                  )}
                </div>
                {shipping > 0 && (
                  <p className="text-[11px] text-zinc-400">
                    Spend ₹{(150 - subtotal).toFixed(0)} more to get free shipping.
                  </p>
                )}
              </div>

              <Separator className="mb-6 bg-zinc-200 dark:bg-zinc-800" />

              <div className="flex justify-between text-lg font-bold mb-8">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              {/* Pay Button → Opens Address Modal first */}
              <Button
                size="lg"
                onClick={handlePayClick}
                disabled={isProcessing}
                className="w-full rounded-full cursor-pointer h-14 text-base font-bold shadow-lg shadow-zinc-900/10 active:scale-[0.98] transition-transform"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Pay ₹${total} with Razorpay`
                )}
              </Button>

              <div className="mt-6 flex flex-col gap-3">
                <div className="flex items-center gap-3 text-xs text-zinc-500">
                  <ShieldCheck size={14} className="text-green-500 shrink-0" />
                  Secured by Razorpay — PCI DSS Compliant
                </div>
                <div className="flex items-center gap-3 text-xs text-zinc-500">
                  <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                  Free returns within 30 days
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Address Modal */}
      <AddressModal
        open={showAddressModal}
        onOpenChange={setShowAddressModal}
        onConfirm={handleAddressConfirmed}
      />
    </>
  );
}
