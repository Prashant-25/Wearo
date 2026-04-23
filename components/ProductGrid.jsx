import React from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  if (!products?.length) {
    return (
      <div className="py-12 text-center text-zinc-500">
        No products found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 min-[300px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
