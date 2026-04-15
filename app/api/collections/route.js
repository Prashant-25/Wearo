import { connectDB } from "@/lib/mongodb";
import Collection from "@/models/Collection";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();
        const data = await request.json();

        // Basic validation could go here
        const collection = await Collection.create(data);

        return NextResponse.json(collection, { status: 201 });
    } catch (error) {
        console.error("POST Collection Error:", error);
        return NextResponse.json({ error: "Failed to create collection" }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        await connectDB();
        const collections = await Collection.find();
        return NextResponse.json(collections, { status: 200 });
    } catch (error) {
        console.error("GET Collections Error:", error);
        return NextResponse.json({ error: "Failed to get collections" }, { status: 500 });
    }
}