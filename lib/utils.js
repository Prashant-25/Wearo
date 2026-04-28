import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const categories = {
  "T-Shirts & Tops": [
    "T-Shirts",
    "Oversized T-Shirts",
    "Super Oversized T-Shirts",
    "Oversized Full Sleeve T-Shirts",
    "Women Relaxed Fit T-Shirts",
    "Women Oversized T-Shirts"
  ],
  "Shirts & Upperwear": [
    "Holiday Shirts",
    "Oversized Shirts",
    "Cotton Linen Shirts",
    "shirt",
    "Men Relaxed Shirts",
    "Men Textured Shirts",
    "Men Utility Shirts",
    "Overshirts"
  ],
  "Bottomwear": [
    "Men Jeans",
    "Men Cargo Jeans"
  ],
  "Footwear": [
    "Men Mid Top Sneakers",
    "Women Mid Top Sneakers",
    "Men Low Top Sneakers"
  ],
  "Activewear": [
    "Oversized Jerseys"
  ],
  "Basics": [
    "Vests",
    "Easy Fit Vests"
  ]
}
