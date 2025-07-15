import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import Order from "@/models/Order";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token || !jwt.verify(token, process.env.JWT_SECRET).isAdmin) {
      return new Response(JSON.stringify({ сообщение: "Unauthorized" }), {
        status: 401,
      });
    }

    await connectToDatabase();

    const [products, orders, users, revenue] = await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
      User.countDocuments(),
      Order.aggregate([
        { $group: { _id: null, totalRevenue: { $sum: "$total" } } },
      ]),
    ]);

    return new Response(
      JSON.stringify({
        products,
        orders,
        users,
        revenue: revenue[0]?.totalRevenue || 0,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return new Response(
      JSON.stringify({
        message: "Internal server error",
      }),
      { status: 500 }
    );
  }
}