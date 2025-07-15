import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await connectToDatabase();

    const orders = await Order.find({ user: decoded.userId }).lean();
    const plainOrders = orders.map((order) => ({
      ...order,
      _id: order._id.toString(),
      createdAt: order.createdAt.toISOString(),
    }));

    return new Response(JSON.stringify(plainOrders), { status: 200 });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return new Response(JSON.stringify({ message: "Error fetching orders" }), {
      status: 500,
    });
  }
}