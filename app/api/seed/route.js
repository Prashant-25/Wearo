import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

const sampleProducts = [
  {
    product: "Harry Potter: The Great Houses",
    product_slug: "holiday-shirts-harry-potter-magic",
    category: "Holiday Shirts",
    category_slug: "summer-shirts",
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
    category: "Menswear",
    category_slug: "menswear",
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
    category: "Unisex",
    category_slug: "oversized-tshirts",
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
    category: "Womenswear",
    category_slug: "womenswear",
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
      category: "Menswear",
      category_slug: "menswear",
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
      category: "Womenswear",
      category_slug: "womenswear",
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

export async function GET() {
    try {
        await connectDB();
        
        console.log("Seeding started: Clearing existing products...");
        await Product.deleteMany({});
        
        console.log("Creating HP Black variant...");
        const hpBlack = await Product.create({
            product: "Harry Potter: The Great Houses (Black)",
            product_slug: "hp-great-houses-black",
            category: "Holiday Shirts",
            category_slug: "summer-shirts",
            gender_type: 1, 
            mrp: 1699,
            price: 1499,
            avg_rating: 4.59,
            images: ["/cat-full-sleeve.png"],
            colors: [{ id: 54, color_name: "Black", color_hex: "#131313" }],
            sizes: [{ size: "S", stock: 50 }, { size: "M", stock: 80 }],
            attributes: { fabric: "Viscose", fitType: "Relaxed Fit", neck: "Collared", sleeve: "Half Sleeves" },
            isNew: true
        });

        console.log("Creating HP White variant...");
        const hpWhite = await Product.create({
            product: "Harry Potter: The Great Houses (White)",
            product_slug: "hp-great-houses-white",
            category: "Holiday Shirts",
            category_slug: "summer-shirts",
            gender_type: 1, 
            mrp: 1699,
            price: 1499,
            avg_rating: 4.8,
            images: ["/cat-oversized-tshirts.png"],
            colors: [{ id: 55, color_name: "White", color_hex: "#FFFFFF" }],
            sizes: [{ size: "M", stock: 100 }, { size: "L", stock: 40 }],
            attributes: { fabric: "Viscose", fitType: "Relaxed Fit", neck: "Collared", sleeve: "Half Sleeves" }
        });

        console.log("Linking variants...");
        hpBlack.variants = [hpWhite._id];
        hpWhite.variants = [hpBlack._id];
        await hpBlack.save();
        await hpWhite.save();

        console.log("Inserting other products...");
        const products_to_insert = [
            {
                product: "Premium Cotton T-Shirt",
                product_slug: "premium-cotton-tshirt-nike",
                category: "Menswear",
                category_slug: "menswear",
                gender_type: 1, 
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
                category: "Unisex",
                category_slug: "oversized-tshirts",
                gender_type: 3, 
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
                category: "Womenswear",
                category_slug: "womenswear",
                gender_type: 2, 
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
                category: "Menswear",
                category_slug: "menswear",
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
                category: "Womenswear",
                category_slug: "womenswear",
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

        const insertedOthers = await Product.insertMany(products_to_insert);
        
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
