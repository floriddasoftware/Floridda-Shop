import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";

export async function PUT(req, { params }) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token)
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isAdmin)
      return new Response(JSON.stringify({ message: "Forbidden" }), {
        status: 403,
      });

    await connectToDatabase();
    const { id } = params;
    const { status } = await req.json();
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order)
      return new Response(JSON.stringify({ message: "Order not found" }), {
        status: 404,
      });

    return new Response(JSON.stringify(order), { status: 200 });
  } catch (error) {
    console.error("Error updating order status:", error);
    return new Response(
      JSON.stringify({ message: "Error updating order status" }),
      {
        status: 500,
      }
    );
  }
}