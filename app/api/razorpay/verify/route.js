import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId
    } = await req.json();

    // Verify the payment signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      await connectDB();
      const order = await Order.findById(orderId);
      order.paymentResult.id = razorpay_payment_id;
      order.paymentResult.status = "paid";
      order.paymentResult.update_time = Date.now();
      order.isPaid = true;
      await order.save();

      return NextResponse.json({
        success: true,
        message: "Payment verified successfully",
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
      });
    } else {
      await connectDB();
      const order = await Order.findById(orderId);
      order.paymentResult.id = razorpay_payment_id;
      order.paymentResult.status = "failed";
      order.paymentResult.update_time = Date.now();
      order.isPaid = false;
      await order.save();
      return NextResponse.json(
        { success: false, error: "Payment verification failed" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { success: false, error: "Verification failed" },
      { status: 500 }
    );
  }
}
