import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return new Response(
        JSON.stringify({ message: "Unauthorized: No token provided" }),
        {
          status: 401,
        }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { items, total, paymentReference } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return new Response(
        JSON.stringify({ message: "Items are required and must be an array" }),
        {
          status: 400,
        }
      );
    }
    if (typeof total !== "number" || total <= 0) {
      return new Response(
        JSON.stringify({ message: "Total must be a positive number" }),
        {
          status: 400,
        }
      );
    }
    if (!paymentReference) {
      return new Response(
        JSON.stringify({ message: "Payment reference is required" }),
        {
          status: 400,
        }
      );
    }

    await connectToDatabase();
    const order = new Order({
      user: decoded.userId,
      items,
      total,
      paymentReference,
      status: "Pending",
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
    if (error.name === "JsonWebTokenError") {
      return new Response(JSON.stringify({ message: "Invalid token" }), {
        status: 401,
      });
    }
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}