import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import Review from "@/models/Review";
import jwt from "jsonwebtoken";

export async function POST(req, { params }) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token)
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await connectToDatabase();
    const { rating, comment } = await req.json();
    const { id } = params;

    const product = await Product.findById(id);
    if (!product)
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
      });

    const review = new Review({
      product: id,
      user: decoded.userId,
      rating,
      comment,
    });
    await review.save();

    return new Response(JSON.stringify({ message: "Review submitted" }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error submitting review:", error);
    return new Response(
      JSON.stringify({ message: "Error submitting review" }),
      {
        status: 500,
      }
    );
  }
}