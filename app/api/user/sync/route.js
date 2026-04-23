import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Cart from "@/models/Cart";
import Order from "@/models/Order";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const user = await User.findOne({ email: session.user.email }).populate("wishlist");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const cart = await Cart.findOne({ userId: user._id }).populate("items.productId");

    // Format wishlist to match frontend ProductCard needs
    const formattedWishlist = user.wishlist.map(product => ({
      id: product._id.toString(),
      _id: product._id.toString(),
      name: product.product,
      category: product.category,
      price: product.price,
      images: product.images,
      avg_rating: product.avg_rating,
    }));

    // Format cart to match frontend useCartStore needs
    const formattedCart = cart ? cart.items.map(item => {
      const product = item.productId;
      if (!product) return null; // In case product was deleted
      return {
        id: product._id.toString(),
        _id: product._id.toString(),
        name: product.product,
        category: product.category,
        price: product.price,
        images: product.images,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
      };
    }).filter(Boolean) : [];

    // Format addresses
    const formattedAddresses = user.addresses.map(addr => ({
      id: addr._id.toString(),
      fullName: addr.fullName,
      phone: addr.phone,
      street: addr.street,
      apartment: addr.apartment,
      city: addr.city,
      state: addr.state,
      zipCode: addr.zipCode,
      addressType: addr.addressType,
    }));

    // Fetch and format orders
    const orders = await Order.find({ user: user._id }).sort({ createdAt: -1 }).lean();
    const formattedOrders = orders.map(order => ({
      id: order._id.toString(),
      date: order.createdAt.toISOString().split("T")[0],
      total: order.totalPrice,
      status: order.isDelivered ? "Delivered" : order.isPaid ? "Processing" : "Pending",
      paymentId: order.paymentResult?.id || null,
      shippingAddress: order.shippingAddress,
      items: order.orderItems.map(item => ({
        id: item.product.toString(),
        name: item.name,
        quantity: item.qty,
        price: item.price,
        image: item.image,
        size: item.size || "M",
        color: item.color || "Default"
      }))
    }));

    console.log(formattedAddresses, "formattedAddresses")

    return NextResponse.json({
      cart: formattedCart,
      wishlist: formattedWishlist,
      addresses: formattedAddresses,
      orders: formattedOrders,
    });

  } catch (error) {
    console.error("Sync GET Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { cart, wishlist, addresses } = await req.json();

    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 1. Update Cart
    if (cart && Array.isArray(cart)) {
      const formattedItems = cart.map(item => ({
        productId: item._id || item.id,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
      }));

      await Cart.findOneAndUpdate(
        { userId: user._id },
        { items: formattedItems },
        { upsert: true }
      );
    }

    // 2. Update Wishlist
    if (wishlist && Array.isArray(wishlist)) {
      user.wishlist = wishlist.map(item => item._id || item.id);
    }

    // 3. Update Addresses
    if (addresses && Array.isArray(addresses)) {
      user.addresses = addresses.map(addr => ({
        fullName: addr.fullName,
        phone: addr.phone,
        street: addr.street,
        apartment: addr.apartment,
        city: addr.city,
        state: addr.state,
        zipCode: addr.zipCode,
        addressType: addr.addressType,
      }));
    }

    if (wishlist || addresses) {
      await user.save();
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Sync POST Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
