import { connectDB } from "@/lib/mongodb";
import Collection from "@/models/Collection";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const collections = await Collection.findOne({ slug: id }).populate('products').lean();
        return NextResponse.json({ data: collections, success: true }, { status: 200 });
    } catch (error) {
        console.error("GET Collections Error:", error);
        return NextResponse.json({ error: "Failed to get collections" }, { status: 500 });
    }
}