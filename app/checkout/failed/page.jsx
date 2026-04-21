import { Suspense } from "react";
import PaymentFailedClient from "@/components/PaymentFailedClient";

export default function Page() {
  return (
    <Suspense fallback={<LoadingState />}>
      <PaymentFailedClient />
    </Suspense>
  );
}

function LoadingState() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-20 text-center">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-full border-4 border-zinc-200 border-t-red-500 animate-spin mb-6" />
        <p className="text-zinc-500">Loading payment status...</p>
      </div>
    </div>
  );
}