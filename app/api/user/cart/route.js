import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Cart from "@/models/Cart";

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { cart } = await req.json(); // Array of cart items from Zustand
    if (!Array.isArray(cart)) {
      return NextResponse.json({ error: "Invalid cart data" }, { status: 400 });
    }

    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const formattedItems = cart.map(item => ({
      productId: item._id || item.id, // Support both formats
      quantity: item.quantity,
      size: item.size,
      color: item.color,
    }));

    await Cart.findOneAndUpdate(
      { userId: user._id },
      { items: formattedItems },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Cart Sync PUT Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
