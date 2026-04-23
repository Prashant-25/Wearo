import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { wishlist } = await req.json(); // Array of wishlist items from Zustand
    if (!Array.isArray(wishlist)) {
      return NextResponse.json({ error: "Invalid wishlist data" }, { status: 400 });
    }

    await connectDB();
    
    const formattedWishlist = wishlist.map(item => item._id || item.id);

    await User.findOneAndUpdate(
      { email: session.user.email },
      { wishlist: formattedWishlist },
      { new: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Wishlist Sync PUT Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
