import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { buildProductPipeline } from "@/lib/filters/productFilter";

export async function GET(request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url)

        const filters = {
            search: searchParams.get("search"),
            category: searchParams.get("category"),
            gender: searchParams.get("gender"),
            size: searchParams.get("size"),
            color: searchParams.get("color"),
            rating: searchParams.get("rating"),
            priceMin: searchParams.get("min"),
            priceMax: searchParams.get("max"),
            tags: searchParams.get("tags")?.split(","),
            sort: searchParams.get("sort"),
            page: searchParams.get("page"),
            limit: searchParams.get("limit")
        }

        const pipeline = buildProductPipeline(filters)

        const products = await Product.aggregate(pipeline);

        // Transform for frontend compatibility
        const transformedProducts = products?.[0]?.products?.map(p => {
            const productObj = p;
            return {
                ...productObj,
                id: productObj._id.toString(),
                name: productObj.product,
                originalPrice: productObj.mrp,
            };
        });

        return NextResponse.json({
            success: true,
            count: products?.[0]?.totalCount?.[0]?.count,
            data: transformedProducts
        });
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
