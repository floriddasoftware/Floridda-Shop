import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return new Response(JSON.stringify({ message: "No token provided" }), {
        status: 401,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isAdmin) {
      return new Response(JSON.stringify({ message: "Forbidden" }), {
        status: 403,
      });
    }

    await connectToDatabase();
    const orders = await Order.find().populate("user", "username").lean();
    const plainOrders = orders.map((order) => ({
      ...order,
      _id: order._id.toString(),
      user: order.user
        ? { ...order.user, _id: order.user._id.toString() }
        : null,
    }));

    return new Response(JSON.stringify(plainOrders), { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return new Response(JSON.stringify({ message: "Error fetching orders" }), {
      status: 500,
    });
  }
}