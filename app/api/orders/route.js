import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await connectToDatabase();
    const { items, total, paymentReference } = await req.json();
    const order = new Order({
      user: decoded.userId,
      items,
      total,
      paymentReference,
    });
    await order.save();
    return new Response(
      JSON.stringify({
        message: "Order placed successfully",
        orderId: order._id,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error placing order:", error);
    return new Response(JSON.stringify({ message: "Error placing order" }), {
      status: 500,
    });
  }
}