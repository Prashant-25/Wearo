import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

const sampleProducts = [
  {
    product: "Harry Potter: The Great Houses",
    product_slug: "holiday-shirts-harry-potter-magic",
    category: "shirt",
    category_slug: "summer-shirts",
    tags: ["trending", "fandom", "casual", "Summer 2024", "Viscose", "Relaxed Fit", "Collared", "Half Sleeves"],
    gender_type: 1, // Men
    mrp: 1699,
    price: 1499,
    avg_rating: 4.59,
    rating_count: 204,
    images: ["/cat-full-sleeve.png"],
    colors: [{ id: 54, color_name: "Black", color_hex: "#131313" }],
    sizes: [{ size: "S", stock: 50 }, { size: "M", stock: 80 }, { size: "L", stock: 30 }],
    attributes: { fabric: "Viscose", fitType: "Relaxed Fit", neck: "Collared", sleeve: "Half Sleeves" }
  },
  {
    product: "Premium Cotton T-Shirt",
    product_slug: "premium-cotton-tshirt-nike",
    category: "t-shirt",
    category_slug: "menswear",
    tags: ["basic", "cotton", "comfort", "Essentials", "100% Cotton", "Oversized", "Crew", "Half"],
    gender_type: 1, // Men
    mrp: 60,
    price: 45,
    avg_rating: 4.8,
    images: ["/cat-oversized-tshirts.png"],
    colors: [{ id: 1, color_name: "White", color_hex: "#FFFFFF" }],
    sizes: [{ size: "M", stock: 100 }, { size: "L", stock: 50 }],
    attributes: { fabric: "100% Cotton", fitType: "Oversized", neck: "Crew", sleeve: "Half" }
  },
  {
    product: "Oversized Hoodie",
    product_slug: "oversized-hoodie-adidas",
    category: "t-shirt",
    category_slug: "oversized-tshirts",
    tags: ["warm", "baggy", "streetwear", "Winter Wear", "Fleece", "Oversized", "Hooded", "Full"],
    gender_type: 3, // Unisex
    mrp: 100,
    price: 85,
    avg_rating: 4.9,
    images: ["/cat-hoodies.png"],
    colors: [{ id: 2, color_name: "Black", color_hex: "#000000" }],
    sizes: [{ size: "XL", stock: 40 }],
    attributes: { fabric: "Fleece", fitType: "Oversized", neck: "Hooded", sleeve: "Full" }
  },
  {
    product: "Classic Denim Jacket",
    product_slug: "classic-denim-jacket-levis",
    category: "shirt",
    category_slug: "womenswear",
    tags: ["denim", "classic", "women", "Vintage", "Denim", "Regular", "Collared", "Full"],
    gender_type: 2, // Women
    mrp: 150,
    price: 120,
    avg_rating: 4.7,
    images: ["/cat-full-sleeve.png"],
    colors: [{ id: 3, color_name: "Blue", color_hex: "#3b82f6" }],
    sizes: [{ size: "S", stock: 20 }, { size: "M", stock: 30 }],
    attributes: { fabric: "Denim", fitType: "Regular", neck: "Collared", sleeve: "Full" }
  },
  {
    product: "Relaxed Fit Chinos",
    product_slug: "relaxed-fit-chinos-uni",
    category: "pants",
    category_slug: "menswear",
    tags: ["office", "cotton", "relaxed", "Workwear", "Cotton Twill", "Relaxed", "N/A"],
    gender_type: 1,
    mrp: 80,
    price: 65,
    avg_rating: 4.6,
    images: ["/cat-joggers.png"],
    colors: [{ id: 4, color_name: "Khaki", color_hex: "#C3B091" }],
    sizes: [{ size: "32", stock: 45 }],
    attributes: { fabric: "Cotton Twill", fitType: "Relaxed", neck: "N/A", sleeve: "N/A" }
  },
  {
    product: "Pleated Midi Skirt",
    product_slug: "pleated-midi-skirt-zara",
    category: "jeans",
    category_slug: "womenswear",
    tags: ["party", "satin", "midi", "Elegance", "Satin", "A-Line", "N/A"],
    gender_type: 2,
    mrp: 90,
    price: 70,
    avg_rating: 4.8,
    images: ["/cat-anime.png"],
    colors: [{ id: 5, color_name: "Pink", color_hex: "#db2777" }],
    sizes: [{ size: "M", stock: 25 }],
    attributes: { fabric: "Satin", fitType: "A-Line", neck: "N/A", sleeve: "N/A" }
  }
];

