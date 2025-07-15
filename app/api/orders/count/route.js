import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token || !jwt.verify(token, process.env.JWT_SECRET).isAdmin) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }
    await connectToDatabase();
    const count = await Order.countDocuments();
    return new Response(JSON.stringify({ count }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error" }), { status: 500 });
  }
}