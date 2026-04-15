import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(request) {
    try {
        await connectDB();
        
        // Get query parameters for filtering
        const { searchParams } = new URL(request.url);
        const category = searchParams.get("category");
        const gender = searchParams.get("gender");
        const isNew = searchParams.get("new") === "true";
        
        let query = {};
        if (category) query.category_slug = category;
        if (gender) query.gender_type = parseInt(gender);
        if (isNew) query.isNew = true;

        const products = await Product.find(query).sort({ createdAt: -1 });
        
        // Transform for frontend compatibility
        const transformedProducts = products.map(p => {
            const productObj = p.toObject();
            return {
                ...productObj,
                id: productObj._id.toString(),
                name: productObj.product,
                originalPrice: productObj.mrp,
            };
        });

        return NextResponse.json(transformedProducts);
    } catch (error) {
        console.error("GET Products Error:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await connectDB();
        const data = await request.json();
        
        // Basic validation could go here
        const product = await Product.create(data);
        
        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error("POST Product Error:", error);
        return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
    }
}
