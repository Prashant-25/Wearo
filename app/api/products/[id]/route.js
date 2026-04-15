import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        console.log("Fetching product with ID:", id)
        const product = await Product.findById(id).populate("variants");

        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        // Transform for frontend compatibility
        const productObj = product.toObject();

        const transformedProduct = {
            ...productObj,
            id: productObj._id.toString(),
            name: productObj.product,
            originalPrice: productObj.mrp,
            variants: productObj.variants.map(v => ({
                ...v,
                id: v._id.toString(),
                name: v.product,
                originalPrice: v.mrp
            }))
        };

        return NextResponse.json(transformedProduct);
    } catch (error) {
        console.error("GET Single Product Error:", error);
        return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
    }
}

export async function PATCH(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const data = await request.json();

        const product = await Product.findByIdAndUpdate(id, data, { new: true });

        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error("PATCH Product Error:", error);
        return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("DELETE Product Error:", error);
        return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
    }
}
