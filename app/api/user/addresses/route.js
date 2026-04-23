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

    const { address } = await req.json();
    console.log("address", address)

    await connectDB();

    const user = await User.findByIdAndUpdate(
      session.user.id,
      { $push: { addresses: address } },
      { returnDocument: 'after' }
    );

    console.log("user", user)

    const returnedAddresses = user.addresses.map(addr => ({
      id: addr._id.toString(),
      fullName: addr.fullName,
      phone: addr.phone,
      street: addr.street,
      apartment: addr.apartment,
      city: addr.city,
      state: addr.state,
      zipCode: addr.zipCode,
      type: addr.addressType,
    }));

    return NextResponse.json({ success: true, addresses: returnedAddresses });
  } catch (error) {
    console.error("Addresses Sync PUT Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
