import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
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
    if (!decoded.isAdmin) {
      return new Response(JSON.stringify({ message: "Forbidden" }), {
        status: 403,
      });
    }

    await connectToDatabase();
    const products = await Product.find().lean();
    const plainProducts = products.map((product) => ({
      ...product,
      _id: product._id.toString(),
    }));

    return new Response(JSON.stringify(plainProducts), { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(
      JSON.stringify({ message: "Error fetching products" }),
      {
        status: 500,
      }
    );
  }
}