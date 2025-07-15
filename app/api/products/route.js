import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
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
    if (!decoded.isAdmin) {
      return new Response(JSON.stringify({ message: "Forbidden" }), {
        status: 403,
      });
    }

    await connectToDatabase();
    const data = await req.json();
    const product = new Product(data);
    await product.save();
    return new Response(JSON.stringify({ message: "Product added" }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    return new Response(JSON.stringify({ message: "Error adding product" }), {
      status: 500,
    });
  }
}