const scrappedM = [
  {
    "id": "278050",
    "product": "TSS Originals: Trident",
    "artist": {
      "name": "The Souled Store",
      "slug": "the-souled-store-originals"
    },
    "category": {
      "name": "Oversized T-Shirts"
    },
    "price": 1499,
    "genderType": 1,
    "stock": 0,
    "avgRating": 4.6,
    "ratingCount": 1147,
    "prodQty": 1505,
    "prodType": 3,
    "splPrice": 0,
    "exclusivePrice": 1399,
    "sortOrder": 510,
    "images": [
      "1756476946_4773055.jpg",
      "1742467430_5581901.jpg",
      "1742368900_3784181.jpg",
      "1742368900_5455592.jpg",
      "1742368900_2821014.jpg",
      "1742368928_3621175.jpg",
      "1755066533_1388307.jpg"
    ],
    "imagesNew": "{\"unisex\": [], \"male\": [\"1756476946_4773055.jpg\", \"1742467430_5581901.jpg\", \"1742368900_3784181.jpg\", \"1742368900_5455592.jpg\", \"1742368900_2821014.jpg\", \"1742368928_3621175.jpg\", \"1755066533_1388307.jpg\"], \"female\": []}",
    "extraPrice": 0,
    "isPrintable": false,
    "jitValue": "REGULAR",
    "product_slug": "tss-originals-trident-oversized-tshirt",
    "isBlurOnPlp": false,
    "plpCoverImage": null,
    "targetDate": "2025-03-19 00:00:00",
    "isProductLocked": false,
    "tiptiles": null
  },
  {
    "id": "290499",
    "product": "TSS Originals: Kurukshetra",
    "artist": {
      "name": "The Souled Store",
      "slug": "the-souled-store-originals"
    },
    "category": {
      "name": "Super Oversized T-Shirts"
    },
    "price": 1799,
    "genderType": 1,
    "stock": 0,
    "avgRating": 4.49,
    "ratingCount": 551,
    "prodQty": 1551,
    "prodType": 3,
    "splPrice": 0,
    "exclusivePrice": 1699,
    "sortOrder": 520,
    "images": [
      "1743657072_4845052.jpg",
      "1743657072_7439712.jpg",
      "1743657072_7668922.jpg",
      "1743657072_9580718.jpg",
      "1743657072_8969102.jpg",
      "1743746733_5396810.jpg",
      "1755068100_1722426.jpg"
    ],
    "imagesNew": "{\"unisex\": [], \"male\": [\"1743657072_4845052.jpg\", \"1743657072_7439712.jpg\", \"1743657072_7668922.jpg\", \"1743657072_9580718.jpg\", \"1743657072_8969102.jpg\", \"1743746733_5396810.jpg\", \"1755068100_1722426.jpg\"], \"female\": []}",
    "extraPrice": 0,
    "isPrintable": false,
    "jitValue": "REGULAR",
    "product_slug": "tss-originals-kurukshetra-super-oversized-t-shirts",
    "isBlurOnPlp": false,
    "plpCoverImage": null,
    "targetDate": "2025-04-03 00:00:00",
    "isProductLocked": false,
    "tiptiles": null
  },
  {
    "id": "156789",
    "product": "Batman: 3D Logo",
    "artist": {
      "name": "DC Comics™",
      "slug": "dc-justice-league-official-merchandise"
    },
    "category": {
      "name": "T-Shirts"
    },
    "price": 799,
    "genderType": 1,
    "stock": 0,
    "avgRating": 4.27,
    "ratingCount": 2321,
    "prodQty": 1783,
    "prodType": 3,
    "splPrice": 0,
    "exclusivePrice": 749,
    "sortOrder": 560,
    "images": [
      "1622648580_6993745.jpg",
      "1753184375_9579493.jpg"
    ],
    "imagesNew": "{\"unisex\": [], \"male\": [\"1622648580_6993745.jpg\", \"1753184375_9579493.jpg\"], \"female\": []}",
    "extraPrice": 0,
    "isPrintable": false,
    "jitValue": "REGULAR",
    "product_slug": "batman-3d-logo-tshirt",
    "isBlurOnPlp": false,
    "plpCoverImage": null,
    "targetDate": "0000-00-00 00:00:00",
    "isProductLocked": false,
    "tiptiles": null
  },
  {
    "id": "337118",
    "product": "Peanuts: Snoopy In India",
    "artist": {
      "name": "Peanuts™",
      "slug": "peanuts-official-merchandise"
    },
    "category": {
      "name": "Oversized T-Shirts"
    },
    "price": 1199,
    "genderType": 1,
    "stock": 0,
    "avgRating": 4.5,
    "ratingCount": 12,
    "prodQty": 372,
    "prodType": 3,
    "splPrice": 0,
    "exclusivePrice": 1099,
    "sortOrder": 600,
    "images": [
      "1769147321_3407965.jpg",
      "1769147321_3426947.jpg",
      "1769147321_7640274.jpg",
      "1769147321_1955574.jpg",
      "1769147321_3651045.jpg",
      "1769147387_2908561.jpg",
      "1770898494_5785592.jpg"
    ],
    "imagesNew": "{\"unisex\": [], \"male\": [\"1769147321_3407965.jpg\", \"1769147321_3426947.jpg\", \"1769147321_7640274.jpg\", \"1769147321_1955574.jpg\", \"1769147321_3651045.jpg\", \"1769147387_2908561.jpg\", \"1770898494_5785592.jpg\"], \"female\": []}",
    "extraPrice": 0,
    "isPrintable": false,
    "jitValue": "REGULAR",
    "product_slug": "peanuts-snoopy-in-india-men-oversized-t-shirts",
    "isBlurOnPlp": false,
    "plpCoverImage": null,
    "targetDate": "2026-01-23 00:00:00",
    "isProductLocked": false,
    "tiptiles": null
  },
  {
    "id": "309509",
    "product": "Harry Potter: Sorted",
    "artist": {
      "name": "Harry Potter™",
      "slug": "harry-potter-official-merchandise"
    },
    "category": {
      "name": "Oversized T-Shirts"
    },
    "price": 1299,
    "genderType": 1,
    "stock": 0,
    "avgRating": 4.43,
    "ratingCount": 240,
    "prodQty": 2202,
    "prodType": 3,
    "splPrice": 0,
    "exclusivePrice": 1199,
    "sortOrder": 620,
    "images": [
      "1751718597_6137634.jpg",
      "1751718597_9578428.jpg",
      "1762941983_3905974.jpg",
      "1751718597_5297850.jpg",
      "1751718597_8165249.jpg",
      "1762425724_2932126.jpg"
    ],
    "imagesNew": "{\"unisex\": [], \"male\": [\"1751718597_6137634.jpg\", \"1751718597_9578428.jpg\", \"1762941983_3905974.jpg\", \"1751718597_5297850.jpg\", \"1751718597_8165249.jpg\", \"1762425724_2932126.jpg\"], \"female\": []}",
    "extraPrice": 0,
    "isPrintable": false,
    "jitValue": "REGULAR",
    "product_slug": "oversized-tshirt-harry-potter-sorted-men",
    "isBlurOnPlp": false,
    "plpCoverImage": null,
    "targetDate": "2025-07-05 00:00:00",
    "isProductLocked": false,
    "tiptiles": null
  },
  {
    "id": "330024",
    "product": "Marvel: Dark Venom",
    "artist": {
      "name": "Marvel™",
      "slug": "marvel-official-merchandise"
    },
    "category": {
      "name": "Oversized Full Sleeve T-Shirts"
    },
    "price": 1699,
    "genderType": 1,
    "stock": 0,
    "avgRating": 4.6,
    "ratingCount": 5,
    "prodQty": 558,
    "prodType": 3,
    "splPrice": 0,
    "exclusivePrice": 1599,
    "sortOrder": 650,
    "images": [
      "1772877868_8542712.jpg",
      "1772877868_9993964.jpg",
      "1772877868_2994323.jpg",
      "1772877868_7198205.jpg",
      "1772877868_9829544.jpg"
    ],
    "imagesNew": "{\"unisex\": [], \"male\": [\"1772877868_8542712.jpg\", \"1772877868_9993964.jpg\", \"1772877868_2994323.jpg\", \"1772877868_7198205.jpg\", \"1772877868_9829544.jpg\"], \"female\": []}",
    "extraPrice": 0,
    "isPrintable": false,
    "jitValue": "REGULAR",
    "product_slug": "marvel-dark-venom-oversized-tshirt",
    "isBlurOnPlp": false,
    "plpCoverImage": null,
    "targetDate": "2026-03-07 00:00:00",
    "isProductLocked": false,
    "tiptiles": null
  },
  {
    "id": "301878",
    "product": "Iron Man: Mark L",
    "artist": {
      "name": "Marvel™",
      "slug": "marvel-official-merchandise"
    },
    "category": {
      "name": "Oversized T-Shirts"
    },
    "price": 1299,
    "genderType": 1,
    "stock": 0,
    "avgRating": 4.46,
    "ratingCount": 117,
    "prodQty": 2111,
    "prodType": 3,
    "splPrice": 0,
    "exclusivePrice": 1199,
    "sortOrder": 680,
    "images": [
      "1756978102_1866003.jpg",
      "1756978102_9183243.jpg",
      "1756978102_1214620.jpg",
      "1756978102_9883509.jpg",
      "1756978102_9145827.jpg",
      "1756978102_1610155.jpg",
      "1762421437_5433086.jpg"
    ],
    "imagesNew": "{\"unisex\": [], \"male\": [\"1756978102_1866003.jpg\", \"1756978102_9183243.jpg\", \"1756978102_1214620.jpg\", \"1756978102_9883509.jpg\", \"1756978102_9145827.jpg\", \"1756978102_1610155.jpg\", \"1762421437_5433086.jpg\"], \"female\": []}",
    "extraPrice": 0,
    "isPrintable": false,
    "jitValue": "REGULAR",
    "product_slug": "men-oversized-t-shirts-iron-man-mask",
    "isBlurOnPlp": false,
    "plpCoverImage": null,
    "targetDate": "2025-09-05 00:00:00",
    "isProductLocked": false,
    "tiptiles": null
  },
  {
    "id": "339238",
    "product": "Rick & Morty: Nothing On Purpose",
    "artist": {
      "name": "Rick and Morty",
      "slug": "rick-and-morty-official-merchandise"
    },
    "category": {
      "name": "Oversized T-Shirts"
    },
    "price": 1099,
    "genderType": 1,
    "stock": 0,
    "avgRating": 4.75,
    "ratingCount": 4,
    "prodQty": 904,
    "prodType": 3,
    "splPrice": 0,
    "exclusivePrice": 999,
    "sortOrder": 690,
    "images": [
      "1774687842_7057037.jpg",
      "1774687842_6092050.jpg",
      "1774687842_5064487.jpg",
      "1774687842_3104914.jpg",
      "1774687842_1732407.jpg",
      "1774687842_3169505.jpg",
      "1774687858_2620449.jpg"
    ],
    "imagesNew": "{\"unisex\": [], \"male\": [\"1774687842_7057037.jpg\", \"1774687842_6092050.jpg\", \"1774687842_5064487.jpg\", \"1774687842_3104914.jpg\", \"1774687842_1732407.jpg\", \"1774687842_3169505.jpg\", \"1774687858_2620449.jpg\"], \"female\": []}",
    "extraPrice": 0,
    "isPrintable": false,
    "jitValue": "REGULAR",
    "product_slug": "rick-morty-nothing-on-purpose-men-oversized-t-shirts",
    "isBlurOnPlp": false,
    "plpCoverImage": null,
    "targetDate": "2026-03-28 00:00:00",
    "isProductLocked": false,
    "tiptiles": null
  },
  {
    "id": "349696",
    "product": "Captain America: Soldier",
    "artist": {
      "name": "Marvel™",
      "slug": "marvel-official-merchandise"
    },
    "category": {
      "name": "Vests"
    },
    "price": 899,
    "genderType": 1,
    "stock": 0,
    "avgRating": 4.12,
    "ratingCount": 8,
    "prodQty": 885,
    "prodType": 3,
    "splPrice": 0,
    "exclusivePrice": 799,
    "sortOrder": 710,
    "images": [
      "1774935281_4840399.jpg",
      "1774935281_1799475.jpg",
      "1774935281_9765805.jpg",
      "1774935281_2031715.jpg",
      "1774935281_5631626.jpg"
    ],
    "imagesNew": "{\"unisex\": [], \"male\": [\"1774935281_4840399.jpg\", \"1774935281_1799475.jpg\", \"1774935281_9765805.jpg\", \"1774935281_2031715.jpg\", \"1774935281_5631626.jpg\"], \"female\": []}",
    "extraPrice": 0,
    "isPrintable": false,
    "jitValue": "REGULAR",
    "product_slug": "captain-america-soldier-men-vests",
    "isBlurOnPlp": false,
    "plpCoverImage": null,
    "targetDate": "2026-03-31 00:00:00",
    "isProductLocked": false,
    "tiptiles": null
  },
  {
    "id": "309605",
    "product": "Welcome: Majnu Bhai Painting",
    "artist": {
      "name": "Shemaroo",
      "slug": "shemaroo"
    },
    "category": {
      "name": "Oversized T-Shirts"
    },
    "price": 1099,
    "genderType": 1,
    "stock": 0,
    "avgRating": 4.22,
    "ratingCount": 100,
    "prodQty": 1685,
    "prodType": 3,
    "splPrice": 0,
    "exclusivePrice": 999,
    "sortOrder": 790,
    "images": [
      "1774072092_9348716.jpg",
      "1774072092_1553709.jpg",
      "1774072092_3786366.jpg",
      "1774072092_3519616.jpg",
      "1774072092_8990311.jpg",
      "1774072150_5380262.jpg"
    ],
    "imagesNew": "{\"unisex\": [], \"male\": [\"1774072092_9348716.jpg\", \"1774072092_1553709.jpg\", \"1774072092_3786366.jpg\", \"1774072092_3519616.jpg\", \"1774072092_8990311.jpg\", \"1774072150_5380262.jpg\"], \"female\": []}",
    "extraPrice": 0,
    "isPrintable": false,
    "jitValue": "REGULAR",
    "product_slug": "oversized-t-shirts-shemaroo-majnu-bhai-painting",
    "isBlurOnPlp": false,
    "plpCoverImage": null,
    "targetDate": "2025-06-26 00:00:00",
    "isProductLocked": false,
    "tiptiles": null
  },
  {
    "id": "184239",
    "product": "Solids: Pale Purple",
    "artist": {
      "name": "The Souled Store",
      "slug": "the-souled-store-originals"
    },
    "category": {
      "name": "Oversized T-Shirts"
    },
    "price": 749,
    "genderType": 1,
    "stock": 0,
    "avgRating": 4.35,
    "ratingCount": 880,
    "prodQty": 1868,
    "prodType": 3,
    "splPrice": 0,
    "exclusivePrice": 699,
    "sortOrder": 3210,
    "images": [
      "1727678247_1932335.jpg",
      "1690279161_8285250.jpg",
      "1690279161_2488500.jpg",
      "1690279161_5343984.jpg",
      "1762429957_4884635.jpg"
    ],
    "imagesNew": "{\"unisex\": [], \"male\": [\"1727678247_1932335.jpg\", \"1690279161_8285250.jpg\", \"1690279161_2488500.jpg\", \"1690279161_5343984.jpg\", \"1762429957_4884635.jpg\"], \"female\": []}",
    "extraPrice": 0,
    "isPrintable": false,
    "jitValue": "REGULAR",
    "product_slug": "solid-mauve-oversized-tshirts",
    "isBlurOnPlp": false,
    "plpCoverImage": null,
    "targetDate": "0000-00-00 00:00:00",
    "isProductLocked": false,
    "tiptiles": null
  },
  {
    "id": "253833",
    "product": "Black Panther: Wakanda Tribe",
    "artist": {
      "name": "Marvel™",
      "slug": "marvel-official-merchandise"
    },
    "category": {
      "name": "Oversized T-Shirts"
    },
    "price": 999,
    "genderType": 1,
    "stock": 0,
    "avgRating": 4.64,
    "ratingCount": 694,
    "prodQty": 2266,
    "prodType": 3,
    "splPrice": 0,
    "exclusivePrice": 899,
    "sortOrder": 1830,
    "images": [
      "1774330483_6637602.jpg",
      "1774330483_9124824.jpg",
      "1774330483_6192411.jpg",
      "1774330483_7256978.jpg",
      "1774330483_3986598.jpg",
      "1774330518_4285909.jpg"
    ],
    "imagesNew": "{\"unisex\": [], \"male\": [\"1774330483_6637602.jpg\", \"1774330483_9124824.jpg\", \"1774330483_6192411.jpg\", \"1774330483_7256978.jpg\", \"1774330483_3986598.jpg\", \"1774330518_4285909.jpg\"], \"female\": []}",
    "extraPrice": 0,
    "isPrintable": false,
    "jitValue": "REGULAR",
    "product_slug": "black-panther-wakanda-tribe-oversized-t-shirts",
    "isBlurOnPlp": false,
    "plpCoverImage": null,
    "targetDate": "2024-07-04 00:00:00",
    "isProductLocked": false,
    "tiptiles": null
  },
  {
    "id": "282432",
    "product": "Nomad: Compass",
    "artist": {
      "name": "Nomad",
      "slug": "nomad"
    },
    "category": {
      "name": "Super Oversized T-Shirts"
    },
    "price": 2299,
    "genderType": 1,
    "stock": 0,
    "avgRating": 4.42,
    "ratingCount": 506,
    "prodQty": 1931,
    "prodType": 3,
    "splPrice": 0,
    "exclusivePrice": 2199,
    "sortOrder": 780,
    "images": [
      "1742976621_3048761.jpg",
      "1742976621_2256958.jpg",
      "1742976621_5251298.jpg",
      "1742976621_1019426.jpg",
      "1762940337_4479874.jpg",
      "1742976621_9542509.jpg",
      "1743078270_2493128.jpg",
      "1744802075_9166710.jpg",
      "1742976891_7706372.jpg"
    ],
    "imagesNew": "{\"unisex\": [], \"male\": [\"1742976621_3048761.jpg\", \"1742976621_2256958.jpg\", \"1742976621_5251298.jpg\", \"1742976621_1019426.jpg\", \"1762940337_4479874.jpg\", \"1742976621_9542509.jpg\", \"1743078270_2493128.jpg\", \"1744802075_9166710.jpg\", \"1742976891_7706372.jpg\"], \"female\": []}",
    "extraPrice": 0,
    "isPrintable": false,
    "jitValue": "REGULAR",
    "product_slug": "nomad-compass-oversized-tshirt",
    "isBlurOnPlp": false,
    "plpCoverImage": null,
    "targetDate": "2025-02-21 00:00:00",
    "isProductLocked": false,
    "tiptiles": null
  },
  {
    "id": "312480",
    "product": "Ben 10: Omnitrix",
    "artist": {
      "name": "Ben 10",
      "slug": "ben-10"
    },
    "category": {
      "name": "Oversized T-Shirts"
    },
    "price": 1099,
    "genderType": 1,
    "stock": 0,
    "avgRating": 4.51,
    "ratingCount": 1040,
    "prodQty": 1773,
    "prodType": 3,
    "splPrice": 0,
    "exclusivePrice": 999,
    "sortOrder": 850,
    "images": [
      "1750415838_4107800.jpg",
      "1749817476_2237076.jpg",
      "1762940521_1365459.jpg",
      "1749817476_8136342.jpg",
      "1749817476_9622078.jpg",
      "1749817476_8509397.jpg",
      "1762494825_8839744.jpg"
    ],
    "imagesNew": "{\"unisex\": [], \"male\": [\"1750415838_4107800.jpg\", \"1749817476_2237076.jpg\", \"1762940521_1365459.jpg\", \"1749817476_8136342.jpg\", \"1749817476_9622078.jpg\", \"1749817476_8509397.jpg\", \"1762494825_8839744.jpg\"], \"female\": []}",
    "extraPrice": 0,
    "isPrintable": false,
    "jitValue": "REGULAR",
    "product_slug": "men-oversized-fit-ben-omnitrix-t-shirts",
    "isBlurOnPlp": false,
    "plpCoverImage": null,
    "targetDate": "2025-06-13 00:00:00",
    "isProductLocked": false,
    "tiptiles": null
  },
  {
    "id": "345299",
    "product": "Superman: Look Up",
    "artist": {
      "name": "DC Comics™",
      "slug": "dc-justice-league-official-merchandise"
    },
    "category": {
      "name": "Easy Fit Vests"
    },
    "price": 899,
    "genderType": 1,
    "stock": 0,
    "avgRating": 4.77,
    "ratingCount": 13,
    "prodQty": 352,
    "prodType": 3,
    "splPrice": 0,
    "exclusivePrice": 799,
    "sortOrder": 920,
    "images": [
      "1773841313_5446390.jpg",
      "1773841313_2364456.jpg",
      "1773841313_4278951.jpg",
      "1773841313_7312783.jpg",
      "1773841313_7657464.jpg"
    ],
    "imagesNew": "{\"unisex\": [], \"male\": [\"1773841313_5446390.jpg\", \"1773841313_2364456.jpg\", \"1773841313_4278951.jpg\", \"1773841313_7312783.jpg\", \"1773841313_7657464.jpg\"], \"female\": []}",
    "extraPrice": 0,
    "isPrintable": false,
    "jitValue": "REGULAR",
    "product_slug": "superman-look-up-men-vests",
    "isBlurOnPlp": false,
    "plpCoverImage": null,
    "targetDate": "2026-03-18 00:00:00",
    "isProductLocked": false,
    "tiptiles": null
  },
  {
    "id": "84768",
    "product": "Solids: Black",
    "artist": {
      "name": "The Souled Store",
      "slug": "the-souled-store-originals"
    },
    "category": {
      "name": "T-Shirts"
    },
    "price": 599,
    "genderType": 1,
    "stock": 0,
    "avgRating": 4.48,
    "ratingCount": 1370,
    "prodQty": 390,
    "prodType": 3,
    "splPrice": 499,
    "exclusivePrice": 449,
    "sortOrder": 11920,
    "images": [
      "1695457342_3523121.jpg",
      "1690272770_6296836.jpg",
      "1690272770_1983958.jpg"
    ],
    "imagesNew": "{\"unisex\": [], \"male\": [\"1695457342_3523121.jpg\", \"1690272770_6296836.jpg\", \"1690272770_1983958.jpg\"], \"female\": []}",
    "extraPrice": 0,
    "isPrintable": false,
    "jitValue": "REGULAR",
    "product_slug": "solids-black-tshirt",
    "isBlurOnPlp": false,
    "plpCoverImage": null,
    "targetDate": "0000-00-00 00:00:00",
    "isProductLocked": false,
    "tiptiles": null
  },
  {
    "id": "220471",
    "product": "Solids: Eggshell White",
    "artist": {
      "name": "The Souled Store",
      "slug": "the-souled-store-originals"
    },
    "category": {
      "name": "Oversized T-Shirts"
    },
    "price": 899,
    "genderType": 1,
    "stock": 0,
    "avgRating": 4.28,
    "ratingCount": 1274,
    "prodQty": 2429,
    "prodType": 3,
    "splPrice": 0,
    "exclusivePrice": 849,
    "sortOrder": 1890,
    "images": [
      "1753693225_6175722.jpg",
      "1753693225_7608943.jpg",
      "1753693225_2463370.jpg",
      "1762774402_2567168.jpg"
    ],
    "imagesNew": "{\"unisex\": [], \"male\": [\"1753693225_6175722.jpg\", \"1753693225_7608943.jpg\", \"1753693225_2463370.jpg\", \"1762774402_2567168.jpg\"], \"female\": []}",
    "extraPrice": 0,
    "isPrintable": false,
    "jitValue": "REGULAR",
    "product_slug": "solids-eggshell-white-oversized-tshirts",
    "isBlurOnPlp": false,
    "plpCoverImage": null,
    "targetDate": "0000-00-00 00:00:00",
    "isProductLocked": false,
    "tiptiles": null
  },
  {
    "id": "177091",
    "product": "Solids Oversized: Black",
    "artist": {
      "name": "The Souled Store",
      "slug": "the-souled-store-originals"
    },
    "category": {
      "name": "Oversized T-Shirts"
    },
    "price": 799,
    "genderType": 1,
    "stock": 0,
    "avgRating": 4.45,
    "ratingCount": 648,
    "prodQty": 1598,
    "prodType": 3,
    "splPrice": 0,
    "exclusivePrice": 749,
    "sortOrder": 990,
    "images": [
      "1726665066_7049257.jpg",
      "1726665096_7923495.jpg",
      "1726665096_1237415.jpg",
      "1726665096_5062706.jpg",
      "1726665096_3924017.jpg"
    ],
    "imagesNew": "{\"unisex\": [], \"male\": [\"1726665066_7049257.jpg\", \"1726665096_7923495.jpg\", \"1726665096_1237415.jpg\", \"1726665096_5062706.jpg\", \"1726665096_3924017.jpg\"], \"female\": []}",
    "extraPrice": 0,
    "isPrintable": false,
    "jitValue": "REGULAR",
    "product_slug": "solids-oversized-black-tshirt",
    "isBlurOnPlp": false,
    "plpCoverImage": null,
    "targetDate": "0000-00-00 00:00:00",
    "isProductLocked": false,
    "tiptiles": null
  },
  {
    "id": null,
    "product": null,
    "artist": null,
    "category": {
      "name": null
    },
    "price": null,
    "genderType": null,
    "stock": null,
    "avgRating": null,
    "ratingCount": null,
    "prodQty": null,
    "prodType": null,
    "splPrice": null,
    "exclusivePrice": null,
    "sortOrder": null,
    "images": null,
    "imagesNew": null,
    "extraPrice": null,
    "isPrintable": null,
    "jitValue": null,
    "product_slug": null,
    "isBlurOnPlp": null,
    "plpCoverImage": null,
    "targetDate": null,
    "isProductLocked": null,
    "tiptiles": {
      "id": "1192",
      "type": "TYPE1",
      "name": "Men OST and Classic TShirts",
      "navLink": null,
      "image": "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/TIPTILE-V1-MEMBERS_KuHotXA.jpg",
      "mobileImage": "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/TIPTILE-V1-MEMBERS_8QBzmPF.jpg",
      "colWidth": null,
      "isClickable": false,
      "promotionName": null
    }
  },
  {
    "id": "198840",
    "product": "Minions: Blah Blah Blah",
    "artist": {
      "name": "Minions",
      "slug": "minions-official"
    },
    "category": {
      "name": "Oversized T-Shirts"
    },
    "price": 1099,
    "genderType": 1,
    "stock": 0,
    "avgRating": 4.59,
    "ratingCount": 772,
    "prodQty": 418,
    "prodType": 3,
    "splPrice": 0,
    "exclusivePrice": 999,
    "sortOrder": 1020,
    "images": [
      "1727678292_9404417.jpg",
      "1690368815_8513366.jpg",
      "1690368815_3995087.jpg",
      "1690368815_7441056.jpg",
      "1762434808_9294195.jpg"
    ],
    "imagesNew": "{\"unisex\": [], \"male\": [\"1727678292_9404417.jpg\", \"1690368815_8513366.jpg\", \"1690368815_3995087.jpg\", \"1690368815_7441056.jpg\", \"1762434808_9294195.jpg\"], \"female\": []}",
    "extraPrice": 0,
    "isPrintable": false,
    "jitValue": "REGULAR",
    "product_slug": "minions-blah-oversized-tshirt",
    "isBlurOnPlp": false,
    "plpCoverImage": null,
    "targetDate": "0000-00-00 00:00:00",
    "isProductLocked": false,
    "tiptiles": null
  },
  {
    "id": "305537",
    "product": "Oversized T-Shirt: Bear Minimum",
    "artist": {
      "name": "The Souled Store",
      "slug": "the-souled-store-originals"
    },
    "category": {
      "name": "Oversized T-Shirts"
    },
    "price": 1199,
    "genderType": 1,
    "stock": 0,
    "avgRating": 4.42,
    "ratingCount": 73,
    "prodQty": 2008,
    "prodType": 3,
    "splPrice": 0,
    "exclusivePrice": 1099,
    "sortOrder": 1070,
    "images": [
      "1749147636_7690605.jpg",
      "1749147636_6038499.jpg",
      "1749147636_5961963.jpg",
      "1749147636_3378890.jpg",
      "1749147636_3925480.jpg",
      "1749147636_3091528.jpg",
      "1762422184_3409181.jpg"
    ],
    "imagesNew": "{\"unisex\": [], \"male\": [\"1749147636_7690605.jpg\", \"1749147636_6038499.jpg\", \"1749147636_5961963.jpg\", \"1749147636_3378890.jpg\", \"1749147636_3925480.jpg\", \"1749147636_3091528.jpg\", \"1762422184_3409181.jpg\"], \"female\": []}",
    "extraPrice": 0,
    "isPrintable": false,
    "jitValue": "REGULAR",
    "product_slug": "oversized-tshirts-bear-minimum",
    "isBlurOnPlp": false,
    "plpCoverImage": null,
    "targetDate": "2025-06-05 00:00:00",
    "isProductLocked": false,
    "tiptiles": null
  },
  {
    "id": "259620",
    "product": "TSS Originals: Spray Paint",
    "artist": {
      "name": "The Souled Store",
      "slug": "the-souled-store-originals"
    },
    "category": {
      "name": "Oversized T-Shirts"
    },
    "price": 1499,
    "genderType": 1,
    "stock": 0,
    "avgRating": 4.62,
    "ratingCount": 428,
    "prodQty": 559,
    "prodType": 3,
    "splPrice": 0,
    "exclusivePrice": 1399,
    "sortOrder": 13670,
    "images": [
      "1772866837_9425645.jpg",
      "1772866837_3036433.jpg",
      "1772866837_4078608.jpg",
      "1772866837_2550954.jpg",
      "1772866837_3811917.jpg",
      "1772866837_7784998.jpg",
      "1772866890_1681815.jpg"
    ],
    "imagesNew": "{\"unisex\": [], \"male\": [\"1772866837_9425645.jpg\", \"1772866837_3036433.jpg\", \"1772866837_4078608.jpg\", \"1772866837_2550954.jpg\", \"1772866837_3811917.jpg\", \"1772866837_7784998.jpg\", \"1772866890_1681815.jpg\"], \"female\": []}",
    "extraPrice": 0,
    "isPrintable": false,
    "jitValue": "REGULAR",
    "product_slug": "tss-originals-patchy-mr-soul-oversized-t-shirts",
    "isBlurOnPlp": false,
    "plpCoverImage": null,
    "targetDate": "0000-00-00 00:00:00",
    "isProductLocked": false,
    "tiptiles": null
  },
  {
    "id": "213962",
    "product": "Solids: Berry",
    "artist": {
      "name": "The Souled Store",
      "slug": "the-souled-store-originals"
    },
    "category": {
      "name": "Oversized T-Shirts"
    },
    "price": 799,
    "genderType": 1,
    "stock": 0,
    "avgRating": 4.42,
    "ratingCount": 457,
    "prodQty": 2447,
    "prodType": 3,
    "splPrice": 0,
    "exclusivePrice": 749,
    "sortOrder": 1950,
    "images": [
      "1754380788_8729354.jpg",
      "1688041418_8246583.jpg",
      "1688041418_8227152.jpg",
      "1762772643_3820545.jpg"
    ],
    "imagesNew": "{\"unisex\": [], \"male\": [\"1754380788_8729354.jpg\", \"1688041418_8246583.jpg\", \"1688041418_8227152.jpg\", \"1762772643_3820545.jpg\"], \"female\": []}",
    "extraPrice": 0,
    "isPrintable": false,
    "jitValue": "REGULAR",
    "product_slug": "solids-berry-oversized-tshirts",
    "isBlurOnPlp": false,
    "plpCoverImage": null,
    "targetDate": "0000-00-00 00:00:00",
    "isProductLocked": false,
    "tiptiles": null
  },
  {
    "id": "309454",
    "product": "Avatar: Fire Bender",
    "artist": {
      "name": "Avatar: The Last Airbender",
      "slug": "avatar-the-last-airbender"
    },
    "category": {
      "name": "Oversized T-Shirts"
    },
    "price": 1399,
    "genderType": 1,
    "stock": 0,
    "avgRating": 4.67,
    "ratingCount": 243,
    "prodQty": 1346,
    "prodType": 3,
    "splPrice": 0,
    "exclusivePrice": 1299,
    "sortOrder": 1080,
    "images": [
      "1753767817_4169791.jpg",
      "1753767817_1817650.jpg",
      "1753767817_5286130.jpg",
      "1753767817_1324010.jpg",
      "1753767817_5529310.jpg",
      "1762423910_9262447.jpg"
    ],
    "imagesNew": "{\"unisex\": [], \"male\": [\"1753767817_4169791.jpg\", \"1753767817_1817650.jpg\", \"1753767817_5286130.jpg\", \"1753767817_1324010.jpg\", \"1753767817_5529310.jpg\", \"1762423910_9262447.jpg\"], \"female\": []}",
    "extraPrice": 0,
    "isPrintable": false,
    "jitValue": "REGULAR",
    "product_slug": "avatar-fire-bender-menoversized-tshirt",
    "isBlurOnPlp": false,
    "plpCoverImage": null,
    "targetDate": "2025-07-27 00:00:00",
    "isProductLocked": false,
    "tiptiles": null
  },
  {
    "id": "334301",
    "product": "Ben 10: Tennyson",
    "artist": {
      "name": "Ben 10",
      "slug": "ben-10"
    },
    "category": {
      "name": "Oversized Jerseys"
    },
    "price": 1199,
    "genderType": 1,
    "stock": 0,
    "avgRating": 4.17,
    "ratingCount": 6,
    "prodQty": 422,
    "prodType": 3,
    "splPrice": 0,
    "exclusivePrice": 1099,
    "sortOrder": 1100,
    "images": [
      "1774338567_7257506.jpg",
      "1774338567_9135174.jpg",
      "1774338567_5547909.jpg",
      "1774338567_3720259.jpg",
      "1774338567_1222050.jpg",
      "1774338567_6640998.jpg",
      "1774338567_5965502.jpg",
      "1774338583_4151980.jpg"
    ],
    "imagesNew": "{\"unisex\": [], \"male\": [\"1774338567_7257506.jpg\", \"1774338567_9135174.jpg\", \"1774338567_5547909.jpg\", \"1774338567_3720259.jpg\", \"1774338567_1222050.jpg\", \"1774338567_6640998.jpg\", \"1774338567_5965502.jpg\", \"1774338583_4151980.jpg\"], \"female\": []}",
    "extraPrice": 0,
    "isPrintable": false,
    "jitValue": "REGULAR",
    "product_slug": "ben-10-tennyson-men-oversized-jersey",
    "isBlurOnPlp": false,
    "plpCoverImage": null,
    "targetDate": "2026-03-24 00:00:00",
    "isProductLocked": false,
    "tiptiles": null
  }
]

