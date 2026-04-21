import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import Product from "@/models/Product";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  try {
    const { items, address } = await req.json();
    const session = await getServerSession(authOptions);

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Invalid cart" },
        { status: 400 }
      );
    }
    await connectDB();
    const products = await Product.find({ _id: { $in: items.map(item => item.id) } }).select("product price images").lean();

    const cart = items.map(item => {
      const product = products.find(p => p._id.toString() === item.id);
      return {
        ...product,
        quantity: item.quantity,
      }
    })

    console.log(cart)

    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const shipping = subtotal > 500 ? 0 : 50;
    const total = subtotal + shipping;

    const options = {
      amount: Math.round(total * 100),
      currency: "INR",
      receipt: `receipt_wearo_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    const createdOrder = await Order.create({
      user: session.user.id,
      orderItems: cart.map(item => ({
        name: item.product,
        qty: item.quantity,
        image: item.images[0],
        price: item.price,
        product: item._id,
      })),
      shippingAddress: {
        fullName: address.fullName,
        phone: address.phone,
        street: address.street,
        apartment: address.apartment,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        country: address.country
      },
      paymentMethod: "Razorpay",
      paymentResult: {
        id: "",
        status: "pending",
        update_time: Date.now(),
        email_address: session.user.email,
      },
      basePrice: subtotal,
      shippingPrice: subtotal > 500 ? 0 : 50,
      totalPrice: total,
      isPaid: false,
      isDelivered: false,
    });

    console.log(createdOrder)

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      order: createdOrder._id,
    });
  } catch (error) {
    console.error("Razorpay order creation failed:", error);
    return NextResponse.json(
      { error: "Failed to create Razorpay order" },
      { status: 500 }
    );
  }
}