const mapScrapedData = (scrapedArray) => {
  const imageBaseUrl = "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/";
  const imageSuffix = "?w=300&dpr=1";

  return scrapedArray
    .filter(item => item.product && item.product_slug) // 1. EXCLUDE NULL/EMPTY PRODUCTS
    .map(item => {
      const categoryName = item.category?.name || "Uncategorized";
      const rawImages = item.images || [];

      return {
        product: item.product,
        product_slug: item.product_slug,
        category: categoryName,
        category_slug: item.category_slug || categoryName.toLowerCase().replace(/\s+/g, '-'),
        tags: [
          ...new Set([
            item.artist?.name,
            categoryName,
            ...(item.product.split(':'))
          ])
        ].filter(Boolean).map(t => t.trim()),
        gender_type: item.genderType || 1,
        mrp: item.price || 0,
        price: item.exclusivePrice || item.splPrice || item.price || 0,
        avg_rating: item.avgRating || 0,
        rating_count: item.ratingCount || 0,
        images: rawImages.map(img => `${imageBaseUrl}${img}${imageSuffix}`),
        colors: [{
          id: parseInt(item.id) || Date.now(),
          color_name: item.product.split(': ')[1] || "Original",
          color_hex: "#333333"
        }],
        sizes: [
          { size: "S", stock: item.prodQty || 0 },
          { size: "M", stock: item.prodQty || 0 },
          { size: "L", stock: item.prodQty || 0 }
        ],
        attributes: {
          fabric: item.product.toLowerCase().includes("linen") ? "Cotton Linen" : "Cotton",
          fitType: categoryName.toLowerCase().includes("oversized") ? "Oversized" : "Regular Fit",
          neck: "Collared",
          sleeve: categoryName.toLowerCase().includes("holiday") ? "Half Sleeves" : "Full Sleeves"
        }
      };
    });
};

export async function GET() {
  try {
    await connectDB();

    console.log("Seeding started: Clearing existing products...");
    // await Product.deleteMany({});

    console.log("Creating HP Black variant...");
    const products_to_insert = mapScrapedData(scrappedM);

    console.log(products_to_insert)
    const insertedOthers = await Product.insertMany(products_to_insert, { ordered: false });

    console.log("Seeding completed successfully.");
    return NextResponse.json({
      message: "Database seeded successfully with linked variants",
      count: insertedOthers.length + 2
    });
  } catch (error) {
    console.error("Seeding Error Details:", {
      message: error.message,
      stack: error.stack,
      errors: error.errors // For Mongoose validation errors
    });
    return NextResponse.json({
      error: "Failed to seed database",
      details: error.message
    }, { status: 500 });
  }
}
